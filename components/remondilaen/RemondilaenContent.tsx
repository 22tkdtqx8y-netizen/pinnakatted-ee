"use client";

import Link from "next/link";
import { useLocale } from "@/lib/LocaleContext";
import { getMessages } from "@/messages";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

const LHV_REMONDILAEN_URL =
  "https://partners.lhv.ee/assets/templates/repair-loan.html?product=HRL&intrest=7%2C9&contract_fee=2&code=14588801&price=2000&creditPeriod=40&disclaimer_intrest=15%2C90&disclaimer_period=24&roh=18%2C64&contract_fee_sum=40&creditAmount=2000%2C00&totalSum=2630%2C48&returnSum=2590%2C48";

export function RemondilaenContent() {
  const locale = useLocale();
  const t = getMessages(locale).remondilaen;

  return (
    <>
      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  {t.title}
                </h1>
                <p className="mt-3 text-lg text-slate-600">{t.intro}</p>
              </div>
              <Button asChild variant="primary" size="lg" className="shrink-0">
                <a href="#lhv-kalkulaator">{t.ctaApply}</a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="lhv-kalkulaator" className="bg-white">
        <Container>
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold text-slate-900">{t.sectionTitle}</h2>
            <p className="mt-2 text-slate-600">{t.sectionIntro}</p>

            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
              <iframe
                title={t.iframeTitle}
                src={LHV_REMONDILAEN_URL}
                className="h-[1800px] min-h-[800px] w-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-bold text-slate-900">{t.howToStartTitle}</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-slate-700">
              {t.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section className="bg-brand">
        <Container>
          <div className="mx-auto max-w-xl text-center text-white">
            <h2 className="text-2xl font-bold">{t.ctaTitle}</h2>
            <p className="mt-3 text-white/90">{t.ctaIntro}</p>
            <Button
              asChild
              size="lg"
              className="mt-6 min-h-[48px] border-2 border-white bg-white text-brand hover:bg-primary-50"
            >
              <Link href="/kontakt">{t.ctaButton}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
