/** Six service lines. PRD section 8.3. Outcome-led, never tool-led. */

export type Service = {
  number: string;
  title: string;
  description: string;
  detail: string[];
};

export const services: Service[] = [
  {
    number: "01",
    title: "Web design and build",
    description:
      "Landing pages, marketing sites and redesigns. Designed and built to say what you do in the first line.",
    detail: ["Landing pages", "Marketing sites", "Redesigns", "Copy"],
  },
  {
    number: "02",
    title: "Web apps and MVPs",
    description:
      "A working product instead of a deck. Real data, real accounts, deployed where people can use it.",
    detail: ["MVPs", "Internal tools", "Dashboards", "APIs"],
  },
  {
    number: "03",
    title: "Automation that runs itself",
    description:
      "Lead capture, outreach and internal workflows wired together so the thing keeps working after launch.",
    detail: ["n8n workflows", "Integrations", "Lead routing", "Notifications"],
  },
  {
    number: "04",
    title: "Technical SEO",
    description:
      "The half of SEO that is engineering. Structure, schema, speed, and the reporting set up so you can see what changes.",
    detail: ["Site structure", "Schema", "Core Web Vitals", "Search Console"],
  },
  {
    number: "05",
    title: "Webflow builds",
    description:
      "For sites your team edits without calling a developer. Built properly, with the CMS set up so nobody can break the layout.",
    detail: ["Webflow", "CMS collections", "Migrations", "Handover"],
  },
  {
    number: "06",
    title: "Deployment and handover",
    description:
      "Shipped, monitored and handed over. Repositories, domains and pipelines you actually own.",
    detail: ["Vercel", "GitHub", "Domains and DNS", "Monitoring"],
  },
];
