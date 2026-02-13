import { KontaktContent } from "./KontaktContent";

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
  return <KontaktContent />;
}
