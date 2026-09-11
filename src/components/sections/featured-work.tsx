import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { PlaceholderNotice, ProjectCard } from "@/components/site/project-card";
import { isPlaceholderWork, projects } from "@/content/projects";

/**
 * Selected work. PRD section 8.4.
 *
 * Three projects in browser chrome, one size each, in an even three-up grid.
 *
 * The rest of the archive is listed underneath as bare domains, which is
 * both a real second route into /work and a continuation of the terminal
 * language the hero sets up.
 */
export function FeaturedWork() {
  const shown = projects.slice(0, 3);
  const archive = projects.slice(3);

  return (
    <section
      id="work"
      className="site-container border-t border-border bg-hero-bg py-24 lg:py-32"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Selected work"
          title="Recent builds"
          lede="A short caption each. If you want the detail behind one of them, ask on the call."
        />

        <Reveal delay={0.2}>
          <div className="flex items-center gap-6">
            {/* Only worth saying while the homepage is showing a subset. */}
            {projects.length > shown.length ? (
              <span className="font-mono text-[11px] tabular-nums text-muted-foreground/60">
                {String(shown.length).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
            ) : null}
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              All work
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </Reveal>
      </div>

      {isPlaceholderWork ? (
        <Reveal className="mt-10 block">
          <PlaceholderNotice />
        </Reveal>
      ) : null}

      <ul className="mt-12 grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((project, position) => (
          <Reveal
            as="li"
            key={project.slug}
            delay={position * 0.08}
            className="h-full"
          >
            <ProjectCard
              project={project}
              index={position}
              priority={position === 0}
            />
          </Reveal>
        ))}
      </ul>

      {archive.length ? (
        <Reveal delay={0.1} className="mt-8 block">
          <div className="flex flex-col gap-4 rounded-lg border border-border bg-background px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 font-mono text-[12px] text-muted-foreground">
              <span className="text-primary">also</span>
              {archive.map((project, position) => (
                <span key={project.slug} className="flex items-baseline gap-3">
                  <span className="text-muted-foreground/80">
                    {project.domain}
                  </span>
                  {position < archive.length - 1 ? (
                    <span aria-hidden="true" className="text-muted-foreground/30">
                      /
                    </span>
                  ) : null}
                </span>
              ))}
            </div>

            <Link
              href="/work"
              className="group inline-flex shrink-0 items-center gap-2 font-mono text-[12px] text-foreground transition-colors hover:text-primary"
            >
              open all
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </Reveal>
      ) : null}
    </section>
  );
}
