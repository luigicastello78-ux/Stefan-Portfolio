import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { buttonVariants } from "@/components/ui/button";
import { processSteps } from "@/content/process";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How an AI-assisted build runs, start to finish. Discovery, generation, human review, automation, deployment.",
  alternates: { canonical: "/process" },
};

/** What actually happens in each step, and what you do. */
const expanded: Record<string, { doing: string; yours: string; long: string }> =
  {
    "01": {
      doing: "Half a day to two days",
      yours: "One call and answers to a short list of questions",
      long: "We agree what the thing is for and who it is aimed at before anything gets built. Most failed projects fail here, quietly, and nobody notices until the end.",
    },
    "02": {
      doing: "One to three days",
      yours: "Nothing yet",
      long: "Design and code get drafted with AI assistance. This is where the speed comes from. What used to be a week of boilerplate and blank pages is now an afternoon.",
    },
    "03": {
      doing: "Continuous, alongside step two",
      yours: "Nothing yet",
      long: "Every line gets read and corrected. Models are confidently wrong on a regular basis, and catching that is the job. Nothing ships because it looked plausible.",
    },
    "04": {
      doing: "Half a day to two days",
      yours: "Access to the tools you already use",
      long: "Forms, lead capture, notifications and integrations get connected so the site keeps working when nobody is watching it.",
    },
    "05": {
      doing: "Half a day",
      yours: "A review pass, then the go-ahead",
      long: "Live on infrastructure in your own accounts, documented, and handed over. You can take it elsewhere the next day if you want to.",
    },
  };

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Process"
        title="How a build actually runs"
        lede="The same five steps every time. Nothing about it is mysterious, and none of it skips review."
      />

      <section className="site-container bg-background py-20 lg:py-28">
        <ol className="border-t border-border">
          {processSteps.map((step, index) => {
            const detail = expanded[step.number];
            return (
              <Reveal
                as="li"
                key={step.number}
                delay={index * 0.05}
                className="border-b border-border py-12 lg:py-16"
              >
                <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-4">
                    <p className="text-sm tracking-[0.2em] text-primary">
                      {step.number}
                    </p>
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
                      {step.title}
                    </h2>
                  </div>

                  <div className="lg:col-span-8">
                    <p className="text-base font-light leading-relaxed text-foreground/80">
                      {step.description}
                    </p>
                    {detail ? (
                      <>
                        <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
                          {detail.long}
                        </p>
                        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                          <div>
                            <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                              Typically takes
                            </dt>
                            <dd className="mt-2 text-sm text-foreground/80">
                              {detail.doing}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                              Your part
                            </dt>
                            <dd className="mt-2 text-sm text-foreground/80">
                              {detail.yours}
                            </dd>
                          </div>
                        </dl>
                      </>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <Reveal className="mt-20 block">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            One thing worth saying plainly
          </h2>
          <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
            AI writes the first draft. It does not decide what to build, it does
            not catch its own mistakes, and it does not carry the consequences.
            That part is still a person, and on your project the person is me.
          </p>
          <Link
            href={siteConfig.bookingUrl}
            className={`${buttonVariants({ variant: "hero", size: "xl" })} mt-8 text-xs font-semibold uppercase tracking-widest`}
          >
            Start at step one
          </Link>
        </Reveal>
      </section>
    </>
  );
}
