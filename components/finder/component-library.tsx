"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { ArrowRight, Battery, Boxes, Cpu, Monitor, Radio, Search, Settings2, Waves, Wrench, X, type LucideIcon } from "lucide-react";
import { PARTS, PART_CATEGORIES, type PartCategory } from "@/lib/parts-catalog";
import { useMessages } from "@/components/i18n/locale-provider";
import { components as componentsMsgs } from "@/lib/i18n/messages/components";

export const CAT_ICON: Record<PartCategory, LucideIcon> = {
  Boards: Cpu, Sensors: Waves, Actuators: Settings2, Drivers: Boxes, Displays: Monitor, Wireless: Radio, Power: Battery, Mechanical: Wrench,
};

/** Browse the parts catalog by category with a search box; each card links into the finder with that part preselected. */
export function ComponentLibrary() {
  const t = useMessages(componentsMsgs);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<PartCategory | "all">("all");

  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => PARTS.filter((p) =>
    (cat === "all" || p.category === cat) &&
    (!q || p.name.toLowerCase().includes(q) || p.id.includes(q) || p.aliases.some((a) => a.includes(q)) || t.categories[p.category].toLowerCase().includes(q)),
  ), [cat, q, t.categories]);
  const groups = PART_CATEGORIES.map((c) => ({ c, parts: filtered.filter((p) => p.category === c) })).filter((g) => g.parts.length);

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <label className="flex h-14 items-center gap-3 rounded-2xl border border-line bg-ink-900 px-4 focus-within:border-accent/60 focus-within:shadow-[0_0_0_4px_rgba(255,122,26,0.12)]">
          <Search className="h-5 w-5 shrink-0 text-fg-subtle" aria-hidden />
          <span className="sr-only">{t.searchLabel}</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value.slice(0, 80))} placeholder={t.searchPlaceholder}
            className="h-full flex-1 bg-transparent text-base text-fg placeholder:text-fg-subtle focus:outline-none" />
          <span className="font-mono text-xs text-fg-subtle">{t.count(filtered.length)}</span>
        </label>
        <div role="group" aria-label={t.filterLabel} className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {(["all", ...PART_CATEGORIES] as const).map((c) => {
            const Icon = c === "all" ? Boxes : CAT_ICON[c];
            return (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
                className={clsx("inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                  cat === c ? "border-accent/50 bg-accent-soft text-fg" : "border-line text-fg-muted hover:border-ink-700 hover:text-fg")}>
                <Icon className={clsx("h-3.5 w-3.5", cat === c && "text-accent")} aria-hidden />{c === "all" ? t.all : t.categories[c]}
              </button>
            );
          })}
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-ink-700 p-10 text-center">
          <p className="text-fg-muted">{t.empty(query.trim())}</p>
          <button type="button" onClick={() => { setQuery(""); setCat("all"); }} className="mt-4 text-sm font-semibold text-accent hover:text-accent-hover">{t.resetFilters}</button>
        </div>
      ) : groups.map(({ c, parts }) => {
        const Icon = CAT_ICON[c];
        return (
          <section key={c} aria-labelledby={`cat-${c}`}>
            <div className="mb-4 flex items-center gap-2">
              <Icon className="h-5 w-5 text-accent" aria-hidden />
              <h2 id={`cat-${c}`} className="text-lg font-semibold text-fg">{t.categories[c]}</h2>
              <span className="font-mono text-xs text-fg-subtle">{parts.length}</span>
            </div>
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
              {parts.map((p) => (
                <article key={p.id} className="mb-4 break-inside-avoid animate-fade-up rounded-[28px] border border-line bg-ink-850 p-5 transition-colors hover:border-ink-700">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-ink-900 text-fg-muted"><Icon className="h-5 w-5" aria-hidden /></span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-fg">{p.name}</h3>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-fg-subtle">{t.categories[p.category]}</p>
                    </div>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {p.specs.map((s) => <li key={s} className="rounded-md border border-line bg-ink-900 px-2 py-0.5 font-mono text-[11px] text-fg-muted">{s}</li>)}
                  </ul>
                  <Link href={`/ai/finder?parts=${encodeURIComponent(p.id)}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover">
                    {t.findBuilds}<ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        );
      })}
      {(query || cat !== "all") && groups.length > 0 && (
        <button type="button" onClick={() => { setQuery(""); setCat("all"); }} className="inline-flex items-center gap-1.5 text-sm text-fg-subtle hover:text-fg"><X className="h-3.5 w-3.5" aria-hidden />{t.resetFilters}</button>
      )}
    </div>
  );
}
