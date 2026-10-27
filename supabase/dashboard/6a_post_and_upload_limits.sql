-- ropros security hardening, part a of 5: Post limits and the upload quota
-- Paste the whole file into the Supabase SQL editor and run it. Parts go in order, 6a first.
-- Safe to run again: anything already there is skipped or replaced.
-- A notice saying a relation already exists is normal, not an error.

-- ---------- 1. New posts ----------
create table if not exists public.post_usage (
  user_id  uuid not null references public.users (id) on delete cascade,
  day      date not null,
  posts    integer not null default 0 check (posts >= 0),
  primary key (user_id, day)
);
alter table public.post_usage enable row level security;
revoke all on public.post_usage from anon, authenticated;

create index if not exists community_posts_image_idx on public.community_posts (image_url);

create or replace function public.check_new_post() returns trigger
language plpgsql security definer set search_path = '' as $check_new_post$
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
end $check_new_post$;
drop trigger if exists community_posts_check on public.community_posts;
create trigger community_posts_check before insert on public.community_posts
  for each row execute function public.check_new_post();
revoke execute on function public.check_new_post() from public, anon, authenticated;

-- ---------- 2. Upload quota ----------
-- The share flow uploads a photo and posts it right away, so honest users never hold more than one.
-- The per-user lock makes parallel uploads queue up, so a burst cannot slip past the count.
create or replace function public.community_upload_allowed() returns boolean
language plpgsql security definer set search_path = '' as $community_upload_allowed$
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
end $community_upload_allowed$;
revoke execute on function public.community_upload_allowed() from public, anon;
grant  execute on function public.community_upload_allowed() to authenticated;

-- ---------- 3. Avatars ----------
revoke update (avatar_url) on public.users from authenticated;
