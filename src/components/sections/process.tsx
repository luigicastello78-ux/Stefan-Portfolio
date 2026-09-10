import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { processSteps } from "@/content/process";

/**
 * Five steps, numbered vertical sequence. PRD section 8.5.
 *
 * Given a spine rather than five loose rows, because the content is a
 * sequence and the old layout did not say so. The rail draws itself as the
 * section scrolls past, which is a progressive enhancement: see the note on
 * `.timeline-rail` in globals.css.
 *
 * Nodes sit on the rail at each step. On large screens the step number is
 * set large enough to work as the visual anchor, which the previous version
 * asked a 14px label to do.
 */
export function Process() {
  return (
    <section
      id="process"
      className="site-container border-t border-border bg-background py-24 lg:py-32"
    >
      <SectionHeading
        eyebrow="Process"
        title="How a build actually runs"
        lede="The same five steps every time. Nothing about it is mysterious, and none of it skips review."
      />

      <div className="relative mt-16">
        {/* The rail, and the part of it that has been drawn. */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-[11px] top-2 w-px bg-border lg:left-[calc(4rem+11px)]"
        >
          <div className="timeline-rail h-full w-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />
        </div>

        <ol>
          {processSteps.map((step, index) => (
            <Reveal
              as="li"
              key={step.number}
              delay={index * 0.05}
              className="relative pb-12 pl-10 last:pb-0 lg:pb-16 lg:pl-[calc(4rem+2.5rem)]"
            >
              {/* Node. Sits centred on the rail at both breakpoints. */}
              <span
                aria-hidden="true"
                className="absolute left-[4px] top-2 flex h-4 w-4 items-center justify-center rounded-full border border-primary/40 bg-background lg:left-[calc(4rem+4px)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </span>

              <span className="absolute left-0 top-0 hidden text-3xl font-semibold tabular-nums tracking-tight text-muted-foreground/30 lg:block">
                {step.number}
              </span>

              <div className="grid gap-3 lg:grid-cols-12 lg:gap-8">
                <h3 className="text-xl font-semibold tracking-tight text-foreground lg:col-span-4 lg:text-2xl">
                  <span className="mr-3 text-sm tracking-[0.2em] text-primary lg:hidden">
                    {step.number}
                  </span>
                  {step.title}
                </h3>
                <p className="text-sm font-light leading-relaxed text-muted-foreground lg:col-span-8 lg:text-base">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
