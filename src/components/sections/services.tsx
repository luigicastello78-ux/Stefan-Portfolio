import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { services } from "@/content/services";
import { siteConfig } from "@/config/site";

/** Five service lines. PRD section 8.3. No prices anywhere. */
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

      <ul className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal
            as="li"
            key={service.number}
            delay={index * 0.06}
            className="group bg-background p-8 transition-colors hover:bg-muted lg:p-10"
          >
            <p className="text-xs tracking-[0.2em] text-primary">
              {service.number}
            </p>
            <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
              {service.title}
            </h3>
            <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
              {service.description}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {service.detail.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}

        <Reveal
          as="li"
          delay={services.length * 0.06}
          className="flex flex-col justify-between bg-background p-8 lg:p-10"
        >
          <div>
            <p className="text-xs tracking-[0.2em] text-primary">06</p>
            <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
              Something else
            </h3>
            <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
              Most work is a mix of the five. Describe the problem and I will
              tell you whether I am the right person for it.
            </p>
          </div>
          <Link
            href={siteConfig.bookingUrl}
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
          >
            Book a call
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </Reveal>
      </ul>
    </section>
  );
}
