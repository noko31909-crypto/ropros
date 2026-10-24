import type { CSSProperties } from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, brandGradient } from "./theme";

/** 20 s vertical Reel: "5 wiring mistakes that reset your Arduino". */
export const WM_FPS = 30;
const s = (sec: number) => Math.round(sec * WM_FPS);
const HOOK = s(2.5);
const PER = s(2.8);
const CTA = s(3.5);
export const WM_DURATION = HOOK + PER * 5 + CTA;

const SAFE: CSSProperties = { position: "absolute", top: 230, bottom: 480, left: 80, right: 230 };

const MISTAKES = [
  { bad: "Motor wired straight to a pin", wire: "motor.+ → uno.D5", fix: "Drive it through an L298N" },
  { bad: "No shared ground", wire: "battery.− ⟂ uno.GND", fix: "Join every GND together" },
  { bad: "Servo on the 5V pin", wire: "servo.VCC → uno.5V", fix: "Own 5 V supply (LM2596)", ours: true },
  { bad: "LED with no resistor", wire: "led.A → uno.D13", fix: "Add 220 Ω in series" },
  { bad: "5V sensor into a 3.3V ESP32", wire: "hc_sr04.ECHO → esp32.GPIO18", fix: "1 kΩ / 2 kΩ divider" },
] as const;

function useSpr(delay = 0, damping = 14) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, mass: 0.8 } });
}

function Background() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink950 }}>
      <AbsoluteFill style={{
        backgroundImage: "linear-gradient(to right, rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.035) 1px, transparent 1px)",
        backgroundSize: "48px 48px", backgroundPosition: `0 ${frame * 0.15}px`,
      }} />
      <div style={{ position: "absolute", top: -320, left: "50%", width: 1400, height: 900, transform: "translateX(-50%)",
        borderRadius: "50%", background: `radial-gradient(closest-side, ${C.danger}22, transparent)` }} />
    </AbsoluteFill>
  );
}

function Hook() {
  const pop = useSpr(0, 10);
  const tag = useSpr(14);
  return (
    <div style={{ ...SAFE, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ transform: `scale(${interpolate(pop, [0, 1], [0.6, 1])})`, opacity: pop, transformOrigin: "left center" }}>
        <div style={{ fontFamily: FONT.display, fontSize: 210, lineHeight: 0.9, color: C.accent }}>5</div>
        <div style={{ fontFamily: FONT.display, fontSize: 104, lineHeight: 1.04, color: C.fg }}>wiring mistakes</div>
        <div style={{ fontFamily: FONT.display, fontSize: 104, lineHeight: 1.04, backgroundImage: brandGradient,
          WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>that reset your Arduino</div>
      </div>
      <div style={{ marginTop: 40, alignSelf: "flex-start", opacity: tag, transform: `translateY(${(1 - tag) * 24}px)`,
        fontFamily: FONT.mono, fontSize: 34, color: C.ink950, background: C.accent, padding: "10px 22px", borderRadius: 14 }}>
        No. 3 is the sneaky one
      </div>
    </div>
  );
}

function Mistake({ i }: { i: number }) {
  const m = MISTAKES[i]!;
  const frame = useCurrentFrame();
  const enter = useSpr(0, 15);
  const bad = useSpr(6);
  const strike = interpolate(frame, [s(1.2), s(1.5)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fix = useSpr(s(1.4));
  const out = interpolate(frame, [PER - 7, PER], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const row: CSSProperties = { fontFamily: FONT.mono, fontSize: 30, padding: "18px 24px", borderRadius: 16 };
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <div style={{ ...SAFE, display: "flex", flexDirection: "column", justifyContent: "center",
        transform: `translateX(${(1 - enter) * 600}px)` }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
          <span style={{ fontFamily: FONT.display, fontSize: 180, lineHeight: 1, color: C.accent }}>{i + 1}</span>
          {"ours" in m && m.ours && (
            <span style={{ fontFamily: FONT.mono, fontSize: 28, color: C.ink950, background: C.signal, padding: "6px 16px", borderRadius: 999 }}>
              most common
            </span>
          )}
        </div>
        <div style={{ marginTop: 10, fontFamily: FONT.sans, fontSize: 64, fontWeight: 700, lineHeight: 1.08, color: C.fg }}>{m.bad}</div>
        <div style={{ marginTop: 40, borderRadius: 28, border: `2px solid ${C.ink700}`, background: C.ink900, padding: 28 }}>
          <div style={{ ...row, position: "relative", opacity: bad, background: "rgba(255,77,79,.12)", border: `2px solid ${C.danger}`, color: C.danger }}>
            ✕ {m.wire}
            <div style={{ position: "absolute", left: 24, right: 24, top: "50%", height: 3, opacity: 0.7, background: C.danger,
              transform: `scaleX(${strike})`, transformOrigin: "left" }} />
          </div>
          <div style={{ ...row, marginTop: 16, opacity: fix, transform: `translateX(${(1 - fix) * 60}px)`,
            background: "rgba(46,230,201,.10)", border: `2px solid ${C.signal}`, color: C.signal }}>
            ✓ {m.fix}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

function CallToAction() {
  const frame = useCurrentFrame();
  const a = useSpr(0, 12);
  const b = useSpr(10);
  const c = useSpr(20);
  const glow = 0.5 + 0.5 * Math.sin(frame / 6);
  return (
    <div style={{ ...SAFE, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ opacity: a, transform: `scale(${interpolate(a, [0, 1], [0.85, 1])})`, transformOrigin: "left center",
        fontFamily: FONT.display, fontSize: 96, lineHeight: 1.05, color: C.fg }}>
        Every ropros guide is circuit-checked.
      </div>
      <div style={{ marginTop: 40, alignSelf: "flex-start", opacity: b, transform: `translateY(${(1 - b) * 30}px)`,
        padding: "24px 38px", borderRadius: 24, background: C.accent, color: C.ink950, fontFamily: FONT.mono,
        fontSize: 44, fontWeight: 600, boxShadow: `0 0 ${40 + glow * 40}px ${C.accent}88` }}>
        ropros.vercel.app
      </div>
      <div style={{ marginTop: 30, opacity: c, fontFamily: FONT.sans, fontSize: 36, color: C.fgMuted }}>
        Save this before your next build 📌
      </div>
    </div>
  );
}

export function WiringMistakes() {
  return (
    <AbsoluteFill>
      <Background />
      <Sequence from={0} durationInFrames={HOOK}><Hook /></Sequence>
      {MISTAKES.map((_, i) => (
        <Sequence key={i} from={HOOK + i * PER} durationInFrames={PER}><Mistake i={i} /></Sequence>
      ))}
      <Sequence from={HOOK + PER * 5} durationInFrames={CTA}><CallToAction /></Sequence>
    </AbsoluteFill>
  );
}
