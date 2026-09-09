# Build Plan
## stefanstankovski.com — five-part delivery

**Companion to:** `PDR.md`
**Status:** Not started. Awaiting owner approval and the 13 open decisions in PRD section 14.
**Last updated:** 2026-09-09

---

## How this maps to the PRD

The PRD lists eight phases. Those are consolidated here into five deliverable parts. Each part ends in something reviewable in a browser, not a half-finished state.

| PRD phase | Build part |
|---|---|
| 0 | Gate, not a part. Owner decisions and assets. |
| 1 | Part 1 |
| 2 | Part 2 |
| 3 | Part 2 and Part 3 |
| 4 | Part 4 |
| 5 | Part 3 |
| 6, 7, 8 | Part 5 |

---

## Part 1 — Foundation

**Goal:** a deployed, empty shell that already looks like the finished site.

**Scope**
- Next.js App Router project with TypeScript, initialised in `stefanstankovski-site`.
- Tailwind configured with all 17 color tokens from PRD section 5.2, including `nav-button` and `hero-bg`.
- Sora loaded with preconnect hints, weights 300 to 700, applied as the body font.
- `fade-up` and `fade-in` keyframes and animation utilities, with a reduced-motion guard.
- shadcn/ui installed, Button extended with the `navCta`, `hero`, and `heroOutline` variants.
- Root layout, page shell, fixed transparent navigation, footer skeleton.
- Git repository, first commit, Vercel project linked, preview deployment live.

**Depends on** PRD open decisions 2, 3, 6, 12, 13.

**Done when** the preview URL loads a dark shell with a working header and footer, correct typography, and no console errors.

**Estimate:** 1 working session.

---

## Part 2 — Hero and homepage

**Goal:** the page that carries the whole repositioning.

**Scope**
- Spline scene lazy-loaded behind the hero, with a `hero-bg` fallback and a static mobile fallback.
- Hero layout anchored bottom-left, full viewport height, dark overlay, pointer-event pass-through with buttons re-enabled.
- Staggered entrance at 0.2s, 0.4s, 0.55s, 0.7s, and 0.85s.
- Two-tone H1, subheading, description, button pair, trust line.
- Services section, five cards.
- Featured work strip, placeholder projects.
- Process section, five steps, scroll-triggered reveal.
- Quality and credibility section.
- Closing call to action.

**Depends on** PRD open decisions 1, 5. Uses the placeholder Spline scene.

**Done when** the homepage is complete top to bottom on placeholder content and correct at all five breakpoints.

**Estimate:** 1 to 2 working sessions.

---

## Part 3 — Inner pages and integrations

**Goal:** every route exists and every conversion path works.

**Scope**
- `/work` project grid, card component, tag rows.
- `/services` full breakdown.
- `/process` expanded from the homepage section.
- `/about` bio, tooling groups, portrait treatment.
- `/contact` booking control, form, direct email, availability line.
- Contact form wired to its confirmed destination, with validation, error and success states.
- Booking link wired throughout, or the agreed fallback until the real URL exists.
- Chatbot widget embedded, lazy, dismissible, styled to the dark palette.
- Vite playground application scaffolded and deployed.

**Depends on** PRD open decisions 1, 4, 7, 8, 9. Needs the booking URL.

**Done when** every navigation destination resolves and a test submission arrives at its destination.

**Estimate:** 2 working sessions.

---

## Part 4 — Blog and copy

**Goal:** the content engine, filled.

**Scope**
- MDX pipeline, frontmatter schema, reading time, post ordering.
- Blog index with cards.
- Post template with a readable measure and dark-styled code blocks.
- Three posts drafted in full and handed over for your editing.
- Every remaining piece of site copy finalised and swapped in.
- Frequently asked questions block covering the vibe-coding explainer.

**Depends on** nothing external. This part can run in parallel with Part 3 if needed.

**Done when** three posts are live on the preview and all placeholder copy is gone.

**Estimate:** 1 to 2 working sessions.

---

## Part 5 — SEO, performance, and launch

**Goal:** ship it.

**Scope**
- Per-page metadata, Open Graph and Twitter images.
- `Person`, `ProfessionalService`, `Article`, and `FAQPage` structured data.
- Sitemap, robots file, canonical URLs.
- Redirect map from your legacy URLs.
- Analytics installed, Search Console verified.
- Accessibility pass. Keyboard, focus rings, landmarks, contrast, reduced motion.
- Performance pass against the budget. Lighthouse 90 or above on mobile, LCP under 2.5s.
- Cross-browser and responsive testing at 375, 768, 1024, 1440, and 1920.
- Real project content swapped in, placeholder Spline scene replaced.
- Production deployment and DNS cutover, handled by you.

**Depends on** PRD open decisions 10, 11. Needs real projects, the owned Spline scene, and the booking URL. These are hard launch blockers.

**Done when** every acceptance criterion in PRD section 13 passes.

**Estimate:** 1 to 2 working sessions, plus your DNS step.

---

## Timeline

**My build time:** 6 to 9 working sessions across the five parts.

**Calendar time is not mine to set.** Three things gate it, all on your side.

| Gate | Blocks | Status |
|---|---|---|
| The 13 open decisions in PRD section 14 | Parts 1, 2, 3, 5 | Outstanding |
| Logo as SVG, portrait file, in the repository | Part 1 | Outstanding |
| Booking URL | Part 3 | Promised later |
| Real projects, 5 to 8, with URLs and screenshots | Part 5 | Promised later |
| Your own Spline scene | Part 5 | Not created |
| Your review turnaround after each part | All | Unknown |

**If you answer the 13 decisions now and supply the logo files,** Parts 1 and 2 can be finished back to back and you would have a working homepage to look at in the same day. Parts 3 and 4 follow once you approve it. Part 5 waits on your real content regardless of how fast the rest goes.

**Realistic shape,** assuming same-day answers and quick reviews:

| Milestone | When |
|---|---|
| Deployed shell, Part 1 | Day 1 |
| Full homepage on preview, Part 2 | Day 1 to 2 |
| All pages and integrations, Part 3 | Day 3 to 4 |
| Blog and final copy, Part 4 | Day 4 to 5 |
| Launch-ready, Part 5 | Day 6, then held for your real content |

The held state at the end is deliberate. The site will be finished and waiting on the preview URL. It goes public the day you hand over real projects, your own Spline scene, and the booking link.

---

## Status

| Part | State | Notes |
|---|---|---|
| 1 | Done | Scaffold, tokens, Sora, motion, navigation, footer. Vercel link still outstanding, needs the owner's login. |
| 2 | Done | Spline hero and the five homepage sections. Placeholder projects and the third-party scene are still in place, both launch blockers. |
| 3 | Done | Work, services, process, about and contact pages, contact API, chat loader, Vite playground. Booking link, chat vendor and form destination all still unconfigured. |
| 4 | Not started | |
| 5 | Not started | |
