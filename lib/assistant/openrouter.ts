import "server-only";

/**
 * Default: free OpenRouter models (":free" ids cost nothing and work without credits, with daily limits).
 * Tried in order when an id is unknown or retired. Override with OPENROUTER_MODEL (any id from openrouter.ai/models).
 */
export const OPENROUTER_FREE_MODELS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "google/gemma-3-27b-it:free",
  "deepseek/deepseek-chat-v3-0324:free",
  "mistralai/mistral-small-3.1-24b-instruct:free",
] as const;

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export class OpenRouterError extends Error {
  constructor(public status: number) { super(`openrouter ${status}`); }
}

/**
 * Streams text from OpenRouter's chat completions endpoint (server-sent events).
 * The key stays on the server; callers pass only validated messages.
 */
export async function* streamOpenRouter(messages: ChatMessage[], signal: AbortSignal): AsyncGenerator<string> {
  const configured = process.env.OPENROUTER_MODEL?.trim();
  const candidates = configured ? [configured] : [...OPENROUTER_FREE_MODELS];
  let res!: Response;
  for (const model of candidates) {
    res = await request(model, messages, signal);
    // Unknown, retired or overloaded free model: try the next one.
    if (![400, 404, 429, 503].includes(res.status)) break;
    console.error("openrouter model unavailable, trying next", { model, status: res.status, detail: (await res.text()).slice(0, 200) });
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
