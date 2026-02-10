import { Suspense } from "react";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { company } from "@/lib/company";
import { KontaktFormWrapper } from "./KontaktFormWrapper";

export const metadata = {
  title: "Kontakt",
  description:
    "Võta ühendust Pinnakatted.ee-ga. Küsi pakkumist PUR-soojustuse või polüurea tööde kohta. Telefon ja vorm.",
  openGraph: {
    title: "Kontakt | Pinnakatted.ee",
    description: "Küsi pakkumist või helista. Tööpiirkond: kogu Eesti.",
  },
};

export default function KontaktPage() {
  return (
    <>
      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Kontakt
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Küsi pakkumist või võta ühendust. Vastame kiiresti.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Kontaktandmed</h2>
              <p className="mt-2 text-slate-700 font-semibold">{company.name}</p>
              <p className="text-sm text-slate-500">Reg. kood: {company.regCode} · KMKR: {company.vatNumber}</p>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li>
                  <strong className="text-slate-900">Aadress:</strong> {company.address}
                </li>
                <li>
                  <strong className="text-slate-900">Telefon:</strong>{" "}
                  <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-brand">
                    {company.phone}
                  </a>
                </li>
                <li>
                  <strong className="text-slate-900">E-mail:</strong>{" "}
                  <a href={`mailto:${company.email}`} className="hover:text-brand">
                    {company.email}
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-slate-600">
                <strong className="text-slate-900">Tööpiirkond:</strong> Rakveres ja üle Eesti
              </p>
              <div className="mt-6">
                <Button asChild variant="primary" size="lg" className="min-h-[48px]">
                  <a href={`tel:${company.phone.replace(/\s/g, "")}`}>Helista nüüd</a>
                </Button>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                <a href={company.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-slate-700">
                  Meie Facebook
                </a>
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900">Saada päring</h2>
              <p className="mt-2 text-slate-600">
                Täida vorm ja vajadusel lisa pildid. Vastame lühikese aja jooksul.
              </p>
              <Suspense fallback={<div className="mt-6 min-h-[200px] animate-pulse rounded-lg bg-slate-200" />}>
                <KontaktFormWrapper />
              </Suspense>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
