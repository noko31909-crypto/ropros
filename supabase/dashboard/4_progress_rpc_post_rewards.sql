-- ---------- RPC used by POST /api/progress ----------
-- The caller is always auth.uid(); the client never sends a user id.
create function public.record_progress(p_project uuid, p_action text)
returns table (status public.progress_status, is_completed boolean, xp integer, level integer)
language plpgsql security definer set search_path = '' as $fn$
#variable_conflict use_column
declare
  uid        uuid := auth.uid();
  new_status public.progress_status;
  reward     integer;
begin
  if uid is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  new_status := case p_action
                  when 'start'    then 'in_progress'::public.progress_status
                  when 'simulate' then 'simulated'::public.progress_status
                  when 'complete' then 'completed'::public.progress_status
                end;
  if new_status is null then
    raise exception 'unknown action' using errcode = '22023';
  end if;

  select p.xp_reward into reward from public.projects p where p.id = p_project and p.is_published;
  if not found then
    raise exception 'project not found' using errcode = 'P0002';
  end if;

  -- Atomic upsert: status only moves forward, timestamps are set once.
  insert into public.user_progress as up (user_id, project_id, status, simulated_at, completed_at)
  values (uid, p_project, new_status,
          case when new_status >= 'simulated' then now() end,
          case when new_status = 'completed' then now() end)
  on conflict (user_id, project_id) do update
    set status       = greatest(up.status, excluded.status),
        simulated_at = coalesce(up.simulated_at, excluded.simulated_at),
        completed_at = coalesce(up.completed_at, excluded.completed_at),
        updated_at   = now();

  if new_status = 'simulated' then perform public.award_xp(uid, 'simulate', p_project, 30); end if;
  if new_status = 'completed' then perform public.award_xp(uid, 'complete', p_project, reward); end if;

  return query
    select up.status, up.is_completed, u.xp, u.level
      from public.user_progress up join public.users u on u.id = up.user_id
     where up.user_id = uid and up.project_id = p_project;
end $fn$;

-- XP for sharing a build (once per post; extra once if it works).
-- Farm protection: at most 3 rewarded posts per user per UTC day, so delete/re-post loops earn nothing.
-- 'post_working' is only paid for a post that itself earned the base 'post' reward.
create function public.reward_post() returns trigger
language plpgsql security definer set search_path = '' as $fn$
declare
  rewarded_today integer;
  base_rewarded  boolean;
begin
  -- Serialize awards per user so concurrent inserts can't all pass the daily check.
  perform pg_advisory_xact_lock(hashtextextended('reward_post:' || new.user_id::text, 0));

  select exists (select 1 from public.xp_events
                  where user_id = new.user_id and reason = 'post' and ref_id = new.id)
    into base_rewarded;

  if not base_rewarded and tg_op = 'INSERT' then
    select count(*) into rewarded_today
      from public.xp_events
     where user_id = new.user_id and reason = 'post'
       and created_at >= date_trunc('day', now() at time zone 'utc') at time zone 'utc';
    if rewarded_today < 3 then
      perform public.award_xp(new.user_id, 'post', new.id, 100);
      base_rewarded := true;
    end if;
  end if;

  if base_rewarded and new.status = 'working' then
    perform public.award_xp(new.user_id, 'post_working', new.id, 150);
  end if;
  return null;
end $fn$;
create index xp_events_daily_idx on public.xp_events (user_id, reason, created_at desc);
create trigger community_posts_reward after insert or update of status on public.community_posts
  for each row execute function public.reward_post();

