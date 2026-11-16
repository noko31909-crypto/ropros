-- Attack tests for 0004 (saved builds, moderators, bans, hidden posts, reports, notifications, account deletion).
-- Runs after 04_features.sql. Every check states the SECURE expectation: a FAIL line is a weakness.
\set ON_ERROR_STOP on
\set MOD 'c0c0c0c0-0000-4000-8000-0000000000c0'
\set REP 'd1d1d1d1-0000-4000-8000-0000000000d1'
\set AUT 'e2e2e2e2-0000-4000-8000-0000000000e2'
\set BAN 'f3f3f3f3-0000-4000-8000-0000000000f3'
\set DEL 'a4a4a4a4-0000-4000-8000-0000000000a4'
\set CAP 'b5b5b5b5-0000-4000-8000-0000000000b5'

-- ---------- fixtures (as the database owner) ----------
insert into auth.users (id, email, raw_user_meta_data) values
  (:'MOD', 'mod@example.com', '{"name":"mira"}'), (:'REP', 'rep@example.com', '{"name":"remy"}'),
  (:'AUT', 'aut@example.com', '{"name":"aida"}'), (:'BAN', 'ban@example.com', '{"name":"boris"}'),
  (:'DEL', 'del@example.com', '{"name":"dana"}'), (:'CAP', 'cap@example.com', '{"name":"cara"}');
insert into public.app_admins (user_id) values (:'MOD');
select id as proj from public.projects where slug = 'obstacle-avoiding-robot' \gset
insert into storage.objects (bucket_id, name, owner) values
  ('community', :'AUT' || '/one.jpg', :'AUT'), ('community', :'AUT' || '/two.jpg', :'AUT'),
  ('community', :'BAN' || '/ban.jpg', :'BAN'), ('community', :'DEL' || '/del.jpg', :'DEL');
insert into public.community_posts (user_id, title, status, image_url, project_id) values
  (:'AUT', 'Aida rover', 'working', :'AUT' || '/one.jpg', :'proj'),
  (:'AUT', 'Aida rover v2', 'debugging', :'AUT' || '/two.jpg', :'proj'),
  (:'DEL', 'Dana build', 'working', :'DEL' || '/del.jpg', null);
select id as aut1 from public.community_posts where title = 'Aida rover' \gset
select id as aut2 from public.community_posts where title = 'Aida rover v2' \gset
select id as delpost from public.community_posts where title = 'Dana build' \gset
insert into public.post_comments (post_id, user_id, body) values (:'aut1', :'AUT', 'Notes on the gearbox.');
insert into public.post_comments (post_id, user_id, body) values (:'aut2', :'REP', 'What battery did you use?');
select id as repcomment from public.post_comments where body = 'What battery did you use?' \gset
insert into public.saved_builds (user_id, slug) values (:'AUT', 'line-follower');

-- ---------- anonymous visitor ----------
select set_config('request.jwt.claim.sub', '', false);   -- an anonymous request carries no user id
set role anon;
select qa.deny('saved: anon cannot read saved builds', 'select count(*) from public.saved_builds');
select qa.deny('notify: anon cannot read notifications', 'select count(*) from public.notifications');
select qa.deny('reports: anon cannot read reports', 'select count(*) from public.content_reports');
select qa.deny('reports: anon cannot report', 'insert into public.content_reports (reporter_id, post_id, reason) values (' || quote_literal(:'REP') || ', ' || quote_literal(:'aut2') || ', ''spam'')');
select qa.deny('account: anon cannot delete accounts', 'select public.delete_my_account()');
select qa.eq('counts: anon sees how many built a guide and how many got it working', 'select builders || ''/'' || working from public.project_build_counts(' || quote_literal(:'proj') || '::uuid)', '1/1');
reset role;

-- ---------- saved builds (REP) ----------
set role authenticated;
select set_config('request.jwt.claim.sub', :'REP', false);
select qa.eq('saved: can save a guide', $q$with i as (insert into public.saved_builds (user_id, slug) values (auth.uid(), 'line-follower') returning 1) select count(*) from i$q$, '1');
select qa.deny('saved: cannot save for someone else', 'insert into public.saved_builds (user_id, slug) values (' || quote_literal(:'AUT') || ', ''iot-plant-care'')');
select qa.deny('saved: slugs are checked', $q$insert into public.saved_builds (user_id, slug) values (auth.uid(), 'Bad Slug!')$q$);
select qa.deny('saved: the same guide twice is rejected', $q$insert into public.saved_builds (user_id, slug) values (auth.uid(), 'line-follower')$q$);
select qa.eq('saved: sees only own saved builds', 'select count(*) from public.saved_builds where user_id <> auth.uid()', '0');
select qa.eq('saved: cannot delete another maker''s saved builds', 'with d as (delete from public.saved_builds where user_id = ' || quote_literal(:'AUT') || ' returning 1) select count(*) from d', '0');
insert into public.saved_builds (user_id, slug) select auth.uid(), 'guide-' || g from generate_series(1, 299) g;
select qa.deny('saved: at most 300 saved builds', $q$insert into public.saved_builds (user_id, slug) values (auth.uid(), 'one-too-many')$q$);
select qa.eq('saved: can remove own saved builds', $q$with d as (delete from public.saved_builds where user_id = auth.uid() and slug like 'guide-%' returning 1) select count(*) from d$q$, '299');

-- ---------- moderators ----------
select qa.deny('mods: cannot make yourself a moderator', 'insert into public.app_admins (user_id) values (auth.uid())');
select qa.eq('mods: a maker is not a moderator', 'select public.is_admin()::text', 'false');
select qa.eq('mods: cannot see who the moderators are', 'select count(*) from public.app_admins', '0');
select qa.deny('mods: a maker cannot hide posts', 'select public.moderate_post(' || quote_literal(:'aut1') || '::uuid, true)');
select qa.deny('mods: a maker cannot ban', 'select public.set_banned(' || quote_literal(:'BAN') || '::uuid, true)');
select qa.deny('mods: a maker cannot close reports', 'select public.resolve_report(gen_random_uuid(), ''dismissed'')');
select qa.deny('mods: a maker cannot hide own post either', 'update public.community_posts set hidden = true where user_id = auth.uid()');
select qa.deny('mods: the banned flag is private', 'select banned from public.users');
reset role;

-- ---------- hidden posts ----------
set role authenticated;
select set_config('request.jwt.claim.sub', :'MOD', false);
select qa.eq('mods: a moderator is a moderator', 'select public.is_admin()::text', 'true');
select qa.eq('hidden: a moderator can hide a post', 'select count(*) from (select public.moderate_post(' || quote_literal(:'aut1') || '::uuid, true)) s', '1');
select qa.eq('hidden: a moderator still sees it', 'select count(*) from public.community_posts where id = ' || quote_literal(:'aut1'), '1');
reset role;
select set_config('request.jwt.claim.sub', '', false);   -- an anonymous request carries no user id
set role anon;
select qa.eq('hidden: anon does not see a hidden post', 'select count(*) from public.community_posts where id = ' || quote_literal(:'aut1'), '0');
select qa.eq('hidden: anon cannot read its photo', 'select count(*) from storage.objects where name = ' || quote_literal(:'AUT' || '/one.jpg'), '0');
select qa.eq('hidden: anon cannot read its comments', 'select count(*) from public.post_comments where post_id = ' || quote_literal(:'aut1'), '0');
select qa.eq('hidden: hidden builds are not counted for others', 'select builders || ''/'' || working from public.project_build_counts(' || quote_literal(:'proj') || '::uuid)', '1/0');
reset role;
set role authenticated;
select set_config('request.jwt.claim.sub', :'AUT', false);
select qa.eq('hidden: the author still sees own hidden post', 'select count(*) from public.community_posts where id = ' || quote_literal(:'aut1'), '1');
select set_config('request.jwt.claim.sub', :'REP', false);
select qa.deny('hidden: nobody can comment on a hidden post', 'insert into public.post_comments (post_id, user_id, body) values (' || quote_literal(:'aut1') || ', auth.uid(), ''hi'')');
select qa.deny('hidden: nobody can like a hidden post', 'insert into public.post_likes (post_id, user_id) values (' || quote_literal(:'aut1') || ', auth.uid())');
select qa.deny('hidden: nobody can report a post they cannot see', 'insert into public.content_reports (reporter_id, post_id, reason) values (auth.uid(), ' || quote_literal(:'aut1') || ', ''spam'')');
reset role;
set role authenticated;
select set_config('request.jwt.claim.sub', :'MOD', false);
select qa.eq('hidden: a moderator can show it again', 'select count(*) from (select public.moderate_post(' || quote_literal(:'aut1') || '::uuid, false)) s', '1');
reset role;
select set_config('request.jwt.claim.sub', '', false);   -- an anonymous request carries no user id
set role anon;
select qa.eq('hidden: shown again for everyone', 'select count(*) from public.community_posts where id = ' || quote_literal(:'aut1'), '1');
reset role;

-- ---------- bans ----------
set role authenticated;
select set_config('request.jwt.claim.sub', :'MOD', false);
select qa.deny('bans: moderators cannot be banned', 'select public.set_banned(auth.uid(), true)');
select qa.eq('bans: a moderator can ban a maker', 'select count(*) from (select public.set_banned(' || quote_literal(:'BAN') || '::uuid, true)) s', '1');
select set_config('request.jwt.claim.sub', :'BAN', false);
select qa.deny('bans: a banned maker cannot post', 'insert into public.community_posts (user_id, title, image_url) values (auth.uid(), ''x'', ' || quote_literal(:'BAN' || '/ban.jpg') || ')');
select qa.deny('bans: a banned maker cannot comment', 'insert into public.post_comments (post_id, user_id, body) values (' || quote_literal(:'aut2') || ', auth.uid(), ''spam'')');
select qa.deny('bans: a banned maker cannot like', 'insert into public.post_likes (post_id, user_id) values (' || quote_literal(:'aut2') || ', auth.uid())');
select qa.deny('bans: a banned maker cannot report', 'insert into public.content_reports (reporter_id, post_id, reason) values (auth.uid(), ' || quote_literal(:'aut2') || ', ''spam'')');
select qa.deny('bans: a banned maker cannot upload photos', 'insert into storage.objects (bucket_id, name, owner) values (''community'', ' || quote_literal(:'BAN' || '/new.jpg') || ', auth.uid())');
select qa.eq('bans: a banned maker can still read the feed', 'select (count(*) > 0)::text from public.community_posts', 'true');
select set_config('request.jwt.claim.sub', :'MOD', false);
select qa.eq('bans: a moderator can lift a ban', 'select count(*) from (select public.set_banned(' || quote_literal(:'BAN') || '::uuid, false)) s', '1');
select set_config('request.jwt.claim.sub', :'BAN', false);
select qa.eq('bans: after the ban is lifted the maker can comment again', 'with i as (insert into public.post_comments (post_id, user_id, body) values (' || quote_literal(:'aut2') || ', auth.uid(), ''Back.'') returning 1) select count(*) from i', '1');
reset role;

-- ---------- reports ----------
set role authenticated;
select set_config('request.jwt.claim.sub', :'REP', false);
select qa.eq('reports: can report a post', 'with i as (insert into public.content_reports (reporter_id, post_id, reason, note) values (auth.uid(), ' || quote_literal(:'aut2') || ', ''fake'', ''Stock photo'') returning 1) select count(*) from i', '1');
select qa.deny('reports: the same post twice is rejected', 'insert into public.content_reports (reporter_id, post_id, reason) values (auth.uid(), ' || quote_literal(:'aut2') || ', ''spam'')');
select qa.deny('reports: cannot report your own comment', 'insert into public.content_reports (reporter_id, comment_id, reason) values (auth.uid(), ' || quote_literal(:'repcomment') || ', ''spam'')');
select qa.deny('reports: cannot report as someone else', 'insert into public.content_reports (reporter_id, post_id, reason) values (' || quote_literal(:'AUT') || ', ' || quote_literal(:'aut1') || ', ''spam'')');
select qa.deny('reports: reasons are checked', 'insert into public.content_reports (reporter_id, post_id, reason) values (auth.uid(), ' || quote_literal(:'aut1') || ', ''because'')');
select qa.deny('reports: notes over 300 characters are rejected', 'insert into public.content_reports (reporter_id, post_id, reason, note) values (auth.uid(), ' || quote_literal(:'aut1') || ', ''other'', repeat(''a'', 301))');
select qa.deny('reports: control characters in notes are rejected', 'insert into public.content_reports (reporter_id, post_id, reason, note) values (auth.uid(), ' || quote_literal(:'aut1') || ', ''other'', e''a\x07b'')');
select qa.deny('reports: one report has exactly one target', 'insert into public.content_reports (reporter_id, post_id, comment_id, reason) values (auth.uid(), ' || quote_literal(:'aut1') || ', ' || quote_literal(:'repcomment') || ', ''spam'')');
select qa.deny('reports: the status cannot be set by the reporter', 'insert into public.content_reports (reporter_id, post_id, reason, status) values (auth.uid(), ' || quote_literal(:'aut1') || ', ''spam'', ''actioned'')');
select qa.eq('reports: a reporter sees own reports', 'select count(*) from public.content_reports where reporter_id = auth.uid()', '1');
select qa.deny('reports: a reporter cannot close a report', 'update public.content_reports set status = ''dismissed''');
select qa.deny('reports: a reporter cannot delete a report', 'delete from public.content_reports');
select set_config('request.jwt.claim.sub', :'AUT', false);
select qa.eq('reports: the reported author cannot see who reported', 'select count(*) from public.content_reports', '0');
select set_config('request.jwt.claim.sub', :'MOD', false);
select qa.eq('reports: a moderator sees open reports', 'select count(*) from public.content_reports where status = ''open''', '1');
select qa.eq('reports: hiding a post closes its reports', 'select count(*) from (select public.moderate_post(' || quote_literal(:'aut2') || '::uuid, true)) s', '1');
select qa.eq('reports: closed as actioned', 'select status from public.content_reports where post_id = ' || quote_literal(:'aut2'), 'actioned');
select qa.eq('reports: a moderator can dismiss a report', 'select count(*) from (select public.resolve_report(id, ''dismissed'') from public.content_reports where post_id = ' || quote_literal(:'aut2') || ') s', '1');
select count(*) from (select public.moderate_post(:'aut2'::uuid, false)) s;
select qa.eq('reports: a moderator can delete any comment', 'with d as (delete from public.post_comments where id = ' || quote_literal(:'repcomment') || ' returning 1) select count(*) from d', '1');
reset role;

-- Daily report limit: 20 per maker per UTC day.
insert into public.post_comments (post_id, user_id, body) select :'aut2', :'AUT', 'target ' || g from generate_series(1, 25) g;
set role authenticated;
select set_config('request.jwt.claim.sub', :'CAP', false);
insert into public.content_reports (reporter_id, comment_id, reason)
  select auth.uid(), c.id, 'spam' from public.post_comments c where c.body like 'target %' order by c.body limit 20;
select qa.deny('reports: at most 20 reports per maker per day', 'insert into public.content_reports (reporter_id, comment_id, reason) select auth.uid(), c.id, ''spam'' from public.post_comments c where c.body = ''target 9''');
select qa.deny('reports: the counter cannot be read or reset', 'update public.report_usage set reports = 0');
reset role;

-- ---------- notifications ----------
set role authenticated;
select set_config('request.jwt.claim.sub', :'REP', false);
insert into public.post_comments (post_id, user_id, body) values (:'aut2', auth.uid(), 'Nice work!');
select set_config('request.jwt.claim.sub', :'AUT', false);
select qa.eq('notify: the author is told about a new comment', $q$select count(*) from public.notifications n join public.post_comments c on c.id = n.comment_id where n.user_id = auth.uid() and c.body = 'Nice work!'$q$, '1');
insert into public.post_comments (post_id, user_id, body) values (:'aut2', auth.uid(), 'Thanks!');
select qa.eq('notify: no notification for your own comment', $q$select count(*) from public.notifications n join public.post_comments c on c.id = n.comment_id where c.body = 'Thanks!'$q$, '0');
select qa.eq('notify: can mark own notifications read', 'with u as (update public.notifications set read_at = now() where user_id = auth.uid() and read_at is null returning 1) select (count(*) > 0)::text from u', 'true');
select qa.deny('notify: cannot redirect a notification', 'update public.notifications set user_id = ' || quote_literal(:'REP') || ' where user_id = auth.uid()');
select qa.deny('notify: cannot create notifications', 'insert into public.notifications (user_id, kind, post_id, actor_id) values (auth.uid(), ''comment'', ' || quote_literal(:'aut2') || ', auth.uid())');
select set_config('request.jwt.claim.sub', :'REP', false);
select qa.eq('notify: cannot read someone else''s notifications', 'select count(*) from public.notifications where user_id = ' || quote_literal(:'AUT'), '0');
select qa.eq('notify: cannot mark someone else''s notifications read', 'with u as (update public.notifications set read_at = null where user_id = ' || quote_literal(:'AUT') || ' returning 1) select count(*) from u', '0');
delete from public.post_comments where user_id = auth.uid() and body = 'Nice work!';
reset role;
select qa.eq('notify: deleting the comment removes its notification', $q$select count(*) from public.notifications n where n.actor_id = 'd1d1d1d1-0000-4000-8000-0000000000d1' and n.comment_id is not null and not exists (select 1 from public.post_comments c where c.id = n.comment_id)$q$, '0');

-- ---------- account deletion ----------
insert into public.saved_builds (user_id, slug) values (:'DEL', 'line-follower');
insert into public.user_parts (user_id, part_id) values (:'DEL', 'uno');
insert into public.post_comments (post_id, user_id, body) values (:'aut2', :'DEL', 'From Dana.');
insert into public.post_likes (post_id, user_id) values (:'aut2', :'DEL');
set role authenticated;
select set_config('request.jwt.claim.sub', :'DEL', false);
select qa.eq('account: a maker can delete their own account', 'select count(*) from (select public.delete_my_account()) s', '1');
reset role;
select qa.eq('account: the sign-in is gone', 'select count(*) from auth.users where id = ' || quote_literal(:'DEL'), '0');
select qa.eq('account: the profile is gone', 'select count(*) from public.users where id = ' || quote_literal(:'DEL'), '0');
select qa.eq('account: posts, comments, likes, parts and saved builds are gone',
  'select (select count(*) from public.community_posts where user_id = ' || quote_literal(:'DEL') || ') + (select count(*) from public.post_comments where user_id = ' || quote_literal(:'DEL') || ') + (select count(*) from public.post_likes where user_id = ' || quote_literal(:'DEL') || ') + (select count(*) from public.user_parts where user_id = ' || quote_literal(:'DEL') || ') + (select count(*) from public.saved_builds where user_id = ' || quote_literal(:'DEL') || ')', '0');
select qa.eq('account: counters follow (likes on the post they liked)', 'select likes_count from public.community_posts where id = ' || quote_literal(:'aut2'), '0');
select qa.eq('account: other makers are untouched', 'select count(*) from public.users where id in (' || quote_literal(:'AUT') || ', ' || quote_literal(:'REP') || ')', '2');
