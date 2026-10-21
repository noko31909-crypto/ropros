"use client";

import { useState } from "react";
import { CheckCircle2, Terminal } from "lucide-react";

type Status = "not_started" | "in_progress" | "simulated" | "completed";
const rank: Record<Status, number> = { not_started: 0, in_progress: 1, simulated: 2, completed: 3 };

/** "Run Simulator" and "Mark as Completed" buttons wired to POST /api/progress. */
export function ProgressActions({ projectId, initial = "not_started" }: { projectId: string; initial?: Status }) {
  const [status, setStatus] = useState<Status>(initial);
  const [busy, setBusy] = useState<"simulate" | "complete" | null>(null);
  const [message, setMessage] = useState("");

  async function send(action: "simulate" | "complete") {
    setBusy(action); setMessage("");
    try {
      const res = await fetch("/api/progress", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ projectId, action }) });
      if (res.status === 401) { setMessage("Sign in to save your progress."); return; }
      if (!res.ok) { setMessage("Couldn’t save. Try again."); return; }
      const { progress } = (await res.json()) as { progress: { status: Status; xp: number; level: number } };
      setStatus(progress.status);
      setMessage(`Saved · ${progress.xp} XP · Level ${progress.level}`);
    } catch { setMessage("Network error. Try again."); }
    finally { setBusy(null); }
  }

  const simulated = rank[status] >= rank.simulated, completed = status === "completed";
  return (
    <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-line bg-ink-900 p-5 sm:flex-row sm:items-center">
      <p className="flex-1 text-sm text-fg-muted" aria-live="polite">{message || (completed ? "Completed and saved to your profile." : "Track this build in your profile.")}</p>
      <button type="button" onClick={() => send("simulate")} disabled={busy !== null}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-signal/40 bg-signal-soft px-4 text-sm font-semibold text-signal hover:border-signal/70 disabled:opacity-60">
        <Terminal className="h-4 w-4" aria-hidden />{busy === "simulate" ? "Simulating…" : simulated ? "Simulation ✓" : "Run Simulator"}
      </button>
      <button type="button" onClick={() => send("complete")} disabled={busy !== null || completed} aria-pressed={completed}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-ink-950 shadow-glow hover:bg-accent-hover disabled:opacity-70">
        <CheckCircle2 className="h-4 w-4" aria-hidden />{busy === "complete" ? "Saving…" : completed ? "Completed" : "Mark as Completed"}
      </button>
    </div>
  );
}
