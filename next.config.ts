import createMDX from "@next/mdx";
import type { NextConfig } from "next";

import { legacyRedirects } from "./src/config/redirects";

const nextConfig: NextConfig = {
  // Posts are .mdx files. Everything else stays .tsx.
  pageExtensions: ["ts", "tsx", "mdx"],
  // Pinned so Turbopack does not walk up and pick a lockfile outside the repo.
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return legacyRedirects;
  },
};

// No remark or rehype plugins. Frontmatter lives in an exported `meta`
// object inside each post, which is plain ESM and needs no plugin at all.
const withMDX = createMDX({});

export default withMDX(nextConfig);
