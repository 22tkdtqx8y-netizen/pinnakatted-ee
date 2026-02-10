import Link from "next/link";
import { Section, Container } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { services } from "@/content/services";

export const metadata = {
  title: "Teenused – PUR soojustus ja polükarbamiid hüdroisolatsioon",
  description:
    "PUR soojustus (pihustamine ja injekteerimine) ning polükarbamiid hüdroisolatsioon. Professionaalsed lahendused katuste, seinte, mahutite ja põrandate kaitseks.",
  openGraph: {
    title: "Teenused | Pinnakatted.ee",
    description:
      "PUR soojustus ja polükarbamiid hüdroisolatsioon. Vali sobiv lahendus – pihustamine, injekteerimine või veekindel kate.",
  },
};

export default function TeenusedPage() {
  const pur = services.pur;
  const polurea = services.polurea;

  return (
    <>
      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Meie teenused
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              PUR soojustus, polükarbamiid hüdroisolatsioon ja termograafia ehk termopildistamine (eraldi tasuline teenus). Vali sobiv lahendus.
            </p>
          </div>
          <div className="mt-12 space-y-8">
            <Card className="p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-slate-900">PUR soojustus</h2>
              <p className="mt-3 text-slate-600">{pur.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="font-medium text-slate-700">Sobib:</span>
                {pur.where.map((w) => (
                  <li key={w} className="rounded-full bg-slate-100 px-3 py-1">{w}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href={`/teenused/${pur.slug}`}
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                >
                  Vaata lähemalt
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Button asChild variant="primary" size="sm">
                  <Link href="/pur-vahu-hind">Arvuta hind</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/kontakt">Küsi pakkumist</Link>
                </Button>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Polükarbamiid hüdroisolatsioon
                {" "}
                <span className="text-lg font-normal text-slate-500">{polurea.subtitle ?? ""}</span>
              </h2>
              <p className="mt-3 text-slate-600">{polurea.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="font-medium text-slate-700">Sobib:</span>
                {polurea.where.map((w) => (
                  <li key={w} className="rounded-full bg-slate-100 px-3 py-1">{w}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href={`/teenused/${polurea.slug}`}
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                >
                  Vaata lähemalt
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Button asChild variant="primary" size="sm">
                  <Link href="/kontakt">Küsi pakkumist</Link>
                </Button>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold text-slate-900">Termograafia ehk termopildistamine</h2>
              <p className="mt-3 text-slate-600">
                Termopildistamine spetsiaalse (infrapuna)kaameraga – soojuskaod, õhulekked ja probleemkohad nähtavaks. Eraldi tasuline teenus (alates 250 € / objekt), tellitav eraldi või pärast soojustustöid.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="font-medium text-slate-700">Sobib:</span>
                <li className="rounded-full bg-slate-100 px-3 py-1">Hoonete hindamine</li>
                <li className="rounded-full bg-slate-100 px-3 py-1">Tööde järelkontroll</li>
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/thermograafia"
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                >
                  Vaata lähemalt
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Button asChild variant="primary" size="sm">
                  <Link href="/kontakt?thermograafia=1">Päring termograafia tellimiseks</Link>
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
