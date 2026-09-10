/**
 * How a build runs, from requirements to a finished product.
 *
 * One source for both the homepage section and the /process page, so the
 * two can never drift. The page adds longer prose on top of these fields;
 * everything structural lives here.
 *
 * Step 03 is where the "but AI wrote it" objection gets answered. It is
 * stated as part of the sequence rather than as a separate defensive
 * section, because that is where it actually belongs.
 */

export type ProcessStep = {
  number: string;
  title: string;
  /** One line. What this stage is for. */
  description: string;
  /** What the client has to do. */
  you: string;
  /** What I do. */
  me: string;
  /** Plain language, never a false precision. */
  duration: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Requirements",
    description:
      "We agree what the thing is for and who it is aimed at, before anything gets built.",
    you: "One call, then answers to a short list of questions",
    me: "Turn all of it into a written specification",
    duration: "Half a day",
  },
  {
    number: "02",
    title: "First draft",
    description:
      "A version to react to instead of a blank page. This is where the speed comes from.",
    you: "Nothing yet",
    me: "Generate the layout, the code and the copy with AI",
    duration: "One to three days",
  },
  {
    number: "03",
    title: "Review",
    description:
      "Every line read, tested and corrected. Nothing ships because a model produced it.",
    you: "Nothing yet",
    me: "Throw out what is wrong, test what is left",
    duration: "Runs alongside the draft",
  },
  {
    number: "04",
    title: "Automation",
    description:
      "The parts that keep working when nobody is watching the site.",
    you: "Access to the tools you already use",
    me: "Wire the forms, the leads and the integrations",
    duration: "Half a day to two days",
  },
  {
    number: "05",
    title: "Launch",
    description:
      "Live on infrastructure in your own accounts, documented and handed over.",
    you: "A review pass, then the go-ahead",
    me: "Deploy, document, transfer everything",
    duration: "Half a day",
  },
  {
    number: "06",
    title: "After launch",
    description:
      "Changes, additions, or nothing at all. Whichever suits you.",
    you: "Decide whether you want ongoing work",
    me: "Hourly for defined pieces, or a monthly retainer",
    duration: "Your call",
  },
];
