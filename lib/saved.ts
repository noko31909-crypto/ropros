"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Device-local saved builds (guide/project slugs). All storage access is wrapped: private mode may throw. */
export const SAVED_KEY = "ropros:saved";
const LEGACY_KEY = "ropros:saved-guides";
const EVENT = "ropros:saved-change";

function parse(raw: string | null): string[] {
  try {
    const v: unknown = JSON.parse(raw ?? "[]");
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch { return []; }
}

function migrate(): void {
  try {
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy === null) return;
    const merged = Array.from(new Set([...parse(localStorage.getItem(SAVED_KEY)), ...parse(legacy)]));
    localStorage.setItem(SAVED_KEY, JSON.stringify(merged));
    localStorage.removeItem(LEGACY_KEY);
  } catch { /* storage unavailable */ }
}

export function readSaved(): string[] {
  migrate();
  try { return parse(localStorage.getItem(SAVED_KEY)); } catch { return []; }
}

function write(list: string[]): void {
  try { localStorage.setItem(SAVED_KEY, JSON.stringify(list)); } catch { /* storage unavailable */ }
  cache = null;
  window.dispatchEvent(new Event(EVENT));
}

/** Toggles a slug; returns true when it is now saved. */
export function toggleSaved(slug: string): boolean {
  const list = readSaved();
  const has = list.includes(slug);
  write(has ? list.filter((s) => s !== slug) : [...list, slug]);
  return !has;
}

// useSyncExternalStore needs a stable snapshot between changes.
let cache: { raw: string; list: string[] } | null = null;
const EMPTY: string[] = [];
function snapshot(): string[] {
  let raw = "[]";
  try { migrate(); raw = localStorage.getItem(SAVED_KEY) ?? "[]"; } catch { /* storage unavailable */ }
  if (!cache || cache.raw !== raw) cache = { raw, list: parse(raw) };
  return cache.list;
}
function subscribe(cb: () => void): () => void {
  const onStorage = (e: StorageEvent) => { if (e.key === null || e.key === SAVED_KEY) { cache = null; cb(); } };
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", onStorage);
  return () => { window.removeEventListener(EVENT, cb); window.removeEventListener("storage", onStorage); };
}

/** Saved slugs, kept in sync across components (custom event) and tabs (`storage` event). Empty on the server. */
export function useSavedBuilds() {
  const saved = useSyncExternalStore(subscribe, snapshot, () => EMPTY);
  const isSaved = useCallback((slug: string) => saved.includes(slug), [saved]);
  return { saved, isSaved, toggle: toggleSaved };
}
