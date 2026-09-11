"""
Generate the blog cover art.

    python scripts/blog-covers.py

Every cover is drawn from the post's slug, so the same slug always produces
the same image and a new post gets a cover without anyone opening a design
tool. Stock photography would say nothing about these posts, and a
photograph of a laptop says less than nothing.

The motif is the same one the hero and the work cards use: a dark field, the
brand green, and abstract lines of code. Each cover differs in glow
position, line rhythm and which lines are green, all seeded by the slug.

Writes 1600x900 WebP into public/blog. Run it again after adding a post.
"""

import hashlib
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1600, 900
BG = (20, 20, 20)
GREEN = (5, 233, 1)
FONT_BOLD = Path("src/assets/fonts/Sora-Bold.ttf")
FONT_REGULAR = Path("src/assets/fonts/Sora-Regular.ttf")
OUT_DIR = Path("public/blog")

# slug, label shown on the cover
POSTS = [
    ("what-vibe-coding-actually-is", "vibe coding"),
    ("how-an-ai-assisted-build-runs", "process"),
    ("what-ai-speeds-up-and-what-it-does-not", "ai"),
    ("what-a-good-brief-looks-like", "briefs"),
    ("own-your-own-accounts", "ownership"),
    ("the-automation-most-businesses-miss", "automation"),
    ("what-actually-takes-the-time", "estimates"),
    ("reviewing-ai-code", "review"),
]


def blend(base, colour, alpha):
    """Flat alpha blend. PIL has no paint-with-opacity for shapes."""
    return tuple(round(base[i] + (colour[i] - base[i]) * alpha) for i in range(3))


def radial(size, softness=1.0, gamma=1.0):
    """
    A soft round mask, white at the centre.

    `gamma` above 1 pushes the outer values towards zero faster, which is
    what stops a pasted glow showing the straight edge of its own square.
    """
    mask = Image.radial_gradient("L").resize(size, Image.LANCZOS)
    return mask.point(
        lambda v: max(0, int((((255 - v) / 255) ** gamma) * 255 * softness))
    )


def draw_cover(slug: str, label: str) -> Image.Image:
    seed = int(hashlib.sha256(slug.encode()).hexdigest()[:12], 16)
    rng = random.Random(seed)

    image = Image.new("RGB", (W, H), BG)

    # Glow, placed on the right half so it never sits under the text.
    glow_size = rng.randint(1150, 1500)
    glow = Image.new("RGB", (glow_size, glow_size), blend(BG, GREEN, 0.30))
    image.paste(
        glow,
        (rng.randint(W - 700, W - 320), rng.randint(-glow_size // 3, 60)),
        radial((glow_size, glow_size), gamma=2.2),
    )

    # Grid. Painted through a mask of the lines themselves, multiplied by a
    # radial falloff. Pasting a full grid layer instead would carry its own
    # background with it and wipe the glow out of the middle.
    lines = Image.new("L", (W, H), 0)
    ld = ImageDraw.Draw(lines)
    for x in range(0, W, 64):
        ld.line([(x, 0), (x, H)], fill=255)
    for y in range(0, H, 64):
        ld.line([(0, y), (W, y)], fill=255)

    falloff = radial((W, H), 0.6)
    grid_mask = Image.composite(falloff, Image.new("L", (W, H), 0), lines)
    image.paste(
        Image.new("RGB", (W, H), (245, 245, 245)),
        (0, 0),
        grid_mask.point(lambda v: int(v * 0.18)),
    )

    draw = ImageDraw.Draw(image)

    # Abstract lines of code. Indentation and length vary, a few are green,
    # and the occasional blank line gives it the rhythm of real source.
    x0, y = 96, 250
    indent_unit = 34
    indent = 0
    total_lines = 11

    # Pick the accent lines up front rather than rolling per line. Chance
    # alone gave some covers three greens in a row and others none at all.
    accents = set()
    while len(accents) < 2:
        candidate = rng.randrange(1, total_lines - 1)
        if all(abs(candidate - existing) > 1 for existing in accents):
            accents.add(candidate)
    for index in range(total_lines):
        if rng.random() < 0.12:
            y += 44
            continue

        indent = max(0, min(3, indent + rng.choice([-1, 0, 0, 1])))
        width = rng.randint(120, 620)
        accent = index in accents
        colour = blend(BG, GREEN, 0.9) if accent else blend(BG, (245, 245, 245), 0.30)
        left = x0 + indent * indent_unit
        draw.rounded_rectangle([left, y, left + width, y + 12], radius=6, fill=colour)

        # A second token on the same line, sometimes.
        if rng.random() < 0.45:
            gap = rng.randint(18, 40)
            second = rng.randint(60, 220)
            draw.rounded_rectangle(
                [left + width + gap, y, left + width + gap + second, y + 12],
                radius=6,
                fill=blend(BG, (245, 245, 245), 0.18),
            )

        y += 44

    # Prompt mark, top left.
    draw.text((96, 150), "$", font=ImageFont.truetype(str(FONT_BOLD), 56), fill=GREEN)

    # Label, bottom left, under a short rule.
    draw.rectangle([96, H - 150, 152, H - 147], fill=GREEN)
    draw.text(
        (96, H - 122),
        label.upper(),
        font=ImageFont.truetype(str(FONT_REGULAR), 26),
        fill=blend(BG, (245, 245, 245), 0.75),
    )

    # Top edge, the same accent the share cards carry.
    draw.rectangle([0, 0, W, 6], fill=GREEN)

    return image


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for slug, label in POSTS:
        path = OUT_DIR / f"{slug}.webp"
        draw_cover(slug, label).save(path, "WEBP", quality=88, method=6)
        print(f"{path} — {W}x{H}")


if __name__ == "__main__":
    main()
