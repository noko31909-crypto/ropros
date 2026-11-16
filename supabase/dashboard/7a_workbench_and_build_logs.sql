-- ropros workbench and comments, part a of 2: Workbench and build logs
-- Paste the whole file into the Supabase SQL editor and run it. Parts go in order, 7a first.
-- Safe to run again: anything already there is skipped or replaced.
-- A notice saying a relation already exists is normal, not an error.

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
