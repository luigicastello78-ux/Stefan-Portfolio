import Image from "next/image";

import { Monogram } from "@/components/site/monogram";
import { siteConfig } from "@/config/site";

/**
 * Portrait treatment. PRD decision 4.
 *
 * The supplied headshot is a studio shot on a near-white background, and the
 * subject is wearing white, so an automated cut-out would eat the shirt
 * along with the backdrop. Instead of a bad mask, the photo is framed
 * deliberately: held in a bordered plate, lightly desaturated, and dissolved
 * into the page along its bottom edge so the bright rectangle never just
 * stops against the dark background. A green wash over the photograph was
 * tried and dropped: it read as a colour cast on the subject rather than an
 * accent. The green now comes from the glow behind the frame only.
 *
 * If a properly cut-out version on transparency turns up later, drop it in
 * and remove the scrim.
 */
export function Portrait() {
  return (
    <div className="relative">
      <div
        className="absolute -inset-6 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle closest-side, hsl(var(--primary) / 0.18), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-border bg-muted">
        {siteConfig.portrait ? (
          <>
            <Image
              src={siteConfig.portrait}
              alt="Stefan Stankovski"
              fill
              sizes="(min-width: 1024px) 24rem, 100vw"
              className="object-cover object-top saturate-[0.85]"
              priority={false}
            />

            {/* Dissolves the bright studio backdrop into the page. */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 45%, hsl(var(--hero-bg) / 0.55) 78%, hsl(var(--hero-bg)) 100%)",
              }}
              aria-hidden="true"
            />

          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center">
            <Monogram className="h-12 text-muted-foreground" />
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Portrait pending
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
