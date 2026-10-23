import { useId, type ReactNode } from "react";

/** Embedded cover illustrations (no remote images). Ported from the approved prototype. */
export type CoverId = "obstacle" | "line" | "plant" | "balance" | "mecanum" | "walker" | "camera" | "logger" | "arm" | "radar" | "matrix";

export const COVER_IDS: readonly CoverId[] = ["obstacle", "line", "plant", "balance", "mecanum", "walker", "camera", "logger", "arm", "radar", "matrix"];

type Ids = { g: string; f: string; s: string; b: string };

function Defs({ ids, a, b }: { ids: Ids; a: string; b: string }) {
  return (
    <defs>
      <radialGradient id={ids.g} cx="50%" cy="38%" r="75%"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></radialGradient>
      <linearGradient id={ids.f} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".55" /></linearGradient>
      <filter id={ids.s} x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#000" floodOpacity=".55" /></filter>
      <filter id={ids.b}><feGaussianBlur stdDeviation="14" /></filter>
    </defs>
  );
}

function Wheel({ x, y, r = 34 }: { x: number; y: number; r?: number }) {
  return (<><circle cx={x} cy={y} r={r} fill="#15191f" /><circle cx={x} cy={y} r={r * 0.62} fill="#2a3038" /><circle cx={x} cy={y} r={r * 0.22} fill="#9aa4ae" /></>);
}

type Spec = { w: number; h: number; a: string; b: string; body: (u: (k: keyof Ids) => string) => ReactNode };

const SPECS: Record<CoverId, Spec> = {
  obstacle: { w: 600, h: 760, a: "#2b3a52", b: "#090c12", body: (u) => (<>
    <rect width="600" height="760" fill={u("g")} /><rect y="520" width="600" height="240" fill="#11161d" /><path d="M0 520h600" stroke="#2a3443" />
    <rect x="420" y="250" width="150" height="270" rx="6" fill="#3a2a22" /><rect x="420" y="250" width="150" height="270" rx="6" fill={u("f")} />
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M ${340 + i * 26} ${330 - i * 26} a ${60 + i * 34} ${60 + i * 34} 0 0 1 0 ${140 + i * 52}`} fill="none" stroke="#2ee6c9" strokeWidth="3" strokeOpacity={0.75 - i * 0.16} strokeLinecap="round" />)}
    <g filter={u("s")}>
      <rect x="80" y="400" width="250" height="110" rx="16" fill="#e7e2d6" /><rect x="92" y="412" width="226" height="46" rx="6" fill="#17698a" />
      <rect x="110" y="420" width="40" height="30" rx="2" fill="#0d1418" /><rect x="250" y="418" width="56" height="34" rx="3" fill="#b3261e" />
      <rect x="180" y="330" width="130" height="62" rx="8" fill="#1e5aa8" /><circle cx="215" cy="361" r="22" fill="#c9ced3" /><circle cx="215" cy="361" r="14" fill="#4c535a" /><circle cx="275" cy="361" r="22" fill="#c9ced3" /><circle cx="275" cy="361" r="14" fill="#4c535a" />
      <rect x="224" y="392" width="40" height="12" rx="3" fill="#1565c0" />
      <Wheel x={110} y={520} /><Wheel x={300} y={520} />
    </g>
    <circle cx="245" cy="361" r="160" fill="#ff7a1a" opacity=".08" filter={u("b")} />
    <rect width="600" height="760" fill={u("f")} /></>) },
  line: { w: 600, h: 900, a: "#dfe3e6", b: "#7d858d", body: (u) => (<>
    <rect width="600" height="900" fill={u("g")} />
    <path d="M-40 820 C 120 760, 80 560, 260 520 S 520 380, 430 230 S 260 40, 640 -20" fill="none" stroke="#0e1114" strokeWidth="44" strokeLinecap="round" />
    <path d="M-40 820 C 120 760, 80 560, 260 520 S 520 380, 430 230 S 260 40, 640 -20" fill="none" stroke="#ff7a1a" strokeWidth="2" strokeDasharray="2 18" opacity=".7" />
    <g transform="translate(300 470) rotate(-28)" filter={u("s")}>
      <rect x="-95" y="-120" width="190" height="240" rx="28" fill="#1b2027" />
      <rect x="-70" y="-90" width="140" height="80" rx="8" fill="#17698a" /><rect x="-52" y="-74" width="34" height="34" rx="2" fill="#0b1216" />
      <rect x="-60" y="10" width="120" height="56" rx="6" fill="#c62828" />
      <rect x="-118" y="-60" width="26" height="90" rx="8" fill="#0f1215" /><rect x="92" y="-60" width="26" height="90" rx="8" fill="#0f1215" />
      <rect x="-60" y="-150" width="120" height="30" rx="6" fill="#1e5aa8" />
      {[-40, -14, 14, 40].map((x) => <g key={x}><circle cx={x} cy="-135" r="7" fill="#2ee6c9" /><circle cx={x} cy="-135" r="16" fill="#2ee6c9" opacity=".25" /></g>)}
    </g>
    <circle cx="300" cy="470" r="220" fill="#2ee6c9" opacity=".08" filter={u("b")} />
    <rect width="600" height="900" fill={u("f")} /></>) },
  plant: { w: 600, h: 820, a: "#24402f", b: "#07100b", body: (u) => (<>
    <rect width="600" height="820" fill={u("g")} /><rect y="610" width="600" height="210" fill="#120f0c" /><path d="M0 610h600" stroke="#3a2f25" />
    <circle cx="300" cy="300" r="230" fill="#7cd36b" opacity=".08" filter={u("b")} />
    <g filter={u("s")}>
      <path d="M190 470h220l-26 150h-168z" fill="#c8693a" /><rect x="180" y="455" width="240" height="30" rx="6" fill="#d97a48" />
      <path d="M300 465 C 300 380, 300 300, 300 220" stroke="#2f6b2d" strokeWidth="9" fill="none" />
      {([[300, 220, -40, 0], [300, 290, 60, 25], [300, 340, -70, -20], [300, 395, 70, 15], [300, 255, 55, -30]] as const).map(([x, y, dx, r]) => (
        <g key={`${y}${dx}`}><ellipse cx={x + dx} cy={y} rx={Math.abs(dx) * 0.9 + 18} ry="22" transform={`rotate(${r} ${x + dx} ${y})`} fill="#4fae4a" />
          <path d={`M${x} ${y} L${x + dx * 1.4} ${y}`} stroke="#2f6b2d" strokeWidth="3" transform={`rotate(${r} ${x + dx} ${y})`} /></g>))}
      <rect x="352" y="400" width="18" height="120" rx="3" fill="#15191d" /><rect x="356" y="408" width="10" height="70" fill="#c9a43b" opacity=".7" />
      <rect x="390" y="520" width="170" height="96" rx="10" fill="#151515" /><rect x="404" y="532" width="100" height="72" rx="4" fill="#c9ced3" />
      <rect x="430" y="470" width="120" height="62" rx="6" fill="#0b0f14" stroke="#2b3a4a" />
      <text x="442" y="498" fontFamily="monospace" fontSize="16" fill="#2ee6c9">SOIL 42%</text><text x="442" y="520" fontFamily="monospace" fontSize="12" fill="#8b98a9">23.4°C  61%RH</text>
    </g>
    <path d="M366 470 C 380 520, 400 540, 420 560" stroke="#ff7a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
    <rect width="600" height="820" fill={u("f")} /></>) },
  balance: { w: 600, h: 860, a: "#3a2a4a", b: "#0a0710", body: (u) => (<>
    <rect width="600" height="860" fill={u("g")} /><rect y="680" width="600" height="180" fill="#100c15" />
    <path d="M150 320 a160 160 0 0 1 300 0" fill="none" stroke="#ff7a1a" strokeWidth="3" strokeDasharray="6 10" opacity=".7" />
    <g filter={u("s")} transform="rotate(-6 300 680)"><rect x="235" y="230" width="130" height="380" rx="12" fill="#e8e5dc" /><rect x="248" y="250" width="104" height="60" rx="6" fill="#2e86c1" />
      <rect x="248" y="330" width="104" height="70" rx="6" fill="#17698a" /><rect x="262" y="420" width="76" height="40" rx="4" fill="#2e7d32" /><rect x="250" y="520" width="100" height="70" rx="6" fill="#2b2b2b" /><Wheel x={300} y={640} r={58} /></g>
    <rect width="600" height="860" fill={u("f")} /></>) },
  mecanum: { w: 600, h: 640, a: "#1d3a46", b: "#060c10", body: (u) => (<>
    <rect width="600" height="640" fill={u("g")} />
    <g filter={u("s")}><rect x="170" y="160" width="260" height="320" rx="24" fill="#1c232b" stroke="#2f3a46" strokeWidth="2" />
      {([[120, 170], [430, 170], [120, 380], [430, 380]] as const).map(([x, y]) => (
        <g key={`${x}-${y}`}><rect x={x} y={y} width="50" height="100" rx="14" fill="#101418" />
          {[0, 1, 2, 3, 4].map((i) => <line key={i} x1={x + 6} y1={y + 12 + i * 18} x2={x + 44} y2={y + 26 + i * 18} stroke="#ff7a1a" strokeWidth="4" strokeLinecap="round" opacity=".85" />)}</g>))}
      <rect x="220" y="200" width="160" height="90" rx="8" fill="#1c1c1c" /><rect x="290" y="214" width="76" height="60" rx="3" fill="#c9ced3" /><rect x="215" y="320" width="170" height="60" rx="6" fill="#c62828" /></g>
    <path d="M300 560 h120 m-20 -14 l20 14 -20 14 M300 560 h-120 m20 -14 l-20 14 20 14" stroke="#2ee6c9" strokeWidth="4" fill="none" strokeLinecap="round" opacity=".8" />
    <rect width="600" height="640" fill={u("f")} /></>) },
  walker: { w: 600, h: 720, a: "#41372a", b: "#0d0a07", body: (u) => (<>
    <rect width="600" height="720" fill={u("g")} /><rect y="560" width="600" height="160" fill="#140f0a" />
    <g filter={u("s")}><rect x="170" y="260" width="260" height="110" rx="20" fill="#e8e5dc" /><rect x="200" y="280" width="200" height="60" rx="8" fill="#1e5aa8" />
      {([[180, 1], [250, 1], [350, -1], [420, -1]] as const).map(([x, s], i) => (
        <g key={x}><path d={`M${x} 360 L${x - s * 30} 450 L${x - s * 10} ${i % 2 ? 560 : 540}`} stroke="#1a1a1a" strokeWidth="22" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={x - s * 30} cy="450" r="14" fill="#1565c0" /></g>))}</g>
    <rect width="600" height="720" fill={u("f")} /></>) },
  camera: { w: 600, h: 680, a: "#152238", b: "#05080d", body: (u) => (<>
    <rect width="600" height="680" fill={u("g")} />
    <rect x="70" y="70" width="460" height="300" rx="18" fill="none" stroke="#2ee6c9" strokeWidth="3" strokeDasharray="18 12" opacity=".6" />
    <text x="96" y="110" fontFamily="monospace" fontSize="18" fill="#2ee6c9">● REC  QVGA  24fps</text>
    <g filter={u("s")}><rect x="180" y="300" width="240" height="210" rx="22" fill="#1b2027" /><rect x="230" y="250" width="140" height="110" rx="10" fill="#111" />
      <circle cx="300" cy="305" r="38" fill="#1e2a38" /><circle cx="300" cy="305" r="22" fill="#2f4f7f" /><circle cx="291" cy="296" r="7" fill="#9cc2e8" /><Wheel x={170} y={510} r={40} /><Wheel x={430} y={510} r={40} /></g>
    <rect width="600" height="680" fill={u("f")} /></>) },
  logger: { w: 600, h: 600, a: "#1f3a2c", b: "#060d09", body: (u) => (<>
    <rect width="600" height="600" fill={u("g")} />
    <g filter={u("s")}><rect x="110" y="200" width="380" height="250" rx="18" fill="#1e7f3e" /><rect x="140" y="214" width="280" height="22" rx="3" fill="#c9a43b" />
      <rect x="240" y="290" width="80" height="80" rx="4" fill="#b9c0c6" /><rect x="420" y="270" width="80" height="60" rx="4" fill="#c8cdd2" /><rect x="420" y="350" width="80" height="60" rx="4" fill="#c8cdd2" /></g>
    <path d="M150 140 C 220 80, 260 170, 330 110 S 440 70, 470 120" fill="none" stroke="#ff7a1a" strokeWidth="4" strokeLinecap="round" />
    <path d="M300 450 C 300 500, 220 520, 180 560" stroke="#f2c200" strokeWidth="5" fill="none" /><rect x="150" y="548" width="60" height="20" rx="10" fill="#1a1a1a" />
    <rect width="600" height="600" fill={u("f")} /></>) },
  arm: { w: 600, h: 800, a: "#3b2c1f", b: "#0b0806", body: (u) => (<>
    <rect width="600" height="800" fill={u("g")} /><rect y="600" width="600" height="200" fill="#120d09" />
    <circle cx="380" cy="260" r="200" fill="#ff7a1a" opacity=".1" filter={u("b")} />
    <g filter={u("s")}><rect x="150" y="560" width="200" height="40" rx="8" fill="#2b2f36" /><rect x="200" y="510" width="100" height="56" rx="12" fill="#1b1f24" />
      <path d="M250 520 L320 330" stroke="#c9ced3" strokeWidth="30" strokeLinecap="round" /><path d="M320 330 L460 300" stroke="#c9ced3" strokeWidth="24" strokeLinecap="round" />
      <circle cx="250" cy="520" r="24" fill="#1565c0" /><circle cx="320" cy="330" r="22" fill="#1565c0" /><circle cx="460" cy="300" r="18" fill="#1565c0" />
      <path d="M468 290 l40 -22 M468 310 l40 22" stroke="#1b1f24" strokeWidth="12" strokeLinecap="round" />
      <rect x="430" y="520" width="44" height="44" rx="6" fill="#d93a3a" /><rect x="480" y="540" width="40" height="40" rx="6" fill="#149e6a" /></g>
    <rect width="600" height="800" fill={u("f")} /></>) },
  radar: { w: 600, h: 620, a: "#0f2a1e", b: "#030806", body: (u) => (<>
    <rect width="600" height="620" fill={u("g")} />
    <path d="M70 470 A230 230 0 0 1 530 470 Z" fill="#06150e" stroke="#1d5c3f" strokeWidth="2" />
    {[70, 140, 210].map((r) => <path key={r} d={`M${300 - r} 470 A${r} ${r} 0 0 1 ${300 + r} 470`} fill="none" stroke="#1d5c3f" strokeWidth="2" />)}
    <path d="M300 470 L470 300 A230 230 0 0 0 300 240 Z" fill="#2ee6c9" opacity=".18" /><line x1="300" y1="470" x2="470" y2="300" stroke="#7cf2c8" strokeWidth="3" />
    <circle cx="200" cy="330" r="8" fill="#ff7a1a" /><circle cx="200" cy="330" r="18" fill="#ff7a1a" opacity=".25" /><circle cx="390" cy="380" r="6" fill="#ff7a1a" />
    <g filter={u("s")}><rect x="250" y="500" width="100" height="40" rx="6" fill="#1e5aa8" /><circle cx="280" cy="520" r="13" fill="#c9ced3" /><circle cx="320" cy="520" r="13" fill="#c9ced3" /><rect x="270" y="540" width="60" height="50" rx="6" fill="#1565c0" /></g>
    <rect width="600" height="620" fill={u("f")} /></>) },
  matrix: { w: 600, h: 700, a: "#2a1a3a", b: "#07040b", body: (u) => (<>
    <rect width="600" height="700" fill={u("g")} />
    <g filter={u("s")}><rect x="110" y="140" width="380" height="380" rx="22" fill="#111" />
      {Array.from({ length: 64 }, (_, i) => {
        const r = Math.floor(i / 8), c = i % 8;
        const on = [9, 10, 13, 14, 17, 18, 21, 22, 34, 37, 42, 43, 44, 45].includes(i);
        const col = r > 3 ? "#ff7a1a" : "#2ee6c9";
        return (<g key={i}><circle cx={155 + c * 41.5} cy={185 + r * 41.5} r="14" fill={on ? col : "#22182b"} />
          {on && <circle cx={155 + c * 41.5} cy={185 + r * 41.5} r="22" fill={col} opacity=".18" />}</g>);
      })}</g>
    <rect x="230" y="560" width="140" height="50" rx="6" fill="#17698a" />
    <rect width="600" height="700" fill={u("f")} /></>) },
};

/** Inline SVG cover that fills its box (object-cover style). Give the parent a size/aspect. */
export function Cover({ id, className, title }: { id: CoverId; className?: string; title?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const spec = SPECS[id] ?? SPECS.obstacle;
  const ids: Ids = { g: `${uid}g`, f: `${uid}f`, s: `${uid}s`, b: `${uid}b` };
  const u = (k: keyof Ids) => `url(#${ids[k]})`;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${spec.w} ${spec.h}`} preserveAspectRatio="xMidYMid slice"
      className={className ?? "absolute inset-0 h-full w-full"} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      {title && <title>{title}</title>}
      <Defs ids={ids} a={spec.a} b={spec.b} />
      {spec.body(u)}
    </svg>
  );
}
