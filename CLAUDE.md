# ropros — project context for Claude Code

ropros is a premium maker platform: a repository of hardware builds (166 Arduino/ESP32/Raspberry Pi builds, 40 robotics guides)
with an AI Project Finder, an AI build assistant, a component library and a community showcase.

## Stack
- Next.js (App Router) + TypeScript (strict) + Tailwind CSS v4 + lucide-react
- Supabase (Postgres + Auth + Storage). Schema: `supabase/migrations/0001_init.sql`
- zod for every external input. Versions are pinned exactly in package.json; verify they are current before installing.

## Design system (do not drift)
- Dark by default. Tokens live in `app/globals.css` (@theme): ink-950…700 slate surfaces, `line` hairlines,
  `accent` #FF7A1A neon orange = primary actions, `signal` #2EE6C9 electric teal = AI features and live states only.
- Logo gradient (#EFB3A3 → #A5A57A) only for the wordmark and one display phrase per page.
- Type: IBM Plex Sans (UI), JetBrains Mono (pins, code), Gloock (display). Respect prefers-reduced-motion.
- Cards: Pinterest-style masonry (`columns-*`, `break-inside-avoid`), rounded-[28px], image on top, neon platform pill
  (Arduino teal, ESP32 orange, Raspberry Pi pink).

## Where things are
- `lib/nav.ts` — single nav config (header, mobile, footer)
- `lib/finder/*` — part normalization + matcher (pure, tested in `tests/finder.test.ts`); API at `app/api/finder/route.ts`
- `app/api/progress/route.ts` — saves progress via the `record_progress` RPC
- `components/guide/*` — guide tabs, parts table, diagram slot, step checklist, code block, troubleshooting, banner, progress buttons
- `components/assistant/*` — terminal-style assistant drawer (currently `mockStream`)
- `components/finder/*` — tags input, animated find button, results

## Still mocked / TODO
1. Assistant: replace `mockStream()` with a streaming server route that holds the API key and injects the guide's wiring + code.
2. Auth UI: build sign-in/sign-up with Supabase Auth (@supabase/ssr); add session refresh in proxy/middleware.
3. Community: real uploads to the private `community` bucket (path `<uid>/...`), feed from `community_posts`, likes via `post_likes`.
4. Replace placeholder data in `lib/projects.ts`, `lib/guides.ts`, `lib/finder/projects-data.ts` with Supabase queries.
5. Add a daily cap on XP for posts (delete/re-post farming).
6. Rate limiter in `lib/rate-limit.ts` is in-memory; move to a shared store before multi-instance deploys.

## Rules
- Never trust ids from request bodies for ownership; use the verified session (`supabase.auth.getUser()`).
- XP, levels, likes_count and progress are written only by DB functions/triggers. Never from the client.
- No dangerouslySetInnerHTML for user or model content. No secrets with NEXT_PUBLIC_. No service-role key in client code.
- No fake community activity in production: seed data belongs in dev fixtures only.
- Before finishing a task: `npm run typecheck` and `npm test`.
