/**
 * Plain-language answers to the questions that stop people enquiring.
 * PRD section 6, added for the featured-snippet opportunity around
 * "what is vibe coding". Structured data is wired up in Part 5.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: "What is vibe coding?",
    answer:
      "Building software by describing what you want in plain language, letting an AI model write the first version, then reviewing and correcting it yourself. The model does the typing. A developer decides what gets built and owns the result.",
  },
  {
    question: "How does AI-assisted development work in practice?",
    answer:
      "A precise brief becomes a prompt. The model produces a first draft in hours instead of days. The rest of the project is a developer reading that draft, throwing out what is wrong, and testing what is left. The review does not get skipped, it gets longer.",
  },
  {
    question: "Is AI-generated code any good?",
    answer:
      "On its own, unpredictably. Models are wrong fluently, which means their mistakes look finished. That is exactly why every line gets read and tested before it ships. The speed comes from removing waiting, not from removing review.",
  },
  {
    question: "How fast is a typical build?",
    answer:
      "A marketing site is usually days rather than weeks. An application with real business logic is two to three weeks for a working first version. Anyone quoting one multiplier for every kind of project has not thought about it properly.",
  },
  {
    question: "What does it cost?",
    answer:
      "Hourly for defined pieces of work, or a monthly retainer for ongoing work. There are no fixed packages, because packages always either cheat you or cheat me. Pricing comes out of the first call.",
  },
  {
    question: "Do I own what you build?",
    answer:
      "Yes. Everything is deployed to accounts in your name, in a repository you control, and documented well enough that somebody else could pick it up. If you cannot leave, I have built the wrong thing.",
  },
];
