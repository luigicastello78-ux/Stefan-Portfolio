/**
 * Real projects.
 *
 * Cards are not links. The owner asked for the address shown as plain text
 * rather than anything clickable, so `ProjectCard` renders an article and
 * the domain sits in the browser chrome as a label.
 *
 * The cover files under /public/work are brand-keyed stand-in plates, not
 * screenshots. Overwrite each one, keeping the filename, and the cards pick
 * up the real thing with no code change. Sizes should be 1600 by 1000, or
 * anything else at 16:10.
 */

export type Project = {
  slug: string;
  name: string;
  caption: string;
  tags: string[];
  /** Host only, no scheme. Shown in the address bar, never linked. */
  domain: string;
  /** Path under /public. 16:10. */
  image: string;
};

/** Nothing invented remains, so the warning banner is off. */
export const isPlaceholderWork = false;

export const projects: Project[] = [
  {
    slug: "sequence-minds",
    domain: "www.sequenceminds.com",
    name: "Sequence Minds",
    caption:
      "Outbound lead generation agency, aimed at manufacturing and B2B teams.",
    tags: ["Next.js", "React", "Vercel"],
    image: "/work/sequenceminds.png",
  },
  {
    slug: "south-africa-sdr",
    domain: "www.southafricasdr.com",
    name: "South Africa SDR",
    caption:
      "Offshore sales development service placing outbound reps with Western teams.",
    tags: ["Next.js", "Sveltia CMS", "Vercel"],
    image: "/work/southafricasdr.png",
  },
  {
    slug: "splice-property-solutions",
    domain: "www.splicepropertysolutions.co.uk",
    name: "Splice Property Solutions",
    caption:
      "Relocation, investment and property specialist working in Cyprus.",
    tags: ["Next.js", "Sveltia CMS", "Vercel"],
    image: "/work/splicepropertysolutions.png",
  },
];
