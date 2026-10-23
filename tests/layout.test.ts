import { test } from "node:test";
import assert from "node:assert/strict";
import { layoutCircuit, type Layout } from "../lib/hardware/layout.ts";
import { FIXTURE_CIRCUITS, getFixtureComponent } from "../app/dev/diagrams/fixtures.ts";

const layouts: Array<[string, Layout]> = FIXTURE_CIRCUITS.map((f) => [f.slug, layoutCircuit(f.circuit, getFixtureComponent)]);

for (const [slug, L] of layouts) {
  test(`${slug}: components do not overlap and keep a 3-unit gap`, () => {
    const cs = L.components;
    for (let i = 0; i < cs.length; i++) for (let j = i + 1; j < cs.length; j++) {
      const a = cs[i]!, b = cs[j]!;
      const apart = a.x + a.w + 36 <= b.x || b.x + b.w + 36 <= a.x || a.y + a.h + 36 <= b.y || b.y + b.h + 36 <= a.y;
      assert.ok(apart, `${a.id} overlaps ${b.id}`);
    }
    for (const c of cs) assert.ok(c.x >= 0 && c.y >= 0 && c.x + c.w <= L.width && c.y + c.h <= L.height, `${c.id} out of bounds`);
    assert.ok(!cs.some((c) => c.def.kind === "mechanical"));
  });

  test(`${slug}: wires end exactly on their pins (or rails)`, () => {
    const pin = (end: string) => {
      const [iid, pid] = [end.slice(0, end.indexOf(".")), end.slice(end.indexOf(".") + 1)];
      const p = L.components.find((c) => c.id === iid)?.pins.find((q) => q.id === pid);
      assert.ok(p, `missing pin ${end}`);
      return p;
    };
    for (const w of L.wires) {
      const first = w.points[0]!, last = w.points[w.points.length - 1]!;
      const a = pin(w.from);
      assert.deepEqual(first, [a.x, a.y], `${w.id} start`);
      if (w.to.startsWith("rail.")) {
        const rail = L.rails.find((r) => (w.to === "rail.GND" ? r.kind === "gnd" : r.kind === "power"));
        assert.ok(rail);
        assert.equal(last[1], rail.y);
      } else {
        const b = pin(w.to);
        assert.deepEqual(last, [b.x, b.y], `${w.id} end`);
      }
    }
  });

  test(`${slug}: segments are axis-aligned and avoid other parts`, () => {
    for (const w of L.wires) {
      const own = new Set([w.from, w.to].map((e) => e.slice(0, e.indexOf("."))));
      for (let k = 0; k + 1 < w.points.length; k++) {
        const [x1, y1] = w.points[k]!, [x2, y2] = w.points[k + 1]!;
        assert.ok(x1 === x2 || y1 === y2, `${w.id} diagonal segment`);
        for (const c of L.components) {
          if (own.has(c.id)) continue;
          const lo = [Math.min(x1, x2), Math.min(y1, y2)], hi = [Math.max(x1, x2), Math.max(y1, y2)];
          const hits = lo[0]! < c.x + c.w && hi[0]! > c.x && lo[1]! < c.y + c.h && hi[1]! > c.y;
          assert.ok(!hits, `${w.id} crosses ${c.id}`);
        }
      }
    }
  });
}

test("rails appear only with 3+ ground connections", () => {
  const m = new Map(layouts);
  assert.equal(m.get("obstacle-robot")!.rails.length, 2);
  assert.equal(m.get("led-button")!.rails.length, 0);
});

test("layout is deterministic", () => {
  for (const f of FIXTURE_CIRCUITS) assert.deepEqual(JSON.stringify(layoutCircuit(f.circuit, getFixtureComponent)), JSON.stringify(layoutCircuit(f.circuit, getFixtureComponent)));
});
