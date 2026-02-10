import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
}

export function Section({ children, className, id, as: Tag = "section" }: SectionProps) {
  return (
    <Tag id={id} className={cn("py-12 sm:py-16 lg:py-20", className)}>
      {children}
    </Tag>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
