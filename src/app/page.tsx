import { Button } from "@/components/ui/button";

/**
 * Part 1 shell. The hero and every content section land in Part 2.
 * What this page exists to prove: tokens resolve, Sora loads, the fade-up
 * stagger runs, and the button variants render.
 */

const swatches = [
  { name: "hero-bg", className: "bg-hero-bg border border-border" },
  { name: "background", className: "bg-background" },
  { name: "muted", className: "bg-muted" },
  { name: "secondary", className: "bg-secondary" },
  { name: "border", className: "bg-border" },
  { name: "muted-foreground", className: "bg-muted-foreground" },
  { name: "foreground", className: "bg-foreground" },
  { name: "primary", className: "bg-primary" },
  { name: "destructive", className: "bg-destructive" },
];

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-screen items-end overflow-hidden bg-hero-bg">
        <div className="w-full max-w-[90%] px-6 pb-10 pt-32 sm:max-w-md md:px-10 lg:max-w-2xl">
          <p
            className="mb-4 animate-fade-up text-xs uppercase tracking-[0.3em] text-primary opacity-0"
            style={{ animationDelay: "0.1s" }}
          >
            Part 1 — foundation
          </p>

          <h1
            className="mb-2 animate-fade-up text-[clamp(3rem,8vw,6rem)] font-bold uppercase leading-[1.05] tracking-[-0.05em] text-foreground opacity-0 md:mb-4"
            style={{ animationDelay: "0.2s" }}
          >
            Stefan <span className="text-primary">S</span>
          </h1>

          <p
            className="mb-3 animate-fade-up text-[clamp(1.125rem,2.5vw,1.875rem)] font-light text-foreground/80 opacity-0 md:mb-6"
            style={{ animationDelay: "0.4s" }}
          >
            The shell is standing.
          </p>

          <p
            className="mb-4 animate-fade-up text-[clamp(0.875rem,1.5vw,1.25rem)] font-light text-muted-foreground opacity-0 md:mb-8"
            style={{ animationDelay: "0.55s" }}
          >
            Design tokens, Sora, the motion system, the button variants, the
            fixed navigation and the footer are all in place. The Spline hero
            and every content section arrive in Part 2.
          </p>

          <div
            className="flex animate-fade-up flex-wrap gap-3 opacity-0"
            style={{ animationDelay: "0.7s" }}
          >
            <Button variant="hero" size="xl" className="font-bold">
              Book a call
            </Button>
            <Button variant="heroOutline" size="xl" className="font-bold">
              See the work
            </Button>
          </div>

          <p
            className="mt-4 animate-fade-up text-xs font-light text-muted-foreground/60 opacity-0 md:mt-6"
            style={{ animationDelay: "0.85s" }}
          >
            Available for new builds. Remote, working globally.
          </p>
        </div>
      </section>

      <section
        id="system"
        className="border-t border-border bg-background px-8 py-24 lg:px-16"
      >
        <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight text-foreground">
          System check
        </h2>
        <p className="mt-3 max-w-xl text-sm font-light text-muted-foreground">
          Every token from the specification, rendered. Delete this section once
          Part 2 lands.
        </p>

        <div className="mt-12 grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9">
          {swatches.map((swatch) => (
            <div key={swatch.name}>
              <div
                className={`h-16 w-full rounded-md ${swatch.className}`}
                aria-hidden="true"
              />
              <p className="mt-2 break-words text-[11px] text-muted-foreground">
                {swatch.name}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="navCta" size="lg" className="rounded-lg px-6 text-xs uppercase tracking-widest">
            Nav call to action
          </Button>
          <Button variant="destructive">Destructive</Button>
        </div>

        <div className="mt-16 space-y-4">
          <p className="text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight text-foreground">
            Section heading, weight 600
          </p>
          <p className="max-w-2xl text-lg font-light leading-relaxed text-foreground/80">
            Body copy at weight 300. Short sentences. No hedging. Claims are
            specific or they are cut.
          </p>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Muted body copy, used for supporting detail.
          </p>
        </div>
      </section>
    </>
  );
}
