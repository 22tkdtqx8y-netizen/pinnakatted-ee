import Link from "next/link";
import { HeroHome } from "@/components/home/HeroHome";
import { Section, Container } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { HomeContent } from "@/components/home/HomeContent";

export const metadata = {
  title: "Pinnakatted.ee – PUR soojustus (pihustamine ja injekteerimine)",
  description:
    "PUR soojustus Eestis – pihustamine ja injekteerimine. Soojem kodu, madalamad küttekulud. Polükarbamiid hüdroisolatsioon. Küsi pakkumist.",
  openGraph: {
    title: "Pinnakatted.ee – PUR soojustus",
    description: "PUR soojustus ja polükarbamiid hüdroisolatsioon. Soojem kodu, madalamad küttekulud.",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroHome />
      <HomeContent />
    </>
  );
}
