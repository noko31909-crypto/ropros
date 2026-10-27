-- Attack tests against the ropros schema. Every check states the SECURE expectation:
-- a FAIL line is a weakness. Users: A (attacker) and B (victim).
\set ON_ERROR_STOP on
\set A '11111111-1111-1111-1111-111111111111'
\set B '22222222-2222-2222-2222-222222222222'

-- ---------- fixtures (as the database owner; helpers come from 01_qa.sql) ----------
insert into auth.users (id, email, raw_user_meta_data) values
  (:'A', 'alice@example.com', '{"name":"alice"}'),
  (:'B', 'bob@example.com',   '{"name":"bob"}');
insert into public.projects (slug, title, platform, difficulty, components_required, xp_reward, is_published)
values ('secret-draft', 'Unreleased draft', 'arduino', 'beginner', array['x'], 1000, false);
insert into public.projects (slug, title, platform, difficulty, components_required, xp_reward, is_published)
  select 'fixture-' || g, 'Fixture ' || g, 'arduino', 'beginner', array['x'], 100, true from generate_series(1, 4) g;
select id as draft_id from public.projects where slug = 'secret-draft' \gset
select id as lf_id    from public.projects where slug = 'line-follower' \gset
-- B has one live post with a photo, plus a photo left behind by a post B deleted.
insert into storage.objects (bucket_id, name, owner) values
  ('community', :'B' || '/build.jpg', :'B'),
  ('community', :'B' || '/deleted-post.jpg', :'B');
insert into public.community_posts (user_id, title, status, image_url)
values (:'B', 'Bob build', 'debugging', :'B' || '/build.jpg');

-- ---------- anonymous visitor ----------
set role anon;
select qa.deny('anon: cannot read emails', 'select email from public.users');
select qa.eq('anon: can read public profile fields', 'select count(*) from (select id, name, xp, level from public.users) s', '2');
select qa.eq('anon: unpublished projects stay hidden', $q$select count(*) from public.projects where slug = 'secret-draft'$q$, '0');
select qa.deny('anon: cannot call record_progress', 'select * from public.record_progress(' || quote_literal(:'lf_id') || '::uuid, ''complete'')');
select qa.deny('anon: cannot call award_xp', 'select public.award_xp(' || quote_literal(:'A') || '::uuid, ''complete'', gen_random_uuid(), 1000)');
select qa.deny('anon: cannot create posts', 'insert into public.community_posts (user_id, title, image_url) values (' || quote_literal(:'A') || ', ''x'', ' || quote_literal(:'A' || '/a.jpg') || ')');
select qa.deny('anon: cannot like', 'insert into public.post_likes (post_id, user_id) select id, ' || quote_literal(:'A') || ' from public.community_posts limit 1');
select qa.eq('anon: can only see photos attached to a live post', $q$select count(*) from storage.objects where bucket_id = 'community'$q$, '1');
reset role;

-- ---------- signed-in attacker A ----------
set role authenticated;
select set_config('request.jwt.claim.sub', :'A', false);
select qa.deny('user: cannot raise own XP', 'update public.users set xp = 99999 where id = auth.uid()');
select qa.deny('user: cannot set own level', 'update public.users set level = 6 where id = auth.uid()');
select qa.deny('user: cannot read emails', 'select email from public.users');
select qa.deny('user: cannot create profile rows', 'insert into public.users (id, email, name) values (gen_random_uuid(), ''x@y.z'', ''ghost_user'')');
select qa.eq('user: cannot rename another user', 'with u as (update public.users set name = ''pwned_bob'' where id = ' || quote_literal(:'B') || ' returning 1) select count(*) from u', '0');
select qa.eq('user: can rename self (normal use)', $q$with u as (update public.users set name = 'alice_real' where id = auth.uid() returning 1) select count(*) from u$q$, '1');
select qa.deny('user: cannot take a staff-like name', $q$update public.users set name = 'ropros.admin' where id = auth.uid()$q$);
select qa.deny('user: cannot take a staff-like name (any case)', $q$update public.users set name = 'Moderator' where id = auth.uid()$q$);
select qa.deny('user: avatar must be https', $q$update public.users set avatar_url = 'http://evil.example/a.png' where id = auth.uid()$q$);
select qa.deny('user: avatar must point at ropros storage, not any site', $q$update public.users set avatar_url = 'https://tracker.example/pixel.gif' where id = auth.uid()$q$);
select qa.deny('user: cannot post as someone else', 'insert into public.community_posts (user_id, title, image_url) values (' || quote_literal(:'B') || ', ''fake'', ' || quote_literal(:'B' || '/x.jpg') || ')');
select qa.deny('user: cannot attach another user''s photo', 'insert into public.community_posts (user_id, title, image_url) values (auth.uid(), ''stolen'', ' || quote_literal(:'B' || '/build.jpg') || ')');
select qa.deny('user: cannot set likes_count on insert', $q$insert into public.community_posts (user_id, title, image_url, likes_count) values (auth.uid(), 'x', auth.uid()::text || '/a.jpg', 999)$q$);
select qa.deny('user: cannot edit likes_count', 'update public.community_posts set likes_count = 999');
select qa.eq('user: cannot edit another user''s post', 'with u as (update public.community_posts set title = ''hacked'' where user_id = ' || quote_literal(:'B') || ' returning 1) select count(*) from u', '0');
select qa.eq('user: cannot delete another user''s post', 'with d as (delete from public.community_posts where user_id = ' || quote_literal(:'B') || ' returning 1) select count(*) from d', '0');
select qa.deny('user: cannot like on behalf of someone else', 'insert into public.post_likes (post_id, user_id) select id, ' || quote_literal(:'B') || ' from public.community_posts limit 1');
insert into public.post_likes (post_id, user_id) select id, auth.uid() from public.community_posts where user_id = :'B';
select qa.deny('user: second like on the same post is rejected', 'insert into public.post_likes (post_id, user_id) select id, auth.uid() from public.community_posts where user_id = ' || quote_literal(:'B'));
select qa.eq('user: likes_count follows real likes', 'select likes_count from public.community_posts where user_id = ' || quote_literal(:'B'), '1');
select qa.eq('user: sees only own XP ledger', 'select count(*) from public.xp_events where user_id <> auth.uid()', '0');
select qa.deny('user: cannot call award_xp', 'select public.award_xp(auth.uid(), ''complete'', gen_random_uuid(), 1000)');
select qa.deny('user: cannot write progress rows directly', 'insert into public.user_progress (user_id, project_id, status) values (auth.uid(), ' || quote_literal(:'lf_id') || ', ''completed'')');
select qa.deny('user: cannot complete an unpublished project', 'select * from public.record_progress(' || quote_literal(:'draft_id') || '::uuid, ''complete'')');
select qa.deny('user: unknown progress action rejected', 'select * from public.record_progress(' || quote_literal(:'lf_id') || '::uuid, ''hack'')');
select * from public.record_progress(:'lf_id'::uuid, 'complete');
select * from public.record_progress(:'lf_id'::uuid, 'complete');
select qa.eq('user: completing twice pays once', 'select xp from public.users where id = auth.uid()', '200');
-- Photos for every post A is about to create (fixture, inserted by the owner role).
reset role;
insert into storage.objects (bucket_id, name, owner)
  select 'community', :'A' || '/' || f, :'A'::uuid
    from unnest(array['p1.jpg','p2.jpg','p3.jpg','p4.jpg','p5.jpg','q1.jpg','q2.jpg','q3.jpg']) f
  union all
  select 'community', :'A' || '/s' || g || '.jpg', :'A'::uuid from generate_series(1, 200) g;
set role authenticated;
-- Post farming: 5 "working" posts in one day, then delete everything and post again.
insert into public.community_posts (user_id, title, status, image_url)
  select auth.uid(), 'post ' || g, 'working', auth.uid()::text || '/p' || g || '.jpg' from generate_series(1, 5) g;
select qa.eq('user: daily cap pays 3 posts (3 x 250 XP)', 'select xp from public.users where id = auth.uid()', '950');
delete from public.community_posts where user_id = auth.uid();
insert into public.community_posts (user_id, title, status, image_url)
  select auth.uid(), 'again ' || g, 'working', auth.uid()::text || '/q' || g || '.jpg' from generate_series(1, 3) g;
select qa.eq('user: delete and re-post earns nothing more today', 'select xp from public.users where id = auth.uid()', '950');
select qa.deny('user: a post must reference a photo that exists', $q$insert into public.community_posts (user_id, title, image_url) values (auth.uid(), 'ghost', auth.uid()::text || '/never-uploaded.jpg')$q$);
select qa.deny('user: cannot link a post to an unpublished project', 'insert into public.community_posts (user_id, title, image_url, project_id) values (auth.uid(), ''draft link'', auth.uid()::text || ''/p1.jpg'', ' || quote_literal(:'draft_id') || ')');
select qa.deny('user: posting is rate limited (200 posts in one go)', $q$insert into public.community_posts (user_id, title, image_url) select auth.uid(), 'spam ' || g, auth.uid()::text || '/s' || g || '.jpg' from generate_series(1, 200) g$q$);
select qa.eq('user: at most 10 posts in 24 hours', 'select (count(*) <= 10)::text from public.community_posts where user_id = auth.uid()', 'true');
select qa.eq('user: still sees own photo even with no post', $q$select count(*) from storage.objects where name = auth.uid()::text || '/s200.jpg'$q$, '1');
select qa.eq('user: cannot see another user''s unposted photo', 'select count(*) from storage.objects where name = ' || quote_literal(:'B' || '/deleted-post.jpg'), '0');
-- Storage (fixture cleanup first: drop the photos A never posted)
reset role;
delete from storage.objects o where o.name like :'A' || '/%'
  and not exists (select 1 from public.community_posts p where p.image_url = o.name);
set role authenticated;
select qa.deny('user: cannot upload into another user''s folder', 'insert into storage.objects (bucket_id, name, owner) values (''community'', ' || quote_literal(:'B' || '/evil.jpg') || ', auth.uid())');
select qa.eq('user: can upload into own folder (normal use)', $q$with i as (insert into storage.objects (bucket_id, name, owner) values ('community', auth.uid()::text || '/mine.jpg', auth.uid()) returning 1) select count(*) from i$q$, '1');
insert into storage.objects (bucket_id, name, owner) values ('community', auth.uid()::text || '/w1.jpg', auth.uid());
insert into storage.objects (bucket_id, name, owner) values ('community', auth.uid()::text || '/w2.jpg', auth.uid());
insert into storage.objects (bucket_id, name, owner) values ('community', auth.uid()::text || '/w3.jpg', auth.uid());
insert into storage.objects (bucket_id, name, owner) values ('community', auth.uid()::text || '/w4.jpg', auth.uid());
select qa.deny('user: at most 5 photos waiting without a post', $q$insert into storage.objects (bucket_id, name, owner) values ('community', auth.uid()::text || '/w5.jpg', auth.uid())$q$);
insert into public.community_posts (user_id, title, image_url) values (auth.uid(), 'posted w1', auth.uid()::text || '/w1.jpg');
select qa.eq('user: posting a waiting photo frees a slot', $q$with i as (insert into storage.objects (bucket_id, name, owner) values ('community', auth.uid()::text || '/w6.jpg', auth.uid()) returning 1) select count(*) from i$q$, '1');
select qa.eq('user: cannot delete another user''s photo', 'with d as (delete from storage.objects where name like ' || quote_literal(:'B' || '/%') || ' returning 1) select count(*) from d', '0');
select qa.eq('user: cannot overwrite another user''s photo', 'with u as (update storage.objects set owner = auth.uid() where name like ' || quote_literal(:'B' || '/%') || ' returning 1) select count(*) from u', '0');
reset role;

-- ---------- delete and re-post, progress farming ----------
\set G '66666666-6666-6666-6666-666666666666'
\set H '77777777-7777-7777-7777-777777777777'
insert into auth.users (id, email, raw_user_meta_data) values
  (:'G', 'gina@example.com', '{"name":"gina"}'), (:'H', 'hank@example.com', '{"name":"hank"}');
insert into storage.objects (bucket_id, name, owner)
  select 'community', :'G' || '/g' || g || '.jpg', :'G'::uuid from generate_series(1, 12) g;
set role authenticated;
select set_config('request.jwt.claim.sub', :'G', false);
insert into public.community_posts (user_id, title, image_url)
  select auth.uid(), 'g ' || g, auth.uid()::text || '/g' || g || '.jpg' from generate_series(1, 10) g;
delete from public.community_posts where user_id = auth.uid();
select qa.deny('user: deleting posts does not give back daily slots', $q$insert into public.community_posts (user_id, title, image_url) values (auth.uid(), 'g 11', auth.uid()::text || '/g11.jpg')$q$);
select set_config('request.jwt.claim.sub', :'H', false);
do $$ declare p record; begin
  for p in select id from public.projects where is_published order by slug limit 6 loop
    perform public.record_progress(p.id, 'simulate');
  end loop;
end $$;
select qa.eq('user: at most 5 simulations pay XP per day (5 x 30)', 'select xp from public.users where id = auth.uid()', '150');
do $$ declare p record; begin
  for p in select id from public.projects where is_published order by slug limit 5 loop
    perform public.record_progress(p.id, 'complete');
  end loop;
end $$;
select qa.eq('user: at most 3 completed guides pay XP per day (+3 x 100)', 'select xp from public.users where id = auth.uid()', '450');
reset role;

-- ---------- sign-up profile names ----------
\set X '88888888-8888-8888-8888-888888888888'
insert into auth.users (id, email) values
  ('aaaaaaa1-9999-9999-9999-999999999991', 'd1@example.com'), ('bbbbbbb2-9999-9999-9999-999999999992', 'd2@example.com');
update public.users set name = 'clash_' || substr(replace(:'X', '-', ''), 1, 5) where id = 'aaaaaaa1-9999-9999-9999-999999999991';
update public.users set name = 'clash_' || substr(md5(:'X' || '0'), 1, 8) where id = 'bbbbbbb2-9999-9999-9999-999999999992';
select qa.eq('sign-up: survives a generated name clash', 'with i as (insert into auth.users (id, email, raw_user_meta_data) values (' || quote_literal(:'X') || ', ''x@example.com'', ''{"name":"clash"}'') returning 1) select count(*) from i', '1');
insert into auth.users (id, email) values ('ccccccc3-9999-9999-9999-999999999993', 'jane.doe1990@example.com');
select qa.eq('sign-up: without a name it never uses the email address', $q$select (name not like 'jane.doe%')::text from public.users where id = 'ccccccc3-9999-9999-9999-999999999993'$q$, 'true');
insert into auth.users (id, email, raw_user_meta_data) values ('ddddddd4-9999-9999-9999-999999999994', 'z@example.com', '{"name":"admin"}');
select qa.eq('sign-up: staff-like names are replaced', $q$select (name like 'maker\_%')::text from public.users where id = 'ddddddd4-9999-9999-9999-999999999994'$q$, 'true');

-- ---------- results ----------
\echo
select case when pass then 'PASS' else 'FAIL' end as result, name, detail from qa.results order by n;
