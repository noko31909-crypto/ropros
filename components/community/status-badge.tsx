import { clsx } from "clsx";

export type BuildStatus = "working" | "debugging";

/** "100% Working" (teal, live) or "Debugging code…" (orange, pulsing) pill. */
export function StatusBadge({ status, label, className }: { status: BuildStatus; label: string; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium backdrop-blur-md",
      status === "working" ? "border-signal/40 bg-ink-950/70 text-signal" : "border-accent/40 bg-ink-950/70 text-accent-hover", className)}>
      <span className={clsx("h-1.5 w-1.5 rounded-full", status === "working" ? "bg-signal" : "animate-pulse bg-accent motion-reduce:animate-none")} />
      {label}
    </span>
  );
}
