"use client";

/**
 * Saved builds (guide slugs). Signed-in makers keep them in public.saved_builds (components/saved/saved-provider.tsx),
 * guests in local storage under SAVED_KEY. All storage access is wrapped: private mode may throw.
 */
export const SAVED_KEY = "ropros:saved";
const LEGACY_KEY = "ropros:saved-guides";
/** Same limit as check_saved_builds_cap() in supabase/migrations/0004_moderation_notifications.sql. */
export const MAX_SAVED = 300;
const SLUG = /^[a-z0-9-]{3,64}$/;

/** Valid slugs only, without duplicates, in their original order, at most MAX_SAVED. */
export function cleanSlugs(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const out: string[] = [];
  for (const s of value) {
    if (typeof s === "string" && SLUG.test(s) && !out.includes(s)) out.push(s);
    if (out.length >= MAX_SAVED) break;
  }
  return out;
}

function parse(raw: string | null): string[] {
  try { return cleanSlugs(JSON.parse(raw ?? "[]")); } catch { return []; }
}

function migrate(): void {
  try {
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy === null) return;
    localStorage.setItem(SAVED_KEY, JSON.stringify(cleanSlugs([...parse(localStorage.getItem(SAVED_KEY)), ...parse(legacy)])));
    localStorage.removeItem(LEGACY_KEY);
  } catch { /* storage unavailable */ }
}

export function readLocalSaved(): string[] {
  migrate();
  try { return parse(localStorage.getItem(SAVED_KEY)); } catch { return []; }
}

export function writeLocalSaved(list: readonly string[]): void {
  try { localStorage.setItem(SAVED_KEY, JSON.stringify(list)); } catch { /* storage unavailable */ }
}

export function clearLocalSaved(): void {
  try { localStorage.removeItem(SAVED_KEY); } catch { /* storage unavailable */ }
}
