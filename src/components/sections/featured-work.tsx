import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { PlaceholderNotice, ProjectCard } from "@/components/site/project-card";
import { isPlaceholderWork, projects } from "@/content/projects";

/**
 * Visual cards with a one-line caption each. PRD section 8.4.
 * No long-form case studies. The cover images are gradient stand-ins until
 * real screenshots arrive.
 *
 * Asymmetric on large screens: the first project takes two columns and the
 * next two stack beside it. Three identical cards implied the three were
 * equally worth looking at, which is never true of a portfolio.
 */
export function FeaturedWork() {
  const [lead, ...rest] = projects.slice(0, 3);

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
        </Reveal>
      </div>

      {isPlaceholderWork ? (
        <Reveal className="mt-10 block">
          <PlaceholderNotice />
        </Reveal>
      ) : null}

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <ProjectCard project={lead} featured />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          {rest.map((project, index) => (
            <Reveal key={project.slug} delay={(index + 1) * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
