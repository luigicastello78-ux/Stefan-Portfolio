import { useMemo, useState } from "react";

/**
 * Playground. PRD decision 9, recommended default: live demos of small
 * AI tools.
 *
 * Deliberately separate from the marketing site so an experiment can never
 * destabilise it. Nothing here is indexed.
 */

type Demo = {
  slug: string;
  name: string;
  blurb: string;
  status: "live" | "planned";
};

const demos: Demo[] = [
  {
    slug: "prompt-cost",
    name: "Prompt cost estimator",
    blurb: "Rough token and cost estimate for a block of text, before you send it.",
    status: "live",
  },
  {
    slug: "brief-to-spec",
    name: "Brief to spec",
    blurb: "Paste a client brief, get back the questions nobody asked.",
    status: "planned",
  },
  {
    slug: "copy-tightener",
    name: "Copy tightener",
    blurb: "Cuts marketing copy down to what it actually says.",
    status: "planned",
  },
];

/** Crude but honest: roughly four characters to a token for English prose. */
function estimateTokens(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return Math.ceil(trimmed.length / 4);
}

function PromptCostDemo() {
  const [text, setText] = useState("");
  const [rate, setRate] = useState(3);

  const tokens = useMemo(() => estimateTokens(text), [text]);
  const cost = (tokens / 1_000_000) * rate;

  return (
    <div className="rounded-lg border border-border bg-background p-6">
      <label
        htmlFor="prompt"
        className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
      >
        Paste a prompt
      </label>
      <textarea
        id="prompt"
        rows={6}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Anything. The estimate is rough on purpose."
        className="w-full resize-y rounded-md border border-input bg-hero-bg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60"
      />

      <div className="mt-5 flex flex-wrap items-end gap-6">
        <div>
          <label
            htmlFor="rate"
            className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
          >
            Dollars per million input tokens
          </label>
          <input
            id="rate"
            type="number"
            min={0}
            step={0.5}
            value={rate}
            onChange={(event) => setRate(Number(event.target.value) || 0)}
            className="w-32 rounded-md border border-input bg-hero-bg px-4 py-2 text-sm text-foreground"
          />
        </div>

        <dl className="flex gap-8">
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">
              Tokens
            </dt>
            <dd className="mt-1 text-2xl font-semibold text-foreground">
              {tokens.toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">
              Cost
            </dt>
            <dd className="mt-1 text-2xl font-semibold text-primary">
              ${cost.toFixed(4)}
            </dd>
          </div>
        </dl>
      </div>

      <p className="mt-6 text-xs font-light leading-relaxed text-muted-foreground/70">
        Four characters to a token is a rule of thumb, not a tokenizer. Treat
        the number as an order of magnitude.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-hero-bg">
      <header className="border-b border-border px-6 py-16 md:px-10 lg:px-16">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">
          Playground
        </p>
        <h1 className="mt-5 text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
          Small things, built to see if they work
        </h1>
        <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-muted-foreground">
          Experiments that are not polished enough for the main site. Some of
          them will end up there. Most will not.
        </p>
        <a
          href="https://stefanstankovski.com"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
        >
          <span aria-hidden="true">&larr;</span>
          Back to the site
        </a>
      </header>

      <main className="px-6 py-16 md:px-10 lg:px-16">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {demos[0].name}
          </h2>
          <p className="mt-2 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
            {demos[0].blurb}
          </p>
          <div className="mt-8 max-w-2xl">
            <PromptCostDemo />
          </div>
        </section>

        <section className="mt-20 border-t border-border pt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Queued up
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {demos
              .filter((demo) => demo.status === "planned")
              .map((demo) => (
                <li
                  key={demo.slug}
                  className="rounded-lg border border-border bg-background p-6"
                >
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    Planned
                  </p>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                    {demo.name}
                  </h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                    {demo.blurb}
                  </p>
                </li>
              ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
