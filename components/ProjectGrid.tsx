"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

interface ProjectGridProps {
  projects: Project[];
  columns?: 2 | 3;
}

export function ProjectGrid({ projects, columns = 3 }: ProjectGridProps) {
  return (
    <div className="mt-10 grid w-full max-w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <motion.div
          key={project.slug}
          className="min-w-0 max-w-full"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        >
          <Link
            href={`/projektid/${project.slug}`}
            className="group block max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            aria-label={project.title}
          >
            <div
              className="relative w-full overflow-hidden bg-slate-100"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src={project.coverImage}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
