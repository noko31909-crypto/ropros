-- ropros moderation and notifications, part g of 7: Moderator lists
-- Paste the whole file into the Supabase SQL editor and run it. Parts go in order, 8a first.
-- Safe to run again: anything already there is skipped or replaced.
-- A notice saying a relation already exists is normal, not an error.

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
