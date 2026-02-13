"use client";

import Link from "next/link";
import { Section, Container } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/lib/LocaleContext";
import { getMessages } from "@/messages";
import { services } from "@/content/services";

export function HomeContent() {
  const locale = useLocale();
  const t = getMessages(locale).home;
  const pv = t.pihustamineVsInjekteerimine;
  const th = t.thermograafia;
  const teenused = t.teenused;
  const nav = getMessages(locale).common.nav;

  return (
    <>
      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{pv.title}</h2>
            <p className="mt-3 text-slate-600">{pv.intro}</p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-slate-900">{pv.pihustamine.title}</h3>
              <p className="mt-2 text-slate-600">{pv.pihustamine.desc}</p>
              <p className="mt-3 text-sm font-medium text-slate-700">{pv.pihustamine.suitable}</p>
              <ul className="mt-1 list-inside list-disc text-sm text-slate-600">
                {pv.pihustamine.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm font-medium text-slate-700">{pv.pihustamine.benefits}</p>
              <ul className="mt-1 list-inside list-disc text-sm text-slate-600">
                {pv.pihustamine.benefitsList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold text-slate-900">{pv.injekteerimine.title}</h3>
              <p className="mt-2 text-slate-600">{pv.injekteerimine.desc}</p>
              <p className="mt-3 text-sm font-medium text-slate-700">{pv.injekteerimine.suitable}</p>
              <ul className="mt-1 list-inside list-disc text-sm text-slate-600">
                {pv.injekteerimine.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm font-medium text-slate-700">{pv.injekteerimine.benefits}</p>
              <ul className="mt-1 list-inside list-disc text-sm text-slate-600">
                {pv.injekteerimine.benefitsList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>
          <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50/50 p-4">
            <p className="font-medium text-slate-800">{pv.whyMattersTitle}</p>
            <p className="mt-1 text-slate-600">{pv.whyMatters}</p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{th.title}</h2>
            <p className="mt-3 text-slate-600">{th.intro}</p>
            <Button asChild variant="primary" className="mt-4">
              <Link href="/thermograafia">{th.link}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{teenused.title}</h2>
            <p className="mt-3 text-slate-600">{teenused.intro}</p>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="primary" size="lg">
              <Link href={`/teenused/${services.pur.slug}`}>{nav.vaataLahemalt} – PUR</Link>
            </Button>
            <Button asChild size="lg">
              <Link href={`/teenused/${services.polurea.slug}`}>{nav.vaataLahemalt} – Polüurea</Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/pur-vahu-hind">{nav.arvutaHind}</Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/kontakt">{nav.kusiPakkumist}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
