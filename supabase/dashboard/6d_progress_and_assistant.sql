-- ropros security hardening, part d of 5: Progress RPC and the assistant quota
-- Paste the whole file into the Supabase SQL editor and run it. Parts go in order, 6a first.
-- Safe to run again: anything already there is skipped or replaced.
-- A notice saying a relation already exists is normal, not an error.

-- Same as 0001 except the two award lines, which now go through the daily cap.
-- A guide that was not paid today still pays when it is completed again on a later day.
create or replace function public.record_progress(p_project uuid, p_action text)
returns table (status public.progress_status, is_completed boolean, xp integer, level integer)
language plpgsql security definer set search_path = '' as $record_progress$
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

  if new_status = 'simulated' then perform public.award_xp_capped(uid, 'simulate', p_project, 30, 5); end if;
  if new_status = 'completed' then perform public.award_xp_capped(uid, 'complete', p_project, reward, 3); end if;

  return query
    select up.status, up.is_completed, u.xp, u.level
      from public.user_progress up join public.users u on u.id = up.user_id
     where up.user_id = uid and up.project_id = p_project;
end $record_progress$;

-- ---------- 6. Assistant daily quota ----------
create table if not exists public.assistant_usage (
  user_id   uuid not null references public.users (id) on delete cascade,
  day       date not null,
  requests  integer not null default 0 check (requests >= 0),
  primary key (user_id, day)
);
alter table public.assistant_usage enable row level security;
revoke all on public.assistant_usage from anon, authenticated;
grant select on public.assistant_usage to authenticated;
drop policy if exists assistant_usage_read_own on public.assistant_usage;
create policy assistant_usage_read_own on public.assistant_usage for select to authenticated
  using (user_id = (select auth.uid()));

-- Counts one request for the caller and says whether it fits under the daily limit.
-- The caller is always auth.uid(). Calling it directly only spends your own quota.
create or replace function public.consume_assistant_quota(p_daily_limit integer) returns boolean
language plpgsql security definer set search_path = '' as $consume_assistant_quota$
declare
  uid  uuid := auth.uid();
  used integer;
begin
  if uid is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;
  insert into public.assistant_usage as au (user_id, day, requests)
  values (uid, (now() at time zone 'utc')::date, 1)
  on conflict (user_id, day) do update
    set requests = au.requests + 1
    where au.requests < greatest(1, least(p_daily_limit, 1000))
  returning au.requests into used;
  return used is not null;
end $consume_assistant_quota$;
revoke execute on function public.consume_assistant_quota(integer) from public, anon;
grant  execute on function public.consume_assistant_quota(integer) to authenticated;
