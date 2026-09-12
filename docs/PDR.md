# Project Requirements Document
## stefanstankovski.com — AI / Vibe-Code Developer Portfolio

**Owner:** Stefan Stankovski
**Document status:** Draft v1.0 — awaiting sign-off
**Last updated:** 2026-09-12
**Source:** Original repositioning PRD + 20-question discovery round + follow-up round
**Build status:** Not started. No code is to be written until the owner gives explicit approval.

---

## Revision 2, 2026-09-12: positioning changed

The owner dropped the "vibe coding" term and repositioned the site around
web development and design, technical SEO, Webflow and n8n automation.

Everything below this line was written for the original positioning and is
kept as the record of how the site got here. Where the two disagree, this
revision wins.

| | Revision 1 | Revision 2 |
|---|---|---|
| Job title | Vibe-Code Developer | Web developer and designer |
| Lead service | AI-assisted development | Web design and build |
| Webflow | Removed from the site entirely | Named service and a stated skill |
| SEO | A supporting service | A named service in its own right |
| Automation | A supporting service | A named service in its own right |
| Keywords | vibe code developer, AI web developer | web developer, Webflow developer, technical SEO, n8n automation |

What did not change: speed still leads the headline, prices stay off the
site, work is hourly or retainer, the audience is still founders and small
teams, and the site is still global with no location positioning.

AI is no longer a positioning claim. It survives only where it is
substantive, inside the blog posts that discuss how the work is done. It
appears nowhere in the navigation, the services, the schema or the metadata.

---

## 1. Overview

### 1.1 What this is
A complete rebuild of stefanstankovski.com, repositioning Stefan Stankovski from "Webflow Developer & Designer from Macedonia" to **AI / Vibe-Code Developer** — a developer who ships production websites and applications through AI-assisted, prompt-driven workflows combined with real code.

This is not a content refresh of the existing site. It is a new site, on a new stack, with new positioning, new visual identity, and no Webflow branding anywhere.

### 1.2 What changed from the original repositioning PRD
The original PRD assumed a content-only update on the existing Webflow site. Discovery overturned that.

| Original PRD assumption | Decision after discovery |
|---|---|
| Stay on Webflow, update copy only | Full rebuild on Next.js, deployed to Vercel |
| Keep Webflow positioning for SEO equity | Drop Webflow positioning entirely from the site |
| Keep existing testimonials | No testimonials on launch |
| Local Macedonia / Kumanovo SEO focus | Global positioning, no location-led SEO |
| Project-priced service packages | Hourly and retainer model, no prices published |
| Portfolio with per-project process callouts | Visual project cards with one-line captions |

### 1.3 Non-goals
- No Webflow rebuild, no Webflow migration, no Webflow-branded content.
- No multi-language site. English only.
- No published pricing.
- No testimonial section at launch.
- No local-SEO landing pages for Macedonia or Kumanovo.

---

## 2. Objectives and success metrics

### 2.1 Objectives
1. Establish "vibe-code developer" as an owned, defensible position rather than a generic freelancer listing.
2. Convert visitors into booked discovery calls, not email threads.
3. Attract early-stage founders who need an MVP built fast, and convert a share of them into ongoing retainers.
4. Rank internationally for AI-development search terms rather than locally for Webflow terms.
5. Prove technical capability through the site itself. The site is the portfolio piece.

### 2.2 Success metrics

| Metric | Target | Window |
|---|---|---|
| Booked discovery calls per month | 8 or more | Within 3 months of launch |
| Share of inquiries mentioning AI or automation | 60% or more | Within 3 months |
| Retainer conversions from booked calls | 2 or more active | Within 6 months |
| Lighthouse performance, mobile | 90 or above | At launch, maintained |
| Largest Contentful Paint, mobile | Under 2.5s | At launch, maintained |
| Rankings for primary keywords | Top 30 | Within 3 months |
| Blog organic sessions | Growing month over month | From month 2 |

---

## 3. Target audience

### 3.1 Primary
Early-stage founders who need a working product fast. They have an idea, limited runway, and no in-house engineering. They care about time-to-live and whether the thing will actually work. They are typically non-technical or semi-technical.

### 3.2 Secondary
- Agencies subcontracting build work who need reliable, fast delivery.
- Small teams that already have a product and need automation, integrations, or a marketing site rebuilt.

### 3.3 Geography
Global. No country or city is used as a positioning hook. Timezone and remote-working availability may be mentioned as practical detail, never as the headline.

### 3.4 Buying model
Hourly and retainer. The site never quotes a project price. Every commercial conversation is routed to a booked call.

---

## 4. Positioning and messaging

### 4.1 Core position
**Vibe-Code Developer.** The term is owned outright, used as the job title, and immediately explained in plain language so non-technical buyers are never confused. The buzzword risk from the original PRD is mitigated by always pairing the term with a one-sentence explanation on first use.

### 4.2 Speed in the headline
Speed is the primary hook and belongs in the H1. Craft and review are the supporting proof that the speed is not reckless. The site must never imply that AI replaces engineering judgment.

### 4.3 Messaging hierarchy
1. **Headline:** speed and AI-native delivery.
2. **Subheadline:** what actually gets built, in plain words.
3. **Body:** the range, from design through code, deployment, and automation.
4. **Proof:** named projects with real outcomes.
5. **Reassurance:** a dedicated section on human review and quality control.

### 4.4 Hero headline candidates
The owner selects one. Pending decision, see section 14.

| Option | Copy |
|---|---|
| A | I build websites and apps at AI speed |
| B | From idea to deployed in days, not weeks |
| C | Vibe-code developer. Production sites, shipped fast. |
| D | AI-speed builds. Human-grade code. |

### 4.5 Supporting copy, approved direction
- **Subheadline:** From idea to deployed product using AI copilots, real code, and automation.
- **Description:** Websites, web apps, and MVPs built with AI pair-programming and reviewed line by line. Automation wired in so the thing keeps working after launch.
- **Primary call to action:** Book a call.
- **Secondary call to action:** See the work.
- **Trust line:** Placeholder until real numbers are confirmed. Working format: "Available for new builds. Remote, working globally."

### 4.6 Tone of voice
Confident and direct. Short sentences. No hedging, no filler, no marketing inflation. Claims are specific or they are cut. First person is used in the About section only. Everywhere else the copy is impersonal and declarative.

---

## 5. Brand and visual system

### 5.1 Reference
The visual direction is taken from the SENTINEL AI landing page specification supplied by the owner. That specification is a **style reference only**. None of its content, company name, or copy is reproduced. What carries over is the aesthetic: near-black background, a single vivid green accent, Sora typography, a 3D scene behind the hero, and bottom-left anchored hero content with staggered entrance animation.

### 5.2 Color tokens
Dark theme only. No light mode. All values are HSL triplets exposed as CSS custom properties and mapped in Tailwind using the `hsl(var(--token))` pattern.

| Token | HSL | Role |
|---|---|---|
| `--background` | `0 0% 10%` | Dark charcoal, general page background |
| `--foreground` | `0 0% 96%` | Near-white primary text |
| `--primary` | `119 99% 46%` | Vivid green, primary actions |
| `--primary-foreground` | `0 0% 4%` | Near-black text on green |
| `--secondary` | `0 0% 18%` | Secondary surfaces |
| `--secondary-foreground` | `0 0% 96%` | Text on secondary |
| `--muted` | `0 0% 16%` | Muted surfaces |
| `--muted-foreground` | `0 0% 60%` | Secondary and body text |
| `--accent` | `119 99% 46%` | Same vivid green as primary |
| `--accent-foreground` | `0 0% 4%` | Text on accent |
| `--destructive` | `0 84% 60%` | Errors and destructive states |
| `--border` | `0 0% 20%` | Borders and dividers |
| `--input` | `0 0% 20%` | Form field borders |
| `--ring` | `119 99% 46%` | Focus rings |
| `--radius` | `0.5rem` | Base corner radius |
| `--nav-button` | `0 0% 18%` | Navigation call-to-action background |
| `--hero-bg` | `0 0% 8%` | Darkest background, hero and page shell |

Custom Tailwind color tokens `nav-button` and `hero-bg` are added on top of the standard shadcn token set.

### 5.3 Typography
- Family: **Sora**, weights 300, 400, 500, 600, 700, loaded from Google Fonts with preconnect hints.
- Tailwind config: `fontFamily: { sora: ["Sora", "sans-serif"] }`.
- Body: `font-sora antialiased`.
- Fluid sizing via `clamp()` for the hero heading, subheading, and description.

| Element | Size |
|---|---|
| Hero H1 | `clamp(3rem, 8vw, 6rem)`, weight 700, leading 1.05, tracking -0.05em, uppercase |
| Hero subheading | `clamp(1.125rem, 2.5vw, 1.875rem)`, weight 300 |
| Hero description | `clamp(0.875rem, 1.5vw, 1.25rem)`, weight 300 |
| Section H2 | `clamp(2rem, 5vw, 3.5rem)`, weight 600 |
| Body | 16px to 18px, weight 300 to 400 |
| Nav links | 14px, uppercase, wide tracking |
| Buttons | 12px to 14px, uppercase, wide tracking |

### 5.4 Motion
Two keyframes drive nearly all entrance animation.

**`fade-up`**
- From: opacity 0, `translateY(20px)`, `blur(4px)`
- To: opacity 1, `translateY(0)`, `blur(0)`
- Timing: `0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards`

**`fade-in`**
- From: opacity 0
- To: opacity 1
- Timing: `0.5s ease-out forwards`

Elements start at `opacity-0` and receive a stagger through an inline `animationDelay`. Below-the-fold sections animate on scroll into view rather than on mount. All motion is disabled when `prefers-reduced-motion: reduce` is set.

### 5.5 Logo and identity assets
Three asset families were supplied by the owner.

1. **Monogram** — an angular interlocking S in an off-white cream tone, available on transparent, white, and black backgrounds.
2. **Signature** — a handwritten "StefanS" script in a pale mint green.
3. **Headshot** — a portrait on a plain white background.

**Known conflict:** the signature's pale mint does not match the vivid green accent at `119 99% 46%`. Placing them near each other will read as two competing greens. Resolution is pending, see section 14.

**Known constraint:** the headshot's white background cannot sit directly on a near-black page. It requires a cutout, a duotone treatment, or exclusion. Resolution is pending, see section 14.

Final assets are to be supplied by the owner as SVG for the logo and signature, and as a high-resolution PNG or JPG for the portrait.

---

## 6. Technical requirements

### 6.1 Stack

| Layer | Choice |
|---|---|
| Framework | Next.js, App Router, TypeScript |
| Styling | Tailwind CSS with `tailwindcss-animate` |
| Component library | shadcn/ui |
| Variant handling | `class-variance-authority` |
| 3D scene | `@splinetool/react-spline` and `@splinetool/runtime` |
| Blog content | MDX files in the repository, pending confirmation |
| Hosting | Vercel |
| Version control | GitHub |
| DNS | Handled by the owner |

### 6.2 Secondary Vite application
A separate React plus Vite plus TypeScript application is maintained for a **playground** surface, kept deliberately outside the Next.js app so experiments cannot destabilise the marketing site. Its purpose and contents are pending, see section 14. It is either deployed as its own Vercel project on a subdomain, or built into a static route on the main site. The deployment shape is decided once its purpose is confirmed.

### 6.3 Spline integration
- Scene URL for the build: `https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode`
- This is a **third-party placeholder**. It is not owned by Stefan and must be replaced with an owned scene before public launch. Shipping the placeholder to production is an explicit launch blocker.
- The Spline component is lazy-loaded through `React.lazy` and wrapped in `Suspense`, with a solid `hero-bg` fallback so the hero never flashes empty.
- On mobile, and on devices signalling reduced motion or low power, the scene is replaced with a static fallback to protect performance and battery.

### 6.4 Performance budget

| Constraint | Limit |
|---|---|
| Lighthouse performance, mobile | 90 or above |
| Largest Contentful Paint | Under 2.5s on 4G |
| Cumulative Layout Shift | Under 0.1 |
| Initial JavaScript, excluding Spline | Under 200KB gzipped |
| Spline scene | Lazy, never blocking first paint |

The hero heading and copy must render and be readable before the 3D scene finishes loading. Text is never gated behind the scene.

### 6.5 Accessibility
- All interactive elements reachable and operable by keyboard, with a visible focus ring using the `--ring` token.
- Green on near-black meets contrast requirements for large text and interface elements. Green is never used for small body copy.
- The Spline canvas is marked decorative and hidden from assistive technology.
- `prefers-reduced-motion` disables entrance animation and swaps the 3D scene for a static image.
- Semantic landmarks throughout, a single H1 per page, and a skip-to-content link.

### 6.6 Browser support
Current versions of Chrome, Edge, Firefox, and Safari, on desktop and mobile. No legacy browser support.

---

## 7. Site structure

The final page set is pending, see section 14. The working assumption is a multi-page site, which best serves the blog and international SEO goals.

**Working structure**

| Route | Purpose |
|---|---|
| `/` | Hero, positioning, services summary, featured work, process, quality section, call to action |
| `/work` | Project grid, all projects |
| `/work/[slug]` | Individual project page, optional at launch |
| `/services` | Full service breakdown |
| `/process` | The five-step build process |
| `/about` | Bio, background, tooling |
| `/blog` | Post index |
| `/blog/[slug]` | Individual post |
| `/contact` | Booking link, form, direct contact |

The navigation label set is pending, see section 14. "Team" from the reference specification is dropped, as this is a solo practice.

---

## 8. Page and section specifications

### 8.1 Navigation
- Fixed to the top, transparent, floating over the hero scene, `z-50`.
- Horizontal flex, space-between, padding `px-8 lg:px-16 py-5`.
- **Left:** wordmark or monogram, final choice pending.
- **Centre:** navigation links, 14px, uppercase, wide tracking, muted foreground shifting to full foreground on hover. Hidden below the medium breakpoint.
- **Right:** a "Book a call" button using a custom shadcn `navCta` variant. Foreground text on the `nav-button` surface, hover at 80% opacity, active scale 0.97. Hidden below the medium breakpoint.
- **Mobile:** no hamburger menu. Links and the call to action hide, matching the reference specification. A single always-visible booking control is retained on mobile so the primary conversion path is never lost.
- On scroll past the hero, the bar gains a subtle background blur and a hairline bottom border for legibility over content sections.

### 8.2 Hero
- Full viewport height, content anchored bottom-left.
- Section: `relative min-h-screen flex items-end bg-hero-bg overflow-hidden`.
- The Spline scene is absolutely positioned and fills the section, behind everything.
- A `bg-black/30` overlay sits above the scene and below the content, non-interactive, to guarantee text contrast.
- The content container is non-interactive so pointer events reach the 3D scene. Buttons individually re-enable pointer events.
- Content max width steps from 90% on mobile, to `max-w-md` at the small breakpoint, to `max-w-2xl` at large.

**Staggered entrance**

| Element | Delay |
|---|---|
| H1 | 0.2s |
| Subheading | 0.4s |
| Description | 0.55s |
| Button pair | 0.7s |
| Trust line | 0.85s |

**H1 treatment:** the headline renders in near-white with a single emphasised segment in vivid green, mirroring the reference specification's two-tone treatment.

**Buttons:** primary is green with near-black text. Secondary is white with dark text. Both use a small radius, a brightness shift on hover, and a 0.97 active scale.

### 8.3 Services
Five service lines, presented as cards. Copy is outcome-led, not tool-led.

1. **AI-assisted website builds** — landing pages, marketing sites, redesigns.
2. **Vibe-coded web apps and MVPs** — built rapidly with AI pair-programming, reviewed by hand.
3. **Automation and lead-gen workflows** — n8n, spreadsheets, messaging, forms, outreach.
4. **SEO and AI-assisted content** — technical SEO plus AI-drafted, human-edited copy.
5. **Deployment and operations** — GitHub, Vercel, domains, DNS, monitoring.

No prices appear. Every card routes to the booking flow.

### 8.4 Work
- Visual cards with a one-line caption each. No long-form case studies at launch.
- Card contents: screenshot or cover image, project name, one-line description, and a small tag row.
- Target count on launch: **5 to 8 projects**.
- **Placeholder content is used for the initial build.** The owner supplies real names, live URLs, one-line descriptions, and screenshots before launch. Shipping placeholder projects publicly is a launch blocker.

### 8.5 Process
The five-step build sequence, presented as a numbered vertical sequence with a scroll-triggered reveal.

1. **Discovery and prompt design** — goals, brand, content, scope.
2. **AI-assisted generation** — design and code drafted with copilots.
3. **Human review and quality control** — every line read, tested, and corrected.
4. **Automation setup** — workflows, lead capture, integrations.
5. **Deployment and handoff** — shipped, documented, transferred.

### 8.6 Quality and credibility
A dedicated section answering the unspoken objection: if AI wrote it, is it any good? Its argument, in the site's own voice:

- AI drafts. A developer reviews, corrects, and owns the result.
- Every build is tested, measured, and checked against real performance budgets.
- Speed comes from removing waiting, not from removing review.

Where available, this section carries hard evidence such as performance scores and accessibility results.

### 8.7 About
- First-person bio, short paragraphs.
- Self-taught developer working through AI-assisted workflows alongside real code.
- FINKI studies, three or more years of experience.
- Tooling grouped into AI tools, code, automation, and deployment. **Webflow and no-code platform branding is excluded**, per the owner's decision to drop Webflow positioning entirely.
- Portrait usage pending, see section 14.

### 8.8 Blog
- Index page with cards, sorted newest first.
- Post pages with a readable measure, generous line height, and code blocks styled to the dark palette.
- **Three posts written and published at launch.** Drafts are generated during the build and edited by the owner before going live.

**Launch post plan**

| # | Working title | Purpose |
|---|---|---|
| 1 | What vibe coding actually is | Defines the term, targets the featured-snippet opportunity, removes buyer confusion |
| 2 | How an AI-assisted build actually runs, start to finish | Process transparency, addresses the quality objection |
| 3 | What AI speeds up, and what it does not | Credibility, positions AI as leverage rather than replacement |

### 8.9 Contact
- The primary path is a booked call. The booking URL is supplied by the owner later. Until it exists, the control routes to the fallback chosen in section 14.
- A contact form is included, with the submission destination pending.
- Direct email is shown.
- Availability status is shown as a short line, kept current manually.

### 8.10 Chatbot
An embedded third-party chat widget answers visitor questions about services, process, and availability. Vendor selection is pending, see section 14. Requirements regardless of vendor:

- Loaded lazily and after the page is interactive, never blocking first paint.
- Styled to the dark palette where the vendor permits it.
- Dismissible, and never auto-opening on mobile.
- Its knowledge base is seeded from the site's own service, process, and blog content.

### 8.11 Footer
- Logo treatment pending, see section 14.
- Navigation repeat, social links, email, and a copyright line.
- A final booking call to action.

---

## 9. SEO requirements

### 9.1 Keywords

**Primary**
- vibe code developer
- AI web developer
- AI-assisted development
- AI developer for startups
- build MVP with AI

**Secondary**
- AI automation developer
- n8n automation freelancer
- rapid MVP development
- AI-assisted web app development

**Explicitly dropped:** all Webflow-led terms, and all Macedonia and Kumanovo location terms. This is a deliberate, accepted trade of existing local ranking equity for international positioning.

### 9.2 Metadata
- **Title:** Stefan Stankovski — AI / Vibe-Code Developer
- **Description:** rewritten around AI-assisted development, rapid builds, and automation. No Webflow references.
- Unique title and description per page.
- Open Graph and Twitter card images generated per page.

### 9.3 Structured data
- `Person` schema with `jobTitle` set to "AI Developer".
- `ProfessionalService` schema for the services page.
- `Article` schema on blog posts.
- `FAQPage` schema on the vibe-coding explainer content.

### 9.4 Technical SEO
- `sitemap.xml` and `robots.txt` generated at build time.
- Canonical URLs on every page.
- Descriptive alt text on every image.
- Redirects from old site paths. **The owner must supply the list of currently ranking URLs**, see section 14. Without it, existing traffic to those paths is lost.

### 9.5 Analytics
Selection pending, see section 14. Google Search Console is verified regardless of the analytics choice.

---

## 10. Content and asset inventory

### 10.1 Owner-supplied, required before launch

| Asset | Status | Blocking |
|---|---|---|
| Logo monogram, SVG | Supplied as raster, SVG needed | Yes |
| Signature mark, SVG | Supplied as raster, SVG needed | No |
| Portrait, high resolution | Supplied | No |
| Real project names, URLs, screenshots | Not supplied | Yes |
| Booking URL | Not supplied | Yes |
| Owned Spline scene | Not created | Yes |
| Old ranking URL list | Not supplied | No, but recommended |
| Chatbot vendor account | Not created | No |
| Contact form destination | Not decided | Yes |

### 10.2 Produced during the build
- All site copy, drafted for owner approval.
- Three blog posts, drafted for owner editing.
- Open Graph images.
- Favicon and app icons derived from the monogram.

---

## 11. Delivery phases

| Phase | Scope | Duration |
|---|---|---|
| 0 | Open decisions resolved, assets received | Blocking, owner-dependent |
| 1 | Project scaffold, design tokens, typography, motion system, component primitives | 1 day |
| 2 | Navigation and hero with Spline integration | 1 day |
| 3 | Services, work, process, quality, and about sections | 2 days |
| 4 | Blog infrastructure and three drafted posts | 1 day |
| 5 | Contact, form wiring, chatbot embed, booking integration | 1 day |
| 6 | SEO, structured data, metadata, sitemap, redirects, analytics | 1 day |
| 7 | Performance, accessibility, responsive and cross-browser testing | 1 day |
| 8 | Real content swap, owner review, deploy, DNS cutover | 1 day |

Phases 1 through 7 can proceed on placeholder content. Phase 8 cannot start until every blocking asset in section 10.1 is delivered.

---

## 12. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Dropping Webflow and location keywords loses existing rankings | Traffic dip during transition | Accepted by the owner. Redirects preserve what can be preserved. New keyword ranking is tracked from launch. |
| "Vibe coding" confuses non-technical buyers | Lost inquiries | The term is always paired with a plain-language explanation. Blog post one exists specifically for this. |
| Spline scene harms mobile performance | Failed performance budget | Lazy loading, a mobile static fallback, and a hard budget check before launch. |
| Placeholder project data reaches production | Credibility damage | Explicit launch blocker. Deployment gate on real content. |
| Third-party Spline scene shipped publicly | Asset ownership problem | Explicit launch blocker. Replaced before public launch. |
| Two competing greens in the identity | Visual incoherence | Resolved in section 14 before any design work begins. |
| No testimonials at launch | Weaker social proof | Real projects with named outcomes carry the proof instead. A testimonial slot is designed but hidden. |
| Speed-led headline reads as low quality | Wrong client type | The quality section directly counterbalances the speed claim. |

---

## 13. Acceptance criteria

The build is complete when all of the following hold.

**Function**
- Every navigation link, button, and form resolves correctly.
- The booking call to action opens the owner's real booking URL.
- Form submissions arrive at the confirmed destination and the user sees a success state.
- The chatbot loads, answers, and dismisses cleanly.

**Content**
- No placeholder project data remains.
- No Webflow references remain anywhere, including metadata and alt text.
- Three blog posts are live and owner-approved.
- All copy is owner-approved.

**Visual**
- The site matches the agreed dark palette and Sora typography exactly.
- Hero animation stagger matches the specified delays.
- Layout is correct at 375px, 768px, 1024px, 1440px, and 1920px.

**Technical**
- Lighthouse performance 90 or above on mobile.
- Largest Contentful Paint under 2.5s.
- No console errors.
- Keyboard navigation reaches every interactive element with a visible focus state.
- The reduced-motion preference is honoured.
- The Spline scene is owned, not the third-party placeholder.

**SEO**
- Unique metadata on every page.
- Structured data validates.
- Sitemap and robots file present and correct.
- Redirects in place for supplied legacy URLs.
- Search Console verified.

---

## 14. Open decisions

Thirteen items remain unresolved. Each blocks a specific part of the build. No code is written until these are answered and the owner gives explicit approval to start.

| # | Decision | Blocks | Recommended default |
|---|---|---|---|
| 1 | Multi-page versus single-page structure | Routing, the entire information architecture | Multi-page. Best for the blog and international SEO. |
| 2 | Final navigation label set | Navigation component | Work, Services, Process, About, Blog, plus Book a call |
| 3 | Logo placement, and whether the mint signature is recolored to the vivid green | Header, footer, identity system | Monogram in the header and footer. Signature in the footer only, kept in the cream tone. Green stays a control-only accent. |
| 4 | Headshot treatment | About section | Background cutout on dark, with a subtle green rim light |
| 5 | Final hero headline wording | Hero, title tag, all metadata | Option B, which puts speed in the headline as decided |
| 6 | Wordmark text in the navigation | Header | STEFAN, set beside the monogram |
| 7 | Chatbot vendor | Chat integration | Chatbase, for the simplest content-seeded setup |
| 8 | Contact form destination | Form wiring | Resend to the owner's inbox, with an n8n webhook added later |
| 9 | Purpose of the Vite playground | Second application scope and its deployment shape | Live interactive demos of small AI tools |
| 10 | Analytics platform | Tracking setup | Vercel Analytics plus Google Search Console |
| 11 | List of currently ranking URLs | Redirect map | Supply before launch, or accept the loss |
| 12 | Project folder name on disk | Repository creation | `stefanstankovski-site` |
| 13 | Delivery of logo and portrait files into the repository | Asset pipeline | SVG for both marks, high-resolution raster for the portrait |

---

## 15. Decision log

Decisions already locked. Not to be reopened without an explicit change request.

| Area | Decision |
|---|---|
| Title | Vibe-Code Developer, term owned outright |
| Primary offer | A retainer mix of website builds, applications, and automation |
| Ideal client | Early-stage founders needing an MVP fast |
| Commercial model | Hourly and retainer, no published prices |
| Geography | Global, no location positioning |
| Stack | Next.js on Vercel, with a separate Vite playground application |
| Language | English only |
| Primary call to action | A booked call |
| Chatbot | A third-party embedded widget |
| Proof strategy | Named client projects and results |
| Objection handling | A dedicated human-review and quality-control section |
| Speed claims | Speed leads, placed in the headline |
| Portfolio format | Visual cards with one-line captions |
| Project count | 5 to 8 |
| Webflow | Removed entirely from the site |
| Visual direction | The SENTINEL AI specification, as aesthetic reference only |
| Theme | Dark only, no light mode |
| Spline scene | Third-party scene used as a build placeholder, replaced before launch |
| Testimonials | None at launch |
| Blog | Live at launch with three posts |
| Tone | Confident and direct, short sentences |
| DNS and publishing | Handled by the owner |
