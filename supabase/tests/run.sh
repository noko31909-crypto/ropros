#!/bin/bash
# Attack tests for the database rules, run against a throwaway local PostgreSQL (16+) set up like Supabase.
#   PGHOST=/tmp PGPORT=5432 PGUSER=postgres supabase/tests/run.sh [after|before]
# after (default) = 0001 + 0002 + 0003 + 0004, before = 0001 only. Each check states the secure expectation, so a FAIL line
# is a weakness. The parallel checks at the end fire requests at the same instant, so every limit is proven
# under concurrency. In "after" mode the script exits non-zero if any check fails, which is what CI relies on.
# It drops and recreates $TEST_DB (default ropros_test): never point it at production.
set -e
case "${PGHOST:-}" in *supabase*) echo "Refusing to run against a Supabase host." >&2; exit 1 ;; esac
D=$(cd "$(dirname "$0")" && pwd)
R=$(cd "$D/.." && pwd)
DB=${TEST_DB:-ropros_test}
MODE=${1:-after}
PSQL="psql -X -q -v ON_ERROR_STOP=1"
$PSQL -d postgres -c "drop database if exists $DB" -c "create database $DB" 2>/dev/null
P="$PSQL -d $DB"
$P -f "$D/00_supabase_stubs.sql"
$P -f "$R/migrations/0001_init.sql"
[ "$MODE" = after ] && $P -f "$R/migrations/0002_security_hardening.sql"
[ "$MODE" = after ] && $P -f "$R/migrations/0003_workbench_comments.sql"
[ "$MODE" = after ] && $P -f "$R/migrations/0004_moderation_notifications.sql"
$P -f "$R/seed.sql"
$P -f "$D/01_qa.sql"
$P -f "$D/02_attacks.sql" >/dev/null
[ "$MODE" = after ] && $P -f "$D/03_after_fix.sql" >/dev/null
[ "$MODE" = after ] && $P -f "$D/04_features.sql" >/dev/null
[ "$MODE" = after ] && $P -f "$D/05_moderation.sql" >/dev/null
$P -c "select case when pass then 'PASS' else 'FAIL' end as result, name, left(detail, 70) as detail from qa.results order by n"
FAILED=$($P -tA -c "select count(*) from qa.results where not pass")
$P -tA -c "select count(*) filter (where pass) || ' passed, ' || count(*) filter (where not pass) || ' failed' from qa.results"

problems=()
expect() { echo "$1: $2 (expected $3)"; [ "$2" = "$3" ] || problems+=("$1: got $2, expected $3"); }
as() { echo "set role authenticated; select set_config('request.jwt.claim.sub','$1',false);"; }

C=33333333-3333-3333-3333-333333333333
$P -c "insert into auth.users (id, email) values ('$C', 'carol@example.com')"
$P -c "insert into storage.objects (bucket_id, name, owner) select 'community', '$C/r' || g || '.jpg', '$C' from generate_series(1, 15) g"
for i in $(seq 1 15); do $P -c "$(as $C) insert into public.community_posts (user_id,title,status,image_url) values ('$C','race $i','working','$C/r$i.jpg');" >/dev/null 2>&1 & done; wait
posts=$($P -tA -c "select count(*) from public.community_posts where user_id='$C'")
rewarded=$($P -tA -c "select count(*) from public.xp_events where user_id='$C' and reason='post'")
LF=$($P -tA -c "select id from public.projects where slug='line-follower'")
for i in $(seq 1 12); do $P -c "$(as $C) select * from public.record_progress('$LF','complete');" >/dev/null 2>&1 & done; wait
paid_once=$($P -tA -c "select count(*) from public.xp_events where user_id='$C' and reason='complete'")
J=12121212-1212-1212-1212-121212121212
$P -c "insert into auth.users (id, email) values ('$J', 'jo@example.com')"
for id in $($P -tA -c "select id from public.projects where is_published"); do $P -c "$(as $J) select * from public.record_progress('$id','complete');" >/dev/null 2>&1 & done; wait
paid_cap=$($P -tA -c "select count(*) from public.xp_events where user_id='$J' and reason='complete'")
F=55555555-5555-5555-5555-555555555555
$P -c "insert into auth.users (id, email) values ('$F', 'frank@example.com')"
for i in $(seq 1 12); do $P -c "$(as $F) insert into storage.objects (bucket_id, name, owner) values ('community', '$F/u$i.jpg', '$F');" >/dev/null 2>&1 & done; wait
uploads=$($P -tA -c "select count(*) from storage.objects where name like '$F/%'")

echo "--- parallel requests ---"
expect "15 simultaneous posts, rewarded" "$rewarded" 3
expect "12 simultaneous completes of one guide, paid" "$paid_once" 1
if [ "$MODE" = after ]; then
  expect "15 simultaneous posts, kept" "$posts" 10
  expect "simultaneous completes of every guide, paid" "$paid_cap" 3
  expect "12 simultaneous uploads with no post, stored" "$uploads" 5
  E=44444444-4444-4444-4444-444444444444
  $P -c "insert into auth.users (id, email) values ('$E', 'erin@example.com')"
  T=$(mktemp -d)
  for i in $(seq 1 20); do ($P -tA -c "$(as $E) select public.consume_assistant_quota(5);" > "$T/$i" 2>&1) & done; wait
  expect "20 simultaneous assistant calls with a limit of 5, allowed" "$(grep -lx t "$T"/* | wc -l)" 5
  rm -rf "$T"
  W=99999999-0000-4000-8000-000000000003
  $P -c "insert into auth.users (id, email) values ('$W', 'wes@example.com')"
  $P -c "insert into public.user_parts (user_id, part_id) select '$W', 'w' || g from generate_series(1, 190) g"
  for i in $(seq 1 25); do $P -c "$(as $W) insert into public.user_parts (user_id, part_id) values ('$W', 'x$i');" >/dev/null 2>&1 & done; wait
  expect "25 simultaneous parts onto a workbench holding 190 (limit 200), stored" "$($P -tA -c "select count(*) from public.user_parts where user_id='$W'")" 200
  BP=$($P -tA -c "select id from public.community_posts where title = 'Bob build'")
  $P -c "insert into public.post_comments (post_id, user_id, body) select '$BP', '$W', 'pre ' || g from generate_series(1, 40) g"
  for i in $(seq 1 25); do $P -c "$(as $W) insert into public.post_comments (post_id, user_id, body) values ('$BP', '$W', 'race $i');" >/dev/null 2>&1 & done; wait
  expect "25 simultaneous comments after 40 today (limit 50), stored" "$($P -tA -c "select count(*) from public.post_comments where user_id='$W'")" 50
  expect "comments_count after the comment race" "$($P -tA -c "select comments_count - (select count(*) from public.post_comments where post_id = '$BP') from public.community_posts where id = '$BP'")" 0
  SB=99999999-0000-4000-8000-000000000004
  $P -c "insert into auth.users (id, email) values ('$SB', 'sam@example.com')"
  $P -c "insert into public.saved_builds (user_id, slug) select '$SB', 'saved-' || g from generate_series(1, 290) g"
  for i in $(seq 1 25); do $P -c "$(as $SB) insert into public.saved_builds (user_id, slug) values ('$SB', 'race-$i');" >/dev/null 2>&1 & done; wait
  expect "25 simultaneous saves onto 290 saved builds (limit 300), stored" "$($P -tA -c "select count(*) from public.saved_builds where user_id='$SB'")" 300
  PA=99999999-0000-4000-8000-000000000005
  RP=99999999-0000-4000-8000-000000000006
  $P -c "insert into auth.users (id, email) values ('$PA', 'pat@example.com'), ('$RP', 'rob@example.com')"
  $P -c "insert into storage.objects (bucket_id, name, owner) values ('community', '$PA/p.jpg', '$PA')"
  $P -c "insert into public.community_posts (user_id, title, image_url) values ('$PA', 'Pat build', '$PA/p.jpg')"
  PP=$($P -tA -c "select id from public.community_posts where title = 'Pat build'")
  $P -c "insert into public.post_comments (post_id, user_id, body) select '$PP', '$PA', 'c' || g from generate_series(1, 40) g"
  $P -c "insert into public.content_reports (reporter_id, comment_id, reason) select '$RP', id, 'spam' from public.post_comments where post_id = '$PP' and body in ($(seq -s, 1 15 | sed "s/\([0-9]*\)/'c\1'/g"))"
  for i in $(seq 16 40); do $P -c "$(as $RP) insert into public.content_reports (reporter_id, comment_id, reason) select '$RP', id, 'spam' from public.post_comments where post_id = '$PP' and body = 'c$i';" >/dev/null 2>&1 & done; wait
  expect "25 simultaneous reports after 15 today (limit 20), stored" "$($P -tA -c "select count(*) from public.content_reports where reporter_id='$RP'")" 20
  [ "$FAILED" = 0 ] || problems+=("$FAILED attack check(s) failed")
  if [ ${#problems[@]} -gt 0 ]; then printf 'FAILED: %s\n' "${problems[@]}" >&2; exit 1; fi
  echo "All database checks hold."
else
  echo "15 simultaneous posts, kept: $posts | completes of every guide, paid: $paid_cap | uploads stored: $uploads"
fi
