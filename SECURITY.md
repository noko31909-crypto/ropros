# Security

Found a vulnerability in ropros? Please report it privately, not in a public issue:
**Security → Report a vulnerability** on this repository's GitHub page.

Include what you found, how to reproduce it, and what an attacker could do with it. You'll get a reply
within a few days. Please give us a chance to fix it before you share it publicly.

## For contributors

- Never commit keys. The only keys in this repo are public by design: the Supabase anon key and the
  Cloudflare Turnstile site key. Server keys live in Vercel environment variables, marked Sensitive.
- Database changes go into `supabase/migrations/` and must keep `supabase/tests/run.sh` green. CI runs it on
  every pull request.
