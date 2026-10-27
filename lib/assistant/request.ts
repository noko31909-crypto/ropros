import { z } from "zod";
import { LOCALES } from "../i18n/config.ts";
import { MAX_MESSAGE_CHARS } from "./history.ts";

/** The browser sends at most MAX_CONTEXT_CHARS of history; a body far larger is not from our UI. */
export const MAX_BODY_CHARS = 128 * 1024;
export const MAX_MESSAGES = 24;

const Body = z.object({
  locale: z.enum(LOCALES),
  guideSlug: z.string().regex(/^[a-z0-9-]{3,64}$/).optional(),
  messages: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string().min(1).max(MAX_MESSAGE_CHARS),
  }).strict()).min(1).max(MAX_MESSAGES),
}).strict();
export type AssistantRequest = z.infer<typeof Body>;

type Parsed = { ok: true; data: AssistantRequest } | { ok: false; status: 400 | 413 | 422; error: string };

/**
 * Parses the POST /api/assistant body. Size and message count are checked before zod: zod 4.1 walks every
 * array element even past .max(), so a body of thousands of {} would cost seconds of CPU and gigabytes of memory.
 */
export function parseAssistantRequest(text: string): Parsed {
  if (text.length > MAX_BODY_CHARS) return { ok: false, status: 413, error: "payload_too_large" };
  let raw: unknown;
  try { raw = JSON.parse(text); } catch { return { ok: false, status: 400, error: "invalid_json" }; }
  const messages = (raw as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(messages) || messages.length > MAX_MESSAGES) return { ok: false, status: 422, error: "invalid_request" };
  const parsed = Body.safeParse(raw);
  if (!parsed.success) return { ok: false, status: 422, error: "invalid_request" };
  const turns = parsed.data.messages;
  if (turns[0]?.role !== "user" || turns.at(-1)?.role !== "user") return { ok: false, status: 422, error: "invalid_request" };
  return { ok: true, data: parsed.data };
}
