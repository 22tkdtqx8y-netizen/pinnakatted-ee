"use client";

import { useEffect, useState } from "react";
import { LocaleProvider } from "@/lib/LocaleContext";
import type { Locale } from "@/lib/i18n";
import { LOCALE_COOKIE_NAME, getLocaleFromCookie } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SetHtmlLang } from "@/components/SetHtmlLang";

function readLocaleFromCookie(): Locale {
  if (typeof document === "undefined") return "et";
  const val = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${LOCALE_COOKIE_NAME}=`))
    ?.split("=")[1];
  return getLocaleFromCookie(val);
}

export function AppShell({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    const next = readLocaleFromCookie();
    if (next !== locale) setLocale(next);
  }, [locale]);

  return (
    <LocaleProvider locale={locale} setLocale={setLocale}>
      <SetHtmlLang />
      <Header />
      <main className="min-w-0 flex-1">{children}</main>
      <Footer />
    </LocaleProvider>
  );
}
