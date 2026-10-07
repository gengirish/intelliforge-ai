#!/usr/bin/env python3
"""
Generate the IntelliForge AI brand / sponsor asset pack into public/branding/.

    python scripts/build-brand-assets.py

Everything is derived from the canonical palette in app/globals.css and the
navbar wordmark ("Intelli" + "Forge" in amber + " AI"), so the pack cannot
drift from the site. The display font is Plus Jakarta Sans (same as
--font-display); it is downloaded to a temp dir on first run and is not
committed.

SVG wordmarks are emitted as outlined paths (via fontTools), so printers do
not need the font installed. PNGs are transparent except the banner/social
tiles, which are intentionally on the navy brand background.

Requires: pillow, numpy, fonttools.
"""
from __future__ import annotations

import os
import tempfile
import urllib.request
from pathlib import Path

import numpy as np
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "branding"

FONT_URL = (
    "https://github.com/google/fonts/raw/main/ofl/plusjakartasans/"
    "PlusJakartaSans%5Bwght%5D.ttf"
)
FONT_PATH = Path(tempfile.gettempdir()) / "PlusJakartaSans-var.ttf"

# Canonical palette — app/globals.css
INDIGO = "#6366f1"
VIOLET = "#8b5cf6"
NAVY = "#0a0b1e"
WHITE = "#ffffff"
FORGE_DARK_BG = "#f59e0b"  # --tone-forge on the dark theme
FORGE_LIGHT_BG = "#b45309"  # --tone-forge on the light theme
MUTED_ON_DARK = "#94a3b8"

# lucide "zap" — the navbar/app-icon motif, in a 24x24 box
BOLT = [(13, 2), (3, 14), (12, 14), (11, 22), (21, 10), (12, 10), (13, 2)]

WORDMARK = [("Intelli", "ink"), ("Forge", "forge"), (" AI", "ink")]
TAGLINE = "AI Agents · Workflow Automation · AI Apps"
URL = "www.intelliforge.tech"


def hex_to_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


def ensure_font() -> Path:
    if not FONT_PATH.exists():
        print(f"downloading Plus Jakarta Sans -> {FONT_PATH}")
        urllib.request.urlretrieve(FONT_URL, FONT_PATH)
    return FONT_PATH


def pil_font(size: int, weight: str = "Bold") -> ImageFont.FreeTypeFont:
    font = ImageFont.truetype(str(ensure_font()), size)
    font.set_variation_by_name(weight)
    return font


# --------------------------------------------------------------------------- #
# the mark: rounded square, indigo->violet diagonal gradient, white bolt
# --------------------------------------------------------------------------- #
def gradient_square(size: int) -> Image.Image:
    start, end = np.array(hex_to_rgb(INDIGO)), np.array(hex_to_rgb(VIOLET))
    # 135deg: interpolate along (x + y), matching linear-gradient(135deg, ...)
    xs = np.linspace(0, 1, size)
    t = (xs[None, :] + xs[:, None]) / 2
    rgb = start[None, None, :] + (end - start)[None, None, :] * t[:, :, None]
    return Image.fromarray(rgb.round().astype("uint8"), "RGB")


def draw_mark(size: int) -> Image.Image:
    grad = gradient_square(size).convert("RGBA")

    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, size - 1, size - 1), radius=round(size * 0.25), fill=255
    )
    mark = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    mark.paste(grad, (0, 0), mask)

    # bolt, centred, ~46% of the tile
    scale = size * 0.46 / 24
    offset = size / 2 - 12 * scale
    pts = [(x * scale + offset, y * scale + offset) for x, y in BOLT]
    ImageDraw.Draw(mark).polygon(pts, fill=hex_to_rgb(WHITE) + (255,))
    return mark


# --------------------------------------------------------------------------- #
# horizontal lockup: mark + wordmark
# --------------------------------------------------------------------------- #
def draw_lockup(height: int, on_dark: bool) -> Image.Image:
    mark_size = height
    # 0.52 keeps the "g" descender inside the tile once the cap height is
    # optically centred against the mark.
    text_size = round(height * 0.52)
    gap = round(height * 0.26)
    pad = round(height * 0.08)

    font = pil_font(text_size)
    ink = WHITE if on_dark else NAVY
    forge = FORGE_DARK_BG if on_dark else FORGE_LIGHT_BG
    colors = {"ink": ink, "forge": forge}

    probe = Image.new("RGBA", (10, 10))
    pd = ImageDraw.Draw(probe)
    widths = [pd.textlength(text, font=font) for text, _ in WORDMARK]
    text_w = sum(widths)

    width = round(pad + mark_size + gap + text_w + pad)
    canvas = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    canvas.alpha_composite(draw_mark(mark_size), (pad - pad, 0))

    draw = ImageDraw.Draw(canvas)
    # Optical centring: put the cap-height band of the wordmark on the tile's
    # centre line, then draw from the baseline so descenders stay inside.
    cap_top, cap_bottom = font.getbbox("H")[1], font.getbbox("H")[3]
    cap_height = cap_bottom - cap_top
    baseline = round((height + cap_height) / 2)
    x = mark_size + gap
    for (text, role), w in zip(WORDMARK, widths):
        draw.text((x, baseline), text, font=font, fill=hex_to_rgb(colors[role]),
                  anchor="ls")
        x += w
    return canvas


# --------------------------------------------------------------------------- #
# SVG (outlined text — no font needed downstream)
# --------------------------------------------------------------------------- #
def outlined_wordmark(px: int) -> tuple[str, float, float]:
    """Return (svg path markup, width, height) for the wordmark at `px` em size."""
    font = TTFont(str(ensure_font()))
    font = instantiateVariableFont(font, {"wght": 700})
    upem = font["head"].unitsPerEm
    glyphs = font.getGlyphSet()
    cmap = font.getBestCmap()
    scale = px / upem

    parts: list[str] = []
    x = 0.0
    for text, role in WORDMARK:
        d_chunks: list[str] = []
        for char in text:
            name = cmap.get(ord(char))
            if name is None:
                continue
            pen = SVGPathPen(glyphs)
            glyphs[name].draw(pen)
            path = pen.getCommands()
            if path:
                d_chunks.append(
                    f'<path transform="translate({x:.2f} 0)" d="{path}"/>'
                )
            x += glyphs[name].width
        if d_chunks:
            parts.append((role, "".join(d_chunks)))
    width = x * scale
    ascender = font["hhea"].ascender * scale
    descender = font["hhea"].descender * scale
    return parts, width, ascender, descender, scale


def write_lockup_svg(path: Path, on_dark: bool) -> None:
    em = 620  # wordmark em size against a 1000px mark
    mark = 1000
    gap = 300
    parts, text_w, ascender, descender, scale = outlined_wordmark(em)

    ink = WHITE if on_dark else NAVY
    forge = FORGE_DARK_BG if on_dark else FORGE_LIGHT_BG
    colors = {"ink": ink, "forge": forge}

    cap_mid = (ascender + descender) / 2
    baseline_y = mark / 2 + cap_mid
    text_x = mark + gap
    width = round(text_x + text_w)

    groups = "\n    ".join(
        f'<g fill="{colors[role]}" transform="translate({text_x:.2f} {baseline_y:.2f}) '
        f'scale({scale:.6f} {-scale:.6f})">{d}</g>'
        for role, d in parts
    )

    bolt = " ".join(f"{x * (mark * 0.46 / 24) + (mark / 2 - 12 * mark * 0.46 / 24):.2f},"
                    f"{y * (mark * 0.46 / 24) + (mark / 2 - 12 * mark * 0.46 / 24):.2f}"
                    for x, y in BOLT)

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {mark}" width="{width}" height="{mark}" role="img" aria-label="IntelliForge AI">
  <title>IntelliForge AI</title>
  <defs>
    <linearGradient id="ifg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop stop-color="{INDIGO}"/>
      <stop offset="100%" stop-color="{VIOLET}"/>
    </linearGradient>
  </defs>
  <rect width="{mark}" height="{mark}" rx="{round(mark * 0.25)}" fill="url(#ifg)"/>
  <polygon points="{bolt}" fill="{WHITE}"/>
    {groups}
</svg>
"""
    path.write_text(svg, encoding="utf-8")


def write_mark_svg(path: Path) -> None:
    size = 512
    s = size * 0.46 / 24
    off = size / 2 - 12 * s
    pts = " ".join(f"{x * s + off:.2f},{y * s + off:.2f}" for x, y in BOLT)
    path.write_text(
        f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}" role="img" aria-label="IntelliForge AI">
  <title>IntelliForge AI</title>
  <defs>
    <linearGradient id="ifg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop stop-color="{INDIGO}"/>
      <stop offset="100%" stop-color="{VIOLET}"/>
    </linearGradient>
  </defs>
  <rect width="{size}" height="{size}" rx="{round(size * 0.25)}" fill="url(#ifg)"/>
  <polygon points="{pts}" fill="{WHITE}"/>
</svg>
""",
        encoding="utf-8",
    )


# --------------------------------------------------------------------------- #
# banner + social tile (on-brand navy background)
# --------------------------------------------------------------------------- #
def glow(canvas: Image.Image, center: tuple[int, int], radius: int, color: str,
         alpha: float) -> None:
    w = h = radius * 2
    ys, xs = np.mgrid[0:h, 0:w]
    dist = np.sqrt((xs - radius) ** 2 + (ys - radius) ** 2) / radius
    a = np.clip(1 - dist, 0, 1) ** 2 * (alpha * 255)
    rgb = np.array(hex_to_rgb(color))
    layer = np.dstack(
        [np.full((h, w), rgb[0]), np.full((h, w), rgb[1]), np.full((h, w), rgb[2]), a]
    ).astype("uint8")
    canvas.alpha_composite(
        Image.fromarray(layer, "RGBA"), (center[0] - radius, center[1] - radius)
    )


def fit_font(text: str, max_width: int, start_size: int, weight: str) -> ImageFont.FreeTypeFont:
    """Largest font size at or below `start_size` whose `text` fits `max_width`."""
    probe = ImageDraw.Draw(Image.new("RGBA", (10, 10)))
    size = start_size
    while size > 8:
        font = pil_font(size, weight)
        if probe.textlength(text, font=font) <= max_width:
            return font
        size -= 2
    return pil_font(size, weight)


def draw_banner(width: int, height: int, centered: bool = False) -> Image.Image:
    canvas = Image.new("RGBA", (width, height), hex_to_rgb(NAVY) + (255,))
    glow(canvas, (round(width * 0.82), round(height * 0.12)),
         round(min(width, height) * 0.55), INDIGO, 0.3)
    glow(canvas, (round(width * 0.1), round(height * 0.95)),
         round(min(width, height) * 0.45), VIOLET, 0.22)

    margin = round(width * 0.07)
    inner = width - 2 * margin

    lockup_h = round(height * (0.18 if not centered else 0.16))
    lockup = draw_lockup(lockup_h, on_dark=True)
    if lockup.width > inner:  # narrow canvases (e.g. the square tile)
        lockup_h = round(lockup_h * inner / lockup.width)
        lockup = draw_lockup(lockup_h, on_dark=True)

    tag_font = fit_font(TAGLINE, inner, round(height * (0.055 if not centered else 0.05)),
                        "SemiBold")
    url_font = fit_font(URL, inner, round(height * (0.042 if not centered else 0.04)),
                        "Medium")
    draw = ImageDraw.Draw(canvas)

    if centered:
        x = (width - lockup.width) // 2
        y = round(height * 0.3)
        canvas.alpha_composite(lockup, (x, y))
        ty = y + lockup.height + round(height * 0.08)
        tw = draw.textlength(TAGLINE, font=tag_font)
        draw.text(((width - tw) / 2, ty), TAGLINE, font=tag_font,
                  fill=hex_to_rgb(FORGE_DARK_BG))
        uw = draw.textlength(URL, font=url_font)
        draw.text(((width - uw) / 2, ty + round(height * 0.09)), URL, font=url_font,
                  fill=hex_to_rgb(MUTED_ON_DARK))
    else:
        x = round(width * 0.07)
        y = round(height * 0.3)
        canvas.alpha_composite(lockup, (x, y))
        ty = y + lockup.height + round(height * 0.07)
        draw.text((x, ty), TAGLINE, font=tag_font, fill=hex_to_rgb(FORGE_DARK_BG))
        draw.text((x, ty + round(height * 0.11)), URL, font=url_font,
                  fill=hex_to_rgb(MUTED_ON_DARK))

    # forge-amber baseline rule, as on the site's OG image
    bar = round(height * 0.012)
    ImageDraw.Draw(canvas).rectangle(
        (0, height - bar, width, height), fill=hex_to_rgb(FORGE_DARK_BG)
    )
    return canvas


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    written: list[tuple[str, str]] = []

    def save(img: Image.Image, name: str, note: str) -> None:
        img.save(OUT / name)
        written.append((name, f"{img.width}x{img.height} — {note}"))

    # vector
    write_mark_svg(OUT / "intelliforge-mark.svg")
    written.append(("intelliforge-mark.svg", "vector — square mark"))
    write_lockup_svg(OUT / "intelliforge-logo-horizontal-light-bg.svg", on_dark=False)
    written.append(
        ("intelliforge-logo-horizontal-light-bg.svg", "vector — for white/light backgrounds")
    )
    write_lockup_svg(OUT / "intelliforge-logo-horizontal-dark-bg.svg", on_dark=True)
    written.append(
        ("intelliforge-logo-horizontal-dark-bg.svg", "vector — for dark backgrounds")
    )

    # raster marks (transparent)
    for size in (512, 1024, 2048):
        save(draw_mark(size), f"intelliforge-mark-{size}.png", "transparent square mark")

    # raster lockups (transparent)
    for height, label in ((256, "web"), (512, "large web"), (1024, "print, 300 DPI")):
        save(
            draw_lockup(height, on_dark=False),
            f"intelliforge-logo-horizontal-light-bg-{height}.png",
            f"transparent, dark text for white backgrounds ({label})",
        )
        save(
            draw_lockup(height, on_dark=True),
            f"intelliforge-logo-horizontal-dark-bg-{height}.png",
            f"transparent, white text for dark backgrounds ({label})",
        )

    # banners / tiles
    save(draw_banner(1920, 1080), "intelliforge-banner-1920x1080.png",
         "slide / screen banner")
    save(draw_banner(1200, 630), "intelliforge-banner-1200x630.png",
         "social & web share banner")
    save(draw_banner(1080, 1080, centered=True), "intelliforge-social-square-1080.png",
         "square social / sponsor tile")

    print(f"\nwrote {len(written)} files to {OUT.relative_to(ROOT)}/")
    for name, note in written:
        print(f"  {name:<52} {note}")


if __name__ == "__main__":
    main()
