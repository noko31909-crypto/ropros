import type { CoverId } from "@/components/cards/covers";
import type { GuideContent } from "./content/schema.ts";

/** Cover art per category; robotics rotates through the robot covers so the hub doesn't repeat one image. */
const COVERS: Record<GuideContent["category"], readonly CoverId[]> = {
  robotics: ["obstacle", "line", "arm", "walker", "balance", "mecanum"], vehicles: ["mecanum", "camera", "obstacle"],
  iot: ["plant", "logger"], home: ["plant", "logger"], energy: ["logger", "plant"], tools: ["logger", "radar"],
  sensors: ["radar", "logger"], security: ["camera", "radar"], displays: ["matrix"], games: ["matrix", "radar"],
  audio: ["matrix", "radar"], wearables: ["matrix"],
};

const hash = (s: string) => [...s].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);

/** Stable SVG cover for a guide, used when it has no photo cover. */
export const coverFor = (c: Pick<GuideContent, "slug" | "category">): CoverId => {
  const list = COVERS[c.category];
  return list[hash(c.slug) % list.length] ?? "obstacle";
};
