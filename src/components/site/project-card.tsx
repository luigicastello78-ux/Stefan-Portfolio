import Link from "next/link";

import type { Project } from "@/content/projects";

/**
 * Visual card, one-line caption. PRD section 8.4. No case-study pages.
 *
 * The heading level is a prop because the same card sits under a section
 * heading on the homepage and directly under the page title on /work.
 * Hard-coding it produced a jump from h1 to h3 on the work page.
 *
 * `featured` widens the cover and enlarges the type, so a grid of these can
 * lead with one piece instead of giving every project identical weight.
 */
export function ProjectCard({
  project,
  headingLevel = "h3",
  featured = false,
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
  featured?: boolean;
}) {
  const Heading = headingLevel;

  return (
    <Link
      href={project.href}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background transition-colors duration-300 hover:border-primary/40"
    >
      <div
        className={`relative w-full overflow-hidden ${
          featured ? "aspect-[16/10]" : "aspect-[4/3]"
        }`}
      >
        <div
          className={`h-full w-full bg-gradient-to-br ${project.tone} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
          aria-hidden="true"
        />
        {/* Grounds the cover so it never floats as a flat rectangle. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"
        />
      </div>

      <div className={`flex flex-1 flex-col ${featured ? "p-8" : "p-6"}`}>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground transition-colors group-hover:border-primary/30"
            >
              {tag}
            </span>
          ))}
        </div>

        <Heading
          className={`mt-5 font-semibold tracking-tight text-foreground ${
            featured ? "text-2xl md:text-3xl" : "text-lg"
          }`}
        >
          {project.name}
        </Heading>

        <p
          className={`mt-2 font-light leading-relaxed text-muted-foreground ${
            featured ? "max-w-md text-base" : "text-sm"
          }`}
        >
          {project.caption}
        </p>

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary">
          View project
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </span>
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
