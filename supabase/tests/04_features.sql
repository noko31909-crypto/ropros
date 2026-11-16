-- Attack tests for 0003 (workbench, build logs, comments). Runs after 03_after_fix.sql.
-- Every check states the SECURE expectation: a FAIL line is a weakness. Users: K (attacker) and L (victim).
\set ON_ERROR_STOP on
\set K 'a1a1a1a1-0000-4000-8000-000000000001'
\set L 'b2b2b2b2-0000-4000-8000-000000000002'

-- ---------- fixtures (as the database owner) ----------
insert into auth.users (id, email, raw_user_meta_data) values
  (:'K', 'kim@example.com', '{"name":"kim"}'),
  (:'L', 'lee@example.com', '{"name":"lee"}');
insert into storage.objects (bucket_id, name, owner) values
  ('community', :'L' || '/lee-build.jpg', :'L'),
  ('community', :'K' || '/kim-build.jpg', :'K'),
  ('community', :'K' || '/kim-second.jpg', :'K');
select id as lf_id from public.projects where slug = 'line-follower' \gset
insert into public.community_posts (user_id, title, status, image_url, project_id) values
  (:'L', 'Lee line follower', 'working', :'L' || '/lee-build.jpg', :'lf_id'),
  (:'K', 'Kim line follower', 'debugging', :'K' || '/kim-build.jpg', :'lf_id'),
  (:'K', 'Kim again', 'working', :'K' || '/kim-second.jpg', :'lf_id');
select id as lee_post from public.community_posts where title = 'Lee line follower' \gset
insert into public.user_parts (user_id, part_id) values (:'L', 'uno'), (:'L', 'hcsr04');
insert into public.post_comments (post_id, user_id, body) values (:'lee_post', :'L', 'First test run on a taped oval.');

-- ---------- anonymous visitor ----------
select set_config('request.jwt.claim.sub', '', false);   -- an anonymous request carries no user id
set role anon;
select qa.deny('workbench: anon cannot read anyone''s parts', 'select count(*) from public.user_parts');
select qa.deny('workbench: anon cannot add parts', 'insert into public.user_parts (user_id, part_id) values (' || quote_literal(:'L') || ', ''uno'')');
select qa.eq('comments: anon can read comments', 'select count(*) from public.post_comments where post_id = ' || quote_literal(:'lee_post'), '1');
select qa.deny('comments: anon cannot comment', 'insert into public.post_comments (post_id, user_id, body) values (' || quote_literal(:'lee_post') || ', ' || quote_literal(:'L') || ', ''spam'')');
select qa.eq('build logs: anon sees how many makers built a guide', 'select public.project_builders(' || quote_literal(:'lf_id') || '::uuid)::text', '2');
reset role;

-- ---------- signed-in attacker K: workbench ----------
set role authenticated;
select set_config('request.jwt.claim.sub', :'K', false);
select qa.eq('workbench: can add a part to own workbench', $q$with i as (insert into public.user_parts (user_id, part_id) values (auth.uid(), 'esp32') returning 1) select count(*) from i$q$, '1');
select qa.deny('workbench: cannot add parts to another workbench', 'insert into public.user_parts (user_id, part_id) values (' || quote_literal(:'L') || ', ''mega'')');
select qa.deny('workbench: part ids are checked', $q$insert into public.user_parts (user_id, part_id) values (auth.uid(), 'x''); drop table users; --')$q$);
select qa.deny('workbench: the same part twice is rejected', $q$insert into public.user_parts (user_id, part_id) values (auth.uid(), 'esp32')$q$);
select qa.eq('workbench: sees only own parts', 'select count(*) from public.user_parts where user_id <> auth.uid()', '0');
select qa.eq('workbench: cannot delete another maker''s parts', 'with d as (delete from public.user_parts where user_id = ' || quote_literal(:'L') || ' returning 1) select count(*) from d', '0');
select qa.deny('workbench: rows cannot be rewritten', $q$update public.user_parts set part_id = 'mega' where user_id = auth.uid()$q$);
select qa.deny('workbench: created_at cannot be forged', $q$insert into public.user_parts (user_id, part_id, created_at) values (auth.uid(), 'nano', now() - interval '1 year')$q$);
insert into public.user_parts (user_id, part_id) select auth.uid(), 'p' || g from generate_series(1, 199) g;
select qa.eq('workbench: holds 200 parts', 'select count(*) from public.user_parts where user_id = auth.uid()', '200');
select qa.deny('workbench: at most 200 parts per maker', $q$insert into public.user_parts (user_id, part_id) values (auth.uid(), 'p999')$q$);
select qa.eq('workbench: can remove own parts (normal use)', $q$with d as (delete from public.user_parts where user_id = auth.uid() and part_id like 'p%' returning 1) select count(*) from d$q$, '199');

-- ---------- signed-in attacker K: comments ----------
select qa.eq('comments: can comment on another maker''s post', 'with i as (insert into public.post_comments (post_id, user_id, body) values (' || quote_literal(:'lee_post') || ', auth.uid(), ''Nice wiring. Which motor driver?'') returning 1) select count(*) from i', '1');
select qa.deny('comments: cannot comment as someone else', 'insert into public.post_comments (post_id, user_id, body) values (' || quote_literal(:'lee_post') || ', ' || quote_literal(:'L') || ', ''fake'')');
select qa.deny('comments: blank comments are rejected', 'insert into public.post_comments (post_id, user_id, body) values (' || quote_literal(:'lee_post') || ', auth.uid(), e''  \n\t '')');
select qa.deny('comments: more than 500 characters is rejected', 'insert into public.post_comments (post_id, user_id, body) values (' || quote_literal(:'lee_post') || ', auth.uid(), repeat(''a'', 501))');
select qa.deny('comments: control characters are rejected', 'insert into public.post_comments (post_id, user_id, body) values (' || quote_literal(:'lee_post') || ', auth.uid(), e''ring\x07bell'')');
select qa.deny('comments: cannot comment on a post that does not exist', 'insert into public.post_comments (post_id, user_id, body) values (gen_random_uuid(), auth.uid(), ''ghost'')');
select qa.eq('comments: comments_count follows real comments', 'select comments_count from public.community_posts where id = ' || quote_literal(:'lee_post'), '2');
select qa.deny('comments: cannot set comments_count on a post', 'update public.community_posts set comments_count = 999 where user_id = auth.uid()');
select qa.deny('comments: cannot set comments_count on a new post', $q$insert into public.community_posts (user_id, title, image_url, comments_count) values (auth.uid(), 'x', auth.uid()::text || '/kim-build.jpg', 999)$q$);
select qa.deny('comments: comments cannot be edited', 'update public.post_comments set body = ''edited'' where user_id = auth.uid()');
select qa.deny('comments: created_at cannot be forged', 'insert into public.post_comments (post_id, user_id, body, created_at) values (' || quote_literal(:'lee_post') || ', auth.uid(), ''old'', now() - interval ''1 year'')');
select qa.eq('comments: cannot delete another maker''s comment on their own post', 'with d as (delete from public.post_comments where user_id = ' || quote_literal(:'L') || ' returning 1) select count(*) from d', '0');
reset role;

-- ---------- post author L moderates their own post ----------
set role authenticated;
select set_config('request.jwt.claim.sub', :'L', false);
select qa.eq('comments: the post author can remove a comment under their post', 'with d as (delete from public.post_comments where user_id = ' || quote_literal(:'K') || ' and post_id = ' || quote_literal(:'lee_post') || ' returning 1) select count(*) from d', '1');
select qa.eq('comments: comments_count goes down on delete', 'select comments_count from public.community_posts where id = ' || quote_literal(:'lee_post'), '1');
select qa.eq('workbench: another maker''s parts are untouched', 'select count(*) from public.user_parts where user_id = auth.uid()', '2');
reset role;

-- ---------- daily comment limit (K has used 1 of 50 today) ----------
set role authenticated;
select set_config('request.jwt.claim.sub', :'K', false);
insert into public.post_comments (post_id, user_id, body) select :'lee_post', auth.uid(), 'note ' || g from generate_series(1, 49) g;
select qa.deny('comments: at most 50 comments per maker per day', 'insert into public.post_comments (post_id, user_id, body) values (' || quote_literal(:'lee_post') || ', auth.uid(), ''one more'')');
delete from public.post_comments where user_id = auth.uid() and body = 'note 1';
select qa.deny('comments: deleting a comment does not give the slot back', 'insert into public.post_comments (post_id, user_id, body) values (' || quote_literal(:'lee_post') || ', auth.uid(), ''again'')');
select qa.deny('comments: cannot reset own comment counter', 'update public.comment_usage set comments = 0');
select qa.deny('comments: cannot read the comment counters', 'select count(*) from public.comment_usage');
reset role;

-- A new UTC day gives new slots.
update public.comment_usage set day = day - 1 where user_id = :'K';
set role authenticated;
select set_config('request.jwt.claim.sub', :'K', false);
select qa.eq('comments: the limit resets on a new UTC day', 'with i as (insert into public.post_comments (post_id, user_id, body) values (' || quote_literal(:'lee_post') || ', auth.uid(), ''next day'') returning 1) select count(*) from i', '1');
reset role;

-- ---------- deleting things cleans up ----------
set role authenticated;
select set_config('request.jwt.claim.sub', :'L', false);
delete from public.community_posts where id = :'lee_post';
reset role;
select qa.eq('comments: deleting a post deletes its comments', 'select count(*) from public.post_comments where post_id = ' || quote_literal(:'lee_post'), '0');
select qa.eq('build logs: makers are counted once per guide', 'select public.project_builders(' || quote_literal(:'lf_id') || '::uuid)::text', '1');
delete from auth.users where id = :'K';
select qa.eq('workbench: deleting an account deletes its workbench', 'select count(*) from public.user_parts where user_id = ' || quote_literal(:'K'), '0');
select qa.eq('comments: deleting an account deletes its comments', 'select count(*) from public.post_comments where user_id = ' || quote_literal(:'K'), '0');
