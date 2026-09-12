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

## Blog metadata lived inside the MDX, and no longer does

The note below describes the original setup. It was replaced when the blog
moved into the CMS: see "The blog is CMS-managed too" further down.

### Original note

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

**Process and Quality** were later merged. See the note below.

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

## Work section: browser chrome

The hero states the work as a terminal window, so the work states itself as
a browser window. Same motif twice, and it is literal rather than
decorative: these are websites, and a site in a browser frame reads as a
site rather than as a rectangle of colour.

The frame also does real work for the placeholders. A gradient inside a
browser window reads as a screenshot that has not loaded. The same gradient
on a bare card just reads as a coloured box. When real screenshots arrive
they drop into the viewport area and nothing else changes.

Each project gained a `domain`, shown in the address bar. It is placeholder
data like the rest of `projects.ts` and has to be replaced with the real
host before launch.

Every card is one size, in an even three-up grid. An asymmetric version with
a larger lead was tried and dropped at the owner's request. The grid
stretches the cards to a common height and the footer link is pushed to the
bottom of each, so an uneven caption cannot leave one card looking
unfinished next to another.

The section also carries a count, `03 / 06`, and lists the rest of the
archive underneath as bare domains. That is a second real route into /work
and a continuation of the terminal language rather than another button.

## Two sections became one: how we work

The homepage carried a Process timeline and, right after it, a Quality block
answering "if AI wrote it, is it any good?". Read together they said the same
thing twice, once as a sequence and once defensively.

They are now a single section, "From your requirements to a finished
product". Six equal cards, three by two. The objection is answered at stage
03, where it belongs, as part of the sequence rather than as a separate
plea. The FAQ underneath still carries the question in full, so nothing was
lost.

The useful column is the one saying what the client has to do at each stage.
That is the question people actually have and almost no agency site answers
it.

Stage 06, after launch, is new. It states the hourly and retainer options
without pushing either, which the site had nowhere else on the homepage.

`src/content/process.ts` now holds structure, timings and the you/me split
for both the homepage section and /process, so the two cannot drift. Only
the longer prose lives on the page.

The scroll-drawn `.timeline-rail` rule went with the old timeline. Grids
across the work and stage sections use `auto-rows-fr`, so every card matches
every other card, not just the ones beside it in the same row.

## FAQ: a rail and an accordion

The old version was a narrow column with the right half of the section
empty. That is the one place on the page where somebody is actively looking
for a reason to get in touch, so the empty half now carries that reason: a
rail with the heading, the count, the link to the blog, and a small panel
offering a call.

The rail sticks from the large breakpoint upward and is static below, which
is plain `position: sticky` and no script.

The accordion is still native disclosure elements. Every answer sits in the
markup whether or not it is open, which is what crawlers read and what the
`FAQPage` structured data has to match. That match is now checked: the
rendered questions and the schema questions are compared in the same order.

`name="faq"` makes the group exclusive, so opening one closes the last.
Browsers without support allow several open at once, which is fine. The
first item ships open so the interaction is visible without a click.

## The hero ticker

It started as twelve tool names in flat grey, which read as filler. It is
now grouped: a green category label, a hairline, then that group's tools as
bordered chips. Four groups, thirty chips, same strip height.

A fixed "Stack" label holds the left edge behind a rule, so the strip reads
as a ticker with a masthead rather than as text that happens to be moving.
Both edges fade, so chips neither hard-cut against the rule nor vanish
abruptly on the way out.

A fifth group, no-code, was added later at the owner's request: Webflow,
WordPress and Shopify. That strip is now the only place on the site naming
those platforms. PRD decision 16 dropped Webflow positioning everywhere
else, and `src/content/tools.ts`, which drives the about page, still leaves
them out. Add a fifth group there if the two should agree.

The track got much longer, so the duration went from 42s to 64s. Translating
a wider track over the same time means it moves faster, which is easy to
forget when adding content to a marquee.

## Work is managed through Sveltia CMS

Projects live in `content/projects/*.json`, one file each, and
`src/content/projects.ts` reads the directory at build. Adding work is a
form at `/admin`, not a code change.

The loader drops any record missing a name, domain or image, with a warning
in the build log. A CMS can save a half-filled entry, and a missing image
renders as a hole in the page.

`featured` decides what leads the homepage. Everything shows on /work.
`order` sorts, ascending, with the name as the tie-break.

Two mistakes the Sveltia docs single out, both avoided in
`public/admin/index.html`: it needs no stylesheet link, because the styles
are inside the bundle, and no `type="module"`, because the bundle is not an
ES module. Agents add both by confusing it with Static CMS.

`/admin` needs a rewrite in `next.config.ts`. Next serves `/public`
verbatim and does not resolve directory indexes, so without it only
`/admin/index.html` would work.

Signing in is a GitHub personal access token for one person, the local
repository option in a Chromium browser for editing on this machine, or a
deployed OAuth client for a shared login. The README has the detail.

## Project screenshots are captured, not hand-made

`public/work/*.webp` are real captures of the live sites. `npm run capture`
takes them, driving the installed Chrome through puppeteer-core. No browser
is downloaded.

```bash
npm run capture -- https://example.com public/work/example.webp
```

Three things a plain `chrome --screenshot` gets wrong here:

- Every one of these sites has a cookie bar pinned to the bottom of the
  viewport, sitting on top of the hero. The script hides those elements. It
  does not answer them: nothing is accepted or rejected on anyone's behalf,
  the nodes are set to display none for the shot.
- Sequence Minds opens a marketing modal on a timer that greys out the whole
  hero behind a backdrop filter. Same treatment, and backdrops are hidden
  separately because they outlive their dialog.
- Fonts and network have to settle first. A hero caught mid-load looks worse
  than no screenshot at all.

An earlier attempt shot a taller viewport and cropped the bottom to escape
the cookie bars. That fails on two of the three: Splice and Sequence Minds
centre their hero vertically, so a taller viewport pushed the headline below
the crop. Hiding the overlay is the version that works everywhere.

Splice needed one more thing. Its hero is a full-bleed photograph with the
copy centred, so at 1600 wide the top third of a 16:10 frame is empty sky
and the headline lands small in a card. Shooting a narrower viewport at a
higher device pixel ratio fixes it: the type does not shrink in step with
the viewport, so the content fills more of the frame.

```bash
npm run capture -- https://example.com out.webp 1000 625 0 1.6
```

Width and pixel ratio have to multiply to 1600. Splice ended up at 1200 by
750 at 1.3333. At 1000 wide its hero content grew taller than the viewport
and the eyebrow line above the headline was clipped off the top, which is
the failure mode to watch for: too narrow and the hero stops fitting.

## Replacing a screenshot needs the image cache cleared

Next caches optimised images under `.next/cache/images`, keyed by the source
path. Overwrite a file in `public/work` and the old crop keeps being served
from that cache, so the card looks unchanged, or worse, looks cropped
against the new source.

After replacing any image:

```bash
rm -rf .next/cache/images
npm run build
```

Then hard-reload the browser, because it has its own copy. This cost a round
trip: the file on disk was right and the page was serving the previous one.

Sticky headers are deliberately left alone. The rule is position fixed or
sticky, not at the top of the page, and carrying an overlay-ish word in its
id or class.

WebP at quality 86 keeps each file under 200KB. next/image re-encodes on
request anyway, so the source format only affects the repository.

## Blog covers are generated, not photographed

`scripts/blog-covers.py` draws every cover from the post's slug. Same slug,
same image, every time, and a new post gets art without anyone opening a
design tool.

```bash
python scripts/blog-covers.py
```

Stock photography would say nothing about these posts, and a photograph of a
laptop says less than nothing. The motif is the one the hero and the work
cards already use: dark field, brand green, abstract lines of code. Glow
position, line rhythm and which lines are accented all come from the slug.

Two things that needed fixing while drawing them, both worth remembering if
this script is ever extended:

- The grid was first drawn as a full layer and pasted with a radial mask.
  That layer carried its own background, which wiped the glow out of the
  middle and left a hard vertical seam. It is now painted through a mask of
  the lines themselves.
- A pasted glow shows the straight edge of its own square unless the mask
  falls to zero well before that edge. A gamma on the radial mask fixes it.

Accent lines are chosen up front rather than rolled per line. Chance alone
gave some covers three greens in a row and others none at all.

Covers appear as a thumbnail on the index and full width on the post. Both
carry an empty alt: the headline beside them already says what the post is,
and repeating it would only make a screen reader say everything twice.

Add a post, add its slug and label to `POSTS` in the script, run it.

## The blog is CMS-managed too

Posts are `content/posts/*.md`, YAML frontmatter and a markdown body, which
is what Sveltia writes. `src/content/posts.ts` reads the directory at build,
exactly like projects. Adding a post is a form at `/admin` and needs no code
change.

That required abandoning the previous arrangement, and it is worth saying
why. Posts used to be `.mdx` modules exporting a `meta` object, imported
statically and listed by hand in the registry. Two things made it
unworkable for a CMS: Sveltia writes YAML frontmatter, not ESM exports, and
every new post needed a line added to a TypeScript file, which a CMS cannot
do.

Bodies are rendered with `next-mdx-remote/rsc`, which compiles a markdown
string at build. That keeps the prose styling, now a plain object in
`src/components/site/prose.tsx` rather than the `useMDXComponents` hook the
`@next/mdx` convention wanted.

`@next/mdx`, `@mdx-js/loader`, `@mdx-js/react` and the `pageExtensions`
entry are all gone with it. Nothing imports `.mdx` any more.

Two details the loader handles:

- gray-matter turns an unquoted YAML date into a `Date`, not a string. It is
  normalised back to `YYYY-MM-DD`, because the whole site sorts and formats
  on that shape.
- A post missing a title or a date is dropped with a warning. A CMS can save
  a half-filled entry, and a post with no title renders as a blank row.

Verified by writing a file the way the CMS writes them: it appeared in the
build with its own route and share card, with no code touched.

## Repositioned: no more "vibe coding"

The term is gone from every part of the site. Positioning is now web
development and design, technical SEO, Webflow and n8n automation. Revision
2 at the top of `PDR.md` records what changed against what it replaced.

Two earlier decisions were reversed by this, and both are worth knowing
about because the site had been built around them:

- The job title was "Vibe-Code Developer", owned deliberately. It is now
  plainly "web developer and designer", in the copy, the metadata and the
  Person schema.
- Webflow had been stripped from the site entirely under decision 16. It is
  now a named service, a tool group on the about page, and a keyword.

Services went from five to six. Webflow builds and technical SEO are now
lines in their own right rather than clauses inside other lines.

AI survives only where it is substantive: inside blog posts that discuss how
the work is done. It appears nowhere in the navigation, the services, the
schema, the metadata or the hero. It is a method, not a pitch.

The post named after the term was rewritten rather than deleted. Its
argument, that speed comes from removing waiting rather than removing
review, is the same argument and holds without the word. It is now "How a
site gets built in days without cutting corners" at a new slug, with its
cover regenerated to match.

The FAQ was rewritten from scratch. It used to open with "What is vibe
coding?"; it now opens with "What do you actually build?" and adds the
question this positioning invites, which is Webflow or custom code. The
FAQPage schema follows it automatically.
