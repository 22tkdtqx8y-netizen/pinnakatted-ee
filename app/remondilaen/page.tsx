import { RemondilaenContent } from "@/components/remondilaen/RemondilaenContent";

export const metadata = {
  title: "LHV remondilaen",
  description:
    "LHV remondilaen PUR-soojustuse ja polükarbamiid tööde rahastamiseks. Taotle laenu otse LHV-st. Pinnakatted.ee.",
  openGraph: {
    title: "LHV remondilaen | Pinnakatted.ee",
    description: "LHV remondilaen soojustuse ja hüdroisolatsiooni tööde jaoks. Küsi pakkumist ja taotle LHV-st.",
  },
};

export default function RemondilaenPage() {
  return <RemondilaenContent />;
}
