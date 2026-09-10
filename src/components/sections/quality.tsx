import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

/**
 * Answers the unspoken objection. PRD section 8.6.
 * Speed leads the hero, so this section has to carry the counterweight.
 *
 * Set as assumption against reality rather than three columns of prose. The
 * objection is already in the reader's head, so naming it is more persuasive
 * than talking around it, and the pairing gives the section a spine that a
 * row of equal paragraphs never had.
 */
const pairs = [
  {
    assumption: "A model writes it and nobody checks.",
    reality:
      "A model writes the first version. I read every line, throw out what is wrong, and own what ships. Nothing reaches production because it looked plausible.",
  },
  {
    assumption: "Fast means sloppy.",
    reality:
      "Every build is measured against real budgets for performance, accessibility and layout, on real devices, before handoff. Not promised in a proposal.",
  },
  {
    assumption: "You are only writing prompts.",
    reality:
      "The prompt is the easy ten percent. Deciding what to keep, what to rewrite and what to throw away is the job, and it is the part that does not get faster.",
  },
];

export function Quality() {
  return (
    <section
      id="quality"
      className="site-container border-t border-border bg-hero-bg py-24 lg:py-32"
    >
      <SectionHeading
        eyebrow="The obvious question"
        title="If AI wrote it, is it any good?"
        lede="Fair question. It is the first thing a serious client asks, so here is the honest answer, in the order people usually ask it."
      />

      <div className="mt-16">
        <div className="hidden grid-cols-12 gap-8 border-b border-border pb-4 lg:grid">
          <p className="col-span-5 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            What people assume
          </p>
          <p className="col-span-7 text-xs uppercase tracking-[0.25em] text-primary">
            What actually happens
          </p>
        </div>

        <dl>
          {pairs.map((pair, index) => (
            <Reveal
              key={pair.assumption}
              delay={index * 0.07}
              className="border-b border-border py-10 lg:py-12"
            >
              <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
                <dt className="lg:col-span-5">
                  <span className="mb-3 block text-[11px] uppercase tracking-[0.25em] text-muted-foreground lg:hidden">
                    The assumption
                  </span>
                  <span className="block text-xl font-light leading-snug text-muted-foreground line-through decoration-destructive/50 decoration-1 underline-offset-4 md:text-2xl">
                    {pair.assumption}
                  </span>
                </dt>

                <dd className="lg:col-span-7">
                  <span className="mb-3 block text-[11px] uppercase tracking-[0.25em] text-primary lg:hidden">
                    What happens
                  </span>
                  <div className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-px w-8 shrink-0 bg-primary lg:w-12"
                    />
                    <p className="text-base font-light leading-relaxed text-foreground/85 md:text-lg">
                      {pair.reality}
                    </p>
                  </div>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
