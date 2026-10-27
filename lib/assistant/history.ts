export type ChatTurn = { role: "user" | "assistant"; content: string };

/** Chat history sent per request, in characters. The browser trims to it and the server enforces it. */
export const MAX_CONTEXT_CHARS = 24_000;
/** Longest single message the server accepts. */
export const MAX_MESSAGE_CHARS = 12_000;

/**
 * Newest turns that fit in maxChars, so one request's cost stays bounded however long the chat gets.
 * The latest question always stays, and the kept history starts on a user turn as the providers expect.
 */
export function recentHistory(messages: ChatTurn[], maxChars: number): ChatTurn[] {
  const kept: ChatTurn[] = [];
  let total = 0;
  for (const turn of [...messages].reverse()) {
    total += turn.content.length;
    if (kept.length && total > maxChars) break;
    kept.unshift(turn);
  }
  while (kept.length > 1 && kept[0]?.role !== "user") kept.shift();
  return kept;
}
