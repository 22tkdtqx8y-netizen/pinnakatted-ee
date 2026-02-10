import Link from "next/link";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLdFAQ } from "@/components/seo/JsonLdFAQ";
import { thermograafia as content } from "@/content/thermograafia";
import { faqThermograafia } from "@/content/faq";
import { KontaktFormWrapper } from "@/app/kontakt/KontaktFormWrapper";
import { company } from "@/lib/company";

export const metadata = {
  title: "Termograafia (termopildistamine) | Tasuline teenus hoonetele",
  description:
    "Termograafia ehk termopildistamine – pildistamine infrapunakaameraga. Eraldi tasuline teenus (alates 250 € / objekt). Soojuskaod, õhulekked, tööde järelkontroll. Tellitav eraldi.",
  openGraph: {
    title: "Termograafia ehk termopildistamine | Pinnakatted.ee",
    description: "Termopildistamine hoonetele. Eraldi tasuline teenus alates 250 € / objekt. Soojuskaod, õhulekked, järelkontroll.",
  },
};

const BASE = "https://pinnakatted.ee";

function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Termograafia ehk termopildistamine – tasuline teenus hoonetele",
    description: content.hero.subtitle,
    provider: {
      "@type": "Organization",
      name: company.name,
      url: BASE,
    },
    areaServed: "EE",
    url: `${BASE}/thermograafia`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ThermograafiaPage() {
  return (
    <>
      <JsonLdFAQ items={faqThermograafia} />
      <ServiceSchema />

      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {content.hero.title}
            </h1>
            <p className="mt-4 text-lg text-slate-600">{content.hero.subtitle}</p>
            <p className="mt-6 inline-block rounded-xl border-2 border-primary-500 bg-primary-50 px-6 py-3 text-2xl font-bold text-primary-800 sm:text-3xl">
              {content.pricing.fromPrice}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="primary" size="lg" className="min-h-[48px]">
                <Link href="/kontakt?thermograafia=1">{content.cta.primary}</Link>
              </Button>
              <Button asChild size="lg" className="min-h-[48px] border-2 border-slate-300">
                <a href={`tel:${company.phone.replace(/\s/g, "")}`}>Helista</a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-slate-500">{content.cta.microcopy}</p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900">{content.what.title}</h2>
            <ul className="mt-4 space-y-2 text-slate-600">
              {content.what.points.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="text-primary-600">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900">{content.whenOrdered.title}</h2>
            <ul className="mt-6 space-y-3">
              {content.whenOrdered.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900">{content.pricing.title}</h2>
            <p className="mt-4 rounded-xl border-2 border-slate-200 bg-slate-50 px-6 py-4 text-center text-3xl font-bold text-slate-900 sm:text-4xl">
              {content.pricing.fromPrice}
            </p>
            <p className="mt-3 text-slate-600">{content.pricing.note1}</p>
            <p className="mt-1 text-slate-600">{content.pricing.note2}</p>
            <div className="mt-6">
              <Button asChild variant="primary" size="lg">
                <Link href="/kontakt?thermograafia=1">{content.cta.primary}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900">{content.whatClientGets.title}</h2>
            <ul className="mt-6 space-y-3">
              {content.whatClientGets.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="bg-amber-50">
        <Container>
          <div className="mx-auto max-w-3xl rounded-xl border border-amber-200 bg-white px-6 py-5">
            <p className="text-slate-800">
              <strong className="text-slate-900">Oluline:</strong> {content.importantNote}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900">Korduma kippuvad küsimused</h2>
            <FAQAccordion items={faqThermograafia} className="mt-6" />
          </div>
        </Container>
      </Section>

      <Section className="bg-primary-600">
        <Container>
          <div className="mx-auto max-w-2xl text-center text-white">
            <h2 className="text-2xl font-bold">{content.cta.primary}</h2>
            <p className="mt-3 text-primary-100">{content.cta.microcopy}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="min-h-[48px] border-2 border-white bg-white text-primary-700 hover:bg-primary-50">
                <Link href="/kontakt?thermograafia=1">{content.cta.primary}</Link>
              </Button>
              <Button asChild size="lg" className="min-h-[48px] border-2 border-white bg-transparent text-white hover:bg-white/10">
                <Link href="/teenused/pur-soojustus">PUR soojustus</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-xl">
            <h2 className="text-xl font-bold text-slate-900">Päring termograafia tellimiseks</h2>
            <p className="mt-2 text-slate-600">{content.cta.microcopy}</p>
            <div className="mt-6">
              <KontaktFormWrapper initialThermograafia />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
