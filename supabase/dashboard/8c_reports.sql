-- ropros moderation and notifications, part c of 7: Reports
-- Paste the whole file into the Supabase SQL editor and run it. Parts go in order, 8a first.
-- Safe to run again: anything already there is skipped or replaced.
-- A notice saying a relation already exists is normal, not an error.

-- ---------- 4. Reports ----------
create table if not exists public.content_reports (
  id           uuid primary key default gen_random_uuid(),
  reporter_id  uuid not null references public.users (id) on delete cascade,
  post_id      uuid references public.community_posts (id) on delete cascade,
  comment_id   uuid references public.post_comments (id) on delete cascade,
  reason       text not null check (reason in ('spam', 'abuse', 'fake', 'personal', 'other')),
  note         text check (note is null or (char_length(note) <= 300 and note !~ '[\x01-\x08\x0b-\x1f\x7f]')),
  status       text not null default 'open' check (status in ('open', 'dismissed', 'actioned')),
  created_at   timestamptz not null default now(),
  resolved_at  timestamptz,
  resolved_by  uuid references public.users (id) on delete set null,
  check ((post_id is null) <> (comment_id is null))   -- exactly one target
);
create unique index if not exists content_reports_post_once on public.content_reports (reporter_id, post_id) where post_id is not null;
create unique index if not exists content_reports_comment_once on public.content_reports (reporter_id, comment_id) where comment_id is not null;
create index if not exists content_reports_open_idx on public.content_reports (created_at desc) where status = 'open';
alter table public.content_reports enable row level security;
revoke all on public.content_reports from anon, authenticated;
grant select on public.content_reports to authenticated;
grant insert (reporter_id, post_id, comment_id, reason, note) on public.content_reports to authenticated;
drop policy if exists reports_read on public.content_reports;
create policy reports_read on public.content_reports for select to authenticated
  using (reporter_id = (select auth.uid()) or (select public.is_admin()));
drop policy if exists reports_insert_own on public.content_reports;
create policy reports_insert_own on public.content_reports for insert to authenticated
  with check (reporter_id = (select auth.uid())
              and not (select public.is_banned())
              and (post_id is null or exists (select 1 from public.community_posts p where p.id = content_reports.post_id))
              and (comment_id is null or exists (select 1 from public.post_comments c where c.id = content_reports.comment_id)));

create table if not exists public.report_usage (
  user_id  uuid not null references public.users (id) on delete cascade,
  day      date not null,
  reports  integer not null default 0 check (reports >= 0),
  primary key (user_id, day)
);
alter table public.report_usage enable row level security;
revoke all on public.report_usage from anon, authenticated;

-- Not your own content, and the daily limit counted and enforced in one statement (a failed insert rolls it back).
create or replace function public.check_new_report() returns trigger
language plpgsql security definer set search_path = '' as $check_new_report$
declare
  author uuid;
  used   integer;
begin
  if new.post_id is not null then
    select p.user_id into author from public.community_posts p where p.id = new.post_id;
  else
    select c.user_id into author from public.post_comments c where c.id = new.comment_id;
  end if;
  if author is null then
    raise exception 'nothing to report' using errcode = 'P0002';
  end if;
  if author = new.reporter_id then
    raise exception 'cannot report your own content' using errcode = '22023';
  end if;
  insert into public.report_usage as ru (user_id, day, reports)
  values (new.reporter_id, (now() at time zone 'utc')::date, 1)
  on conflict (user_id, day) do update
    set reports = ru.reports + 1
    where ru.reports < 20
  returning ru.reports into used;
  if used is null then
    raise exception 'report limit reached' using errcode = '54000';
  end if;
  return new;
end $check_new_report$;
drop trigger if exists content_reports_check on public.content_reports;
create trigger content_reports_check before insert on public.content_reports
  for each row execute function public.check_new_report();
revoke execute on function public.check_new_report() from public, anon, authenticated;

-- Moderators close a report as dismissed or actioned.
create or replace function public.resolve_report(p_report uuid, p_status text) returns void
language plpgsql security definer set search_path = '' as $resolve_report$
begin
  if not public.is_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if p_status not in ('dismissed', 'actioned') then
    raise exception 'unknown status' using errcode = '22023';
  end if;
  update public.content_reports
     set status = p_status, resolved_at = now(), resolved_by = auth.uid()
   where id = p_report;
  if not found then
    raise exception 'report not found' using errcode = 'P0002';
  end if;
end $resolve_report$;
revoke execute on function public.resolve_report(uuid, text) from public, anon;
grant  execute on function public.resolve_report(uuid, text) to authenticated;
