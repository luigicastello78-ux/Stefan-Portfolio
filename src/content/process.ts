/** The five-step build sequence. PRD section 8.5. */

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery and prompt design",
    description:
      "Goals, audience, scope and content, defined before a line is written. The brief becomes the prompt.",
  },
  {
    number: "02",
    title: "AI-assisted generation",
    description:
      "Design and code drafted with copilots. This is the part that used to take weeks and now takes hours.",
  },
  {
    number: "03",
    title: "Human review and quality control",
    description:
      "Every line read, tested and corrected. Nothing ships because a model produced it.",
  },
  {
    number: "04",
    title: "Automation setup",
    description:
      "Forms, lead capture, integrations and workflows connected so the site works without you watching it.",
  },
  {
    number: "05",
    title: "Deployment and handoff",
    description:
      "Live on your own infrastructure, documented, and transferred. No lock-in, no hostage accounts.",
  },
];
