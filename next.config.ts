import type { NextConfig } from "next";

import { legacyRedirects } from "./src/config/redirects";

const nextConfig: NextConfig = {
  // Pinned so Turbopack does not walk up and pick a lockfile outside the repo.
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return legacyRedirects;
  },
  async rewrites() {
    // Next serves files in /public verbatim and does not resolve directory
    // indexes, so /admin would 404 and only /admin/index.html would work.
    return [
      { source: "/admin", destination: "/admin/index.html" },
      { source: "/admin/", destination: "/admin/index.html" },
    ];
  },
};

export default nextConfig;
