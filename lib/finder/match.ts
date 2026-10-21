import { canonicalPart, type CanonicalPart } from "./normalize.ts";
import type { ProjectRecord } from "./schema.ts";

/** Categories that are never "small": missing one of these is not a close match. */
const MAJOR = new Set(["Boards", "Mechanical"]);
export const MAX_MISSING = 2;

export type MatchResult = {
  project_id: string;
  title: string;
  microcontroller: string;
  owned: string[];
  missing: string[];
  coverage: number;      // 0..1 share of required parts owned
  required_count: number;
};
export type FinderResult = { ready: MatchResult[]; close_matches: MatchResult[]; unrecognized: string[] };

/** Required parts = components_required plus the microcontroller, de-duplicated by canonical key. */
function requiredParts(p: ProjectRecord): CanonicalPart[] {
  const seen = new Map<string, CanonicalPart>();
  for (const name of [p.microcontroller, ...p.components_required]) {
    const c = canonicalPart(name);
    if (!seen.has(c.key)) seen.set(c.key, c);
  }
  return [...seen.values()];
}

/** Pure and deterministic: no I/O, so it is easy to unit-test and safe to run per request. */
export function matchProjects(projects: readonly ProjectRecord[], ownedNames: readonly string[]): FinderResult {
  const owned = new Map<string, CanonicalPart>();
  for (const name of ownedNames) { const c = canonicalPart(name); owned.set(c.key, c); }
  const unrecognized = [...owned.values()].filter((c) => c.category === "Other").map((c) => c.label);

  const ready: MatchResult[] = [];
  const close: MatchResult[] = [];
  for (const p of projects) {
    const req = requiredParts(p);
    if (req.length === 0) continue;
    const have = req.filter((r) => owned.has(r.key));
    const miss = req.filter((r) => !owned.has(r.key));
    const result: MatchResult = {
      project_id: p.project_id, title: p.title, microcontroller: p.microcontroller,
      owned: have.map((r) => r.label), missing: miss.map((r) => r.label),
      coverage: have.length / req.length, required_count: req.length,
    };
    if (miss.length === 0) ready.push(result);
    else if (miss.length <= MAX_MISSING && miss.every((r) => !MAJOR.has(r.category))) close.push(result);
  }
  const byFit = (a: MatchResult, b: MatchResult) =>
    a.missing.length - b.missing.length || b.coverage - a.coverage || b.required_count - a.required_count || a.title.localeCompare(b.title);
  return { ready: ready.sort(byFit), close_matches: close.sort(byFit), unrecognized };
}
