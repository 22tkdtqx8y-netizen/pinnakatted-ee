"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { LOCALE_COOKIE_NAME, isValidLocale } from "@/lib/i18n";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export default function LocaleRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale as string | undefined;

  useEffect(() => {
    const l = (typeof locale === "string" && isValidLocale(locale)) ? locale : "et";
    document.cookie = `${LOCALE_COOKIE_NAME}=${l}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    router.replace("/");
  }, [locale, router]);

  return (
    <div className="flex min-h-[40vh] items-center justify-center text-slate-500">
      <p>Suuname avalehele…</p>
    </div>
  );
}
