import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, brandGradient } from "./theme";

/**
 * Transparent text layer for the hook-first TikTok series. Each video is four shots:
 * hook (problem on screen), fix, the ropros checker, and the CTA. Composited over the
 * Higgsfield footage with ffmpeg, so CUTS must match the edit.
 */
export const TT_FPS = 30;
const s = (sec: number) => Math.round(sec * TT_FPS);
export const CUTS = [2.8, 3.2, 2.5, 2.5];
const START = CUTS.map((_, i) => CUTS.slice(0, i).reduce((a, b) => a + b, 0));
export const TT_DURATION = s(CUTS.reduce((a, b) => a + b, 0));

export type TikProps = {
  /** Hook card, up at frame 1. The last word gets the brand gradient. */
  hook: string[];
  /** Small label above the hook, e.g. "Arduino tip". */
  kicker: string;
  /** The fix: one big line and a mono pill. */
  fix: string;
  fixPill: string;
  /** Use the sans face for Cyrillic lines (Gloock is Latin only). */
  sans?: boolean;
  /** Localized checker and CTA lines; English by default. */
  check?: [string, string];
  cta?: string;
};

const SAFE: CSSProperties = { position: "absolute", top: 230, bottom: 480, left: 80, right: 230 };
const shadow = "0 4px 30px rgba(0,0,0,.85), 0 2px 6px rgba(0,0,0,.9)";

function useSpr(delay = 0, damping = 14) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, mass: 0.7 } });
}

function Card({ len, last, children }: { len: number; last?: boolean; children: ReactNode }) {
  const frame = useCurrentFrame();
  const out = last ? 1 : interpolate(frame, [s(len) - 5, s(len)], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ ...SAFE, display: "flex", flexDirection: "column", opacity: out }}>{children}</div>;
}

function Line({ children, delay = 0, size = 96, font = FONT.display, color = C.fg, style }: {
  children: ReactNode; delay?: number; size?: number; font?: string; color?: string; style?: CSSProperties;
}) {
  const p = useSpr(delay);
  return (
    <div style={{ fontFamily: font, fontSize: size, lineHeight: 1.04, color, textShadow: shadow, opacity: p,
      transform: `translateY(${(1 - p) * 36}px)`, ...style }}>{children}</div>
  );
}

function Pill({ children, delay = 0, bg = C.accent }: { children: ReactNode; delay?: number; bg?: string }) {
  const p = useSpr(delay, 12);
  return (
    <div style={{ alignSelf: "flex-start", marginTop: 26, padding: "14px 26px", borderRadius: 18, background: bg, color: C.ink950,
      fontFamily: FONT.mono, fontWeight: 600, fontSize: 38, opacity: p, transform: `scale(${interpolate(p, [0, 1], [0.8, 1])})`,
      transformOrigin: "left center", boxShadow: `0 0 40px ${bg}66` }}>{children}</div>
  );
}

/** The hook is on screen from frame 0: no fade-in, just a quick punch from 112% to 100%. */
function Hook({ lines, kicker, sans }: { lines: string[]; kicker: string; sans?: boolean }) {
  const p = useSpr(0, 11);
  const font = sans ? FONT.sans : FONT.display;
  const gradient: CSSProperties = { backgroundImage: brandGradient, WebkitBackgroundClip: "text", backgroundClip: "text",
    color: "transparent", textShadow: "none", filter: "drop-shadow(0 4px 18px rgba(0,0,0,.9))" };
  return (
    <div style={{ transform: `scale(${interpolate(p, [0, 1], [1.12, 1])})`, transformOrigin: "left top" }}>
      <div style={{ alignSelf: "flex-start", display: "inline-block", marginBottom: 22, padding: "8px 18px", borderRadius: 999,
        background: C.danger, color: C.fg, fontFamily: FONT.mono, fontWeight: 600, fontSize: 30 }}>{kicker}</div>
      {lines.map((l, i) => (
        <div key={l} style={{ fontFamily: font, fontWeight: sans ? 700 : 400, fontSize: sans ? 100 : 116, lineHeight: 1.0,
          letterSpacing: sans ? "-0.02em" : 0, color: C.fg, textShadow: shadow, ...(i === lines.length - 1 ? gradient : {}) }}>{l}</div>
      ))}
    </div>
  );
}

function Scrim() {
  return <AbsoluteFill style={{ background: "linear-gradient(to bottom, rgba(7,9,12,.78) 0%, rgba(7,9,12,.4) 38%, rgba(7,9,12,0) 58%)" }} />;
}

export function TikOverlay({ hook, kicker, fix, fixPill, sans, check = ["ropros checks", "every wire first."], cta = "Free robot guides" }: TikProps) {
  const [a = 0, b = 0, c = 0, d = 0] = CUTS;
  const body = sans ? FONT.sans : FONT.display;
  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <Scrim />
      <Sequence from={s(START[0]!)} durationInFrames={s(a)}>
        <Card len={a}><Hook lines={hook} kicker={kicker} sans={sans} /></Card>
      </Sequence>
      <Sequence from={s(START[1]!)} durationInFrames={s(b)}>
        <Card len={b}>
          <Line size={sans ? 80 : 92} font={body} style={sans ? { fontWeight: 700 } : undefined}>{fix}</Line>
          <Pill delay={10} bg={C.signal}>✓ {fixPill}</Pill>
        </Card>
      </Sequence>
      <Sequence from={s(START[2]!)} durationInFrames={s(c)}>
        <Card len={c}>
          <Line size={sans ? 76 : 88} font={body} style={sans ? { fontWeight: 700 } : undefined}>{check[0]}</Line>
          <Line size={sans ? 76 : 88} delay={4} font={body} style={sans ? { fontWeight: 700 } : undefined}>{check[1]}</Line>
          <Pill delay={12} bg={C.signal}>✓ circuit checked</Pill>
        </Card>
      </Sequence>
      <Sequence from={s(START[3]!)} durationInFrames={s(d)}>
        <Card len={d} last>
          <Line size={sans ? 80 : 92} font={body} style={sans ? { fontWeight: 700 } : undefined}>{cta}</Line>
          <Line size={52} delay={4} font={FONT.mono} color={C.signal}>EN · RU · KZ</Line>
          <Pill delay={10}>ropros.vercel.app</Pill>
        </Card>
      </Sequence>
    </AbsoluteFill>
  );
}

export const SERIES: { id: string; props: TikProps }[] = [
  { id: "TT1-Motors", props: { kicker: "ARDUINO TIP", hook: ["Stop wiring", "motors to", "Arduino pins."], fix: "Use a motor driver.", fixPill: "L298N between pin and motor" } },
  { id: "TT2-Servo", props: { kicker: "ROBOT KEEPS RESETTING?", hook: ["Stop powering", "servos from", "the 5V pin."], fix: "Give servos their own supply.", fixPill: "battery + buck converter, shared GND" } },
  { id: "TT3-ESP32", props: { kicker: "ESP32 TIP", hook: ["ESP32 pins", "die at", "5 volts."], fix: "They're 3.3V only.", fixPill: "1 kΩ / 2 kΩ divider on 5V signals" } },
  { id: "TT4-Ground", props: { kicker: "NOTHING WORKS?", hook: ["Stop skipping", "the shared", "ground wire."], fix: "Join every GND together.", fixPill: "battery GND → Arduino GND" } },
  { id: "TT5-Kazakh", props: { kicker: "NOW IN KAZAKH", sans: true,
    check: ["ropros әр сымды", "алдын ала тексереді."], cta: "Тегін нұсқаулықтар", hook: ["Робототехника", "енді", "қазақша."], fix: "Схема, код, бөлшектер. Тегін.", fixPill: "EN · RU · KZ guides" } },
  { id: "R01-PiGPIO", props: { kicker: "RASPBERRY PI TIP", hook: ["Raspberry Pi", "pins die at", "5 volts."], fix: "Pi GPIO is 3.3V only.", fixPill: "level shifter on 5V signals" } },
  { id: "R02-9V", props: { kicker: "ROBOT TOO SLOW?", hook: ["A 9V battery", "can't power", "your robot."], fix: "Use two 18650 cells.", fixPill: "2× 18650 = 7.4V" } },
  { id: "R03-L298N", props: { kicker: "MOTOR DRIVER TIP", hook: ["Your L298N", "eats 2 volts", "of battery."], fix: "Switch to a TB6612.", fixPill: "MOSFET driver, low drop" } },
  { id: "R04-Relay", props: { kicker: "ARDUINO TIP", hook: ["A relay can", "kill your", "Arduino pin."], fix: "Transistor + flyback diode.", fixPill: "1N4007 across the relay coil" } },
  { id: "R05-Brownout", props: { kicker: "ESP32 KEEPS REBOOTING?", hook: ["ESP32 resets", "when Wi-Fi", "turns on."], fix: "Add a 470 µF capacitor.", fixPill: "across 3V3 and GND" } },
  { id: "R06-Servos", props: { kicker: "SERVOS JITTERING?", hook: ["Arduino 5V", "can't run", "4 servos."], fix: "Power servos separately.", fixPill: "5–6V supply, grounds joined" } },
  { id: "R07-HCSR04", props: { kicker: "ESP32 TIP", hook: ["HC-SR04 can", "kill an", "ESP32 pin."], fix: "One divider saves it.", fixPill: "1 kΩ / 2 kΩ on the ECHO pin" } },
  { id: "R08-LED", props: { kicker: "BEGINNER MISTAKE", hook: ["LEDs die", "without a", "resistor."], fix: "Always add 220 Ω.", fixPill: "in series with the LED" } },
  { id: "R09-Breadboard", props: { kicker: "NOTHING LIGHTS UP?", hook: ["Breadboard", "rails can split", "in the middle."], fix: "Bridge the gap.", fixPill: "jumper across the gap" } },
  { id: "R10-Vin", props: { kicker: "ARDUINO TIP", hook: ["Reverse VIN", "once and your", "Arduino is dead."], fix: "Check polarity first.", fixPill: "VIN skips the jack's diode" } },
];
