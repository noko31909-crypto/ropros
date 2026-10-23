import "server-only";

/** Default OpenRouter model; override with OPENROUTER_MODEL (any id from openrouter.ai/models). */
export const OPENROUTER_DEFAULT_MODEL = "anthropic/claude-sonnet-4.5";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export class OpenRouterError extends Error {
  constructor(public status: number) { super(`openrouter ${status}`); }
}

/**
 * Streams text from OpenRouter's chat completions endpoint (server-sent events).
 * The key stays on the server; callers pass only validated messages.
 */
export async function* streamOpenRouter(messages: ChatMessage[], signal: AbortSignal): AsyncGenerator<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    signal,
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "X-Title": "ropros Build Assistant",
      ...(process.env.NEXT_PUBLIC_SITE_URL ? { "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL } : {}),
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL?.trim() || OPENROUTER_DEFAULT_MODEL,
      messages,
      max_tokens: 4000,
      stream: true,
    }),
  });
  if (!res.ok || !res.body) throw new OpenRouterError(res.status);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) return;
    buffer += decoder.decode(value, { stream: true });
    let nl: number;
    while ((nl = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, nl).trim();
      buffer = buffer.slice(nl + 1);
      if (!line.startsWith("data:")) continue; // skips ": OPENROUTER PROCESSING" keep-alive comments
      const data = line.slice(5).trim();
      if (data === "[DONE]") return;
      try {
        const chunk = JSON.parse(data) as { choices?: { delta?: { content?: string }; finish_reason?: string | null }[]; error?: { message?: string } };
        if (chunk.error) throw new OpenRouterError(502);
        const text = chunk.choices?.[0]?.delta?.content;
        if (text) yield text;
        if (chunk.choices?.[0]?.finish_reason === "length") yield "\n\n[truncated]";
      } catch (e) {
        if (e instanceof OpenRouterError) throw e; // a malformed keep-alive line is ignored
      }
    }
  }
}
