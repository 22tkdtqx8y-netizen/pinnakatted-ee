import { JsonLdFAQ } from "@/components/seo/JsonLdFAQ";
import { ThermograafiaContent } from "./ThermograafiaContent";
import { thermograafia as content } from "@/content/thermograafia";
import { faqThermograafia } from "@/content/faq";
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
      <ThermograafiaContent />
    </>
  );
}
