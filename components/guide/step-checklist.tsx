"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { Check, RotateCcw } from "lucide-react";
import type { LocalizedGuide } from "@/lib/guides";
import { guideMessages } from "@/lib/i18n/messages/guide";
import { useMessages } from "@/components/i18n/locale-provider";

const key = (slug: string) => `ropros:steps:${slug}`;

/** Checklist state is stored per guide in localStorage (device-only; no personal data). Server progress lives in ProgressActions. */
export function StepChecklist({ slug, steps }: { slug: string; steps: LocalizedGuide["steps"] }) {
  const t = useMessages(guideMessages).steps;
  const n = steps.length;
  const [done, setDone] = useState<boolean[]>(() => Array.from({ length: n }, () => false));

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key(slug));
      const parsed: unknown = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed)) setDone(Array.from({ length: n }, (_, i) => parsed[i] === true));
    } catch { /* storage unavailable: start fresh */ }
  }, [slug, n]);

  const update = (next: boolean[]) => {
    setDone(next);
    try { localStorage.setItem(key(slug), JSON.stringify(next)); } catch { /* ignore */ }
  };
  const count = done.filter(Boolean).length;

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-800" role="progressbar" aria-valuemin={0} aria-valuemax={n} aria-valuenow={count} aria-label={t.progress}>
          <div className="h-full rounded-full bg-accent transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${Math.round((count / n) * 100)}%` }} />
        </div>
        <span className="font-mono text-xs tabular-nums text-fg-muted">{count}/{n}</span>
        {count > 0 && (
          <button type="button" onClick={() => update(done.map(() => false))} className="inline-flex items-center gap-1.5 text-xs text-fg-subtle hover:text-fg">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />{t.reset}
          </button>
        )}
      </div>

      <ol className="relative space-y-4">
        {steps.map((s, i) => {
          const checked = done[i] ?? false;
          const id = `step-${i}`;
          return (
            <li key={i} className="relative grid grid-cols-[44px_1fr] gap-4">
              {i < n - 1 && <span className={clsx("absolute bottom-[-16px] left-[21px] top-12 w-0.5", checked ? "bg-accent/50" : "bg-line")} aria-hidden />}
              <label htmlFor={id} className="relative z-10 h-11 w-11 cursor-pointer">
                <input id={id} type="checkbox" className="peer sr-only" checked={checked} onChange={() => update(done.map((d, k) => (k === i ? !d : d)))} />
                <span className={clsx(
                  "flex h-11 w-11 items-center justify-center rounded-xl border-2 font-mono text-sm font-semibold transition-all",
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink-950",
                  checked ? "border-accent bg-accent text-ink-950" : "border-ink-700 bg-ink-900 text-fg-muted hover:border-fg-subtle")}>
                  {checked ? <Check className="h-5 w-5" strokeWidth={3} aria-hidden /> : i + 1}
                </span>
                <span className="sr-only">{t.mark(i + 1)}</span>
              </label>
              <div className={clsx("rounded-2xl border p-5 transition-colors", checked ? "border-accent/25 bg-accent-soft" : "border-line bg-ink-900")}>
                <h3 className={clsx("font-semibold", checked ? "text-fg-muted line-through decoration-accent/60" : "text-fg")}>{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.body}</p>
                <dl className="mt-4 grid gap-2 rounded-xl bg-ink-950/60 p-3 text-[13px] sm:grid-cols-[130px_1fr]">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-signal">{t.expect}</dt><dd className="text-fg-muted">{s.expect}</dd>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-amber-300">{t.careful}</dt><dd className="text-fg-muted">{s.mistake}</dd>
                </dl>
              </div>
            </li>
          );
        })}
      </ol>
      {count === n && <p className="mt-6 animate-fade-up rounded-xl border border-signal/30 bg-signal-soft px-4 py-3 text-sm font-semibold text-signal" role="status">{t.allDone}</p>}
    </div>
  );
}
