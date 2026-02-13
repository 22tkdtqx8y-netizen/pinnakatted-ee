/** Keeled ja vaikimisi keel. */
export const locales = ["et", "fi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "et";

/** Küpsise nimi keele salvestamiseks (cookie-based, ilma /et /fi URLita). */
export const LOCALE_COOKIE_NAME = "locale";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getLocaleFromCookie(cookieValue: string | undefined): Locale {
  return cookieValue === "fi" ? "fi" : "et";
}
