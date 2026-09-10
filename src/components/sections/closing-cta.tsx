import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Final conversion block before the footer. PRD section 8.9.
 *
 * Framed and left-aligned rather than a centred block of text. Centred
 * copy over a full-bleed dark section had nothing holding it, and the last
 * thing on the page should feel like a panel you act on rather than a
 * paragraph that trails off.
 *
 * The glow is a static gradient, not an animation. There is already enough
 * movement above it.
 */
export function ClosingCta() {
  return (
    <section
      id="contact"
      className="site-container border-t border-border bg-background py-24 lg:py-32"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-xl border border-border bg-hero-bg p-8 md:p-12 lg:p-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96"
            style={{
              background:
                "radial-gradient(circle closest-side, hsl(var(--primary) / 0.14), transparent 70%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse 70% 90% at 100% 0%, black, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 90% at 100% 0%, black, transparent 70%)",
            }}
          />

          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.06] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-primary">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
                />
                Available for new builds
              </span>

              <h2 className="mt-7 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground">
                Tell me what you are building
              </h2>

              <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-muted-foreground md:text-lg">
                Thirty minutes, no pitch. You describe the problem, I tell you
                whether it is worth building and roughly what it takes.
              </p>
            </div>

            <div className="lg:col-span-5 lg:justify-self-end">
              <div className="flex flex-wrap gap-3 font-bold lg:justify-end">
                <Link
                  href={siteConfig.bookingUrl}
                  className={buttonVariants({ variant: "hero", size: "xl" })}
                >
                  Book a call
                </Link>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "xl" }),
                    "rounded-sm"
                  )}
                >
                  Send an email
                </a>
              </div>
              <p className="mt-5 text-xs font-light text-muted-foreground/70 lg:text-right">
                Usually replies within a day. Remote, working globally.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
