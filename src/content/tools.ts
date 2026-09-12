/**
 * Tooling groups. PRD section 8.7.
 * These match the groups in the hero ticker, so the stack is described the
 * same way in both places.
 */

export type ToolGroup = {
  name: string;
  items: string[];
};

export const toolGroups: ToolGroup[] = [
  {
    name: "Code",
    items: ["TypeScript", "React", "Next.js", "Python", "Django", "Tailwind"],
  },
  {
    name: "No-code",
    items: ["Webflow", "WordPress", "Shopify"],
  },
  {
    name: "SEO",
    items: ["Search Console", "Schema", "Core Web Vitals", "Analytics"],
  },
  {
    name: "Automation",
    items: ["n8n", "REST APIs", "Webhooks", "Google Sheets", "Telegram"],
  },
  {
    name: "Deployment",
    items: ["GitHub", "Vercel", "Netlify", "Cloudflare", "DNS"],
  },
];
