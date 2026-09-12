/**
 * Single source of truth for navigation, contact routes and site metadata.
 * Nav labels follow PRD section 14, decision 2, recommended default.
 */

export const siteConfig = {
  name: "Stefan Stankovski",
  wordmark: "STEFAN",
  title: "Stefan Stankovski — Web Development, Design and Automation",
  description:
    "Websites, web apps and Webflow builds, with technical SEO and n8n automation wired in. Designed, built and handed over properly.",
  url: "https://stefanstankovski.com",
  email: "contact@stefanstankovski.com",
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
    "web developer",
    "web design and development",
    "web app development",
    "Webflow developer",
    "technical SEO",
    "n8n automation",
    "workflow automation developer",
    "MVP development",
  ],
  social: {
    github: "#",
    linkedin: "#",
    x: "#",
  },
} as const;

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
