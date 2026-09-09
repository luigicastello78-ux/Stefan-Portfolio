import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { buttonVariants } from "@/components/ui/button";
import { services } from "@/content/services";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI-assisted website builds, web apps and MVPs, automation workflows, technical SEO, deployment and operations.",
  alternates: { canonical: "/services" },
};

/** Extra depth that the homepage cards deliberately leave out. */
const expanded: Record<string, { what: string; who: string }> = {
  "01": {
    what: "A site that loads fast, reads well and can be edited without calling me. Design, build, content and launch.",
    who: "You have a product or a service and the current site is either ugly, slow, or does not exist.",
  },
  "02": {
    what: "A working product with real data, real accounts and a real deployment. Not a clickable mockup.",
    who: "You need to put something in front of users or investors and you do not have engineers yet.",
  },
  "03": {
    what: "The plumbing between the tools you already use, so leads, notifications and records move without anyone copying and pasting.",
    who: "Something in your business runs on somebody remembering to do it.",
  },
  "04": {
    what: "Technical fixes first, then content that is actually about something. Structure, schema, speed, then words.",
    who: "You rank for your own name and nothing else.",
  },
  "05": {
    what: "Repositories, pipelines, domains and monitoring, set up in accounts you own and documented so you can leave.",
    who: "You want to own the thing you paid for.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Five things, done properly"
        lede="No packages and no price list. Work is hourly or on a monthly retainer, and which one suits you comes out of the first call."
      />

      <section className="bg-background px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <ol className="border-t border-border">
          {services.map((service, index) => {
            const detail = expanded[service.number];
            return (
              <Reveal
                as="li"
                key={service.number}
                delay={index * 0.05}
                className="border-b border-border py-12 lg:py-16"
              >
                <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-4">
                    <p className="text-sm tracking-[0.2em] text-primary">
                      {service.number}
                    </p>
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
                      {service.title}
                    </h2>
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
                  </div>

                  <div className="lg:col-span-8">
                    <p className="text-base font-light leading-relaxed text-foreground/80">
                      {service.description}
                    </p>
                    {detail ? (
                      <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                        <div>
                          <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                            What you get
                          </dt>
                          <dd className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                            {detail.what}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                            Right for you if
                          </dt>
                          <dd className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                            {detail.who}
                          </dd>
                        </div>
                      </dl>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <Reveal className="mt-20 block">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            How it is priced
          </h2>
          <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
            Hourly for defined pieces of work. Monthly retainer when you want
            someone who already knows the codebase and can pick things up
            without a briefing. No fixed packages, because they always either
            cheat you or cheat me.
          </p>
          <Link
            href={siteConfig.bookingUrl}
            className={`${buttonVariants({ variant: "hero", size: "xl" })} mt-8 text-xs font-semibold uppercase tracking-widest`}
          >
            Talk it through
          </Link>
        </Reveal>
      </section>
    </>
  );
}
