import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { processSteps } from "@/content/process";

/** Five steps, numbered vertical sequence, revealed on scroll. PRD section 8.5. */
export function Process() {
  return (
    <section
      id="process"
      className="border-t border-border bg-background px-6 py-24 md:px-10 lg:px-16 lg:py-32"
    >
      <SectionHeading
        eyebrow="Process"
        title="How a build actually runs"
        lede="The same five steps every time. Nothing about it is mysterious, and none of it skips review."
      />

      <ol className="mt-16 border-t border-border">
        {processSteps.map((step, index) => (
          <Reveal
            as="li"
            key={step.number}
            delay={index * 0.05}
            className="border-b border-border py-10 lg:py-12"
          >
            <div className="grid gap-4 lg:grid-cols-12 lg:gap-8">
              <p className="text-sm tracking-[0.2em] text-primary lg:col-span-1">
                {step.number}
              </p>
              <h3 className="text-xl font-semibold tracking-tight text-foreground lg:col-span-4 lg:text-2xl">
                {step.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-muted-foreground lg:col-span-7 lg:text-base">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
