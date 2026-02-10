import { company } from "@/lib/company";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  alternateName: company.siteName,
  description:
    "PUR soojustus ja polüurea hüdroisolatsioon Eestis. Rakveres ja üle Eesti. Professionaalsed lahendused katuste, põrandate ja mahutite kaitseks.",
  url: "https://pinnakatted.ee",
  telephone: company.phone.replace(/\s/g, ""),
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Linnu tn 4-4, Pajusti alevik, Vinni vald",
    addressRegion: "Lääne-Virumaa",
    postalCode: "46603",
    addressCountry: "EE",
  },
  areaServed: {
    "@type": "Country",
    name: "Estonia",
  },
  serviceType: ["PUR soojustus", "Polüurea hüdroisolatsioon"],
  potentialAction: {
    "@type": "CommunicateAction",
    target: `tel:${company.phone.replace(/\s/g, "")}`,
    url: "https://pinnakatted.ee/kontakt",
  },
};

export function JsonLdLocalBusiness() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
}
