import { PART_BY_ID } from "./parts-catalog.ts";

/**
 * My workbench: the parts a maker owns, as parts-catalog ids. Signed-in makers keep it in public.user_parts
 * (components/workbench/workbench-provider.tsx), guests in local storage under WORKBENCH_KEY.
 */
export const WORKBENCH_KEY = "ropros:workbench";
/** Same limit as check_user_parts_cap() in supabase/migrations/0003_workbench_comments.sql. */
export const MAX_WORKBENCH_PARTS = 200;

/** Known catalog ids only, without duplicates, in their original order, at most MAX_WORKBENCH_PARTS. */
export function cleanPartIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const out: string[] = [];
  const seen = new Set<string>();
  for (const id of value) {
    if (typeof id !== "string" || seen.has(id) || !PART_BY_ID.has(id)) continue;
    seen.add(id);
    out.push(id);
    if (out.length >= MAX_WORKBENCH_PARTS) break;
  }
  return out;
}

/** Guest workbench from local storage. Storage access is wrapped: private mode may throw. */
export function readLocalWorkbench(): string[] {
  try { return cleanPartIds(JSON.parse(localStorage.getItem(WORKBENCH_KEY) ?? "[]")); } catch { return []; }
}

export function writeLocalWorkbench(ids: readonly string[]): void {
  try { localStorage.setItem(WORKBENCH_KEY, JSON.stringify(ids)); } catch { /* storage unavailable */ }
}

export function clearLocalWorkbench(): void {
  try { localStorage.removeItem(WORKBENCH_KEY); } catch { /* storage unavailable */ }
}
