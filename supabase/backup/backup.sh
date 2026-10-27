#!/bin/bash
# Encrypted database backup: dumps the public, auth and storage schemas and encrypts the dump with a passphrase.
#   DB_URL=postgresql://... PASSPHRASE=... supabase/backup/backup.sh [output-dir]
# PG_DUMP overrides the pg_dump command (CI runs a postgres:17 container, so the client is never older than
# the server). The dump is encrypted before it leaves this script: artifacts of a public repository can be
# downloaded by any GitHub user. Photo files in Supabase Storage are not included, only their records.
set -euo pipefail
: "${DB_URL:?set DB_URL to the Supabase session pooler connection string}"
: "${PASSPHRASE:?set PASSPHRASE to the backup passphrase}"
OUT=${1:-.}
umask 077
TMP=$(mktemp)
trap 'rm -f "$TMP"' EXIT
${PG_DUMP:-pg_dump} "$DB_URL" --format=custom --no-owner --no-privileges \
  --schema=public --schema=auth --schema=storage > "$TMP"
[ -s "$TMP" ] || { echo "The dump is empty." >&2; exit 1; }
FILE="$OUT/ropros-$(date -u +%Y-%m-%dT%H%MZ).pgdump.gpg"
gpg --batch --yes --quiet --pinentry-mode loopback --passphrase-fd 3 \
  --symmetric --cipher-algo AES256 --output "$FILE" "$TMP" 3<<<"$PASSPHRASE"
echo "$FILE ($(du -h "$FILE" | cut -f1))"
