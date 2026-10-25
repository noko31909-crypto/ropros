/** Validates guide content files: schema (zod), circuit checker, layout. Exit code 1 on any error.
 *  node --experimental-strip-types scripts/check-guide.ts content/guides/<slug>.ts [...] */
import path from "node:path";
import { pathToFileURL } from "node:url";
import { GuideSchema } from "../lib/content/schema.ts";
import { checkCircuit } from "../lib/hardware/check.ts";
import { getComponent } from "../lib/hardware/components.ts";
import { layoutCircuit } from "../lib/hardware/layout.ts";
import { isComponentId } from "../lib/hardware/ids.ts";
import { fromContent, guideCircuit } from "../lib/guides.ts";

let failed = 0;
for (const file of process.argv.slice(2)) {
  const mod = await import(pathToFileURL(path.resolve(file)).href);
  const parsed = GuideSchema.safeParse(mod.default);
  const name = path.basename(file);
  if (!parsed.success) {
    failed++;
    console.log(`✗ ${name}: schema`);
    for (const i of parsed.error.issues.slice(0, 15)) console.log(`    ${i.path.join(".")}: ${i.message}`);
    continue;
  }
  const c = parsed.data;
  const problems: string[] = [];
  if (`${c.slug}.ts` !== name) problems.push(`slug "${c.slug}" must match the file name`);
  if (getComponent(c.board).kind !== "board") problems.push(`board "${c.board}" is not a board`);
  for (const p of c.parts) if (p.component === c.board) continue;
  if (!c.parts.some((p) => p.component === c.board)) problems.push(`parts must include the board "${c.board}"`);
  const g = fromContent(c);
  const issues = checkCircuit(guideCircuit(g), getComponent);
  for (const e of issues.filter((i) => i.level === "error")) problems.push(`[checker] ${e.code}: ${e.message}`);
  try {
    layoutCircuit(guideCircuit(g), (id) => { if (!isComponentId(id)) throw new Error(id); return getComponent(id); });
  } catch (e) { problems.push(`[layout] ${(e as Error).message}`); }
  const warns = issues.filter((i) => i.level === "warning");
  if (problems.length) { failed++; console.log(`✗ ${name}`); for (const p of problems) console.log(`    ${p}`); }
  else console.log(`✓ ${name}${warns.length ? ` (${warns.length} warning${warns.length > 1 ? "s" : ""})` : ""}`);
  for (const w of warns) console.log(`    [warning] ${w.code}: ${w.message}`);
}
process.exit(failed ? 1 : 0);
