import { Reveal } from "@/components/site/reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  lede?: string;
};

export function SectionHeading({ eyebrow, title, lede }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-primary">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-foreground">
          {title}
        </h2>
      </Reveal>
      {lede ? (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base font-light leading-relaxed text-muted-foreground md:text-lg">
            {lede}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
