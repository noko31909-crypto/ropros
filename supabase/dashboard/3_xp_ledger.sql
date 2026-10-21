-- ---------- XP ledger: every award happens at most once ----------
create table public.xp_events (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references public.users (id) on delete cascade,
  reason      text not null check (reason in ('simulate', 'complete', 'post', 'post_working')),
  ref_id      uuid not null,
  amount      integer not null check (amount between 0 and 1000),
  created_at  timestamptz not null default now(),
  unique (user_id, reason, ref_id)
);

create function public.award_xp(p_user uuid, p_reason text, p_ref uuid, p_amount integer) returns void
language plpgsql security definer set search_path = '' as $fn$
declare inserted integer;
begin
  insert into public.xp_events (user_id, reason, ref_id, amount)
  values (p_user, p_reason, p_ref, p_amount)
  on conflict (user_id, reason, ref_id) do nothing;
  get diagnostics inserted = row_count;
  if inserted = 1 then                       -- first time only: no double XP on repeat clicks
    update public.users set xp = xp + p_amount where id = p_user;
  end if;
end $fn$;

