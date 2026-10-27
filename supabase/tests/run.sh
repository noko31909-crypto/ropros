#!/bin/bash
# Attack tests for the database rules, run against a throwaway local PostgreSQL (16+) set up like Supabase.
#   PGHOST=/tmp PGPORT=5432 PGUSER=postgres supabase/tests/run.sh [after|before]
# after (default) = 0001 + 0002, before = 0001 only. Each check states the secure expectation, so a FAIL line
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
$P -f "$R/seed.sql"
$P -f "$D/01_qa.sql"
$P -f "$D/02_attacks.sql" >/dev/null
[ "$MODE" = after ] && $P -f "$D/03_after_fix.sql" >/dev/null
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
  [ "$FAILED" = 0 ] || problems+=("$FAILED attack check(s) failed")
  if [ ${#problems[@]} -gt 0 ]; then printf 'FAILED: %s\n' "${problems[@]}" >&2; exit 1; fi
  echo "All database checks hold."
else
  echo "15 simultaneous posts, kept: $posts | completes of every guide, paid: $paid_cap | uploads stored: $uploads"
fi
