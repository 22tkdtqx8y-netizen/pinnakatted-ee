"use client";

import { useMemo } from "react";
import { useLocale } from "@/lib/LocaleContext";
import { getMessages } from "@/messages";
import { Section, Container } from "@/components/ui/Section";
import { ProjectGrid } from "@/components/ProjectGrid";
import { getProjects } from "@/lib/projects";

export default function TehtudToodPage() {
  const locale = useLocale();
  const t = getMessages(locale).tehtudTood;
  const projects = useMemo(() => getProjects(), []);

  return (
    <>
      <Section className="overflow-x-hidden bg-slate-50">
        <Container className="min-w-0 max-w-full overflow-x-hidden">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t.title}
            </h1>
            <p className="mt-4 text-lg text-slate-600">{t.intro}</p>
          </div>
          <ProjectGrid projects={projects} />
        </Container>
      </Section>
    </>
  );
}
