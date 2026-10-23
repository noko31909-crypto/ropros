"use client";

import { useRef, useState, type ReactNode } from "react";
import { clsx } from "clsx";
import { ArrowLeftRight, CircuitBoard, Copy, Maximize2, Minimize2 } from "lucide-react";
import type { LocalizedGuide } from "@/lib/guides";
import { guideMessages } from "@/lib/i18n/messages/guide";
import { useMessages } from "@/components/i18n/locale-provider";
import { useToast } from "@/components/ui/toast";

/** Frame around a static server-rendered SVG diagram: zoom toggle, copy-SVG, verification note and wire legend. */
export function DiagramSlot({ children, verification, wires }: { children: ReactNode; verification: string; wires: LocalizedGuide["wires"] }) {
  const t = useMessages(guideMessages).diagram;
  const toast = useToast();
  const [zoomed, setZoomed] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  const copySvg = async () => {
    const svg = box.current?.querySelector("svg");
    if (!svg) return;
    try { await navigator.clipboard.writeText(new XMLSerializer().serializeToString(svg)); toast(t.copied); } catch { /* clipboard blocked */ }
  };

  return (
    <div className="space-y-6">
      <figure className="overflow-hidden rounded-2xl border border-line bg-ink-900">
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
          <figcaption className="flex items-center gap-2 text-sm font-semibold text-fg"><CircuitBoard className="h-4 w-4 text-accent" aria-hidden />{t.title}</figcaption>
          <div className="flex gap-1">
            <button type="button" onClick={() => setZoomed((z) => !z)} aria-pressed={zoomed} aria-label={zoomed ? t.unzoom : t.zoom} title={zoomed ? t.unzoom : t.zoom}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-muted hover:bg-ink-800 hover:text-fg">
              {zoomed ? <Minimize2 className="h-4 w-4" aria-hidden /> : <Maximize2 className="h-4 w-4" aria-hidden />}
            </button>
            <button type="button" onClick={copySvg} aria-label={t.copySvg} title={t.copySvg} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-muted hover:bg-ink-800 hover:text-fg">
              <Copy className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
        <p className="flex items-center gap-2 border-b border-line px-5 py-2 text-xs text-fg-subtle sm:hidden"><ArrowLeftRight className="h-3.5 w-3.5" aria-hidden />{t.swipe}</p>
        <div ref={box} tabIndex={0} className={clsx("overflow-auto overscroll-contain bg-[#F3F5F2]", zoomed ? "max-h-[85vh] [&>svg]:min-w-[1480px]" : "max-h-[70vh] sm:max-h-[640px]")}>
          {children}
        </div>
        <p className="border-t border-line px-5 py-3 text-xs text-fg-muted"><span className="font-semibold text-signal">{t.verification}</span> {verification}</p>
      </figure>

      {wires.length > 0 && (
        <section aria-labelledby="wire-legend" className="rounded-2xl border border-line bg-ink-900 p-5">
          <h3 id="wire-legend" className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-subtle">{t.legend}</h3>
          <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {wires.map((w) => (
              <li key={`${w.from}-${w.to}`} className="flex items-start gap-3 text-sm">
                <span className="mt-1.5 h-1.5 w-7 shrink-0 rounded-full ring-1 ring-white/10" style={{ background: w.color }} aria-hidden />
                <span className="min-w-0">
                  <span className="font-mono text-xs text-fg">{w.from} <span className="text-fg-subtle">→</span> {w.to}</span>
                  {w.note && <span className="block text-xs text-fg-subtle">{w.note}</span>}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
