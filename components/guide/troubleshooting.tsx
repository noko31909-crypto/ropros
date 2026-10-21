import { AlertTriangle, ChevronDown, ShieldAlert } from "lucide-react";
import type { Issue } from "@/lib/guides";

export function Troubleshooting({ issues, safety }: { issues: Issue[]; safety: string[] }) {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-amber-400/30 bg-amber-400/[0.06]">
        <div className="absolute inset-y-0 left-0 w-1 bg-amber-400" aria-hidden />
        <div className="flex items-center gap-3 px-6 pt-5">
          <AlertTriangle className="h-5 w-5 text-amber-300" aria-hidden />
          <h3 className="text-base font-semibold text-amber-100">Something not working?</h3>
        </div>
        <p className="px-6 pt-1 text-sm text-amber-100/70">Most likely causes first. Check power and ground before anything else.</p>
        <div className="mt-4 divide-y divide-amber-400/15 border-t border-amber-400/15">
          {issues.map((i) => (
            <details key={i.symptom} className="group px-6 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-fg">
                {i.symptom}
                <ChevronDown className="h-4 w-4 shrink-0 text-amber-300 transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-[90px_1fr]">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">Cause</dt><dd className="text-fg-muted">{i.cause}</dd>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">Fix</dt><dd className="text-fg">{i.fix}</dd>
              </dl>
            </details>
          ))}
        </div>
      </div>
      {safety.length > 0 && (
        <div className="flex gap-3 rounded-2xl border border-rose-400/25 bg-rose-400/[0.05] p-5">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" aria-hidden />
          <ul className="space-y-1.5 text-sm text-fg-muted">{safety.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      )}
    </div>
  );
}
