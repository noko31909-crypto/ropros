import type { Locale } from "@/lib/i18n/config";
import type { CoverId } from "@/components/cards/covers";

/**
 * Card-level project types and constants, safe to import from client components: no guide content here
 * (the full guides live in content/guides and are only loaded on the server).
 */
export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Board = "arduino" | "esp32" | "pi";

export const BOARDS: readonly Board[] = ["arduino", "esp32", "pi"];
export const DIFFICULTIES: readonly Difficulty[] = ["beginner", "intermediate", "advanced"];
export const BOARD_LABEL: Record<Board, string> = { arduino: "Arduino", esp32: "ESP32", pi: "Raspberry Pi" };
export const isBoard = (v: unknown): v is Board => typeof v === "string" && (BOARDS as readonly string[]).includes(v);
export const isDifficulty = (v: unknown): v is Difficulty => typeof v === "string" && (DIFFICULTIES as readonly string[]).includes(v);

export type Project = {
  slug: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  board: Board;
  /** The exact chip when the family name would be wrong (ESP8266 builds sit in the ESP32 family). */
  boardLabel?: string;
  difficulty: Difficulty;
  hours: number;
  robotics: boolean;
  fullGuide: boolean;
  cover: CoverId;
  /** Tailwind aspect class used in masonry layouts. */
  aspect: string;
};

/** Card link: full guides open their page; listings fall back to a hub search (never a 404). */
export const projectHref = (p: Project) => (p.fullGuide ? `/projects/${p.slug}` : `/projects?q=${encodeURIComponent(p.title.en)}`);
