"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";

type Ctx = { locale: Locale; setLocale: (l: Locale) => void };
const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({ initial, children }: { initial: Locale; children: ReactNode }) {
  const [locale, setState] = useState<Locale>(initial);
  const router = useRouter();
  const setLocale = useCallback((l: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = l;
    setState(l);
    router.refresh(); // re-render server components in the new language
  }, [router]);
  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}

/** Pick the current locale's slice of a `defineMessages(...)` namespace. */
export function useMessages<T>(messages: Record<Locale, T>): T {
  return messages[useLocale().locale];
}
