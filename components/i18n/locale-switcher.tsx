"use client";

import { clsx } from "clsx";
import { LOCALES, LOCALE_LABEL, LOCALE_NAME } from "@/lib/i18n/config";
import { useLocale } from "./locale-provider";

export function LocaleSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  return (
    <div role="group" aria-label="Language" className={clsx("inline-flex h-9 items-center rounded-lg border border-line bg-ink-900 p-0.5", className)}>
      {LOCALES.map((l) => (
        <button key={l} type="button" onClick={() => setLocale(l)} aria-pressed={locale === l} title={LOCALE_NAME[l]} lang={l}
          className={clsx("h-8 rounded-md px-2 font-mono text-[11px] font-semibold transition-colors",
            locale === l ? "bg-ink-800 text-fg" : "text-fg-subtle hover:text-fg-muted")}>
          {LOCALE_LABEL[l]}
        </button>
      ))}
    </div>
  );
}
