/**
 * The lines in the hero panel.
 *
 * It is a stylised terminal, not a claim about a specific project. Each line
 * says who or what does that part of the work, which is the whole positioning
 * in five rows. Nothing here is a measured result, deliberately: invented
 * numbers in a hero are the fastest way to lose a technical reader.
 */

export type LogLine = {
  /** Rendered before the text. A prompt, a tick, or an arrow. */
  marker: string;
  text: string;
  /** Right-hand label saying what did the work. */
  by?: string;
  tone: "prompt" | "step" | "done";
};

export const heroLog: LogLine[] = [
  {
    marker: "$",
    text: "tell me what it has to do",
    tone: "prompt",
  },
  {
    marker: "→",
    text: "draft the layout, the code and the copy",
    by: "ai",
    tone: "step",
  },
  {
    marker: "→",
    text: "read it all, keep what survives",
    by: "human",
    tone: "step",
  },
  {
    marker: "→",
    text: "wire the forms, the leads, the integrations",
    by: "n8n",
    tone: "step",
  },
  {
    marker: "✓",
    text: "ship it to accounts you own",
    by: "live",
    tone: "done",
  },
];

/**
 * The ticker along the foot of the hero.
 *
 * Grouped rather than a flat list, because a run of names says nothing about
 * how they fit together.
 *
 * The no-code group is here at the owner's request and is the one place on
 * the site that names Webflow, WordPress or Shopify. PRD decision 16 dropped
 * Webflow positioning everywhere else, and the about page tool list still
 * leaves those platforms out. If that page should match this strip, add a
 * fifth group to src/content/tools.ts.
 */
export type ToolGroup = {
  label: string;
  items: string[];
};

export const heroMarquee: ToolGroup[] = [
  { label: "ai", items: ["Claude", "Cursor", "ChatGPT"] },
  {
    label: "code",
    items: ["Next.js", "TypeScript", "React", "Tailwind", "Python", "Django"],
  },
  { label: "no-code", items: ["Webflow", "WordPress", "Shopify"] },
  { label: "automation", items: ["n8n", "APIs", "Webhooks"] },
  { label: "deploy", items: ["Vercel", "GitHub", "Cloudflare"] },
];
