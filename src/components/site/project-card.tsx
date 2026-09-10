import Link from "next/link";

import type { Project } from "@/content/projects";

/**
 * A project shown inside browser chrome. PRD section 8.4.
 *
 * The hero states the work as a terminal window, so the work states itself
 * as a browser window. It is the same motif twice and it is literal rather
 * than decorative: these are websites, and a site in a browser frame reads
 * as a site rather than as a rectangle of colour.
 *
 * The frame also does real work for the placeholders. A gradient in a
 * browser window reads as a screenshot that has not loaded yet. The same
 * gradient on a bare card just reads as a coloured box.
 *
 * The heading level is a prop because the same card sits under a section
 * heading on the homepage and directly under the page title on /work.
 * Hard-coding it produced a jump from h1 to h3 on the work page.
 *
 * `featured` widens the viewport area and enlarges the type, so a grid can
 * lead with one piece instead of giving every project identical weight.
 */
export function ProjectCard({
  project,
  headingLevel = "h3",
  featured = false,
  index,
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
  featured?: boolean;
  /** Optional running number, shown in the title bar. */
  index?: number;
}) {
  const Heading = headingLevel;

  return (
    <Link
      href={project.href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-[hsl(0_0%_6%)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
    >
      {/* Title bar. */}
      <div className="flex items-center gap-3 border-b border-border/70 px-4 py-3">
        <span className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/50" />
        </span>

        <span className="min-w-0 flex-1 truncate rounded border border-border/70 bg-background px-3 py-1 text-center font-mono text-[11px] text-muted-foreground transition-colors group-hover:text-foreground/80">
          {project.domain}
        </span>

        {typeof index === "number" ? (
          <span
            aria-hidden="true"
            className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground/50"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
      </div>

      {/* Viewport. A gradient until real screenshots exist. */}
      <div
        className={`relative w-full overflow-hidden ${
          featured ? "aspect-[16/10]" : "aspect-[4/3]"
        }`}
      >
        <div
          className={`h-full w-full bg-gradient-to-br ${project.tone} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
          aria-hidden="true"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_6%)] via-transparent to-transparent"
        />
      </div>

      {/* Below the fold of the little browser. */}
      <div className={`flex flex-1 flex-col ${featured ? "p-7" : "p-6"}`}>
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
          Open project
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
