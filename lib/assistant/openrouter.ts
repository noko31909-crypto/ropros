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
  const configured = process.env.OPENROUTER_MODEL?.trim() || OPENROUTER_DEFAULT_MODEL;
  let res = await request(configured, messages, signal);
  // Unknown or unavailable model id (400/404): retry once with OpenRouter's automatic model choice.
  if ((res.status === 400 || res.status === 404) && configured !== "openrouter/auto") {
    console.error("openrouter model rejected, retrying with openrouter/auto", { model: configured, status: res.status, detail: (await res.text()).slice(0, 300) });
    res = await request("openrouter/auto", messages, signal);
  }
  if (!res.ok || !res.body) {
    console.error("openrouter request failed", { status: res.status, detail: (await res.text().catch(() => "")).slice(0, 300) });
    throw new OpenRouterError(res.status);
  }
  yield* readStream(res.body);
}

function request(model: string, messages: ChatMessage[], signal: AbortSignal): Promise<Response> {
  return fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    signal,
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "X-Title": "ropros Build Assistant",
      ...(process.env.NEXT_PUBLIC_SITE_URL ? { "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL } : {}),
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 4000,
      stream: true,
    }),
  });
}

async function* readStream(stream: ReadableStream<Uint8Array>): AsyncGenerator<string> {
  const reader = stream.getReader();
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
        if (chunk.error) { console.error("openrouter stream error", { detail: chunk.error.message?.slice(0, 300) }); throw new OpenRouterError(502); }
        const text = chunk.choices?.[0]?.delta?.content;
        if (text) yield text;
        if (chunk.choices?.[0]?.finish_reason === "length") yield "\n\n[truncated]";
      } catch (e) {
        if (e instanceof OpenRouterError) throw e; // a malformed keep-alive line is ignored
      }
    }
  }
}
