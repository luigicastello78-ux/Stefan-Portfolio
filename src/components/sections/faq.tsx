import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { faq } from "@/content/faq";

/**
 * Native disclosure elements. No JavaScript, keyboard operable by default,
 * and the answers are in the markup whether or not anyone opens them, which
 * is what search engines read.
 */
export function Faq() {
  return (
    <section
      id="faq"
      className="site-container border-t border-border bg-background py-24 lg:py-32"
    >
      <SectionHeading
        eyebrow="Questions"
        title="The things people ask first"
        lede="Mostly about the AI part, and reasonably so."
      />

      <div className="mt-16 max-w-3xl">
        {faq.map((item, index) => (
          <Reveal key={item.question} delay={index * 0.04}>
            <details className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-medium text-foreground transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  className="shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="pb-6 pr-10 text-sm font-light leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </details>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 block">
        <p className="text-sm font-light text-muted-foreground">
          Longer answers to the first three live on the{" "}
          <Link
            href="/blog"
            className="text-foreground underline decoration-primary/60 underline-offset-4 hover:decoration-primary"
          >
            blog
          </Link>
          .
        </p>
      </Reveal>
    </section>
  );
}
