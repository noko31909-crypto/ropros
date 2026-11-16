-- =====================================================================
-- ropros · workbench, build logs and comments (2026-11-16). Safe to run as often as you like:
-- every statement either creates what is missing or replaces what is there.
-- 1. user_parts: the parts on a maker workbench. Only the owner can read or change them, at most 200 per user.
-- 2. Build logs: an index for the posts linked to a guide, and project_builders() to count their makers.
-- 3. post_comments: public comments under community posts, written as yourself only, at most 500 characters
--    and 50 per user per UTC day. The comment author or the post author can delete one.
--    comments_count on the post is kept by a trigger, so it cannot be set from the browser.
-- Every limit is enforced by one atomic statement or under a per-user lock, so parallel requests cannot overshoot.
-- =====================================================================

-- ---------- 1. Workbench ----------
create table if not exists public.user_parts (
  user_id     uuid not null references public.users (id) on delete cascade,
  part_id     text not null check (part_id ~ '^[a-z0-9]{2,24}\Z'),   -- an id from lib/parts-catalog.ts
  created_at  timestamptz not null default now(),
  primary key (user_id, part_id)
);
alter table public.user_parts enable row level security;
revoke all on public.user_parts from anon, authenticated;
grant select, delete on public.user_parts to authenticated;
grant insert (user_id, part_id) on public.user_parts to authenticated;
drop policy if exists user_parts_read_own on public.user_parts;
create policy user_parts_read_own on public.user_parts for select to authenticated
  using (user_id = (select auth.uid()));
drop policy if exists user_parts_insert_own on public.user_parts;
create policy user_parts_insert_own on public.user_parts for insert to authenticated
  with check (user_id = (select auth.uid()));
drop policy if exists user_parts_delete_own on public.user_parts;
create policy user_parts_delete_own on public.user_parts for delete to authenticated
  using (user_id = (select auth.uid()));

-- The catalog has fewer than 100 parts, so 200 is never reached by honest use. The per-user lock makes
-- parallel inserts queue up, and the count runs after the lock, so a burst cannot slip past it.
create or replace function public.check_user_parts_cap() returns trigger
language plpgsql security definer set search_path = '' as $check_user_parts_cap$
declare
  owned integer;
begin
  perform pg_advisory_xact_lock(hashtextextended('user_parts:' || new.user_id::text, 0));
  select count(*) into owned from public.user_parts where user_id = new.user_id;
  if owned >= 200 then
    raise exception 'workbench is full' using errcode = '54000';
  end if;
  return new;
end $check_user_parts_cap$;
drop trigger if exists user_parts_cap on public.user_parts;
create trigger user_parts_cap before insert on public.user_parts
  for each row execute function public.check_user_parts_cap();
revoke execute on function public.check_user_parts_cap() from public, anon, authenticated;

-- ---------- 2. Build logs ----------
create index if not exists community_posts_project_idx on public.community_posts (project_id, created_at desc)
  where project_id is not null;

-- How many different makers shared a build of this guide. Runs with the rights of the caller (posts are public).
create or replace function public.project_builders(p_project uuid) returns integer
language sql stable security invoker set search_path = '' as $project_builders$
  select count(distinct p.user_id)::integer from public.community_posts p where p.project_id = p_project
$project_builders$;
revoke execute on function public.project_builders(uuid) from public;
grant  execute on function public.project_builders(uuid) to anon, authenticated;

-- ---------- 3. Comments ----------
alter table public.community_posts add column if not exists comments_count integer not null default 0
  check (comments_count >= 0);

create table if not exists public.post_comments (
  id          uuid primary key default gen_random_uuid(),
  post_id     uuid not null references public.community_posts (id) on delete cascade,
  user_id     uuid not null references public.users (id) on delete cascade,
  -- 1 to 500 characters, not only spaces, no control characters except tab and line feed.
  body        text not null check (char_length(body) between 1 and 500
                                   and body ~ '[^[:space:]]'
                                   and body !~ '[\x01-\x08\x0b-\x1f\x7f]'),
  created_at  timestamptz not null default now()
);
create index if not exists post_comments_post_idx on public.post_comments (post_id, created_at);
create index if not exists post_comments_user_idx on public.post_comments (user_id, created_at desc);

alter table public.post_comments enable row level security;
revoke all on public.post_comments from anon, authenticated;
grant select on public.post_comments to anon, authenticated;
grant insert (post_id, user_id, body) on public.post_comments to authenticated;
grant delete on public.post_comments to authenticated;
drop policy if exists comments_read on public.post_comments;
create policy comments_read on public.post_comments for select using (true);
drop policy if exists comments_insert_own on public.post_comments;
create policy comments_insert_own on public.post_comments for insert to authenticated
  with check (user_id = (select auth.uid()));
drop policy if exists comments_delete on public.post_comments;
create policy comments_delete on public.post_comments for delete to authenticated
  using (user_id = (select auth.uid())
         or exists (select 1 from public.community_posts p
                     where p.id = post_comments.post_id and p.user_id = (select auth.uid())));

create table if not exists public.comment_usage (
  user_id   uuid not null references public.users (id) on delete cascade,
  day       date not null,
  comments  integer not null default 0 check (comments >= 0),
  primary key (user_id, day)
);
alter table public.comment_usage enable row level security;
revoke all on public.comment_usage from anon, authenticated;

-- Counting and limiting happen in one statement, and a failed insert rolls the count back.
-- Deleting a comment does not give the slot back.
create or replace function public.check_new_comment() returns trigger
language plpgsql security definer set search_path = '' as $check_new_comment$
declare
  used integer;
begin
  insert into public.comment_usage as cu (user_id, day, comments)
  values (new.user_id, (now() at time zone 'utc')::date, 1)
  on conflict (user_id, day) do update
    set comments = cu.comments + 1
    where cu.comments < 50
  returning cu.comments into used;
  if used is null then
    raise exception 'comment limit reached' using errcode = '54000';
  end if;
  return new;
end $check_new_comment$;
drop trigger if exists post_comments_check on public.post_comments;
create trigger post_comments_check before insert on public.post_comments
  for each row execute function public.check_new_comment();
revoke execute on function public.check_new_comment() from public, anon, authenticated;

create or replace function public.sync_comments_count() returns trigger
language plpgsql security definer set search_path = '' as $sync_comments_count$
begin
  if tg_op = 'INSERT' then
    update public.community_posts set comments_count = comments_count + 1 where id = new.post_id;
  else
    update public.community_posts set comments_count = greatest(comments_count - 1, 0) where id = old.post_id;
  end if;
  return null;
end $sync_comments_count$;
drop trigger if exists post_comments_count on public.post_comments;
create trigger post_comments_count after insert or delete on public.post_comments
  for each row execute function public.sync_comments_count();
revoke execute on function public.sync_comments_count() from public, anon, authenticated;
