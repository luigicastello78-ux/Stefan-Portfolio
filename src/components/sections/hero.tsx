import Link from "next/link";

import { BuildPanel } from "@/components/site/build-panel";
import { HeroBackdrop } from "@/components/site/hero-backdrop";
import { ToolMarquee } from "@/components/site/tool-marquee";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Hero. PRD section 8.2, rebuilt.
 *
 * The previous version put the copy in the bottom-left corner over a 3D
 * scene. The scene is gone, and with it the reason for the layout: a corner
 * of text over decoration wastes two thirds of the first screen.
 *
 * Now it is a split. Copy on the left, a panel on the right that states the
 * positioning as a sequence of steps rather than another paragraph, and a
 * strip of tooling along the foot. Nothing here is a canvas: the whole
 * screen is text, borders and gradients.
 *
 * The headline carries both halves of the positioning rather than only the
 * speed: built in days is the hook, built to keep working is the reason
 * anyone should believe it. Leading on speed alone invites the obvious
 * suspicion, and answering it in the same breath is cheaper than answering
 * it later.
 *
 * The subheading names the four services, which is where the keywords live
 * now that the headline is a claim rather than a job title.
 */

/** Three facts under the buttons. Plain, checkable, no invented metrics. */
const facts = [
  { label: "Where", value: "Remote, working globally" },
  { label: "Who with", value: "Founders and small teams" },
  { label: "Right now", value: "Available for new builds" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-hero-bg pt-24 lg:pt-32">
      <HeroBackdrop />

      <div className="site-container relative z-10 w-full py-10 lg:py-12">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p
              className="animate-fade-up text-xs uppercase tracking-[0.3em] text-primary opacity-0"
              style={{ animationDelay: "0.1s" }}
            >
              From idea to deployed
            </p>

            <h1
              className="mt-5 animate-fade-up text-[clamp(2.4rem,5vw,4.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.045em] text-foreground opacity-0"
              style={{ animationDelay: "0.2s" }}
            >
              Built in <span className="text-primary">days</span>.
              <br className="hidden sm:block" /> Built to keep working.
            </h1>

            <p
              className="mt-5 max-w-2xl animate-fade-up text-[clamp(1.05rem,2vw,1.5rem)] font-light leading-snug text-foreground/80 opacity-0"
              style={{ animationDelay: "0.35s" }}
            >
              Web development, design, technical SEO and automation. One
              person, start to finish.
            </p>

            <p
              className="mt-5 max-w-lg animate-fade-up text-sm font-light leading-relaxed text-muted-foreground opacity-0 md:text-base"
              style={{ animationDelay: "0.45s" }}
            >
              Websites, web apps and Webflow builds for people who want the
              thing working, not a deck about the thing. The automation goes
              in too, so it keeps running after you stop watching it.
            </p>

            <div
              className="mt-9 flex animate-fade-up flex-wrap gap-3 font-bold opacity-0"
              style={{ animationDelay: "0.6s" }}
            >
              <Link
                href={siteConfig.bookingUrl}
                className={buttonVariants({ variant: "hero", size: "xl" })}
              >
                Book a call
              </Link>
              <Link
                href="/work"
                className={cn(
                  buttonVariants({ variant: "heroOutline", size: "xl" })
                )}
              >
                See the work
              </Link>
            </div>

            <dl
              className="mt-10 grid animate-fade-up grid-cols-2 gap-5 border-t border-border/70 pt-7 opacity-0 sm:grid-cols-3 lg:mt-10 lg:gap-6 lg:pt-7"
              style={{ animationDelay: "0.75s" }}
            >
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-sm text-foreground/85">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            className="animate-fade-up opacity-0 lg:col-span-5"
            style={{ animationDelay: "0.45s" }}
          >
            <BuildPanel />
          </div>
        </div>
      </div>

      <div
        className="relative z-10 mt-auto animate-fade-in opacity-0"
        style={{ animationDelay: "0.95s" }}
      >
        <ToolMarquee />
      </div>
    </section>
  );
}
