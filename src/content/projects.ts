import fs from "node:fs";
import path from "node:path";

/**
 * Projects, read from `content/projects/*.json`.
 *
 * Those files are what Sveltia CMS writes. Adding a project is a form in
 * the admin, not a code change, so nothing here should ever need editing
 * to publish work.
 *
 * Server only. The directory is read once at build, because every route
 * that uses it is statically generated.
 *
 * Cards are not links: the owner asked for the address as plain text, so
 * there is no `href` in the model at all.
 */

export type Project = {
  slug: string;
  name: string;
  /** Host only, no scheme. Shown in the address bar, never linked. */
  domain: string;
  caption: string;
  tags: string[];
  /** Path under /public. 16:10 reads best in the card. */
  image: string;
  /** Ascending. Ties fall back to the name. */
  order: number;
  /** Featured projects lead the homepage. Everything shows on /work. */
  featured: boolean;
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

/**
 * A CMS can write a half-filled record, and a missing image renders as a
 * hole in the page. Anything without the fields a card needs is dropped
 * with a warning rather than shipped broken.
 */
function parse(file: string, raw: string): Project | null {
  let data: Record<string, unknown>;

  try {
    data = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    console.warn(`[projects] ${file} is not valid JSON, skipping`);
    return null;
  }

  const str = (key: string) =>
    typeof data[key] === "string" ? (data[key] as string).trim() : "";

  const name = str("name");
  const domain = str("domain");
  const image = str("image");

  if (!name || !domain || !image) {
    console.warn(
      `[projects] ${file} is missing a name, domain or image, skipping`
    );
    return null;
  }

  return {
    slug: file.replace(/\.json$/, ""),
    name,
    domain,
    caption: str("caption"),
    tags: Array.isArray(data.tags)
      ? data.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
    image,
    order: typeof data.order === "number" ? data.order : 100,
    featured: data.featured !== false,
  };
}

function load(): Project[] {
  let files: string[];

  try {
    files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    console.warn("[projects] content/projects is missing, no work will show");
    return [];
  }

  return files
    .map((file) => parse(file, fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8")))
    .filter((project): project is Project => project !== null)
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

export const projects: Project[] = load();

/** What the homepage leads with. */
export const featuredProjects: Project[] = projects.filter(
  (project) => project.featured
);
