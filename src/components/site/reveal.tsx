"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds. Matches the inline animationDelay stagger used in the hero. */
  delay?: number;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Below-the-fold entrance. PRD section 5.4.
 * Sections animate on scroll into view rather than on mount, so nothing has
 * already played by the time the reader arrives.
 *
 * The class is toggled on the node directly rather than through state. There
 * is nothing to re-render, and it keeps a long page off the React scheduler
 * while scrolling.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => {
      if (delay) node.style.animationDelay = `${delay}s`;
      node.classList.add("animate-fade-up");
    };

    // No IntersectionObserver, or motion is unwanted: show it immediately.
    // The reduced-motion rule in globals.css strips the movement itself.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref as never} className={cn("reveal-init opacity-0", className)}>
      {children}
    </Tag>
  );
}
