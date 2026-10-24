import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, brandGradient } from "./theme";

/** 15 s vertical Reel (1080×1920 @ 30 fps). Scene boundaries in seconds: 0–3 · 3–8 · 8–12 · 12–15. */
export const FPS = 30;
export const DURATION = 15 * FPS;
const s = (sec: number) => Math.round(sec * FPS);

// Instagram covers the top ~230 px, bottom ~480 px and right ~230 px with its UI; keep content inside.
const SAFE: CSSProperties = { position: "absolute", top: 230, bottom: 480, left: 80, right: 230 };

/** Spring from 0→1 that starts `delay` frames into the current Sequence. */
function useSpring(delay = 0, damping = 14) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, mass: 0.8 } });
}

/** Fades a whole scene out over its last `frames` frames so cuts never feel hard. */
function SceneFade({ length, children }: { length: number; children: ReactNode }) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [length - 8, length], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
}

function Background() {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, DURATION], [0, 48]);
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink950 }}>
      <AbsoluteFill style={{
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.035) 1px, transparent 1px)`,
        backgroundSize: "48px 48px", backgroundPosition: `0 ${drift}px`,
      }} />
      <div style={{ position: "absolute", top: -300, left: "50%", width: 1400, height: 900, transform: "translateX(-50%)",
        borderRadius: "50%", background: `radial-gradient(closest-side, ${C.accent}26, transparent)` }} />
    </AbsoluteFill>
  );
}

/* ---------- 0–3 s: hook ---------- */
function Hook() {
  const pop = useSpring(0, 10);
  const sub = useSpring(18);
  const scale = interpolate(pop, [0, 1], [0.6, 1]);
  return (
    <SceneFade length={s(3)}>
      <div style={{ ...SAFE, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ transform: `scale(${scale})`, opacity: pop, transformOrigin: "left center" }}>
          <div style={{ fontFamily: FONT.display, fontSize: 132, lineHeight: 1.02, color: C.fg }}>
            Stop Frying
          </div>
          <div style={{ fontFamily: FONT.display, fontSize: 132, lineHeight: 1.02, backgroundImage: brandGradient,
            WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
            Your Arduino
          </div>
          <div style={{ fontFamily: FONT.display, fontSize: 132, lineHeight: 1.02, color: C.fg }}>
            Boards <span style={{ fontSize: 112 }}>🛑</span>
          </div>
        </div>
        <div style={{ marginTop: 48, opacity: sub, transform: `translateY(${(1 - sub) * 30}px)`,
          fontFamily: FONT.mono, fontSize: 34, color: C.accent }}>
          one wrong wire = dead board
        </div>
      </div>
    </SceneFade>
  );
}

/* ---------- 3–8 s: languages + circuit checker ---------- */
function LanguagePill({ code, name, delay }: { code: string; name: string; delay: number }) {
  const p = useSpring(delay);
  return (
    <div style={{ opacity: p, transform: `translateX(${(1 - p) * -120}px)`, display: "flex", alignItems: "center", gap: 18,
      padding: "18px 26px", borderRadius: 20, border: `2px solid ${C.ink700}`, background: C.ink850 }}>
      <span style={{ fontFamily: FONT.mono, fontSize: 34, fontWeight: 600, color: C.signal }}>{code}</span>
      <span style={{ fontFamily: FONT.sans, fontSize: 32, color: C.fg }}>{name}</span>
    </div>
  );
}

function CircuitChecker() {
  const frame = useCurrentFrame();
  const panel = useSpring(s(1.0));
  // The bad wire flashes red, then gets struck through and the green fix slides in.
  const errorIn = useSpring(s(1.8));
  const strike = interpolate(frame, [s(3.0), s(3.5)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fixIn = useSpring(s(3.4));
  const blink = strike < 1 ? 0.55 + 0.45 * Math.abs(Math.sin(frame / 4)) : 1;
  const row: CSSProperties = { fontFamily: FONT.mono, fontSize: 30, padding: "16px 22px", borderRadius: 14 };
  return (
    <div style={{ marginTop: 56, opacity: panel, transform: `translateY(${(1 - panel) * 80}px)`, borderRadius: 28,
      border: `2px solid ${C.ink700}`, background: C.ink900, padding: 34, boxShadow: "0 40px 80px -30px rgba(0,0,0,.8)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: FONT.sans, fontSize: 30, fontWeight: 600, color: C.fg }}>
        <span style={{ width: 16, height: 16, borderRadius: 8, background: C.signal }} />
        Circuit Checker
      </div>
      <div style={{ ...row, marginTop: 24, background: C.ink850, color: C.fgMuted }}>
        hc_sr04.ECHO → esp32.GPIO18
      </div>
      <div style={{ ...row, marginTop: 16, opacity: errorIn * blink, position: "relative",
        background: "rgba(255,77,79,.12)", border: `2px solid ${C.danger}`, color: C.danger }}>
        ✕ 5V into a 3.3V board
        <div style={{ position: "absolute", left: 22, right: 22, top: "50%", height: 4, background: C.danger,
          transform: `scaleX(${strike})`, transformOrigin: "left" }} />
      </div>
      <div style={{ ...row, marginTop: 16, opacity: fixIn, transform: `translateX(${(1 - fixIn) * 60}px)`,
        background: "rgba(46,230,201,.10)", border: `2px solid ${C.signal}`, color: C.signal }}>
        ✓ add 1kΩ / 2kΩ divider
      </div>
    </div>
  );
}

function LanguagesAndChecker() {
  const frame = useCurrentFrame();
  // The whole container slides in from the right.
  const slide = useSpring(0, 16);
  const x = interpolate(slide, [0, 1], [700, 0]);
  return (
    <SceneFade length={s(5)}>
      <div style={{ ...SAFE, transform: `translateX(${x}px)` }}>
        <div style={{ fontFamily: FONT.sans, fontSize: 46, fontWeight: 700, color: C.fg, opacity: frame > 2 ? 1 : 0 }}>
          Guides in 3 languages
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 30 }}>
          <LanguagePill code="EN" name="English" delay={6} />
          <LanguagePill code="RU" name="Русский" delay={10} />
          <LanguagePill code="KZ" name="Қазақша" delay={14} />
        </div>
        <CircuitChecker />
      </div>
    </SceneFade>
  );
}

/* ---------- 8–12 s: three guides ---------- */
const GUIDES = [
  { title: "Obstacle Robot", board: "Arduino Uno", color: C.arduino, pins: "TRIG A0 · ECHO A1 · SIG D3" },
  { title: "PID Line Follower", board: "Arduino Nano", color: C.arduino, pins: "IR A0–A3 · ENA D5 · ENB D6" },
  { title: "IoT Plant Monitor", board: "ESP32", color: C.esp32, pins: "SOIL GPIO34 · DHT GPIO4 · SDA 21" },
] as const;

function GuideCard({ guide, index }: { guide: (typeof GUIDES)[number]; index: number }) {
  const p = useSpring(6 + index * 9, 15);
  const fromLeft = index % 2 === 0;
  return (
    <div style={{ opacity: p, transform: `translateX(${(1 - p) * (fromLeft ? -500 : 500)}px)`, borderRadius: 28,
      border: `2px solid ${C.ink700}`, background: C.ink850, padding: "30px 34px", display: "flex", flexDirection: "column", gap: 14 }}>
      <span style={{ alignSelf: "flex-start", fontFamily: FONT.mono, fontSize: 24, padding: "6px 16px", borderRadius: 999,
        color: guide.color, border: `2px solid ${guide.color}66`, background: `${guide.color}1a` }}>
        ● {guide.board}
      </span>
      <span style={{ fontFamily: FONT.sans, fontSize: 48, fontWeight: 700, color: C.fg }}>{guide.title}</span>
      <span style={{ fontFamily: FONT.mono, fontSize: 26, color: C.fgMuted }}>{guide.pins}</span>
    </div>
  );
}

function Guides() {
  const head = useSpring(0);
  return (
    <SceneFade length={s(4)}>
      <div style={{ ...SAFE, display: "flex", flexDirection: "column", justifyContent: "center", gap: 26 }}>
        <div style={{ opacity: head, fontFamily: FONT.sans, fontSize: 46, fontWeight: 700, color: C.fg }}>
          Full guides. Checked wiring.
        </div>
        {GUIDES.map((g, i) => <GuideCard key={g.title} guide={g} index={i} />)}
      </div>
    </SceneFade>
  );
}

/* ---------- 12–15 s: call to action ---------- */
function CallToAction() {
  const frame = useCurrentFrame();
  const p = useSpring(0, 11);
  const url = useSpring(10);
  const glow = 0.5 + 0.5 * Math.sin(frame / 6);
  return (
    <div style={{ ...SAFE, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
      <div style={{ transform: `scale(${interpolate(p, [0, 1], [0.8, 1])})`, opacity: p, transformOrigin: "left center",
        fontFamily: FONT.display, fontSize: 120, lineHeight: 1.05, color: C.fg }}>
        Build safely
      </div>
      <div style={{ marginTop: 40, opacity: url, transform: `translateY(${(1 - url) * 40}px)`, padding: "26px 40px",
        borderRadius: 24, background: C.accent, color: C.ink950, fontFamily: FONT.mono, fontSize: 46, fontWeight: 600,
        boxShadow: `0 0 ${40 + glow * 40}px ${C.accent}88` }}>
        ropros.vercel.app
      </div>
      <div style={{ marginTop: 34, opacity: url, fontFamily: FONT.sans, fontSize: 32, color: C.fgMuted }}>
        Free · EN / RU / KZ
      </div>
    </div>
  );
}

export function RoprosPromo() {
  return (
    <AbsoluteFill>
      <Background />
      <Sequence from={0} durationInFrames={s(3)}><Hook /></Sequence>
      <Sequence from={s(3)} durationInFrames={s(5)}><LanguagesAndChecker /></Sequence>
      <Sequence from={s(8)} durationInFrames={s(4)}><Guides /></Sequence>
      <Sequence from={s(12)} durationInFrames={s(3)}><CallToAction /></Sequence>
    </AbsoluteFill>
  );
}
