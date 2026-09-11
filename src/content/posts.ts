import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

/**
 * Posts, read from `content/posts/*.md`.
 *
 * Those files are what Sveltia CMS writes: YAML frontmatter and a markdown
 * body. Publishing is a form in the admin, not a code change, which is the
 * whole point of moving off the previous setup. That one imported each post
 * as a module and needed a line adding to this file per post, which a CMS
 * cannot do.
 *
 * Server only. The directory is read once at build, because every blog
 * route is statically generated.
 */

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  tags: string[];
  /** Path under /public. 16:9. */
  cover: string;
  readingMinutes: number;
  /** Raw markdown, rendered by the post page. */
  body: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const WORDS_PER_MINUTE = 220;

function readingMinutes(body: string) {
  const prose = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_`>[\]()-]/g, " ");
  const words = prose.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/**
 * A CMS can save a half-filled entry, and a post with no title renders as a
 * blank row. Anything missing what the page needs is dropped with a warning
 * rather than shipped broken.
 */
function parse(file: string, raw: string): Post | null {
  const { data, content } = matter(raw);

  const str = (key: string) =>
    typeof data[key] === "string" ? (data[key] as string).trim() : "";

  const title = str("title");
  // gray-matter turns an unquoted YAML date into a Date object.
  const date =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : str("date");

  if (!title || !date) {
    console.warn(`[posts] ${file} is missing a title or date, skipping`);
    return null;
  }

  return {
    slug: file.replace(/\.md$/, ""),
    title,
    description: str("description"),
    date,
    tags: Array.isArray(data.tags)
      ? data.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
    cover: str("cover") || "/blog/default.webp",
    readingMinutes: readingMinutes(content),
    body: content,
  };
}

function load(): Post[] {
  let files: string[];

  try {
    files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  } catch {
    console.warn("[posts] content/posts is missing, the blog will be empty");
    return [];
  }

  return files
    .map((file) =>
      parse(file, fs.readFileSync(path.join(POSTS_DIR, file), "utf8"))
    )
    .filter((post): post is Post => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Newest first. */
export const posts: Post[] = load();

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
