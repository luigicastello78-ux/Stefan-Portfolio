import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { formatPostDate, posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on AI-assisted development. What vibe coding is, how a build runs, and what AI does and does not speed up.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes on building with AI"
        lede="Written for people deciding whether to hire someone who works this way. No hype, and no pretending the tools do more than they do."
      />

      <section className="bg-background px-6 py-20 md:px-10 lg:px-16 lg:py-28">
        <ul className="mx-auto grid max-w-4xl gap-px overflow-hidden rounded-lg border border-border bg-border">
          {posts.map((post, index) => (
            <Reveal as="li" key={post.slug} delay={index * 0.06}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block bg-background p-8 transition-colors hover:bg-muted lg:p-10"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-widest text-muted-foreground">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.readingMinutes} min read</span>
                </div>

                <h2 className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-foreground">
                  {post.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
                  {post.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Read
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
