"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { Terminal } from "lucide-react";
import { AssistantTerminal, type AssistantContext } from "./assistant-terminal";
import { useMessages } from "@/components/i18n/locale-provider";
import { assistant } from "@/lib/i18n/messages/assistant";

export type { AssistantContext } from "./assistant-terminal";

/** Floating launcher + slide-in terminal panel. Ctrl/⌘ + J toggles, Esc closes. */
export function AssistantDrawer({ context }: { context?: AssistantContext }) {
  const t = useMessages(assistant);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") { e.preventDefault(); setOpen((v) => !v); }
      else if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) { wasOpen.current = true; const id = setTimeout(() => inputRef.current?.focus(), 200); return () => clearTimeout(id); }
    if (wasOpen.current) launcherRef.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <>
      <button ref={launcherRef} type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}
        className={clsx("fixed bottom-24 right-6 z-40 inline-flex h-12 items-center gap-2.5 rounded-2xl border border-signal/30 bg-ink-900/90 pl-3.5 pr-4 font-mono text-sm text-fg shadow-[0_18px_50px_-12px_rgba(46,230,201,.45)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-signal/60 motion-reduce:transition-none lg:bottom-6",
          open && "pointer-events-none translate-y-4 opacity-0")}>
        <Terminal className="h-4 w-4 text-signal" aria-hidden />{t.launcher}
        <kbd className="rounded-md border border-line bg-ink-850 px-1.5 py-0.5 text-[10px] text-fg-subtle">⌘J</kbd>
      </button>

      <div aria-hidden onClick={() => setOpen(false)}
        className={clsx("fixed inset-0 z-40 bg-ink-950/60 backdrop-blur-sm transition-opacity lg:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")} />

      <aside role="dialog" aria-modal="true" aria-label={t.dialogLabel} aria-hidden={!open} inert={!open}
        className={clsx("fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-line shadow-[-30px_0_80px_-20px_rgba(0,0,0,.7)] transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none sm:w-[460px]",
          open ? "translate-x-0" : "pointer-events-none translate-x-full")}>
        <AssistantTerminal context={context} onClose={() => setOpen(false)} inputRef={inputRef} className="h-full" />
      </aside>
    </>
  );
}
