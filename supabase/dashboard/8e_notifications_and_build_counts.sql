-- ropros moderation and notifications, part e of 7: Notifications and build counts
-- Paste the whole file into the Supabase SQL editor and run it. Parts go in order, 8a first.
-- Safe to run again: anything already there is skipped or replaced.
-- A notice saying a relation already exists is normal, not an error.

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
