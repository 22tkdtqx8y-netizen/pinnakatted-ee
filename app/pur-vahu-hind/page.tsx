import Link from "next/link";
import { Suspense } from "react";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PurVahuHindCalculator } from "@/components/PurVahuHindCalculator";
import { faqPurVahuHind } from "@/content/faqPurVahuHind";

export const metadata = {
  title: "PUR vahu hind | Kalkulaator + m³ | Pinnakatted.ee",
  description:
    "Pur vahu hind – arvuta kiiresti orientiirhind ja m³ kogus kalkulaatoriga. Pindala, paksus, vahu tüüp. Täpne hind selgub ülevaatusel.",
  openGraph: {
    title: "PUR vahu hind | Kalkulaator + m³ | Pinnakatted.ee",
    description:
      "Pur vahu hind – kalkulaator orientiirhinnale ja m³ kogusele. Täpne hind pärast objekti ülevaatust.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PUR vahu hind | Kalkulaator + m³ | Pinnakatted.ee",
    description: "Pur vahu hind – kalkulaator orientiirhinnale ja m³ kogusele.",
  },
};

const MILLEST_SOLTUB = [
  "Pindala (m²) – suurem pind suurendab materjali ja töö mahtu.",
  "Kihi paksus (mm) – soovitud soojustuspaksus mõjutab m³ kogust ja hinda.",
  "Vahu tüüp – suletud või avatud pooridega pihustatav või süstitav; hind €/m³ erineb.",
  "Ligipääs ja geomeetria – keerukas pinnakuju või raskesti ligipääsetav objekt võib töö hinda tõsta.",
  "Aluspind – pinna ettevalmistus või parandused võivad lisakuludega kaasneda.",
] as const;

function FaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqPurVahuHind.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function CalculatorFallback() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border-2 border-slate-200 bg-slate-50 p-12 text-center">
      <p className="text-slate-600">Kalkulaator laeb...</p>
    </div>
  );
}

export default function PurVahuHindPage() {
  return (
    <>
      <FaqJsonLd />
      {/* Hero – premium look */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]" aria-hidden />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              PUR vahu hind
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              <strong className="text-slate-800">Pur vahu hind</strong> sõltub pindalast, kihi paksusest ja vahu tüübist. Siin saad kiiresti arvutada orientiirhinda ja m³ kogust – see on indikatiivne hinnang, täpne hind selgub pärast objekti ülevaatust.
            </p>
            <p className="mt-2 text-slate-600">
              Vali pinna tüüp (seinad, katusealune, põrand või vundament), vahu tüüp, pindala ja paksus. Kalkulaator näitab mahutasu, tööaja hinnangut ja hinnangulist koguhinda (materjal, paigaldus, KM).
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="primary" size="lg" className="min-h-[48px] shadow-md">
                <Link href="#kalkulaator">Arvuta hind</Link>
              </Button>
              <Button asChild size="lg" className="min-h-[48px] border-2 border-slate-300">
                <Link href="/kontakt">Küsi pakkumist</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* SEO intro – above calculator: Millest sõltub PUR vahu hind? */}
      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900">Millest sõltub PUR vahu hind?</h2>
            <p className="mt-4 text-slate-600">
              Pur vahu hind sõltub pindalast, paksusest ja vahu tüübist. Kalkulaator hindab orientiirhinda nende põhjal; lõplik hind sõltub ka konstruktsioonist, ligipääsust ja aluspinna seisukorrast – täpse pakkumise saad pärast ülevaatust.
            </p>
            <ul className="mt-6 space-y-2 text-slate-700">
              {MILLEST_SOLTUB.map((item) => (
                <li key={item.slice(0, 30)} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Kalkulaator – client component; lai layout 50/50 kokkuvõttega */}
      <Section id="kalkulaator" className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-6xl">
            <Suspense fallback={<CalculatorFallback />}>
              <PurVahuHindCalculator />
            </Suspense>
          </div>
        </Container>
      </Section>

      {/* Kasutusjuhendid ja näited – SEO below calculator */}
      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900">Kasutusjuhendid ja näited</h2>
            <p className="mt-4 text-slate-600">
              Vali esmalt pinna tüüp (seinad, katusealune, põrand või vundament). Vundament kasutab ainult pihustatavat vahu. Seejärel vali vahu tüüp: suletud pooridega sobib vundamentidele ja niiskematesse kohtadesse, avatud pooridega pööningutele, süstitav seina- ja vahelae õõnsustele.
            </p>
            <p className="mt-3 text-slate-600">
              Sisesta pindala ruutmeetrites ja kihi paksus millimeetrites – tulemused uuenevad kohe. Kokkuvõttes kuvatakse kogumaht (m³), materjali ja paigalduse hinnang ning KM. Kasuta nuppu „Saada päring“, et saata valikud meile ja saada täpne pakkumine.
            </p>
          </div>
        </Container>
      </Section>

      {/* NB disclaimer */}
      <Section className="bg-amber-50/60">
        <Container>
          <div className="mx-auto max-w-3xl rounded-xl border border-amber-200 bg-white px-6 py-5">
            <p className="text-sm text-slate-700">
              <strong className="text-slate-900">NB!</strong> Kõik kalkulaatori tulemused ja hinnangud on indikatiivsed. Tegelik materjalikulu ja lõpphind selguvad pärast objekti ülevaatust ning sõltuvad konstruktsioonist ja aluspinna omadustest.
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ – HTML (server-rendered) + accessible */}
      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900">Korduma kippuvad küsimused</h2>
            <dl className="mt-8 space-y-6">
              {faqPurVahuHind.map((item) => (
                <div key={item.q}>
                  <dt className="text-base font-semibold text-slate-900">{item.q}</dt>
                  <dd className="mt-2 text-slate-600">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-bold text-slate-900">Soovid täpset pakkumist?</h2>
            <p className="mt-3 text-slate-600">
              Võta ühendust – hindame objekti ja anname pakkumise vastavalt tehnilistele tingimustele.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button asChild variant="primary" size="lg" className="min-h-[48px]">
                <Link href="/kontakt">Küsi pakkumist</Link>
              </Button>
              <Button asChild size="lg" className="min-h-[48px] border-2 border-slate-300">
                <Link href="/teenused/pur-soojustus">PUR soojustus</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
