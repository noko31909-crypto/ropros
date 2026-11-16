-- ropros workbench and comments, part b of 2: Comments
-- Paste the whole file into the Supabase SQL editor and run it. Parts go in order, 7a first.
-- Safe to run again: anything already there is skipped or replaced.
-- A notice saying a relation already exists is normal, not an error.

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
