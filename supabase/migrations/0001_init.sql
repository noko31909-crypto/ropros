-- =====================================================================
-- ropros · initial schema (Supabase / PostgreSQL 15+)
-- Passwords live only in Supabase Auth (auth.users). public.users holds the public profile.
-- Clients get read access + narrow column grants, all scoring (XP, likes, progress)
-- happens inside SECURITY DEFINER functions, so it cannot be faked from the browser.
-- =====================================================================

-- ---------- Types ----------
create type public.platform_type    as enum ('arduino', 'esp32', 'raspberry_pi');
create type public.difficulty_level as enum ('beginner', 'intermediate', 'advanced');
-- Declaration order matters: GREATEST() uses it so progress never moves backwards.
create type public.progress_status  as enum ('not_started', 'in_progress', 'simulated', 'completed');
create type public.build_status     as enum ('working', 'debugging');

-- ---------- users (public profile, 1:1 with auth.users) ----------
create table public.users (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null unique,
  name        text not null check (name ~ '^[A-Za-z0-9_.]{3,24}\Z'),
  avatar_url  text check (avatar_url is null or avatar_url ~ '^https://'),
  xp          integer not null default 0 check (xp >= 0),
  -- Level is derived from XP, so it can never disagree with it.
  level       integer generated always as (
                case when xp >= 1600 then 6 when xp >= 1100 then 5 when xp >= 700 then 4
                     when xp >= 400 then 3 when xp >= 150 then 2 else 1 end) stored,
  created_at  timestamptz not null default now()
);
create unique index users_name_lower_idx on public.users (lower(name));

-- Create the profile automatically when someone signs up through Supabase Auth.
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $fn$
declare
  wanted text := coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1));
  clean  text := left(regexp_replace(wanted, '[^A-Za-z0-9_.]', '', 'g'), 18);
begin
  if length(clean) < 3 then clean := 'maker'; end if;
  insert into public.users (id, email, name)
  values (new.id, new.email, clean || '_' || substr(replace(new.id::text, '-', ''), 1, 5));
  return new;
end $fn$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- projects ----------
create table public.projects (
  id                   uuid primary key default gen_random_uuid(),
  slug                 text not null unique check (slug ~ '^[a-z0-9-]{3,64}\Z'),
  title                text not null check (length(title) between 1 and 120),
  platform             public.platform_type not null,
  difficulty           public.difficulty_level not null,
  components_required  text[] not null check (cardinality(components_required) between 1 and 40),
  wiring_json          jsonb  not null default '[]'::jsonb check (jsonb_typeof(wiring_json) = 'array'),
  code_block           text   not null default '' check (length(code_block) <= 50000),
  xp_reward            integer not null default 200 check (xp_reward between 0 and 1000),
  is_published         boolean not null default false,
  created_at           timestamptz not null default now()
);
create index projects_components_gin on public.projects using gin (components_required);
create index projects_platform_idx   on public.projects (platform, difficulty) where is_published;

-- ---------- user_progress ----------
create table public.user_progress (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.users (id) on delete cascade,
  project_id    uuid not null references public.projects (id) on delete cascade,
  status        public.progress_status not null default 'not_started',
  is_completed  boolean generated always as (status = 'completed') stored,
  simulated_at  timestamptz,
  completed_at  timestamptz,
  updated_at    timestamptz not null default now(),
  unique (user_id, project_id)          -- one row per user per project
);
create index user_progress_user_idx on public.user_progress (user_id, updated_at desc);

-- ---------- community_posts ----------
create table public.community_posts (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.users (id) on delete cascade,
  project_id   uuid references public.projects (id) on delete set null,
  title        text not null check (length(title) between 1 and 80),
  status       public.build_status not null default 'working',
  image_url    text not null,           -- storage path inside the community bucket
  likes_count  integer not null default 0 check (likes_count >= 0),
  created_at   timestamptz not null default now()
);
create index community_posts_recent_idx  on public.community_posts (created_at desc);
create index community_posts_popular_idx on public.community_posts (likes_count desc, created_at desc);

-- One like per user per post, enforced by the primary key (not by app code).
create table public.post_likes (
  post_id     uuid not null references public.community_posts (id) on delete cascade,
  user_id     uuid not null references public.users (id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (post_id, user_id)
);

-- likes_count is maintained atomically by triggers, clients cannot write it.
create function public.sync_likes_count() returns trigger
language plpgsql security definer set search_path = '' as $fn$
begin
  if tg_op = 'INSERT' then
    update public.community_posts set likes_count = likes_count + 1 where id = new.post_id;
  else
    update public.community_posts set likes_count = greatest(likes_count - 1, 0) where id = old.post_id;
  end if;
  return null;
end $fn$;
create trigger post_likes_count after insert or delete on public.post_likes
  for each row execute function public.sync_likes_count();

-- ---------- XP ledger: every award happens at most once ----------
create table public.xp_events (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references public.users (id) on delete cascade,
  reason      text not null check (reason in ('simulate', 'complete', 'post', 'post_working')),
  ref_id      uuid not null,
  amount      integer not null check (amount between 0 and 1000),
  created_at  timestamptz not null default now(),
  unique (user_id, reason, ref_id)
);

create function public.award_xp(p_user uuid, p_reason text, p_ref uuid, p_amount integer) returns void
language plpgsql security definer set search_path = '' as $fn$
declare inserted integer;
begin
  insert into public.xp_events (user_id, reason, ref_id, amount)
  values (p_user, p_reason, p_ref, p_amount)
  on conflict (user_id, reason, ref_id) do nothing;
  get diagnostics inserted = row_count;
  if inserted = 1 then                       -- first time only: no double XP on repeat clicks
    update public.users set xp = xp + p_amount where id = p_user;
  end if;
end $fn$;

-- ---------- RPC used by POST /api/progress ----------
-- The caller is always auth.uid(), the client never sends a user id.
create function public.record_progress(p_project uuid, p_action text)
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

  if new_status = 'simulated' then perform public.award_xp(uid, 'simulate', p_project, 30); end if;
  if new_status = 'completed' then perform public.award_xp(uid, 'complete', p_project, reward); end if;

  return query
    select up.status, up.is_completed, u.xp, u.level
      from public.user_progress up join public.users u on u.id = up.user_id
     where up.user_id = uid and up.project_id = p_project;
end $fn$;

-- XP for sharing a build (once per post, extra once if it works).
-- Farm protection: at most 3 rewarded posts per user per UTC day, so delete/re-post loops earn nothing.
-- post_working is only paid for a post that itself earned the base post reward.
create function public.reward_post() returns trigger
language plpgsql security definer set search_path = '' as $fn$
declare
  rewarded_today integer;
  base_rewarded  boolean;
begin
  -- Serialize awards per user so concurrent inserts cannot all pass the daily check.
  perform pg_advisory_xact_lock(hashtextextended('reward_post:' || new.user_id::text, 0));

  select exists (select 1 from public.xp_events
                  where user_id = new.user_id and reason = 'post' and ref_id = new.id)
    into base_rewarded;

  if not base_rewarded and tg_op = 'INSERT' then
    select count(*) into rewarded_today
      from public.xp_events
     where user_id = new.user_id and reason = 'post'
       and created_at >= date_trunc('day', now() at time zone 'utc') at time zone 'utc';
    if rewarded_today < 3 then
      perform public.award_xp(new.user_id, 'post', new.id, 100);
      base_rewarded := true;
    end if;
  end if;

  if base_rewarded and new.status = 'working' then
    perform public.award_xp(new.user_id, 'post_working', new.id, 150);
  end if;
  return null;
end $fn$;
create index xp_events_daily_idx on public.xp_events (user_id, reason, created_at desc);
create trigger community_posts_reward after insert or update of status on public.community_posts
  for each row execute function public.reward_post();

-- ---------- Row Level Security ----------
alter table public.users           enable row level security;
alter table public.projects        enable row level security;
alter table public.user_progress   enable row level security;
alter table public.community_posts enable row level security;
alter table public.post_likes      enable row level security;
alter table public.xp_events       enable row level security;

-- users: public profile fields readable by everyone, email is NOT granted to clients.
revoke all on public.users from anon, authenticated;
grant select (id, name, avatar_url, xp, level, created_at) on public.users to anon, authenticated;
grant update (name, avatar_url) on public.users to authenticated;
create policy users_read        on public.users for select using (true);
create policy users_update_self on public.users for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

-- projects: read published only, writes go through the service role (admin tooling).
revoke all on public.projects from anon, authenticated;
grant select on public.projects to anon, authenticated;
create policy projects_read on public.projects for select using (is_published);

-- user_progress: each user reads only their own rows, writes only via record_progress().
revoke all on public.user_progress from anon, authenticated;
grant select on public.user_progress to authenticated;
create policy progress_read_own on public.user_progress for select to authenticated using (user_id = auth.uid());

-- community_posts: public feed, authors create/edit/delete their own, likes_count is not writable.
revoke all on public.community_posts from anon, authenticated;
grant select on public.community_posts to anon, authenticated;
grant insert (user_id, project_id, title, status, image_url) on public.community_posts to authenticated;
grant update (title, status) on public.community_posts to authenticated;
grant delete on public.community_posts to authenticated;
create policy posts_read       on public.community_posts for select using (true);
create policy posts_insert_own on public.community_posts for insert to authenticated
  with check (user_id = auth.uid()
              and image_url like auth.uid()::text || '/%');   -- image must live in the authors folder
create policy posts_update_own on public.community_posts for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy posts_delete_own on public.community_posts for delete to authenticated using (user_id = auth.uid());

-- post_likes: users like/unlike as themselves only.
revoke all on public.post_likes from anon, authenticated;
grant select, insert, delete on public.post_likes to authenticated;
create policy likes_read_own   on public.post_likes for select to authenticated using (user_id = auth.uid());
create policy likes_insert_own on public.post_likes for insert to authenticated with check (user_id = auth.uid());
create policy likes_delete_own on public.post_likes for delete to authenticated using (user_id = auth.uid());

-- xp_events: private ledger, visible to its owner.
revoke all on public.xp_events from anon, authenticated;
grant select on public.xp_events to authenticated;
create policy xp_read_own on public.xp_events for select to authenticated using (user_id = auth.uid());

-- Functions: only the progress RPC is callable from clients.
revoke execute on function public.record_progress(uuid, text) from public, anon;
grant  execute on function public.record_progress(uuid, text) to authenticated;
revoke execute on function public.award_xp(uuid, text, uuid, integer) from public, anon, authenticated;
revoke execute on function public.handle_new_user()  from public, anon, authenticated;
revoke execute on function public.sync_likes_count() from public, anon, authenticated;
revoke execute on function public.reward_post()      from public, anon, authenticated;

-- ---------- Storage: private-by-default bucket for build photos ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('community', 'community', false, 10485760, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy community_upload_own on storage.objects for insert to authenticated
  with check (bucket_id = 'community' and (storage.foldername(name))[1] = auth.uid()::text);
create policy community_delete_own on storage.objects for delete to authenticated
  using (bucket_id = 'community' and (storage.foldername(name))[1] = auth.uid()::text);
create policy community_read on storage.objects for select
  using (bucket_id = 'community');   -- serve via short-lived signed URLs from the server
