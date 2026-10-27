-- ropros security hardening, part b of 5: Display-name rules
-- Paste the whole file into the Supabase SQL editor and run it. Parts go in order, 6a first.
-- Safe to run again: anything already there is skipped or replaced.
-- A notice saying a relation already exists is normal, not an error.

-- ---------- 4. Display names ----------
create or replace function public.is_reserved_name(p_name text) returns boolean
language sql immutable set search_path = '' as $is_reserved_name$
  select p_name ~* '(ropros|admin|moderat|support|official|staff|system|security)'
$is_reserved_name$;

-- Renames through the API cannot pick a staff-like name. The SQL editor (database owner) still can.
create or replace function public.guard_user_rename() returns trigger
language plpgsql set search_path = '' as $guard_user_rename$
begin
  if new.name is distinct from old.name
     and current_user in ('anon', 'authenticated')
     and public.is_reserved_name(new.name) then
    raise exception 'name reserved' using errcode = '23514';
  end if;
  return new;
end $guard_user_rename$;
drop trigger if exists users_guard_rename on public.users;
create trigger users_guard_rename before update of name on public.users
  for each row execute function public.guard_user_rename();
revoke execute on function public.guard_user_rename() from public, anon, authenticated;
