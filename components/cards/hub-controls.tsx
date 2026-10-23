"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { clsx } from "clsx";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { useMessages } from "@/components/i18n/locale-provider";
import { common } from "@/lib/i18n/messages/common";
import { projects } from "@/lib/i18n/messages/projects";
import { BOARDS, BOARD_LABEL, DIFFICULTIES } from "@/lib/projects";

function useSetParams() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, start] = useTransition();
  const set = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) { if (v) next.set(k, v); else next.delete(k); }
    const qs = next.toString();
    start(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  };
  return { params, set, pending };
}

export function HubSearch() {
  const t = useMessages(projects);
  const { params, set } = useSetParams();
  const urlQ = params.get("q") ?? "";
  const [q, setQ] = useState(urlQ);
  useEffect(() => setQ(urlQ), [urlQ]);
  useEffect(() => {
    if (q === urlQ) return;
    const id = setTimeout(() => set({ q: q.trim() || null }), 250);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);
  return (
    <label className="relative block max-w-xl">
      <span className="sr-only">{t.searchLabel}</span>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-fg-subtle" aria-hidden />
      <input type="search" value={q} onChange={(e) => setQ(e.target.value.slice(0, 100))} placeholder={t.searchPlaceholder}
        className="h-12 w-full rounded-xl border border-line bg-ink-900 pl-12 pr-4 text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none" />
    </label>
  );
}

export function HubFilters() {
  const t = useMessages(projects);
  const c = useMessages(common);
  const { params, set } = useSetParams();
  const [open, setOpen] = useState(false);
  const board = params.get("board");
  const diff = params.get("difficulty");
  const robotics = params.get("category") === "robotics";
  const count = (board ? 1 : 0) + (diff ? 1 : 0) + (robotics ? 1 : 0);
  const legend = "mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle";
  const row = "flex min-h-[36px] cursor-pointer items-center gap-3 text-sm text-fg-muted hover:text-fg";
  const box = "h-4 w-4 rounded border-ink-700 bg-ink-850 accent-[#ff7a1a]";

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}
        className="flex h-12 w-full items-center justify-between rounded-xl border border-line bg-ink-900 px-4 text-sm font-semibold text-fg lg:hidden">
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-accent" aria-hidden />{t.filters}
          {count > 0 && <span className="rounded-md bg-accent px-1.5 font-mono text-[11px] text-ink-950">{count}</span>}
        </span>
        <ChevronDown className={clsx("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      <aside aria-label={t.filters}
        className={clsx(open ? "grid" : "hidden", "mt-4 grid-cols-2 gap-6 rounded-2xl border border-line bg-ink-900 p-5 lg:mt-0 lg:block lg:space-y-8 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0")}>
        <p className="hidden items-center gap-2 text-sm font-semibold text-fg lg:flex"><SlidersHorizontal className="h-4 w-4 text-accent" aria-hidden />{t.filters}</p>
        <fieldset>
          <legend className={legend}>{t.category}</legend>
          <label className={row}><input type="checkbox" className={box} checked={robotics} onChange={(e) => set({ category: e.target.checked ? "robotics" : null })} />{t.roboticsOnly}</label>
        </fieldset>
        <fieldset>
          <legend className={legend}>{t.board}</legend>
          <div className="space-y-1">
            <label className={row}><input type="radio" name="board" className={box} checked={!board} onChange={() => set({ board: null })} />{t.any}</label>
            {BOARDS.map((b) => (
              <label key={b} className={row}><input type="radio" name="board" className={box} checked={board === b} onChange={() => set({ board: b })} />{BOARD_LABEL[b]}</label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className={legend}>{t.difficulty}</legend>
          <div className="space-y-1">
            <label className={row}><input type="radio" name="difficulty" className={box} checked={!diff} onChange={() => set({ difficulty: null })} />{t.any}</label>
            {DIFFICULTIES.map((d) => (
              <label key={d} className={row}><input type="radio" name="difficulty" className={box} checked={diff === d} onChange={() => set({ difficulty: d })} />{c.difficulty[d]}</label>
            ))}
          </div>
        </fieldset>
        <button type="button" onClick={() => set({ board: null, difficulty: null, category: null, q: null })} className="text-left text-xs text-fg-subtle hover:text-fg">{t.reset}</button>
      </aside>
    </div>
  );
}
