import { loadFont as loadGloock } from "@remotion/google-fonts/Gloock";
import { loadFont as loadPlex } from "@remotion/google-fonts/IBMPlexSans";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

/** Same tokens as app/globals.css so the Reel matches the site. */
export const C = {
  ink950: "#07090c",
  ink900: "#0b0f14",
  ink850: "#10151c",
  ink800: "#161c25",
  ink700: "#202834",
  line: "#1c2430",
  fg: "#e9eef3",
  fgMuted: "#8b98a9",
  fgSubtle: "#5d6a7b",
  accent: "#ff7a1a",
  signal: "#2ee6c9",
  danger: "#ff4d4f",
  brandFrom: "#efb3a3",
  brandTo: "#a5a57a",
  arduino: "#2ee6c9",
  esp32: "#ff7a1a",
} as const;

export const FONT = {
  display: loadGloock("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily,
  sans: loadPlex("normal", { weights: ["400", "600", "700"], subsets: ["latin", "cyrillic", "cyrillic-ext"] }).fontFamily,
  mono: loadMono("normal", { weights: ["400", "600"], subsets: ["latin", "cyrillic"] }).fontFamily,
};

export const brandGradient = `linear-gradient(90deg, ${C.brandFrom}, ${C.brandTo})`;
