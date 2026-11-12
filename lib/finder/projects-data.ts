import { FINDER_GUIDES } from "../../content/guides/finder.ts";
import type { Locale } from "../i18n/config.ts";
import { ProjectSchema, type ProjectRecord } from "./schema.ts";

/**
 * What the parts finder searches: every published guide, built from the generated guide catalog
 * (content/guides/finder.ts, a slim copy of the catalog), so it always matches what /projects lists. Validated at load so a
 * malformed record fails loudly instead of matching wrongly.
 */

/** Parts every maker has in a starter kit: not counted as requirements, so they never block a match. */
const CONSUMABLES = new Set(["breadboard", "jumper-wires", "resistor", "capacitor", "enclosure", "usb-5v"]);

/** The three hand-written guides in lib/guides.ts (not in content/guides), with their parts as the finder names them. */
const HANDWRITTEN = [
  { project_id: "obstacle-avoiding-robot", title: { en: "Obstacle Avoiding Robot", ru: "Робот, объезжающий препятствия", kk: "Кедергіні айналып өтетін робот" },
    microcontroller: "Arduino Uno", components_required: ["HC-SR04", "SG90 Servo", "L298N Motor Driver", "DC Gear Motor (TT)", "Robot chassis", "2x 18650 Battery Pack"] },
  { project_id: "line-follower", title: { en: "Precision Line Following Bot", ru: "Точный робот, едущий по линии", kk: "Сызық бойымен дәл жүретін робот" },
    microcontroller: "Arduino Uno", components_required: ["TCRT5000 IR Line Sensor", "L298N Motor Driver", "DC Gear Motor (TT)", "Robot chassis", "2x 18650 Battery Pack"] },
  { project_id: "iot-plant-care", title: { en: "IoT Smart Plant Monitor", ru: "Умный IoT-монитор для растений", kk: "Өсімдікке арналған ақылды IoT-монитор" },
    microcontroller: "ESP32 DevKit", components_required: ["Capacitive Soil Moisture Sensor", "5V Relay Module", "DHT22", "SSD1306 OLED", "Water pump"] },
];

const RAW: unknown[] = [
  ...HANDWRITTEN.map(({ title, ...p }) => ({ ...p, title: title.en, wiring_summary: "", code_snippet: "" })),
  ...FINDER_GUIDES.map((g) => ({
    project_id: g.slug,
    title: g.title.en,
    microcontroller: g.boardName,
    components_required: [...new Set(g.parts.filter((p) => !p.optional && p.component !== g.board && !CONSUMABLES.has(p.component)).map((p) => p.name))].slice(0, 40),
    wiring_summary: "",
    code_snippet: "",
  })),
];

export const PROJECTS: readonly ProjectRecord[] = Object.freeze(ProjectSchema.array().parse(RAW).filter((p) => p.components_required.length > 0));

/** Every finder result has a guide page at /projects/<slug>. */
export const GUIDE_SLUGS: ReadonlySet<string> = new Set(PROJECTS.map((p) => p.project_id));

/** Guide titles in every language, for the result cards. */
export const PROJECT_TITLES: ReadonlyMap<string, Record<Locale, string>> = new Map([
  ...HANDWRITTEN.map((p) => [p.project_id, p.title] as const),
  ...FINDER_GUIDES.map((g) => [g.slug, g.title] as const),
]);
