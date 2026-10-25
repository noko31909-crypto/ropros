import { z } from "zod";
import { COMPONENT_IDS } from "../hardware/ids.ts";

/**
 * Guide content format: one JSON file per guide in content/guides/<slug>.json.
 * Human text is per locale; part names, pin names and code are not translated.
 * The circuit checker (lib/hardware/check.ts) must pass before a guide is published.
 */
const text = (max: number) => z.string().trim().min(1).max(max);
export const Localized = (max = 2000) => z.object({ en: text(max), ru: text(max), kk: text(max) }).strict();

export const CATEGORIES = ["robotics", "iot", "home", "sensors", "displays", "audio", "wearables", "games", "tools", "energy", "security", "vehicles"] as const;
export const PLATFORMS = ["arduino", "esp32", "raspberry_pi"] as const;
export const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;

const ComponentRef = z.enum(COMPONENT_IDS);
/** Instance id used in connections: "board" for the main board, otherwise lowercase like "us", "m1", "led_red". */
const InstanceId = z.string().regex(/^[a-z][a-z0-9_]{0,23}$/);
/** "<instance>.<pin>", e.g. "board.D9", "us.TRIG", "r1.A". */
const Endpoint = z.string().regex(/^[a-z][a-z0-9_]{0,23}\.[A-Za-z0-9_+\-/.]{1,16}$/); // pin ids may contain dots, e.g. "rfid.3.3V"

export const WIRE_COLORS = ["red", "black", "yellow", "orange", "green", "blue", "purple", "white", "gray", "brown", "pink", "cyan"] as const;

export const GuideSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]{3,64}$/),
  status: z.enum(["unverified", "verified"]),        // "verified" only after a human checked the circuit
  platform: z.enum(PLATFORMS),
  board: ComponentRef,                               // must be a component with kind "board"
  category: z.enum(CATEGORIES),
  robotics: z.boolean(),
  difficulty: z.enum(DIFFICULTIES),
  hours: z.number().min(0.5).max(60),
  costUsd: z.number().min(1).max(500),
  xpReward: z.number().int().min(50).max(1000),
  title: Localized(90),
  summary: Localized(260),

  /** Everything to buy, including mechanical parts. qty > 1 allowed. */
  parts: z.array(z.object({
    component: ComponentRef,
    qty: z.number().int().min(1).max(64),
    spec: Localized(120),                            // e.g. "220 Ω, 1/4 W" or "5 V, 2-400 cm"
    role: Localized(160),
    optional: z.boolean().optional(),
  }).strict()).min(2).max(30),

  /** Electrical parts drawn on the diagram. The board is implicit as instance "board". */
  instances: z.array(z.object({
    id: InstanceId,
    component: ComponentRef,
    label: z.string().max(24).optional(),            // printed on the diagram, e.g. "220 Ω", "Left motor"
  }).strict()).max(24),

  /** Every wire. Both ends must be existing instance pins. */
  connections: z.array(z.object({
    from: Endpoint,
    to: Endpoint,
    color: z.enum(WIRE_COLORS),
    note: Localized(140).optional(),
  }).strict()).min(1).max(60),

  steps: z.array(z.object({ title: Localized(90), body: Localized(900), expect: Localized(300), mistake: Localized(300) }).strict()).min(3).max(12),
  code: z.array(z.object({
    filename: z.string().regex(/^[A-Za-z0-9_.-]{1,40}$/),
    language: z.enum(["cpp", "python", "bash"]),
    source: z.string().min(20).max(20_000),
    libraries: z.array(z.string().max(80)).max(12),
  }).strict()).min(1).max(4),
  troubleshooting: z.array(z.object({ symptom: Localized(200), cause: Localized(300), fix: Localized(400) }).strict()).min(2).max(10),
  safety: z.array(Localized(300)).max(6),
  simulation: z.object({
    baud: z.number().int().positive(),
    lines: z.array(z.string().max(120)).min(3).max(20),          // serial output, untranslated
    leds: z.array(z.object({ label: z.string().max(12), color: z.string().regex(/^#[0-9a-fA-F]{6}$/) }).strict()).max(4),
  }).strict(),
}).strict();

export type GuideContent = z.infer<typeof GuideSchema>;

/** Catalogue entry: one per project in content/catalogue.json (300+). A guide file may or may not exist yet. */
export const CatalogueEntrySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]{3,64}$/),
  platform: z.enum(PLATFORMS),
  board: ComponentRef,
  category: z.enum(CATEGORIES),
  robotics: z.boolean(),
  difficulty: z.enum(DIFFICULTIES),
  hours: z.number().min(0.5).max(60),
  title: Localized(90),
  summary: Localized(260),
  components: z.array(ComponentRef).min(1).max(20),  // main electrical parts, used by the finder
}).strict();
export type CatalogueEntry = z.infer<typeof CatalogueEntrySchema>;
