import { test } from "node:test";
import assert from "node:assert/strict";
import { searchSite, type SearchPage } from "../lib/search.ts";
import { GUIDE_SLUG_LIST } from "../content/guides/slugs.ts";

const PAGES: SearchPage[] = [
  { href: "/finder", title: "Project Finder", keywords: "parts match" },
  { href: "/serial", title: "Serial monitor", keywords: "usb" },
  { href: "/shopping", title: "Shopping list" },
];

test("a part number finds the part first, then the guides that use it", () => {
  const hits = searchSite("hc-sr04", "en", PAGES);
  assert.equal(hits[0]?.href, "/finder?parts=hcsr04", "the part itself comes first");
  assert.ok(hits.some((h) => h.kind === "guide" && h.href === "/projects/obstacle-avoiding-robot"));
  assert.deepEqual(searchSite("hcsr04", "en", PAGES).find((h) => h.kind === "part")?.href, "/finder?parts=hcsr04");
});

test("guides are found in every language and shown in the current one", () => {
  const ru = searchSite("робот", "ru", PAGES).filter((h) => h.kind === "guide");
  assert.ok(ru.length > 0);
  assert.ok(ru.every((h) => /[а-яё]/i.test(h.title)), "Russian titles");
  const kk = searchSite("робот", "kk", PAGES).filter((h) => h.kind === "guide");
  assert.ok(kk.length > 0);
  const en = searchSite("робот", "en", PAGES).filter((h) => h.kind === "guide");
  assert.ok(en.length > 0, "a Russian word still finds guides on the English site");
});

test("every token must match, results link to real pages, junk finds nothing", () => {
  for (const h of searchSite("esp32 weather", "en", PAGES)) {
    if (h.kind === "guide") assert.ok(GUIDE_SLUG_LIST.includes(h.href.replace("/projects/", "")), h.href);
  }
  assert.deepEqual(searchSite("zzqqxx", "en", PAGES), []);
  assert.deepEqual(searchSite("<script>alert(1)</script>", "en", PAGES).filter((h) => h.kind === "page"), []);
  assert.equal(searchSite("serial", "en", PAGES).find((h) => h.kind === "page")?.href, "/serial");
});

test("an empty query suggests pages", () => {
  assert.deepEqual(searchSite("   ", "en", PAGES).map((h) => h.href), ["/finder", "/serial", "/shopping"]);
});
