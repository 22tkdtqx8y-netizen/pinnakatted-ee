"use client";

import Link from "next/link";
import { useLocale } from "@/lib/LocaleContext";
import { getMessages } from "@/messages";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/FAQAccordion";
import { services } from "@/content/services";
import { servicesFi } from "@/content/servicesFi";
import { faqPur, faqPolurea } from "@/content/faq";
import { faqPurFi, faqPolureaFi } from "@/content/faq";
import type { ServiceKey } from "@/content/services";

const slugToKey: Record<string, ServiceKey> = {
  "pur-soojustus": "pur",
  polurea: "polurea",
};

export function ServiceDetailContent({ slug }: { slug: string }) {
  const locale = useLocale();
  const key = slugToKey[slug];
  const labels = getMessages(locale).serviceDetail;
  const s = (locale === "fi" ? servicesFi[key] : services[key]) as (typeof services.pur | typeof services.polurea);
  const faq =
    locale === "fi"
      ? (key === "pur" ? faqPurFi : faqPolureaFi)
      : (key === "pur" ? faqPur : faqPolurea);

  const isPur = slug === "pur-soojustus";
  const pur = isPur ? (s as typeof services.pur) : null;

  return (
    <>
      <Section className="bg-slate-50">
        <Container>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {s.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">{s.description}</p>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <h2 className="text-2xl font-bold text-slate-900">
            {labels.problemSolutionTitle}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-semibold text-slate-900">{labels.problemLabel}</h3>
              <p className="mt-2 text-slate-600">{s.problem}</p>
            </div>
            <div className="rounded-xl border border-primary-200 bg-primary-50/50 p-6">
              <h3 className="font-semibold text-slate-900">{labels.solutionLabel}</h3>
              <p className="mt-2 text-slate-600">{s.solution}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <h2 className="text-2xl font-bold text-slate-900">{labels.whereTitle}</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {s.where.map((w) => (
              <li
                key={w}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
              >
                {w}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {isPur && pur?.howItWorks && (
        <Section className="bg-white">
          <Container>
            <h2 className="text-2xl font-bold text-slate-900">
              {labels.howItWorksTitle}
            </h2>
            <ul className="mt-6 space-y-3 text-slate-700">
              {pur.howItWorks.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {isPur && pur?.openVsClosed && (
        <Section className="bg-slate-50">
          <Container>
            <h2 className="text-2xl font-bold text-slate-900">
              {labels.openVsClosedTitle}
            </h2>
            <p className="mt-3 text-slate-600">{pur.openVsClosed.intro}</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">
                  {pur.openVsClosed.open.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {pur.openVsClosed.open.desc}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">
                  {pur.openVsClosed.closed.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {pur.openVsClosed.closed.desc}
                </p>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {isPur && pur?.sprayVsInject && (
        <Section className="bg-white">
          <Container>
            <h2 className="text-2xl font-bold text-slate-900">
              {labels.sprayInjectTitle}
            </h2>
            <p className="mt-3 text-slate-600">{pur.sprayVsInject.intro}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-bold text-slate-900">
                  {pur.sprayVsInject.spray.title}
                </h3>
                <p className="mt-2 text-slate-600">
                  {pur.sprayVsInject.spray.desc}
                </p>
                <p className="mt-3 text-sm font-semibold text-slate-700">
                  {pur.sprayVsInject.spray.suitableLabel}
                </p>
                <ul className="mt-1 list-inside list-disc text-sm text-slate-600">
                  {pur.sprayVsInject.spray.suitableList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-semibold text-primary-600">
                  {pur.sprayVsInject.spray.benefitsLabel}
                </p>
                <ul className="mt-1 space-y-0.5 text-sm text-slate-600">
                  {pur.sprayVsInject.spray.benefitsList.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-bold text-slate-900">
                  {pur.sprayVsInject.inject.title}
                </h3>
                <p className="mt-2 text-slate-600">
                  {pur.sprayVsInject.inject.desc}
                </p>
                <p className="mt-3 text-sm font-semibold text-slate-700">
                  {pur.sprayVsInject.inject.suitableLabel}
                </p>
                <ul className="mt-1 list-inside list-disc text-sm text-slate-600">
                  {pur.sprayVsInject.inject.suitableList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm font-semibold text-primary-600">
                  {pur.sprayVsInject.inject.benefitsLabel}
                </p>
                <ul className="mt-1 space-y-0.5 text-sm text-slate-600">
                  {pur.sprayVsInject.inject.benefitsList.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/80 px-6 py-4 text-sm text-slate-700">
              <strong className="text-slate-900">{labels.whyMattersTitle}</strong>{" "}
              {pur.sprayVsInject.whyMatters}
            </div>
          </Container>
        </Section>
      )}

      {isPur && pur?.thermography && (
        <Section className="bg-slate-50">
          <Container>
            <h2 className="text-2xl font-bold text-slate-900">
              {pur.thermography.title}
            </h2>
            <p className="mt-3 text-slate-600">{pur.thermography.intro}</p>
            <ul className="mt-4 space-y-2 text-slate-700">
              {pur.thermography.list.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary-600">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button asChild variant="primary" size="sm">
                <Link href="/thermograafia">{pur.thermography.linkText}</Link>
              </Button>
            </div>
          </Container>
        </Section>
      )}

      {!isPur && "note" in s && s.note && (
        <Section className="bg-white">
          <Container>
            <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <strong>{labels.polureaNoteLabel}</strong> {s.note}
            </p>
          </Container>
        </Section>
      )}

      <Section
        className={isPur ? "bg-white" : "bg-slate-50"}
      >
        <Container>
          <h2 className="text-2xl font-bold text-slate-900">
            {isPur ? labels.benefitsTitlePur : labels.benefitsTitlePolurea}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {s.benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-slate-700">{b}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {isPur && pur?.whoIsItFor && pur.whoIsItFor.length > 0 && (
        <Section className="bg-slate-50">
          <Container>
            <h2 className="text-2xl font-bold text-slate-900">
              {labels.whoIsItForTitle}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {pur.whoIsItFor.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <Section className="bg-slate-50">
        <Container>
          <h2 className="text-2xl font-bold text-slate-900">
            {labels.processTitle}
          </h2>
          <ol className="mt-6 space-y-4">
            {s.process.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-slate-700">{step}</span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {faq.length > 0 && (
        <Section className="bg-white">
          <Container>
            <h2 className="text-2xl font-bold text-slate-900">
              {labels.faqTitle}
            </h2>
            <FAQAccordion items={faq} className="mt-6" />
          </Container>
        </Section>
      )}

      <Section className="bg-primary-600">
        <Container>
          <div className="mx-auto max-w-2xl text-center text-white">
            <h2 className="text-2xl font-bold">{s.ctaTitle}</h2>
            <p className="mt-3 text-primary-100">{s.ctaDescription}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="min-h-[48px] border-2 border-white bg-white text-primary-700 hover:bg-primary-50"
              >
                <Link href="/pur-vahu-hind">{labels.ctaPurHind}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="min-h-[48px] border-2 border-white bg-transparent text-white hover:bg-white/10"
              >
                <Link href="/kontakt">{labels.ctaContact}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
