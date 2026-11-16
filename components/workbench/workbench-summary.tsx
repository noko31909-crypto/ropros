"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { ArrowRight, ShoppingCart, Wrench } from "lucide-react";
import { useWorkbench, useWorkbenchMatches } from "./workbench-provider";
import { useMessages } from "@/components/i18n/locale-provider";
import { workbenchMessages } from "@/lib/i18n/messages/workbench";
import { PART_BY_ID } from "@/lib/parts-catalog";

const MAX_CHIPS = 24;

/**
 * "Your workbench: 12 parts · 5 ready to build · 9 one part away". Real numbers from the matcher only:
 * nothing renders until the workbench is loaded, and an empty workbench shows a prompt (or nothing, with `quiet`).
 */
export function WorkbenchSummary({ chips = false, quiet = false, className }: { chips?: boolean; quiet?: boolean; className?: string }) {
  const w = useMessages(workbenchMessages);
  const { ready, parts } = useWorkbench();
  const matches = useWorkbenchMatches();
  if (!ready) return null;
  if (!parts.length) {
    if (quiet) return null;
    return (
      <div className={clsx("flex flex-col gap-4 rounded-[28px] border border-dashed border-ink-700 p-6 sm:flex-row sm:items-center", className)}>
        <Wrench className="h-6 w-6 shrink-0 text-fg-subtle" aria-hidden />
        <p className="flex-1 text-sm text-fg-muted">{w.emptyStrip}</p>
        <Link href="/finder" className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-ink-700 bg-ink-850 px-4 text-sm font-semibold text-fg hover:border-fg-subtle">
          {w.openFinder}<ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    );
  }
  const readyCount = matches?.ready.length ?? 0;
  const oneAway = matches?.close_matches.filter((m) => m.missing.length === 1).length ?? 0;
  return (
    <div className={clsx("rounded-[28px] border border-line bg-ink-850 p-5 sm:p-6", className)}>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent-soft text-accent"><Wrench className="h-5 w-5" aria-hidden /></span>
          <div>
            <p className="font-semibold text-fg">{w.title}</p>
            <p className="text-sm text-fg-muted">{w.partsCount(parts.length)}</p>
          </div>
        </div>
        <dl className="flex gap-8 lg:ml-6">
          <div className="flex flex-col-reverse">
            <dt className="text-xs text-fg-subtle">{w.stats.ready}</dt>
            <dd className="font-mono text-2xl font-semibold tabular-nums text-signal">{readyCount}</dd>
          </div>
          <div className="flex flex-col-reverse">
            <dt className="text-xs text-fg-subtle">{w.stats.oneAway}</dt>
            <dd className="font-mono text-2xl font-semibold tabular-nums text-accent">{oneAway}</dd>
          </div>
        </dl>
        <div className="flex flex-wrap gap-2 lg:ml-auto">
          <Link href="/finder" className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-accent px-4 text-sm font-semibold text-ink-950 hover:bg-accent-hover">
            {w.openFinder}<ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link href="/shopping" className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-ink-700 bg-ink-900 px-4 text-sm font-semibold text-fg hover:border-fg-subtle">
            <ShoppingCart className="h-4 w-4 text-accent" aria-hidden />{w.shoppingList}
          </Link>
        </div>
      </div>
      {chips && (
        <ul className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
          {parts.slice(0, MAX_CHIPS).map((id) => (
            <li key={id} className="rounded-lg border border-line bg-ink-900 px-2.5 py-1 text-xs text-fg-muted">{PART_BY_ID.get(id)?.name ?? id}</li>
          ))}
          {parts.length > MAX_CHIPS && <li className="px-1 py-1 font-mono text-xs text-fg-subtle">+{parts.length - MAX_CHIPS}</li>}
        </ul>
      )}
    </div>
  );
}
