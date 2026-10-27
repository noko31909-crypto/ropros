# Database backups

Every night at 02:41 Astana time, GitHub Actions (`.github/workflows/db-backup.yml`) copies the `public`, `auth`
and `storage` schemas of the Supabase database, encrypts the copy with AES-256 and keeps it for 30 days under
**Actions → Database backup → a run → Artifacts**. The repository is public, so anyone signed in to GitHub can
download these files; without the passphrase they are unreadable.

Not included: the photo files themselves in Supabase Storage (only their records are).

## Setup (once)

1. Supabase → **Connect** → **Session pooler** → copy the connection string and put the database password into
   it. Forgot the password? Project Settings → Database → Reset database password.
2. Create a long random passphrase in your password manager. Lose it and the backups cannot be opened.
3. GitHub → Settings → Secrets and variables → Actions → New repository secret, twice:
   `SUPABASE_DB_URL` (the string from step 1) and `BACKUP_PASSPHRASE` (step 2).
4. Actions → Database backup → **Run workflow**, and check that it turns green.

## Opening a backup

```bash
gpg --decrypt ropros-2026-10-27T2141Z.pgdump.gpg > ropros.pgdump   # asks for the passphrase
pg_restore --list ropros.pgdump | less                                # see what is inside
```

Restoring into a live project overwrites data: do it into a fresh Supabase project first, check the result, and
only then switch over. Test opening a backup every few months, so you know the passphrase and files work.
