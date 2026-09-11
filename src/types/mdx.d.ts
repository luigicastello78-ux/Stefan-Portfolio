/**
 * Every post exports a `meta` object. @types/mdx declares the default export
 * for "*.mdx"; this augments the same ambient module with the named one, so
 * post metadata is typed at the import site.
 */
declare module "*.mdx" {
  export const meta: {
    title: string;
    description: string;
    /** ISO date, YYYY-MM-DD. */
    date: string;
    tags: string[];
    /** Path under /public. 16:9. */
    cover: string;
  };
}
