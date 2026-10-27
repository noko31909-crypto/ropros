-- ropros security hardening, part c of 5: Sign-up profile and the daily XP cap
-- Paste the whole file into the Supabase SQL editor and run it. Parts go in order, 6a first.
-- Safe to run again: anything already there is skipped or replaced.
-- A notice saying a relation already exists is normal, not an error.

-- Sign-up profile: name from the sign-up form only, 8 random hex characters as suffix, retried on a clash.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $handle_new_user$
declare
  clean text := left(regexp_replace(coalesce(new.raw_user_meta_data ->> 'name', ''), '[^A-Za-z0-9_.]', '', 'g'), 15);
  tries integer := 0;
begin
  if length(clean) < 3 or public.is_reserved_name(clean) then
    clean := 'maker';
  end if;
  loop
    begin
      insert into public.users (id, email, name)
      values (new.id, new.email, clean || '_' || substr(md5(new.id::text || tries::text), 1, 8));
      return new;
    exception when unique_violation then
      tries := tries + 1;
      if tries >= 5 then
        raise;
      end if;
    end;
  end loop;
end $handle_new_user$;

-- ---------- 5. Progress XP cap ----------
create or replace function public.award_xp_capped(p_user uuid, p_reason text, p_ref uuid, p_amount integer, p_daily_cap integer)
returns void
language plpgsql security definer set search_path = '' as $award_xp_capped$
declare
  paid_today integer;
begin
  perform pg_advisory_xact_lock(hashtextextended('xp_cap:' || p_reason || ':' || p_user::text, 0));
  select count(*) into paid_today
    from public.xp_events
   where user_id = p_user and reason = p_reason
     and created_at >= date_trunc('day', now() at time zone 'utc') at time zone 'utc';
  if paid_today < p_daily_cap then
    perform public.award_xp(p_user, p_reason, p_ref, p_amount);
  end if;
end $award_xp_capped$;
revoke execute on function public.award_xp_capped(uuid, text, uuid, integer, integer) from public, anon, authenticated;
