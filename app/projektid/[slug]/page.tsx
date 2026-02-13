import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { ProjektidDetailContent } from "@/components/projektid/ProjektidDetailContent";

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const title = project.seo?.title ?? project.title;
  const description = project.seo?.description ?? project.summary;
  const image = project.coverImage?.startsWith("http")
    ? project.coverImage
    : `https://pinnakatted.ee${project.coverImage}`;
  return {
    title,
    description,
    openGraph: {
      title: `${title} | Pinnakatted.ee`,
      description,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <ProjektidDetailContent project={project} />;
}
