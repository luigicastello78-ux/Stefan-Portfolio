import fs from "node:fs/promises";
import path from "node:path";

/**
 * Sora for the share cards.
 *
 * The font files are committed rather than fetched from Google at build
 * time, so a build never depends on the network being reachable. They are
 * only read by the opengraph-image routes, which run at build.
 */
const FONT_DIR = path.join(process.cwd(), "src", "assets", "fonts");

export async function soraFonts() {
  const [bold, regular] = await Promise.all([
    fs.readFile(path.join(FONT_DIR, "Sora-Bold.ttf")),
    fs.readFile(path.join(FONT_DIR, "Sora-Regular.ttf")),
  ]);

  return [
    { name: "Sora", data: bold, weight: 700 as const, style: "normal" as const },
    {
      name: "Sora",
      data: regular,
      weight: 400 as const,
      style: "normal" as const,
    },
  ];
}
