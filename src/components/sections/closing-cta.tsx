import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Final conversion block before the footer. PRD section 8.9. */
export function ClosingCta() {
  return (
    <section
      id="contact"
      className="site-container border-t border-border bg-background py-24 lg:py-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">
            Next step
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
            Tell me what you are building
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-muted-foreground md:text-lg">
            Thirty minutes, no pitch. You describe the problem, I tell you
            whether it is worth building and roughly what it takes.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap justify-center gap-3 font-bold">
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
        </Reveal>
        <Reveal delay={0.32}>
          <p className="mt-6 text-xs font-light text-muted-foreground/60">
            Usually replies within a day. Remote, working globally.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
