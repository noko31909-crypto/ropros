import type { Locale } from "./i18n/config.ts";
import { PART_BY_ID } from "./parts-catalog.ts";

/**
 * Shopping list: the parts the maker's saved builds need that are not on their workbench.
 * Pure functions, so the page can build the guide index on the server and the list is computed in the browser
 * (saved builds and a guest workbench live in local storage).
 */
export type ShoppingGuide = { slug: string; title: string; costUsd: number; parts: { key: string; qty: number }[] };
export type ShoppingItem = { key: string; name: string; qty: number; uses: { slug: string; title: string; qty: number }[] };

/** One guide as the list needs it: required, catalog-known parts only, one entry per part with the summed quantity. */
export function toShoppingGuide(g: { slug: string; title: string; costUsd: number; parts: readonly { key?: string; qty: number; required: boolean }[] }): ShoppingGuide {
  const qty = new Map<string, number>();
  for (const p of g.parts) if (p.required && p.key) qty.set(p.key, (qty.get(p.key) ?? 0) + p.qty);
  return { slug: g.slug, title: g.title, costUsd: g.costUsd, parts: [...qty].map(([key, n]) => ({ key, qty: n })) };
}

/**
 * Missing parts across the planned guides. `qty` is what the biggest single build needs (parts move between builds),
 * `uses` says which builds need it. Parts needed by more builds come first.
 */
export function shoppingList(guides: readonly ShoppingGuide[], planned: readonly string[], owned: readonly string[]) {
  const have = new Set(owned);
  const bySlug = new Map(guides.map((g) => [g.slug, g]));
  const items = new Map<string, ShoppingItem>();
  const missingPerGuide = new Map<string, number>();
  const plannedGuides: ShoppingGuide[] = [];
  for (const slug of new Set(planned)) {
    const g = bySlug.get(slug);
    if (!g) continue;
    plannedGuides.push(g);
    let missing = 0;
    for (const p of g.parts) {
      if (have.has(p.key)) continue;
      missing++;
      const item = items.get(p.key) ?? { key: p.key, name: PART_BY_ID.get(p.key)?.name ?? p.key, qty: 0, uses: [] };
      item.qty = Math.max(item.qty, p.qty);
      item.uses.push({ slug: g.slug, title: g.title, qty: p.qty });
      items.set(p.key, item);
    }
    missingPerGuide.set(g.slug, missing);
  }
  const sorted = [...items.values()].sort((a, b) => b.uses.length - a.uses.length || a.name.localeCompare(b.name));
  return { items: sorted, planned: plannedGuides, missingPerGuide };
}

/** The list as plain text for the clipboard. */
export function shoppingText(header: string, items: readonly ShoppingItem[]): string {
  return [header, "", ...items.map((i) => `- ${i.name} ×${i.qty} (${i.uses.map((u) => u.title).join("; ")})`)].join("\n");
}

/** Shops whose own search opens for a part. No affiliate parameters. */
export type Store = { id: "kaspi" | "aliexpress" | "amazon"; name: string; href: (query: string) => string };
const KASPI: Store = { id: "kaspi", name: "Kaspi.kz", href: (q) => `https://kaspi.kz/shop/search/?text=${encodeURIComponent(q)}` };
const ALIEXPRESS: Store = { id: "aliexpress", name: "AliExpress", href: (q) => `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(q)}` };
const AMAZON: Store = { id: "amazon", name: "Amazon", href: (q) => `https://www.amazon.com/s?k=${encodeURIComponent(q)}` };

/** Local shops first for Russian and Kazakh. */
export function storesFor(locale: Locale): Store[] {
  return locale === "en" ? [ALIEXPRESS, AMAZON, KASPI] : [KASPI, ALIEXPRESS, AMAZON];
}
