export const LOCALES = ["en", "ru", "kk"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "lang";

export const LOCALE_LABEL: Record<Locale, string> = { en: "EN", ru: "RU", kk: "KZ" };
export const LOCALE_NAME: Record<Locale, string> = { en: "English", ru: "Русский", kk: "Қазақша" };
/** BCP-47 tags for <html lang> and Intl formatting. */
export const LOCALE_TAG: Record<Locale, string> = { en: "en", ru: "ru", kk: "kk" };

export const isLocale = (v: unknown): v is Locale => typeof v === "string" && (LOCALES as readonly string[]).includes(v);

/**
 * Every message namespace is one object per locale with the same shape.
 * `defineMessages` makes TypeScript check that ru and kk match en exactly.
 */
export function defineMessages<T>(m: { en: T; ru: NoInfer<T>; kk: NoInfer<T> }): Record<Locale, T> {
  return m;
}
