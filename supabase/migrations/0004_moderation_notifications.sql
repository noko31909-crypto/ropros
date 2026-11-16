-- =====================================================================
-- ropros · saved builds, reports and moderation, notifications, account deletion, build counts (2026-11-16).
-- Safe to run as often as you like: every statement creates what is missing or replaces what is there.
-- 1. saved_builds: the guides a maker saved. Only the owner reads or changes them, at most 300 per user.
-- 2. Moderators: app_admins (rows are added from the SQL editor only) and is_admin().
-- 3. Bans and hidden posts: a hidden post is seen only by its author and moderators, a banned maker cannot post,
--    comment, like, report or upload photos. Moderators also delete comments.
-- 4. content_reports: a maker reports a post or a comment once, never their own, at most 20 per UTC day.
--    Moderators read every report and close it.
-- 5. Moderation actions: hide or show a post, ban or unban a maker (moderators only).
-- 6. notifications: a post author hears about each new comment from someone else. Only the recipient reads them.
-- 7. project_build_counts(): how many makers shared a build of a guide and how many got it working.
-- 8. delete_my_account(): deletes the caller and, through foreign keys, everything they own.
-- 9. admin_banned_users(): the banned makers, for moderators.
-- Every limit is enforced by one atomic statement or under a per-user lock, so parallel requests cannot overshoot.
-- =====================================================================

-- ---------- 1. Saved builds ----------
create table if not exists public.saved_builds (
  user_id     uuid not null references public.users (id) on delete cascade,
  slug        text not null check (slug ~ '^[a-z0-9-]{3,64}\Z'),   -- a guide slug
  created_at  timestamptz not null default now(),
  primary key (user_id, slug)
);
alter table public.saved_builds enable row level security;
revoke all on public.saved_builds from anon, authenticated;
grant select, delete on public.saved_builds to authenticated;
grant insert (user_id, slug) on public.saved_builds to authenticated;
drop policy if exists saved_builds_read_own on public.saved_builds;
create policy saved_builds_read_own on public.saved_builds for select to authenticated
  using (user_id = (select auth.uid()));
drop policy if exists saved_builds_insert_own on public.saved_builds;
create policy saved_builds_insert_own on public.saved_builds for insert to authenticated
  with check (user_id = (select auth.uid()));
drop policy if exists saved_builds_delete_own on public.saved_builds;
create policy saved_builds_delete_own on public.saved_builds for delete to authenticated
  using (user_id = (select auth.uid()));

-- The site has about a hundred guides, so 300 is never reached by honest use. Counted after a per-user lock.
create or replace function public.check_saved_builds_cap() returns trigger
language plpgsql security definer set search_path = '' as $check_saved_builds_cap$
declare
  saved integer;
begin
  perform pg_advisory_xact_lock(hashtextextended('saved_builds:' || new.user_id::text, 0));
  select count(*) into saved from public.saved_builds where user_id = new.user_id;
  if saved >= 300 then
    raise exception 'too many saved builds' using errcode = '54000';
  end if;
  return new;
end $check_saved_builds_cap$;
drop trigger if exists saved_builds_cap on public.saved_builds;
create trigger saved_builds_cap before insert on public.saved_builds
  for each row execute function public.check_saved_builds_cap();
revoke execute on function public.check_saved_builds_cap() from public, anon, authenticated;

-- ---------- 2. Moderators ----------
create table if not exists public.app_admins (
  user_id     uuid primary key references public.users (id) on delete cascade,
  created_at  timestamptz not null default now()
);
alter table public.app_admins enable row level security;
revoke all on public.app_admins from anon, authenticated;
grant select on public.app_admins to authenticated;
drop policy if exists app_admins_read_own on public.app_admins;
create policy app_admins_read_own on public.app_admins for select to authenticated
  using (user_id = (select auth.uid()));

-- True when the caller is a moderator. Used by row policies, so anonymous visitors may call it too (always false).
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = '' as $is_admin$
  select exists (select 1 from public.app_admins a where a.user_id = auth.uid())
$is_admin$;
revoke execute on function public.is_admin() from public;
grant  execute on function public.is_admin() to anon, authenticated;

-- ---------- 3. Bans and hidden posts ----------
alter table public.users add column if not exists banned boolean not null default false;   -- not granted to clients
alter table public.community_posts add column if not exists hidden boolean not null default false;   -- set by moderators only

-- True when the caller is banned. Used by row policies.
create or replace function public.is_banned() returns boolean
language sql stable security definer set search_path = '' as $is_banned$
  select coalesce((select u.banned from public.users u where u.id = auth.uid()), false)
$is_banned$;
revoke execute on function public.is_banned() from public;
grant  execute on function public.is_banned() to anon, authenticated;

-- Same as 0002, plus: banned makers cannot upload photos.
create or replace function public.community_upload_allowed() returns boolean
language plpgsql security definer set search_path = '' as $community_upload_allowed$
declare
  uid     uuid := auth.uid();
  waiting integer;
begin
  if uid is null or public.is_banned() then
    return false;
  end if;
  perform pg_advisory_xact_lock(hashtextextended('upload_quota:' || uid::text, 0));
  select count(*) into waiting
    from storage.objects o
   where o.bucket_id = 'community' and o.name like uid::text || '/%'
     and not exists (select 1 from public.community_posts p where p.image_url = o.name);
  return waiting < 5;
end $community_upload_allowed$;
revoke execute on function public.community_upload_allowed() from public, anon;
grant  execute on function public.community_upload_allowed() to authenticated;

-- A hidden post (and so its photo, its comments and its likes) is visible only to its author and to moderators.
drop policy if exists posts_read on public.community_posts;
create policy posts_read on public.community_posts for select
  using (not hidden or user_id = (select auth.uid()) or (select public.is_admin()));
drop policy if exists posts_insert_own on public.community_posts;
create policy posts_insert_own on public.community_posts for insert to authenticated
  with check (user_id = (select auth.uid())
              and image_url like (select auth.uid())::text || '/%'
              and not (select public.is_banned()));
drop policy if exists likes_insert_own on public.post_likes;
create policy likes_insert_own on public.post_likes for insert to authenticated
  with check (user_id = (select auth.uid())
              and not (select public.is_banned())
              and exists (select 1 from public.community_posts p where p.id = post_likes.post_id));
drop policy if exists comments_read on public.post_comments;
create policy comments_read on public.post_comments for select
  using (exists (select 1 from public.community_posts p where p.id = post_comments.post_id));
drop policy if exists comments_insert_own on public.post_comments;
create policy comments_insert_own on public.post_comments for insert to authenticated
  with check (user_id = (select auth.uid())
              and not (select public.is_banned())
              and exists (select 1 from public.community_posts p where p.id = post_comments.post_id));
drop policy if exists comments_delete on public.post_comments;
create policy comments_delete on public.post_comments for delete to authenticated
  using (user_id = (select auth.uid())
         or exists (select 1 from public.community_posts p
                     where p.id = post_comments.post_id and p.user_id = (select auth.uid()))
         or (select public.is_admin()));

-- ---------- 4. Reports ----------
create table if not exists public.content_reports (
  id           uuid primary key default gen_random_uuid(),
  reporter_id  uuid not null references public.users (id) on delete cascade,
  post_id      uuid references public.community_posts (id) on delete cascade,
  comment_id   uuid references public.post_comments (id) on delete cascade,
  reason       text not null check (reason in ('spam', 'abuse', 'fake', 'personal', 'other')),
  note         text check (note is null or (char_length(note) <= 300 and note !~ '[\x01-\x08\x0b-\x1f\x7f]')),
  status       text not null default 'open' check (status in ('open', 'dismissed', 'actioned')),
  created_at   timestamptz not null default now(),
  resolved_at  timestamptz,
  resolved_by  uuid references public.users (id) on delete set null,
  check ((post_id is null) <> (comment_id is null))   -- exactly one target
);
create unique index if not exists content_reports_post_once on public.content_reports (reporter_id, post_id) where post_id is not null;
create unique index if not exists content_reports_comment_once on public.content_reports (reporter_id, comment_id) where comment_id is not null;
create index if not exists content_reports_open_idx on public.content_reports (created_at desc) where status = 'open';
alter table public.content_reports enable row level security;
revoke all on public.content_reports from anon, authenticated;
grant select on public.content_reports to authenticated;
grant insert (reporter_id, post_id, comment_id, reason, note) on public.content_reports to authenticated;
drop policy if exists reports_read on public.content_reports;
create policy reports_read on public.content_reports for select to authenticated
  using (reporter_id = (select auth.uid()) or (select public.is_admin()));
drop policy if exists reports_insert_own on public.content_reports;
create policy reports_insert_own on public.content_reports for insert to authenticated
  with check (reporter_id = (select auth.uid())
              and not (select public.is_banned())
              and (post_id is null or exists (select 1 from public.community_posts p where p.id = content_reports.post_id))
              and (comment_id is null or exists (select 1 from public.post_comments c where c.id = content_reports.comment_id)));

create table if not exists public.report_usage (
  user_id  uuid not null references public.users (id) on delete cascade,
  day      date not null,
  reports  integer not null default 0 check (reports >= 0),
  primary key (user_id, day)
);
alter table public.report_usage enable row level security;
revoke all on public.report_usage from anon, authenticated;

-- Not your own content, and the daily limit counted and enforced in one statement (a failed insert rolls it back).
create or replace function public.check_new_report() returns trigger
language plpgsql security definer set search_path = '' as $check_new_report$
declare
  author uuid;
  used   integer;
begin
  if new.post_id is not null then
    select p.user_id into author from public.community_posts p where p.id = new.post_id;
  else
    select c.user_id into author from public.post_comments c where c.id = new.comment_id;
  end if;
  if author is null then
    raise exception 'nothing to report' using errcode = 'P0002';
  end if;
  if author = new.reporter_id then
    raise exception 'cannot report your own content' using errcode = '22023';
  end if;
  insert into public.report_usage as ru (user_id, day, reports)
  values (new.reporter_id, (now() at time zone 'utc')::date, 1)
  on conflict (user_id, day) do update
    set reports = ru.reports + 1
    where ru.reports < 20
  returning ru.reports into used;
  if used is null then
    raise exception 'report limit reached' using errcode = '54000';
  end if;
  return new;
end $check_new_report$;
drop trigger if exists content_reports_check on public.content_reports;
create trigger content_reports_check before insert on public.content_reports
  for each row execute function public.check_new_report();
revoke execute on function public.check_new_report() from public, anon, authenticated;

-- Moderators close a report as dismissed or actioned.
create or replace function public.resolve_report(p_report uuid, p_status text) returns void
language plpgsql security definer set search_path = '' as $resolve_report$
begin
  if not public.is_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if p_status not in ('dismissed', 'actioned') then
    raise exception 'unknown status' using errcode = '22023';
  end if;
  update public.content_reports
     set status = p_status, resolved_at = now(), resolved_by = auth.uid()
   where id = p_report;
  if not found then
    raise exception 'report not found' using errcode = 'P0002';
  end if;
end $resolve_report$;
revoke execute on function public.resolve_report(uuid, text) from public, anon;
grant  execute on function public.resolve_report(uuid, text) to authenticated;

-- ---------- 5. Moderation actions ----------
-- Hide or show a post. Hiding closes the open reports about it.
create or replace function public.moderate_post(p_post uuid, p_hidden boolean) returns void
language plpgsql security definer set search_path = '' as $moderate_post$
begin
  if not public.is_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  update public.community_posts set hidden = p_hidden where id = p_post;
  if not found then
    raise exception 'post not found' using errcode = 'P0002';
  end if;
  if p_hidden then
    update public.content_reports
       set status = 'actioned', resolved_at = now(), resolved_by = auth.uid()
     where post_id = p_post and status = 'open';
  end if;
end $moderate_post$;
revoke execute on function public.moderate_post(uuid, boolean) from public, anon;
grant  execute on function public.moderate_post(uuid, boolean) to authenticated;

-- Ban or unban a maker. Moderators cannot be banned this way.
create or replace function public.set_banned(p_user uuid, p_banned boolean) returns void
language plpgsql security definer set search_path = '' as $set_banned$
begin
  if not public.is_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if exists (select 1 from public.app_admins a where a.user_id = p_user) then
    raise exception 'cannot ban a moderator' using errcode = '22023';
  end if;
  update public.users set banned = p_banned where id = p_user;
  if not found then
    raise exception 'user not found' using errcode = 'P0002';
  end if;
end $set_banned$;
revoke execute on function public.set_banned(uuid, boolean) from public, anon;
grant  execute on function public.set_banned(uuid, boolean) to authenticated;

-- ---------- 6. Notifications ----------
create table if not exists public.notifications (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references public.users (id) on delete cascade,   -- who is told
  kind        text not null check (kind in ('comment')),
  post_id     uuid not null references public.community_posts (id) on delete cascade,
  comment_id  uuid references public.post_comments (id) on delete cascade,
  actor_id    uuid not null references public.users (id) on delete cascade,   -- who did it
  created_at  timestamptz not null default now(),
  read_at     timestamptz
);
create index if not exists notifications_user_idx on public.notifications (user_id, created_at desc);
alter table public.notifications enable row level security;
revoke all on public.notifications from anon, authenticated;
grant select on public.notifications to authenticated;
grant update (read_at) on public.notifications to authenticated;
drop policy if exists notifications_read_own on public.notifications;
create policy notifications_read_own on public.notifications for select to authenticated
  using (user_id = (select auth.uid()));
drop policy if exists notifications_update_own on public.notifications;
create policy notifications_update_own on public.notifications for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

-- One notification per comment, for the post author, unless they commented themselves.
create or replace function public.notify_comment() returns trigger
language plpgsql security definer set search_path = '' as $notify_comment$
begin
  insert into public.notifications (user_id, kind, post_id, comment_id, actor_id)
  select p.user_id, 'comment', new.post_id, new.id, new.user_id
    from public.community_posts p
   where p.id = new.post_id and p.user_id <> new.user_id;
  return null;
end $notify_comment$;
drop trigger if exists post_comments_notify on public.post_comments;
create trigger post_comments_notify after insert on public.post_comments
  for each row execute function public.notify_comment();
revoke execute on function public.notify_comment() from public, anon, authenticated;

-- ---------- 7. Build counts ----------
-- Makers who shared a build of this guide, and how many of them marked it 100 percent working.
-- Runs with the rights of the caller, so hidden posts are not counted for others.
create or replace function public.project_build_counts(p_project uuid)
returns table (builders integer, working integer)
language sql stable security invoker set search_path = '' as $project_build_counts$
  select count(distinct p.user_id)::integer,
         (count(distinct p.user_id) filter (where p.status = 'working'))::integer
    from public.community_posts p
   where p.project_id = p_project
$project_build_counts$;
revoke execute on function public.project_build_counts(uuid) from public;
grant  execute on function public.project_build_counts(uuid) to anon, authenticated;

-- ---------- 8. Account deletion ----------
-- Deletes the caller from Supabase Auth. Foreign keys remove the profile, posts, comments, likes, progress, XP,
-- workbench, saved builds, reports and notifications. The app removes the photos of the caller from storage first.
create or replace function public.delete_my_account() returns void
language plpgsql security definer set search_path = '' as $delete_my_account$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;
  delete from auth.users where id = uid;
end $delete_my_account$;
revoke execute on function public.delete_my_account() from public, anon;
grant  execute on function public.delete_my_account() to authenticated;

-- ---------- 9. Moderator lists ----------
-- The banned flag is not readable by clients, so moderators get the list of banned makers from here.
create or replace function public.admin_banned_users() returns table (id uuid, name text)
language plpgsql stable security definer set search_path = '' as $admin_banned_users$
begin
  if not public.is_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  return query select u.id, u.name from public.users u where u.banned order by u.name;
end $admin_banned_users$;
revoke execute on function public.admin_banned_users() from public, anon;
grant  execute on function public.admin_banned_users() to authenticated;
