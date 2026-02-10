import projectsData from "@/content/projects.json";

export interface Project {
  slug: string;
  title: string;
  serviceType: string;
  location: string;
  date: string;
  coverImage: string;
  images: string[];
  summary: string;
  seo: { title: string; description: string };
}

export function getProjects(): Project[] {
  return projectsData as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getProjectsByService(serviceType: string): Project[] {
  return getProjects().filter((p) => p.serviceType === serviceType);
}
