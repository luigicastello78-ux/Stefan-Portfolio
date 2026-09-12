import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { soraFonts } from "@/lib/og-fonts";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card. Generated at build, so nothing is fetched at request time.
 * Palette matches the site: hero background, near-white, vivid green.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
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
            position: "absolute",
            top: "72px",
            left: "72px",
            display: "flex",
            fontSize: "26px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#05e901",
          }}
        >
          Web, SEO and automation
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "104px",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "#f5f5f5",
            }}
          >
            Built in days
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "34px",
              color: "#999999",
            }}
          >
            Stefan Stankovski &middot; Web development, design and automation
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await soraFonts() }
  );
}
