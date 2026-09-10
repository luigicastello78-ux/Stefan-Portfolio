import { heroLog } from "@/content/hero-log";

/**
 * The panel beside the hero copy. PRD section 5.1 asked for a terminal or
 * prompt aesthetic, and this is it: the positioning stated as a sequence of
 * commands rather than as another paragraph.
 *
 * Server component. The staggered entrance is the same fade-up used
 * everywhere else, driven by inline delays, so it costs no JavaScript.
 *
 * It is decorative in the sense that the copy beside it already says all of
 * this, but the text is real text, so a screen reader gets a coherent list
 * rather than a wall of symbols. The markers are hidden from assistive
 * technology because "dollar sign, arrow, arrow" helps nobody.
 */
const toneStyles: Record<string, { marker: string; text: string }> = {
  prompt: { marker: "text-primary", text: "text-foreground" },
  step: { marker: "text-muted-foreground", text: "text-foreground/75" },
  done: { marker: "text-primary", text: "text-foreground" },
};

export function BuildPanel() {
  return (
    <div className="relative">
      {/* Sits behind the panel and lifts it off the backdrop. */}
      <div
        aria-hidden="true"
        className="absolute -inset-px rounded-xl bg-gradient-to-br from-primary/25 via-border to-transparent"
      />

      <div className="relative overflow-hidden rounded-xl bg-[hsl(0_0%_6%)]">
        <div className="flex items-center gap-3 border-b border-border/70 px-5 py-3.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/50" />
          </span>
          <p className="font-mono text-[11px] tracking-widest text-muted-foreground">
            how a build runs
          </p>
        </div>

        <ol className="space-y-3.5 px-5 py-6 font-mono text-[13px] leading-relaxed sm:px-6 sm:py-7">
          {heroLog.map((line, index) => {
            const tone = toneStyles[line.tone];
            return (
              <li
                key={line.text}
                className="flex animate-fade-up items-start gap-3 opacity-0"
                style={{ animationDelay: `${0.55 + index * 0.12}s` }}
              >
                <span aria-hidden="true" className={`shrink-0 ${tone.marker}`}>
                  {line.marker}
                </span>
                <span className={`flex-1 ${tone.text}`}>{line.text}</span>
                {line.by ? (
                  <span className="shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                    {line.by}
                  </span>
                ) : null}
              </li>
            );
          })}

          <li
            className="flex animate-fade-up items-center gap-3 opacity-0"
            style={{ animationDelay: `${0.55 + heroLog.length * 0.12}s` }}
            aria-hidden="true"
          >
            <span className="shrink-0 text-primary">$</span>
            <span className="inline-block h-[1.1em] w-[0.55em] animate-caret-blink bg-primary/80" />
          </li>
        </ol>
      </div>
    </div>
  );
}
