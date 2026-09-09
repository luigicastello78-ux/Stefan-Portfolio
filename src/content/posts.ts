import fs from "node:fs";
import path from "node:path";

import VibeCoding, {
  meta as vibeCodingMeta,
} from "./posts/what-vibe-coding-actually-is.mdx";
import BuildRuns, {
  meta as buildRunsMeta,
} from "./posts/how-an-ai-assisted-build-runs.mdx";
import SpeedsUp, {
  meta as speedsUpMeta,
} from "./posts/what-ai-speeds-up-and-what-it-does-not.mdx";

/**
 * Post registry. PRD section 8.8.
 *
 * Server only. It reads the source files from disk to count words, which
 * happens once at build time because every blog route is static.
 *
 * Metadata lives in each .mdx file so there is one source of truth. With
 * three posts the index route bundles all three bodies, which is a few
 * kilobytes. Move to a manifest if this ever reaches a few dozen.
 */

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingMinutes: number;
  Content: (props: Record<string, unknown>) => React.JSX.Element;
};

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");
const WORDS_PER_MINUTE = 220;

function readingMinutes(slug: string) {
  try {
    const source = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf8");
    // Drop the meta export and any markup before counting.
    const prose = source
      .replace(/export const meta[\s\S]*?};/, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/[#*_`>[\]()-]/g, " ");
    const words = prose.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  } catch {
    return 1;
  }
}

const entries = [
  { slug: "what-vibe-coding-actually-is", meta: vibeCodingMeta, Content: VibeCoding },
  { slug: "how-an-ai-assisted-build-runs", meta: buildRunsMeta, Content: BuildRuns },
  {
    slug: "what-ai-speeds-up-and-what-it-does-not",
    meta: speedsUpMeta,
    Content: SpeedsUp,
  },
];

/** Newest first. */
export const posts: Post[] = entries
  .map(({ slug, meta, Content }) => ({
    slug,
    ...meta,
    readingMinutes: readingMinutes(slug),
    Content,
  }))
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
