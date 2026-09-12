import { cn } from "@/lib/utils";

/**
 * The mark.
 *
 * A plain letter S: two half circles of the same radius, meeting in the
 * middle, drawn as one stroked path with round ends. There is nothing else
 * in it. An earlier constructed version with a green bar built into the
 * letterform was tried and dropped for being busy at navigation size.
 *
 * One path, one colour, inherited from `currentColor`, so the mark works on
 * any background and needs no light or dark variant. The brand green stays
 * where it earns attention, on calls to action, rather than in the logo.
 *
 * Sized by height. The stroke stays inside the 40 by 40 box at every size.
 * `src/app/icon.svg` carries the same geometry for the favicon and must be
 * kept in step by hand, since it is a separate file rather than a render of
 * this component.
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
        d="M26.5 13.5 A6.5 6.5 0 1 0 20 20 A6.5 6.5 0 1 1 13.5 26.5"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
