import type { Issue } from "../hardware/check.ts";
import type { Locale } from "../i18n/config.ts";
import { checkProject } from "./circuit.ts";
import { normalizeProject } from "./normalize.ts";
import { autoCad } from "./layout.ts";
import { buildSystemPrompt, repairPrompt } from "./prompt.ts";
import { describeIssues, extractJson, ProjectInputSchema, ProjectSchema, type BuildAnswer, type Project, type Shape } from "./schema.ts";

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };
export type Complete = (messages: ChatMessage[]) => Promise<{ text: string; truncated: boolean }>;
export type GenerateResult =
  | { ok: true; project: Project; issues: Issue[]; repaired: boolean }
  | { ok: false; reason: "invalid_output"; problems: string[] };

/** A model reply is at most this long; anything bigger is cut before parsing. */
const MAX_REPLY_CHARS = 120_000;

type Attempt = { project?: Project; problems: string[]; issues: Issue[] };

function evaluate(reply: string, truncated: boolean, locale: Locale, shape: Shape): Attempt {
  if (truncated) return { problems: ["The reply was cut off by the length limit. Make text shorter and the code more compact."], issues: [] };
  const raw = extractJson(reply.slice(0, MAX_REPLY_CHARS));
  if (raw === undefined) return { problems: ["The reply is not a valid JSON object."], issues: [] };
  const parsed = ProjectInputSchema.safeParse(normalizeProject(raw));
  if (!parsed.success) return { problems: describeIssues(parsed.error), issues: [] };
  const project = ProjectSchema.parse({ ...parsed.data, cad: autoCad(parsed.data, locale, shape) });
  const issues = checkProject(project);
  const errors = issues.filter((i) => i.level === "error").map((i) => `circuit ${i.code}${i.at ? ` at ${i.at}` : ""}: ${i.message}`);
  return { project, problems: errors, issues };
}

/**
 * Asks the model for a project, validates it (schema, then circuit checker) and, if anything is wrong,
 * sends the problems back once for a repair. A schema-valid project with circuit errors left after the
 * repair is still returned, with its issues, so the UI can show what to fix instead of nothing at all.
 */
export type GenerateOptions = { answers?: readonly BuildAnswer[]; shape?: Shape };

const SHAPE_HINT: Record<Shape, string> = {
  auto: "",
  enclosure: "The maker wants it in a closed case (no wheels).",
  rover: "The maker wants a robot on wheels: include DC motors (dc-motor) and a motor driver.",
  open: "The maker wants an open build on a base plate, no case.",
};

/** The user message: the idea, then the maker's answers to the clarifying questions, all as data for the model. */
export function ideaMessage(idea: string, opts: GenerateOptions = {}): string {
  const answers = (opts.answers ?? []).map((a) => `- ${a.question}: ${a.answer}`).join("\n");
  const hint = SHAPE_HINT[opts.shape ?? "auto"];
  return `Project idea:\n<idea>\n${idea}\n</idea>${answers || hint ? `\n\nThe maker's answers to clarifying questions (follow them):\n<answers>\n${[answers, hint && `- Form: ${hint}`].filter(Boolean).join("\n")}\n</answers>` : ""}`;
}

export async function generateProject(idea: string, locale: Locale, complete: Complete, opts: GenerateOptions = {}): Promise<GenerateResult> {
  const shape = opts.shape ?? "auto";
  const messages: ChatMessage[] = [
    { role: "system", content: buildSystemPrompt(locale) },
    { role: "user", content: ideaMessage(idea, opts) },
  ];
  const first = await complete(messages);
  const a = evaluate(first.text, first.truncated, locale, shape);
  if (a.project && !a.problems.length) return { ok: true, project: a.project, issues: a.issues, repaired: false };

  const second = await complete([...messages, { role: "assistant", content: first.text.slice(0, MAX_REPLY_CHARS) }, { role: "user", content: repairPrompt(a.problems) }]);
  const b = evaluate(second.text, second.truncated, locale, shape);
  if (b.project) return { ok: true, project: b.project, issues: b.issues, repaired: true };
  if (a.project) return { ok: true, project: a.project, issues: a.issues, repaired: false };
  return { ok: false, reason: "invalid_output", problems: b.problems.slice(0, 10) };
}
