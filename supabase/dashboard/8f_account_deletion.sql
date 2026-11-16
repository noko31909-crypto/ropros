-- ropros moderation and notifications, part f of 7: Account deletion
-- Paste the whole file into the Supabase SQL editor and run it. Parts go in order, 8a first.
-- Safe to run again: anything already there is skipped or replaced.
-- A notice saying a relation already exists is normal, not an error.

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
