/**
 * Validates content/catalogue.json.
 * Run: node --experimental-strip-types scripts/validate-catalogue.ts
 *
 * The schema is re-declared here (mirrors CatalogueEntrySchema in lib/content/schema.ts) because node strip-types
 * cannot resolve the `@/` alias used there. Keep the two in sync.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { z } from "zod";
import { COMPONENT_IDS } from "../lib/hardware/ids.ts";

export const CATEGORIES = ["robotics", "iot", "home", "sensors", "displays", "audio", "wearables", "games", "tools", "energy", "security", "vehicles"] as const;
export const PLATFORMS = ["arduino", "esp32", "raspberry_pi"] as const;
export const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;

const text = (max: number) => z.string().trim().min(1).max(max);
const Localized = (max: number) => z.object({ en: text(max), ru: text(max), kk: text(max) }).strict();

export const CatalogueEntrySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]{3,64}$/),
  platform: z.enum(PLATFORMS),
  board: z.enum(COMPONENT_IDS),
  category: z.enum(CATEGORIES),
  robotics: z.boolean(),
  difficulty: z.enum(DIFFICULTIES),
  hours: z.number().min(0.5).max(60),
  title: Localized(90),
  summary: Localized(260),
  components: z.array(z.enum(COMPONENT_IDS)).min(1).max(20),
}).strict();
export type CatalogueEntry = z.infer<typeof CatalogueEntrySchema>;

export const BOARD_PLATFORM: Record<string, (typeof PLATFORMS)[number]> = {
  "arduino-uno": "arduino", "arduino-nano": "arduino", "arduino-mega": "arduino",
  "esp32-devkit": "esp32", "esp8266-nodemcu": "esp32", "esp32-cam": "esp32",
  "raspberry-pi-4": "raspberry_pi", "raspberry-pi-pico": "raspberry_pi",
};

/** Target share of each bucket; tolerance is ±5 percentage points. */
export const TARGETS = {
  platform: { arduino: 0.40, esp32: 0.35, raspberry_pi: 0.25 },
  difficulty: { beginner: 0.35, intermediate: 0.40, advanced: 0.25 },
} as const;
export const TOLERANCE = 0.05;
export const MIN_ENTRIES = 300;
export const MIN_ROBOTICS_CATEGORY = 60;
export const MAX_BLINK = 2;
const MOTORS = new Set(["dc-motor", "stepper-28byj48", "stepper-nema17", "water-pump", "fan-5v", "solenoid-lock", "vibration-motor"]);
const DRIVERS = new Set(["l298n", "l9110s", "tb6612fng", "drv8833", "uln2003", "a4988", "relay-module", "mosfet-n", "npn-transistor"]);

export const CATALOGUE_PATH = resolve(dirname(fileURLToPath(import.meta.url)), "../content/catalogue.json");

export function loadCatalogue(path = CATALOGUE_PATH): unknown {
  return JSON.parse(readFileSync(path, "utf8"));
}

export type Report = { errors: string[]; count: number; tally: Record<"platform" | "difficulty" | "category" | "board", Record<string, number>> };

export function checkCatalogue(data: unknown): Report {
  const errors: string[] = [];
  const tally: Report["tally"] = { platform: {}, difficulty: {}, category: {}, board: {} };
  if (!Array.isArray(data)) return { errors: ["catalogue is not an array"], count: 0, tally };

  const slugs = new Set<string>();
  const titles = new Set<string>();
  const entries: CatalogueEntry[] = [];
  data.forEach((raw, i) => {
    const r = CatalogueEntrySchema.safeParse(raw);
    if (!r.success) {
      errors.push(`#${i} (${(raw as { slug?: string })?.slug ?? "?"}): ${r.error.issues.map((x) => `${x.path.join(".")}: ${x.message}`).join("; ")}`);
      return;
    }
    const e = r.data;
    entries.push(e);
    const at = `#${i} ${e.slug}`;
    if (slugs.has(e.slug)) errors.push(`${at}: duplicate slug`);
    slugs.add(e.slug);
    const t = e.title.en.toLowerCase();
    if (titles.has(t)) errors.push(`${at}: duplicate English title`);
    titles.add(t);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.slug)) errors.push(`${at}: slug is not kebab-case`);
    const expected = BOARD_PLATFORM[e.board];
    if (!expected) errors.push(`${at}: board ${e.board} is not a board id`);
    else if (expected !== e.platform) errors.push(`${at}: platform ${e.platform} does not match board ${e.board} (expected ${expected})`);
    if (e.components[0] !== e.board) errors.push(`${at}: components[0] must be the board`);
    if (e.components.slice(1).some((c) => BOARD_PLATFORM[c])) errors.push(`${at}: a second board is listed in components`);
    if (new Set(e.components).size !== e.components.length) errors.push(`${at}: duplicate component ids`);
    if (e.category === "robotics" && !e.robotics) errors.push(`${at}: robotics category must set robotics: true`);
    if (e.components.some((c) => MOTORS.has(c)) && !e.components.some((c) => DRIVERS.has(c))) errors.push(`${at}: motor/load without a driver`);
    if (e.title.en.length > 60) errors.push(`${at}: English title longer than 60 chars`);
    if (e.summary.en.length > 200) errors.push(`${at}: English summary longer than 200 chars`);
    for (const lang of ["ru", "kk"] as const) {
      if (!/[А-Яа-яЁёӘәҒғҚқҢңӨөҰұҮүҺһІі]/.test(e.title[lang] + e.summary[lang])) errors.push(`${at}: ${lang} text is not Cyrillic`);
    }
    if (/[　-鿿가-힯]/.test(JSON.stringify(e))) errors.push(`${at}: stray CJK characters`);

    tally.platform[e.platform] = (tally.platform[e.platform] ?? 0) + 1;
    tally.difficulty[e.difficulty] = (tally.difficulty[e.difficulty] ?? 0) + 1;
    tally.category[e.category] = (tally.category[e.category] ?? 0) + 1;
    tally.board[e.board] = (tally.board[e.board] ?? 0) + 1;
  });

  const n = data.length;
  if (n < MIN_ENTRIES) errors.push(`only ${n} entries (need ≥ ${MIN_ENTRIES})`);
  for (const dim of ["platform", "difficulty"] as const) {
    for (const [k, target] of Object.entries(TARGETS[dim])) {
      const share = (tally[dim][k] ?? 0) / Math.max(n, 1);
      if (Math.abs(share - target) > TOLERANCE + 1e-9) errors.push(`${dim} ${k}: ${(share * 100).toFixed(1)} % (target ${target * 100} % ± ${TOLERANCE * 100})`);
    }
  }
  for (const c of CATEGORIES) if (!tally.category[c]) errors.push(`category ${c} is unused`);
  if ((tally.category.robotics ?? 0) < MIN_ROBOTICS_CATEGORY) errors.push(`robotics category has ${tally.category.robotics ?? 0} entries (need ≥ ${MIN_ROBOTICS_CATEGORY})`);
  const blink = entries.filter((e) => /blink/i.test(e.slug + " " + e.title.en)).length;
  if (blink > MAX_BLINK) errors.push(`${blink} blink projects (max ${MAX_BLINK})`);
  return { errors, count: n, tally };
}

export function formatSummary(r: Report): string {
  const lines: string[] = [];
  const row = (k: string, v: number) => `  ${k.padEnd(16)} ${String(v).padStart(4)}  ${((v / Math.max(r.count, 1)) * 100).toFixed(1).padStart(5)} %`;
  lines.push(`Catalogue: ${r.count} entries`);
  for (const dim of ["platform", "difficulty", "category", "board"] as const) {
    lines.push(`\n${dim}`);
    for (const [k, v] of Object.entries(r.tally[dim]).sort((a, b) => b[1] - a[1])) lines.push(row(k, v));
  }
  return lines.join("\n");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = checkCatalogue(loadCatalogue());
  console.log(formatSummary(report));
  if (report.errors.length) {
    console.error(`\n${report.errors.length} problem(s):\n` + report.errors.map((e) => `  - ${e}`).join("\n"));
    process.exit(1);
  }
  console.log("\nOK: catalogue is valid.");
}
