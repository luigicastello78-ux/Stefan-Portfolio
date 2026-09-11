import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing here is secret. It is just not a page worth indexing.
      disallow: ["/api/", "/admin"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
