"use client";

import Link from "next/link";
import { ArrowRight, Check, ClipboardCopy, ExternalLink, PackageCheck, ShoppingCart, Wrench, X } from "lucide-react";
import { useLocale, useMessages } from "@/components/i18n/locale-provider";
import { workbenchMessages } from "@/lib/i18n/messages/workbench";
import { useWorkbench } from "@/components/workbench/workbench-provider";
import { useToast } from "@/components/ui/toast";
import { useSavedBuilds } from "@/lib/saved";
import { shoppingList, shoppingText, storesFor, type ShoppingGuide } from "@/lib/shopping";

/** Missing parts for the saved builds, minus the workbench. Ticking a part moves it onto the workbench. */
export function ShoppingList({ guides }: { guides: ShoppingGuide[] }) {
  const w = useMessages(workbenchMessages);
  const t = w.shop;
  const { locale } = useLocale();
  const toast = useToast();
  const bench = useWorkbench();
  const { saved, toggle } = useSavedBuilds();
  const { items, planned, missingPerGuide } = shoppingList(guides, saved, bench.parts);
  const stores = storesFor(locale);

  const copy = async () => {
    try { await navigator.clipboard.writeText(shoppingText(t.copyHeader, items)); toast(t.copied); }
    catch { toast(t.copyFailed); }
  };

  if (!bench.ready) {
    return <div aria-busy="true" aria-label={t.loading} className="h-64 animate-pulse rounded-[28px] border border-line bg-ink-900 motion-reduce:animate-none" />;
  }

  if (!planned.length) {
    return (
      <div className="mx-auto max-w-2xl rounded-[28px] border border-line bg-gradient-to-b from-ink-850 to-ink-900 px-6 py-12 text-center sm:py-16">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-ink-900 text-fg-muted"><ShoppingCart className="h-6 w-6" aria-hidden /></span>
        <h2 className="mt-5 text-xl font-semibold text-fg">{t.emptyTitle}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">{t.emptyBody}</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/projects" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-ink-950 hover:bg-accent-hover">{t.emptyCta}<ArrowRight className="h-4 w-4" aria-hidden /></Link>
          <Link href="/finder" className="inline-flex h-11 items-center justify-center rounded-xl border border-ink-700 bg-ink-850 px-5 text-sm font-semibold text-fg hover:border-fg-subtle">{w.openFinder}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section aria-labelledby="to-buy">
        {items.length === 0 ? (
          <div className="rounded-[28px] border border-signal/30 bg-signal-soft px-6 py-10 text-center">
            <PackageCheck className="mx-auto h-8 w-8 text-signal" aria-hidden />
            <h2 id="to-buy" className="mt-4 text-xl font-semibold text-fg">{t.doneTitle}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">{t.doneBody}</p>
          </div>
        ) : (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 id="to-buy" className="text-xl font-semibold text-fg">{t.toBuy(items.length)}</h2>
              <button type="button" onClick={() => void copy()} className="inline-flex h-10 items-center gap-2 rounded-xl border border-line bg-ink-900 px-4 text-sm font-semibold text-fg hover:border-fg-subtle">
                <ClipboardCopy className="h-4 w-4 text-fg-muted" aria-hidden />{t.copy}
              </button>
            </div>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.key} className="rounded-2xl border border-line bg-ink-900 p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <button type="button" onClick={() => { bench.add([item.key]); toast(t.gotToast(item.name)); }} aria-label={t.gotAria(item.name)}
                      className="group inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl border border-ink-700 px-3 text-sm font-semibold text-fg-muted transition-colors hover:border-signal/50 hover:text-signal">
                      <Check className="h-4 w-4" aria-hidden />{t.got}
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-fg">{item.name} <span className="ml-1 font-mono text-sm font-normal text-fg-muted">×{item.qty}</span></p>
                      <p className="mt-1 text-sm text-fg-subtle">
                        {t.forBuilds}{" "}
                        {item.uses.map((u, i) => (
                          <span key={u.slug}>{i > 0 && ", "}<Link href={`/projects/${encodeURIComponent(u.slug)}`} className="text-fg-muted underline-offset-2 hover:text-fg hover:underline">{u.title}</Link>{u.qty > 1 && <span className="font-mono"> ×{u.qty}</span>}</span>
                        ))}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="text-xs text-fg-subtle">{t.findAt}</span>
                        {stores.map((s) => (
                          <a key={s.id} href={s.href(item.name)} target="_blank" rel="noopener noreferrer" aria-label={t.storeAria(s.name, item.name)}
                            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-medium text-fg-muted transition-colors hover:border-accent/40 hover:text-fg">
                            {s.name}<ExternalLink className="h-3 w-3" aria-hidden />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        <p className="mt-6 text-xs leading-relaxed text-fg-subtle">{t.notes}</p>
      </section>

      <aside aria-labelledby="planned" className="lg:sticky lg:top-24 lg:self-start">
        <h2 id="planned" className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-fg-subtle">{t.builds}</h2>
        <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-ink-900">
          {planned.map((g) => {
            const missing = missingPerGuide.get(g.slug) ?? 0;
            return (
              <li key={g.slug} className="flex items-start gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <Link href={`/projects/${encodeURIComponent(g.slug)}`} className="font-medium leading-snug text-fg hover:text-accent">{g.title}</Link>
                  <p className="mt-1 flex flex-wrap gap-x-3 font-mono text-[11px] text-fg-subtle">
                    <span className={missing ? "text-accent" : "text-signal"}>{t.buildMissing(missing)}</span>
                    <span>{t.buildCost(g.costUsd)}</span>
                  </p>
                </div>
                <button type="button" onClick={() => toggle(g.slug)} aria-label={t.unsaveAria(g.title)} title={t.unsave}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-fg-subtle hover:bg-ink-800 hover:text-fg">
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </li>
            );
          })}
        </ul>
        <Link href="/finder" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover">
          <Wrench className="h-4 w-4" aria-hidden />{t.editWorkbench} · {w.partsCount(bench.parts.length)}
        </Link>
      </aside>
    </div>
  );
}
