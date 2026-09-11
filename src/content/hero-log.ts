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
    text: "describe what you need",
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
    text: "read every line, throw out what is wrong",
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
 * Grouped rather than a flat list, because a run of twelve names says
 * nothing about how they fit together. The groups are the same four the
 * about page uses, so the site tells one story about the stack.
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
  { label: "automation", items: ["n8n", "APIs", "Webhooks"] },
  { label: "deploy", items: ["Vercel", "GitHub", "Cloudflare"] },
];
