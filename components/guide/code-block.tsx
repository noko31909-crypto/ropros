"use client";

import { useState } from "react";
import { Check, Copy, FileCode2, FileText } from "lucide-react";
import type { CodeFile } from "@/lib/guides";

async function copy(text: string): Promise<boolean> {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
}

/** Plain, escaped rendering (no dangerouslySetInnerHTML). Add a highlighter like Shiki on the server later. */
export function CodeBlock({ file }: { file: CodeFile }) {
  const [copied, setCopied] = useState<"code" | "md" | null>(null);
  const lines = file.source.split("\n");
  const markdown = "```" + file.language + "\n" + file.source + "\n```";
  const doCopy = async (kind: "code" | "md") => {
    if (await copy(kind === "code" ? file.source : markdown)) { setCopied(kind); setTimeout(() => setCopied(null), 1600); }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#06090d]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-ink-900 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="flex gap-1.5" aria-hidden><i className="h-2.5 w-2.5 rounded-full bg-ink-700" /><i className="h-2.5 w-2.5 rounded-full bg-ink-700" /><i className="h-2.5 w-2.5 rounded-full bg-ink-700" /></span>
          <FileCode2 className="ml-2 h-4 w-4 text-accent" aria-hidden />
          <span className="font-mono text-xs text-fg">{file.filename}</span>
          <span className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] uppercase text-fg-subtle">{file.language}</span>
        </div>
        <div className="flex gap-1.5">
          <button type="button" onClick={() => doCopy("md")} className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs text-fg-muted hover:border-fg-subtle hover:text-fg">
            {copied === "md" ? <Check className="h-3.5 w-3.5 text-signal" aria-hidden /> : <FileText className="h-3.5 w-3.5" aria-hidden />}{copied === "md" ? "Copied" : "Markdown"}
          </button>
          <button type="button" onClick={() => doCopy("code")} className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-accent px-3 text-xs font-semibold text-ink-950 hover:bg-accent-hover">
            {copied === "code" ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}{copied === "code" ? "Copied" : "Copy code"}
          </button>
        </div>
      </div>
      <pre className="max-h-[560px] overflow-auto py-4 font-mono text-[13px] leading-6" tabIndex={0} aria-label={`${file.filename} source`}>
        <code>
          {lines.map((line, i) => (
            <span key={i} className="grid grid-cols-[3.5rem_1fr] hover:bg-ink-900/70">
              <span className="select-none pr-4 text-right tabular-nums text-ink-700">{i + 1}</span>
              <span className="whitespace-pre pr-6 text-[#d5dee8]">{line || " "}</span>
            </span>
          ))}
        </code>
      </pre>
      {file.libraries.length > 0 && (
        <div className="border-t border-line px-4 py-2.5 font-mono text-[11px] text-fg-subtle">Libraries: {file.libraries.join(" · ")}</div>
      )}
      <span className="sr-only" aria-live="polite">{copied ? "Copied to clipboard" : ""}</span>
    </div>
  );
}
