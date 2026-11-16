import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { MAX_WORKBENCH_PARTS, cleanPartIds } from "../lib/workbench.ts";
import { PARTS, PART_BY_ID } from "../lib/parts-catalog.ts";
import { canonicalPart } from "../lib/finder/normalize.ts";
import { PROJECTS, matchPartIds } from "../lib/finder/projects-data.ts";
import { matchProjects } from "../lib/finder/match.ts";

test("a workbench keeps known catalog ids only, once each, in order, up to the cap", () => {
  assert.deepEqual(cleanPartIds(["uno", "uno", "flux-capacitor", 42, null, "hcsr04"]), ["uno", "hcsr04"]);
  assert.deepEqual(cleanPartIds("uno"), []);
  assert.deepEqual(cleanPartIds(undefined), []);
  const many = Array.from({ length: MAX_WORKBENCH_PARTS + 50 }, (_, i) => PARTS[i % PARTS.length]!.id);
  assert.ok(cleanPartIds(many).length <= MAX_WORKBENCH_PARTS);
});

test("the workbench cap matches the database trigger", () => {
  const sql = fs.readFileSync(new URL("../supabase/migrations/0003_workbench_comments.sql", import.meta.url), "utf8");
  assert.match(sql, new RegExp(`owned >= ${MAX_WORKBENCH_PARTS}\\b`));
});

test("catalog ids fit the user_parts.part_id check", () => {
  for (const p of PARTS) assert.match(p.id, /^[a-z0-9]{2,24}$/, p.id);
  assert.equal(new Set(PARTS.map((p) => p.id)).size, PARTS.length, "ids are unique");
});

test("every part a guide needs is in the catalog, so it can go on a workbench and a shopping list", () => {
  for (const p of PROJECTS) {
    for (const name of [p.microcontroller, ...p.components_required]) {
      const c = canonicalPart(name);
      assert.notEqual(c.category, "Other", `${p.project_id}: "${name}" is not in lib/parts-catalog.ts`);
      assert.ok(PART_BY_ID.has(c.key), `${p.project_id}: ${name}`);
    }
  }
});

test("matching by workbench ids gives the same result as matching by names", () => {
  const ids = ["nano", "rtc", "tm1637", "button"];
  assert.deepEqual(matchPartIds(ids), matchProjects(PROJECTS, ids.map((id) => PART_BY_ID.get(id)!.name)));
});

test("guide parts carry their catalog id and whether the finder counts them", async () => {
  const { getGuide, localizeGuide } = await import("../lib/guides.ts");
  const g = localizeGuide(getGuide("line-follower")!, "ru");
  assert.ok(g.parts.some((p) => p.key === "l298n" && p.required));
  for (const p of g.parts) if (p.required) assert.ok(p.key && PART_BY_ID.has(p.key), p.name);
  for (const p of g.parts) if (p.optional) assert.equal(p.required, false, p.name);
});
