"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { clsx } from "clsx";
import { Bot, Code2, CornerDownLeft, Paperclip, Sparkles, Square, Terminal, Trash2, X } from "lucide-react";
import { CodePreview, MessageContent } from "./message-content";

type Role = "user" | "assistant";
type Message = { id: string; role: Role; text: string; attachment?: string };
export type AssistantContext = { guideSlug?: string; guideTitle?: string };

const SUGGESTIONS = [
  { label: "Explain this pinout", prompt: "Explain this guide’s pinout: what each wire does and why those pins were chosen." },
  { label: "Optimize this loop", prompt: "Optimize the main loop: remove blocking delays and keep the robot responsive." },
  { label: "Why does my servo jitter?", prompt: "My servo jitters when the motors start. What should I check first?" },
  { label: "Port to ESP32", prompt: "How would I port this build to an ESP32? Flag any 3.3 V issues." },
];

/**
 * Front-end mock. Replace with a streaming call to your server route (e.g. POST /api/assistant),
 * which holds the API key, validates input and injects the guide's wiring + code as context.
 */
async function* mockStream(prompt: string, signal: AbortSignal): AsyncGenerator<string> {
  const reply = /loop/i.test(prompt)
    ? "The loop blocks on `delay()` during every scan, so the robot can’t react mid-turn. Use **millis()-based timing** instead:\n```cpp\nunsigned long last = 0;\nvoid loop() {\n  if (millis() - last >= 60) {\n    last = millis();\n    long d = readCm();\n    if (d > STOP_CM) drive(SPEED, SPEED);\n    else startScan();      // non-blocking state machine\n  }\n  updateScan();            // advances the servo one step\n}\n```\nThis keeps distance checks running at ~16 Hz while the servo sweeps."
    : /pinout/i.test(prompt)
    ? "**ENA (D5) / ENB (D6)** set motor speed with PWM. **IN1–IN4 (D7, D8, D4, D2)** set direction. The servo sits on **D3** because the Servo library disables PWM on D9 and D10 on the Uno, which would break the speed pins.\n\nHC-SR04 **TRIG → A0**, **ECHO → A1**: analog pins work fine as digital I/O and keep D-pins free."
    : "Most jitter comes from power, not code. Check these in order:\n1. Servo powered from the Arduino 5 V pin? Move it to a separate 5 V supply and **join the grounds**.\n2. Add a `470 µF` capacitor across the servo’s power leads.\n3. Keep signal wires away from motor leads.";
  for (const chunk of reply.match(/.{1,6}/gs) ?? []) {
    if (signal.aborted) return;
    await new Promise((r) => setTimeout(r, 18));
    yield chunk;
  }
}

const uid = () => Math.random().toString(36).slice(2, 10);

export function AssistantDrawer({ context }: { context?: AssistantContext }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [attachment, setAttachment] = useState("");
  const [showAttach, setShowAttach] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Ctrl/⌘ + J toggles the panel; Esc closes it
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") { e.preventDefault(); setOpen((v) => !v); }
      else if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
    else launcherRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages]);

  const send = useCallback(async (text: string) => {
    const prompt = text.trim().slice(0, 4000);
    const att = attachment.trim().slice(0, 8000);
    if ((!prompt && !att) || streaming) return;
    const assistantId = uid();
    setMessages((m) => [...m, { id: uid(), role: "user", text: prompt || "(attached code)", attachment: att || undefined }, { id: assistantId, role: "assistant", text: "" }]);
    setInput(""); setAttachment(""); setShowAttach(false); setStreaming(true);
    const ctrl = new AbortController(); abortRef.current = ctrl;
    try {
      for await (const chunk of mockStream(prompt, ctrl.signal)) {
        setMessages((m) => m.map((msg) => (msg.id === assistantId ? { ...msg, text: msg.text + chunk } : msg)));
      }
    } finally { setStreaming(false); abortRef.current = null; }
  }, [attachment, streaming]);

  const onSubmit = (e: FormEvent) => { e.preventDefault(); void send(input); };
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(input); } };
  const path = context?.guideSlug ? `~/guides/${context.guideSlug}` : "~";

  return (
    <>
      {/* Launcher */}
      <button ref={launcherRef} type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}
        className={clsx("fixed bottom-6 right-6 z-40 inline-flex h-12 items-center gap-2.5 rounded-2xl border border-signal/30 bg-ink-900/90 pl-3.5 pr-4 font-mono text-sm text-fg shadow-[0_18px_50px_-12px_rgba(46,230,201,.45)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-signal/60",
          open && "pointer-events-none translate-y-4 opacity-0")}>
        <Terminal className="h-4 w-4 text-signal" aria-hidden />ask ropros
        <kbd className="rounded-md border border-line bg-ink-850 px-1.5 py-0.5 text-[10px] text-fg-subtle">⌘J</kbd>
      </button>

      {/* Backdrop (mobile/tablet) */}
      <div aria-hidden onClick={() => setOpen(false)}
        className={clsx("fixed inset-0 z-40 bg-ink-950/60 backdrop-blur-sm transition-opacity lg:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")} />

      {/* Panel */}
      <aside role="dialog" aria-modal="true" aria-label="ropros AI assistant" aria-hidden={!open} inert={!open}
        className={clsx("fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-line bg-[#070a0e]/97 shadow-[-30px_0_80px_-20px_rgba(0,0,0,.7)] backdrop-blur-2xl transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] sm:w-[460px]",
          open ? "translate-x-0" : "pointer-events-none translate-x-full")}>
        {/* Title bar */}
        <header className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="flex gap-1.5" aria-hidden><i className="h-3 w-3 rounded-full bg-[#ff5f57]" /><i className="h-3 w-3 rounded-full bg-[#febc2e]" /><i className="h-3 w-3 rounded-full bg-[#28c840]" /></span>
          <p className="flex-1 truncate font-mono text-xs text-fg-muted"><span className="text-signal">ropros</span>@assistant <span className="text-fg-subtle">{path}</span></p>
          <button type="button" onClick={() => { abortRef.current?.abort(); setMessages([]); }} aria-label="Clear conversation" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-subtle hover:bg-ink-800 hover:text-fg"><Trash2 className="h-4 w-4" aria-hidden /></button>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-fg-subtle hover:bg-ink-800 hover:text-fg"><X className="h-4 w-4" aria-hidden /></button>
        </header>
        {context?.guideTitle && (
          <div className="flex items-center gap-2 border-b border-line bg-signal-soft px-4 py-2 font-mono text-[11px] text-signal">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />context loaded: {context.guideTitle} (wiring, code, known issues)
          </div>
        )}

        {/* Transcript */}
        <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto px-4 py-5 [background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px)] [background-size:100%_22px]" aria-live="polite">
          {messages.length === 0 && (
            <div className="pt-6 font-mono text-[13px] leading-6 text-fg-muted">
              <p><span className="text-signal">$</span> ropros assistant --help</p>
              <p className="mt-2 text-fg-subtle">Ask about wiring, code or debugging. I read the guide you’re on.</p>
              <p className="mt-4 text-fg-subtle"><span className="text-accent">↵</span> send · <span className="text-accent">shift+↵</span> new line · <span className="text-accent">esc</span> close</p>
            </div>
          )}
          {messages.map((m, i) => {
            const isUser = m.role === "user";
            const live = streaming && i === messages.length - 1 && !isUser;
            return (
              <div key={m.id} className={clsx("flex animate-fade-up gap-2.5", isUser && "flex-row-reverse")}>
                <span className={clsx("mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border font-mono text-[10px]",
                  isUser ? "border-accent/30 bg-accent-soft text-accent" : "border-signal/30 bg-signal-soft text-signal")}>
                  {isUser ? "you" : <Bot className="h-3.5 w-3.5" aria-hidden />}
                </span>
                <div className={clsx("max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed",
                  isUser ? "rounded-tr-md bg-accent text-ink-950" : "rounded-tl-md border border-line bg-ink-900 text-fg-muted")}>
                  {isUser ? (
                    <>
                      <p className="whitespace-pre-wrap font-medium">{m.text}</p>
                      {m.attachment && <div className="mt-2 text-fg"><CodePreview lang="attached" code={m.attachment} /></div>}
                    </>
                  ) : m.text ? (
                    <div className="space-y-2"><MessageContent text={m.text} />{live && <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-signal" aria-hidden />}</div>
                  ) : (
                    <p className="font-mono text-xs text-signal">thinking<span className="animate-blink">_</span></p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick suggestions */}
        <div className="flex gap-2 overflow-x-auto border-t border-line px-4 py-3 [scrollbar-width:none]">
          {SUGGESTIONS.map((s) => (
            <button key={s.label} type="button" disabled={streaming} onClick={() => void send(s.prompt)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-ink-900 px-2.5 py-1.5 font-mono text-[11px] text-fg-muted transition-colors hover:border-accent/50 hover:text-fg disabled:opacity-40">
              <Sparkles className="h-3 w-3 text-accent" aria-hidden />{s.label}
            </button>
          ))}
        </div>

        {/* Composer */}
        <form onSubmit={onSubmit} className="border-t border-line p-3">
          {showAttach && (
            <div className="mb-2">
              <label htmlFor="assistant-attach" className="mb-1 block font-mono text-[11px] text-fg-subtle">paste code or a serial log</label>
              <textarea id="assistant-attach" value={attachment} onChange={(e) => setAttachment(e.target.value)} rows={4} maxLength={8000}
                className="w-full resize-y rounded-xl border border-line bg-[#05080b] p-2.5 font-mono text-xs text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none"
                placeholder="avrdude: stk500_recv(): programmer is not responding…" />
              {attachment.trim() && <div className="mt-1"><CodePreview lang="preview" code={attachment} /></div>}
            </div>
          )}
          <div className="flex items-end gap-2 rounded-xl border border-line bg-ink-900 p-2 focus-within:border-accent/60">
            <span className="pb-2 pl-1 font-mono text-sm text-signal" aria-hidden>❯</span>
            <label htmlFor="assistant-input" className="sr-only">Message</label>
            <textarea id="assistant-input" ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKeyDown}
              rows={1} maxLength={4000} placeholder="ask about wiring, code, errors…"
              className="max-h-32 min-h-[36px] flex-1 resize-none bg-transparent py-2 font-mono text-[13px] text-fg placeholder:text-fg-subtle focus:outline-none" />
            <button type="button" onClick={() => setShowAttach((v) => !v)} aria-pressed={showAttach} aria-label="Attach code"
              className={clsx("inline-flex h-9 w-9 items-center justify-center rounded-lg", showAttach ? "bg-accent-soft text-accent" : "text-fg-subtle hover:bg-ink-800 hover:text-fg")}>
              {showAttach ? <Code2 className="h-4 w-4" aria-hidden /> : <Paperclip className="h-4 w-4" aria-hidden />}
            </button>
            {streaming ? (
              <button type="button" onClick={() => abortRef.current?.abort()} aria-label="Stop generating"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-fg hover:border-fg-subtle"><Square className="h-3.5 w-3.5 fill-current" aria-hidden /></button>
            ) : (
              <button type="submit" disabled={!input.trim() && !attachment.trim()} aria-label="Send"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-ink-950 transition-colors hover:bg-accent-hover disabled:bg-ink-800 disabled:text-fg-subtle"><CornerDownLeft className="h-4 w-4" aria-hidden /></button>
            )}
          </div>
          <p className="mt-2 px-1 font-mono text-[10px] text-fg-subtle">Answers can be wrong. Check wiring against datasheets before powering.</p>
        </form>
      </aside>
    </>
  );
}
