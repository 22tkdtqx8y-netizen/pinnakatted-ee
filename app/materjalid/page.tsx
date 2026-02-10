import Link from "next/link";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { services } from "@/content/services";

export const metadata = {
  title: "Materjalid",
  description:
    "PUR ja polüurea materjalide võrdlus. Omadused, kasutusvaldkonnad ja KKK soojustuse ja hüdroisolatsiooni kohta.",
  openGraph: {
    title: "Materjalid | Pinnakatted.ee",
    description: "PUR ja polüurea – omadused ja võrdlus. Loe rohkem meie teenustest.",
  },
};

export default function MaterjalidPage() {
  return (
    <>
      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Materjalid
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              PUR ja polüurea – erinevad eesmärgid, kõrge kvaliteet. Lühike võrdlus ja omadused.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900">PUR (polüuretaanvaik)</h2>
              <p className="mt-4 text-slate-600">{services.pur.description}</p>
              <ul className="mt-4 space-y-2 text-slate-700">
                {services.pur.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="text-primary-600">✓</span> {b}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-500">
                Kasutusvaldkonnad: {services.pur.where.join(", ")}.
              </p>
              <Button asChild variant="primary" className="mt-6">
                <Link href={`/teenused/${services.pur.slug}`}>PUR teenus</Link>
              </Button>
            </Card>
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900">Polüurea</h2>
              <p className="mt-4 text-slate-600">{services.polurea.description}</p>
              <ul className="mt-4 space-y-2 text-slate-700">
                {services.polurea.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="text-primary-600">✓</span> {b}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-500">
                Kasutusvaldkonnad: {services.polurea.where.join(", ")}.
              </p>
              <Button asChild variant="primary" className="mt-6">
                <Link href={`/teenused/${services.polurea.slug}`}>Polüurea teenus</Link>
              </Button>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-xl font-bold text-slate-900">Vajad nõu?</h2>
            <p className="mt-2 text-slate-600">
              Vali sobiv materjal ja küsi pakkumist – aitame valikuga.
            </p>
            <Button asChild variant="primary" size="lg" className="mt-6">
              <Link href="/kontakt">Kontakt</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
