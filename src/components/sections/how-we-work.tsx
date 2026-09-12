import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { processSteps } from "@/content/process";
import { siteConfig } from "@/config/site";

/**
 * How we work. PRD sections 8.5 and 8.6, merged.
 *
 * This replaces two separate sections: a timeline of the build, and a
 * defensive block about build quality. They were saying the same thing
 * twice. The quality question is now answered where it actually belongs, at
 * the review stage, as part of the sequence.
 *
 * Six equal cards in a three by two grid. The interesting column is the
 * one saying what the client has to do, because that is the question they
 * are really asking and almost no agency site answers it.
 *
 * Every card is the same size, and the duration sits at the bottom of each,
 * so an uneven line of copy cannot leave one card looking unfinished.
 */
export function HowWeWork() {
  return (
    <section
      id="how-we-work"
      className="site-container border-t border-border bg-hero-bg py-24 lg:py-32"
    >
      <SectionHeading
        eyebrow="How we work"
        title="From your requirements to a finished product"
        lede="Six stages, the same every time. What you have to do is in every card, because it is the part people actually want to know."
      />

      {/* The whole span, stated once, before the detail. */}
      <Reveal delay={0.2} className="mt-12 block">
        <div className="flex items-center gap-4">
          <span className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-primary">
            Day one
          </span>
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-gradient-to-r from-primary via-primary/40 to-border"
          />
          <span className="shrink-0 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Live
          </span>
        </div>
      </Reveal>

      <ol className="mt-10 grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((step, index) => (
          <Reveal
            as="li"
            key={step.number}
            delay={index * 0.06}
            className="h-full"
          >
            <div className="flex h-full flex-col rounded-xl border border-border bg-background p-7 transition-colors duration-300 hover:border-primary/30">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-sm tabular-nums text-primary">
                  {step.number}
                </span>
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground/60">
                  {step.duration}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
                {step.title}
              </h3>

              <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                {step.description}
              </p>

              <dl className="mt-auto space-y-4 border-t border-border pt-6 text-sm">
                <div className="flex gap-4">
                  <dt className="w-10 shrink-0 text-[11px] uppercase tracking-widest text-primary">
                    You
                  </dt>
                  <dd className="font-light leading-relaxed text-foreground/80">
                    {step.you}
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="w-10 shrink-0 text-[11px] uppercase tracking-widest text-muted-foreground/70">
                    Me
                  </dt>
                  <dd className="font-light leading-relaxed text-muted-foreground">
                    {step.me}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={0.1} className="mt-10 block">
        <div className="flex flex-col gap-6 rounded-lg border border-border bg-background p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              Worth saying plainly
            </h3>
            <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
              Tools have got faster. Deciding what to build, noticing when
              something is quietly wrong, and carrying the consequences have
              not. That part is still a person, and on your project the
              person is me.
            </p>
          </div>
          <Link
            href={siteConfig.bookingUrl}
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
          >
            Start at stage one
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
