"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { ArrowRight, Sparkles } from "lucide-react";

const PHASES = ["Reading your parts…", "Checking voltages…", "Matching 166 builds…", "Ranking results…"];

/** Animated call-to-action: glow + light sweep at rest, scanning bar and cycling status while loading. */
export function FindButton({ loading, disabled, onClick }: { loading: boolean; disabled?: boolean; onClick: () => void }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!loading) { setPhase(0); return; }
    const t = setInterval(() => setPhase((p) => (p + 1) % PHASES.length), 900);
    return () => clearInterval(t);
  }, [loading]);

  const inert = disabled || loading;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={inert}
      aria-busy={loading}
      className={clsx(
        "group relative isolate inline-flex h-14 min-w-[17rem] items-center justify-center gap-3 overflow-hidden rounded-2xl px-7 text-base font-semibold transition-all duration-300",
        disabled && !loading
          ? "cursor-not-allowed bg-ink-800 text-fg-subtle"
          : "bg-accent text-ink-950 shadow-[0_0_0_1px_rgba(255,122,26,.5),0_18px_50px_-12px_rgba(255,122,26,.7)] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(255,148,70,.8),0_24px_60px_-10px_rgba(255,122,26,.85)] active:translate-y-0 motion-reduce:hover:translate-y-0",
        loading && "cursor-wait",
      )}
    >
      {/* light sweep (idle only) */}
      {!inert && <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/45 to-transparent motion-reduce:hidden" />}
      {/* animated border gradient while loading */}
      {loading && (
        <>
          <span aria-hidden className="absolute inset-0 -z-20 bg-[conic-gradient(from_0deg,#ff7a1a,#ffb37a,#2ee6c9,#ff7a1a)] opacity-90" />
          <span aria-hidden className="absolute inset-[2px] -z-10 rounded-[14px] bg-ink-900" />
          <span aria-hidden className="absolute inset-x-[2px] bottom-[2px] h-[3px] overflow-hidden rounded-b-[14px]">
            <span className="block h-full w-1/4 animate-scan bg-gradient-to-r from-transparent via-accent to-transparent" />
          </span>
        </>
      )}

      {loading ? (
        <>
          <span aria-hidden className="relative inline-flex h-5 w-5">
            <span className="absolute inset-0 animate-spin rounded-full border-2 border-accent/25 border-t-accent motion-reduce:animate-none" />
            <span className="absolute inset-[6px] animate-pulse rounded-full bg-signal" />
          </span>
          <span key={phase} className="animate-fade-up text-fg">{PHASES[phase]}</span>
        </>
      ) : (
        <>
          <Sparkles className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" aria-hidden />
          Find Matching Projects
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </>
      )}
      <span className="sr-only" aria-live="polite">{loading ? "Searching for matching projects" : ""}</span>
    </button>
  );
}
