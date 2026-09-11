/**
 * Capture a project screenshot for the work section.
 *
 *   node scripts/capture.mjs <url> <public/work/name.webp> [width] [height]
 *
 * Defaults to 1600 by 1000, which is the 16:10 the cards crop to.
 *
 * Two things it handles that a plain `chrome --screenshot` does not:
 *
 *  - Cookie bars and consent dialogs are hidden, not answered. Nothing is
 *    accepted or rejected on anyone's behalf; the elements are set to
 *    display none so they do not sit on top of the hero.
 *  - Marketing modals that appear on a timer are dismissed the same way.
 *
 * It also waits for fonts and for the network to settle, because a hero
 * caught mid-load is worse than no screenshot.
 */
import { existsSync, writeFileSync } from "node:fs";
import puppeteer from "puppeteer-core";

const CHROME_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
];

/** Anything that overlays the page and is not part of the design. */
const OVERLAY_HINTS = [
  "cookie",
  "consent",
  "gdpr",
  "privacy-banner",
  "modal",
  "popup",
  "overlay",
  "dialog",
  "newsletter",
];

const [, , url, out, rawWidth, rawHeight] = process.argv;

if (!url || !out) {
  console.error(
    "usage: node scripts/capture.mjs <url> <public/work/name.webp> [width] [height]"
  );
  process.exit(1);
}

const width = Number(rawWidth) || 1600;
const height = Number(rawHeight) || 1000;

const executablePath = CHROME_CANDIDATES.find((candidate) =>
  existsSync(candidate)
);

if (!executablePath) {
  console.error("No Chrome or Edge found. Add its path to CHROME_CANDIDATES.");
  process.exit(1);
}

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--hide-scrollbars", "--disable-gpu", "--no-sandbox"],
  defaultViewport: { width, height, deviceScaleFactor: 1 },
});

try {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60_000 });
  await page.evaluate(() => document.fonts?.ready);

  // Let timed overlays show themselves, then take them all out at once.
  await new Promise((resolve) => setTimeout(resolve, 4000));

  const hidden = await page.evaluate((hints) => {
    let count = 0;

    for (const el of document.querySelectorAll("body *")) {
      const style = getComputedStyle(el);
      if (style.position !== "fixed" && style.position !== "sticky") continue;

      const rect = el.getBoundingClientRect();
      if (rect.width < 120 || rect.height < 40) continue;

      // A sticky header is part of the design. Anything else pinned over
      // the page, and matching a known overlay word, is not.
      const atTop = rect.top <= 8;
      const text = `${el.id} ${el.className} ${el.getAttribute("aria-label") ?? ""}`.toLowerCase();
      const looksLikeOverlay = hints.some((hint) => text.includes(hint));

      if (!atTop && looksLikeOverlay) {
        el.style.setProperty("display", "none", "important");
        count += 1;
      }
    }

    // Backdrops blur or dim the page even once their dialog is gone.
    for (const el of document.querySelectorAll("body *")) {
      const style = getComputedStyle(el);
      if (style.position === "fixed" && style.backdropFilter !== "none") {
        el.style.setProperty("display", "none", "important");
        count += 1;
      }
    }

    return count;
  }, OVERLAY_HINTS);

  await new Promise((resolve) => setTimeout(resolve, 600));

  const buffer = await page.screenshot({ type: "webp", quality: 86 });
  writeFileSync(out, buffer);

  console.log(`${out} — ${width}x${height}, ${hidden} overlay(s) hidden`);
} finally {
  await browser.close();
}
