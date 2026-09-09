import { ImageResponse } from "next/og";

import { getPost, posts } from "@/content/posts";
import { siteConfig } from "@/config/site";
import { soraFonts } from "@/lib/og-fonts";

export const alt = "Post on stefanstankovski.com";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

/** Per-post share card, generated at build alongside the page. */
export default async function PostOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? siteConfig.name;
  const readingTime = post ? `${post.readingMinutes} min read` : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#141414",
          padding: "72px",
          position: "relative",
          fontFamily: "Sora",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            backgroundColor: "#05e901",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: "26px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#05e901",
          }}
        >
          Blog
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 44 ? "68px" : "84px",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "#f5f5f5",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "28px",
            color: "#999999",
          }}
        >
          <span>{siteConfig.name}</span>
          <span>{readingTime}</span>
        </div>
      </div>
    ),
    { ...size, fonts: await soraFonts() }
  );
}
