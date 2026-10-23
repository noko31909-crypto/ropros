"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Boxes, CheckCircle2, CircleDashed, PackagePlus, SearchX } from "lucide-react";
import { TagsInput } from "./tags-input";
import { FindButton } from "./find-button";
import { PART_BY_ID, STARTER_KITS } from "@/lib/parts-catalog";
import { matchProjects, type FinderResult, type MatchResult } from "@/lib/finder/match";
import { GUIDE_SLUGS, PROJECTS } from "@/lib/finder/projects-data";
import { useMessages } from "@/components/i18n/locale-provider";
import { finder } from "@/lib/i18n/messages/finder";

/** Long enough for the phase animation to read; matching itself is instant and pure. */
const SEARCH_MS = 1600;

/**
 * Runs the same pure matcher as POST /api/finder, in the browser.
 * When the catalog moves to Supabase, swap this for a fetch to /api/finder.
 */
function findMatches(ids: string[]): FinderResult {
  const names = ids.map((id) => PART_BY_ID.get(id)?.name ?? id);
  return matchProjects(PROJECTS, names);
}

export function ProjectFinder({ initialParts = [] }: { initialParts?: string[] }) {
  const t = useMessages(finder);
  const [parts, setParts] = useState<string[]>(() => initialParts.filter((id) => PART_BY_ID.has(id)));
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<FinderResult | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const run = () => {
    if (!parts.length || loading) return;
    setLoading(true); setResults(null);
    const snapshot = parts;
    timer.current = setTimeout(() => { setResults(findMatches(snapshot)); setLoading(false); }, SEARCH_MS);
  };

  const nothing = results && results.ready.length === 0 && results.close_matches.length === 0;

  return (
    <div className="space-y-10">
      <div className="rounded-3xl border border-line bg-ink-850/60 p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-lg font-semibold text-fg">{t.deskTitle}</h2>
          <span className="font-mono text-xs text-fg-subtle">{t.selected(parts.length)}</span>
        </div>
        <div className="mt-4"><TagsInput value={parts} onChange={setParts} disabled={loading} /></div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-fg-subtle">{t.quickAdd}</span>
          {STARTER_KITS.map((k) => (
            <button key={k.key} type="button" disabled={loading}
              onClick={() => setParts((prev) => Array.from(new Set([...prev, ...k.ids])))}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs text-fg-muted transition-colors hover:border-accent/50 hover:text-fg disabled:opacity-50">
              <PackagePlus className="h-3.5 w-3.5" aria-hidden />{t.kits[k.key]}
            </button>
          ))}
          {parts.length > 0 && <button type="button" disabled={loading} onClick={() => { setParts([]); setResults(null); }} className="ml-auto text-xs text-fg-subtle hover:text-fg">{t.clearAll}</button>}
        </div>
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <FindButton loading={loading} disabled={!parts.length} onClick={run} />
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
          <ResultSection title={t.closeTitle} note={t.closeNote} tone="close" items={results.close_matches} empty={t.closeEmpty} />
          {results.unrecognized.length > 0 && <p className="text-sm text-fg-subtle">{t.unrecognized(results.unrecognized.join(", "))}</p>}
        </div>
      )}
    </div>
  );
}

function ResultSection({ title, note, tone, items, empty }: { title: string; note: string; tone: "ready" | "close"; items: MatchResult[]; empty: string }) {
  const t = useMessages(finder);
  return (
    <section aria-label={title}>
      <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="text-lg font-semibold text-fg">{title}</h2>
        <span className={tone === "ready" ? "rounded-md bg-signal-soft px-2 py-0.5 font-mono text-xs text-signal" : "rounded-md bg-accent-soft px-2 py-0.5 font-mono text-xs text-accent"}>{items.length}</span>
        <span className="text-sm text-fg-subtle">{note}</span>
      </div>
      {items.length === 0 ? <p className="rounded-2xl border border-dashed border-ink-700 p-6 text-sm text-fg-muted">{empty}</p> : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((m, i) => <ResultCard key={m.project_id} m={m} index={i} getLabel={t.get} openLabel={t.openGuide} soonLabel={t.guideSoon} />)}
        </div>
      )}
    </section>
  );
}

function ResultCard({ m, index, getLabel, openLabel, soonLabel }: { m: MatchResult; index: number; getLabel: string; openLabel: string; soonLabel: string }) {
  const pct = Math.round(m.coverage * 100);
  const hasGuide = GUIDE_SLUGS.has(m.project_id);
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-fg group-hover:text-accent">{m.title}</h3>
          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-fg-subtle">{m.microcontroller}</p>
        </div>
        <span className="font-mono text-2xl font-semibold tabular-nums text-accent">{pct}<span className="text-xs text-fg-subtle">%</span></span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-800" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={m.title}>
        <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-4 flex items-start gap-2 text-sm text-fg-muted"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />{m.owned.join(", ")}</p>
      {m.missing.length > 0 && <p className="mt-2 flex items-start gap-2 text-sm text-fg"><CircleDashed className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden /><span><span className="text-fg-subtle">{getLabel}</span> {m.missing.join(", ")}</span></p>}
      <p className="mt-4 inline-flex items-center gap-1 font-mono text-[11px] text-fg-subtle">
        {hasGuide ? <><span className="text-accent">{openLabel}</span><ArrowRight className="h-3 w-3 text-accent transition-transform group-hover:translate-x-0.5" aria-hidden /></> : soonLabel}
      </p>
    </>
  );
  const cls = "group block animate-fade-up rounded-2xl border border-line bg-ink-900 p-5 transition-colors";
  return hasGuide ? (
    <Link href={`/projects/${encodeURIComponent(m.project_id)}`} style={{ animationDelay: `${index * 80}ms` }} className={`${cls} hover:border-accent/40`}>{body}</Link>
  ) : (
    <article style={{ animationDelay: `${index * 80}ms` }} className={cls}>{body}</article>
  );
}
