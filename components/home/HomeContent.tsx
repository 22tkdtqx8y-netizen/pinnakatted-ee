"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Section, Container } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/lib/LocaleContext";
import { getMessages } from "@/messages";
import { services } from "@/content/services";
import { getProjects } from "@/lib/projects";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Testimonials } from "@/components/home/Testimonials";
import { ProjectGrid } from "@/components/ProjectGrid";
import { FAQAccordion } from "@/components/FAQAccordion";
import { faqHome } from "@/content/faq";
import { faqHomeFi } from "@/content/faq";

export function HomeContent() {
  const locale = useLocale();
  const t = getMessages(locale).home;
  const pv = t.pihustamineVsInjekteerimine;
  const th = t.thermograafia;
  const teenused = t.teenused;
  const projects = t.projects;
  const nav = getMessages(locale).common.nav;
  const svc = getMessages(locale).services;
  const projectsList = useMemo(() => getProjects(), []);
  const faqItems = locale === "fi" ? faqHomeFi : faqHome;

  return (
    <>
      <TrustStrip />
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
          <div className="mt-12 space-y-8">
            <Card className="p-8 sm:p-10">
              <h3 className="text-2xl font-bold text-slate-900">{svc.pur.title}</h3>
              <p className="mt-3 text-slate-600">{svc.pur.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="font-medium text-slate-700">{svc.suitable}</span>
                {svc.pur.where.map((w) => (
                  <li key={w} className="rounded-full bg-slate-100 px-3 py-1">{w}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href={`/teenused/${services.pur.slug}`} className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
                  {nav.vaataLahemalt}
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
              <h3 className="text-2xl font-bold text-slate-900">
                {svc.polurea.title}
                {svc.polurea.subtitle ? ` ${svc.polurea.subtitle}` : ""}
              </h3>
              <p className="mt-3 text-slate-600">{svc.polurea.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="font-medium text-slate-700">{svc.suitable}</span>
                {svc.polurea.where.map((w) => (
                  <li key={w} className="rounded-full bg-slate-100 px-3 py-1">{w}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href={`/teenused/${services.polurea.slug}`} className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
                  {nav.vaataLahemalt}
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Button asChild variant="primary" size="sm">
                  <Link href="/kontakt">{nav.kusiPakkumist}</Link>
                </Button>
              </div>
            </Card>
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-slate-900">{svc.thermografia.title}</h3>
              <p className="mt-3 text-slate-600">{svc.thermografia.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="font-medium text-slate-700">{svc.suitable}</span>
                {svc.thermografia.suitableFor.map((s) => (
                  <li key={s} className="rounded-full bg-slate-100 px-3 py-1">{s}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/thermograafia" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
                  {nav.vaataLahemalt}
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Button asChild variant="primary" size="sm">
                  <Link href="/kontakt?thermograafia=1">{svc.thermografia.cta}</Link>
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{projects.title}</h2>
            <p className="mt-3 text-slate-600">{projects.intro}</p>
          </div>
          <ProjectGrid projects={projectsList} />
          <div className="mt-8 flex justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/tehtud-tood">{projects.link}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Testimonials />

      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900">{t.faqTitle}</h2>
            <FAQAccordion items={faqItems} className="mt-6" />
          </div>
        </Container>
      </Section>
    </>
  );
}
