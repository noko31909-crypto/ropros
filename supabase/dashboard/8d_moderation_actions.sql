-- ropros moderation and notifications, part d of 7: Moderation actions
-- Paste the whole file into the Supabase SQL editor and run it. Parts go in order, 8a first.
-- Safe to run again: anything already there is skipped or replaced.
-- A notice saying a relation already exists is normal, not an error.

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
