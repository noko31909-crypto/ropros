import "server-only";

type ModelInfo = { id: string; pricing?: { prompt?: string; completion?: string }; architecture?: { output_modalities?: string[] } };
let cached: { at: number; ids: string[] } | undefined;

/**
 * Cheapest usable models from OpenRouter's live catalogue (free ":free" models first, then lowest price),
 * cached for an hour, so retired model ids never break the assistant. OPENROUTER_MODEL overrides this.
 */
export async function cheapestModels(limit = 4): Promise<string[]> {
  if (cached && Date.now() - cached.at < 3_600_000) return cached.ids;
  try {
    const res = await fetch("https://openrouter.ai/api/v1/models", { headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` } });
    if (!res.ok) throw new Error(String(res.status));
    const { data } = (await res.json()) as { data: ModelInfo[] };
    const price = (m: ModelInfo) => Number(m.pricing?.prompt ?? NaN) + Number(m.pricing?.completion ?? NaN);
    const ids = data
      .filter((m) => Number.isFinite(price(m)) && price(m) >= 0 && !m.id.startsWith("openrouter/")
        && (m.architecture?.output_modalities ?? ["text"]).includes("text"))
      .sort((x, y) => price(x) - price(y) || Number(y.id.endsWith(":free")) - Number(x.id.endsWith(":free")))
      .slice(0, limit)
      .map((m) => m.id);
    if (ids.length) { cached = { at: Date.now(), ids }; return ids; }
  } catch (err) {
    console.error("openrouter model list failed", { detail: String(err) });
  }
  return ["openrouter/auto"];
}

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
  const candidates = configured ? [configured] : await cheapestModels();
  let res!: Response;
  for (const model of candidates) {
    res = await request(model, messages, signal);
    // Unknown, retired or overloaded model: drop the cached list and try the next one.
    if (![400, 404, 429, 503].includes(res.status)) break;
    if (res.status === 404) cached = undefined;
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
