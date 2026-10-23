"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Check, Copy, FileCode2, FileText } from "lucide-react";
import type { CodeFile } from "@/lib/guides";
import { guideMessages } from "@/lib/i18n/messages/guide";
import { useMessages } from "@/components/i18n/locale-provider";

async function copy(text: string): Promise<boolean> {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
}

/** Code viewer with filename tabs. Plain escaped text rendering (no dangerouslySetInnerHTML). */
export function CodeBlock({ files }: { files: CodeFile[] }) {
  const t = useMessages(guideMessages).code;
  const [idx, setIdx] = useState(0);
  const [copied, setCopied] = useState<"code" | "md" | null>(null);
  const file = files[idx] ?? files[0];
  if (!file) return null;
  const lines = file.source.split("\n");
  const doCopy = async (kind: "code" | "md") => {
    const text = kind === "code" ? file.source : "```" + file.language + "\n" + file.source + "\n```";
    if (await copy(text)) { setCopied(kind); setTimeout(() => setCopied(null), 1600); }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#06090d]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-ink-900 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="hidden gap-1.5 sm:flex" aria-hidden><i className="h-2.5 w-2.5 rounded-full bg-ink-700" /><i className="h-2.5 w-2.5 rounded-full bg-ink-700" /><i className="h-2.5 w-2.5 rounded-full bg-ink-700" /></span>
          <div role="tablist" aria-label="Files" className="flex gap-1 overflow-x-auto [scrollbar-width:none] sm:ml-2">
            {files.map((f, i) => (
              <button key={f.filename} type="button" role="tab" aria-selected={i === idx} onClick={() => { setIdx(i); setCopied(null); }}
                className={clsx("inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-2.5 font-mono text-xs transition-colors",
                  i === idx ? "bg-ink-800 text-fg" : "text-fg-subtle hover:text-fg")}>
                <FileCode2 className={clsx("h-3.5 w-3.5", i === idx && "text-accent")} aria-hidden />{f.filename}
              </button>
            ))}
          </div>
          <span className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] uppercase text-fg-subtle">{file.language}</span>
        </div>
        <div className="flex gap-1.5">
          <button type="button" onClick={() => doCopy("md")} className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs text-fg-muted hover:border-fg-subtle hover:text-fg">
            {copied === "md" ? <Check className="h-3.5 w-3.5 text-signal" aria-hidden /> : <FileText className="h-3.5 w-3.5" aria-hidden />}{copied === "md" ? t.copied : t.markdown}
          </button>
          <button type="button" onClick={() => doCopy("code")} className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-accent px-3 text-xs font-semibold text-ink-950 hover:bg-accent-hover">
            {copied === "code" ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}{copied === "code" ? t.copied : t.copy}
          </button>
        </div>
      </div>
      <pre className="max-h-[560px] overflow-auto py-4 font-mono text-[12px] leading-6 sm:text-[13px]" tabIndex={0} aria-label={t.source(file.filename)}>
        <code>
          {lines.map((line, i) => (
            <span key={i} className="grid grid-cols-[2.5rem_1fr] hover:bg-ink-900/70 sm:grid-cols-[3.5rem_1fr]">
              <span className="select-none pr-3 text-right tabular-nums text-ink-700 sm:pr-4">{i + 1}</span>
              <span className={clsx("whitespace-pre pr-6", line.trimStart().startsWith("//") ? "text-fg-subtle" : "text-[#d5dee8]")}>{line || " "}</span>
            </span>
          ))}
        </code>
      </pre>
      {file.libraries.length > 0 && (
        <div className="border-t border-line px-4 py-2.5 font-mono text-[11px] text-fg-subtle">{t.libraries} {file.libraries.join(" · ")}</div>
      )}
      <span className="sr-only" aria-live="polite">{copied ? t.copiedSr : ""}</span>
    </div>
  );
}
