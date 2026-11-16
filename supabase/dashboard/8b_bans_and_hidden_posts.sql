-- ropros moderation and notifications, part b of 6: Bans and hidden posts
-- Paste the whole file into the Supabase SQL editor and run it. Parts go in order, 8a first.
-- Safe to run again: anything already there is skipped or replaced.
-- A notice saying a relation already exists is normal, not an error.

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
