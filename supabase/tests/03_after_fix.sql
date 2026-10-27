-- Tests that only make sense once 0002 is applied: assistant quota, XP cap paying on a later day. Runs after 02_attacks.sql.
\set ON_ERROR_STOP on
\set A '11111111-1111-1111-1111-111111111111'
\set B '22222222-2222-2222-2222-222222222222'

set role anon;
select qa.deny('quota: anon cannot use the assistant quota', 'select public.consume_assistant_quota(5)');
reset role;

set role authenticated;
select set_config('request.jwt.claim.sub', :'A', false);
select qa.eq('quota: 1st of 3 allowed', 'select public.consume_assistant_quota(3)::text', 'true');
select qa.eq('quota: 2nd of 3 allowed', 'select public.consume_assistant_quota(3)::text', 'true');
select qa.eq('quota: 3rd of 3 allowed', 'select public.consume_assistant_quota(3)::text', 'true');
select qa.eq('quota: 4th refused', 'select public.consume_assistant_quota(3)::text', 'false');
select qa.eq('quota: counter stops at the limit', 'select requests from public.assistant_usage where user_id = auth.uid()', '3');
select qa.deny('quota: cannot reset own counter', 'update public.assistant_usage set requests = 0');
select qa.deny('quota: cannot add usage rows', 'insert into public.assistant_usage (user_id, day, requests) values (auth.uid(), current_date + 1, 0)');
select qa.deny('quota: cannot delete usage rows', 'delete from public.assistant_usage');
reset role;

insert into public.assistant_usage (user_id, day, requests) values (:'B', (now() at time zone 'utc')::date, 7);
set role authenticated;
select set_config('request.jwt.claim.sub', :'A', false);
select qa.eq('quota: sees only own usage', 'select count(*) from public.assistant_usage', '1');
reset role;

update public.assistant_usage set day = day - 1 where user_id = :'A';
set role authenticated;
select set_config('request.jwt.claim.sub', :'A', false);
select qa.eq('quota: resets on a new UTC day', 'select public.consume_assistant_quota(3)::text', 'true');
reset role;

-- A guide that hit the XP cap still pays when completed again on a later day (H from 02_attacks.sql).
\set H '77777777-7777-7777-7777-777777777777'
update public.xp_events set created_at = created_at - interval '1 day' where user_id = :'H';
set role authenticated;
select set_config('request.jwt.claim.sub', :'H', false);
select count(*) from public.record_progress((select id from public.projects where slug = 'fixture-4'), 'complete');
select qa.eq('xp cap: unpaid guide pays on a later day (+100)', 'select xp from public.users where id = auth.uid()', '550');
reset role;
