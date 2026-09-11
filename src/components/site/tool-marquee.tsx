import { heroMarquee } from "@/content/hero-log";

/**
 * The ticker along the foot of the hero.
 *
 * It was a flat run of twelve names in plain grey, which read as filler.
 * Now it is grouped: a green category label, then the tools in that group
 * as bordered chips. Same width, same height, considerably more said.
 *
 * A fixed "stack" label holds the left edge so the strip reads as a ticker
 * with a masthead rather than as text that happens to be moving.
 *
 * Two identical copies of the track slide left by exactly half its width,
 * which loops without a seam. The second copy is hidden from assistive
 * technology so nothing is announced twice, and the whole thing stops for
 * anyone who has asked for less motion.
 *
 * Hovering pauses it, because a moving list is annoying to read.
 */
function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-6 pr-6 sm:gap-8 sm:pr-8"
      aria-hidden={hidden || undefined}
    >
      {heroMarquee.map((group) => (
        <li key={group.label} className="flex items-center gap-3 sm:gap-4">
          <span className="whitespace-nowrap font-mono text-[11px] lowercase tracking-widest text-primary">
            {group.label}
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-border" />
          <span className="flex items-center gap-2">
            {group.items.map((item) => (
              <span
                key={item}
                className="whitespace-nowrap rounded-full border border-border px-3 py-1 text-xs font-light text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {item}
              </span>
            ))}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ToolMarquee() {
  return (
    <div className="flex items-stretch border-y border-border/60 bg-hero-bg/80 backdrop-blur-sm">
      <span className="flex shrink-0 items-center border-r border-border/60 px-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70 sm:px-7">
        Stack
      </span>

      <div className="group relative min-w-0 flex-1 overflow-hidden py-4">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          <Track />
          <Track hidden />
        </div>

        {/* Fades both edges so chips do not hard-cut against the rule or
            pop out of existence on the way off screen. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-hero-bg to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-hero-bg to-transparent sm:w-20"
        />
      </div>
    </div>
  );
}
