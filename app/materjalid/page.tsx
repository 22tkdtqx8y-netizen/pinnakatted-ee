import { MaterjalidContent } from "@/components/materjalid/MaterjalidContent";

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
  return <MaterjalidContent />;
}
