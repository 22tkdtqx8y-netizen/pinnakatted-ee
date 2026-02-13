import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services, type ServiceKey } from "@/content/services";
import { ServiceDetailContent } from "@/components/teenused/ServiceDetailContent";

const slugToKey: Record<string, ServiceKey> = {
  "pur-soojustus": "pur",
  polurea: "polurea",
};

export function generateStaticParams() {
  return [{ slug: "pur-soojustus" }, { slug: "polurea" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const key = slugToKey[slug];
  if (!key) return {};
  const s = services[key];
  return {
    title: s.title,
    description: s.description,
    openGraph: {
      title: `${s.title} | Pinnakatted.ee`,
      description: s.description,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const key = slugToKey[slug];
  if (!key) notFound();

  return <ServiceDetailContent slug={slug} />;
}
