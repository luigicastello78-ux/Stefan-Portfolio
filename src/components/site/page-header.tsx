import { Reveal } from "@/components/site/reveal";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  lede: string;
};

/** Shared masthead for inner pages. One H1 per page lives here. */
export function PageHeader({ eyebrow, title, lede }: PageHeaderProps) {
  return (
    <header className="border-b border-border bg-hero-bg px-6 pb-16 pt-36 md:px-10 lg:px-16 lg:pb-24 lg:pt-44">
      <div className="max-w-3xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-muted-foreground md:text-lg">
            {lede}
          </p>
        </Reveal>
      </div>
    </header>
  );
}
