import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, brandGradient } from "./theme";

/**
 * Transparent text layer for the AI-footage promo ("Stop frying your Arduino boards").
 * Rendered with alpha and composited over the Higgsfield shots with ffmpeg, so the
 * cut points here must match SHOTS in the edit.
 */
export const PO_FPS = 30;
const s = (sec: number) => Math.round(sec * PO_FPS);
export const SHOTS = [2.6, 3.0, 3.0, 3.0, 3.4];
const START = SHOTS.map((_, i) => SHOTS.slice(0, i).reduce((a, b) => a + b, 0));
export const PO_DURATION = s(SHOTS.reduce((a, b) => a + b, 0));

const SAFE: CSSProperties = { position: "absolute", top: 230, bottom: 480, left: 80, right: 230 };

function useSpr(delay = 0, damping = 14) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, mass: 0.7 } });
}

function Card({ len, children, align = "flex-start" }: { len: number; children: ReactNode; align?: CSSProperties["justifyContent"] }) {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [s(len) - 6, s(len)], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ ...SAFE, display: "flex", flexDirection: "column", justifyContent: align, opacity: out }}>{children}</div>;
}

const shadow = "0 4px 30px rgba(0,0,0,.85), 0 2px 6px rgba(0,0,0,.9)";

function Line({ children, delay = 0, size = 100, font = FONT.display, color = C.fg, style }: {
  children: ReactNode; delay?: number; size?: number; font?: string; color?: string; style?: CSSProperties;
}) {
  const p = useSpr(delay);
  return (
    <div style={{ fontFamily: font, fontSize: size, lineHeight: 1.02, color, textShadow: shadow, opacity: p,
      transform: `translateY(${(1 - p) * 40}px)`, ...style }}>{children}</div>
  );
}

function Pill({ children, delay = 0, bg = C.accent }: { children: ReactNode; delay?: number; bg?: string }) {
  const p = useSpr(delay, 12);
  return (
    <div style={{ alignSelf: "flex-start", marginTop: 28, padding: "14px 26px", borderRadius: 18, background: bg, color: C.ink950,
      fontFamily: FONT.mono, fontWeight: 600, fontSize: 40, opacity: p, transform: `scale(${interpolate(p, [0, 1], [0.8, 1])})`,
      transformOrigin: "left center", boxShadow: `0 0 40px ${bg}66` }}>{children}</div>
  );
}

/** Top-down scrim so white type stays readable on bright footage. */
function Scrim() {
  return <AbsoluteFill style={{ background: "linear-gradient(to bottom, rgba(7,9,12,.75) 0%, rgba(7,9,12,.35) 35%, rgba(7,9,12,0) 55%)" }} />;
}

export function PromoOverlay() {
  const [a = 0, b = 0, c = 0, d = 0, e = 0] = SHOTS;
  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <Scrim />
      <Sequence from={s(START[0]!)} durationInFrames={s(a)}>
        <Card len={a}>
          <Line size={120}>Stop frying</Line>
          <Line size={120} delay={4}>your Arduino</Line>
          <Line size={120} delay={8} style={{ backgroundImage: brandGradient, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", textShadow: "none", filter: "drop-shadow(0 4px 18px rgba(0,0,0,.9))" }}>boards.</Line>
        </Card>
      </Sequence>
      <Sequence from={s(START[1]!)} durationInFrames={s(b)}>
        <Card len={b}>
          <Line size={92}>5V into a 3.3V pin?</Line>
          <Pill delay={14} bg={C.danger}>✕ dead board</Pill>
        </Card>
      </Sequence>
      <Sequence from={s(START[2]!)} durationInFrames={s(c)}>
        <Card len={c}>
          <Line size={96}>ropros checks</Line>
          <Line size={96} delay={4}>every wire first.</Line>
          <Pill delay={14} bg={C.signal}>✓ circuit checked</Pill>
        </Card>
      </Sequence>
      <Sequence from={s(START[3]!)} durationInFrames={s(d)}>
        <Card len={d}>
          <Line size={60} font={FONT.mono} color={C.accent}>wiring · code · parts</Line>
          <Line size={110} delay={6}>Real robots.</Line>
        </Card>
      </Sequence>
      <Sequence from={s(START[4]!)} durationInFrames={s(e)}>
        <Card len={e + 1}>
          <Line size={96}>Free guides</Line>
          <Line size={56} delay={5} font={FONT.mono} color={C.signal}>EN · RU · KZ</Line>
          <Pill delay={12}>ropros.vercel.app</Pill>
          <Line size={44} delay={22} font={FONT.sans} style={{ marginTop: 26, fontWeight: 600 }}>Save this. Stop frying boards.</Line>
        </Card>
      </Sequence>
    </AbsoluteFill>
  );
}
