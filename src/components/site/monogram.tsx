import { cn } from "@/lib/utils";

/**
 * PLACEHOLDER MARK.
 *
 * This is a geometric approximation of the supplied S monogram, drawn so the
 * layout can be built and reviewed. It is not the real logo.
 * Replace with the owner's SVG once delivered. PRD section 10.1 lists this
 * as a blocking asset.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 116"
      fill="none"
      aria-hidden="true"
      className={cn("h-7 w-auto", className)}
    >
      <path
        d="M88 30 L50 8 L12 30 L50 52 L88 74 L50 96 L12 74"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
    </svg>
  );
}
