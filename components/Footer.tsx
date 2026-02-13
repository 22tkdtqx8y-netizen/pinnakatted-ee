"use client";

import Link from "next/link";
import { company } from "@/lib/company";
import { useLocale } from "@/lib/LocaleContext";
import { getMessages } from "@/messages";

const footerLinkKeys = {
  teenused: [
    { href: "/teenused/pur-soojustus", key: "purSoojustus" as const },
    { href: "/thermograafia", key: "thermograafia" as const },
    { href: "/teenused/polurea", key: "polukarbamiid" as const },
  ],
  lehed: [
    { href: "/pur-vahu-hind", key: "purVahuHind" as const },
    { href: "/tehtud-tood", key: "tehtudTood" as const },
    { href: "/remondilaen", key: "remondilaen" as const },
    { href: "/materjalid", key: "materjalid" as const },
    { href: "/kontakt", key: "kontakt" as const },
  ],
};

export function Footer() {
  const locale = useLocale();
  const f = getMessages(locale).common.footer;

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold text-slate-900">{company.siteName}</p>
            <p className="mt-2 text-sm text-slate-600">
              {company.name}. {f.tagline}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Reg. kood: {company.regCode} · KMKR: {company.vatNumber}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">{f.teenused}</h3>
            <ul className="mt-4 space-y-2">
              {footerLinkKeys.teenused.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-600 hover:text-slate-900">
                    {f[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">{f.lehed}</h3>
            <ul className="mt-4 space-y-2">
              {footerLinkKeys.lehed.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-600 hover:text-slate-900">
                    {f[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">{f.kontakt}</h3>
            <ul className="mt-4 space-y-2 text-slate-600">
              <li>
                <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-slate-900">
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="hover:text-slate-900">
                  {company.email}
                </a>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-slate-900">
                  {f.kusiPakkumist}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {company.name}. {f.rights}</p>
        </div>
      </div>
    </footer>
  );
}
