"use client";

import { Suspense } from "react";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { company } from "@/lib/company";
import { useLocale } from "@/lib/LocaleContext";
import { getMessages } from "@/messages";
import { KontaktFormWrapper } from "./KontaktFormWrapper";

export function KontaktContent() {
  const locale = useLocale();
  const t = getMessages(locale).contact;

  return (
    <>
      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.title}</h1>
            <p className="mt-4 text-lg text-slate-600">{t.intro}</p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{t.contactDetails}</h2>
              <p className="mt-2 text-slate-700 font-semibold">{company.name}</p>
              <p className="text-sm text-slate-500">Reg. kood: {company.regCode} · KMKR: {company.vatNumber}</p>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li>
                  <strong className="text-slate-900">{t.address}</strong> {company.address}
                </li>
                <li>
                  <strong className="text-slate-900">{t.phone}</strong>{" "}
                  <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-brand">
                    {company.phone}
                  </a>
                </li>
                <li>
                  <strong className="text-slate-900">{t.email}</strong>{" "}
                  <a href={`mailto:${company.email}`} className="hover:text-brand">
                    {company.email}
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-slate-600">
                <strong className="text-slate-900">{t.workArea}</strong> {t.workAreaValue}
              </p>
              <div className="mt-6">
                <Button asChild variant="primary" size="lg" className="min-h-[48px]">
                  <a href={`tel:${company.phone.replace(/\s/g, "")}`}>{t.callNow}</a>
                </Button>
              </div>
              <p className="mt-4">
                <a
                  href={company.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-lg bg-slate-100 px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-200 hover:text-slate-900"
                >
                  <svg className="h-8 w-8 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  {t.ourFacebook}
                </a>
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900">{t.sendInquiry}</h2>
              <p className="mt-2 text-slate-600">{t.formIntro}</p>
              <Suspense fallback={<div className="mt-6 min-h-[200px] animate-pulse rounded-lg bg-slate-200" />}>
                <KontaktFormWrapper />
              </Suspense>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
