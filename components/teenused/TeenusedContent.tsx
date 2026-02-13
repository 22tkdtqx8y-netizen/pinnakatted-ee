"use client";

import Link from "next/link";
import { useLocale } from "@/lib/LocaleContext";
import { getMessages } from "@/messages";
import { Section, Container } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { services } from "@/content/services";

export function TeenusedContent() {
  const locale = useLocale();
  const t = getMessages(locale).services;
  const nav = getMessages(locale).common.nav;
  const pur = services.pur;
  const polurea = services.polurea;

  return (
    <>
      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t.title}
            </h1>
            <p className="mt-4 text-lg text-slate-600">{t.intro}</p>
          </div>
          <div className="mt-12 space-y-8">
            <Card className="p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-slate-900">{t.pur.title}</h2>
              <p className="mt-3 text-slate-600">{t.pur.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="font-medium text-slate-700">{t.suitable}</span>
                {t.pur.where.map((w) => (
                  <li key={w} className="rounded-full bg-slate-100 px-3 py-1">
                    {w}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href={`/teenused/${pur.slug}`}
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                >
                  {nav.vaataLahemalt}
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
                <Button asChild variant="primary" size="sm">
                  <Link href="/pur-vahu-hind">{nav.arvutaHind}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/kontakt">{nav.kusiPakkumist}</Link>
                </Button>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                {t.polurea.title}
                {t.polurea.subtitle ? (
                  <span className="ml-1 text-lg font-normal text-slate-500">
                    {t.polurea.subtitle}
                  </span>
                ) : null}
              </h2>
              <p className="mt-3 text-slate-600">{t.polurea.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="font-medium text-slate-700">{t.suitable}</span>
                {t.polurea.where.map((w) => (
                  <li key={w} className="rounded-full bg-slate-100 px-3 py-1">
                    {w}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href={`/teenused/${polurea.slug}`}
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                >
                  {nav.vaataLahemalt}
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
                <Button asChild variant="primary" size="sm">
                  <Link href="/kontakt">{nav.kusiPakkumist}</Link>
                </Button>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                {t.thermografia.title}
              </h2>
              <p className="mt-3 text-slate-600">{t.thermografia.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="font-medium text-slate-700">{t.suitable}</span>
                {t.thermografia.suitableFor.map((w) => (
                  <li
                    key={w}
                    className="rounded-full bg-slate-100 px-3 py-1"
                  >
                    {w}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/thermograafia"
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                >
                  {nav.vaataLahemalt}
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
                <Button asChild variant="primary" size="sm">
                  <Link href="/kontakt?thermograafia=1">
                    {t.thermografia.cta}
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
