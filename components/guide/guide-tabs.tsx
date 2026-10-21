"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { clsx } from "clsx";
import { AlertTriangle, CircuitBoard, Code2, LayoutList, ListChecks, Rows3, Package } from "lucide-react";
import type { Guide } from "@/lib/guides";
import { PartsTable } from "./parts-table";
import { DiagramSlot } from "./diagram-slot";
import { StepChecklist } from "./step-checklist";
import { CodeBlock } from "./code-block";
import { Troubleshooting } from "./troubleshooting";

type TabId = "parts" | "wiring" | "steps" | "code" | "troubleshooting";

export function GuideTabs({ guide }: { guide: Guide }) {
  const tabs: { id: TabId; label: string; icon: typeof Package; badge?: string; content: ReactNode }[] = [
    { id: "parts", label: "Parts", icon: Package, badge: String(guide.parts.length), content: <PartsTable parts={guide.parts} /> },
    { id: "wiring", label: "Wiring", icon: CircuitBoard, content: <DiagramSlot title={guide.title} verification={guide.verification} /> },
    { id: "steps", label: "Steps", icon: ListChecks, badge: String(guide.steps.length), content: <StepChecklist slug={guide.slug} steps={guide.steps} /> },
    { id: "code", label: "Code", icon: Code2, content: <div className="space-y-6">{guide.code.map((f) => <CodeBlock key={f.filename} file={f} />)}</div> },
    { id: "troubleshooting", label: "Troubleshooting", icon: AlertTriangle, content: <Troubleshooting issues={guide.troubleshooting} safety={guide.safety} /> },
  ];
  const [active, setActive] = useState<TabId>("parts");
  const [stacked, setStacked] = useState(false);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow-key navigation per the WAI-ARIA tabs pattern
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = tabs.length;
    const next = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    const t = tabs[next];
    if (t) { setActive(t.id); refs.current[next]?.focus(); }
  };

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-5 border-b border-line bg-ink-950/85 px-5 backdrop-blur-xl sm:-mx-8 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          {!stacked ? (
            <div role="tablist" aria-label="Guide sections" className="-mb-px flex gap-1 overflow-x-auto [scrollbar-width:none]">
              {tabs.map((t, i) => {
                const on = t.id === active;
                return (
                  <button key={t.id} ref={(el) => { refs.current[i] = el; }} role="tab" id={`tab-${t.id}`} aria-selected={on} aria-controls={`panel-${t.id}`}
                    tabIndex={on ? 0 : -1} onClick={() => setActive(t.id)} onKeyDown={(e) => onKey(e, i)}
                    className={clsx("inline-flex h-14 shrink-0 items-center gap-2 border-b-2 px-3 text-sm font-semibold transition-colors",
                      on ? "border-accent text-fg" : "border-transparent text-fg-muted hover:text-fg",
                      t.id === "troubleshooting" && !on && "text-amber-300/80 hover:text-amber-200")}>
                    <t.icon className="h-4 w-4" aria-hidden />{t.label}
                    {t.badge && <span className={clsx("rounded-md px-1.5 py-0.5 font-mono text-[10px]", on ? "bg-accent text-ink-950" : "bg-ink-800 text-fg-muted")}>{t.badge}</span>}
                  </button>
                );
              })}
            </div>
          ) : <p className="flex h-14 items-center text-sm font-semibold text-fg">All sections</p>}
          <button type="button" onClick={() => setStacked((v) => !v)} aria-pressed={stacked}
            className="hidden h-9 shrink-0 items-center gap-2 rounded-lg border border-line px-3 text-xs font-semibold text-fg-muted hover:text-fg sm:inline-flex">
            {stacked ? <LayoutList className="h-4 w-4" aria-hidden /> : <Rows3 className="h-4 w-4" aria-hidden />}{stacked ? "Tabbed view" : "Show all"}
          </button>
        </div>
      </div>

      {stacked ? (
        <div className="space-y-14 py-10">
          {tabs.map((t) => (
            <section key={t.id} aria-labelledby={`h-${t.id}`}>
              <h2 id={`h-${t.id}`} className="mb-5 flex items-center gap-2.5 text-xl font-semibold text-fg"><t.icon className="h-5 w-5 text-accent" aria-hidden />{t.label}</h2>
              {t.content}
            </section>
          ))}
        </div>
      ) : (
        tabs.map((t) => (
          <div key={t.id} role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`} hidden={t.id !== active} tabIndex={0} className="py-10 focus:outline-none">
            {t.content}
          </div>
        ))
      )}
    </div>
  );
}
