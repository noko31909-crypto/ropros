"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import {
  Bot, Camera, Check, CircuitBoard, Clock, Cpu, Flame, GraduationCap, Heart, Layers, Lock, LogOut, Play, Sparkles,
  Square, Terminal, Trophy, Upload, Users, Wrench, X, Zap,
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { Logo } from "@/components/brand/logo";

/* ========================================================================
 * Types + guide content (wiring/serial content lives here; ids, progress, XP come from Supabase)
 * ===================================================================== */

type Platform = "Arduino" | "ESP32" | "Raspberry Pi";
type Difficulty = "Beginner" | "Intermediate" | "Advanced";
type TabId = "hub" | "finder" | "paths" | "community";

/** A wire on the breadboard grid. Coordinates are in hole units (col, row). */
type Wire = { from: [number, number]; to: [number, number]; color: string; label: string };
type Chip = { label: string; col: number; row: number; w: number; h: number; tone: "board" | "sensor" | "actuator" };
type Led = { id: string; col: number; row: number; color: string };

type Guide = {
  id: string; title: string; summary: string; platform: Platform; difficulty: Difficulty; hours: number; xp: number;
  image: string; parts: string[]; chips: Chip[]; wires: Wire[]; leds: Led[]; serial: string[];
};

const IMG = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

const GUIDES: Guide[] = [
  {
    id: "obstacle-avoiding-robot", title: "Obstacle Avoiding Robot", platform: "Arduino", difficulty: "Intermediate", hours: 5, xp: 250,
    summary: "A servo-swept HC-SR04 scans ahead and an L298N steers two DC motors toward open space.",
    image: IMG("photo-1485827404703-89b55fcc595e"),
    parts: ["Arduino Uno", "HC-SR04", "SG90 Servo", "L298N", "DC Motor"],
    chips: [
      { label: "UNO R3", col: 1, row: 1, w: 8, h: 5, tone: "board" },
      { label: "HC-SR04", col: 13, row: 0, w: 6, h: 2, tone: "sensor" },
      { label: "SG90", col: 22, row: 0, w: 4, h: 2, tone: "actuator" },
      { label: "L298N", col: 14, row: 5, w: 7, h: 3, tone: "actuator" },
    ],
    wires: [
      { from: [9, 2], to: [14, 2], color: "#2ee6c9", label: "D9 → TRIG" },
      { from: [9, 3], to: [16, 2], color: "#ff7a1a", label: "D10 → ECHO" },
      { from: [9, 4], to: [23, 2], color: "#f5d90a", label: "D6 → servo PWM" },
      { from: [9, 5], to: [15, 5], color: "#c084fc", label: "D5 → ENA" },
      { from: [5, 6], to: [18, 8], color: "#ef4444", label: "5V rail" },
    ],
    leds: [{ id: "L", col: 27, row: 5, color: "#ef4444" }, { id: "R", col: 29, row: 5, color: "#2ee6c9" }],
    serial: ["[boot] ropros obstacle bot v1.2", "servo sweep: 30° dist=82cm", "servo sweep: 90° dist=14cm ⚠", "servo sweep: 150° dist=120cm",
      "decision: TURN_RIGHT (open=150°)", "motors: L=200 R=-200", "dist=96cm → FORWARD", "motors: L=220 R=220"],
  },
  {
    id: "line-follower", title: "Precision Line Follower", platform: "Arduino", difficulty: "Beginner", hours: 4, xp: 200,
    summary: "Four IR reflectance sensors feed a PID loop that keeps the bot glued to the track through tight corners.",
    image: IMG("photo-1561557944-6e7860d1a7eb"),
    parts: ["Arduino Nano", "TCRT5000 IR Array", "L298N", "DC Motor"],
    chips: [
      { label: "NANO", col: 2, row: 2, w: 6, h: 3, tone: "board" },
      { label: "IR ×4", col: 12, row: 0, w: 8, h: 2, tone: "sensor" },
      { label: "L298N", col: 21, row: 4, w: 7, h: 3, tone: "actuator" },
    ],
    wires: [
      { from: [8, 2], to: [13, 1], color: "#2ee6c9", label: "A0 → IR1" },
      { from: [8, 3], to: [15, 1], color: "#2ee6c9", label: "A1 → IR2" },
      { from: [8, 4], to: [17, 1], color: "#ff7a1a", label: "A2 → IR3" },
      { from: [7, 5], to: [22, 4], color: "#c084fc", label: "D5/D6 → ENA/ENB" },
      { from: [3, 5], to: [25, 7], color: "#ef4444", label: "VIN → 7.4V" },
    ],
    leds: [{ id: "ON", col: 10, row: 7, color: "#ff7a1a" }, { id: "LOCK", col: 12, row: 7, color: "#2ee6c9" }],
    serial: ["[boot] PID line follower", "calibrating IR… min=112 max=948", "kp=0.42 ki=0.00 kd=1.80", "pos=1500 err=0 → L=180 R=180",
      "pos=2310 err=810 → L=228 R=132", "corner detected ↻", "pos=1480 err=-20 → L=176 R=184", "lap 1: 8.42s"],
  },
  {
    id: "iot-plant-care", title: "IoT Plant Care Station", platform: "ESP32", difficulty: "Beginner", hours: 3, xp: 180,
    summary: "An ESP32 reads soil moisture + DHT22, shows it on an OLED and pumps water when the soil runs dry.",
    image: IMG("photo-1416879595882-3373a0480b5b"),
    parts: ["ESP32 DevKit", "Capacitive Soil Sensor", "DHT22", "SSD1306 OLED", "Relay Module", "Water Pump"],
    chips: [
      { label: "ESP32", col: 2, row: 1, w: 7, h: 6, tone: "board" },
      { label: "SOIL", col: 14, row: 0, w: 4, h: 2, tone: "sensor" },
      { label: "DHT22", col: 20, row: 0, w: 4, h: 2, tone: "sensor" },
      { label: "OLED", col: 13, row: 5, w: 5, h: 3, tone: "actuator" },
      { label: "RELAY", col: 21, row: 5, w: 5, h: 3, tone: "actuator" },
    ],
    wires: [
      { from: [9, 2], to: [15, 2], color: "#2ee6c9", label: "GPIO34 → AOUT" },
      { from: [9, 3], to: [21, 2], color: "#f5d90a", label: "GPIO4 → DHT data" },
      { from: [9, 5], to: [14, 5], color: "#c084fc", label: "SDA/SCL → OLED" },
      { from: [9, 6], to: [22, 5], color: "#ff7a1a", label: "GPIO26 → relay IN" },
      { from: [4, 7], to: [24, 8], color: "#ef4444", label: "3V3 rail" },
    ],
    leds: [{ id: "WIFI", col: 28, row: 2, color: "#2ee6c9" }, { id: "PUMP", col: 28, row: 6, color: "#ff7a1a" }],
    serial: ["[boot] plant-care ESP32", "wifi: connected rssi=-58dBm", "soil=41% temp=23.8°C hum=55%", "mqtt → ropros/plant/1 ok",
      "soil=29% below threshold 30%", "pump: ON (3s)", "pump: OFF", "soil=46% ✓"],
  },
];

type Category = "Controllers" | "Sensors" | "Actuators";
const HARDWARE: Record<Category, string[]> = {
  Controllers: ["Arduino Uno", "Arduino Nano", "ESP32 DevKit", "Raspberry Pi 5"],
  Sensors: ["HC-SR04", "TCRT5000 IR Array", "DHT22", "Capacitive Soil Sensor", "MPU6050"],
  Actuators: ["SG90 Servo", "L298N", "DC Motor", "Relay Module", "Water Pump", "SSD1306 OLED"],
};

const FINDER_CATALOG: { title: string; platform: Platform; difficulty: Difficulty; parts: string[] }[] = [
  ...GUIDES.map((g) => ({ title: g.title, platform: g.platform, difficulty: g.difficulty, parts: g.parts })),
  { title: "Self-balancing Robot", platform: "Arduino", difficulty: "Advanced", parts: ["Arduino Nano", "MPU6050", "L298N", "DC Motor"] },
  { title: "Pan-Tilt Sentry", platform: "Arduino", difficulty: "Intermediate", parts: ["Arduino Uno", "SG90 Servo", "HC-SR04"] },
  { title: "Greenhouse Climate Node", platform: "ESP32", difficulty: "Intermediate", parts: ["ESP32 DevKit", "DHT22", "Relay Module", "SSD1306 OLED"] },
  { title: "Pi Vision Rover", platform: "Raspberry Pi", difficulty: "Advanced", parts: ["Raspberry Pi 5", "L298N", "DC Motor", "HC-SR04"] },
  { title: "Gesture Servo Arm", platform: "ESP32", difficulty: "Advanced", parts: ["ESP32 DevKit", "MPU6050", "SG90 Servo"] },
];

type PathTrack = { id: string; title: string; level: Difficulty; modules: number; done: number; xp: number; blurb: string; locked?: boolean };
const PATHS: PathTrack[] = [
  { id: "p1", title: "Electronics Foundations", level: "Beginner", modules: 8, done: 6, xp: 400, blurb: "Ohm's law, breadboards, LEDs, buttons and the serial monitor." },
  { id: "p2", title: "Sensors & Signals", level: "Beginner", modules: 10, done: 3, xp: 550, blurb: "Analog vs digital, debouncing, I²C and reading datasheets." },
  { id: "p3", title: "Motion & Motor Control", level: "Intermediate", modules: 12, done: 0, xp: 800, blurb: "PWM, H-bridges, servos, encoders and power budgeting." },
  { id: "p4", title: "Connected Devices (IoT)", level: "Intermediate", modules: 9, done: 0, xp: 700, blurb: "ESP32 Wi-Fi, MQTT, OTA updates and low-power sleep." },
  { id: "p5", title: "Autonomous Robotics", level: "Advanced", modules: 14, done: 0, xp: 1200, blurb: "PID tuning, sensor fusion, state machines and path planning.", locked: true },
  { id: "p6", title: "Edge Vision on Pi", level: "Advanced", modules: 11, done: 0, xp: 1100, blurb: "OpenCV pipelines, TFLite models and camera calibration.", locked: true },
];


const PLATFORM_PILL: Record<Platform, string> = {
  Arduino: "border-signal/40 bg-signal/10 text-signal",
  ESP32: "border-accent/40 bg-accent/10 text-accent",
  "Raspberry Pi": "border-pink-400/40 bg-pink-400/10 text-pink-300",
};
const DIFF_TONE: Record<Difficulty, string> = { Beginner: "text-emerald-300", Intermediate: "text-amber-300", Advanced: "text-rose-300" };

/* ========================================================================
 * Small shared UI
 * ===================================================================== */

function Pill({ className, children }: { className?: string; children: React.ReactNode }) {
  return <span className={clsx("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium", className)}>{children}</span>;
}

function Photo({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div className={clsx("flex items-center justify-center bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950", className)} role="img" aria-label={alt}>
        <Bot className="h-10 w-10 text-fg-subtle" aria-hidden />
      </div>
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={clsx("object-cover", className)} />;
}

/* ========================================================================
 * Breadboard widget (Tinkercad-classic look, pure SVG)
 * ===================================================================== */

const COLS = 31, ROWS = 9, P = 22, PAD = 18;
const hx = (c: number) => PAD + c * P;
const hy = (r: number) => PAD + r * P;

const CHIP_TONE: Record<Chip["tone"], { fill: string; stroke: string }> = {
  board: { fill: "#0f3d4a", stroke: "#2ee6c9" },
  sensor: { fill: "#1e293b", stroke: "#94a3b8" },
  actuator: { fill: "#3b1d0b", stroke: "#ff7a1a" },
};

function Breadboard({ guide, running, tick }: { guide: Guide; running: boolean; tick: number }) {
  const width = PAD * 2 + (COLS - 1) * P;
  const height = PAD * 2 + (ROWS - 1) * P;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label={`Breadboard wiring for ${guide.title}`}>
      <rect x={4} y={4} width={width - 8} height={height - 8} rx={14} fill="#e8e4d8" />
      <rect x={4} y={height / 2 - 5} width={width - 8} height={10} fill="#d5d0c1" />
      {Array.from({ length: ROWS }).flatMap((_, r) =>
        Array.from({ length: COLS }).map((__, c) => <rect key={`${r}-${c}`} x={hx(c) - 3} y={hy(r) - 3} width={6} height={6} rx={1.5} fill="#5b5649" opacity={0.55} />),
      )}
      {guide.chips.map((ch) => {
        const tone = CHIP_TONE[ch.tone];
        return (
          <g key={ch.label}>
            <rect x={hx(ch.col) - 8} y={hy(ch.row) - 8} width={ch.w * P} height={ch.h * P} rx={6} fill={tone.fill} stroke={tone.stroke} strokeWidth={1.5} />
            <text x={hx(ch.col) - 8 + (ch.w * P) / 2} y={hy(ch.row) - 8 + (ch.h * P) / 2 + 4} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize={11} fontWeight={600} fill="#e2e8f0">{ch.label}</text>
          </g>
        );
      })}
      {guide.wires.map((w, i) => {
        const [x1, y1] = [hx(w.from[0]), hy(w.from[1])];
        const [x2, y2] = [hx(w.to[0]), hy(w.to[1])];
        const lift = 26 + i * 6;
        const d = `M${x1},${y1} C${x1 + 30},${y1 - lift} ${x2 - 30},${y2 - lift} ${x2},${y2}`;
        const active = running && tick % guide.wires.length === i;
        return (
          <g key={`${guide.id}-${i}`}>
            <path d={d} fill="none" stroke="#0008" strokeWidth={6} strokeLinecap="round" />
            <path d={d} fill="none" stroke={w.color} strokeWidth={active ? 5 : 3.5} strokeLinecap="round" className="transition-all duration-300"
              style={active ? { filter: `drop-shadow(0 0 6px ${w.color})` } : undefined}>
              <title>{w.label}</title>
            </path>
            <circle cx={x1} cy={y1} r={4} fill={w.color} /><circle cx={x2} cy={y2} r={4} fill={w.color} />
          </g>
        );
      })}
      {guide.leds.map((l, i) => {
        const on = running && (tick + i) % 2 === 0;
        return (
          <g key={l.id}>
            {on && <circle cx={hx(l.col)} cy={hy(l.row)} r={16} fill={l.color} opacity={0.35} />}
            <circle cx={hx(l.col)} cy={hy(l.row)} r={8} fill={on ? l.color : "#3f3f46"} stroke="#18181b" strokeWidth={1.5} />
            <text x={hx(l.col)} y={hy(l.row) + 22} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize={9} fill="#44403c">{l.id}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ========================================================================
 * Tabs
 * ===================================================================== */

type ProgressStatus = "not_started" | "in_progress" | "simulated" | "completed";
type ProgressAction = "start" | "simulate" | "complete";

function ProjectHub({ progress, onProgress }: { progress: Record<string, ProgressStatus>; onProgress: (slug: string, action: ProgressAction) => void }) {
  const [activeId, setActiveId] = useState(GUIDES[0]!.id);
  const guide = GUIDES.find((g) => g.id === activeId) ?? GUIDES[0]!;
  const [running, setRunning] = useState(false);
  const [tick, setTick] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  // Reset the simulator whenever the selected project changes.
  useEffect(() => { setRunning(false); setLogs([]); setTick(0); }, [activeId]);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setTick((n) => {
        const next = n + 1;
        const line = guide.serial[n % guide.serial.length]!;
        const ts = (next * 0.48).toFixed(2).padStart(6, "0");
        setLogs((l) => [...l.slice(-60), `${ts}  ${line}`]);
        return next;
      });
    }, 480);
    return () => clearInterval(t);
  }, [running, guide]);

  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight }); }, [logs]);

  const toggleRun = () => {
    // XP is awarded by record_progress() in the database, once per project.
    if (!running) onProgress(guide.id, "simulate");
    setRunning((r) => !r);
  };

  return (
    <div className="space-y-10">
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {GUIDES.map((g, i) => (
          <button key={g.id} type="button" onClick={() => setActiveId(g.id)}
            className={clsx("group mb-6 block w-full break-inside-avoid overflow-hidden rounded-[28px] border bg-ink-850 text-left transition-all",
              g.id === activeId ? "border-signal/70 shadow-[0_0_0_1px_#2ee6c955,0_20px_50px_-20px_#2ee6c966]" : "border-line hover:border-ink-700")}>
            <div className="relative overflow-hidden">
              <Photo src={g.image} alt={g.title} className={clsx("w-full transition-transform duration-500 group-hover:scale-105", i === 1 ? "h-80" : "h-60")} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent" />
              <Pill className={clsx("absolute left-4 top-4 backdrop-blur", PLATFORM_PILL[g.platform])}>{g.platform}</Pill>
              {(progress[g.id] === "simulated" || progress[g.id] === "completed") && (
                <Pill className="absolute right-4 top-4 border-signal/50 bg-ink-950/70 text-signal"><Check className="h-3 w-3" />{progress[g.id]}</Pill>
              )}
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold tracking-tight text-fg">{g.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{g.summary}</p>
              <div className="mt-4 flex items-center gap-4 font-mono text-xs text-fg0">
                <span className={DIFF_TONE[g.difficulty]}>{g.difficulty}</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{g.hours}h</span>
                <span className="inline-flex items-center gap-1 text-accent"><Zap className="h-3.5 w-3.5" />{g.xp} XP</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <section className="grid gap-6 rounded-[28px] border border-line bg-ink-850/60 p-5 sm:p-7 lg:grid-cols-[1.6fr_1fr]" aria-label="Wiring simulator">
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-signal">Circuit · live</p>
              <h2 className="text-xl font-semibold text-fg">{guide.title}</h2>
            </div>
            <div className="flex gap-2">
            <button type="button" disabled={progress[guide.id] === "completed"} onClick={() => onProgress(guide.id, "complete")}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-ink-700 px-4 text-sm font-semibold text-fg transition-colors hover:border-signal/60 disabled:opacity-50">
              <Trophy className="h-4 w-4 text-accent" />{progress[guide.id] === "completed" ? "Completed" : `Mark built · ${guide.xp} XP`}
            </button>
            <button type="button" onClick={toggleRun}
              className={clsx("inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors",
                running ? "bg-ink-800 text-fg hover:bg-ink-700" : "bg-accent text-ink-950 hover:bg-accent-hover")}>
              {running ? <><Square className="h-4 w-4" />Stop</> : <><Play className="h-4 w-4" />Run Simulator</>}
            </button>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-ink-950 p-3"><Breadboard guide={guide} running={running} tick={tick} /></div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {guide.wires.map((w) => (
              <li key={w.label} className="inline-flex items-center gap-2 rounded-lg border border-line bg-ink-950 px-2.5 py-1 font-mono text-[11px] text-fg-muted">
                <span className="h-2 w-2 rounded-full" style={{ background: w.color }} />{w.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex min-h-[320px] flex-col overflow-hidden rounded-2xl border border-line bg-black">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-fg-muted"><Terminal className="h-3.5 w-3.5" />Serial Monitor · 115200</span>
            <span className={clsx("h-2 w-2 rounded-full", running ? "animate-pulse bg-signal" : "bg-ink-700")} aria-label={running ? "running" : "idle"} />
          </div>
          <div ref={logRef} className="h-72 flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed" aria-live="polite">
            {logs.length === 0
              ? <p className="text-fg-subtle">Press “Run Simulator” to flash the sketch…</p>
              : logs.map((l, i) => <p key={i} className={clsx(l.includes("⚠") ? "text-accent" : "text-signal/90")}>{l}</p>)}
            {running && <span className="inline-block h-3.5 w-2 animate-pulse bg-signal" />}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectFinder() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["Arduino Uno", "HC-SR04"]));
  const toggle = (p: string) => setSelected((s) => { const n = new Set(s); if (n.has(p)) n.delete(p); else n.add(p); return n; });

  const results = useMemo(() => FINDER_CATALOG
    .map((proj) => {
      const have = proj.parts.filter((p) => selected.has(p)).length;
      return { ...proj, have, missing: proj.parts.filter((p) => !selected.has(p)), score: have / proj.parts.length };
    })
    .filter((r) => r.have > 0)
    .sort((a, b) => b.score - a.score || b.have - a.have), [selected]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
      <div className="space-y-6 rounded-[28px] border border-line bg-ink-850/60 p-6">
        <div className="flex items-center justify-between">
          <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-fg"><Sparkles className="h-5 w-5 text-signal" />What&apos;s on your bench?</h2>
          <button type="button" onClick={() => setSelected(new Set())} className="text-xs text-fg0 hover:text-fg-muted">Clear</button>
        </div>
        {(Object.keys(HARDWARE) as Category[]).map((cat) => (
          <fieldset key={cat}>
            <legend className="mb-2 font-mono text-xs uppercase tracking-widest text-fg0">{cat}</legend>
            <div className="flex flex-wrap gap-2">
              {HARDWARE[cat].map((part) => {
                const on = selected.has(part);
                return (
                  <button key={part} type="button" aria-pressed={on} onClick={() => toggle(part)}
                    className={clsx("inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-all",
                      on ? "border-signal/60 bg-signal/10 text-signal shadow-[0_0_16px_-4px_#2ee6c9]" : "border-ink-700 text-fg-muted hover:border-ink-700 hover:text-fg")}>
                    {on && <Check className="h-3.5 w-3.5" />}{part}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
      <div>
        <p className="mb-4 font-mono text-xs text-fg0">{results.length} match{results.length === 1 ? "" : "es"} for {selected.size} part{selected.size === 1 ? "" : "s"}</p>
        <ul className="space-y-3">
          {results.length === 0 && <li className="rounded-2xl border border-dashed border-line p-10 text-center text-sm text-fg0">Select components to see builds you can start today.</li>}
          {results.map((r) => (
            <li key={r.title} className="rounded-2xl border border-line bg-ink-850/60 p-5 transition-colors hover:border-ink-700">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold text-fg">{r.title}</h3>
                <div className="flex items-center gap-2"><Pill className={PLATFORM_PILL[r.platform]}>{r.platform}</Pill><span className={clsx("font-mono text-xs", DIFF_TONE[r.difficulty])}>{r.difficulty}</span></div>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-800">
                <div className="h-full rounded-full bg-gradient-to-r from-signal to-accent transition-all duration-500" style={{ width: `${Math.round(r.score * 100)}%` }} />
              </div>
              <p className="mt-2 font-mono text-xs text-fg-muted">
                {r.have}/{r.parts.length} parts on hand{r.missing.length > 0 && <> · <span className="text-accent">need {r.missing.join(", ")}</span></>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Paths are not in the schema yet, so module progress is local and awards no XP (XP is DB-only).
function LearningPaths() {
  const [progress, setProgress] = useState<Record<string, number>>(() => Object.fromEntries(PATHS.map((p) => [p.id, p.done])));
  const advance = (p: PathTrack) => {
    const cur = progress[p.id] ?? 0;
    if (p.locked || cur >= p.modules) return;
    setProgress((s) => ({ ...s, [p.id]: cur + 1 }));
  };
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {PATHS.map((p) => {
        const done = progress[p.id] ?? 0;
        const pct = Math.round((done / p.modules) * 100);
        return (
          <article key={p.id} className={clsx("relative flex flex-col rounded-[28px] border bg-ink-850/60 p-6", p.locked ? "border-line opacity-60" : "border-line hover:border-ink-700")}>
            <div className="flex items-center justify-between">
              <span className={clsx("font-mono text-xs", DIFF_TONE[p.level])}>{p.level}</span>
              {p.locked ? <Lock className="h-4 w-4 text-fg0" aria-label="Locked" /> : pct === 100 ? <Trophy className="h-4 w-4 text-accent" aria-label="Complete" /> : <GraduationCap className="h-4 w-4 text-signal" aria-hidden />}
            </div>
            <h3 className="mt-3 text-lg font-semibold text-fg">{p.title}</h3>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-fg-muted">{p.blurb}</p>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-ink-800">
              <div className="h-full rounded-full bg-signal transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-xs text-fg0">
              <span>{done}/{p.modules} modules · {pct}%</span>
              <span className="text-accent">{p.xp} XP</span>
            </div>
            <button type="button" disabled={p.locked || done >= p.modules} onClick={() => advance(p)}
              className="mt-4 h-10 rounded-xl border border-ink-700 text-sm font-semibold text-fg transition-colors hover:border-signal/60 hover:text-signal disabled:cursor-not-allowed disabled:opacity-50">
              {p.locked ? "Reach Level 5 to unlock" : done >= p.modules ? "Completed" : done === 0 ? "Start path" : "Continue next module"}
            </button>
          </article>
        );
      })}
    </div>
  );
}


/* ========================================================================
 * Community (community_posts + post_likes + private `community` bucket)
 * ===================================================================== */

type FeedPost = { id: string; title: string; status: "working" | "debugging"; image_url: string; likes_count: number; author: string; signedUrl?: string };
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const IMAGE_TYPES: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

function Community({ userId, onNeedAuth, onPosted }: { userId: string | null; onNeedAuth: () => void; onPosted: () => void }) {
  const supabase = getSupabaseBrowserClient();
  const [posts, setPosts] = useState<FeedPost[] | null>(null);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [composerOpen, setComposerOpen] = useState(false);

  const load = useCallback(async () => {
    const { data, error: err } = await supabase
      .from("community_posts")
      .select("id, title, status, image_url, likes_count, users!community_posts_user_id_fkey(name)")
      .order("created_at", { ascending: false })
      .limit(60);
    if (err) { setError("Could not load the feed."); setPosts([]); return; }
    const rows = (data ?? []) as unknown as (Omit<FeedPost, "author"> & { users: { name: string } | null })[];
    const paths = rows.map((r) => r.image_url);
    const signed = paths.length ? (await supabase.storage.from("community").createSignedUrls(paths, 3600)).data ?? [] : [];
    const urlByPath = new Map(signed.map((s) => [s.path, s.signedUrl]));
    setPosts(rows.map((r) => ({ ...r, author: r.users?.name ?? "maker", signedUrl: urlByPath.get(r.image_url) ?? undefined })));
  }, [supabase]);

  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    if (!userId) { setLiked(new Set()); return; }
    void supabase.from("post_likes").select("post_id").then(({ data }) => setLiked(new Set((data ?? []).map((r) => r.post_id as string))));
  }, [supabase, userId]);

  const toggleLike = async (post: FeedPost) => {
    if (!userId) { onNeedAuth(); return; }
    const isLiked = liked.has(post.id);
    // Optimistic UI; the count itself is maintained by the post_likes trigger.
    setLiked((s) => { const n = new Set(s); if (isLiked) n.delete(post.id); else n.add(post.id); return n; });
    setPosts((ps) => ps?.map((p) => (p.id === post.id ? { ...p, likes_count: p.likes_count + (isLiked ? -1 : 1) } : p)) ?? null);
    const { error: err } = isLiked
      ? await supabase.from("post_likes").delete().eq("post_id", post.id).eq("user_id", userId)
      : await supabase.from("post_likes").insert({ post_id: post.id, user_id: userId });
    if (err) void load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs text-fg0">{posts ? `${posts.length} builds shared` : "Loading…"}</p>
        <button type="button" onClick={() => (userId ? setComposerOpen(true) : onNeedAuth())}
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-ink-950 hover:bg-accent-hover">
          <Camera className="h-4 w-4" />Share your build
        </button>
      </div>
      {error && <p className="text-sm text-accent">{error}</p>}
      {posts && posts.length === 0 && !error && (
        <div className="rounded-[28px] border border-dashed border-line p-14 text-center text-sm text-fg0">No builds yet. Be the first to share one.</div>
      )}
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {posts?.map((p) => {
          const isLiked = liked.has(p.id);
          return (
            <article key={p.id} className="mb-5 break-inside-avoid overflow-hidden rounded-[28px] border border-line bg-ink-850">
              <div className="relative">
                <Photo src={p.signedUrl ?? ""} alt={p.title} className="h-auto min-h-40 w-full" />
                <Pill className={clsx("absolute left-4 top-4 backdrop-blur",
                  p.status === "working" ? "border-signal/50 bg-ink-950/70 text-signal" : "border-accent/50 bg-ink-950/70 text-accent")}>
                  {p.status === "working" ? <Check className="h-3 w-3" /> : <Wrench className="h-3 w-3" />}{p.status}
                </Pill>
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-fg">{p.title}</h3>
                  <p className="font-mono text-xs text-fg0">@{p.author}</p>
                </div>
                <button type="button" aria-pressed={isLiked} aria-label={isLiked ? "Unlike" : "Like"} onClick={() => void toggleLike(p)}
                  className={clsx("inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 font-mono text-xs transition-all active:scale-90",
                    isLiked ? "border-accent/60 bg-accent/15 text-accent" : "border-ink-700 text-fg-muted hover:text-fg")}>
                  <Heart className={clsx("h-4 w-4", isLiked && "fill-current")} />{p.likes_count}
                </button>
              </div>
            </article>
          );
        })}
      </div>
      {composerOpen && userId && (
        <Composer userId={userId} onClose={() => setComposerOpen(false)} onDone={() => { setComposerOpen(false); void load(); onPosted(); }} />
      )}
    </div>
  );
}

function Composer({ userId, onClose, onDone }: { userId: string; onClose: () => void; onDone: () => void }) {
  const supabase = getSupabaseBrowserClient();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<"working" | "debugging">("working");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ext = file ? IMAGE_TYPES[file.type] : undefined;
    if (!file || !ext) { setError("Choose a JPEG, PNG or WebP photo."); return; }
    if (file.size > MAX_UPLOAD_BYTES) { setError("Photo must be 10 MB or smaller."); return; }
    const cleanTitle = title.trim();
    if (cleanTitle.length < 1 || cleanTitle.length > 80) { setError("Title must be 1–80 characters."); return; }
    setBusy(true); setError(null);
    // Random object key inside the author's folder (storage + table policies require `<uid>/...`).
    const path = `${userId}/${crypto.randomUUID()}.${ext}`;
    const up = await supabase.storage.from("community").upload(path, file, { contentType: file.type, upsert: false });
    if (up.error) { setBusy(false); setError("Upload failed. Try again."); return; }
    const { error: err } = await supabase.from("community_posts").insert({ user_id: userId, title: cleanTitle, status, image_url: path });
    if (err) { await supabase.storage.from("community").remove([path]); setBusy(false); setError("Could not publish the post."); return; }
    onDone();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <form role="dialog" aria-modal="true" aria-label="Share your build" onClick={(e) => e.stopPropagation()} onSubmit={(e) => void submit(e)}
        className="w-full max-w-sm space-y-3 rounded-[28px] border border-line bg-ink-850 p-7 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-fg">Share your build</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-1 text-fg0 hover:text-fg"><X className="h-5 w-5" /></button>
        </div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={80} required placeholder="What did you build?"
          className="h-11 w-full rounded-xl border border-ink-700 bg-ink-950 px-4 text-sm text-fg placeholder:text-fg-subtle focus:border-signal focus:outline-none" />
        <div className="grid grid-cols-2 rounded-xl bg-ink-950 p-1 text-sm">
          {(["working", "debugging"] as const).map((s) => (
            <button key={s} type="button" onClick={() => setStatus(s)} className={clsx("h-9 rounded-lg font-medium capitalize", status === s ? "bg-ink-800 text-fg" : "text-fg0")}>{s}</button>
          ))}
        </div>
        <label className="flex h-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-ink-700 text-sm text-fg-muted hover:border-signal/60">
          <Upload className="h-5 w-5" />{file ? file.name : "JPEG, PNG or WebP · max 10 MB"}
          <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>
        {error && <p className="text-sm text-accent">{error}</p>}
        <button type="submit" disabled={busy} className="h-11 w-full rounded-xl bg-accent text-sm font-semibold text-ink-950 hover:bg-accent-hover disabled:opacity-60">
          {busy ? "Publishing…" : "Publish · +100 XP"}
        </button>
      </form>
    </div>
  );
}

/* ========================================================================
 * Auth (Supabase Auth) + header
 * ===================================================================== */

type Profile = { id: string; name: string; xp: number; level: number };
// Must match the generated users.level column in supabase/migrations/0001_init.sql.
const LEVELS = [
  { floor: 0, title: "Spark Apprentice" }, { floor: 150, title: "Breadboard Scout" }, { floor: 400, title: "Circuit Ranger" },
  { floor: 700, title: "IoT Knight" }, { floor: 1100, title: "Robotics Paladin" }, { floor: 1600, title: "Grand Maker" },
];

function AuthModal({ onClose }: { onClose: () => void }) {
  const supabase = getSupabaseBrowserClient();
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "error" | "info"; text: string } | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setMessage(null);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) setMessage({ tone: "error", text: error.message });
      else onClose();
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email, password, options: { data: { name }, emailRedirectTo: window.location.origin },
    });
    setBusy(false);
    if (error) setMessage({ tone: "error", text: error.message });
    else if (!data.session) setMessage({ tone: "info", text: "Check your inbox to confirm your email, then sign in." });
    else onClose();
  };

  const field = "h-11 w-full rounded-xl border border-ink-700 bg-ink-950 px-4 text-sm text-fg placeholder:text-fg-subtle focus:border-signal focus:outline-none";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="auth-title" onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-[28px] border border-line bg-ink-850 p-7 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 id="auth-title" className="text-xl font-semibold text-fg">{mode === "signin" ? "Welcome back" : "Join ropros"}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-1 text-fg0 hover:text-fg"><X className="h-5 w-5" /></button>
        </div>
        <div className="mt-5 grid grid-cols-2 rounded-xl bg-ink-950 p-1 text-sm">
          {(["signin", "register"] as const).map((m) => (
            <button key={m} type="button" onClick={() => { setMode(m); setMessage(null); }} className={clsx("h-9 rounded-lg font-medium", mode === m ? "bg-ink-800 text-fg" : "text-fg0")}>
              {m === "signin" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>
        <form onSubmit={(e) => void submit(e)} className="mt-5 space-y-3">
          {mode === "register" && (
            <input value={name} onChange={(e) => setName(e.target.value)} required pattern="[A-Za-z0-9_.]{3,18}" title="3–18 letters, digits, _ or ." placeholder="Maker name" className={field} />
          )}
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@lab.dev" autoComplete="email" className={field} />
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (8+ chars)"
            autoComplete={mode === "signin" ? "current-password" : "new-password"} className={field} />
          {message && <p className={clsx("text-sm", message.tone === "error" ? "text-accent" : "text-signal")}>{message.text}</p>}
          <button type="submit" disabled={busy} className="h-11 w-full rounded-xl bg-accent text-sm font-semibold text-ink-950 hover:bg-accent-hover disabled:opacity-60">
            {busy ? "Please wait…" : mode === "signin" ? "Sign In" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}

function XpBadge({ profile, onSignOut }: { profile: Profile; onSignOut: () => void }) {
  const idx = Math.min(Math.max(profile.level, 1), LEVELS.length) - 1;
  const band = LEVELS[idx]!;
  const next = LEVELS[idx + 1];
  const pct = next ? Math.round(((profile.xp - band.floor) / (next.floor - band.floor)) * 100) : 100;
  return (
    <div className="flex items-center gap-3">
      <div className="hidden text-right sm:block">
        <p className="text-xs font-semibold text-fg">Level {profile.level} • {band.title}</p>
        <div className="mt-1 flex items-center gap-2">
          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-ink-800">
            <div className="h-full rounded-full bg-gradient-to-r from-signal to-accent transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
          <span className="font-mono text-[10px] text-fg0">{profile.xp}{next ? `/${next.floor}` : ""} XP</span>
        </div>
      </div>
      <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-signal to-accent font-semibold text-ink-950 ring-2 ring-ink-950" title={`@${profile.name}`}>
        {profile.name.slice(0, 2).toUpperCase()}
        <span className="absolute -bottom-1 -right-1 rounded-full bg-ink-950 px-1 font-mono text-[9px] text-accent">{profile.level}</span>
      </span>
      <button type="button" onClick={onSignOut} aria-label="Sign out" className="rounded-lg p-2 text-fg0 hover:bg-ink-800 hover:text-fg"><LogOut className="h-4 w-4" /></button>
    </div>
  );
}

const TABS: { id: TabId; label: string; icon: typeof Cpu }[] = [
  { id: "hub", label: "Project Hub", icon: CircuitBoard },
  { id: "finder", label: "AI Project Finder", icon: Sparkles },
  { id: "paths", label: "Learning Paths", icon: Layers },
  { id: "community", label: "Community", icon: Users },
];

export default function HomePage() {
  const [tab, setTab] = useState<TabId>("hub");
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projectIds, setProjectIds] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState<Record<string, ProgressStatus>>({});
  const [authOpen, setAuthOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2600); return () => clearTimeout(t); }, [toast]);

  const loadProfile = useCallback(async (uid: string | null) => {
    if (!uid) { setProfile(null); setProgress({}); return; }
    const supabase = getSupabaseBrowserClient();
    const [{ data: p }, { data: rows }] = await Promise.all([
      supabase.from("users").select("id, name, xp, level").eq("id", uid).maybeSingle<Profile>(),
      supabase.from("user_progress").select("status, projects(slug)"),
    ]);
    setProfile(p ?? null);
    const map: Record<string, ProgressStatus> = {};
    for (const r of (rows ?? []) as unknown as { status: ProgressStatus; projects: { slug: string } | null }[]) {
      if (r.projects) map[r.projects.slug] = r.status;
    }
    setProgress(map);
  }, []);

  // Session: initial user + live auth changes. Profile, XP and level are read from public.users.
  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    void supabase.from("projects").select("id, slug").then(({ data }) =>
      setProjectIds(Object.fromEntries((data ?? []).map((r) => [r.slug as string, r.id as string]))));
    void supabase.auth.getUser().then(({ data }) => { setUserId(data.user?.id ?? null); void loadProfile(data.user?.id ?? null); });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const uid = session?.user.id ?? null;
      setUserId(uid);
      void loadProfile(uid);
    });
    return () => sub.subscription.unsubscribe();
  }, [loadProfile]);

  const recordProgress = async (slug: string, action: ProgressAction) => {
    if (!userId) { if (action !== "simulate") setAuthOpen(true); else setToast("Sign in to save progress and earn XP"); return; }
    const projectId = projectIds[slug];
    if (!projectId) { setToast("This guide is not published yet"); return; }
    const res = await fetch("/api/progress", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ projectId, action }) });
    if (!res.ok) { setToast(res.status === 429 ? "Slow down a little" : "Could not save progress"); return; }
    const { progress: p } = (await res.json()) as { progress: { status: ProgressStatus; xp: number; level: number } };
    const gained = profile ? p.xp - profile.xp : 0;
    setProgress((s) => ({ ...s, [slug]: p.status }));
    setProfile((u) => (u ? { ...u, xp: p.xp, level: p.level } : u));
    if (gained > 0) setToast(`+${gained} XP`);
  };

  const signOut = async () => { await getSupabaseBrowserClient().auth.signOut(); setToast("Signed out"); };

  return (
    <div className="min-h-dvh bg-ink-950 text-fg">
      <header className="sticky top-0 z-40 border-b border-line/80 bg-ink-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6">
          <Logo />
          <div className="ml-auto">
            {profile ? <XpBadge profile={profile} onSignOut={() => void signOut()} /> : (
              <button type="button" onClick={() => setAuthOpen(true)} className="inline-flex h-10 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-ink-950 transition-colors hover:bg-accent-hover">
                <Flame className="h-4 w-4" />Sign In / Register
              </button>
            )}
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-line/80">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-850 px-3 py-1 font-mono text-xs text-fg-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />166 builds · 40 robotics guides
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-6xl">
            Wire it. Simulate it. <span className="font-display font-normal tracking-normal text-brand-gradient">Ship the robot.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-fg-muted">Guides with live breadboard simulation, an AI finder for the parts on your bench, and a community that actually builds.</p>
        </div>
      </section>

      <nav aria-label="Sections" className="sticky top-16 z-30 border-b border-line/80 bg-ink-950/90 backdrop-blur">
        <div role="tablist" className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} role="tab" type="button" aria-selected={tab === id} aria-controls={`panel-${id}`} onClick={() => setTab(id)}
              className={clsx("relative inline-flex h-12 shrink-0 items-center gap-2 px-4 text-sm font-medium transition-colors",
                tab === id ? "text-fg after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-accent" : "text-fg0 hover:text-fg")}>
              <Icon className={clsx("h-4 w-4", tab === id && (id === "finder" ? "text-signal" : "text-accent"))} />{label}
            </button>
          ))}
        </div>
      </nav>

      <div id={`panel-${tab}`} role="tabpanel" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {tab === "hub" && <ProjectHub progress={progress} onProgress={(slug, action) => void recordProgress(slug, action)} />}
        {tab === "finder" && <ProjectFinder />}
        {tab === "paths" && <LearningPaths />}
        {tab === "community" && <Community userId={userId} onNeedAuth={() => setAuthOpen(true)} onPosted={() => { void loadProfile(userId); setToast("Build shared"); }} />}
      </div>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      {toast && (
        <div role="status" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-signal/40 bg-ink-850 px-4 py-2 font-mono text-sm text-signal shadow-xl">{toast}</div>
      )}
    </div>
  );
}
