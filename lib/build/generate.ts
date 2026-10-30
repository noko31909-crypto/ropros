import type { Issue } from "../hardware/check.ts";
import type { Locale } from "../i18n/config.ts";
import { checkProject } from "./circuit.ts";
import { normalizeProject } from "./normalize.ts";
import { autoCad } from "./layout.ts";
import { buildSystemPrompt, repairPrompt } from "./prompt.ts";
import { describeIssues, extractJson, ProjectInputSchema, ProjectSchema, type Project } from "./schema.ts";

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };
export type Complete = (messages: ChatMessage[]) => Promise<{ text: string; truncated: boolean }>;
export type GenerateResult =
  | { ok: true; project: Project; issues: Issue[]; repaired: boolean }
  | { ok: false; reason: "invalid_output"; problems: string[] };

/** A model reply is at most this long; anything bigger is cut before parsing. */
const MAX_REPLY_CHARS = 120_000;

type Attempt = { project?: Project; problems: string[]; issues: Issue[] };

function evaluate(reply: string, truncated: boolean, locale: Locale): Attempt {
  if (truncated) return { problems: ["The reply was cut off by the length limit. Make text shorter and the code more compact."], issues: [] };
  const raw = extractJson(reply.slice(0, MAX_REPLY_CHARS));
  if (raw === undefined) return { problems: ["The reply is not a valid JSON object."], issues: [] };
  const parsed = ProjectInputSchema.safeParse(normalizeProject(raw));
  if (!parsed.success) return { problems: describeIssues(parsed.error), issues: [] };
  const project = ProjectSchema.parse({ ...parsed.data, cad: autoCad(parsed.data, locale) });
  const issues = checkProject(project);
  const errors = issues.filter((i) => i.level === "error").map((i) => `circuit ${i.code}${i.at ? ` at ${i.at}` : ""}: ${i.message}`);
  return { project, problems: errors, issues };
}

/**
 * Asks the model for a project, validates it (schema, then circuit checker) and, if anything is wrong,
 * sends the problems back once for a repair. A schema-valid project with circuit errors left after the
 * repair is still returned, with its issues, so the UI can show what to fix instead of nothing at all.
 */
export async function generateProject(idea: string, locale: Locale, complete: Complete): Promise<GenerateResult> {
  const messages: ChatMessage[] = [
    { role: "system", content: buildSystemPrompt(locale) },
    { role: "user", content: `Project idea:\n<idea>\n${idea}\n</idea>` },
  ];
  const first = await complete(messages);
  const a = evaluate(first.text, first.truncated, locale);
  if (a.project && !a.problems.length) return { ok: true, project: a.project, issues: a.issues, repaired: false };

  const second = await complete([...messages, { role: "assistant", content: first.text.slice(0, MAX_REPLY_CHARS) }, { role: "user", content: repairPrompt(a.problems) }]);
  const b = evaluate(second.text, second.truncated, locale);
  if (b.project) return { ok: true, project: b.project, issues: b.issues, repaired: true };
  if (a.project) return { ok: true, project: a.project, issues: a.issues, repaired: false };
  return { ok: false, reason: "invalid_output", problems: b.problems.slice(0, 10) };
}
