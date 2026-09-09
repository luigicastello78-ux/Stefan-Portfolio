import Link from "next/link";

import { Monogram } from "@/components/site/monogram";
import { navItems, siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Footer shell. PRD section 8.11.
 * The signature mark is deliberately absent until PRD decision 3 is settled,
 * so the two competing greens never appear together by accident.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-hero-bg">
      <div className="site-container py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 max-w-sm">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-foreground"
              aria-label={`${siteConfig.name}, home`}
            >
              <Monogram className="h-8" />
              <span className="text-xl font-semibold tracking-tight">
                {siteConfig.wordmark}
              </span>
            </Link>
            <p className="mt-5 text-sm font-light leading-relaxed text-muted-foreground">
              AI-assisted development. Websites, web apps and MVPs, built fast
              and reviewed line by line.
            </p>
            <Link
              href={siteConfig.bookingUrl}
              className={cn(
                buttonVariants({ variant: "hero", size: "xl" }),
                "mt-8 text-xs font-semibold uppercase tracking-widest"
              )}
            >
              Book a call
            </Link>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-12">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
                Site
              </h2>
              <ul className="mt-4 space-y-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
                Elsewhere
              </h2>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={siteConfig.social.github}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.social.linkedin}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.social.x}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    X
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
                Contact
              </h2>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="break-all text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  Available for new builds
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <p className="text-xs font-light text-muted-foreground/60">
            &copy; {year} {siteConfig.name}. Remote, working globally.
          </p>
        </div>
      </div>
    </footer>
  );
}
