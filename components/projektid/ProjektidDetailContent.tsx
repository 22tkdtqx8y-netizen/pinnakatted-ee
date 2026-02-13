"use client";

import Link from "next/link";
import { useLocale } from "@/lib/LocaleContext";
import { getMessages } from "@/messages";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SmartImage } from "@/components/ui/SmartImage";
import type { Project } from "@/lib/projects";

export function ProjektidDetailContent({ project }: { project: Project }) {
  const locale = useLocale();
  const t = getMessages(locale).projektid;
  const nav = getMessages(locale).common.nav;
  const svc = getMessages(locale).services;
  const serviceLabels: Record<string, string> = {
    pur: svc.pur.title,
    polurea: svc.polurea.title,
  };

  return (
    <>
      <Section className="bg-slate-50">
        <Container>
          <nav className="mb-6 text-sm text-slate-600">
            <Link href="/tehtud-tood" className="hover:text-slate-900">
              {t.backToProjects}
            </Link>
          </nav>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="primary">
              {serviceLabels[project.serviceType] ?? project.serviceType}
            </Badge>
            {project.location && (
              <span className="text-slate-600">{project.location}</span>
            )}
            {project.date && (
              <span className="text-slate-500">
                {project.date.replace("-", "/")}
              </span>
            )}
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {project.title}
          </h1>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="space-y-6">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
              <SmartImage
                src={project.coverImage}
                alt={project.seo?.description ?? project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            </div>
            {project.images && project.images.length > 1 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.images.slice(1, 7).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100"
                  >
                    <SmartImage
                      src={img}
                      alt={`${project.title} – pilt ${i + 2}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-xl font-bold text-slate-900">{t.ctaTitle}</h2>
            <p className="mt-2 text-slate-600">{t.ctaIntro}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button asChild variant="primary">
                <Link href="/kontakt">{nav.kusiPakkumist}</Link>
              </Button>
              <Button asChild>
                <Link href="/pur-vahu-hind">{nav.arvutaHind}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
