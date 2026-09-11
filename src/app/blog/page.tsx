import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHeader } from "@/components/site/page-header";
import { Reveal } from "@/components/site/reveal";
import { formatPostDate, posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on AI-assisted development. What vibe coding is, how a build runs, what to put in a brief, and what AI gets wrong.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes on building with AI"
        lede="Written for people deciding whether to hire someone who works this way. No hype, and no pretending the tools do more than they do."
      />

      <section className="site-container bg-background py-20 lg:py-28">
        <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border">
          {posts.map((post, index) => (
            <Reveal as="li" key={post.slug} delay={(index % 4) * 0.06}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-6 bg-background p-6 transition-colors hover:bg-muted sm:grid-cols-[14rem_1fr] sm:items-start sm:gap-8 lg:grid-cols-[18rem_1fr] lg:p-8"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-border">
                  <Image
                    src={post.cover}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 18rem, (min-width: 640px) 14rem, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    priority={index === 0}
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-widest text-muted-foreground">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.readingMinutes} min read</span>
                  </div>

                  <h2 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-foreground md:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="ml-auto inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary">
                      Read
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        &rarr;
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
