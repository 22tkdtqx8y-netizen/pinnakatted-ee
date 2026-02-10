import Link from "next/link";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CardLink } from "@/components/ui/Card";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLdFAQ } from "@/components/seo/JsonLdFAQ";
import { faqHome } from "@/content/faq";
import { services } from "@/content/services";
import { getProjects } from "@/lib/projects";
import { HeroHome } from "@/components/home/HeroHome";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Testimonials } from "@/components/home/Testimonials";

const WHY_THIS_MATTERS =
  "Vale meetodi kasutamine võib põhjustada niiskusprobleeme. Seetõttu valime alati lahenduse vastavalt konstruktsioonile.";

const PIHUSTAMINE = {
  title: "Pihustamine",
  desc: "PUR-vaht kantakse avatud pinnale, kus see moodustab ühtlase ja õhukindla soojustuskihi.",
  suitable: ["Pööningud", "Katusealused", "Lahtised seinakonstruktsioonid"],
  benefits: ["Maksimaalne õhutihedus", "Kiire paigaldus", "Väga hea soojapidavus"],
};

const INJEKTEERIMINE = {
  title: "Injekteerimine",
  desc: "PUR-vaht süstitakse kinnistesse konstruktsiooniõõnsustesse väikeste avade kaudu, ilma lammutustöid tegemata.",
  suitable: ["Seinaõõnsused", "Vahelaed", "Paneel- ja karkasskonstruktsioonid"],
  benefits: ["Ideaalne renoveerimiseks", "Ei vaja seina avamist", "Taastab puuduva või vajunud soojustuse"],
};

export default function HomePage() {
  const projects = getProjects().slice(0, 9);

  return (
    <>
      <JsonLdFAQ items={faqHome} />
      <HeroHome />
      <TrustStrip />

      <Section id="kuidas-tootab" className="bg-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Pihustamine vs Injekteerimine
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              PUR-soojustus: pihustamine avatud pindadele ja injekteerimine õõnsustesse. Valime meetodi vastavalt konstruktsioonile.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <h3 className="text-xl font-bold text-slate-900">{PIHUSTAMINE.title}</h3>
              <p className="mt-3 text-slate-600">{PIHUSTAMINE.desc}</p>
              <p className="mt-4 text-sm font-semibold text-slate-700">Sobib:</p>
              <ul className="mt-1 list-inside list-disc text-sm text-slate-600">
                {PIHUSTAMINE.suitable.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm font-semibold text-primary-600">Eelised:</p>
              <ul className="mt-1 space-y-1 text-sm text-slate-600">
                {PIHUSTAMINE.benefits.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <h3 className="text-xl font-bold text-slate-900">{INJEKTEERIMINE.title}</h3>
              <p className="mt-3 text-slate-600">{INJEKTEERIMINE.desc}</p>
              <p className="mt-4 text-sm font-semibold text-slate-700">Sobib:</p>
              <ul className="mt-1 list-inside list-disc text-sm text-slate-600">
                {INJEKTEERIMINE.suitable.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm font-semibold text-primary-600">Eelised:</p>
              <ul className="mt-1 space-y-1 text-sm text-slate-600">
                {INJEKTEERIMINE.benefits.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50/80 px-6 py-4 text-center text-sm text-slate-700">
            <strong className="text-slate-900">Miks see oluline on?</strong> {WHY_THIS_MATTERS}
          </div>
        </Container>
      </Section>

      <Section id="thermograafia" className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Soovi korral pakume ka termograafiat ehk termopildistamist
            </h2>
            <p className="mt-4 text-slate-600">
              Termograafia on termopildistamine infrapunakaameraga – eraldi tasuline teenus (alates 250 € / objekt). Kasutatakse hoonete hindamiseks või soojustustööde järelkontrolliks.
            </p>
            <div className="mt-6">
              <Button asChild variant="secondary" size="lg">
                <Link href="/thermograafia">Loe termograafiast (termopildistamine)</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="teenused" className="bg-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Vali teenus
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              PUR soojustus on meie põhiteenus – pihustamine ja injekteerimine kogu Eestis.
            </p>
          </div>
          <div className="mt-12 space-y-8">
            <CardLink href={`/teenused/${services.pur.slug}`} className="p-8 sm:p-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">PUR soojustus</h3>
                  <p className="mt-2 text-slate-600">{services.pur.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                    <span className="font-medium text-slate-700">Sobib:</span>
                    {services.pur.where.map((w) => (
                      <li key={w} className="rounded-full bg-slate-100 px-3 py-1">{w}</li>
                    ))}
                  </ul>
                </div>
                <span className="inline-flex shrink-0 items-center text-primary-600 font-medium">
                  Loe rohkem
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </CardLink>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild variant="primary" size="lg">
                <Link href="/pur-vahu-hind">Pur vahu hind</Link>
              </Button>
              <Button asChild size="lg">
                <Link href="/kontakt">Küsi pakkumist</Link>
              </Button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Polükarbamiid hüdroisolatsioon</h3>
              <p className="mt-2 text-slate-600">
                Eraldi teenus: veekindlad pinnakatted katustele, mahutitele, basseinidele ja põrandatele. Polükarbamiid (polüurea kate) – tugev, elastne ja pikaajaline.
              </p>
              <Link
                href={`/teenused/${services.polurea.slug}`}
                className="mt-4 inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
              >
                Vaata teenust
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="tehtud-tood" className="bg-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Tehtud tööd
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Vaata meie projekte – PUR soojustus ja polükarbamiid üle Eesti.
            </p>
          </div>
          <ProjectGrid projects={projects} />
          <div className="mt-10 text-center">
            <Button asChild variant="primary">
              <Link href="/tehtud-tood">Kõik tööd</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Testimonials />

      <Section id="faq" className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Korduma kippuvad küsimused
            </h2>
            <FAQAccordion items={faqHome} className="mt-8" />
          </div>
        </Container>
      </Section>
    </>
  );
}
