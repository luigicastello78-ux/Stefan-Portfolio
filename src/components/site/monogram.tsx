import { cn } from "@/lib/utils";

/**
 * The mark.
 *
 * An angular S built on a strict grid: three horizontal bars joined by two
 * vertical risers, all right angles, no curves. It reads as a letter at a
 * glance and as something constructed on closer look, which is the point.
 *
 * The bottom bar is the brand green. It is part of the letter rather than
 * an ornament stuck beside it, which is the difference between a mark and a
 * mark with a dot next to it. A detached caret was tried and dropped: at
 * navigation size it read as a rendering artefact.
 *
 * Drawn as stroked polylines rather than filled shapes, so weight scales
 * with the box and the outline stays editable. The letter inherits
 * `currentColor`, so it works on any background; only the bottom bar is
 * fixed to the brand green.
 *
 * Sized by height, and the stroke stays inside the 40 by 40 box at every
 * size.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn("h-7 w-auto", className)}
    >
      <path
        d="M32 8 H13 V17.5 H27 V31 H8"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
      {/* Bottom bar, drawn over the corner so the mitre stays clean. */}
      <path
        d="M27 26 V31 H8"
        stroke="hsl(var(--primary))"
        strokeWidth="6"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
    </svg>
  );
}
