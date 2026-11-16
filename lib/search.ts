import type { Locale } from "./i18n/config.ts";
import { GUIDE_CATALOG } from "../content/guides/catalog.ts";
import { PROJECTS as FINDER_PROJECTS, PROJECT_TITLES } from "./finder/projects-data.ts";
import { normalizeText } from "./finder/normalize.ts";
import { PARTS, type PartCategory } from "./parts-catalog.ts";

/**
 * Site search (the Ctrl+K palette): every guide, every catalog part and the main pages, in all three languages.
 * Pure and synchronous; the palette loads this module only when it is first opened.
 */
type L = Record<Locale, string>;
export type SearchPage = { href: string; title: string; note?: string; keywords?: string };
export type SearchHit =
  | { kind: "guide"; href: string; title: string; note: string; score: number }
  | { kind: "part"; href: string; title: string; category: PartCategory; score: number }
  | { kind: "page"; href: string; title: string; note?: string; score: number };

type Doc = { words: string[]; compact: string };
const doc = (...texts: (string | undefined)[]): Doc => {
  const n = normalizeText(texts.filter(Boolean).join(" "));
  return { words: n ? n.split(" ") : [], compact: n.replace(/ /g, "") };
};

const SUMMARY = new Map(GUIDE_CATALOG.map((g) => [g.slug, g]));
const GUIDES = FINDER_PROJECTS.map((p) => {
  const title: L = PROJECT_TITLES.get(p.project_id) ?? { en: p.title, ru: p.title, kk: p.title };
  const card = SUMMARY.get(p.project_id);
  return {
    slug: p.project_id, title, board: p.microcontroller,
    titleDocs: { en: doc(title.en), ru: doc(title.ru), kk: doc(title.kk) },
    other: doc(title.en, title.ru, title.kk, p.microcontroller, ...p.components_required, card?.category, card?.robotics ? "robot robotics" : undefined),
    summary: { en: doc(card?.summary.en), ru: doc(card?.summary.ru), kk: doc(card?.summary.kk) },
  };
});
const PART_DOCS = PARTS.map((p) => ({ part: p, title: doc(p.name, p.id), other: doc(p.name, p.id, ...p.aliases, ...p.specs) }));

/** How well one query token matches a document: 3 = a word starts with it, 1 = it appears inside (4+ characters), 0 = no. */
function tokenScore(token: string, d: Doc): number {
  if (d.words.some((w) => w.startsWith(token))) return 3;
  if (token.length >= 4 && d.compact.includes(token)) return 1;
  return 0;
}

/** Every token has to match somewhere; title matches count most, the current language's title more than the others. */
function scoreEntry(tokens: string[], title: Doc, other: Doc, extra?: Doc): number {
  let total = 0;
  for (const tk of tokens) {
    const s = Math.max(tokenScore(tk, title) * 4, tokenScore(tk, other) * 2, extra ? tokenScore(tk, extra) : 0);
    if (s === 0) return 0;
    total += s;
  }
  return total;
}

export function searchSite(query: string, locale: Locale, pages: readonly SearchPage[], limits = { guides: 8, parts: 5, pages: 4 }): SearchHit[] {
  const q = normalizeText(query.slice(0, 120));
  const tokens = q ? [...new Set(q.split(" "))].slice(0, 8) : [];
  if (!tokens.length) return pages.slice(0, limits.pages).map((p) => ({ kind: "page", ...p, score: 0 }));

  const starts = (d: Doc) => d.compact.startsWith(q.replace(/ /g, ""));
  const guides: SearchHit[] = [];
  for (const g of GUIDES) {
    const title = g.titleDocs[locale];
    let score = scoreEntry(tokens, title, g.other, g.summary[locale]);
    if (!score) continue;
    if (starts(title)) score += 6;
    guides.push({ kind: "guide", href: `/projects/${g.slug}`, title: g.title[locale], note: g.board, score });
  }
  const parts: SearchHit[] = [];
  for (const { part, title, other } of PART_DOCS) {
    let score = scoreEntry(tokens, title, other);
    if (!score) continue;
    if (starts(title)) score += 6;
    parts.push({ kind: "part", href: `/finder?parts=${encodeURIComponent(part.id)}`, title: part.name, category: part.category, score });
  }
  const pageHits: SearchHit[] = [];
  for (const p of pages) {
    const title = doc(p.title);
    const score = scoreEntry(tokens, title, doc(p.title, p.note, p.keywords));
    if (score) pageHits.push({ kind: "page", ...p, score: score + (starts(title) ? 6 : 0) });
  }
  const best = (a: SearchHit, b: SearchHit) => b.score - a.score || a.title.localeCompare(b.title);
  return [
    ...guides.sort(best).slice(0, limits.guides),
    ...parts.sort(best).slice(0, limits.parts),
    ...pageHits.sort(best).slice(0, limits.pages),
  ];
}
