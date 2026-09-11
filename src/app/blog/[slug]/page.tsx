import type { Metadata } from "next";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/site/json-ld";
import { proseComponents } from "@/components/site/prose";
import { Reveal } from "@/components/site/reveal";
import { buttonVariants } from "@/components/ui/button";
import { formatPostDate, getPost, posts } from "@/content/posts";
import { siteConfig } from "@/config/site";
import { articleSchema } from "@/lib/structured-data";

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

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <header className="site-container border-b border-border bg-hero-bg pb-16 pt-36 lg:pb-20 lg:pt-44">
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

      {/* Cover. Decorative: the headline above already says what this is,
          so an alt text here would only repeat it to a screen reader. */}
      <div className="site-container bg-background pt-10 lg:pt-14">
        <div className="relative mx-auto aspect-[16/9] w-full max-w-4xl overflow-hidden rounded-xl border border-border">
          <Image
            src={post.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <article className="site-container bg-background py-16 lg:py-24">
        {/* Measure is capped here rather than in the prose components. */}
        <div className="mx-auto max-w-[38rem]">
          <MDXRemote source={post.body} components={proseComponents} />
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
        <section className="site-container border-t border-border bg-hero-bg py-20">
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
