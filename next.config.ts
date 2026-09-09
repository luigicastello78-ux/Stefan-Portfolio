import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pinned so Turbopack does not walk up and pick a lockfile outside the repo.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
