"use client";

import Link from "next/link";
import { useLocale } from "@/lib/LocaleContext";
import { getMessages } from "@/messages";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { services } from "@/content/services";

export function MaterjalidContent() {
  const locale = useLocale();
  const m = getMessages(locale).materjalid;
  const svc = getMessages(locale).services;

  return (
    <>
      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {m.title}
            </h1>
            <p className="mt-4 text-lg text-slate-600">{m.intro}</p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900">{m.purTitle}</h2>
              <p className="mt-4 text-slate-600">{svc.pur.description}</p>
              <ul className="mt-4 space-y-2 text-slate-700">
                {svc.pur.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="text-primary-600">✓</span> {b}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-500">
                {m.usageLabel} {svc.pur.where.join(", ")}.
              </p>
              <Button asChild variant="primary" className="mt-6">
                <Link href={`/teenused/${services.pur.slug}`}>{m.purServiceLink}</Link>
              </Button>
            </Card>
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900">{m.polureaTitle}</h2>
              <p className="mt-4 text-slate-600">{svc.polurea.description}</p>
              <ul className="mt-4 space-y-2 text-slate-700">
                {svc.polurea.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="text-primary-600">✓</span> {b}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-500">
                {m.usageLabel} {svc.polurea.where.join(", ")}.
              </p>
              <Button asChild variant="primary" className="mt-6">
                <Link href={`/teenused/${services.polurea.slug}`}>
                  {m.polureaServiceLink}
                </Link>
              </Button>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-xl font-bold text-slate-900">{m.needAdviceTitle}</h2>
            <p className="mt-2 text-slate-600">{m.needAdviceIntro}</p>
            <Button asChild variant="primary" size="lg" className="mt-6">
              <Link href="/kontakt">{m.contactLink}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
