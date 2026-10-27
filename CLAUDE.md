# ropros — project context for Claude Code

ropros is a premium maker platform: a repository of hardware builds (166 Arduino/ESP32/Raspberry Pi builds, 40 robotics guides)
with an AI Project Finder, an AI build assistant, a component library and a community showcase.

## Stack
- Next.js (App Router) + TypeScript (strict) + Tailwind CSS v4 + lucide-react
- Supabase (Postgres + Auth + Storage). Schema: `supabase/migrations/0001_init.sql` + `0002_security_hardening.sql`
  (dashboard copies in `supabase/dashboard/` (6a–6e, run in order; max 2 functions per file, unique dollar tags — the SQL editor mis-parses bigger scripts); keep their comments free of quotes and semicolons for the SQL editor)
- zod for every external input. Versions are pinned exactly in package.json; verify they are current before installing.

## Design system (do not drift)
- Dark by default. Tokens live in `app/globals.css` (@theme): ink-950…700 slate surfaces, `line` hairlines,
  `accent` #FF7A1A neon orange = primary actions, `signal` #2EE6C9 electric teal = AI features and live states only.
- Logo gradient (#EFB3A3 → #A5A57A) only for the wordmark and one display phrase per page.
- Type: IBM Plex Sans (UI), JetBrains Mono (pins, code), Gloock (display). Respect prefers-reduced-motion.
- Cards: Pinterest-style masonry (`columns-*`, `break-inside-avoid`), rounded-[28px], image on top, neon platform pill
  (Arduino teal, ESP32 orange, Raspberry Pi pink).

## Where things are
- i18n (en / ru / kk): `lib/i18n/config.ts` (`defineMessages`), one namespace per area in `lib/i18n/messages/*`.
  Server components: `ns[await getLocale()]` (`lib/i18n/server.ts`); client: `useMessages(ns)`. Locale = `lang` cookie,
  switched by `components/i18n/locale-switcher.tsx`. Every new UI string goes into all three languages.
- `components/auth/auth-provider.tsx` — session, profile (XP/level from `public.users`), sign-in modal (`useAuth()`)
- `lib/nav.ts` — single nav config (header, mobile, footer)
- `lib/finder/*` — part normalization + matcher (pure, tested in `tests/finder.test.ts`); API at `app/api/finder/route.ts`
- `app/api/progress/route.ts` — saves progress via the `record_progress` RPC
- `components/guide/*` — guide tabs, parts table, diagram slot, step checklist, code block, troubleshooting, banner, progress buttons
- `components/assistant/*` — terminal-style assistant UI; `app/api/assistant/route.ts` streams replies via OpenRouter
  (`OPENROUTER_API_KEY`, `lib/assistant/openrouter.ts`) or Anthropic (`ANTHROPIC_API_KEY`); no key = demo mode
- `components/finder/*` — tags input, animated find button, results

## Still mocked / TODO
1. Done: assistant server route with guide context, sign-in required, rate limited.
2. Done on `/` (app/page.tsx): Supabase Auth sign-in/sign-up, session refresh in `proxy.ts`, XP via `/api/progress`,
   community feed/uploads/likes. Other routes (`/projects`, `/community`, `/ai/finder`) still use placeholder data.
3. Learning paths have no table yet: module progress is local-only and awards no XP.
4. Replace placeholder data in `lib/projects.ts`, `lib/guides.ts`, `lib/finder/projects-data.ts` with Supabase queries.
5. Done: daily cap of 3 rewarded posts per user (`reward_post()`).
6. Rate limiter in `lib/rate-limit.ts` is in-memory (per-instance burst control only). Daily limits that matter live in
   Postgres (0002): 10 posts, 5 photos waiting without a post, 3 completed / 5 simulated guides paying XP, assistant quota.

## Rules
- Never trust ids from request bodies for ownership; use the verified session (`supabase.auth.getUser()`).
- XP, levels, likes_count and progress are written only by DB functions/triggers. Never from the client.
- No dangerouslySetInnerHTML for user or model content. No secrets with NEXT_PUBLIC_. No service-role key in client code.
- Cookie-authenticated POST routes call `isCrossSiteRequest` and `isJsonRequest` (`lib/request-guard.ts`). Assistant input goes
  through `parseAssistantRequest` (size and count before zod) and `redactSecrets` before any provider call.
- The CSP in `proxy.ts` is nonce-based: no inline scripts or eval; a new image or API host must be added there.
- No fake community activity in production: seed data belongs in dev fixtures only.
- Before finishing a task: `npm run typecheck` and `npm test`.

## Social video (owner's standing rule)
- Every time a video is created (Reels, TikTok, promos), start with the `/promo` command and the enabled skills
  (`ig-reel` for hook, script and beat sheet; `ig-caption` + `ig-human` for the text) and generate the footage with
  Higgsfield AI video models. Plain text-on-dark Remotion slideshows are not acceptable as finished posts.
- Always send the finished video and caption for approval before publishing (the Instagram API cannot delete posts).
- TikTok titles always include #fyp #recommendations #рекомендации (owner request, 2026-10-25), max 150 chars.
- Post at most 1 Reel per day via the Instagram API (6 in two hours got the app temporarily blocked).
