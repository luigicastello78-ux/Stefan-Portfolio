import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";

/**
 * Answers the unspoken objection. PRD section 8.6.
 * Speed leads the hero, so this section has to carry the counterweight.
 */
const claims = [
  {
    title: "AI drafts. A developer ships.",
    body: "A model produces the first version. I read it, correct it, and take responsibility for what goes live. Nothing reaches production because it looked plausible.",
  },
  {
    title: "Measured, not asserted.",
    body: "Every build is checked against real budgets. Performance, accessibility and layout are tested on actual devices before handoff, not promised in a proposal.",
  },
  {
    title: "Speed comes from removing waiting.",
    body: "The time saved is the blank page, the boilerplate and the back and forth. The review does not get skipped. That is the whole difference.",
  },
];

export function Quality() {
  return (
    <section
      id="quality"
      className="border-t border-border bg-hero-bg px-6 py-24 md:px-10 lg:px-16 lg:py-32"
    >
      <SectionHeading
        eyebrow="The obvious question"
        title="If AI wrote it, is it any good?"
        lede="Fair question. It is the first thing a serious client asks, so here is the honest answer."
      />

      <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
        {claims.map((claim, index) => (
          <Reveal
            key={claim.title}
            delay={index * 0.08}
            className="bg-hero-bg p-8 lg:p-10"
          >
            <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground">
              {claim.title}
            </h3>
            <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
              {claim.body}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
