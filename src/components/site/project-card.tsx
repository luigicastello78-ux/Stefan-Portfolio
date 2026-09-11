import Image from "next/image";

import type { Project } from "@/content/projects";

/**
 * A project shown inside browser chrome. PRD section 8.4.
 *
 * The hero states the work as a terminal window, so the work states itself
 * as a browser window. Literal rather than decorative: these are websites,
 * and a site in a browser frame reads as a site.
 *
 * Not a link. The owner asked for the address as plain text, so this is an
 * article and the domain sits in the chrome as a label. That also means no
 * hover affordances: a card that lifts or brightens under the cursor
 * promises a click it cannot deliver.
 *
 * The heading level is a prop because the same card sits under a section
 * heading on the homepage and directly under the page title on /work.
 * Hard-coding it produced a jump from h1 to h3 on the work page.
 *
 * Every card is the same size. The grid stretches them to a common height
 * and the caption block is pushed down, so a long line in one card cannot
 * leave the others looking unfinished.
 */
export function ProjectCard({
  project,
  headingLevel = "h3",
  index,
  priority = false,
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
  /** Optional running number, shown in the title bar. */
  index?: number;
  /** Set on the first card so the cover is not lazy-loaded. */
  priority?: boolean;
}) {
  const Heading = headingLevel;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-[hsl(0_0%_6%)]">
      {/* Title bar. */}
      <div className="flex items-center gap-3 border-b border-border/70 px-4 py-3">
        <span className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/50" />
        </span>

        <span className="min-w-0 flex-1 truncate rounded border border-border/70 bg-background px-3 py-1 text-center font-mono text-[11px] text-muted-foreground">
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

      {/* Viewport. */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={`${project.name} home page`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top"
          priority={priority}
        />
      </div>

      {/* Below the fold of the little browser. */}
      <div className="flex flex-1 flex-col p-6">
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
    </article>
  );
}

/** Shown only while the grid still holds invented data. */
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
