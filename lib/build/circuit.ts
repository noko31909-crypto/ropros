import { checkCircuit, type CheckInput, type Issue } from "../hardware/check.ts";
import { getComponent } from "../hardware/components.ts";
import type { Project } from "./schema.ts";

/** The circuit checker's input: the generated project's wiring with single-language text widened to the guide shape. */
export function circuitOf(p: Project): CheckInput {
  const loc = (s: string) => ({ en: s, ru: s, kk: s });
  return {
    board: p.board,
    platform: p.platform,
    instances: p.instances,
    connections: p.connections.map(({ from, to, color }) => ({ from, to, color })),
    code: p.code,
    parts: p.parts.flatMap((part) => (part.component ? [{ component: part.component, qty: part.qty, spec: loc(part.spec), role: loc(part.name) }] : [])),
  };
}

/** Circuit checker issues for a generated project. Runs on the server before replying and again in the browser for saved projects. */
export function checkProject(p: Project): Issue[] {
  return checkCircuit(circuitOf(p), getComponent);
}
