"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { Check, ShoppingCart, Wrench } from "lucide-react";
import type { LocalizedGuide } from "@/lib/guides";
import { guideMessages } from "@/lib/i18n/messages/guide";
import { workbenchMessages } from "@/lib/i18n/messages/workbench";
import { useMessages } from "@/components/i18n/locale-provider";
import { useWorkbench } from "@/components/workbench/workbench-provider";

type Part = LocalizedGuide["parts"][number];

/** Tick a part you own: it goes on (or off) your workbench. Parts the catalog doesn't know get no tick. */
function OwnToggle({ part }: { part: Part }) {
  const w = useMessages(workbenchMessages).parts;
  const bench = useWorkbench();
  if (!part.key) return <span className="inline-block h-7 w-7" aria-hidden />;
  const key = part.key;
  const owned = bench.parts.includes(key);
  return (
    <button type="button" disabled={!bench.ready} aria-pressed={owned} onClick={() => (owned ? bench.remove(key) : bench.add([key]))}
      aria-label={owned ? w.removeAria(part.name) : w.addAria(part.name)} title={owned ? w.have : undefined}
      className={clsx("inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors disabled:opacity-40",
        owned ? "border-signal/50 bg-signal-soft text-signal" : "border-ink-700 text-transparent hover:border-signal/50 hover:text-signal/60")}>
      <Check className="h-4 w-4" aria-hidden />
    </button>
  );
}

/** "You have 4 of 7 parts", counted over the parts the finder counts (required, catalog-known, de-duplicated). */
function WorkbenchLine({ parts }: { parts: Part[] }) {
  const w = useMessages(workbenchMessages);
  const bench = useWorkbench();
  if (!bench.ready) return null;
  const keys = [...new Set(parts.filter((p) => p.required && p.key).map((p) => p.key!))];
  if (!keys.length) return null;
  const have = keys.filter((k) => bench.parts.includes(k)).length;
  const done = have === keys.length;
  return (
    <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-line bg-ink-900 px-4 py-3 text-sm">
      <Wrench className={clsx("h-4 w-4 shrink-0", done ? "text-signal" : "text-accent")} aria-hidden />
      <span className="font-semibold text-fg" aria-live="polite">{w.parts.count(have, keys.length)}</span>
      <span className="text-fg-muted">{done ? w.parts.allSet : have === 0 ? w.parts.tick : w.parts.hint}</span>
      {!done && (
        <Link href="/shopping" className="inline-flex items-center gap-1.5 font-semibold text-accent hover:text-accent-hover sm:ml-auto">
          <ShoppingCart className="h-4 w-4" aria-hidden />{w.shoppingList}
        </Link>
      )}
    </div>
  );
}

export function PartsTable({ parts }: { parts: Part[] }) {
  const t = useMessages(guideMessages).parts;
  const w = useMessages(workbenchMessages).parts;
  const ordered = [...parts.filter((p) => !p.optional), ...parts.filter((p) => p.optional)];
  const Opt = ({ short }: { short?: boolean }) => (
    <span className="ml-2 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fg-subtle">{short ? t.optionalShort : t.optional}</span>
  );
  return (
    <>
      <WorkbenchLine parts={parts} />
      <ul className="space-y-2 sm:hidden">
        {ordered.map((p, i) => (
          <li key={`${p.name}-${i}`} className="flex items-start gap-3 rounded-xl border border-line bg-ink-900 p-4">
            <OwnToggle part={p} />
            <span className="mt-0.5 w-9 shrink-0 text-right font-mono text-sm tabular-nums text-fg-muted">×{p.qty}</span>
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
              <th scope="col" className="w-12 py-3 pl-5 pr-0 font-medium"><span className="sr-only">{w.have}</span></th>
              <th scope="col" className="py-3 pl-3 pr-3 font-medium">{t.part}</th>
              <th scope="col" className="px-3 py-3 text-right font-medium">{t.qty}</th>
              <th scope="col" className="px-3 py-3 font-medium">{t.spec}</th>
              <th scope="col" className="py-3 pl-3 pr-5 font-medium">{t.role}</th>
            </tr>
          </thead>
          <tbody>
            {ordered.map((p, i) => (
              <tr key={`${p.name}-${i}`} className="border-t border-line transition-colors hover:bg-ink-800/60">
                <td className="py-3 pl-5 pr-0 align-top"><OwnToggle part={p} /></td>
                <td className="py-3.5 pl-3 pr-3 font-medium text-fg">{p.name}{p.optional && <Opt />}</td>
                <td className="px-3 py-3.5 text-right font-mono tabular-nums text-fg-muted">×{p.qty}</td>
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
