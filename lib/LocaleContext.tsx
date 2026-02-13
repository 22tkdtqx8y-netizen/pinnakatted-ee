"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  setLocale,
  children,
}: {
  locale: Locale;
  setLocale: (next: Locale) => void;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx.locale;
}

export function useSetLocale(): (next: Locale) => void {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useSetLocale must be used within LocaleProvider");
  return ctx.setLocale;
}
