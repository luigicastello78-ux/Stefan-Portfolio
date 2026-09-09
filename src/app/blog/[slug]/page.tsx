import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/site/reveal";
import { buttonVariants } from "@/components/ui/button";
import { formatPostDate, getPost, posts } from "@/content/posts";
import { siteConfig } from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = posts.filter((other) => other.slug !== post.slug).slice(0, 2);
  const { Content } = post;

  return (
    <>
      <header className="border-b border-border bg-hero-bg px-6 pb-16 pt-36 md:px-10 lg:px-16 lg:pb-20 lg:pt-44">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              <span aria-hidden="true">&larr;</span>
              All posts
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-8 text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-foreground">
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-widest text-muted-foreground">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingMinutes} min read</span>
              <span aria-hidden="true">&middot;</span>
              <span>{post.tags.join(", ")}</span>
            </div>
          </Reveal>
        </div>
      </header>

      <article className="bg-background px-6 py-16 md:px-10 lg:px-16 lg:py-24">
        {/* Measure is capped here rather than in the prose components. */}
        <div className="mx-auto max-w-[38rem]">
          <Content />
        </div>

        <div className="mx-auto mt-20 max-w-[38rem] border-t border-border pt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Building something along these lines?
          </h2>
          <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
            Thirty minutes, no pitch. You describe the problem, I tell you
            whether it is worth building and roughly what it takes.
          </p>
          <Link
            href={siteConfig.bookingUrl}
            className={`${buttonVariants({ variant: "hero", size: "xl" })} mt-8 text-xs font-semibold uppercase tracking-widest`}
          >
            Book a call
          </Link>
        </div>
      </article>

      {others.length ? (
        <section className="border-t border-border bg-hero-bg px-6 py-20 md:px-10 lg:px-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xs uppercase tracking-[0.3em] text-primary">
              Keep reading
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/blog/${other.slug}`}
                    className="block h-full rounded-lg border border-border bg-background p-6 transition-colors hover:border-primary/40"
                  >
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      {other.readingMinutes} min read
                    </p>
                    <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-foreground">
                      {other.title}
                    </h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                      {other.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
