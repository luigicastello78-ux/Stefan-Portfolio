import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Prose styling for posts. PRD section 8.8.
 *
 * These map straight onto the design tokens rather than pulling in a
 * typography plugin, so the reading view cannot drift from the rest of the
 * site. Measure is capped in the post layout, not here.
 *
 * Passed to MDXRemote by the post page. It is a plain object rather than
 * the `useMDXComponents` hook the @next/mdx convention wants, because posts
 * are no longer imported as modules: they are markdown files the CMS writes
 * and the loader reads at build.
 */
export const proseComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      className="mt-16 scroll-mt-32 text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-10 scroll-mt-32 text-xl font-semibold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p
      className="mt-6 text-base font-light leading-[1.75] text-foreground/80"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mt-6 space-y-3 pl-5" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mt-6 list-decimal space-y-3 pl-5" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li
      className="relative text-base font-light leading-[1.75] text-foreground/80 marker:text-primary"
      {...props}
    >
      {children}
    </li>
  ),
  a: ({ href, children, ...props }) => {
    const internal = href?.startsWith("/");
    const className =
      "text-foreground underline decoration-primary/60 underline-offset-4 transition-colors hover:decoration-primary";
    return internal ? (
      <Link href={href} className={className}>
        {children}
      </Link>
    ) : (
      <a
        href={href}
        className={className}
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  },
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mt-8 border-l-2 border-primary pl-6 text-base font-light italic leading-[1.75] text-foreground/70"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props) => <hr className="mt-12 border-border" {...props} />,
  code: ({ children, ...props }) => (
    <code
      className="rounded border border-border bg-muted px-1.5 py-0.5 text-[0.9em] text-foreground"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="mt-8 overflow-x-auto rounded-lg border border-border bg-hero-bg p-5 text-sm leading-relaxed [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    >
      {children}
    </pre>
  ),
};
