import Link from "next/link";

import type { Project } from "@/content/projects";

/**
 * Visual card, one-line caption. PRD section 8.4. No case-study pages.
 *
 * The heading level is a prop because the same card sits under a section
 * heading on the homepage and directly under the page title on /work.
 * Hard-coding it produced a jump from h1 to h3 on the work page.
 */
export function ProjectCard({
  project,
  headingLevel = "h3",
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <Link
      href={project.href}
      className="group block overflow-hidden rounded-lg border border-border bg-background transition-colors hover:border-primary/40"
    >
      <div
        className={`aspect-[4/3] w-full bg-gradient-to-br ${project.tone} transition-transform duration-500 group-hover:scale-[1.02]`}
        aria-hidden="true"
      />
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <Heading className="mt-5 text-lg font-semibold tracking-tight text-foreground">
          {project.name}
        </Heading>
        <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
          {project.caption}
        </p>
      </div>
    </Link>
  );
}

/** Shown while the grid still holds invented data. */
export function PlaceholderNotice() {
  return (
    <p className="inline-flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-2 text-xs text-foreground/80">
      <span
        className="inline-block h-1.5 w-1.5 rounded-full bg-destructive"
        aria-hidden="true"
      />
      Placeholder projects. Not real work. Replace before launch.
    </p>
  );
}
