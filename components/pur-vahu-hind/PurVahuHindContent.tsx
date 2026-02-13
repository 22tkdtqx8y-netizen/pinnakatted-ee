"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useLocale } from "@/lib/LocaleContext";
import { getMessages } from "@/messages";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PurVahuHindCalculator } from "@/components/PurVahuHindCalculator";
import { faqPurVahuHind } from "@/content/faqPurVahuHind";
import { faqPurVahuHindFi } from "@/content/faqPurVahuHindFi";

function FaqJsonLd({ faq }: { faq: readonly { q: string; a: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PurVahuHindContent() {
  const locale = useLocale();
  const t = getMessages(locale).purVahuHind;
  const nav = getMessages(locale).common.nav;
  const faq = locale === "fi" ? faqPurVahuHindFi : faqPurVahuHind;

  return (
    <>
      <FaqJsonLd faq={faq} />
      <Section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]" aria-hidden />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t.title}
            </h1>
            <p className="mt-4 text-lg text-slate-600">{t.intro1}</p>
            <p className="mt-2 text-slate-600">{t.intro2}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="primary" size="lg" className="min-h-[48px] shadow-md">
                <Link href="#kalkulaator">{t.ctaCalculate}</Link>
              </Button>
              <Button asChild size="lg" className="min-h-[48px] border-2 border-slate-300">
                <Link href="/kontakt">{t.ctaInquiry}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900">{t.sectionTitle}</h2>
            <p className="mt-4 text-slate-600">{t.sectionIntro}</p>
            <ul className="mt-6 space-y-2 text-slate-700">
              {t.dependsOn.map((item) => (
                <li key={item.slice(0, 30)} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section id="kalkulaator" className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-6xl">
            <Suspense
              fallback={
                <div className="mx-auto max-w-2xl rounded-2xl border-2 border-slate-200 bg-slate-50 p-12 text-center">
                  <p className="text-slate-600">{t.calculatorLoading}</p>
                </div>
              }
            >
              <PurVahuHindCalculator />
            </Suspense>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900">{t.usageTitle}</h2>
            <p className="mt-4 text-slate-600">{t.usageIntro1}</p>
            <p className="mt-3 text-slate-600">{t.usageIntro2}</p>
          </div>
        </Container>
      </Section>

      <Section className="bg-amber-50/60">
        <Container>
          <div className="mx-auto max-w-3xl rounded-xl border border-amber-200 bg-white px-6 py-5">
            <p className="text-sm text-slate-700">
              <strong className="text-slate-900">NB!</strong> {t.disclaimer}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900">{t.faqTitle}</h2>
            <dl className="mt-8 space-y-6">
              {faq.map((item) => (
                <div key={item.q}>
                  <dt className="text-base font-semibold text-slate-900">{item.q}</dt>
                  <dd className="mt-2 text-slate-600">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-bold text-slate-900">{t.ctaPreciseTitle}</h2>
            <p className="mt-3 text-slate-600">{t.ctaPreciseIntro}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button asChild variant="primary" size="lg" className="min-h-[48px]">
                <Link href="/kontakt">{t.ctaInquiry}</Link>
              </Button>
              <Button asChild size="lg" className="min-h-[48px] border-2 border-slate-300">
                <Link href="/teenused/pur-soojustus">{t.purServiceLink}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
