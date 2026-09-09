import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { PlaceholderNotice, ProjectCard } from "@/components/site/project-card";
import { isPlaceholderWork, projects } from "@/content/projects";

/**
 * Visual cards with a one-line caption each. PRD section 8.4.
 * No long-form case studies. The cover images are gradient stand-ins until
 * real screenshots arrive.
 */
export function FeaturedWork() {
  const featured = projects.slice(0, 3);

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
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
          >
            All work
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </Reveal>
      </div>

      {isPlaceholderWork ? (
        <Reveal className="mt-10">
          <PlaceholderNotice />
        </Reveal>
      ) : null}

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project, index) => (
          <Reveal as="li" key={project.slug} delay={index * 0.08}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
