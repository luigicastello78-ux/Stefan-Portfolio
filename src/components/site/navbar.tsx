"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Monogram } from "@/components/site/monogram";
import { navItems, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Fixed, transparent, floating over the hero scene. PRD section 8.1.
 * No hamburger on mobile. Links and the desktop call to action hide, but a
 * compact booking control stays visible so the conversion path survives.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-hero-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        aria-label="Main"
        className="site-container flex items-center justify-between py-5"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 text-foreground"
          aria-label={`${siteConfig.name}, home`}
        >
          <Monogram className="h-7" />
          <span className="text-xl font-semibold tracking-tight">
            {siteConfig.wordmark}
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href={siteConfig.bookingUrl}
            className={cn(
              buttonVariants({ variant: "navCta", size: "lg" }),
              "hidden rounded-lg px-6 text-xs uppercase tracking-widest md:inline-flex"
            )}
          >
            Book a call
          </Link>

          <Link
            href={siteConfig.bookingUrl}
            className="rounded-md bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 active:scale-[0.97] md:hidden"
          >
            Book
          </Link>
        </div>
      </nav>
    </header>
  );
}
