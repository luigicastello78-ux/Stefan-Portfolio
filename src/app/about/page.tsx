import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/site/page-header";
import { Portrait } from "@/components/site/portrait";
import { Reveal } from "@/components/site/reveal";
import { buttonVariants } from "@/components/ui/button";
import { toolGroups } from "@/content/tools";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Self-taught developer working through AI-assisted builds alongside real code. Three years shipping websites, apps and automation.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Who is doing the work"
        lede="One person. No agency layer, no account manager, no handoff to somebody you have never spoken to."
      />

      <section className="bg-background px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Portrait />
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <Reveal delay={0.08}>
              <div className="space-y-6 text-base font-light leading-relaxed text-foreground/80">
                <p>
                  I am Stefan. I build websites, web apps and automation, and I
                  do it with AI sitting next to me the entire time.
                </p>
                <p>
                  That phrase makes some people nervous, so here is what it
                  actually means. A model writes the first version. I read all
                  of it, throw out the parts that are wrong, and keep the parts
                  that are not. The result is that a build which used to take
                  three weeks now takes three days, and the quality is my
                  problem either way.
                </p>
                <p>
                  I am self-taught, and I studied at FINKI. Three years of
                  shipping things for real clients taught me more than either.
                  Most of what I know came from breaking something in
                  production and then fixing it.
                </p>
                <p>
                  I work alone and I work remotely, with clients in whatever
                  timezone they happen to be in. If you hire me, the person on
                  the call is the person writing the code.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16} className="mt-16 block">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                What I work with
              </h2>
              <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
                {toolGroups.map((group) => (
                  <div key={group.name} className="bg-background p-6">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-primary">
                      {group.name}
                    </h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.24} className="mt-16 block border-t border-border pt-12">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Currently
              </h2>
              <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
                Available for new builds and taking on one or two ongoing
                retainers. If the timing is wrong I will say so on the call
                rather than string it out.
              </p>
              <Link
                href={siteConfig.bookingUrl}
                className={`${buttonVariants({ variant: "hero", size: "xl" })} mt-8 text-xs font-semibold uppercase tracking-widest`}
              >
                Book a call
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
