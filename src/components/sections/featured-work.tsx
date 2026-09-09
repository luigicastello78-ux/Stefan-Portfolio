import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
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
      className="border-t border-border bg-hero-bg px-6 py-24 md:px-10 lg:px-16 lg:py-32"
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
          <p className="inline-flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-2 text-xs text-foreground/80">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-destructive"
              aria-hidden="true"
            />
            Placeholder projects. Not real work. Replace before launch.
          </p>
        </Reveal>
      ) : null}

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project, index) => (
          <Reveal as="li" key={project.slug} delay={index * 0.08}>
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
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                  {project.caption}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
