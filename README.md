# ropros — layout blueprint

Next.js (App Router) + Tailwind CSS v4 + Lucide React. Dark by default.

## Run
```bash
npm install        # then commit package-lock.json and use `npm ci` in CI
npm run dev        # http://localhost:3000
npm run typecheck
```
Versions are pinned exactly. Check they're current before installing (`npm view next version`, etc.).

## Structure
```
app/
  layout.tsx            fonts, header, footer, skip link
  globals.css           design tokens (@theme) + utilities
  page.tsx              home: hero, stats, platforms, featured, AI tools, community CTA
  projects/page.tsx     Project Hub: search, filter sidebar, card grid
  components/page.tsx   Component Library
  ai/page.tsx           AI Tools index (finder + assistant routes to build next)
  community/page.tsx    Community feed slot
components/
  brand/logo.tsx        wordmark + robot "o" mark (SVG)
  nav/site-header.tsx   sticky header, accessible dropdowns, mobile menu
  nav/site-footer.tsx
  cards/project-card.tsx
  ui/container.tsx, ui/button.tsx
lib/
  nav.ts                one nav config for header, mobile and footer
  projects.ts           placeholder data: replace with your catalog
```

## Design tokens
| Token | Value | Use |
|---|---|---|
| ink-950 / 900 / 850 | #07090C / #0B0F14 / #10151C | page, raised, cards |
| line | #1C2430 | hairline borders |
| fg / fg-muted | #E9EEF3 / #8B98A9 | text |
| accent | #FF7A1A | primary actions, active nav |
| signal | #2EE6C9 | AI features and live states only |
| brand-from → brand-to | #EFB3A3 → #A5A57A | logo gradient only |

Type: IBM Plex Sans (UI), JetBrains Mono (pins, code, labels), Gloock (logo and one display phrase per page).

## Next steps
- Replace the logo SVG with your exported vector in `components/brand/logo.tsx`.
- Wire search to a command palette, and filters to URL search params.
- AI routes: call the model only from server code; never expose API keys to the client.

## AI Project Finder API
`POST /api/finder` with `{ "parts": ["Arduino Uno", "HC-SR04", "DC Motor"] }` returns:
- `ready`: projects where you own 100% of the required parts (microcontroller included)
- `close_matches`: missing 1–2 parts, none of them a board or chassis
- `meta.unrecognized_parts`: names not found in the parts library

Part names are matched through `lib/parts-catalog.ts` (ids, names, aliases), so "HC-SR04", "hc sr04" and "Ultrasonic Sensor" are the same part.
Matching logic is pure (`lib/finder/match.ts`). Run `npm test`.

Note: `npm test` uses Node's TypeScript stripping, which needs `.ts` extensions in imports. Before running it, either add `.ts` to the two imports inside `lib/finder/`, or swap the script for Vitest.

## Auth + database (Supabase)
1. Create a Supabase project, copy `.env.example` to `.env.local` and fill in the URL and anon key.
2. Run `supabase/migrations/0001_init.sql` (Supabase CLI: `supabase db push`, or paste into the SQL editor).
3. `POST /api/progress` with `{ projectId, action: "simulate" | "complete" }` saves progress for the signed-in user.
   `components/guide/progress-actions.tsx` has the "Run Simulator" / "Mark as Completed" buttons that call it.
4. Refresh the auth session in proxy/middleware as described in the Supabase SSR guide for Next.js.

Security model: passwords stay in Supabase Auth; RLS is on for every table; XP, levels, likes and progress
are written only by database functions/triggers, so they can't be set from the browser.
