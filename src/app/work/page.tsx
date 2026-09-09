import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { PlaceholderNotice, ProjectCard } from "@/components/site/project-card";
import { buttonVariants } from "@/components/ui/button";
import { isPlaceholderWork, projects } from "@/content/projects";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected builds. Websites, web apps and automation, shipped with AI-assisted development and reviewed line by line.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="What I have shipped"
        lede="A caption each, not a case study. The detail lives in a conversation, where you can ask the awkward questions."
      />

      <section className="site-container bg-background py-20 lg:py-28">
        {isPlaceholderWork ? (
          <Reveal className="mb-12 block">
            <PlaceholderNotice />
          </Reveal>
        ) : null}

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal as="li" key={project.slug} delay={(index % 3) * 0.08}>
              <ProjectCard project={project} headingLevel="h2" />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-20 block border-t border-border pt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Want something like one of these?
          </h2>
          <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
            Most of these started as a half-formed idea and a deadline. Bring
            yours and I will tell you what it actually takes.
          </p>
          <Link
            href={siteConfig.bookingUrl}
            className={`${buttonVariants({ variant: "hero", size: "xl" })} mt-8 text-xs font-semibold uppercase tracking-widest`}
          >
            Book a call
          </Link>
        </Reveal>
      </section>
    </>
  );
}
