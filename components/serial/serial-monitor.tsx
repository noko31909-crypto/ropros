"use client";

import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { clsx } from "clsx";
import { Download, Eraser, Info, Plug, RotateCcw, Send, Unplug } from "lucide-react";
import { useMessages } from "@/components/i18n/locale-provider";
import { serialMessages } from "@/lib/i18n/messages/serial";
import { BAUD_RATES, LINE_ENDINGS, LineSplitter, cleanSerialText, describePort, timeStamp, type BaudRate, type LineEnding } from "@/lib/serial";

// The parts of Web Serial used here (not in TypeScript's DOM library). https://wicg.github.io/serial/
type SerialPortLike = {
  open(options: { baudRate: number }): Promise<void>;
  close(): Promise<void>;
  readonly readable: ReadableStream<Uint8Array> | null;
  readonly writable: WritableStream<Uint8Array> | null;
  setSignals(signals: { dataTerminalReady?: boolean; requestToSend?: boolean }): Promise<void>;
  getInfo(): { usbVendorId?: number; usbProductId?: number };
};
type SerialLike = { requestPort(): Promise<SerialPortLike> };
const webSerial = (): SerialLike | undefined => (navigator as Navigator & { serial?: SerialLike }).serial;

/** Older lines are dropped so a chatty board cannot grow the page without limit. */
const MAX_LINES = 2000;
type Line = { id: number; at: number; text: string; sent?: boolean };
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const Row = memo(function Row({ line, stamps }: { line: Line; stamps: boolean }) {
  return (
    <div className={clsx("whitespace-pre-wrap break-all", line.sent && "text-accent")}>
      {stamps && <span className="select-none text-fg-subtle">{timeStamp(line.at)}  </span>}
      {line.sent && <span className="select-none">→ </span>}{line.text || " "}
    </div>
  );
});

/**
 * Talks to a board over USB with Web Serial (Chrome, Edge, Opera on a computer). Everything stays in the browser.
 * The output is rendered as text, so whatever the board prints can never become markup.
 */
export function SerialMonitor({ initialBaud }: { initialBaud: BaudRate }) {
  const t = useMessages(serialMessages);
  const tRef = useRef(t);
  useEffect(() => { tRef.current = t; }, [t]);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [status, setStatus] = useState<"idle" | "connecting" | "connected">("idle");
  const [portName, setPortName] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [baud, setBaud] = useState<BaudRate>(initialBaud);
  const [ending, setEnding] = useState<LineEnding>("lf");
  const [lines, setLines] = useState<Line[]>([]);
  const [pending, setPending] = useState("");
  const [autoscroll, setAutoscroll] = useState(true);
  const [stamps, setStamps] = useState(false);
  const [input, setInput] = useState("");

  const portRef = useRef<SerialPortLike | null>(null);
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null);
  const reading = useRef<Promise<void> | null>(null);
  const keepReading = useRef(false);
  const splitter = useRef(new LineSplitter());
  const queued = useRef<Line[]>([]);
  const frame = useRef<number | null>(null);
  const nextId = useRef(0);
  const outRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setSupported(typeof navigator !== "undefined" && !!webSerial()); }, []);

  // Output is applied once per animation frame, however fast the board prints.
  const flush = useCallback(() => {
    frame.current = null;
    const add = queued.current;
    queued.current = [];
    if (add.length) setLines((l) => { const n = l.concat(add); return n.length > MAX_LINES ? n.slice(n.length - MAX_LINES) : n; });
    setPending(cleanSerialText(splitter.current.pending));
  }, []);
  const schedule = useCallback(() => { if (frame.current === null) frame.current = requestAnimationFrame(flush); }, [flush]);
  const pushLine = useCallback((text: string, sent?: boolean) => {
    queued.current.push({ id: nextId.current++, at: Date.now(), text, ...(sent ? { sent } : {}) });
    schedule();
  }, [schedule]);

  const readLoop = useCallback(async (port: SerialPortLike) => {
    const decoder = new TextDecoder();
    while (keepReading.current && port.readable) {
      const reader = port.readable.getReader();
      readerRef.current = reader;
      try {
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          if (value) for (const line of splitter.current.push(decoder.decode(value, { stream: true }))) pushLine(cleanSerialText(line));
          schedule();
        }
      } catch {
        // Framing or buffer errors keep the port readable and the loop opens a new reader. An unplugged board ends it.
      } finally {
        reader.releaseLock();
        readerRef.current = null;
      }
    }
  }, [pushLine, schedule]);

  const start = useCallback(async (port: SerialPortLike, rate: BaudRate) => {
    await port.open({ baudRate: rate });
    keepReading.current = true;
    splitter.current.reset();
    reading.current = readLoop(port).then(async () => {
      if (!keepReading.current) return;   // closed on purpose
      keepReading.current = false;
      try { await port.close(); } catch { /* already gone */ }
      portRef.current = null;
      setStatus("idle");
      setNotice(tRef.current.lost);
    });
  }, [readLoop]);

  const stop = useCallback(async () => {
    keepReading.current = false;
    try { await readerRef.current?.cancel(); } catch { /* reader already released */ }
    await reading.current;
    reading.current = null;
    try { await portRef.current?.close(); } catch { /* already closed */ }
  }, []);

  useEffect(() => () => {
    void stop();
    if (frame.current !== null) cancelAnimationFrame(frame.current);
  }, [stop]);

  useLayoutEffect(() => {
    if (autoscroll && outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight;
  }, [lines, pending, autoscroll]);

  const connect = async () => {
    const serial = webSerial();
    if (!serial) return;
    setNotice(null);
    let port: SerialPortLike;
    try { port = await serial.requestPort(); } catch { return; }   // the picker was closed
    setStatus("connecting");
    try {
      await start(port, baud);
      portRef.current = port;
      setPortName(describePort(port.getInfo()) ?? t.usbDevice);
      setStatus("connected");
    } catch {
      setStatus("idle");
      setNotice(t.busy);
    }
  };

  const disconnect = async () => {
    await stop();
    portRef.current = null;
    setStatus("idle");
  };

  const changeBaud = async (next: BaudRate) => {
    setBaud(next);
    const port = portRef.current;
    if (!port || status !== "connected") return;
    setStatus("connecting");
    await stop();
    try { await start(port, next); setStatus("connected"); }
    catch { portRef.current = null; setStatus("idle"); setNotice(t.busy); }
  };

  /** Hard reset over the auto-reset circuit: RTS pulls EN (ESP32) low, a fresh DTR edge resets an Arduino. */
  const reset = async () => {
    const port = portRef.current;
    if (!port) return;
    try {
      await port.setSignals({ dataTerminalReady: false, requestToSend: true });
      await wait(100);
      await port.setSignals({ dataTerminalReady: false, requestToSend: false });
      await wait(50);
      await port.setSignals({ dataTerminalReady: true, requestToSend: true });
    } catch { setNotice(t.readError); }
  };

  const send = async (e: FormEvent) => {
    e.preventDefault();
    const port = portRef.current;
    if (!port?.writable || status !== "connected") return;
    const writer = port.writable.getWriter();
    try {
      await writer.write(new TextEncoder().encode(input + LINE_ENDINGS[ending]));
      pushLine(input, true);
      setInput("");
    } catch { setNotice(t.readError); }
    finally { writer.releaseLock(); }
  };

  const save = () => {
    const body = lines.map((l) => `${stamps ? `${timeStamp(l.at)}  ` : ""}${l.sent ? "> " : ""}${l.text}`).join("\n") + (pending ? `\n${pending}` : "");
    const url = URL.createObjectURL(new Blob([body], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `serial-${new Date().toISOString().replace(/[:.]/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const clear = () => { setLines([]); queued.current = []; };

  if (supported === null) return <div aria-hidden className="h-[420px] animate-pulse rounded-[28px] border border-line bg-ink-900 motion-reduce:animate-none" />;

  const connected = status === "connected";
  const select = "h-10 rounded-xl border border-line bg-ink-900 px-3 text-base text-fg focus:border-accent focus:outline-none sm:text-sm";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="min-w-0">
        {!supported ? (
          <div className="rounded-[28px] border border-line bg-ink-850 p-6 sm:p-8">
            <Unplug className="h-6 w-6 text-fg-subtle" aria-hidden />
            <h2 className="mt-4 text-xl font-semibold text-fg">{t.unsupportedTitle}</h2>
            <p className="mt-2 max-w-xl text-fg-muted">{t.unsupportedBody}</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-[28px] border border-line bg-ink-900">
            <div className="flex flex-wrap items-center gap-3 border-b border-line p-4">
              {connected ? (
                <button type="button" onClick={() => void disconnect()}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-ink-700 bg-ink-850 px-4 text-sm font-semibold text-fg hover:border-fg-subtle">
                  <Unplug className="h-4 w-4" aria-hidden />{t.disconnect}
                </button>
              ) : (
                <button type="button" onClick={() => void connect()} disabled={status === "connecting"}
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-ink-950 shadow-glow hover:bg-accent-hover disabled:opacity-60">
                  <Plug className="h-4 w-4" aria-hidden />{status === "connecting" ? t.connecting : t.connect}
                </button>
              )}
              <label className="flex items-center gap-2 text-sm text-fg-muted">
                <span>{t.baud}</span>
                <select value={baud} onChange={(e) => void changeBaud(Number(e.target.value) as BaudRate)} disabled={status === "connecting"} className={select}>
                  {BAUD_RATES.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </label>
              <button type="button" onClick={() => void reset()} disabled={!connected} title={t.resetHint}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-line px-3 text-sm text-fg-muted hover:text-fg disabled:opacity-40">
                <RotateCcw className="h-4 w-4" aria-hidden />{t.reset}
              </button>
              <p className="flex min-w-0 items-center gap-2 text-sm text-fg-subtle sm:ml-auto" aria-live="polite">
                <span className={clsx("h-2 w-2 shrink-0 rounded-full", connected ? "bg-signal" : "bg-ink-700")} aria-hidden />
                <span className="truncate">{connected ? t.connected(portName) : status === "connecting" ? t.connecting : t.idle}</span>
              </p>
            </div>
            {notice && <p role="alert" className="border-b border-line bg-accent-soft px-4 py-3 text-sm text-fg">{notice}</p>}
            <div ref={outRef} role="log" aria-live="off" aria-label={t.output} tabIndex={0}
              className="h-[50vh] min-h-[300px] overflow-y-auto bg-ink-950 p-4 font-mono text-[13px] leading-relaxed text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent">
              {lines.length === 0 && !pending ? (
                <p className="text-fg-subtle">{connected ? t.waiting : t.empty}</p>
              ) : (
                <>
                  {lines.map((l) => <Row key={l.id} line={l} stamps={stamps} />)}
                  {pending && <div className="whitespace-pre-wrap break-all text-fg-muted">{pending}</div>}
                </>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line px-4 py-3 text-sm text-fg-muted">
              <label className="inline-flex items-center gap-2"><input type="checkbox" checked={autoscroll} onChange={(e) => setAutoscroll(e.target.checked)} className="h-4 w-4 accent-accent" />{t.autoscroll}</label>
              <label className="inline-flex items-center gap-2"><input type="checkbox" checked={stamps} onChange={(e) => setStamps(e.target.checked)} className="h-4 w-4 accent-accent" />{t.timestamps}</label>
              <span className="font-mono text-xs text-fg-subtle">{t.lines(lines.length)}</span>
              <span className="ml-auto flex gap-2">
                <button type="button" onClick={clear} disabled={!lines.length && !pending} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line px-3 hover:text-fg disabled:opacity-40"><Eraser className="h-4 w-4" aria-hidden />{t.clear}</button>
                <button type="button" onClick={save} disabled={!lines.length && !pending} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line px-3 hover:text-fg disabled:opacity-40"><Download className="h-4 w-4" aria-hidden />{t.save}</button>
              </span>
            </div>
            <form onSubmit={(e) => void send(e)} className="flex flex-col gap-2 border-t border-line p-4 sm:flex-row">
              <label className="sr-only" htmlFor="serial-input">{t.sendLabel}</label>
              <input id="serial-input" value={input} onChange={(e) => setInput(e.target.value)} disabled={!connected} placeholder={t.sendPlaceholder} autoComplete="off" spellCheck={false}
                className="h-10 min-w-0 flex-1 rounded-xl border border-line bg-ink-950 px-3 font-mono text-base text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none disabled:opacity-50 sm:text-sm" />
              <label className="sr-only" htmlFor="serial-ending">{t.lineEnding}</label>
              <select id="serial-ending" value={ending} onChange={(e) => setEnding(e.target.value as LineEnding)} className={select}>
                {(Object.keys(LINE_ENDINGS) as LineEnding[]).map((k) => <option key={k} value={k}>{t.endings[k]}</option>)}
              </select>
              <button type="submit" disabled={!connected}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-ink-950 hover:bg-accent-hover disabled:opacity-50">
                <Send className="h-4 w-4" aria-hidden />{t.send}
              </button>
            </form>
          </div>
        )}
      </div>
      <aside className="lg:pt-1">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-fg"><Info className="h-4 w-4 text-fg-subtle" aria-hidden />{t.tipsTitle}</h2>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-fg-muted">
          {t.tips.map((tip) => <li key={tip} className="border-l border-line pl-3">{tip}</li>)}
        </ul>
      </aside>
    </div>
  );
}
