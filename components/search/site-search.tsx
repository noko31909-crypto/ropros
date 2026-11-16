"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { clsx } from "clsx";
import { BookOpen, Boxes, CornerDownLeft, FileText, Search, X } from "lucide-react";
import type { SearchHit, SearchPage } from "@/lib/search";
import { useLocale, useMessages } from "@/components/i18n/locale-provider";
import { common } from "@/lib/i18n/messages/common";
import { components as componentsMsgs } from "@/lib/i18n/messages/components";
import { legalMessages } from "@/lib/i18n/messages/legal";
import { searchMessages } from "@/lib/i18n/messages/search";

type SearchModule = typeof import("@/lib/search");
const KIND_ICON = { guide: BookOpen, part: Boxes, page: FileText } as const;

/**
 * Header search button plus the Ctrl+K / ⌘K palette ("/" opens it too when you are not typing).
 * The index (every guide in three languages, every part) loads on first open, so pages stay light.
 * The dialog is portalled to <body>: the header's backdrop blur would otherwise trap a fixed overlay inside it.
 */
export function SiteSearch() {
  const t = useMessages(searchMessages);
  const c = useMessages(common);
  const legal = useMessages(legalMessages);
  const cats = useMessages(componentsMsgs).categories;
  const { locale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [mod, setMod] = useState<SearchModule | null>(null);
  const [shortcut, setShortcut] = useState("Ctrl K");
  const inputRef = useRef<HTMLInputElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const listId = useId();

  const pages = useMemo<SearchPage[]>(() => [
    { href: "/finder", title: c.nav.finder, note: c.nav.finderDesc },
    { href: "/shopping", title: c.nav.shopping, note: c.nav.shoppingDesc },
    { href: "/serial", title: c.nav.serial, note: c.nav.serialDesc },
    { href: "/projects", title: c.nav.hub, note: c.nav.allBuildsDesc },
    { href: "/projects?category=robotics", title: c.nav.robotics, note: c.nav.roboticsDesc },
    { href: "/components", title: c.nav.components },
    { href: "/community", title: c.nav.community },
    { href: "/profile", title: c.auth.profile },
    { href: "/privacy", title: legal.privacy },
    { href: "/terms", title: legal.terms },
  ], [c, legal]);

  const show = useCallback(() => {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpen(true);
  }, []);
  const hide = useCallback((restoreFocus = true) => {
    setOpen(false);
    setQuery("");
    setActive(0);
    if (restoreFocus) opener.current?.focus();
  }, []);

  useEffect(() => { if (/Mac|iPhone|iPad/.test(navigator.platform)) setShortcut("⌘K"); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey) {
        e.preventDefault();
        if (open) hide(); else show();
        return;
      }
      if (e.key === "/" && !open && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const el = e.target instanceof HTMLElement ? e.target : null;
        if (el && (el.isContentEditable || /^(input|textarea|select)$/i.test(el.tagName))) return;
        e.preventDefault();
        show();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, show, hide]);

  // A link inside the palette navigated: close without moving focus back to the old page.
  useEffect(() => { setOpen(false); setQuery(""); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!mod) void import("@/lib/search").then(setMod);
    return () => { document.body.style.overflow = prev; };
  }, [open, mod]);

  const hits: SearchHit[] = useMemo(() => (mod ? mod.searchSite(query, locale, pages) : []), [mod, query, locale, pages]);
  const go = (hit: SearchHit | undefined) => {
    if (!hit) return;
    hide(false);
    router.push(hit.href);
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (hits.length ? (a + 1) % hits.length : 0)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (hits.length ? (a - 1 + hits.length) % hits.length : 0)); }
    else if (e.key === "Enter") { e.preventDefault(); go(hits[active]); }
    else if (e.key === "Escape") { e.preventDefault(); hide(); }
    else if (e.key === "Tab") e.preventDefault();   // focus stays in the dialog; Esc closes it
  };

  const groups = (["guide", "part", "page"] as const)
    .map((kind) => ({ kind, items: hits.map((h, i) => ({ h, i })).filter(({ h }) => h.kind === kind) }))
    .filter((g) => g.items.length);
  const trimmed = query.trim();

  return (
    <>
      <button type="button" onClick={show} aria-label={t.label} aria-keyshortcuts="Control+K Meta+K" title={`${t.label} (${shortcut})`}
        className="inline-flex h-11 w-11 items-center justify-center gap-3 rounded-lg border border-line bg-ink-900 text-sm text-fg-subtle transition-colors hover:border-ink-700 hover:text-fg-muted lg:h-9 lg:w-9 xl:w-auto xl:justify-start xl:pl-3 xl:pr-2">
        <Search className="h-4 w-4 shrink-0" aria-hidden />
        <span className="hidden w-36 text-left xl:inline">{c.nav.search}</span>
        <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle xl:inline">{shortcut}</kbd>
      </button>
      {open && createPortal(
        <div className="fixed inset-0 z-[90] flex items-start justify-center sm:p-6 sm:pt-[12vh]">
          <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" onClick={() => hide()} aria-hidden />
          <div role="dialog" aria-modal="true" aria-label={t.label}
            className="relative flex h-[100dvh] w-full max-w-2xl animate-fade-up flex-col overflow-hidden border-line bg-ink-900 shadow-2xl motion-reduce:animate-none sm:h-auto sm:max-h-[70vh] sm:rounded-[28px] sm:border">
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-5 w-5 shrink-0 text-fg-subtle" aria-hidden />
              <input ref={inputRef} role="combobox" aria-expanded={hits.length > 0} aria-controls={listId} aria-autocomplete="list"
                aria-activedescendant={hits[active] ? `${listId}-${active}` : undefined} aria-label={t.label}
                value={query} onChange={(e) => { setQuery(e.target.value.slice(0, 120)); setActive(0); }} onKeyDown={onKeyDown}
                placeholder={t.placeholder} autoComplete="off" spellCheck={false}
                className="h-14 min-w-0 flex-1 bg-transparent text-base text-fg placeholder:text-fg-subtle focus:outline-none" />
              <button type="button" onClick={() => hide()} aria-label={t.close} className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-fg-subtle hover:bg-ink-800 hover:text-fg">
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div id={listId} role="listbox" aria-label={t.label} className="min-h-0 flex-1 overflow-y-auto p-2">
              {!mod ? (
                <p className="px-3 py-6 text-sm text-fg-subtle">{t.loading}</p>
              ) : !hits.length ? (
                <div className="px-3 py-8 text-center">
                  <p className="text-sm text-fg">{t.empty(trimmed)}</p>
                  <p className="mt-1 text-sm text-fg-subtle">{t.emptyHint}</p>
                </div>
              ) : groups.map(({ kind, items }) => (
                <div key={kind} role="group" aria-labelledby={`${listId}-${kind}`} className="mb-2 last:mb-0">
                  <div id={`${listId}-${kind}`} role="presentation" className="px-3 pb-1 pt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-subtle">{t.groups[kind]}</div>
                  {items.map(({ h, i }) => {
                    const Icon = KIND_ICON[h.kind];
                    const note = h.kind === "part" ? `${cats[h.category]} · ${t.partNote}` : h.note;
                    return (
                      <div key={h.href} id={`${listId}-${i}`} role="option" aria-selected={i === active}
                        onMouseDown={(e) => { e.preventDefault(); go(h); }} onMouseMove={() => setActive(i)}
                        className={clsx("flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5", i === active && "bg-ink-800")}>
                        <span className={clsx("inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border", i === active ? "border-accent/40 text-accent" : "border-line text-fg-muted")}>
                          <Icon className="h-4 w-4" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm text-fg">{h.title}</span>
                          {note && <span className="block truncate text-xs text-fg-subtle">{note}</span>}
                        </span>
                        {i === active && <CornerDownLeft className="h-4 w-4 shrink-0 text-fg-subtle" aria-hidden />}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <p className="hidden border-t border-line px-4 py-2.5 font-mono text-[11px] text-fg-subtle sm:block">{t.keys}</p>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
