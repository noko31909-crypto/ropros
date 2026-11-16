"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { ArrowRight, Bookmark, BookmarkCheck, Boxes, CheckCircle2, CircleDashed, Cloud, HardDrive, PackagePlus, SearchX, ShoppingCart } from "lucide-react";
import { TagsInput } from "./tags-input";
import { FindButton } from "./find-button";
import { PART_BY_ID, STARTER_KITS } from "@/lib/parts-catalog";
import type { FinderResult, MatchResult } from "@/lib/finder/match";
import { GUIDE_SLUGS, PROJECT_TITLES, matchPartIds } from "@/lib/finder/projects-data";
import { useLocale, useMessages } from "@/components/i18n/locale-provider";
import { finder } from "@/lib/i18n/messages/finder";
import { common } from "@/lib/i18n/messages/common";
import { workbenchMessages } from "@/lib/i18n/messages/workbench";
import { useWorkbench } from "@/components/workbench/workbench-provider";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/components/ui/toast";
import { useSavedBuilds } from "@/lib/saved";

/** Long enough for the phase animation to read; matching itself is instant and pure. */
const SEARCH_MS = 1600;

/**
 * The desk is the maker's workbench: what they add here is kept (account or device, see WorkbenchProvider).
 * A `?parts=` link shows its own parts instead and leaves the workbench alone until the maker adds them.
 * Runs the same pure matcher as POST /api/finder, in the browser.
 */
export function ProjectFinder({ initialParts = [] }: { initialParts?: string[] }) {
  const t = useMessages(finder);
  const w = useMessages(workbenchMessages);
  const bench = useWorkbench();
  const { openAuth } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const linked = useMemo(() => initialParts.filter((id) => PART_BY_ID.has(id)), [initialParts]);
  const [fromLink, setFromLink] = useState(linked.length > 0);
  const [draft, setDraft] = useState<string[]>(linked);
  const parts = fromLink ? draft : bench.parts;
  const setParts = (next: string[]) => (fromLink ? setDraft(next) : bench.replace(next));
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<FinderResult | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  // A saved workbench shows its builds straight away: matching is instant, the animation is for a search you start.
  const shown = useRef(false);
  useEffect(() => {
    if (fromLink || !bench.ready || shown.current) return;
    shown.current = true;
    if (bench.parts.length) setResults(matchPartIds(bench.parts));
  }, [fromLink, bench.ready, bench.parts]);

  const run = () => {
    if (!parts.length || loading) return;
    setLoading(true); setResults(null);
    const snapshot = parts;
    timer.current = setTimeout(() => { setResults(matchPartIds(snapshot)); setLoading(false); }, SEARCH_MS);
  };

  const leaveLink = (keep: boolean) => {
    if (keep) { bench.add(draft); toast(w.linkAdded); }
    shown.current = false;
    setResults(null);
    setFromLink(false);
    router.replace("/finder", { scroll: false });
  };

  const clearAll = () => {
    setConfirmClear(false);
    setParts([]);
    setResults(null);
  };

  const busy = loading || (!fromLink && !bench.ready);
  const nothing = results && results.ready.length === 0 && results.close_matches.length === 0;

  return (
    <div className="space-y-10">
      <div className="rounded-3xl border border-line bg-ink-850/60 p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-lg font-semibold text-fg">{fromLink ? w.linkTitle : w.title}</h2>
          <span className="font-mono text-xs text-fg-subtle">{t.selected(parts.length)}</span>
        </div>
        {fromLink ? (
          <div className="mt-3 flex flex-col gap-3 rounded-xl border border-accent/30 bg-accent-soft p-3 text-sm sm:flex-row sm:items-center">
            <p className="flex-1 text-fg">{w.linkNote}</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => leaveLink(true)} disabled={!draft.length}
                className="inline-flex h-9 items-center rounded-lg bg-accent px-3 font-semibold text-ink-950 hover:bg-accent-hover disabled:opacity-60">{w.linkAdd}</button>
              <button type="button" onClick={() => leaveLink(false)}
                className="inline-flex h-9 items-center rounded-lg border border-line px-3 text-fg-muted hover:text-fg">{w.linkBack(bench.parts.length)}</button>
            </div>
          </div>
        ) : (
          <p className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-fg-subtle">
            {bench.where === "account" ? (
              <><Cloud className="h-3.5 w-3.5" aria-hidden />{w.savedAccount}</>
            ) : (
              <>
                <HardDrive className="h-3.5 w-3.5" aria-hidden />{w.savedDevice}
                <button type="button" onClick={() => openAuth()} className="font-semibold text-accent hover:text-accent-hover">{w.signInToSync}</button>
              </>
            )}
          </p>
        )}
        <div className="mt-4"><TagsInput value={parts} onChange={setParts} disabled={busy} /></div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-fg-subtle">{t.quickAdd}</span>
          {STARTER_KITS.map((k) => (
            <button key={k.key} type="button" disabled={busy}
              onClick={() => setParts(Array.from(new Set([...parts, ...k.ids])))}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs text-fg-muted transition-colors hover:border-accent/50 hover:text-fg disabled:opacity-50">
              <PackagePlus className="h-3.5 w-3.5" aria-hidden />{t.kits[k.key]}
            </button>
          ))}
          {parts.length > 0 && !confirmClear && (
            <button type="button" disabled={busy} onClick={() => (fromLink ? clearAll() : setConfirmClear(true))} className="ml-auto text-xs text-fg-subtle hover:text-fg">
              {fromLink ? t.clearAll : w.clear}
            </button>
          )}
          {confirmClear && (
            <span role="group" aria-label={w.clear} className="ml-auto inline-flex items-center gap-2 text-xs">
              <span className="text-fg">{w.clearConfirm(parts.length)}</span>
              <button type="button" onClick={clearAll} autoFocus className="h-8 rounded-lg bg-accent px-3 font-semibold text-ink-950 hover:bg-accent-hover">{w.clearYes}</button>
              <button type="button" onClick={() => setConfirmClear(false)} className="h-8 rounded-lg border border-line px-3 text-fg-muted hover:text-fg">{w.cancel}</button>
            </span>
          )}
        </div>
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <FindButton loading={loading} disabled={!parts.length || busy} onClick={run} />
          {!parts.length && <p className="text-sm text-fg-subtle">{t.addOne}</p>}
        </div>
        <p className="mt-6 border-t border-line pt-4 font-mono text-[11px] text-fg-subtle">{t.note}</p>
      </div>

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl border border-line bg-ink-900 motion-reduce:animate-none" style={{ animationDelay: `${i * 120}ms` }} />
          ))}
        </div>
      )}

      {results && nothing && (
        <div className="animate-fade-up rounded-3xl border border-dashed border-ink-700 p-10 text-center">
          <SearchX className="mx-auto h-8 w-8 text-fg-subtle" aria-hidden />
          <h2 className="mt-4 text-lg font-semibold text-fg">{t.emptyTitle}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">{t.emptyBody}</p>
          <Link href="/components" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover">
            <Boxes className="h-4 w-4" aria-hidden />{t.emptyCta}
          </Link>
          {results.unrecognized.length > 0 && <p className="mt-4 text-sm text-fg-subtle">{t.unrecognized(results.unrecognized.join(", "))}</p>}
        </div>
      )}

      {results && !nothing && (
        <div className="space-y-12">
          <ResultSection title={t.readyTitle} note={t.readyNote} tone="ready" items={results.ready} empty={t.readyEmpty} />
          <ResultSection title={t.closeTitle} note={t.closeNote} tone="close" items={results.close_matches} empty={t.closeEmpty}
            hint={<><ShoppingCart className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden /><span>{t.closeHint} <Link href="/shopping" className="font-semibold text-accent hover:text-accent-hover">{w.shoppingList}</Link></span></>} />
          {results.unrecognized.length > 0 && <p className="text-sm text-fg-subtle">{t.unrecognized(results.unrecognized.join(", "))}</p>}
        </div>
      )}
    </div>
  );
}

function ResultSection({ title, note, tone, items, empty, hint }: { title: string; note: string; tone: "ready" | "close"; items: MatchResult[]; empty: string; hint?: React.ReactNode }) {
  return (
    <section aria-label={title}>
      <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="text-lg font-semibold text-fg">{title}</h2>
        <span className={tone === "ready" ? "rounded-md bg-signal-soft px-2 py-0.5 font-mono text-xs text-signal" : "rounded-md bg-accent-soft px-2 py-0.5 font-mono text-xs text-accent"}>{items.length}</span>
        <span className="text-sm text-fg-subtle">{note}</span>
      </div>
      {hint && items.length > 0 && <p className="-mt-2 mb-5 flex items-start gap-2 text-sm text-fg-muted">{hint}</p>}
      {items.length === 0 ? <p className="rounded-2xl border border-dashed border-ink-700 p-6 text-sm text-fg-muted">{empty}</p> : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((m, i) => <ResultCard key={m.project_id} m={m} index={i} />)}
        </div>
      )}
    </section>
  );
}

function ResultCard({ m, index }: { m: MatchResult; index: number }) {
  const t = useMessages(finder);
  const c = useMessages(common);
  const { locale } = useLocale();
  const toast = useToast();
  const { isSaved, toggle } = useSavedBuilds();
  const title = PROJECT_TITLES.get(m.project_id)?.[locale] ?? m.title;
  const pct = Math.round(m.coverage * 100);
  const hasGuide = GUIDE_SLUGS.has(m.project_id);
  const saved = isSaved(m.project_id);
  const save = () => { if (toggle(m.project_id)) toast(m.missing.length ? t.savedShopping : c.nav.savedToast); };
  return (
    <article style={{ animationDelay: `${index * 80}ms` }}
      className={clsx("group relative animate-fade-up rounded-2xl border border-line bg-ink-900 p-5 transition-colors", hasGuide && "hover:border-accent/40")}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-fg group-hover:text-accent">
            {/* The title link covers the whole card; the save button sits above it. */}
            {hasGuide ? (
              <Link href={`/projects/${encodeURIComponent(m.project_id)}`}
                className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent">{title}</Link>
            ) : title}
          </h3>
          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-fg-subtle">{m.microcontroller}</p>
        </div>
        <span className="font-mono text-2xl font-semibold tabular-nums text-accent">{pct}<span className="text-xs text-fg-subtle">%</span></span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-800" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={title}>
        <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-4 flex items-start gap-2 text-sm text-fg-muted"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />{m.owned.join(", ")}</p>
      {m.missing.length > 0 && <p className="mt-2 flex items-start gap-2 text-sm text-fg"><CircleDashed className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden /><span><span className="text-fg-subtle">{t.get}</span> {m.missing.join(", ")}</span></p>}
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="inline-flex items-center gap-1 font-mono text-[11px] text-fg-subtle">
          {hasGuide ? <><span className="text-accent">{t.openGuide}</span><ArrowRight className="h-3 w-3 text-accent transition-transform group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" aria-hidden /></> : t.guideSoon}
        </p>
        {hasGuide && (
          <button type="button" onClick={save} aria-pressed={saved} aria-label={saved ? t.unsaveAria(title) : t.saveAria(title)}
            className={clsx("relative z-10 inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-colors",
              saved ? "border-accent/50 bg-accent-soft text-accent" : "border-line text-fg-muted hover:border-accent/40 hover:text-fg")}>
            {saved ? <BookmarkCheck className="h-4 w-4" aria-hidden /> : <Bookmark className="h-4 w-4" aria-hidden />}{saved ? t.saved : t.save}
          </button>
        )}
      </div>
    </article>
  );
}
