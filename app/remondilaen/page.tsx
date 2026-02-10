import Link from "next/link";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "LHV remondilaen",
  description:
    "LHV remondilaen PUR-soojustuse ja polükarbamiid tööde rahastamiseks. Taotle laenu otse LHV-st. Pinnakatted.ee.",
  openGraph: {
    title: "LHV remondilaen | Pinnakatted.ee",
    description: "LHV remondilaen soojustuse ja hüdroisolatsiooni tööde jaoks. Küsi pakkumist ja taotle LHV-st.",
  },
};

/** LHV hostitud remondilaenu lahendus – sama URL mis vanal pinnakatted.ee lehel (repair-loan.html). */
const LHV_REMONDILAEN_URL =
  "https://partners.lhv.ee/assets/templates/repair-loan.html?product=HRL&intrest=7%2C9&contract_fee=2&code=14588801&price=2000&creditPeriod=40&disclaimer_intrest=15%2C90&disclaimer_period=24&roh=18%2C64&contract_fee_sum=40&creditAmount=2000%2C00&totalSum=2630%2C48&returnSum=2590%2C48";

export default function RemondilaenPage() {
  return (
    <>
      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  LHV remondilaen sinu kodule
                </h1>
                <p className="mt-3 text-lg text-slate-600">
                  Remondilaenu saad kasutada oma kodu või suvemaja korda tegemiseks – soojustus, katuse ja vundamentide tööd ning hüdroisolatsioon. Ainult LHV laenulahendus.
                </p>
              </div>
              <Button asChild variant="primary" size="lg" className="shrink-0">
                <a href="#lhv-kalkulaator">
                  Taotle LHV-st
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="lhv-kalkulaator" className="bg-white">
        <Container>
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold text-slate-900">LHV remondi-laen</h2>
            <p className="mt-2 text-slate-600">
              Allolev kalkulaator on <strong>LHV poolt hostitud lahendus</strong>. Tingimused, hinnangud ja taotluse vorm tulevad otse LHV lehelt ja uuenevad automaatselt.
            </p>

            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
              <iframe
                title="LHV remondilaenu kalkulaator (LHV hostitud)"
                src={LHV_REMONDILAEN_URL}
                className="h-[1800px] w-full border-0 min-h-[800px]"
                loading="lazy"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-bold text-slate-900">Kuidas alustada?</h2>
            <ol className="mt-3 list-inside list-decimal space-y-2 text-slate-700">
              <li>Küsi meilt pakkumist (tööde mahukirjeldus ja hind).</li>
              <li>Taotle LHV remondilaenu pakkumise alusel – otse LHV lehelt või oma pangaga.</li>
              <li>Pärast laenu kinnitamist alustame töödega kokkulepitud ajaks.</li>
            </ol>
          </div>
        </Container>
      </Section>

      <Section className="bg-brand">
        <Container>
          <div className="mx-auto max-w-xl text-center text-white">
            <h2 className="text-2xl font-bold">Küsi pakkumist ja taotle LHV-st</h2>
            <p className="mt-3 text-white/90">Võtame ühendust ja leiame sobiva lahenduse. Pakkumise alusel saad taotleda LHV remondilaenu.</p>
            <Button
              asChild
              size="lg"
              className="mt-6 min-h-[48px] border-2 border-white bg-white text-brand hover:bg-primary-50"
            >
              <Link href="/kontakt">Küsi pakkumist</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
