"use client";

import { useLocale, useSetLocale } from "@/lib/LocaleContext";
import { getMessages } from "@/messages";
import { LOCALE_COOKIE_NAME } from "@/lib/i18n";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function setLocaleCookie(locale: string) {
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function LangSwitcher() {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const langLabels = getMessages(locale).common.lang;

  const handleSwitch = (newLocale: "et" | "fi") => {
    if (newLocale === locale) return;
    setLocaleCookie(newLocale);
    setLocale(newLocale);
  };

  return (
    <span className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-sm">
      <button
        type="button"
        onClick={() => handleSwitch("et")}
        className={locale === "et" ? "font-semibold text-slate-900" : "text-slate-500 hover:text-slate-700"}
        aria-pressed={locale === "et"}
      >
        {langLabels.et}
      </button>
      <span className="text-slate-300" aria-hidden>|</span>
      <button
        type="button"
        onClick={() => handleSwitch("fi")}
        className={locale === "fi" ? "font-semibold text-slate-900" : "text-slate-500 hover:text-slate-700"}
        aria-pressed={locale === "fi"}
      >
        {langLabels.fi}
      </button>
    </span>
  );
}
