"use client";

import type { LocalizedGuide } from "@/lib/guides";
import { guideMessages } from "@/lib/i18n/messages/guide";
import { useMessages } from "@/components/i18n/locale-provider";

type Part = LocalizedGuide["parts"][number];

export function PartsTable({ parts }: { parts: Part[] }) {
  const t = useMessages(guideMessages).parts;
  const ordered = [...parts.filter((p) => !p.optional), ...parts.filter((p) => p.optional)];
  const Opt = ({ short }: { short?: boolean }) => (
    <span className="ml-2 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fg-subtle">{short ? t.optionalShort : t.optional}</span>
  );
  return (
    <>
      <ul className="space-y-2 sm:hidden">
        {ordered.map((p) => (
          <li key={p.name} className="flex items-start gap-3 rounded-xl border border-line bg-ink-900 p-4">
            <span className="mt-0.5 font-mono text-sm tabular-nums text-accent">×{p.qty}</span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-fg">{p.name}{p.optional && <Opt short />}</p>
              <p className="mt-1 text-sm text-fg-muted">{p.role}</p>
              <p className="mt-1 font-mono text-xs text-fg-subtle">{p.spec}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="hidden overflow-x-auto rounded-2xl border border-line bg-ink-900 sm:block">
        <table className="w-full min-w-[640px] text-left text-sm">
          <caption className="sr-only">{t.caption}</caption>
          <thead className="bg-ink-850 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-subtle">
            <tr>
              <th scope="col" className="py-3 pl-5 pr-3 font-medium">{t.part}</th>
              <th scope="col" className="px-3 py-3 text-right font-medium">{t.qty}</th>
              <th scope="col" className="px-3 py-3 font-medium">{t.spec}</th>
              <th scope="col" className="py-3 pl-3 pr-5 font-medium">{t.role}</th>
            </tr>
          </thead>
          <tbody>
            {ordered.map((p) => (
              <tr key={p.name} className="border-t border-line transition-colors hover:bg-ink-800/60">
                <td className="py-3.5 pl-5 pr-3 font-medium text-fg">{p.name}{p.optional && <Opt />}</td>
                <td className="px-3 py-3.5 text-right font-mono tabular-nums text-accent">×{p.qty}</td>
                <td className="px-3 py-3.5 font-mono text-xs text-fg-muted">{p.spec}</td>
                <td className="py-3.5 pl-3 pr-5 text-fg-muted">{p.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
