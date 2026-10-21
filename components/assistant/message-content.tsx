"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Check, ChevronDown, Copy, FileCode2 } from "lucide-react";

type Segment = { kind: "text"; text: string } | { kind: "code"; lang: string; code: string };

/** Splits a message on ``` fences. Rendered as plain React text: never as HTML. */
export function parseSegments(src: string): Segment[] {
  const out: Segment[] = [];
  const re = /```([\w+-]*)\n([\s\S]*?)(?:```|$)/g;
  let last = 0; let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    if (m.index > last) out.push({ kind: "text", text: src.slice(last, m.index) });
    out.push({ kind: "code", lang: m[1] || "text", code: (m[2] ?? "").replace(/\n$/, "") });
    last = re.lastIndex;
  }
  if (last < src.length) out.push({ kind: "text", text: src.slice(last) });
  return out;
}

/** Inline code preview: collapsed to 8 lines with a fade, expandable, copyable. */
export function CodePreview({ lang, code }: { lang: string; code: string }) {
  const lines = code.split("\n");
  const long = lines.length > 8;
  const [open, setOpen] = useState(!long);
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1400); } catch { /* clipboard blocked */ } };

  return (
    <div className="my-3 overflow-hidden rounded-xl border border-line bg-[#05080b]">
      <div className="flex items-center justify-between border-b border-line px-3 py-1.5">
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-fg-subtle"><FileCode2 className="h-3.5 w-3.5 text-accent" aria-hidden />{lang} · {lines.length} lines</span>
        <button type="button" onClick={copy} className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[11px] text-fg-muted hover:bg-ink-800 hover:text-fg">
          {copied ? <Check className="h-3 w-3 text-signal" aria-hidden /> : <Copy className="h-3 w-3" aria-hidden />}{copied ? "copied" : "copy"}
        </button>
      </div>
      <div className="relative">
        <pre className={clsx("overflow-x-auto px-3 py-2.5 font-mono text-[12px] leading-5 text-[#d5dee8]", !open && "max-h-[168px] overflow-hidden")}>
          <code>{lines.map((l, i) => <span key={i} className="block"><span className="mr-3 inline-block w-5 select-none text-right text-ink-700">{i + 1}</span>{l || " "}</span>)}</code>
        </pre>
        {!open && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#05080b] to-transparent" />}
      </div>
      {long && (
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}
          className="flex w-full items-center justify-center gap-1 border-t border-line py-1.5 font-mono text-[11px] text-fg-muted hover:bg-ink-900 hover:text-fg">
          <ChevronDown className={clsx("h-3.5 w-3.5 transition-transform", open && "rotate-180")} aria-hidden />{open ? "collapse" : `show all ${lines.length} lines`}
        </button>
      )}
    </div>
  );
}

/** Text with `inline code` and **bold**, rendered safely as React nodes. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("`") && p.endsWith("`") ? <code key={i} className="rounded bg-ink-800 px-1 py-0.5 font-mono text-[0.85em] text-accent">{p.slice(1, -1)}</code>
        : p.startsWith("**") && p.endsWith("**") ? <strong key={i} className="font-semibold text-fg">{p.slice(2, -2)}</strong>
        : <span key={i}>{p}</span>)}
    </>
  );
}

export function MessageContent({ text }: { text: string }) {
  return (
    <>
      {parseSegments(text).map((s, i) =>
        s.kind === "code" ? <CodePreview key={i} lang={s.lang} code={s.code} />
        : <p key={i} className="whitespace-pre-wrap">{s.text.trim() ? <RichText text={s.text.replace(/^\n+|\n+$/g, "")} /> : null}</p>)}
    </>
  );
}
