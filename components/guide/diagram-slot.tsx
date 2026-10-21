import { CircuitBoard, Download, Maximize2 } from "lucide-react";

/** Placeholder for the Tinkercad-style breadboard diagram. Swap the inner area for your <svg> renderer or next/image. */
export function DiagramSlot({ title, verification }: { title: string; verification: string }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-ink-900">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
        <figcaption className="flex items-center gap-2 text-sm font-semibold text-fg">
          <CircuitBoard className="h-4 w-4 text-accent" aria-hidden />Breadboard wiring
        </figcaption>
        <div className="flex gap-1">
          <button type="button" aria-label="Full screen" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-muted hover:bg-ink-800 hover:text-fg"><Maximize2 className="h-4 w-4" aria-hidden /></button>
          <button type="button" aria-label="Download SVG" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-muted hover:bg-ink-800 hover:text-fg"><Download className="h-4 w-4" aria-hidden /></button>
        </div>
      </div>
      <div className="relative grid aspect-[16/9] place-items-center bg-[#F3F5F2]">
        {/* Breadboard-pattern placeholder */}
        <div className="absolute inset-8 rounded-lg border border-[#C9C9C2] bg-[#EDEDE9] [background-image:radial-gradient(#7C7C7C_1.2px,transparent_1.3px)] [background-size:12px_12px] opacity-70" />
        <p className="relative rounded-lg bg-ink-950/85 px-4 py-2 font-mono text-xs text-fg-muted">Diagram slot · {title}</p>
      </div>
      <p className="border-t border-line px-5 py-3 text-xs text-fg-muted"><span className="font-semibold text-signal">Verification:</span> {verification}</p>
    </figure>
  );
}
