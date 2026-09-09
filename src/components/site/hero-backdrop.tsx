"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { Application } from "@splinetool/runtime";

import { heroBackdrop } from "@/config/site";

/**
 * CSS-only backdrop. Two drifting green glows, a slowly panning grid and a
 * vignette. Every animation is transform or opacity, so the compositor does
 * the work and the main thread stays free. The glows are soft gradients
 * rather than blurred layers, because a blur filter over most of the
 * viewport is expensive to composite for no visible gain here.
 */
function CodedBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-hero-bg" aria-hidden="true">
      <div
        className="absolute -left-[15%] top-[-20%] h-[70vh] w-[70vh] animate-drift-a rounded-full opacity-70 will-change-transform"
        style={{
          background:
            "radial-gradient(circle closest-side, hsl(var(--primary) / 0.20), hsl(var(--primary) / 0.06) 45%, transparent 72%)",
        }}
      />
      <div
        className="absolute -right-[10%] bottom-[-25%] h-[80vh] w-[80vh] animate-drift-b rounded-full opacity-60 will-change-transform"
        style={{
          background:
            "radial-gradient(circle closest-side, hsl(var(--primary) / 0.13), hsl(var(--primary) / 0.04) 48%, transparent 74%)",
        }}
      />

      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-x-0 -top-16 bottom-[-64px] animate-grid-pan opacity-[0.09] will-change-transform"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 45%, black, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 45%, black, transparent 78%)",
          }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 30%, hsl(var(--hero-bg) / 0.85) 100%)",
        }}
      />
    </div>
  );
}

/**
 * The scene itself, driven through the runtime directly rather than through
 * @splinetool/react-spline.
 *
 * The wrapper offers no way to start a scene non-interactively, and that one
 * flag is the whole difference. The runtime attaches its pointer listeners
 * to the window, not to the canvas, so no amount of CSS pointer-events can
 * stop them: every mouse move over the page made it raycast the scene and
 * force a render. Measured across an identical set of cursor moves, that was
 * 456ms of blocked main thread over seven long tasks. Started with
 * interactive false it is nothing at all.
 *
 * Nothing is lost. The scene is a background behind text and was never meant
 * to respond to the cursor.
 */
function SplineCanvas({ onReady }: { onReady: (app: Application) => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let app: Application | null = null;
    let cancelled = false;

    const run = async () => {
      const { Application } = await import("@splinetool/runtime");
      if (cancelled) return;

      const instance = new Application(canvas, { renderOnDemand: true });
      const response = await fetch(heroBackdrop.splineScene);
      const buffer = await response.arrayBuffer();
      if (cancelled) return;

      instance.start(buffer, { interactive: false });
      app = instance;
      onReady(instance);
    };

    run().catch((error) => {
      // A background that fails to load is not worth an error state, since
      // the coded backdrop underneath is already on screen. It is worth a
      // line in the console, though: swallowing this silently once cost an
      // afternoon.
      console.warn("[hero] 3D scene did not start:", error);
    });

    return () => {
      cancelled = true;
      app?.dispose();
    };
  }, [onReady]);

  return <canvas ref={canvasRef} className="block h-full w-full" />;
}

/**
 * Spline path.
 *
 * A 3D scene behind text has to earn its place, so five things hold it back
 * from costing more than the page it sits behind:
 *
 *  - the CSS backdrop paints first and stays underneath, so the hero is
 *    never empty and never waits on WebGL
 *  - the runtime is not even fetched until the browser goes idle, which
 *    keeps it out of the way of first paint and of the hero text
 *  - the scene is started non-interactive, so moving the cursor costs
 *    nothing
 *  - renderOnDemand, so idle frames are not drawn
 *  - the scene is stopped outright whenever the hero leaves the viewport
 *
 * The scene fades in once it reports itself loaded, so there is no flash
 * between the two backdrops.
 */
function SplineBackdrop() {
  const appRef = useRef<Application | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [mountScene, setMountScene] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const onReady = useCallback((app: Application) => {
    appRef.current = app;
    setLoaded(true);
  }, []);

  // Wait for a quiet main thread before pulling in the runtime at all.
  useEffect(() => {
    const start = () => setMountScene(true);
    const supportsIdle = typeof window.requestIdleCallback === "function";
    const handle = supportsIdle
      ? window.requestIdleCallback(start, { timeout: 2500 })
      : window.setTimeout(start, 1200);

    return () => {
      if (supportsIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  useEffect(() => {
    const node = hostRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const app = appRef.current;
        if (!app) return;
        if (entry.isIntersecting) app.play();
        else app.stop();
      },
      { threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      <CodedBackdrop />

      {mountScene ? (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <SplineCanvas onReady={onReady} />
        </div>
      ) : null}
    </div>
  );
}

/** Reads a media query without writing state from an effect. */
function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

export function HeroBackdrop() {
  const wideEnough = useMediaQuery("(min-width: 768px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // A 3D scene is desktop only and never runs for anyone who asked for less
  // motion. A phone should not pay for WebGL it did not ask for.
  const allowHeavy = wideEnough && !reducedMotion;

  if (heroBackdrop.provider === "spline" && allowHeavy) {
    return <SplineBackdrop />;
  }

  return <CodedBackdrop />;
}
