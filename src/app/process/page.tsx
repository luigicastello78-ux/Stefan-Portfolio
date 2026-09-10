import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { buttonVariants } from "@/components/ui/button";
import { processSteps } from "@/content/process";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How a build runs from your requirements to a finished product. Requirements, draft, review, automation, launch and what happens after.",
  alternates: { canonical: "/process" },
};

/**
 * The longer version of each stage. Structure, timings and the you/me split
 * come from the shared content file, so this page and the homepage section
 * can never disagree. Only the prose lives here.
 */
const detail: Record<string, string> = {
  "01": "Most failed projects fail here, quietly, and nobody notices until the end. The specification is short but it is written down, because a vague brief produces a vague first draft, and correcting a vague draft takes longer than writing the thing by hand.",
  "02": "What used to be a week of boilerplate and blank pages is now an afternoon. It is not finished, it is a version to argue with, and seeing a wrong version of a page tells you more about the right one than an hour of thinking about it.",
  "03": "Models are confidently wrong on a regular basis, and catching that is the job. The specific things that come up every time: logic that reads correctly and behaves backwards, dependencies nobody asked for, accessibility quietly skipped, and security handled by hope.",
  "04": "This is the part clients notice most after launch, because it is the difference between a website and something that runs a piece of their business. It should also fail loudly rather than silently, which is a design decision, not an accident.",
  "05": "Documented well enough that somebody else could pick it up. Not a manual, just the moving parts, where the configuration lives, and what to do when something breaks. If you cannot leave me, I have built the wrong thing.",
  "06": "No retainer is pushed on anyone. Plenty of projects are finished when they are finished. The option exists because some clients would rather have someone who already knows the codebase than brief a stranger every time something changes.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        title="From your requirements to a finished product"
        lede="Six stages, the same every time. Nothing about it is mysterious, and none of it skips review."
      />

      <section className="site-container bg-background py-20 lg:py-28">
        <ol className="border-t border-border">
          {processSteps.map((step, index) => (
            <Reveal
              as="li"
              key={step.number}
              delay={index * 0.05}
              className="border-b border-border py-12 lg:py-16"
            >
              <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <p className="font-mono text-sm tabular-nums text-primary">
                    {step.number}
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
                    {step.title}
                  </h2>
                  <p className="mt-4 text-[11px] uppercase tracking-widest text-muted-foreground/60">
                    {step.duration}
                  </p>
                </div>

                <div className="lg:col-span-8">
                  <p className="text-base font-light leading-relaxed text-foreground/80">
                    {step.description}
                  </p>
                  <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
                    {detail[step.number]}
                  </p>

                  <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div>
                      <dt className="text-xs uppercase tracking-widest text-primary">
                        Your part
                      </dt>
                      <dd className="mt-2 text-sm text-foreground/80">
                        {step.you}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                        My part
                      </dt>
                      <dd className="mt-2 text-sm text-foreground/80">
                        {step.me}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-20 block">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            One thing worth saying plainly
          </h2>
          <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
            AI writes the first draft. It does not decide what to build, it
            does not catch its own mistakes, and it does not carry the
            consequences. That part is still a person, and on your project the
            person is me.
          </p>
          <Link
            href={siteConfig.bookingUrl}
            className={`${buttonVariants({ variant: "hero", size: "xl" })} mt-8 text-xs font-semibold uppercase tracking-widest`}
          >
            Start at stage one
          </Link>
        </Reveal>
      </section>
    </>
  );
}
