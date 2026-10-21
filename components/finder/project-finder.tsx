"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, CircleDashed, PackagePlus } from "lucide-react";
import { TagsInput } from "./tags-input";
import { FindButton } from "./find-button";
import { PARTS, STARTER_KITS } from "@/lib/parts-catalog";

export type Match = { project_id: string; title: string; microcontroller: string; owned: string[]; missing: string[]; coverage: number };
type FinderResponse = { ready: Match[]; close_matches: Match[]; meta: { unrecognized_parts: string[] } };

/** Calls POST /api/finder. Part ids from the picker resolve server-side via the same alias table. */
async function findMatches(ids: string[], signal?: AbortSignal): Promise<FinderResponse> {
  const names = ids.map((id) => PARTS.find((p) => p.id === id)?.name ?? id);
  const res = await fetch("/api/finder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ parts: names }),
    signal,
  });
  if (res.status === 429) throw new Error("Too many searches. Wait a moment and try again.");
  if (!res.ok) throw new Error("The finder couldn’t process that list. Try again.");
  return (await res.json()) as FinderResponse;
}

export function ProjectFinder() {
  const [parts, setParts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<FinderResponse | null>(null);
  const [error, setError] = useState("");

  const run = async () => {
    if (!parts.length || loading) return;
    setLoading(true); setResults(null); setError("");
    try { setResults(await findMatches(parts)); }
    catch (e) { setError(e instanceof Error ? e.message : "Something went wrong."); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-10">
      <div className="rounded-3xl border border-line bg-ink-850/60 p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-lg font-semibold text-fg">What’s on your desk?</h2>
          <span className="font-mono text-xs text-fg-subtle">{parts.length} part{parts.length === 1 ? "" : "s"} selected</span>
        </div>
        <div className="mt-4"><TagsInput value={parts} onChange={setParts} disabled={loading} /></div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-fg-subtle">Quick add:</span>
          {STARTER_KITS.map((k) => (
            <button key={k.label} type="button" disabled={loading}
              onClick={() => setParts((prev) => Array.from(new Set([...prev, ...k.ids])))}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs text-fg-muted transition-colors hover:border-accent/50 hover:text-fg disabled:opacity-50">
              <PackagePlus className="h-3.5 w-3.5" aria-hidden />{k.label}
            </button>
          ))}
          {parts.length > 0 && <button type="button" disabled={loading} onClick={() => setParts([])} className="ml-auto text-xs text-fg-subtle hover:text-fg">Clear all</button>}
        </div>
        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <FindButton loading={loading} disabled={!parts.length} onClick={run} />
          {!parts.length && <p className="text-sm text-fg-subtle">Add at least one part to search.</p>}
        </div>
      </div>

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl border border-line bg-ink-900" style={{ animationDelay: `${i * 120}ms` }} />
          ))}
        </div>
      )}

      {error && <p role="alert" className="rounded-xl border border-rose-400/30 bg-rose-400/[0.06] px-4 py-3 text-sm text-rose-200">{error}</p>}

      {results && (
        <div className="space-y-12">
          <ResultSection title="Ready to build" note="You own every required part." tone="ready" items={results.ready}
            empty="Nothing complete yet. Check the close matches below." />
          <ResultSection title="Close matches" note="Missing 1–2 small parts. Never a board or chassis." tone="close" items={results.close_matches}
            empty="No close matches. Try adding a board or a sensor." />
          {results.meta.unrecognized_parts.length > 0 && (
            <p className="text-sm text-fg-subtle">Not in the library, so not matched: {results.meta.unrecognized_parts.join(", ")}</p>
          )}
        </div>
      )}
    </div>
  );
}

function ResultSection({ title, note, tone, items, empty }: { title: string; note: string; tone: "ready" | "close"; items: Match[]; empty: string }) {
  return (
    <section aria-label={title}>
      <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="text-lg font-semibold text-fg">{title}</h2>
        <span className={tone === "ready" ? "rounded-md bg-signal-soft px-2 py-0.5 font-mono text-xs text-signal" : "rounded-md bg-amber-400/10 px-2 py-0.5 font-mono text-xs text-amber-300"}>{items.length}</span>
        <span className="text-sm text-fg-subtle">{note}</span>
      </div>
      {items.length === 0 ? <p className="rounded-2xl border border-dashed border-ink-700 p-6 text-sm text-fg-muted">{empty}</p> : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((m, i) => {
            const pct = Math.round(m.coverage * 100);
            return (
              <Link key={m.project_id} href={`/projects/${encodeURIComponent(m.project_id)}`} style={{ animationDelay: `${i * 80}ms` }}
                className="group animate-fade-up rounded-2xl border border-line bg-ink-900 p-5 transition-colors hover:border-accent/40">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-fg group-hover:text-accent">{m.title}</h3>
                    <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-fg-subtle">{m.microcontroller}</p>
                  </div>
                  <span className="font-mono text-2xl font-semibold tabular-nums text-accent">{pct}<span className="text-xs text-fg-subtle">%</span></span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-800"><div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} /></div>
                <p className="mt-4 flex items-start gap-2 text-sm text-fg-muted"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden />{m.owned.join(", ")}</p>
                {m.missing.length > 0 && <p className="mt-2 flex items-start gap-2 text-sm text-amber-200/90"><CircleDashed className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden />Get: {m.missing.join(", ")}</p>}
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
