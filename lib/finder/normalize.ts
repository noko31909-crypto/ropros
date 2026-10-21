import { PARTS, type PartCategory } from "../parts-catalog.ts";

export type CanonicalPart = { key: string; label: string; category: PartCategory | "Other" };

/** "HC-SR04 Ultrasonic Sensor" -> "hc sr04 ultrasonic sensor" */
export function normalizeText(s: string): string {
  return s.normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

// Lookup of every id, name and alias -> catalog part. Built once per server instance.
const INDEX: Map<string, (typeof PARTS)[number]> = (() => {
  const m = new Map<string, (typeof PARTS)[number]>();
  for (const p of PARTS) for (const k of [p.id, p.name, ...p.aliases]) m.set(normalizeText(k), p);
  return m;
})();

/**
 * Resolve a free-text part name to a canonical key.
 * Exact id/name/alias first, then the longest alias contained in the text
 * ("HC-SR04 sensor module" -> hcsr04). Unknown parts keep their normalized text as the key,
 * so they still match projects that list the exact same name.
 */
export function canonicalPart(raw: string): CanonicalPart {
  const n = normalizeText(raw);
  const exact = INDEX.get(n);
  if (exact) return { key: exact.id, label: exact.name, category: exact.category };
  let best: { len: number; part: (typeof PARTS)[number] } | null = null;
  for (const [alias, part] of INDEX) {
    if (alias.length >= 3 && new RegExp(`(^| )${alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}( |$)`).test(n)) {
      if (!best || alias.length > best.len) best = { len: alias.length, part };
    }
  }
  if (best) return { key: best.part.id, label: best.part.name, category: best.part.category };
  return { key: `custom:${n}`, label: raw.trim(), category: "Other" };
}
