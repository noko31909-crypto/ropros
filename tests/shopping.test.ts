import { test } from "node:test";
import assert from "node:assert/strict";
import { shoppingList, shoppingText, storesFor, toShoppingGuide, type ShoppingGuide } from "../lib/shopping.ts";
import { PART_BY_ID } from "../lib/parts-catalog.ts";

const G: ShoppingGuide[] = [
  { slug: "rover", title: "Rover", costUsd: 40, parts: [{ key: "uno", qty: 1 }, { key: "l298n", qty: 1 }, { key: "tt", qty: 2 }] },
  { slug: "mecanum", title: "Mecanum", costUsd: 90, parts: [{ key: "esp32", qty: 1 }, { key: "l298n", qty: 2 }, { key: "tt", qty: 4 }] },
  { slug: "clock", title: "Clock", costUsd: 15, parts: [{ key: "nano", qty: 1 }, { key: "rtc", qty: 1 }] },
];

test("a guide lists each required catalog part once, with the summed quantity", () => {
  const g = toShoppingGuide({ slug: "x", title: "X", costUsd: 10, parts: [
    { key: "resistor", qty: 2, required: false }, { key: "tt", qty: 1, required: true }, { key: "tt", qty: 1, required: true },
    { qty: 1, required: true }, { key: "led", qty: 1, required: false },
  ] });
  assert.deepEqual(g.parts, [{ key: "tt", qty: 2 }]);
});

test("the list holds what the planned builds miss, biggest need per part, most-used parts first", () => {
  const { items, planned, missingPerGuide } = shoppingList(G, ["rover", "mecanum", "gone-guide"], ["uno", "tt"]);
  assert.deepEqual(planned.map((g) => g.slug), ["rover", "mecanum"]);
  assert.deepEqual(items.map((i) => i.key), ["l298n", "esp32"]);
  assert.equal(items[0]!.qty, 2);
  assert.deepEqual(items[0]!.uses.map((u) => u.slug), ["rover", "mecanum"]);
  assert.equal(missingPerGuide.get("rover"), 1);
  assert.equal(missingPerGuide.get("mecanum"), 2);
  assert.equal(shoppingList(G, ["clock"], ["nano", "rtc"]).items.length, 0);
  assert.equal(shoppingList(G, [], []).items.length, 0);
});

test("the copied list is plain text", () => {
  const { items } = shoppingList(G, ["clock"], []);
  assert.equal(shoppingText("List", items), `List\n\n- ${PART_BY_ID.get("nano")!.name} ×1 (Clock)\n- ${PART_BY_ID.get("rtc")!.name} ×1 (Clock)`);
});

test("store links search for the part, encoded, with no tracking or affiliate parameters", () => {
  for (const locale of ["en", "ru", "kk"] as const) {
    const stores = storesFor(locale);
    assert.equal(stores.length, 3);
    for (const s of stores) {
      const url = new URL(s.href("2.9\" E-Paper & more"));
      assert.equal(url.protocol, "https:");
      assert.equal([...url.searchParams.values()].join(), "2.9\" E-Paper & more");
      assert.equal([...url.searchParams.keys()].length, 1);
    }
  }
  assert.equal(storesFor("kk")[0]!.id, "kaspi");
});

test("every guide on the site can be shopped for", async () => {
  const { allGuideSlugs, getGuide, localizeGuide } = await import("../lib/guides.ts");
  for (const slug of allGuideSlugs()) {
    const g = toShoppingGuide(localizeGuide(getGuide(slug)!, "en"));
    assert.ok(g.parts.length > 0, slug);
    for (const p of g.parts) assert.ok(PART_BY_ID.has(p.key), `${slug}: ${p.key}`);
  }
});
