import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { services } from "@/content/services";
import { siteConfig } from "@/config/site";

/**
 * Five service lines. PRD section 8.3. No prices anywhere.
 *
 * Editorial rows rather than a card grid. A card grid gives six things equal
 * weight and equal size, which reads like a feature list on a SaaS page. Set
 * as full-width rows the titles can carry display weight, the eye moves down
 * one column instead of scanning a table, and the hover state has somewhere
 * to go.
 *
 * Hover is emphasis only. Every word is in the markup and visible before any
 * interaction, so nothing is hidden from keyboards, screen readers or search
 * engines.
 *
 * The list is pulled out by exactly the padding each row carries, so the
 * text still lines up with the heading above while the hover band extends
 * past it on both sides. The pull is always smaller than the container
 * gutter, so it cannot cause horizontal overflow.
 */
export function Services() {
  return (
    <section
      id="services"
      className="site-container border-t border-border bg-background py-24 lg:py-32"
    >
      <SectionHeading
        eyebrow="Services"
        title="What I build"
        lede="Five things, done properly. No packages, no price list. Every one of them starts with a call."
      />

      <ol className="-mx-5 mt-16 border-t border-border md:-mx-7 lg:-mx-9">
        {services.map((service, index) => (
          <Reveal
            as="li"
            key={service.number}
            delay={index * 0.05}
            className="border-b border-border"
          >
            <Link
              href="/services"
              className="group relative block overflow-hidden rounded-lg px-5 py-8 md:px-7 lg:px-9 lg:py-10"
            >
              {/* Wipes in from the left on hover. Transform only.
                  Inset zero, not negative: the row clips its own overflow,
                  so anything outside the box was never drawn anyway. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-primary/[0.07] via-primary/[0.03] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
              />

              <div className="relative grid gap-5 lg:grid-cols-12 lg:items-baseline lg:gap-8">
                <span className="text-xs tracking-[0.25em] text-muted-foreground transition-colors group-hover:text-primary lg:col-span-1">
                  {service.number}
                </span>

                <h3 className="text-2xl font-semibold leading-[1.1] tracking-[-0.02em] text-foreground transition-transform duration-500 ease-out group-hover:translate-x-1 md:text-3xl lg:col-span-5 lg:text-[2.5rem]">
                  {service.title}
                </h3>

                <div className="lg:col-span-5">
                  <p className="max-w-md text-sm font-light leading-relaxed text-muted-foreground md:text-base">
                    {service.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {service.detail.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground transition-colors group-hover:border-primary/30"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <span
                  aria-hidden="true"
                  className="hidden text-2xl text-muted-foreground transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:text-primary lg:col-span-1 lg:block lg:justify-self-end"
                >
                  &rarr;
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={0.1} className="mt-14 block">
        <div className="flex flex-col gap-6 rounded-lg border border-border bg-hero-bg p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              Something that is none of the above
            </h3>
            <p className="mt-2 max-w-lg text-sm font-light leading-relaxed text-muted-foreground">
              Most work is a mix of the five anyway. Describe the problem and I
              will tell you whether I am the right person for it.
            </p>
          </div>
          <Link
            href={siteConfig.bookingUrl}
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
          >
            Book a call
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
