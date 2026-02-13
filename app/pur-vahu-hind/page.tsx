import { PurVahuHindContent } from "@/components/pur-vahu-hind/PurVahuHindContent";

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

export default function PurVahuHindPage() {
  return <PurVahuHindContent />;
}
