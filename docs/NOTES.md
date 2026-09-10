# Build notes

## @splinetool/runtime is pinned to 1.12.98

Runtime 2.x (2.0.42 at time of writing) references Draco decoder files at
`../libs/draco/*` through `new URL(..., import.meta.url)`, and that `libs`
directory is not published in the package. Turbopack resolves those URLs at
build time and the production build fails with six module-not-found errors.

1.12.98 does not reference them and builds cleanly.

The version is pinned exactly, not caret-ranged. Do not widen it without
rebuilding and confirming `npm run build` still passes.

## The hero backdrop was Spline, and is not any more

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

The provider is now set back to "spline" at the owner's request. The CSS
backdrop did not go away: it paints first and stays underneath, so the hero
is never empty and never waits on WebGL, and it is still what phones and
anyone with reduced motion receive.

Four things hold the scene back from costing more than the page:

- the CSS backdrop underneath, so nothing waits on the 3D
- the runtime is not fetched until the browser goes idle
- renderOnDemand, so idle frames are not drawn
- the scene is stopped outright when the hero leaves the viewport

Measured after those were added, on the production build:

| | |
|---|---|
| Steady state, main thread blocked | 1.1 percent, one 54ms task in 5s |
| Scene initialisation | a single 7.9 second blocking task |
| Starts at | 1.2 seconds after load, once idle |
| JavaScript, homepage | 715 KB, up from 158 KB |

The steady state is genuinely fine, and renderOnDemand is why. The
initialisation is not. For nearly eight seconds the page cannot be scrolled
or clicked. That cost is inside the Spline runtime parsing this particular
scene and cannot be fixed from application code.

The scene is also still a third-party asset. Both problems have the same
answer: build a lighter, owned scene, put its URL in
`heroBackdrop.splineScene`, and measure it the same way before shipping.

To turn it off again, set `heroBackdrop.provider` to "coded". One line.

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

## Blog metadata lives inside the MDX

Posts are `.mdx` files under `src/content/posts`, each exporting a `meta`
object. That is plain ESM, so no remark or rehype frontmatter plugin is
needed, which matters because Turbopack cannot accept plugins with
non-serializable options.

`src/content/posts.ts` is the registry. It is server only: it reads the
source files with `node:fs` to count words for the reading time, which runs
once at build because every blog route is statically generated.

With three posts the index route bundles all three bodies. That is a few
kilobytes. If this ever reaches a few dozen posts, split metadata into a
manifest so the index stops importing the bodies.

Prose styling is in `src/mdx-components.tsx`, mapped onto the design tokens
rather than a typography plugin, so the reading view cannot drift from the
rest of the site. The reading measure is capped in the post layout at 38rem,
which is about 76 characters per line in Sora at 16px.

## --input was raised from the reference spec

The spec set both `--border` and `--input` to `0 0% 20%`. Against the page
background that measures 1.38:1, and WCAG 1.4.11 asks for 3:1 on the
boundary of a meaningful control. Form fields are meaningful controls.

`--input` is now `0 0% 42%`, which measures 3.27:1. `--border` is unchanged
at 20%, because decorative separators are exempt. This is the one place the
palette deviates from the supplied specification, and it is deliberate.

## Share card fonts are committed, not fetched

`src/assets/fonts` holds Sora at 400 and 700 as TTF. The opengraph-image
routes read them from disk so a build never depends on Google Fonts being
reachable. They are used only at build time and never served to visitors,
who get the self-hosted next/font files instead.

## One container class, not a wrapper div

`.site-container` in `globals.css` holds every section's content to 1400px
with a gutter of 1.5rem, 2.5rem or 4rem depending on breakpoint. It is
applied to the section itself, the nav inside the fixed header, and the
footer's inner wrapper.

It works by padding rather than a nested max-width div, so a section needs
one class instead of an extra element, and a full-bleed background can never
come apart from the content sitting on it.

The one rule: the element carrying the class must span the full viewport
width, because the calculation uses a percentage of its own box. The hero is
the exception in shape, not in rule. Its text column has its own max width,
so the class sits on a full-width wrapper around that column.

To change the site's maximum width, change `--site-container-max` in that
one rule.

## Why hovering over the hero was slow

Reported as "slow when I hover with the cursor", and it was.

**Diagnosis.** With the cursor still, the page blocked the main thread for
0ms over six seconds. Moving the cursor across the hero blocked it for 456ms
across seven long tasks. So the trigger was pointer movement, not the scene
animating.

The first guess, that CSS `pointer-events: none` on the canvas would stop
it, was wrong and measuring proved it: the jank was unchanged. Swallowing
pointer events at window capture level did fix it, which located the
listeners. The Spline runtime attaches them to the window, not to the
canvas, so no amount of CSS on the canvas can help. Every mouse move
anywhere on the page made it raycast the scene and force a fresh render.

**Fix.** The runtime's `start()` takes an `interactive` flag.
`@splinetool/react-spline` never exposes it, because it calls `load()`
instead. So the wrapper is gone and `hero-backdrop.tsx` drives
`@splinetool/runtime` directly: construct the Application on our own canvas,
fetch the scene, and call `start(buffer, { interactive: false })`.

| Hovering across the hero | Blocked main thread |
|---|---|
| Before | 456ms over seven long tasks |
| After | 0ms, no long tasks |

Nothing is lost. The scene is decoration behind text and was never meant to
answer the cursor. Two things improved as a side effect: the hero content no
longer needs `pointer-events: none`, so the headline is selectable, and
`@splinetool/react-spline` is one fewer dependency.

The scene load failure is now logged rather than swallowed. A silent catch
in the first version of this component hid a real failure and cost real
time.

## Homepage section layouts

The first pass built every section as a card grid, which is the default
shape and the reason the page read as competent rather than considered.
Five sections were rebuilt around what each one is actually doing.

**Services** are editorial rows, not cards. A grid gives six items equal
weight and equal size; as full-width rows the titles carry display weight,
the eye runs down one column, and the hover state has somewhere to go. The
green wipe is a scaled pseudo-element, so it is transform only. Every word
is in the markup before any interaction, so hover is emphasis and never
disclosure.

**Work** is asymmetric. The lead project takes two columns and a wider
cover, the next two stack beside it. Three identical cards implied all three
were equally worth looking at, which is never true of a portfolio.

**Process** has a spine. It is a sequence and the old layout did not say so.
The rail draws itself as the section scrolls, through `animation-timeline:
view()`. Browsers without it get a full line and lose nothing, and the rule
is skipped entirely under reduced motion, which also leaves the line drawn.
No script, no fallback library.

**Quality** is assumption against reality. The objection is already in the
reader's head, so naming it and striking it through is more persuasive than
three columns of prose talking around it.

**Closing call to action** is a framed panel, left aligned, with an
availability pill and a static glow. Centred copy on a full-bleed section
had nothing holding it.

None of this changed the content model. The same data files drive all of it.

## The hero, rebuilt without 3D

The scene is gone at the owner's request, and both Spline packages are
uninstalled. Homepage JavaScript went from 704 KB to 150 KB. The
eight-second initialisation freeze and the third-party asset blocker went
with it.

Removing the scene removed the reason for the old layout. A corner of text
in the bottom left only made sense as a caption on a picture; with no
picture it wasted two thirds of the first screen.

The hero is now a split:

- Copy on the left. Eyebrow, headline, positioning line, description, two
  calls to action, then three plain facts.
- A panel on the right stating the positioning as a sequence of commands
  rather than another paragraph. This is what PRD section 5.1 asked for when
  it said terminal and prompt elements.
- A strip of tooling along the foot, looping, paused on hover and stopped
  under reduced motion.

The panel lines are real text, not ASCII art, so a screen reader gets a
coherent list. The markers are hidden from assistive technology, because
"dollar sign, arrow, arrow" helps nobody.

Nothing in the panel is a measured result. Invented numbers in a hero are
the fastest way to lose a technical reader, so it says who does each part of
the work instead.

The backdrop is `hero-backdrop.tsx`: two drifting gradients, a panning grid,
scan lines and a vignette. Transform and opacity only. It is a server
component now, since nothing in it needs the client.
