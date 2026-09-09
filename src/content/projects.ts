/**
 * PLACEHOLDER PROJECTS.
 *
 * Every entry below is invented so the grid can be built and reviewed.
 * None of it is real work and none of it may reach production.
 * PRD section 8.4 lists this as a launch blocker. The owner supplies real
 * names, live URLs, one-line captions and screenshots before launch.
 */

export type Project = {
  slug: string;
  name: string;
  caption: string;
  tags: string[];
  href: string;
  /** Placeholder gradient stand-in until real screenshots arrive. */
  tone: string;
};

export const isPlaceholderWork = true;

export const projects: Project[] = [
  {
    slug: "placeholder-one",
    name: "Northwind Studio",
    caption: "Marketing site for a design studio, built and live in four days.",
    tags: ["Next.js", "Landing page"],
    href: "#",
    tone: "from-[#1f2b1f] to-[#0d0d0d]",
  },
  {
    slug: "placeholder-two",
    name: "Cadence",
    caption: "Booking MVP with payments, from empty repo to first customer.",
    tags: ["MVP", "Payments"],
    href: "#",
    tone: "from-[#1a2430] to-[#0d0d0d]",
  },
  {
    slug: "placeholder-three",
    name: "Relay Ops",
    caption: "Lead routing automation replacing a manual inbox process.",
    tags: ["n8n", "Automation"],
    href: "#",
    tone: "from-[#2a2418] to-[#0d0d0d]",
  },
  {
    slug: "placeholder-four",
    name: "Harbor Labs",
    caption: "Product site rebuilt for speed, from a slow legacy template.",
    tags: ["Redesign", "Performance"],
    href: "#",
    tone: "from-[#241a2a] to-[#0d0d0d]",
  },
  {
    slug: "placeholder-five",
    name: "Fieldnote",
    caption: "Internal dashboard for a small team, shipped in a week.",
    tags: ["Dashboard", "Internal tool"],
    href: "#",
    tone: "from-[#182a26] to-[#0d0d0d]",
  },
  {
    slug: "placeholder-six",
    name: "Meridian",
    caption: "Content system and technical SEO rebuild for a B2B site.",
    tags: ["SEO", "Content"],
    href: "#",
    tone: "from-[#2a1a1a] to-[#0d0d0d]",
  },
];
