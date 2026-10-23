"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { Check, CheckCircle2, Terminal, X } from "lucide-react";
import type { Simulation } from "@/lib/guides";
import { guideMessages } from "@/lib/i18n/messages/guide";
import { useMessages } from "@/components/i18n/locale-provider";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/components/ui/toast";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";

type Status = "not_started" | "in_progress" | "simulated" | "completed";
const RANK: Record<Status, number> = { not_started: 0, in_progress: 1, simulated: 2, completed: 3 };
const isStatus = (v: unknown): v is Status => typeof v === "string" && v in RANK;
type ProgressResponse = { progress?: { status?: unknown; xp?: unknown; level?: unknown } };

const prefersReducedMotion = () => {
  try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch { return false; }
};

/**
 * Build status + "Run simulation" / "Mark as built". Progress and XP are written only by the DB
 * (POST /api/progress → record_progress RPC); the client only displays what comes back.
 */
export function ProgressActions({ projectId, simulation }: { projectId: string | null; simulation: Simulation }) {
  const t = useMessages(guideMessages);
  const p = t.progress;
  const { ready, userId, profile, openAuth, applyProgress } = useAuth();
  const toast = useToast();
  const [status, setStatus] = useState<Status>("not_started");
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState<"simulate" | "complete" | null>(null);
  const [error, setError] = useState("");
  const [sim, setSim] = useState<{ open: boolean; lines: number; running: boolean }>({ open: false, lines: 0, running: false });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Load the signed-in user's saved status (RLS limits user_progress to its owner).
  useEffect(() => {
    if (!ready) return;
    if (!userId || !projectId) { setStatus("not_started"); return; }
    let cancelled = false;
    setLoading(true);
    void (async () => {
      try {
        const { data } = await getSupabaseBrowserClient().from("user_progress").select("status")
          .eq("user_id", userId).eq("project_id", projectId).maybeSingle<{ status: string }>();
        if (!cancelled) setStatus(isStatus(data?.status) ? data.status : "not_started");
      } catch { /* leave as not_started */ }
      finally { if (!cancelled) setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, [ready, userId, projectId]);

  useEffect(() => () => { timers.current.forEach(clearTimeout); }, []);

  async function send(action: "simulate" | "complete"): Promise<boolean> {
    if (!projectId) return false;
    const prevXp = profile?.xp ?? null;
    setError("");
    try {
      const res = await fetch("/api/progress", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ projectId, action }) });
      if (res.status === 401) { openAuth(p.needAuth); return false; }
      if (res.status === 429) { setError(p.rateLimited); return false; }
      if (!res.ok) { setError(p.error); return false; }
      const body = (await res.json()) as ProgressResponse;
      const pr = body.progress;
      if (pr && isStatus(pr.status)) setStatus((s) => (RANK[pr.status as Status] > RANK[s] ? (pr.status as Status) : s));
      if (pr && typeof pr.xp === "number" && typeof pr.level === "number") {
        const gained = prevXp === null ? 0 : pr.xp - prevXp;
        applyProgress(pr.xp, pr.level);
        toast(gained > 0 ? p.xpGained(gained) : p.savedNoXp);
      } else toast(p.savedNoXp);
      return true;
    } catch { setError(p.network); return false; }
  }

  async function runSimulation() {
    if (!projectId) return;
    if (!userId) { openAuth(p.needAuth); return; }
    timers.current.forEach(clearTimeout); timers.current = [];
    const total = simulation.lines.length;
    setBusy("simulate");
    if (prefersReducedMotion()) {
      setSim({ open: true, lines: total, running: false });
    } else {
      setSim({ open: true, lines: 0, running: true });
      for (let i = 1; i <= total; i++) timers.current.push(setTimeout(() => setSim((s) => ({ ...s, lines: i, running: i < total })), i * 260));
    }
    const minDuration = new Promise((r) => setTimeout(r, prefersReducedMotion() ? 0 : total * 260));
    await Promise.all([send("simulate"), minDuration]);
    setSim((s) => ({ ...s, lines: total, running: false }));
    setBusy(null);
  }

  async function markBuilt() {
    if (!projectId || status === "completed") return;
    if (!userId) { openAuth(p.needAuth); return; }
    setBusy("complete");
    await send("complete");
    setBusy(null);
  }

  const simulated = RANK[status] >= RANK.simulated;
  const completed = status === "completed";
  const statusText = !projectId ? p.noProject
    : !userId ? p.signInHint
    : loading ? p.loading
    : completed ? p.completed : simulated ? p.simulated : status === "in_progress" ? p.inProgress : p.notStarted;

  return (
    <div className="mb-8 space-y-4">
      <div className="grid grid-cols-2 gap-3 rounded-2xl border border-line bg-ink-900 p-4 sm:flex sm:flex-row sm:items-center sm:gap-4 sm:p-5">
        <div className="col-span-2 flex-1">
          <p className="font-semibold text-fg">{p.status}</p>
          <p className="mt-0.5 text-sm text-fg-muted" aria-live="polite">{statusText}{error && <span className="ml-1 text-rose-300">{error}</span>}</p>
        </div>
        <button type="button" onClick={runSimulation} disabled={!projectId || busy !== null}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-signal/40 bg-signal-soft px-4 text-sm font-semibold text-signal transition-colors hover:border-signal/70 disabled:opacity-60">
          {busy === "simulate"
            ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-signal/30 border-t-signal motion-reduce:animate-none" aria-hidden />{p.simulating}</>
            : <><Terminal className="h-4 w-4" aria-hidden />{simulated ? p.simDone : p.runSim}</>}
        </button>
        <button type="button" onClick={markBuilt} disabled={!projectId || busy !== null} aria-pressed={completed}
          className={clsx("inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors disabled:opacity-60",
            completed ? "border border-emerald-400/40 bg-emerald-400/10 text-emerald-300 disabled:opacity-100" : "bg-accent text-ink-950 shadow-glow hover:bg-accent-hover")}>
          {completed ? <CheckCircle2 className="h-4 w-4" aria-hidden /> : <Check className="h-4 w-4" aria-hidden />}
          {busy === "complete" ? p.saving : completed ? p.done : p.markDone}
        </button>
      </div>

      {sim.open && (
        <SimulatorPanel simulation={simulation} lines={sim.lines} running={sim.running} onClose={() => { timers.current.forEach(clearTimeout); setSim({ open: false, lines: 0, running: false }); }} />
      )}
    </div>
  );
}

function SimulatorPanel({ simulation, lines, running, onClose }: { simulation: Simulation; lines: number; running: boolean; onClose: () => void }) {
  const t = useMessages(guideMessages).sim;
  const logRef = useRef<HTMLDivElement>(null);
  useEffect(() => { const el = logRef.current; if (el) el.scrollTop = el.scrollHeight; }, [lines]);

  return (
    <section aria-label={t.title} className="animate-fade-up overflow-hidden rounded-2xl border border-signal/25 bg-[#06090d] motion-reduce:animate-none">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-ink-900 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className={clsx("h-2 w-2 rounded-full", running ? "animate-pulse bg-signal motion-reduce:animate-none" : "bg-signal/60")} aria-hidden />
          <span className="font-mono text-xs text-fg">{t.title}</span>
          <span className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle">{t.baud(simulation.baud)}</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-signal">{running ? t.running : t.finished}</span>
        </div>
        <button type="button" onClick={onClose} aria-label={t.close} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-muted hover:bg-ink-800 hover:text-fg">
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <div className="grid gap-0 sm:grid-cols-[1fr_180px]">
        <div ref={logRef} role="log" aria-live="polite" className="h-56 overflow-auto px-4 py-3 font-mono text-[12px] leading-6 text-[#d5dee8]">
          {simulation.lines.slice(0, lines).map((l, i) => (
            <p key={i} className="whitespace-pre-wrap"><span className="select-none text-ink-700">{String(i * 260).padStart(5, "0")}ms </span>{l.startsWith("OK") ? <span className="text-signal">{l}</span> : l}</p>
          ))}
          {running && <span className="inline-block h-4 w-2 animate-pulse bg-signal/80 align-middle motion-reduce:animate-none" aria-hidden />}
        </div>
        <div className="border-t border-line p-4 sm:border-l sm:border-t-0">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle">{t.leds}</p>
          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-2">
            {simulation.leds.map((led, i) => {
              const on = running ? true : lines > 0 && i === 0;
              return (
                <li key={led.label} className="flex flex-col items-center gap-1.5">
                  <span className={clsx("h-3.5 w-3.5 rounded-full", running && i > 0 && "animate-pulse motion-reduce:animate-none")}
                    style={{ background: led.color, opacity: on || !running ? 1 : 0.25, boxShadow: on ? `0 0 12px ${led.color}` : "none", animationDelay: `${i * 170}ms`, animationDuration: `${700 + i * 230}ms` }} aria-hidden />
                  <span className="font-mono text-[10px] text-fg-muted">{led.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
