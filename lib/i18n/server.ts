import "server-only";
import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "./config";

/** Locale for server components: the `lang` cookie, else the browser's Accept-Language, else English. */
export async function getLocale(): Promise<Locale> {
  const fromCookie = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;
  const accept = (await headers()).get("accept-language")?.toLowerCase() ?? "";
  if (accept.startsWith("ru")) return "ru";
  if (accept.startsWith("kk")) return "kk";
  return DEFAULT_LOCALE;
}
