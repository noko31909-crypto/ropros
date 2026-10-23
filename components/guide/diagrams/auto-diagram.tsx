/** Automatic Tinkercad-style wiring diagram rendered from lib/hardware/layout.ts. Server component, pure SVG. */
import type { ReactNode } from "react";
import type { Layout, LayoutComponent, LayoutNote, LayoutPin, LayoutRail, LayoutWire } from "@/lib/hardware/layout";

const SANS = "IBM Plex Sans, Atkinson Hyperlegible, Arial, sans-serif";
const MONO = "JetBrains Mono, Menlo, monospace";

export const WIRE_HEX: Record<string, string> = {
  red: "#E53935", black: "#1F1F1F", yellow: "#F2C200", orange: "#F57C00", green: "#43A047", blue: "#1E88E5",
  purple: "#8E24AA", white: "#ECEFF1", gray: "#9E9E9E", brown: "#795548", pink: "#E91E63", cyan: "#00ACC1",
};
const wireHex = (c: string) => WIRE_HEX[c] ?? c;

export type AutoDiagramCaptions = { rail5v?: string; railGnd?: string; rail3v3?: string };

/** Printed pin label: registry labels may carry notes in parentheses ("5V (USB ~500 mA)"). */
export const shortPin = (p: { id: string; label: string }) => { const t = p.label.replace(/\s*\(.*$/, "").trim(); return t && t.length <= 9 ? t : p.id; };
/** Display name without parenthesised notes, cut at a word boundary. */
const shortName = (name: string, max = 22) => {
  const t = name.replace(/\s*\(.*?\)/g, "").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max); const i = cut.lastIndexOf(" ");
  return i > 4 ? cut.slice(0, i) : cut;
};
const pathD = (pts: [number, number][]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join("");

function Headers({ c, ink }: { c: LayoutComponent; ink: string }) {
  const out: ReactNode[] = [];
  const bySide = new Map<string, LayoutPin[]>();
  for (const p of c.pins) bySide.set(p.side, [...(bySide.get(p.side) ?? []), p]);
  const tiny = c.def.kind === "passive";
  for (const [side, pins] of bySide) {
    const horiz = side === "top" || side === "bottom";
    const xs = pins.map((p) => (horiz ? p.x : p.y));
    const lo = Math.min(...xs) - 6, hi = Math.max(...xs) + 6;
    const fixed = horiz ? pins[0]!.y : pins[0]!.x;
    if (!tiny) out.push(horiz
      ? <rect key={`s${side}`} x={lo} y={fixed - 6} width={hi - lo} height={12} rx={2} fill="#151515" />
      : <rect key={`s${side}`} x={fixed - 6} y={lo} width={12} height={hi - lo} rx={2} fill="#151515" />);
    for (const p of pins) {
      out.push(<rect key={`p${p.id}`} x={p.x - 3} y={p.y - 3} width={6} height={6} fill="#C9A43B" stroke="#7A5A00" strokeWidth={0.6} />);
      if (tiny) continue;
      const t = shortPin(p);
      if (side === "top") out.push(<text key={`l${p.id}`} x={p.x} y={p.y + 10} transform={`rotate(90 ${p.x} ${p.y + 10})`} dominantBaseline="central" fontFamily={MONO} fontSize={8} fill={ink}>{t}</text>);
      else if (side === "bottom") out.push(<text key={`l${p.id}`} x={p.x} y={p.y - 10} transform={`rotate(-90 ${p.x} ${p.y - 10})`} dominantBaseline="central" fontFamily={MONO} fontSize={8} fill={ink}>{t}</text>);
      else out.push(<text key={`l${p.id}`} x={side === "left" ? p.x + 10 : p.x - 10} y={p.y} dominantBaseline="central" textAnchor={side === "left" ? "start" : "end"} fontFamily={MONO} fontSize={8} fill={ink}>{t}</text>);
    }
  }
  return <>{out}</>;
}

/** Longest label run inward from each side, to keep the centre text clear of pin labels. */
function freeBox(c: LayoutComponent) {
  let t = 0, b = 0, l = 0, r = 0;
  for (const p of c.pins) {
    const len = 16 + shortPin(p).length * 5;
    if (p.side === "top") t = Math.max(t, len); else if (p.side === "bottom") b = Math.max(b, len);
    else if (p.side === "left") l = Math.max(l, len); else r = Math.max(r, len);
  }
  return { x: c.x + l, y: c.y + t, w: c.w - l - r, h: c.h - t - b };
}

function Part({ c }: { c: LayoutComponent }) {
  const { x, y, w, h, def } = c;
  const ink = def.draw.textColor ?? "#FFFFFF";
  const sides = new Set(c.pins.map((p) => p.side));
  const deco: ReactNode[] = [];
  const box = freeBox(c);
  const cx = box.x + box.w / 2, cy = box.y + box.h / 2;
  let caption: ReactNode = null;
  const outsideCaption = (text: string, sub?: string) => {
    if (sides.has("top") && sides.has("bottom") && !sides.has("left") && !sides.has("right")) {
      return (
        <g>
          <text x={x + w + 8} y={y + h / 2 + (sub ? -2 : 4)} fontFamily={SANS} fontSize={12} fontWeight={700} fill="#37474F">{text}</text>
          {sub && <text x={x + w + 8} y={y + h / 2 + 11} fontFamily={MONO} fontSize={9} fill="#607D8B">{sub}</text>}
        </g>
      );
    }
    const below = sides.has("top");
    const ty = below ? y + h + 16 : y - 18;
    return (
      <g>
        <text x={x + w / 2} y={ty} fontFamily={SANS} fontSize={12} fontWeight={700} fill="#37474F" textAnchor="middle">{text}</text>
        {sub && <text x={x + w / 2} y={ty + 12} fontFamily={MONO} fontSize={9} fill="#607D8B" textAnchor="middle">{sub}</text>}
      </g>
    );
  };

  if (def.kind === "board") {
    // USB block on a side without pins, chip in the middle, mounting holes.
    const usbSide = (["left", "top", "bottom", "right"] as const).find((s) => !sides.has(s)) ?? "left";
    const uw = 30, ul = 40;
    const usb = usbSide === "left" ? { x: x - 10, y: y + 30, w: uw + 10, h: ul } : usbSide === "right" ? { x: x + w - uw, y: y + 30, w: uw + 10, h: ul }
      : usbSide === "top" ? { x: x + w / 2 - ul / 2, y: y - 10, w: ul, h: uw + 10 } : { x: x + w / 2 - ul / 2, y: y + h - uw, w: ul, h: uw + 10 };
    deco.push(<rect key="usb" {...usb} rx={3} fill="#C8CDD2" stroke="#8A9097" />);
    for (const [hx, hy] of [[x + 10, y + 10], [x + w - 10, y + 10], [x + 10, y + h - 10], [x + w - 10, y + h - 10]] as const)
      deco.push(<circle key={`h${hx}-${hy}`} cx={hx} cy={hy} r={4.5} fill="#F5F7F3" stroke="#B8C7C0" />);
    const chipW = Math.min(box.w - 24, 120), chipH = Math.min(box.h * 0.35, 44);
    if (chipW > 30 && chipH > 16) {
      deco.push(<rect key="chip" x={cx - chipW / 2} y={cy + 6} width={chipW} height={chipH} rx={3} fill="#161616" />);
      deco.push(<circle key="dot" cx={cx - chipW / 2 + 6} cy={cy + 12} r={1.8} fill="#444" />);
    }
    caption = (
      <text x={cx} y={cy - 4} fontFamily={SANS} fontSize={Math.max(10, Math.min(20, box.w / (shortName(def.name).length * 0.6)))} fontWeight={700} fill={ink} textAnchor="middle">{shortName(def.name)}</text>
    );
  } else {
    const small = box.w < 56 || box.h < 26;
    const sub = c.label !== def.name ? c.label : undefined;
    if (def.id === "resistor") {
      const vertical = h > w;
      const bands = ["#8D6E63", "#1F1F1F", "#E53935", "#C9A43B"];
      bands.forEach((b, i) => {
        const o = (i + 1) * (vertical ? h : w) / 6;
        deco.push(vertical ? <rect key={b} x={x + 2} y={y + o} width={w - 4} height={4} fill={b} /> : <rect key={b} x={x + o} y={y + 2} width={4} height={h - 4} fill={b} />);
      });
      caption = outsideCaption(sub ?? shortName(def.name));
    } else if (def.id === "led") {
      deco.push(<circle key="dome" cx={x + w / 2} cy={y + h * 0.38} r={Math.min(w, h) * 0.34} fill="#FFCDD2" opacity={0.75} />);
      caption = outsideCaption(sub ?? shortName(def.name));
    } else if (def.id === "push-button") {
      deco.push(<circle key="cap" cx={x + w / 2} cy={y + h / 2} r={Math.min(w, h) * 0.3} fill="#1F1F1F" stroke="#90A4AE" />);
      caption = outsideCaption(sub ?? shortName(def.name));
    } else if (def.id === "dc-motor") {
      const shaftRight = !sides.has("right");
      deco.push(<rect key="cap" x={shaftRight ? x + w : x - 26} y={y + 8} width={26} height={h - 16} rx={6} fill="#CFD8DC" stroke="#90A4AE" />);
    } else if (def.id === "hc-sr04") {
      const r = Math.min(box.h / 2 - 4, w / 6);
      deco.push(<circle key="e1" cx={x + w * 0.22} cy={y + h / 2 - 6} r={r} fill="#CFD8DC" stroke="#78909C" strokeWidth={2} />);
      deco.push(<circle key="e2" cx={x + w * 0.78} cy={y + h / 2 - 6} r={r} fill="#CFD8DC" stroke="#78909C" strokeWidth={2} />);
      deco.push(<circle key="m1" cx={x + w * 0.22} cy={y + h / 2 - 6} r={r * 0.55} fill="url(#ad-mesh)" />);
      deco.push(<circle key="m2" cx={x + w * 0.78} cy={y + h / 2 - 6} r={r * 0.55} fill="url(#ad-mesh)" />);
    } else if (def.id.startsWith("oled") || def.id.startsWith("lcd") || def.id.startsWith("tft") || def.id.startsWith("e-paper")) {
      deco.push(<rect key="scr" x={box.x + 8} y={box.y + 6} width={box.w - 16} height={box.h - 26} rx={2} fill="#05070A" stroke="#33415C" />);
    } else if (def.id.startsWith("battery")) {
      deco.push(<rect key="lbl" x={x + 4} y={y + h * 0.45} width={w - 8} height={h * 0.3} fill="#F2C200" />);
    }
    if (!caption) {
      const full = shortName(def.name);
      const fitsIn = (t: string) => t.length * 0.6 * 11 <= box.w - 8 && box.h >= 22;
      const first = full.split(" ")[0] ?? full;
      const nm = fitsIn(full) || first.length < 4 || !fitsIn(first) ? full : first;
      const fits = fitsIn(nm);
      caption = small || !fits ? outsideCaption(nm, sub) : (
        <g>
          <text x={cx} y={cy + (sub ? -1 : 4)} fontFamily={SANS} fontSize={Math.max(9, Math.min(14, box.w / (nm.length * 0.62)))} fontWeight={700} fill={ink} textAnchor="middle">{nm}</text>
          {sub && <text x={cx} y={cy + 13} fontFamily={MONO} fontSize={9} fill={ink} opacity={0.8} textAnchor="middle">{sub}</text>}
        </g>
      );
    }
  }
  const rx = def.kind === "passive" ? 4 : 8;
  return (
    <g>
      <rect x={x + 3} y={y + 4} width={w} height={h} rx={rx} fill="rgba(0,0,0,.16)" />
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={def.draw.color} stroke="rgba(0,0,0,.35)" strokeWidth={1.2} />
      {deco}
      <Headers c={c} ink={ink} />
      {caption}
    </g>
  );
}

function Rail({ r, label }: { r: LayoutRail; label: string }) {
  const plus = r.kind === "power";
  return (
    <g>
      <line x1={r.x1} y1={r.y} x2={r.x2} y2={r.y} stroke={r.color} strokeWidth={2.4} strokeLinecap="round" />
      <text x={r.x1 - 10} y={r.y + 4} fontFamily={SANS} fontSize={13} fontWeight={700} fill={r.color} textAnchor="middle">{plus ? "+" : "−"}</text>
      <text x={r.x2 + 10} y={r.y + 4} fontFamily={SANS} fontSize={13} fontWeight={700} fill={r.color} textAnchor="middle">{plus ? "+" : "−"}</text>
      <text x={r.x2 - 6} y={r.y - 5} fontFamily={MONO} fontSize={10} fontWeight={700} fill={r.color} textAnchor="end">{label}</text>
    </g>
  );
}

function Wire({ w }: { w: LayoutWire }) {
  const d = pathD(w.points);
  const col = wireHex(w.color);
  const light = w.color === "white" || w.color === "yellow";
  const a = w.points[0], b = w.points[w.points.length - 1];
  return (
    <g>
      <path d={d} fill="none" stroke={light ? "rgba(70,70,70,.55)" : "rgba(0,0,0,.38)"} strokeWidth={5.6} strokeLinejoin="round" strokeLinecap="round" />
      <path d={d} fill="none" stroke={col} strokeWidth={3.6} strokeLinejoin="round" strokeLinecap="round" />
      {a && <circle cx={a[0]} cy={a[1]} r={3.2} fill="#2B2B2B" />}
      {b && <circle cx={b[0]} cy={b[1]} r={3.2} fill="#2B2B2B" />}
    </g>
  );
}

export function AutoDiagram({ layout, title, captions, className = "block h-auto w-full max-w-full" }: { layout: Layout; title: string; captions?: AutoDiagramCaptions; className?: string }) {
  const { width, height } = layout;
  const railLabel = (r: LayoutRail) => (r.kind === "gnd" ? captions?.railGnd ?? "GND rail" : r.volts === 3.3 ? captions?.rail3v3 ?? "3V3 rail" : captions?.rail5v ?? "5V rail");
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label={title} className={className}>
      <title>{title}</title>
      <defs>
        <pattern id="ad-mesh" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".9" fill="#3E444A" /></pattern>
        <pattern id="ad-dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r=".8" fill="#DCE0DA" /></pattern>
      </defs>
      <rect width={width} height={height} fill="#F3F5F2" />
      <rect width={width} height={height} fill="url(#ad-dots)" />
      {layout.rails.map((r) => <Rail key={r.id} r={r} label={railLabel(r)} />)}
      {layout.components.map((c) => <Part key={c.id} c={c} />)}
      {layout.wires.map((w) => <Wire key={w.id} w={w} />)}
    </svg>
  );
}

const noteText = (n: LayoutNote | undefined, locale: string) => (n === undefined ? undefined : typeof n === "string" ? n : n[locale] ?? n.en);
const endText = (e: string) => (e.startsWith("rail.") ? `${e.slice(5)} rail` : e.startsWith("board.") ? e.slice(6) : e);

/** Wire legend: colour swatch · FROM → TO · note. */
export function DiagramLegend({ layout, locale = "en", title }: { layout: Layout; locale?: string; title?: string }) {
  return (
    <div className="text-sm">
      {title && <p className="mb-2 font-semibold">{title}</p>}
      <ul className="grid gap-1.5 sm:grid-cols-2">
        {layout.wires.map((w) => {
          const note = noteText(w.note, locale);
          return (
            <li key={w.id} className="flex items-center gap-2">
              <span aria-hidden className="inline-block h-2.5 w-6 shrink-0 rounded-full ring-1 ring-black/40" style={{ background: wireHex(w.color) }} />
              <span className="font-mono text-xs">{endText(w.from)} → {endText(w.to)}</span>
              {note && <span className="text-xs opacity-70">· {note}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
