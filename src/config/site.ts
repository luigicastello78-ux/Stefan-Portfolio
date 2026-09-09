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
  bookingUrl: "/contact",
  social: {
    github: "#",
    linkedin: "#",
    x: "#",
  },
} as const;

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
