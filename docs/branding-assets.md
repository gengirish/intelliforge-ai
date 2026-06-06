# IntelliForge AI — branding & icon checklist

This document lists **digital assets** the site expects, **pixel sizes**, and **where files live**. Replace interim marks (`app/icon.svg`, `public/logo.svg`) when a designer delivers the final identity.

## Design skill note

Final **logo, app icon, and illustration** should come from a human-led brand pass (shape, spacing, trademark). The repo ships an **interim** favicon/mark that matches the **existing** navbar motif (indigo → violet gradient + bolt) so tabs and schema are not broken.

## Canonical palette (from `app/globals.css`)

| Token   | Hex       | Use                          |
|---------|-----------|------------------------------|
| Indigo  | `#6366f1` | Gradient start, primary glow |
| Violet  | `#8b5cf6` | Gradient end                 |
| Cyan    | `#06b6d4` | Accent (wordmark “Forge”)    |
| Navy bg | `#0a0b1e` | Page background              |

## Required files (current wiring)

| Asset              | Spec / notes                                      | Path / convention        |
|--------------------|---------------------------------------------------|---------------------------|
| Favicon (browser)  | **PNG** (Chrome ignores SVG favicons); **also** `/favicon.ico` → `/icon` rewrite so hosts do not serve a default triangle | `app/icon.tsx` (`ImageResponse`) + `next.config.ts` rewrite |
| Default logo URL   | **≥ 112×112** for Google rich results (SVG OK)  | `public/logo.svg` → `https://www.intelliforge.tech/logo.svg` |
| Apple touch icon   | **180×180** PNG (iOS home screen)                 | `app/apple-icon.png` (add when ready) |
| Open Graph image   | **1200×630** PNG or JPG; keep key art in center safe zone | Set `openGraph.images` + `twitter.images` in `app/layout.tsx` when file exists (e.g. `public/og/default.png`) |
| PWA (optional)     | `192×192`, `512×512` masks                        | `public/` + manifest if you add a PWA |

## JSON-LD / SEO

`components/json-ld.tsx` uses `SITE_URL + /logo.svg` for `Organization` `logo` / `image`. After swapping to PNG, update those strings to match (e.g. `/logo.png`).

## Designer handoff (one paragraph brief)

**IntelliForge AI** — B2B AI agency (agents, workflows, apps). Hyderabad, global. Tone: capable, fast, technical warmth. **Existing UI anchor:** rounded-square mark, indigo→violet gradient, lightning motif, dark navy shell. Deliver: master logo (light + dark), **favicon** (16/32), **180 Apple**, **OG 1200×630**, optional wordmark lockups for email and decks. Export SVG + PNG where noted.

## After new files land

1. Replace `app/icon.tsx` with a generated or static `app/icon.png` / `app/favicon.ico`, and remove the `favicon.ico` rewrite if you ship a real `.ico` file.
2. Replace `public/logo.svg` (or add `public/logo.png` and update `json-ld.tsx`).
3. Add `app/apple-icon.png` (180×180).
4. Add OG image and extend `metadata` in `app/layout.tsx` with `openGraph.images` and `twitter.images`.
