"use client";

import { useEffect } from "react";
import { useLocale } from "@/lib/LocaleContext";

export function SetHtmlLang() {
  const locale = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale === "fi" ? "fi" : "et";
  }, [locale]);
  return null;
}
