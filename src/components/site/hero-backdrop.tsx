/**
 * Hero backdrop. CSS only.
 *
 * There is no canvas, no WebGL and no JavaScript animation loop. A 3D scene
 * sat here previously and was removed: it froze the page for eight seconds
 * while it initialised, and every mouse move made it raycast the scene. The
 * history is in docs/NOTES.md.
 *
 * Everything below animates transform or opacity exclusively, so the
 * compositor draws it and the main thread is never touched. The glows are
 * soft gradients rather than blurred layers, because a blur filter across
 * most of the viewport costs real compositing time for no visible gain.
 *
 * This is a server component. Nothing here needs the client.
 */
export function HeroBackdrop() {
  return (
    <div
      className="absolute inset-0 overflow-hidden bg-hero-bg"
      aria-hidden="true"
    >
      {/* Key light, top right, drifting. */}
      <div
        className="absolute -right-[15%] -top-[30%] h-[85vh] w-[85vh] animate-drift-a rounded-full opacity-80 will-change-transform"
        style={{
          background:
            "radial-gradient(circle closest-side, hsl(var(--primary) / 0.18), hsl(var(--primary) / 0.05) 45%, transparent 72%)",
        }}
      />

      {/* Fill light, bottom left, slower and weaker. */}
      <div
        className="absolute -bottom-[35%] -left-[10%] h-[70vh] w-[70vh] animate-drift-b rounded-full opacity-60 will-change-transform"
        style={{
          background:
            "radial-gradient(circle closest-side, hsl(var(--primary) / 0.10), hsl(var(--primary) / 0.03) 48%, transparent 74%)",
        }}
      />

      {/* Fine grid, panning slowly, masked so it never reaches the edges. */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-x-0 -top-16 bottom-[-64px] animate-grid-pan opacity-[0.07] will-change-transform"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 85% 70% at 60% 40%, black, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 85% 70% at 60% 40%, black, transparent 80%)",
          }}
        />
      </div>

      {/* Scan lines. Almost invisible, but they stop the field reading flat. */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, hsl(0 0% 0% / 0.22) 0px, hsl(0 0% 0% / 0.22) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Vignette, then a hard fade into the section below. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 85% at 55% 45%, transparent 25%, hsl(var(--hero-bg) / 0.8) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-hero-bg" />
    </div>
  );
}
