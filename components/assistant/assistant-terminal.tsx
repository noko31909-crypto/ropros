"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type RefObject } from "react";
import { clsx } from "clsx";
import { Bot, Code2, CornerDownLeft, Paperclip, Sparkles, Square, Trash2, X } from "lucide-react";
import { CodePreview, MessageContent } from "./message-content";
import { useLocale, useMessages } from "@/components/i18n/locale-provider";
import { useAuth } from "@/components/auth/auth-provider";
import { assistant, type ReplyKey } from "@/lib/i18n/messages/assistant";

type Role = "user" | "assistant";
type Message = { id: string; role: Role; text: string; attachment?: string; stopped?: boolean };
export type AssistantContext = { guideSlug?: string; guideTitle?: string };

const MAX_PROMPT = 4000;
const MAX_ATTACHMENT = 8000;

/** Picks a canned reply. Matches English, Russian and Kazakh keywords so free text works in every locale. */
function pickReply(prompt: string, key?: ReplyKey): ReplyKey {
  if (key) return key;
  if (/loop|оптимиз|оңтайланд|delay|millis/i.test(prompt)) return "loop";
  if (/pinout|pin|распин|пин/i.test(prompt)) return "pinout";
  if (/esp32/i.test(prompt)) return "esp32";
  return "jitter";
}

/** Sample answer used only when the server has no API key configured (demo mode). */
/**
 * Streams a real answer from POST /api/assistant (the server holds the API key, validates, rate-limits and
 * adds the guide's wiring + code). Yields text chunks; throws LiveError with a reason the UI can show.
 */
class LiveError extends Error { constructor(public reason: "demo" | "signIn" | "rateLimited" | "error") { super(reason); } }
async function* liveStream(body: unknown, signal: AbortSignal): AsyncGenerator<string> {
  const res = await fetch("/api/assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal });
  if (res.status === 503) throw new LiveError("demo");
  if (res.status === 401) throw new LiveError("signIn");
  if (res.status === 429) throw new LiveError("rateLimited");
  if (!res.ok || !res.body) throw new LiveError("error");
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) return;
    yield decoder.decode(value, { stream: true });
  }
}

async function* mockStream(reply: string, signal: AbortSignal): AsyncGenerator<string> {
  for (const chunk of reply.match(/.{1,6}/gs) ?? []) {
    if (signal.aborted) return;
    await new Promise((r) => setTimeout(r, 18));
    if (signal.aborted) return;
    yield chunk;
  }
}

const uid = () => Math.random().toString(36).slice(2, 10);

type Props = {
  context?: AssistantContext;
  /** Shown as a close button in the title bar (drawer mode). */
  onClose?: () => void;
  inputRef?: RefObject<HTMLTextAreaElement | null>;
  className?: string;
};

/** Terminal-style chat: transcript, quick suggestions, composer with code attachment, stop and clear. */
export function AssistantTerminal({ context, onClose, inputRef, className }: Props) {
  const t = useMessages(assistant);
  const { locale } = useLocale();
  const { openAuth } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [attachment, setAttachment] = useState("");
  const [showAttach, setShowAttach] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const localInput = useRef<HTMLTextAreaElement>(null);
  const taRef = inputRef ?? localInput;

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages]);
  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(async (text: string, key?: ReplyKey) => {
    const prompt = text.trim().slice(0, MAX_PROMPT);
    const att = attachment.trim().slice(0, MAX_ATTACHMENT);
    if ((!prompt && !att) || streaming) return;
    const assistantId = uid();
    setMessages((m) => [...m, { id: uid(), role: "user", text: prompt || t.attached, attachment: att || undefined }, { id: assistantId, role: "assistant", text: "" }]);
    setInput(""); setAttachment(""); setShowAttach(false); setStreaming(true);
    const ctrl = new AbortController(); abortRef.current = ctrl;
    const append = (chunk: string) => setMessages((m) => m.map((msg) => (msg.id === assistantId ? { ...msg, text: msg.text + chunk } : msg)));
    const history = [...messages, { role: "user" as const, text: prompt || t.attached, attachment: att || undefined }]
      .filter((m) => m.text.trim())
      .slice(-12)
      .map((m) => ({ role: m.role, content: m.attachment ? `${m.text}\n\n\`\`\`\n${m.attachment}\n\`\`\`` : m.text }));
    try {
      try {
        for await (const chunk of liveStream({ locale, guideSlug: context?.guideSlug, messages: history }, ctrl.signal)) {
          append(chunk);
        }
      } catch (err) {
        if (ctrl.signal.aborted) { /* stopped by the user */ }
        else if (err instanceof LiveError && err.reason === "demo") {
          append(`${t.live.demo}\n\n`);
          for await (const chunk of mockStream(t.replies[pickReply(prompt, key)], ctrl.signal)) append(chunk);
        } else if (err instanceof LiveError && err.reason === "signIn") { append(t.live.signIn); openAuth(t.live.signIn); }
        else append(err instanceof LiveError && err.reason === "rateLimited" ? t.live.rateLimited : t.live.error);
      }
      // Server status markers can arrive split across chunks, so translate them on the finished text.
      setMessages((m) => m.map((msg) => (msg.id === assistantId ? { ...msg, text: msg.text
        .replace("[refused]", t.live.refused).replace("[truncated]", t.live.truncated)
        .replace(/\[error:(\d{3})\]/, (_m, code: string) => t.live.provider(code)).replace("[error]", t.live.error) } : msg)));
      if (ctrl.signal.aborted) setMessages((m) => m.map((msg) => (msg.id === assistantId ? { ...msg, stopped: true } : msg)));
    } finally { setStreaming(false); abortRef.current = null; }
  }, [attachment, streaming, t, messages, locale, context?.guideSlug, openAuth]);

  const clear = () => { abortRef.current?.abort(); setMessages([]); };
  const onSubmit = (e: FormEvent) => { e.preventDefault(); void send(input); };
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(input); } };
  const path = context?.guideSlug ? `~/guides/${context.guideSlug}` : "~";

  return (
    <div className={clsx("flex min-h-0 flex-col bg-[#070a0e]", className)}>
      {/* Title bar */}
      <header className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="flex gap-1.5" aria-hidden><i className="h-3 w-3 rounded-full bg-[#ff5f57]" /><i className="h-3 w-3 rounded-full bg-[#febc2e]" /><i className="h-3 w-3 rounded-full bg-[#28c840]" /></span>
        <p className="flex-1 truncate font-mono text-xs text-fg-muted"><span className="text-signal">ropros</span>@assistant <span className="text-fg-subtle">{path}</span></p>
        <button type="button" onClick={clear} aria-label={t.clear} title={t.clear} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-subtle hover:bg-ink-800 hover:text-fg"><Trash2 className="h-4 w-4" aria-hidden /></button>
        {onClose && <button type="button" onClick={onClose} aria-label={t.close} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-subtle hover:bg-ink-800 hover:text-fg"><X className="h-4 w-4" aria-hidden /></button>}
      </header>
      {context?.guideTitle && (
        <div className="flex items-center gap-2 border-b border-line bg-signal-soft px-4 py-2 font-mono text-[11px] text-signal">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal motion-reduce:animate-none" />{t.contextLoaded(context.guideTitle)}
        </div>
      )}

      {/* Transcript */}
      <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto px-4 py-5 [background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px)] [background-size:100%_22px]" aria-live="polite">
        {messages.length === 0 && (
          <div className="pt-6 font-mono text-[13px] leading-6 text-fg-muted">
            <p><span className="text-signal">$</span> ropros assistant --help</p>
            <p className="mt-2 text-fg-subtle">{t.help}</p>
            <p className="mt-4 text-fg-subtle"><span className="text-accent">↵</span> {t.keys.send} · <span className="text-accent">shift+↵</span> {t.keys.newline}{onClose && <> · <span className="text-accent">esc</span> {t.keys.close}</>}</p>
            <p className="mt-4 text-[11px] text-fg-subtle">{t.mockNote}</p>
          </div>
        )}
        {messages.map((m, i) => {
          const isUser = m.role === "user";
          const live = streaming && i === messages.length - 1 && !isUser;
          return (
            <div key={m.id} className={clsx("flex animate-fade-up gap-2.5", isUser && "flex-row-reverse")}>
              <span className={clsx("mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border font-mono text-[10px]",
                isUser ? "border-accent/30 bg-accent-soft text-accent" : "border-signal/30 bg-signal-soft text-signal")}>
                {isUser ? t.you : <Bot className="h-3.5 w-3.5" aria-hidden />}
              </span>
              <div className={clsx("min-w-0 max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed",
                isUser ? "rounded-tr-md bg-accent text-ink-950" : "rounded-tl-md border border-line bg-ink-900 text-fg-muted")}>
                {isUser ? (
                  <>
                    <p className="whitespace-pre-wrap break-words font-medium">{m.text}</p>
                    {m.attachment && <div className="mt-2 text-fg"><CodePreview lang="attached" code={m.attachment} /></div>}
                  </>
                ) : m.text ? (
                  <div className="space-y-2">
                    <MessageContent text={m.text} />
                    {live && <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-signal" aria-hidden />}
                    {m.stopped && <p className="font-mono text-[11px] text-fg-subtle">^C {t.stopped}</p>}
                  </div>
                ) : m.stopped ? (
                  <p className="font-mono text-[11px] text-fg-subtle">^C {t.stopped}</p>
                ) : (
                  <p className="font-mono text-xs text-signal">{t.thinking}<span className="animate-blink">_</span></p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick suggestions */}
      <div className="flex gap-2 overflow-x-auto border-t border-line px-4 py-3 [scrollbar-width:none]">
        {t.suggestions.map((s) => (
          <button key={s.key} type="button" disabled={streaming} onClick={() => void send(s.prompt, s.key)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-ink-900 px-2.5 py-1.5 font-mono text-[11px] text-fg-muted transition-colors hover:border-signal/50 hover:text-fg disabled:opacity-40">
            <Sparkles className="h-3 w-3 text-signal" aria-hidden />{s.label}
          </button>
        ))}
      </div>

      {/* Composer */}
      <form onSubmit={onSubmit} className="border-t border-line p-3">
        {showAttach && (
          <div className="mb-2">
            <label htmlFor="assistant-attach" className="mb-1 block font-mono text-[11px] text-fg-subtle">{t.attachLabel}</label>
            <textarea id="assistant-attach" value={attachment} onChange={(e) => setAttachment(e.target.value)} rows={4} maxLength={MAX_ATTACHMENT}
              className="w-full resize-y rounded-xl border border-line bg-[#05080b] p-2.5 font-mono text-xs text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none"
              placeholder="avrdude: stk500_recv(): programmer is not responding…" />
            {attachment.trim() && <div className="mt-1"><CodePreview lang="preview" code={attachment} /></div>}
          </div>
        )}
        <div className="flex items-end gap-2 rounded-xl border border-line bg-ink-900 p-2 focus-within:border-accent/60">
          <span className="pb-2 pl-1 font-mono text-sm text-signal" aria-hidden>❯</span>
          <label htmlFor="assistant-input" className="sr-only">{t.message}</label>
          <textarea id="assistant-input" ref={taRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKeyDown}
            rows={1} maxLength={MAX_PROMPT} placeholder={t.placeholder}
            className="max-h-32 min-h-[36px] flex-1 resize-none bg-transparent py-2 font-mono text-[13px] text-fg placeholder:text-fg-subtle focus:outline-none" />
          <button type="button" onClick={() => setShowAttach((v) => !v)} aria-pressed={showAttach} aria-label={t.attach}
            className={clsx("inline-flex h-9 w-9 items-center justify-center rounded-lg", showAttach ? "bg-accent-soft text-accent" : "text-fg-subtle hover:bg-ink-800 hover:text-fg")}>
            {showAttach ? <Code2 className="h-4 w-4" aria-hidden /> : <Paperclip className="h-4 w-4" aria-hidden />}
          </button>
          {streaming ? (
            <button type="button" onClick={() => abortRef.current?.abort()} aria-label={t.stop}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-fg hover:border-fg-subtle"><Square className="h-3.5 w-3.5 fill-current" aria-hidden /></button>
          ) : (
            <button type="submit" disabled={!input.trim() && !attachment.trim()} aria-label={t.send}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-ink-950 transition-colors hover:bg-accent-hover disabled:bg-ink-800 disabled:text-fg-subtle"><CornerDownLeft className="h-4 w-4" aria-hidden /></button>
          )}
        </div>
        <p className="mt-2 px-1 font-mono text-[10px] text-fg-subtle">{t.disclaimer}</p>
      </form>
    </div>
  );
}
