"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { Check, RotateCcw } from "lucide-react";
import type { Step } from "@/lib/guides";

const key = (slug: string) => `ropros:steps:${slug}`;

/** Progress is stored per guide in localStorage (device-only; contains no personal data). */
export function StepChecklist({ slug, steps }: { slug: string; steps: Step[] }) {
  const [done, setDone] = useState<boolean[]>(() => steps.map(() => false));

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key(slug));
      const parsed: unknown = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed)) setDone(steps.map((_, i) => parsed[i] === true));
    } catch { /* storage unavailable: start fresh */ }
  }, [slug, steps]);

  const update = (next: boolean[]) => {
    setDone(next);
    try { localStorage.setItem(key(slug), JSON.stringify(next)); } catch { /* ignore */ }
  };
  const count = done.filter(Boolean).length;
  const pct = Math.round((count / steps.length) * 100);

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-800" role="progressbar" aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={count} aria-label="Build progress">
          <div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${pct}%` }} />
        </div>
        <span className="font-mono text-xs tabular-nums text-fg-muted">{count}/{steps.length}</span>
        {count > 0 && (
          <button type="button" onClick={() => update(steps.map(() => false))} className="inline-flex items-center gap-1.5 text-xs text-fg-subtle hover:text-fg">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />Reset
          </button>
        )}
      </div>

      <ol className="relative space-y-4">
        {steps.map((s, i) => {
          const checked = done[i] ?? false;
          const id = `step-${i}`;
          return (
            <li key={s.title} className="relative grid grid-cols-[44px_1fr] gap-4">
              {i < steps.length - 1 && <span className={clsx("absolute left-[21px] top-12 bottom-[-16px] w-0.5", checked ? "bg-accent/50" : "bg-line")} aria-hidden />}
              {/* Custom checkbox: real input for accessibility, styled sibling for visuals */}
              <label htmlFor={id} className="relative z-10 h-11 w-11 cursor-pointer">
                <input id={id} type="checkbox" className="peer sr-only" checked={checked}
                  onChange={() => update(done.map((d, k) => (k === i ? !d : d)))} />
                <span className={clsx(
                  "flex h-11 w-11 items-center justify-center rounded-xl border-2 font-mono text-sm font-semibold transition-all",
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink-950",
                  checked ? "border-accent bg-accent text-ink-950" : "border-ink-700 bg-ink-900 text-fg-muted hover:border-fg-subtle")}>
                  {checked ? <Check className="h-5 w-5" strokeWidth={3} aria-hidden /> : i + 1}
                </span>
                <span className="sr-only">Mark step {i + 1} done</span>
              </label>
              <div className={clsx("rounded-2xl border p-5 transition-colors", checked ? "border-accent/25 bg-accent-soft" : "border-line bg-ink-900")}>
                <h3 className={clsx("font-semibold", checked ? "text-fg-muted line-through decoration-accent/60" : "text-fg")}>{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.body}</p>
                <dl className="mt-4 grid gap-2 rounded-xl bg-ink-950/60 p-3 text-[13px] sm:grid-cols-[110px_1fr]">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-signal">You should see</dt><dd className="text-fg-muted">{s.expect}</dd>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-amber-300">Watch out</dt><dd className="text-fg-muted">{s.mistake}</dd>
                </dl>
              </div>
            </li>
          );
        })}
      </ol>
      {count === steps.length && (
        <p className="mt-6 rounded-xl border border-signal/30 bg-signal-soft px-4 py-3 text-sm font-semibold text-signal" role="status">All steps done. Nice build.</p>
      )}
    </div>
  );
}
