/** Small SVG building blocks shared by the simpler breadboard diagrams (same visual language as the obstacle robot). */
export const SANS = "Atkinson Hyperlegible, Arial, sans-serif";
export const MONO = "JetBrains Mono, Menlo, monospace";

export function BoardBg({ w, h, id }: { w: number; h: number; id: string }) {
  return (
    <>
      <defs>
        <pattern id={`${id}-holes`} width="12" height="12" patternUnits="userSpaceOnUse">
          <rect x="4" y="4" width="4.2" height="4.2" rx=".6" fill="#7C7C7C" />
        </pattern>
      </defs>
      <rect width={w} height={h} fill="#F3F5F2" />
    </>
  );
}

/** Half/full breadboard with + / − rails top and bottom. */
export function Breadboard({ x, y, w, h, id }: { x: number; y: number; w: number; h: number; id: string }) {
  const fill = `url(#${id}-holes)`;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill="#EDEDE9" stroke="#C9C9C2" strokeWidth="1.5" />
      <rect x={x + 6} y={y + h / 2 - 4} width={w - 12} height="8" rx="3" fill="#DADAD3" />
      {[y + 10, y + 22, y + h - 34, y + h - 22].map((ry, i) => (
        <rect key={ry} x={x + 24} y={ry} width={w - 48} height="12" fill={fill} opacity={i % 2 ? 0.9 : 1} />
      ))}
      <line x1={x + 24} y1={y + 8} x2={x + w - 24} y2={y + 8} stroke="#E53935" strokeWidth="1.6" />
      <line x1={x + 24} y1={y + 36} x2={x + w - 24} y2={y + 36} stroke="#1E5AA8" strokeWidth="1.6" />
      <line x1={x + 24} y1={y + h - 36} x2={x + w - 24} y2={y + h - 36} stroke="#E53935" strokeWidth="1.6" />
      <line x1={x + 24} y1={y + h - 8} x2={x + w - 24} y2={y + h - 8} stroke="#1E5AA8" strokeWidth="1.6" />
      <rect x={x + 24} y={y + 46} width={w - 48} height={h / 2 - 54} fill={fill} />
      <rect x={x + 24} y={y + h / 2 + 8} width={w - 48} height={h / 2 - 54} fill={fill} />
      <text x={x + 12} y={y + 20} fontFamily={SANS} fontSize="12" fontWeight="700" fill="#E53935" textAnchor="middle">+</text>
      <text x={x + 12} y={y + 34} fontFamily={SANS} fontSize="12" fontWeight="700" fill="#1E5AA8" textAnchor="middle">−</text>
      <text x={x + 12} y={y + h - 24} fontFamily={SANS} fontSize="12" fontWeight="700" fill="#E53935" textAnchor="middle">+</text>
      <text x={x + 12} y={y + h - 10} fontFamily={SANS} fontSize="12" fontWeight="700" fill="#1E5AA8" textAnchor="middle">−</text>
    </g>
  );
}

/** Jumper wire with a soft drop shadow. `pts` is a list of [x, y] corners. */
export function Wire({ pts, color, width = 3.6 }: { pts: [number, number][]; color: string; width?: number }) {
  const d = pts.map(([px, py], i) => `${i ? "L" : "M"}${px} ${py}`).join(" ");
  return (
    <g>
      <path d={d} fill="none" stroke="rgba(0,0,0,.38)" strokeWidth={width + 1.8} strokeLinejoin="round" strokeLinecap="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinejoin="round" strokeLinecap="round" />
      {[pts[0], pts[pts.length - 1]].map((p, i) => p && <circle key={i} cx={p[0]} cy={p[1]} r="3.4" fill="#2B2B2B" />)}
    </g>
  );
}

/** Labelled PCB module. */
export function Module({ x, y, w, h, fill, label, sub, light }: { x: number; y: number; w: number; h: number; fill: string; label: string; sub?: string; light?: boolean }) {
  const ink = light ? "#1F1F1F" : "#FFFFFF";
  return (
    <g>
      <rect x={x + 3} y={y + 4} width={w} height={h} rx="8" fill="rgba(0,0,0,.18)" />
      <rect x={x} y={y} width={w} height={h} rx="8" fill={fill} stroke="rgba(0,0,0,.35)" strokeWidth="1.2" />
      <text x={x + w / 2} y={y + h / 2 + (sub ? -2 : 5)} fontFamily={SANS} fontSize="15" fontWeight="700" fill={ink} textAnchor="middle">{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 16} fontFamily={MONO} fontSize="10" fill={ink} opacity=".75" textAnchor="middle">{sub}</text>}
    </g>
  );
}

/** Row of header pins with labels. `dir` puts labels above ("up") or below ("down") the pins. */
export function PinRow({ x, y, labels, step = 22, dir = "down" }: { x: number; y: number; labels: string[]; step?: number; dir?: "up" | "down" }) {
  return (
    <g>
      {labels.map((l, i) => (
        <g key={`${l}-${i}`}>
          <rect x={x + i * step - 4} y={y - 4} width="8" height="8" rx="1.5" fill="#C49000" stroke="#7A5A00" strokeWidth=".8" />
          <text x={x + i * step} y={dir === "down" ? y + 18 : y - 10} fontFamily={MONO} fontSize="9" fill="#FFFFFF" textAnchor="middle">{l}</text>
        </g>
      ))}
    </g>
  );
}

export function Caption({ x, y, children, anchor = "middle" }: { x: number; y: number; children: string; anchor?: "start" | "middle" | "end" }) {
  return <text x={x} y={y} fontFamily={SANS} fontSize="14" fontWeight="700" fill="#37474F" textAnchor={anchor}>{children}</text>;
}

/** Yellow TT gear motor seen from above. */
export function Motor({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width="120" height="54" rx="8" fill="#F2C200" stroke="#C49000" strokeWidth="1.5" />
      <rect x={x + 120} y={y + 10} width="44" height="34" rx="6" fill="#CFD8DC" stroke="#90A4AE" strokeWidth="1.2" />
      <circle cx={x + 30} cy={y + 27} r="12" fill="#FFFFFF" stroke="#C49000" strokeWidth="1.2" />
      <text x={x + 82} y={y + 32} fontFamily={SANS} fontSize="12" fontWeight="700" fill="#5D4300" textAnchor="middle">M</text>
      <Caption x={x + 82} y={y + 76}>{label}</Caption>
    </g>
  );
}
