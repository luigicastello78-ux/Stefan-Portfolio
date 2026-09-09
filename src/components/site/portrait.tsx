import Image from "next/image";

import { Monogram } from "@/components/site/monogram";
import { siteConfig } from "@/config/site";

/**
 * Portrait treatment. PRD decision 4, recommended default: cut out on dark
 * with a green rim light.
 *
 * The supplied headshot has a white studio background, which cannot sit on a
 * near-black page. Until a cut-out version exists this renders a framed
 * stand-in rather than a broken image. Set siteConfig.portrait to the file
 * under /public once it is ready.
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
          <Image
            src={siteConfig.portrait}
            alt="Stefan Stankovski"
            fill
            sizes="(min-width: 1024px) 24rem, 100vw"
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center">
            <Monogram className="h-12 text-muted-foreground" />
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Portrait pending
            </p>
            <p className="max-w-[16rem] text-[11px] font-light leading-relaxed text-muted-foreground/70">
              Supply a cut-out headshot on transparency and set it in the site
              config. The white studio background cannot be used here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
