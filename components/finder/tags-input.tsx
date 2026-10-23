"use client";

import { useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { clsx } from "clsx";
import { Search, X } from "lucide-react";
import { CAT_ICON } from "./component-library";
import { useMessages } from "@/components/i18n/locale-provider";
import { finder } from "@/lib/i18n/messages/finder";
import { components as componentsMsgs } from "@/lib/i18n/messages/components";
import { PART_BY_ID, searchParts, type CatalogPart } from "@/lib/parts-catalog";

type Props = { value: string[]; onChange: (ids: string[]) => void; disabled?: boolean };

/** WAI-ARIA combobox with chips. Type to filter, ↑/↓ to move, Enter or comma to add, Backspace to remove the last chip. */
export function TagsInput({ value, onChange, disabled }: Props) {
  const t = useMessages(finder);
  const cats = useMessages(componentsMsgs).categories;
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const selected = useMemo(() => new Set(value), [value]);
  const options = useMemo(() => searchParts(query, selected), [query, selected]);

  const add = (p: CatalogPart) => {
    if (selected.has(p.id)) return;
    onChange([...value, p.id]);
    setQuery(""); setActive(0); inputRef.current?.focus();
  };
  const remove = (id: string) => onChange(value.filter((v) => v !== id));

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive((a) => Math.min(a + 1, options.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter" || e.key === ",") {
      const pick = options[active];
      if (open && pick) { e.preventDefault(); add(pick); }
    } else if (e.key === "Backspace" && query === "" && value.length) remove(value[value.length - 1]!);
    else if (e.key === "Escape") setOpen(false);
  };

  const noMatch = query.trim() !== "" && options.length === 0;

  return (
    <div className="relative">
      <div
        onClick={() => inputRef.current?.focus()}
        className={clsx(
          "flex min-h-[64px] flex-wrap items-center gap-2 rounded-2xl border bg-ink-900 p-3 transition-all",
          open ? "border-accent/60 shadow-[0_0_0_4px_rgba(255,122,26,0.12)]" : "border-line hover:border-ink-700",
          disabled && "pointer-events-none opacity-60",
        )}
      >
        <Search className="ml-1 h-5 w-5 shrink-0 text-fg-subtle" aria-hidden />
        {value.map((id) => {
          const p = PART_BY_ID.get(id); if (!p) return null;
          const Icon = CAT_ICON[p.category];
          return (
            <span key={id} className="inline-flex animate-tag-in items-center gap-1.5 rounded-xl border border-accent/30 bg-accent-soft py-1.5 pl-2.5 pr-1.5 text-sm font-medium text-fg">
              <Icon className="h-3.5 w-3.5 text-accent" aria-hidden />
              {p.name}
              <button type="button" onClick={(e) => { e.stopPropagation(); remove(id); }} aria-label={t.remove(p.name)}
                className="ml-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md text-fg-muted hover:bg-accent hover:text-ink-950">
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            </span>
          );
        })}
        <input
          ref={inputRef}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && options[active] ? `${listId}-${options[active]!.id}` : undefined}
          aria-label={t.inputLabel}
          autoComplete="off"
          value={query}
          disabled={disabled}
          onChange={(e) => { setQuery(e.target.value.replace(",", "")); setOpen(true); setActive(0); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={onKeyDown}
          placeholder={value.length ? t.placeholderMore : t.placeholderEmpty}
          className="h-9 min-w-[12rem] flex-1 bg-transparent px-1 text-base text-fg placeholder:text-fg-subtle focus:outline-none"
        />
      </div>

      {open && (options.length > 0 || noMatch) && (
        <ul id={listId} role="listbox" aria-label={t.listLabel}
          className="absolute inset-x-0 top-full z-30 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-line bg-ink-900/95 p-1.5 shadow-2xl backdrop-blur-xl">
          {noMatch ? (
            <li className="px-3 py-3 text-sm text-fg-muted">{t.noPart(query)}</li>
          ) : options.map((p, i) => {
            const Icon = CAT_ICON[p.category];
            return (
              <li key={p.id} id={`${listId}-${p.id}`} role="option" aria-selected={i === active}
                onMouseDown={(e) => { e.preventDefault(); add(p); }} onMouseEnter={() => setActive(i)}
                className={clsx("flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5", i === active ? "bg-ink-800" : "")}>
                <span className={clsx("inline-flex h-8 w-8 items-center justify-center rounded-lg border", i === active ? "border-accent/40 text-accent" : "border-line text-fg-muted")}>
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="flex-1 text-sm text-fg">{p.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">{cats[p.category]}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
