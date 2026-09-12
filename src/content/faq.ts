/**
 * Plain-language answers to the questions that stop people enquiring.
 * PRD section 6. Structured data mirrors this list exactly, so the two have
 * to be edited together.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: "What do you actually build?",
    answer:
      "Websites and web apps, in code or in Webflow depending on who has to edit them afterwards. Technical SEO so they can be found, and automation so the leads and the admin move without anyone copying and pasting.",
  },
  {
    question: "Webflow or custom code?",
    answer:
      "Webflow when the client wants to edit pages themselves without calling a developer. Custom code when the site has to do something Webflow cannot, or when it is an application rather than a set of pages. I will tell you which one your project is on the first call, including when the answer is the cheaper one.",
  },
  {
    question: "How fast is a typical build?",
    answer:
      "A marketing site is usually days rather than weeks. A web app with real business logic is two to three weeks for a working first version. Anyone quoting one number for every kind of project has not thought about it properly.",
  },
  {
    question: "Do you do the SEO as well?",
    answer:
      "The technical half, always, because it is part of building the thing properly: structure, metadata, schema, speed, and Search Console set up so you can see what happens next. Content and ongoing link work is a separate conversation.",
  },
  {
    question: "What does the automation actually do?",
    answer:
      "Usually it removes a step that depends on somebody remembering. An enquiry reaching the right person in the tool they already use, a follow-up that fires on its own, a record that writes itself. Mostly built in n8n, connected to whatever you already run on.",
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
