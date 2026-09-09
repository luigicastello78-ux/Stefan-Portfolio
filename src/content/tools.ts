/**
 * Tooling groups. PRD section 8.7.
 * No-code platform branding is deliberately absent, per the decision to drop
 * Webflow positioning from the site entirely.
 */

export type ToolGroup = {
  name: string;
  items: string[];
};

export const toolGroups: ToolGroup[] = [
  {
    name: "AI",
    items: ["Claude", "ChatGPT", "Cursor", "Claude Code"],
  },
  {
    name: "Code",
    items: ["TypeScript", "React", "Next.js", "Python", "Django", "Tailwind"],
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
