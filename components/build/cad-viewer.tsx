"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Loader2, RotateCcw } from "lucide-react";
import { toOpenScad } from "@/lib/build/cad";
import { printedSize } from "@/lib/build/fit";
import type { Cad } from "@/lib/build/schema";
import { build } from "@/lib/i18n/messages/build";
import { useMessages } from "@/components/i18n/locale-provider";
import type { View } from "./three-scene";

function download(name: string, data: string | ArrayBuffer, type: string) {
  const url = URL.createObjectURL(new Blob([data], { type }));
  const a = document.createElement("a");
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const fileBase = (title: string) => title.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "ropros-project";
const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** One WebGL view. three.js is loaded on demand so it never weighs on pages without a model. */
function useView(cad: Cad) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const view = useRef<View | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    let cancelled = false;
    setState("loading");
    import("./three-scene").then(({ createView }) => {
      if (cancelled || !canvas.current) return;
      view.current = createView(canvas.current, cad, "orbit", { reducedMotion: reducedMotion() });
      setState("ready");
    }).catch(() => { if (!cancelled) setState("error"); });
    return () => { cancelled = true; view.current?.dispose(); view.current = null; };
  }, [cad]);
  return { canvas, view, state };
}

function Stage({ canvas, state, label, footer }: { canvas: React.RefObject<HTMLCanvasElement | null>; state: string; label: string; footer: React.ReactNode }) {
  const t = useMessages(build).cad;
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-line bg-[radial-gradient(circle_at_50%_35%,#1a2633,#080b10_75%)]">
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
        <canvas ref={canvas} role="img" aria-label={label} className="absolute inset-0 h-full w-full touch-none focus:outline-none" />
        {state !== "ready" && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-fg-subtle">
            {state === "loading" ? <Loader2 className="h-6 w-6 animate-spin text-signal motion-reduce:animate-none" aria-label={t.loading} /> : t.webglError}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5 text-xs text-fg-subtle">{footer}</div>
    </div>
  );
}

/** The model to inspect (drag to orbit, scroll to zoom), part toggles, the printed size and downloads. */
export function CadViewer({ cad, title }: { cad: Cad; title: string }) {
  const t = useMessages(build).cad;
  const [hidden, setHidden] = useState<Set<number>>(() => new Set());
  const model = useView(cad);

  useEffect(() => {
    cad.parts.forEach((_, i) => model.view.current?.setVisible(i, !hidden.has(i)));
  }, [hidden, cad, model.state, model.view]);

  const toggle = (i: number) => setHidden((h) => { const n = new Set(h); if (n.has(i)) n.delete(i); else n.add(i); return n; });
  const size = printedSize(cad);
  const base = fileBase(title);

  return (
    <div className="space-y-4">
      <Stage canvas={model.canvas} state={model.state} label={t.viewerLabel} footer={<>
        <span>{t.hint}</span>
        <button type="button" onClick={() => model.view.current?.resetCamera()} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 hover:text-fg">
          <RotateCcw className="h-3.5 w-3.5" aria-hidden />{t.reset}
        </button>
      </>} />

      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <div className="rounded-2xl border border-line bg-ink-900 p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">{t.parts}</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {cad.parts.map((p, i) => (
              <li key={i}>
                <label className="flex cursor-pointer items-start gap-2.5 text-sm text-fg-muted">
                  <input type="checkbox" checked={!hidden.has(i)} onChange={() => toggle(i)} className="mt-0.5 accent-[#FF7A1A]" />
                  <span className="mt-1 h-3 w-3 shrink-0 rounded-sm" style={{ background: p.color }} aria-hidden />
                  <span>{p.name}
                    <span className="ml-1.5 whitespace-nowrap rounded border border-line px-1 font-mono text-[10px] text-fg-subtle">{p.component ? t.bought : p.printed ? t.printed : t.custom}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2 lg:w-64">
          <button type="button" onClick={() => download(`${base}.scad`, toOpenScad(cad, title), "text/plain")}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-ink-950 hover:bg-accent-hover">
            <Download className="h-4 w-4" aria-hidden />{t.downloadScad}
          </button>
          <button type="button" disabled={model.state !== "ready"} onClick={() => { const stl = model.view.current?.exportStl(); if (stl) download(`${base}.stl`, stl, "model/stl"); }}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-line px-4 text-sm text-fg-muted hover:border-fg-subtle hover:text-fg disabled:opacity-50">
            <Download className="h-4 w-4" aria-hidden />{t.downloadStl}
          </button>
          {size && (
            <p className="rounded-xl border border-line px-3 py-2 text-xs text-fg-muted">
              {t.size} <span className="font-mono text-fg">{size.join(" × ")} {t.mm}</span>
              <span className="mt-1 block text-fg-subtle">{t.tolerance}</span>
            </p>
          )}
          <p className="text-xs leading-relaxed text-fg-subtle">{t.stlNote}</p>
        </div>
      </div>
    </div>
  );
}
