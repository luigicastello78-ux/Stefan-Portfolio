import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { faq } from "@/content/faq";
import { siteConfig } from "@/config/site";

/**
 * Questions. PRD section 6, and the source of the FAQPage structured data.
 *
 * Two columns: a rail that stays put while the answers scroll past it, and
 * the accordion itself. The previous version was a narrow column with the
 * right half of the section empty, which wasted the one place on the page
 * where somebody is actively looking for a reason to get in touch. The rail
 * now carries that reason.
 *
 * Still native disclosure elements. No JavaScript, keyboard operable by
 * default, and every answer is in the markup whether or not it is open,
 * which is what crawlers read and what the structured data has to match.
 *
 * `name` makes the group exclusive, so opening one closes the last. Browsers
 * without support simply allow several open at once, which is fine.
 */
export function Faq() {
  return (
    <section
      id="faq"
      className="site-container border-t border-border bg-background py-24 lg:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <div className="flex items-baseline gap-4">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">
                  Questions
                </p>
                <span className="font-mono text-[11px] tabular-nums text-muted-foreground/50">
                  {String(faq.length).padStart(2, "0")}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
                The things people ask first
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-5 text-base font-light leading-relaxed text-muted-foreground">
                Mostly about the AI part, and reasonably so. Longer answers to
                the first three are on the{" "}
                <Link
                  href="/blog"
                  className="text-foreground underline decoration-primary/60 underline-offset-4 transition-colors hover:decoration-primary"
                >
                  blog
                </Link>
                .
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 rounded-lg border border-border bg-hero-bg p-6">
                <p className="text-sm font-medium text-foreground">
                  Something not covered here?
                </p>
                <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                  Ask it on a call. Thirty minutes, no pitch.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <Link
                    href={siteConfig.bookingUrl}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
                  >
                    Book a call
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </Link>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    or email
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-border">
            {faq.map((item, index) => (
              <Reveal
                as="li"
                key={item.question}
                delay={index * 0.04}
                className="border-b border-border"
              >
                <details
                  name="faq"
                  open={index === 0}
                  className="group relative"
                >
                  {/* Marks the open row without moving anything. */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 top-0 w-px scale-y-0 bg-primary transition-transform duration-300 group-open:scale-y-100"
                  />

                  <summary className="flex cursor-pointer list-none items-start gap-5 py-6 pl-6 pr-2 transition-colors hover:bg-muted/40 [&::-webkit-details-marker]:hidden">
                    <span className="mt-1 shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground/50 transition-colors group-open:text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="flex-1 text-lg font-medium leading-snug text-foreground md:text-xl">
                      {item.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-all duration-300 group-open:rotate-45 group-open:border-primary/50"
                    >
                      +
                    </span>
                  </summary>

                  <p className="max-w-2xl pb-7 pl-6 pr-12 text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                    {item.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
