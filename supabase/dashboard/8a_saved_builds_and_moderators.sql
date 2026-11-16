-- ropros moderation and notifications, part a of 6: Saved builds and moderators
-- Paste the whole file into the Supabase SQL editor and run it. Parts go in order, 8a first.
-- Safe to run again: anything already there is skipped or replaced.
-- A notice saying a relation already exists is normal, not an error.

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
