# Build notes

## @splinetool/runtime is pinned to 1.12.98

Runtime 2.x (2.0.42 at time of writing) references Draco decoder files at
`../libs/draco/*` through `new URL(..., import.meta.url)`, and that `libs`
directory is not published in the package. Turbopack resolves those URLs at
build time and the production build fails with six module-not-found errors.

1.12.98 does not reference them and builds cleanly.

The version is pinned exactly, not caret-ranged. Do not widen it without
rebuilding and confirming `npm run build` still passes.

## The hero backdrop is CSS, not Spline

The placeholder Spline scene was measured in a production build on this
machine. It loaded a WebGL runtime, produced individual frames as long as
1.8 seconds during startup, and starved the animation frame loop afterwards.
The scene is a full 3D composition, not something authored to sit quietly
behind text.

The default backdrop is now CSS only: two drifting green gradients, a slowly
panning grid and a vignette. It animates transform and opacity exclusively,
so the compositor handles it and the main thread is never touched. There is
no canvas, no WebGL and no JavaScript animation loop. The gradients are soft
by construction rather than blurred, because a blur filter across most of
the viewport is expensive to composite and looked no different here.

The Spline path is still in `hero-backdrop.tsx` and still wired up. Switch
`heroBackdrop.provider` in `src/config/site.ts` back to "spline" once there
is an owned scene. That path already carries two safeguards: renderOnDemand,
and stopping the scene whenever the hero scrolls out of view. Measure any
new scene before shipping it.

## The playground is a separate application

`playground/` is its own Vite app with its own package.json and its own
dependency tree. It is deliberately not part of the Next.js build, so an
experiment cannot break the marketing site.

Run it with `npm run dev --prefix playground`. Deploy it as a second Vercel
project pointed at that directory, on a subdomain. It sets `noindex`,
because half-finished experiments should not compete with the real site in
search results.

It shares the design tokens by copying `tailwind.config.ts` and the token
block from `globals.css`. That is a copy, not an import. If the palette
changes, change it in both places.
