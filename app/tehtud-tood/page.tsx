"use client";

import { useMemo } from "react";
import { Section, Container } from "@/components/ui/Section";
import { ProjectGrid } from "@/components/ProjectGrid";
import { getProjects } from "@/lib/projects";

export default function TehtudToodPage() {
  const projects = useMemo(() => getProjects(), []);

  return (
    <>
      <Section className="overflow-x-hidden bg-slate-50">
        <Container className="min-w-0 max-w-full overflow-x-hidden">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Tehtud tööd
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Vaata meie projekte – PUR soojustus üle Eesti.
            </p>
          </div>
          <ProjectGrid projects={projects} />
        </Container>
      </Section>
    </>
  );
}
