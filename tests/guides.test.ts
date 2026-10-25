import { test } from "node:test";
import assert from "node:assert/strict";
import { checkCircuit } from "../lib/hardware/check.ts";
import { getComponent } from "../lib/hardware/components.ts";
import { layoutCircuit } from "../lib/hardware/layout.ts";
import { isComponentId } from "../lib/hardware/ids.ts";
import { allGuideSlugs, getGuide, guideCircuit, localizeGuide } from "../lib/guides.ts";
import { GuideSchema } from "../lib/content/schema.ts";
import { CONTENT_GUIDES } from "../content/guides/index.ts";

const lookup = (id: string) => {
  if (!isComponentId(id)) throw new Error(`Unknown component "${id}"`);
  return getComponent(id);
};

test("guide slugs are unique and every content file passes the schema", () => {
  const slugs = allGuideSlugs();
  assert.equal(new Set(slugs).size, slugs.length);
  assert.ok(slugs.length >= 3 + CONTENT_GUIDES.length);
  for (const c of CONTENT_GUIDES) {
    const r = GuideSchema.safeParse(c);
    assert.ok(r.success, `${c.slug}: ${r.success ? "" : r.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`);
    assert.ok(c.parts.some((p) => p.component === c.board), `${c.slug}: parts must include the board`);
  }
});

for (const slug of allGuideSlugs()) {
  const g = getGuide(slug)!;

  test(`${slug}: circuit checker reports zero errors`, () => {
    const issues = checkCircuit(guideCircuit(g), getComponent);
    for (const w of issues.filter((i) => i.level === "warning")) console.log(`  [warning] ${slug} ${w.code}: ${w.message}`);
    assert.deepEqual(issues.filter((i) => i.level === "error"), []);
  });

  test(`${slug}: layout routes every connection`, () => {
    const layout = layoutCircuit(guideCircuit(g), lookup);
    assert.ok(layout.wires.length >= g.connections.length); // rail taps may split a wire
    assert.ok(layout.width > 0 && layout.height > 0);
  });

  test(`${slug}: legend has one localized row per connection`, () => {
    for (const locale of ["en", "ru", "kk"] as const) {
      const l = localizeGuide(g, locale);
      assert.equal(l.wiring.length, g.connections.length);
      for (const w of l.wiring) assert.ok(!w.from.includes(".") || /\d\.\d/.test(w.from), `unresolved endpoint ${w.from}`);
    }
  });
}
