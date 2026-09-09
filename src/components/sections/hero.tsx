import Link from "next/link";

import { HeroBackdrop } from "@/components/site/hero-backdrop";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Full viewport hero, content anchored bottom-left. PRD section 8.2.
 *
 * The content column is pointer-events-none so clicks reach the 3D scene.
 * The two buttons re-enable pointer events for themselves.
 *
 * Headline: PRD decision 5, option B, split across the eyebrow and the H1.
 * "From idea to deployed" carries the promise, "days, not weeks" carries the
 * display weight. Setting the full sentence at the reference display size
 * would run to five lines.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-hero-bg">
      <HeroBackdrop />

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-black/30"
        aria-hidden="true"
      />

      <div className="site-container pointer-events-none relative z-10 w-full pb-10 pt-32 md:pb-10">
        <div className="max-w-[90%] sm:max-w-md lg:max-w-2xl">
          <p
            className="mb-4 animate-fade-up text-xs uppercase tracking-[0.3em] text-primary opacity-0"
            style={{ animationDelay: "0.1s" }}
          >
            From idea to deployed
          </p>

          <h1
            className="mb-2 animate-fade-up text-[clamp(3rem,8vw,6rem)] font-bold uppercase leading-[1.05] tracking-[-0.05em] text-foreground opacity-0 md:mb-4"
            style={{ animationDelay: "0.2s" }}
          >
            In <span className="text-primary">days</span>, not weeks
          </h1>

          <p
            className="mb-3 animate-fade-up text-[clamp(1.125rem,2.5vw,1.875rem)] font-light text-foreground/80 opacity-0 md:mb-6"
            style={{ animationDelay: "0.4s" }}
          >
            Vibe-code developer. That means AI writes the first draft and I own
            every line that ships.
          </p>

          <p
            className="mb-4 animate-fade-up text-[clamp(0.875rem,1.5vw,1.25rem)] font-light text-muted-foreground opacity-0 md:mb-8"
            style={{ animationDelay: "0.55s" }}
          >
            Websites, web apps and MVPs built with AI pair-programming and
            reviewed line by line. Automation wired in so the thing keeps working
            after launch.
          </p>

          <div
            className="flex animate-fade-up flex-wrap gap-3 font-bold opacity-0"
            style={{ animationDelay: "0.7s" }}
          >
            <Link
              href={siteConfig.bookingUrl}
              className={cn(
                buttonVariants({ variant: "hero", size: "xl" }),
                "pointer-events-auto"
              )}
            >
              Book a call
            </Link>
            <Link
              href="/work"
              className={cn(
                buttonVariants({ variant: "heroOutline", size: "xl" }),
                "pointer-events-auto"
              )}
            >
              See the work
            </Link>
          </div>

          <p
            className="mt-4 animate-fade-up text-xs font-light text-muted-foreground/60 opacity-0 md:mt-6"
            style={{ animationDelay: "0.85s" }}
          >
            Stefan Stankovski. Available for new builds. Remote, working
            globally.
          </p>
        </div>
      </div>
    </section>
  );
}
