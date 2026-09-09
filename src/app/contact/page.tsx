import type { Metadata } from "next";

import { ContactForm } from "@/components/site/contact-form";
import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a call or send a message. Thirty minutes, no pitch. Remote, working globally.",
  alternates: { canonical: "/contact" },
};

/** A booking link exists only once the owner supplies one. PRD section 10.1. */
const hasBookingLink = !siteConfig.bookingUrl.startsWith("/");

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell me what you are building"
        lede="Thirty minutes, no pitch. You describe the problem, I tell you whether it is worth building and roughly what it takes."
      />

      <section className="site-container bg-background py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Send a message
              </h2>
              <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                The more concrete you are, the more useful my first reply is.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="mt-10 block">
              <ContactForm />
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <Reveal delay={0.16}>
              <div className="rounded-lg border border-border bg-hero-bg p-8">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  {hasBookingLink ? "Rather just talk?" : "Prefer email?"}
                </h2>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                  {hasBookingLink
                    ? "Pick a slot that suits you. No preparation needed."
                    : "Direct email works as well as anything. Scheduled booking is coming shortly."}
                </p>

                {hasBookingLink ? (
                  <a
                    href={siteConfig.bookingUrl}
                    className={`${buttonVariants({ variant: "hero", size: "xl" })} mt-6 text-xs font-semibold uppercase tracking-widest`}
                  >
                    Book a call
                  </a>
                ) : (
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className={`${buttonVariants({ variant: "hero", size: "xl" })} mt-6 text-xs font-semibold uppercase tracking-widest`}
                  >
                    Email me
                  </a>
                )}

                <dl className="mt-10 space-y-6 border-t border-border pt-8">
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                      Email
                    </dt>
                    <dd className="mt-2">
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-sm text-foreground/90 underline underline-offset-4 transition-opacity hover:opacity-70"
                      >
                        {siteConfig.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                      Availability
                    </dt>
                    <dd className="mt-2 flex items-center gap-2 text-sm text-foreground/90">
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                      Available for new builds
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                      Where
                    </dt>
                    <dd className="mt-2 text-sm text-foreground/90">
                      Remote, working globally
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                      Response time
                    </dt>
                    <dd className="mt-2 text-sm text-foreground/90">
                      Usually within a day
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
