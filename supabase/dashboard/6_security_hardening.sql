-- =====================================================================
-- ropros · security hardening (audit 2026-10-27). Safe to run once after 0001_init.sql.
-- 1. Community photos are readable only while a post shows them, or by their owner.
-- 2. New posts: the photo must be uploaded by the author, a linked project must be published,
--    and at most 10 posts per user per UTC day (deleting a post does not give the slot back).
-- 3. Upload quota: at most 5 photos per user waiting without a post.
-- 4. avatar_url is no longer writable from the browser (the app never sets it).
-- 5. Display names: no staff-like names, never taken from the email address, and sign-up
--    no longer fails when two generated names clash.
-- 6. Progress XP: at most 3 completed and 5 simulated guides pay XP per user per UTC day.
-- 7. Assistant quota per user per UTC day, counted in the database so all server instances share it.
-- Every limit is enforced by one atomic statement or under a per-user lock, so parallel requests cannot overshoot.
-- =====================================================================

-- ---------- 1. Storage: no more listing every photo in the bucket ----------
create index if not exists community_posts_image_idx on public.community_posts (image_url);

drop policy if exists community_read on storage.objects;
create policy community_read on storage.objects for select
  using (bucket_id = 'community'
         and ((storage.foldername(name))[1] = (select auth.uid())::text
              or exists (select 1 from public.community_posts p where p.image_url = objects.name)));

-- ---------- 2. New posts ----------
create table public.post_usage (
  user_id  uuid not null references public.users (id) on delete cascade,
  day      date not null,
  posts    integer not null default 0 check (posts >= 0),
  primary key (user_id, day)
);
alter table public.post_usage enable row level security;
revoke all on public.post_usage from anon, authenticated;

create function public.check_new_post() returns trigger
language plpgsql security definer set search_path = '' as $fn$
declare
  used integer;
begin
  -- Only the folder of the author is searched, so this cannot reveal whether a file of another user exists.
  if not exists (select 1 from storage.objects o
                  where o.bucket_id = 'community' and o.name = new.image_url
                    and o.name like new.user_id::text || '/%') then
    raise exception 'photo not uploaded' using errcode = '23514';
  end if;
  if new.project_id is not null
     and not exists (select 1 from public.projects p where p.id = new.project_id and p.is_published) then
    raise exception 'project not found' using errcode = 'P0002';
  end if;
  -- Counting and limiting happen in one statement, and a failed insert rolls the count back.
  insert into public.post_usage as pu (user_id, day, posts)
  values (new.user_id, (now() at time zone 'utc')::date, 1)
  on conflict (user_id, day) do update
    set posts = pu.posts + 1
    where pu.posts < 10
  returning pu.posts into used;
  if used is null then
    raise exception 'post limit reached' using errcode = '54000';
  end if;
  return new;
end $fn$;
create trigger community_posts_check before insert on public.community_posts
  for each row execute function public.check_new_post();
revoke execute on function public.check_new_post() from public, anon, authenticated;

-- ---------- 3. Upload quota ----------
-- The share flow uploads a photo and posts it right away, so honest users never hold more than one.
-- The per-user lock makes parallel uploads queue up, so a burst cannot slip past the count.
create function public.community_upload_allowed() returns boolean
language plpgsql security definer set search_path = '' as $fn$
declare
  uid     uuid := auth.uid();
  waiting integer;
begin
  if uid is null then
    return false;
  end if;
  perform pg_advisory_xact_lock(hashtextextended('upload_quota:' || uid::text, 0));
  select count(*) into waiting
    from storage.objects o
   where o.bucket_id = 'community' and o.name like uid::text || '/%'
     and not exists (select 1 from public.community_posts p where p.image_url = o.name);
  return waiting < 5;
end $fn$;
revoke execute on function public.community_upload_allowed() from public, anon;
grant  execute on function public.community_upload_allowed() to authenticated;

drop policy if exists community_upload_own on storage.objects;
create policy community_upload_own on storage.objects for insert to authenticated
  with check (bucket_id = 'community'
              and (storage.foldername(name))[1] = (select auth.uid())::text
              and public.community_upload_allowed());

-- ---------- 4. Avatars ----------
revoke update (avatar_url) on public.users from authenticated;

-- ---------- 5. Display names ----------
create function public.is_reserved_name(p_name text) returns boolean
language sql immutable set search_path = '' as $fn$
  select p_name ~* '(ropros|admin|moderat|support|official|staff|system|security)'
$fn$;

-- Renames through the API cannot pick a staff-like name. The SQL editor (database owner) still can.
create function public.guard_user_rename() returns trigger
language plpgsql set search_path = '' as $fn$
begin
  if new.name is distinct from old.name
     and current_user in ('anon', 'authenticated')
     and public.is_reserved_name(new.name) then
    raise exception 'name reserved' using errcode = '23514';
  end if;
  return new;
end $fn$;
create trigger users_guard_rename before update of name on public.users
  for each row execute function public.guard_user_rename();
revoke execute on function public.guard_user_rename() from public, anon, authenticated;

-- Sign-up profile: name from the sign-up form only, 8 random hex characters as suffix, retried on a clash.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $fn$
declare
  clean text := left(regexp_replace(coalesce(new.raw_user_meta_data ->> 'name', ''), '[^A-Za-z0-9_.]', '', 'g'), 15);
  tries integer := 0;
begin
  if length(clean) < 3 or public.is_reserved_name(clean) then
    clean := 'maker';
  end if;
  loop
    begin
      insert into public.users (id, email, name)
      values (new.id, new.email, clean || '_' || substr(md5(new.id::text || tries::text), 1, 8));
      return new;
    exception when unique_violation then
      tries := tries + 1;
      if tries >= 5 then
        raise;
      end if;
    end;
  end loop;
end $fn$;

-- ---------- 6. Progress XP cap ----------
create function public.award_xp_capped(p_user uuid, p_reason text, p_ref uuid, p_amount integer, p_daily_cap integer)
returns void
language plpgsql security definer set search_path = '' as $fn$
declare
  paid_today integer;
begin
  perform pg_advisory_xact_lock(hashtextextended('xp_cap:' || p_reason || ':' || p_user::text, 0));
  select count(*) into paid_today
    from public.xp_events
   where user_id = p_user and reason = p_reason
     and created_at >= date_trunc('day', now() at time zone 'utc') at time zone 'utc';
  if paid_today < p_daily_cap then
    perform public.award_xp(p_user, p_reason, p_ref, p_amount);
  end if;
end $fn$;
revoke execute on function public.award_xp_capped(uuid, text, uuid, integer, integer) from public, anon, authenticated;

-- Same as 0001 except the two award lines, which now go through the daily cap.
-- A guide that was not paid today still pays when it is completed again on a later day.
create or replace function public.record_progress(p_project uuid, p_action text)
returns table (status public.progress_status, is_completed boolean, xp integer, level integer)
language plpgsql security definer set search_path = '' as $fn$
#variable_conflict use_column
declare
  uid        uuid := auth.uid();
  new_status public.progress_status;
  reward     integer;
begin
  if uid is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  new_status := case p_action
                  when 'start'    then 'in_progress'::public.progress_status
                  when 'simulate' then 'simulated'::public.progress_status
                  when 'complete' then 'completed'::public.progress_status
                end;
  if new_status is null then
    raise exception 'unknown action' using errcode = '22023';
  end if;

  select p.xp_reward into reward from public.projects p where p.id = p_project and p.is_published;
  if not found then
    raise exception 'project not found' using errcode = 'P0002';
  end if;

  -- Atomic upsert: status only moves forward, timestamps are set once.
  insert into public.user_progress as up (user_id, project_id, status, simulated_at, completed_at)
  values (uid, p_project, new_status,
          case when new_status >= 'simulated' then now() end,
          case when new_status = 'completed' then now() end)
  on conflict (user_id, project_id) do update
    set status       = greatest(up.status, excluded.status),
        simulated_at = coalesce(up.simulated_at, excluded.simulated_at),
        completed_at = coalesce(up.completed_at, excluded.completed_at),
        updated_at   = now();

  if new_status = 'simulated' then perform public.award_xp_capped(uid, 'simulate', p_project, 30, 5); end if;
  if new_status = 'completed' then perform public.award_xp_capped(uid, 'complete', p_project, reward, 3); end if;

  return query
    select up.status, up.is_completed, u.xp, u.level
      from public.user_progress up join public.users u on u.id = up.user_id
     where up.user_id = uid and up.project_id = p_project;
end $fn$;

-- ---------- 7. Assistant daily quota ----------
create table public.assistant_usage (
  user_id   uuid not null references public.users (id) on delete cascade,
  day       date not null,
  requests  integer not null default 0 check (requests >= 0),
  primary key (user_id, day)
);
alter table public.assistant_usage enable row level security;
revoke all on public.assistant_usage from anon, authenticated;
grant select on public.assistant_usage to authenticated;
create policy assistant_usage_read_own on public.assistant_usage for select to authenticated
  using (user_id = (select auth.uid()));

-- Counts one request for the caller and says whether it fits under the daily limit.
-- The caller is always auth.uid(). Calling it directly only spends your own quota.
create function public.consume_assistant_quota(p_daily_limit integer) returns boolean
language plpgsql security definer set search_path = '' as $fn$
declare
  uid  uuid := auth.uid();
  used integer;
begin
  if uid is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;
  insert into public.assistant_usage as au (user_id, day, requests)
  values (uid, (now() at time zone 'utc')::date, 1)
  on conflict (user_id, day) do update
    set requests = au.requests + 1
    where au.requests < greatest(1, least(p_daily_limit, 1000))
  returning au.requests into used;
  return used is not null;
end $fn$;
revoke execute on function public.consume_assistant_quota(integer) from public, anon;
grant  execute on function public.consume_assistant_quota(integer) to authenticated;
