"use client";

import { useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Download, RotateCcw } from "lucide-react";
import { cadBounds, cadTriangles, faceNormal, toOpenScad, toStl, type Vec3 } from "@/lib/build/cad";
import type { Cad } from "@/lib/build/schema";
import { build } from "@/lib/i18n/messages/build";
import { useMessages } from "@/components/i18n/locale-provider";

const W = 640, H = 460;
const LIGHT: Vec3 = (() => { const l: Vec3 = [-0.45, -0.7, 0.55]; const n = Math.hypot(...l); return [l[0] / n, l[1] / n, l[2] / n]; })();
const DEFAULT_VIEW = { yaw: -35, pitch: 28 };

function shade(hex: string, k: number): string {
  const v = parseInt(hex.slice(1), 16);
  const ch = (s: number) => Math.round(Math.min(255, ((v >> s) & 255) * k));
  return `rgb(${ch(16)},${ch(8)},${ch(0)})`;
}

function download(name: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const fileBase = (title: string) => title.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "ropros-project";

/**
 * Dependency-free 3D preview: orthographic projection, painter's algorithm and flat shading drawn as SVG.
 * Holes (subtract shapes) are drawn on top as dark see-through faces so you can see where they cut.
 */
export function CadViewer({ cad, title }: { cad: Cad; title: string }) {
  const t = useMessages(build).cad;
  const [view, setView] = useState(DEFAULT_VIEW);
  const [hidden, setHidden] = useState<Set<number>>(() => new Set());
  const drag = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);

  const tris = useMemo(() => cadTriangles(cad), [cad]);
  const { center, scale } = useMemo(() => {
    const { min, max } = cadBounds(tris);
    const size = Math.max(max[0] - min[0], max[1] - min[1], max[2] - min[2], 1);
    return { center: [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2] as Vec3, scale: (0.8 * Math.min(W, H)) / size };
  }, [tris]);

  const faces = useMemo(() => {
    const yaw = (view.yaw * Math.PI) / 180, pitch = (view.pitch * Math.PI) / 180;
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const project = (p: Vec3): Vec3 => {
      const x = p[0] - center[0], y = p[1] - center[1], z = p[2] - center[2];
      const x1 = x * cy - y * sy, y1 = x * sy + y * cy;
      return [x1, y1 * cp - z * sp, y1 * sp + z * cp]; // [screen x, depth (bigger = farther), screen up]
    };
    const out: { d: string; fill: string; depth: number; hole: boolean }[] = [];
    for (const tri of tris) {
      if (hidden.has(tri.part)) continue;
      const a = project(tri.a), b = project(tri.b), c = project(tri.c);
      const n = faceNormal(a, b, c);
      if (n[1] > 0) continue; // back face
      const pt = (p: Vec3) => `${(W / 2 + p[0] * scale).toFixed(1)} ${(H / 2 - p[2] * scale).toFixed(1)}`;
      const light = Math.max(0, n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2]);
      const color = cad.parts[tri.part]?.color ?? "#9aa4b2";
      out.push({
        d: `M${pt(a)}L${pt(b)}L${pt(c)}Z`,
        fill: tri.subtract ? "#04070a" : shade(color, 0.38 + 0.72 * light),
        depth: (a[1] + b[1] + c[1]) / 3,
        hole: tri.subtract,
      });
    }
    // Solids back to front, then holes on top.
    return out.sort((p, q) => Number(p.hole) - Number(q.hole) || q.depth - p.depth);
  }, [tris, view, hidden, center, scale, cad.parts]);

  const onDown = (e: PointerEvent<SVGSVGElement>) => { e.currentTarget.setPointerCapture(e.pointerId); drag.current = { x: e.clientX, y: e.clientY, ...view }; };
  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const s = drag.current;
    if (!s) return;
    setView({ yaw: s.yaw - (e.clientX - s.x) * 0.5, pitch: Math.max(-89, Math.min(89, s.pitch + (e.clientY - s.y) * 0.5)) });
  };
  const onKey = (e: KeyboardEvent<SVGSVGElement>) => {
    const step = { ArrowLeft: [10, 0], ArrowRight: [-10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] }[e.key];
    if (!step) return;
    e.preventDefault();
    setView((v) => ({ yaw: v.yaw + step[0]!, pitch: Math.max(-89, Math.min(89, v.pitch + step[1]!)) }));
  };
  const toggle = (i: number) => setHidden((h) => { const n = new Set(h); if (n.has(i)) n.delete(i); else n.add(i); return n; });
  const base = fileBase(title);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
      <div className="overflow-hidden rounded-2xl border border-line bg-[radial-gradient(circle_at_50%_40%,#16202b,#080b10)]">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t.viewerLabel} tabIndex={0}
          className="block h-auto w-full cursor-grab touch-none select-none active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          onPointerDown={onDown} onPointerMove={onMove} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} onKeyDown={onKey}>
          {faces.map((f, i) => (
            <path key={i} d={f.d} fill={f.fill} fillOpacity={f.hole ? 0.6 : 1} stroke={f.hole ? "#2EE6C9" : f.fill} strokeOpacity={f.hole ? 0.35 : 1} strokeWidth={f.hole ? 0.6 : 0.5} strokeLinejoin="round" />
          ))}
        </svg>
        <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5 text-xs text-fg-subtle">
          <span>{t.hint}</span>
          <button type="button" onClick={() => setView(DEFAULT_VIEW)} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 hover:text-fg">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />{t.reset}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-line bg-ink-900 p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">{t.parts}</p>
          <ul className="mt-3 space-y-2">
            {cad.parts.map((p, i) => (
              <li key={i}>
                <label className="flex cursor-pointer items-start gap-2.5 text-sm text-fg-muted">
                  <input type="checkbox" checked={!hidden.has(i)} onChange={() => toggle(i)} className="mt-0.5 accent-[#FF7A1A]" />
                  <span className="mt-1 h-3 w-3 shrink-0 rounded-sm" style={{ background: p.color }} aria-hidden />
                  <span>{p.name}{p.printed && <span className="ml-1.5 whitespace-nowrap rounded border border-line px-1 font-mono text-[10px] text-fg-subtle">{t.printed}</span>}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <button type="button" onClick={() => download(`${base}.scad`, toOpenScad(cad, title), "text/plain")}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-ink-950 hover:bg-accent-hover">
            <Download className="h-4 w-4" aria-hidden />{t.downloadScad}
          </button>
          <button type="button" onClick={() => download(`${base}.stl`, toStl(cad), "model/stl")}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-line px-4 text-sm text-fg-muted hover:border-fg-subtle hover:text-fg">
            <Download className="h-4 w-4" aria-hidden />{t.downloadStl}
          </button>
          <p className="text-xs leading-relaxed text-fg-subtle">{t.stlNote}</p>
        </div>
      </div>
    </div>
  );
}
