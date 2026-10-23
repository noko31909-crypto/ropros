"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { clsx } from "clsx";
import { AlertTriangle, CircuitBoard, Code2, LayoutList, ListChecks, Package, Rows3 } from "lucide-react";
import type { LocalizedGuide } from "@/lib/guides";
import { guideMessages } from "@/lib/i18n/messages/guide";
import { useMessages } from "@/components/i18n/locale-provider";
import { PartsTable } from "./parts-table";
import { DiagramSlot } from "./diagram-slot";
import { StepChecklist } from "./step-checklist";
import { CodeBlock } from "./code-block";
import { Troubleshooting } from "./troubleshooting";

type TabId = "parts" | "wiring" | "steps" | "code" | "troubleshooting";

/** Parts · Wiring diagram · Steps · Code · Troubleshooting. `diagram` is a server-rendered SVG; `progress` sits above the steps. */
export function GuideTabs({ guide, diagram, progress }: { guide: LocalizedGuide; diagram: ReactNode; progress: ReactNode }) {
  const t = useMessages(guideMessages).tabs;
  const tabs: { id: TabId; label: string; icon: typeof Package; badge?: number; content: ReactNode }[] = [
    { id: "parts", label: t.parts, icon: Package, badge: guide.parts.length, content: <PartsTable parts={guide.parts} /> },
    { id: "wiring", label: t.wiring, icon: CircuitBoard, content: <DiagramSlot verification={guide.verification} wires={guide.wires}>{diagram}</DiagramSlot> },
    { id: "steps", label: t.steps, icon: ListChecks, badge: guide.steps.length, content: <>{progress}<StepChecklist slug={guide.slug} steps={guide.steps} /></> },
    { id: "code", label: t.code, icon: Code2, content: <CodeBlock files={guide.code} /> },
    { id: "troubleshooting", label: t.troubleshooting, icon: AlertTriangle, content: <Troubleshooting issues={guide.troubleshooting} safety={guide.safety} /> },
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
    const tab = tabs[next];
    if (tab) { setActive(tab.id); refs.current[next]?.focus(); }
  };

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-5 border-b border-line bg-ink-950/85 px-5 backdrop-blur-xl sm:-mx-8 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          {!stacked ? (
            <div role="tablist" aria-label={t.label} className="-mb-px flex gap-1 overflow-x-auto [scrollbar-width:none]">
              {tabs.map((tab, i) => {
                const on = tab.id === active;
                return (
                  <button key={tab.id} ref={(el) => { refs.current[i] = el; }} type="button" role="tab" id={`tab-${tab.id}`} aria-selected={on} aria-controls={`panel-${tab.id}`}
                    tabIndex={on ? 0 : -1} onClick={() => setActive(tab.id)} onKeyDown={(e) => onKey(e, i)}
                    className={clsx("inline-flex h-14 shrink-0 items-center gap-2 border-b-2 px-3 text-sm font-semibold transition-colors",
                      on ? "border-accent text-fg" : tab.id === "troubleshooting" ? "border-transparent text-amber-300/80 hover:text-amber-200" : "border-transparent text-fg-muted hover:text-fg")}>
                    <tab.icon className="h-4 w-4" aria-hidden />{tab.label}
                    {tab.badge !== undefined && <span className={clsx("rounded-md px-1.5 py-0.5 font-mono text-[10px]", on ? "bg-accent text-ink-950" : "bg-ink-800 text-fg-muted")}>{tab.badge}</span>}
                  </button>
                );
              })}
            </div>
          ) : <p className="flex h-14 items-center text-sm font-semibold text-fg">{t.all}</p>}
          <button type="button" onClick={() => setStacked((v) => !v)} aria-pressed={stacked}
            className="hidden h-9 shrink-0 items-center gap-2 rounded-lg border border-line px-3 text-xs font-semibold text-fg-muted hover:text-fg sm:inline-flex">
            {stacked ? <LayoutList className="h-4 w-4" aria-hidden /> : <Rows3 className="h-4 w-4" aria-hidden />}{stacked ? t.tabbed : t.showAll}
          </button>
        </div>
      </div>

      {stacked ? (
        <div className="space-y-14 py-10">
          {tabs.map((tab) => (
            <section key={tab.id} aria-labelledby={`h-${tab.id}`}>
              <h2 id={`h-${tab.id}`} className="mb-5 flex items-center gap-2.5 text-xl font-semibold text-fg"><tab.icon className="h-5 w-5 text-accent" aria-hidden />{tab.label}</h2>
              {tab.content}
            </section>
          ))}
        </div>
      ) : (
        tabs.map((tab) => (
          <div key={tab.id} role="tabpanel" id={`panel-${tab.id}`} aria-labelledby={`tab-${tab.id}`} hidden={tab.id !== active} tabIndex={0} className="py-10 focus:outline-none">
            {tab.content}
          </div>
        ))
      )}
    </div>
  );
}
