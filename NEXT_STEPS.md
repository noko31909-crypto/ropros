# ropros — what you need to do

## 1. Let Claude push to GitHub (repo is still empty)
- Install the Claude GitHub App and give it access to `noko31909-crypto/ropros`:
  https://github.com/apps/claude/installations/select_target
- Or reconnect GitHub: https://claude.ai/customize/connectors?auth_start=github&auth_start_force=1
- Then tell Claude "push". The code is committed locally on `main` (4 commits).

## 2. Run the database schema in Supabase
1. Supabase dashboard → SQL Editor → new tab.
2. If an earlier attempt left anything behind ("already exists" errors), run this first:
   ```sql
   drop table if exists public.xp_events, public.post_likes, public.community_posts,
     public.user_progress, public.projects, public.users cascade;
   drop type if exists public.platform_type, public.difficulty_level,
     public.progress_status, public.build_status cascade;
   drop function if exists public.handle_new_user, public.sync_likes_count,
     public.award_xp, public.record_progress, public.reward_post cascade;
   ```
3. Paste the full `supabase/migrations/0001_init.sql` and Run.
   - Check you have the new version: lines 19 and 48 end in `\Z'),` (not `$'),`).
   - If the editor still breaks it, run the 5 files in `supabase/dashboard/` one at a time, in order 1 → 5.
4. Authentication → Providers → enable Email.

## 3. (Optional) Let Claude do the Supabase work instead
In the cloud environment settings (title bar → environment → Edit), add as secrets:
- `SUPABASE_DB_URL` — Connect → Session pooler URI (with password), or
- `SUPABASE_ACCESS_TOKEN` + `SUPABASE_PROJECT_REF`
Allow network access to `*.supabase.co` and `*.supabase.com`, then start a new session.
Never paste keys into the chat.

## 4. Run the app locally
```bash
cp .env.example .env.local   # fill NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
npm install
npm run dev                  # http://localhost:3000
```

## 5. Before launch (Claude can build these)
- Real Supabase sign-in instead of the simulated popup
- XP/progress through `POST /api/progress` instead of browser-only state
- Real community feed + uploads; remove mock posts
- Guides/finder data from Supabase instead of hardcoded lists
- Shared rate limiter (Redis/Upstash) before scaling out
