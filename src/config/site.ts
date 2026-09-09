/**
 * Single source of truth for navigation, contact routes and site metadata.
 * Nav labels follow PRD section 14, decision 2, recommended default.
 */

export const siteConfig = {
  name: "Stefan Stankovski",
  wordmark: "STEFAN",
  title: "Stefan Stankovski — AI / Vibe-Code Developer",
  description:
    "AI-assisted development. Websites, web apps and MVPs built with AI pair-programming and reviewed line by line.",
  url: "https://stefanstankovski.com",
  email: "websites@leadmaker.agency",
  // TODO: replace with the owner's real booking URL. PRD section 10.1.
  // Until it exists every booking control falls back to the contact page.
  bookingUrl: "/contact",
  // Portrait under /public, or null to fall back to a stand-in.
  portrait: "/stefan-portrait.jpg" as string | null,
  // Handwritten mark, used as a CSS mask so it can be recoloured. Its own
  // pixels are mint green, which fights the brand green, so only its alpha
  // channel is kept.
  signature: "/signature.png",
  /** Google Search Console HTML tag token, or null until verified. */
  googleSiteVerification: null as string | null,
  keywords: [
    "vibe code developer",
    "AI web developer",
    "AI-assisted development",
    "AI developer for startups",
    "build MVP with AI",
    "AI automation developer",
    "n8n automation freelancer",
    "rapid MVP development",
  ],
  social: {
    github: "#",
    linkedin: "#",
    x: "#",
  },
} as const;

/**
 * Hero backdrop.
 *
 * "spline" loads the 3D scene over the coded backdrop, deferred until the
 * browser is idle and stopped whenever the hero leaves the viewport.
 *
 * "coded" is the CSS-only backdrop on its own. It costs effectively nothing
 * because it animates transform and opacity only, and it is what everyone
 * on a phone or with reduced motion turned on receives either way.
 *
 * The scene below is still a third-party asset and has to be replaced with
 * an owned one before launch. PRD section 6.3.
 */
export const heroBackdrop = {
  provider: "spline" as "coded" | "spline",
  splineScene: "https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode",
};

/**
 * Embedded chat widget. PRD section 8.10, decision 7.
 *
 * Off until the owner has an account and an id. The loader defers the vendor
 * script until the browser is idle, so it can never delay first paint or
 * compete with the page for main-thread time.
 */
export const chatConfig = {
  provider: "none" as "none" | "chatbase" | "custom",
  /** Chatbase bot id, or the full script URL for a custom provider. */
  id: "",
};

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];
