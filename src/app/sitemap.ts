import type { MetadataRoute } from "next";

import { posts } from "@/content/posts";
import { siteConfig } from "@/config/site";

const pages = [
  { path: "", priority: 1, changeFrequency: "monthly" as const },
  { path: "/work", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/process", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...pages.map((page) => ({
      url: `${siteConfig.url}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(`${post.date}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
