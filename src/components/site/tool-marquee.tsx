import { heroMarquee } from "@/content/hero-log";

/**
 * The strip along the foot of the hero.
 *
 * Two identical copies of the list slide left by exactly half the track
 * width, which loops without a seam. The second copy is hidden from
 * assistive technology so the names are not announced twice, and the whole
 * strip stops moving for anyone who has asked for less motion, courtesy of
 * the global reduced-motion rule.
 *
 * Hovering pauses it, because a moving list is annoying to read.
 */
function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
      aria-hidden={hidden || undefined}
    >
      {heroMarquee.map((tool) => (
        <li
          key={tool}
          className="whitespace-nowrap text-sm font-light tracking-wide text-muted-foreground/70"
        >
          {tool}
        </li>
      ))}
    </ul>
  );
}

export function ToolMarquee() {
  return (
    <div className="group relative overflow-hidden border-y border-border/60 bg-hero-bg/80 py-5 backdrop-blur-sm">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <Row />
        <Row hidden />
      </div>

      {/* Fades the ends so names do not pop in and out at the edges. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-hero-bg to-transparent sm:w-28"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-hero-bg to-transparent sm:w-28"
      />
    </div>
  );
}
