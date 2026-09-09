/** Five service lines. PRD section 8.3. Outcome-led, never tool-led. */

export type Service = {
  number: string;
  title: string;
  description: string;
  detail: string[];
};

export const services: Service[] = [
  {
    number: "01",
    title: "Websites that ship",
    description:
      "Landing pages, marketing sites and redesigns. Drafted with AI, finished by hand, live in days.",
    detail: ["Landing pages", "Full marketing sites", "Redesigns", "Copy"],
  },
  {
    number: "02",
    title: "Web apps and MVPs",
    description:
      "A working product instead of a deck. Built with AI pair-programming and reviewed line by line.",
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
    title: "SEO and content",
    description:
      "Technical SEO done properly, with copy drafted fast and edited by someone who reads it.",
    detail: ["Technical SEO", "Schema", "Content systems", "Search Console"],
  },
  {
    number: "05",
    title: "Deployment and operations",
    description:
      "Shipped, monitored and handed over. Repositories, domains and pipelines you actually own.",
    detail: ["Vercel", "GitHub", "Domains and DNS", "Monitoring"],
  },
];
