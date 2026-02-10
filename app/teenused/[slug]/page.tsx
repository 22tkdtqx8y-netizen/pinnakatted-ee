import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/FAQAccordion";
import { services, type ServiceKey } from "@/content/services";
import { faqPur, faqPolurea } from "@/content/faq";

const slugToKey: Record<string, ServiceKey> = {
  "pur-soojustus": "pur",
  polurea: "polurea",
};

const faqBySlug: Record<string, readonly { q: string; a: string }[]> = {
  "pur-soojustus": faqPur,
  polurea: faqPolurea,
};

export function generateStaticParams() {
  return [{ slug: "pur-soojustus" }, { slug: "polurea" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const key = slugToKey[slug];
  if (!key) return {};
  const s = services[key];
  return {
    title: s.title,
    description: s.description,
    openGraph: {
      title: `${s.title} | Pinnakatted.ee`,
      description: s.description,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const key = slugToKey[slug];
  if (!key) notFound();
  const s = services[key];
  const faq = faqBySlug[slug] ?? [];

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
          <h2 className="text-2xl font-bold text-slate-900">Probleem → Lahendus</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-semibold text-slate-900">Probleem</h3>
              <p className="mt-2 text-slate-600">{s.problem}</p>
            </div>
            <div className="rounded-xl border border-primary-200 bg-primary-50/50 p-6">
              <h3 className="font-semibold text-slate-900">Lahendus</h3>
              <p className="mt-2 text-slate-600">{s.solution}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <h2 className="text-2xl font-bold text-slate-900">Kus sobib</h2>
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

      {slug === "pur-soojustus" && (
        <Section className="bg-white">
          <Container>
            <h2 className="text-2xl font-bold text-slate-900">Kuidas PUR-soojustus töötab</h2>
            <ul className="mt-6 space-y-3 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">1</span>
                Pihustatav vaht kinnitub aluspinnaga ilma lisakinnitusteta
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">2</span>
                Paisub paigaldamisel, täites praod ja liitekohad
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">3</span>
                Moodustab ühtse, vuugivaba soojustuskihi
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">4</span>
                Sobib nii horisontaalsetele kui vertikaalsetele pindadele
              </li>
            </ul>
          </Container>
        </Section>
      )}

      {slug === "pur-soojustus" && (
        <Section className="bg-slate-50">
          <Container>
            <h2 className="text-2xl font-bold text-slate-900">Avatud vs suletud pooridega PUR-vaht</h2>
            <p className="mt-3 text-slate-600">
              Materjali valik tehakse vastavalt objekti tehnilistele tingimustele ja kasutusotstarbele.
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Avatud pooridega PUR</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Sobib sisetöödele ja konstruktsioonidele, kus oluline on hingavus – näiteks pööningud, katusealused.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900">Suletud pooridega PUR</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Tihedam, suurema veekindluse ja mehaanilise vastupidavusega. Sobib vundamentidele, soklitele ja tehniliselt nõudlikematesse kohtadesse.
                </p>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {slug === "pur-soojustus" && (
        <Section className="bg-white">
          <Container>
            <h2 className="text-2xl font-bold text-slate-900">Pihustamine ja injekteerimine</h2>
            <p className="mt-3 text-slate-600">
              PUR-soojustust rakendame kahel viisil – pihustamine avatud pindadele ja injekteerimine õõnsustesse. Valime meetodi vastavalt konstruktsioonile; vale meetod võib põhjustada niiskusprobleeme.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-bold text-slate-900">Pihustamine</h3>
                <p className="mt-2 text-slate-600">
                  PUR-vaht kantakse avatud pinnale, kus see moodustab ühtlase ja õhukindla soojustuskihi.
                </p>
                <p className="mt-3 text-sm font-semibold text-slate-700">Sobib:</p>
                <ul className="mt-1 list-inside list-disc text-sm text-slate-600">
                  <li>Pööningud</li>
                  <li>Katusealused</li>
                  <li>Lahtised seinakonstruktsioonid</li>
                </ul>
                <p className="mt-3 text-sm font-semibold text-primary-600">Eelised:</p>
                <ul className="mt-1 space-y-0.5 text-sm text-slate-600">
                  <li>• Maksimaalne õhutihedus</li>
                  <li>• Kiire paigaldus</li>
                  <li>• Väga hea soojapidavus</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-bold text-slate-900">Injekteerimine</h3>
                <p className="mt-2 text-slate-600">
                  PUR-vaht süstitakse kinnistesse konstruktsiooniõõnsustesse väikeste avade kaudu, ilma lammutustöid tegemata.
                </p>
                <p className="mt-3 text-sm font-semibold text-slate-700">Sobib:</p>
                <ul className="mt-1 list-inside list-disc text-sm text-slate-600">
                  <li>Seinaõõnsused</li>
                  <li>Vahelaed</li>
                  <li>Paneel- ja karkasskonstruktsioonid</li>
                </ul>
                <p className="mt-3 text-sm font-semibold text-primary-600">Eelised:</p>
                <ul className="mt-1 space-y-0.5 text-sm text-slate-600">
                  <li>• Ideaalne renoveerimiseks</li>
                  <li>• Ei vaja seina avamist</li>
                  <li>• Taastab puuduva või vajunud soojustuse</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50/80 px-6 py-4 text-sm text-slate-700">
              <strong className="text-slate-900">Miks see oluline on?</strong> Vale meetodi kasutamine võib põhjustada niiskusprobleeme. Seetõttu valime alati lahenduse vastavalt konstruktsioonile.
            </div>
          </Container>
        </Section>
      )}

      {slug === "pur-soojustus" && (
        <Section className="bg-slate-50">
          <Container>
            <h2 className="text-2xl font-bold text-slate-900">Termograafia ehk termopildistamine (tasuline lisateenus)</h2>
            <p className="mt-3 text-slate-600">
              Termopildistamine spetsiaalse kaameraga – eraldi tasuline teenus (alates 250 € / objekt). Pärast soojustustöid saab tellida termopildistuse, kui soovitakse töö tulemust visuaalselt kontrollida. Ei ole automaatselt osa soojustustöödest.
            </p>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                Tasuline teenus – tellitav eraldi või pärast PUR-töid
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600">•</span>
                Termopildid ja lühike selgitus – visuaalne ülevaade
              </li>
            </ul>
            <div className="mt-6">
              <Button asChild variant="primary" size="sm">
                <Link href="/thermograafia">Loe termograafiast</Link>
              </Button>
            </div>
          </Container>
        </Section>
      )}

      {slug === "polurea" && (
        <Section className="bg-white">
          <Container>
            <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <strong>Märkus:</strong> Polükarbamiid (tuntud ka kui polüurea kate) on tehniline nimetus – me kasutame mõlemat nimetust. Sisu on sama: tugev, veekindel ja elastne kate.
            </p>
          </Container>
        </Section>
      )}

      <Section className={slug === "pur-soojustus" ? "bg-white" : "bg-slate-50"}>
        <Container>
          <h2 className="text-2xl font-bold text-slate-900">{slug === "pur-soojustus" ? "Kasu kliendile" : "Eelised"}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {s.benefits.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
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

      {slug === "pur-soojustus" && (
        <Section className="bg-slate-50">
          <Container>
            <h2 className="text-2xl font-bold text-slate-900">Kellele sobib</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {["Eramajad ja korterelamud", "Arendajad ja ehitusettevõtted", "Tootmis- ja laohooned", "Tehnilised rajatised"].map((item) => (
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
          <h2 className="text-2xl font-bold text-slate-900">Protsess</h2>
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
            <h2 className="text-2xl font-bold text-slate-900">KKK</h2>
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
                <Link href="/pur-vahu-hind">Pur vahu hind</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="min-h-[48px] border-2 border-white bg-transparent text-white hover:bg-white/10"
              >
                <Link href="/kontakt">Küsi pakkumist</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
