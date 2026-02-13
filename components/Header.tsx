"use client";

import Link from "next/link";
import { useState } from "react";
import { ButtonLink } from "./ui/Button";
import { LangSwitcher } from "./LangSwitcher";
import { useLocale } from "@/lib/LocaleContext";
import { getMessages } from "@/messages";

const navLinks = [
  { href: "/teenused", key: "teenused" as const },
  { href: "/thermograafia", key: "thermograafia" as const },
  { href: "/tehtud-tood", key: "tehtudTood" as const },
  { href: "/remondilaen", key: "remondilaen" as const },
  { href: "/materjalid", key: "materjalid" as const },
  { href: "/kontakt", key: "kontakt" as const },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const locale = useLocale();
  const t = getMessages(locale).common.nav;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center shrink-0"
          aria-label={`Pinnakatted.ee ${t.avaleht}`}
        >
          <img
            src="/images/logo-pinnakatted.png"
            alt="Pinnakatted.ee"
            width={140}
            height={48}
            className="h-10 w-auto object-contain object-left"
          />
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-1 lg:gap-2" aria-label="Peamine navigatsioon">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              {t[link.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitcher />
          <ButtonLink href="/kontakt" size="sm" className="hidden sm:inline-flex whitespace-nowrap">
            {t.kusiPakkumist}
          </ButtonLink>
          <ButtonLink href="/pur-vahu-hind" variant="primary" size="sm" className="hidden sm:inline-flex whitespace-nowrap">
            {t.purVahuHind}
          </ButtonLink>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t.sulgeMenu : t.avaMenu}
          >
            <span className="sr-only">Menüü</span>
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className="grid overflow-hidden border-t border-slate-200 bg-white transition-[grid-template-rows] duration-200 ease-out md:hidden"
        style={{ gridTemplateRows: mobileOpen ? "1fr" : "0fr" }}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobiilne menüü">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => setMobileOpen(false)}
              >
                {t[link.key]}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-slate-200 pt-4">
              <ButtonLink href="/kontakt" className="w-full justify-center" onClick={() => setMobileOpen(false)}>
                {t.kusiPakkumist}
              </ButtonLink>
              <ButtonLink href="/pur-vahu-hind" variant="primary" className="w-full justify-center" onClick={() => setMobileOpen(false)}>
                {t.arvutaHind}
              </ButtonLink>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
