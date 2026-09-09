"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/**
 * PLACEHOLDER SCENE.
 *
 * This scene belongs to a third party. It is used so the hero can be built
 * and reviewed, and it must be replaced with an owned scene before public
 * launch. PRD section 6.3 records this as a launch blocker.
 */
const SCENE_URL = "https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode";

/**
 * Lazy, client only, never server rendered. The hero text paints first and
 * the scene arrives afterwards, which the performance budget in PRD section
 * 6.4 depends on.
 */
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-hero-bg" />,
});

/**
 * Static stand-in for small screens and for anyone who has asked for less
 * motion. A WebGL scene on a phone costs battery and frame rate for no gain.
 */
function StaticBackdrop() {
  return (
    <div className="absolute inset-0 bg-hero-bg" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,hsl(var(--primary)/0.16),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_80%,hsl(0_0%_100%/0.05),transparent_50%)]" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(circle at 50% 50%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, black, transparent 75%)",
        }}
      />
    </div>
  );
}

export function SplineBackground() {
  const [useScene, setUseScene] = useState(false);

  useEffect(() => {
    const wideEnough = window.matchMedia("(min-width: 768px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const decide = () => setUseScene(wideEnough.matches && !reducedMotion.matches);

    decide();
    wideEnough.addEventListener("change", decide);
    reducedMotion.addEventListener("change", decide);
    return () => {
      wideEnough.removeEventListener("change", decide);
      reducedMotion.removeEventListener("change", decide);
    };
  }, []);

  if (!useScene) return <StaticBackdrop />;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Spline scene={SCENE_URL} className="h-full w-full" />
    </div>
  );
}
