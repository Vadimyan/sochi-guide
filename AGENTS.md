# AGENTS.md

Guidance for AI agents (Claude Code, Copilot, Cursor, etc.) working in this repository.

## What this project is

A personal, opinionated travel guide to Sochi, Krasnaya Polyana, and Sirius/Adler (Imeretinskaya bay), written in Russian by a local. It is a fully static website built with Next.js and deployed to GitHub Pages at **https://vadimyan.github.io/sochi-guide/**.

There is no backend, no database, and no CMS. All content lives in YAML files under `data/`, all photos under `public/images/`. The site is regenerated from these files on every deploy.

## Commands

```bash
npm run dev      # dev server — site is at http://localhost:3000/sochi-guide (note the basePath!)
npm run build    # static export to ./out (this is what gets deployed)
npm run lint     # next lint (eslint-config-next)
```

- There are **no tests** in this project. Verification = `npm run build` succeeding + visual check.
- `http://localhost:3000/` returns 404 in dev; always open `/sochi-guide/...`.
- **Known dev quirk:** place photos 404 in `npm run dev`. `src/lib/basePath.ts` prefixes image paths with `/sochi-guide` only when `NODE_ENV === 'production'`, while the dev server serves `public/` under the basePath. This is accepted behavior — photos work in the production build. To truly verify images, run `npm run build` and serve `out/` (e.g. `npx serve out` and open `/sochi-guide` — actually serve `out` at the `/sochi-guide` prefix to mimic GitHub Pages).
- `.next/` and `out/` are gitignored build artifacts; never edit them.

## Architecture (big picture)

```
data/*.yaml ──build-time──▶ src/lib/data.ts ──▶ App Router pages ──▶ static HTML in out/
public/images, public/maps ──────────────────────────────────────▶ copied into out/
```

- **Next.js 14, App Router, TypeScript (strict), Tailwind CSS 3.** `output: 'export'` in `next.config.js` — everything must be statically renderable (no server runtime, no API routes, `images.unoptimized: true`).
- **Routing:** exactly two page types.
  - `src/app/page.tsx` — homepage: hero, an auto-rotating `ImageCarousel` fed by *all* place photos (shuffled, `src/lib/images.ts`), and four region cards (hardcoded `regions` array in this file).
  - `src/app/[slug]/page.tsx` — one template for all four region pages; slugs come from `generateStaticParams` → `getAllPageSlugs()`.
- **Data loading** (`src/lib/data.ts`, server-side only, uses `fs` + `js-yaml`):
  - `data/pages.yaml` — per-region page metadata (title, icon, intro, map screenshots, optional `geography` block, Yandex Maps collection URL).
  - `data/<region>/*.yaml` — one file per content section (restaurants, entertainment, wellness, parks, destinations). Each file = one `Section` with a list of `Place`s.
  - Section order on a page is **not** alphabetical — it is hardcoded in `REGION_FILE_ORDER` in `src/lib/data.ts` (mirrors the original Notion document order).
- **Types** are in `src/lib/types.ts` (`Place`, `Section`, `Page`). Keep YAML in sync with these interfaces; a mismatch fails the build or renders blanks.
- **Components** (`src/components/`):
  - `region/PlaceSection.tsx` — renders a section; background color is picked deterministically from the section `id` hash.
  - `place/PlaceDetail.tsx` — renders one place: name (linked to first Yandex Maps URL), ⭐ for `featured: true`, description, photo grid, Yandex Maps link(s).
  - `ui/ImageWithFallback.tsx` — client component; on image load error shows a 📸 placeholder instead of a broken image. Use it for any content photo.
  - `layout/Navigation.tsx`, `layout/Footer.tsx`, `layout/Breadcrumbs.tsx`, `home/ImageCarousel.tsx`.

## Content model (the part you will edit most often)

### Section file (`data/<region>/<section>.yaml`)

```yaml
section:
  id: kp-restaurants            # unique; also drives the section background color
  title: Где точно нужно поесть
  description: Лучшие места для завтраков, обедов и ужинов в Красной Поляне

places:
  - id: moms                    # kebab-case; photo filenames derive from it
    name: Кафе Мамс
    longDescription: |
      Первый абзац.

      Второй абзац — абзацы разделяются пустой строкой.
    photos:
      - /images/krasnaya-polyana/moms-1.jpg   # path WITHOUT the /sochi-guide basePath
    yandexMapsUrl: https://yandex.ru/maps/...  # string OR a list of URLs (multiple locations)
    featured: true              # optional; renders a ⭐ next to the name
```

Rendering rules to know:
- `longDescription` is **plain text**, split into `<p>` on blank lines (`\n\n`). Markdown is NOT rendered — don't use `**bold**`, links, or lists in it.
- `yandexMapsUrl` accepts a single URL or a YAML list; with a list, the place name links to the first URL and all are listed as "Адрес 1, Адрес 2…".
- `photos` is required by the type but may reference images that don't exist yet — `ImageWithFallback` degrades gracefully. Still, prefer adding the actual file.
- Many descriptions intentionally contain two similar paragraphs (short take + longer take from the original Notion doc). That's the established style, not an accident.

### Page metadata (`data/pages.yaml`)

Per region: `id`, `slug`, `title`, `icon` (emoji), `intro` (folded text shown in a gray card), `mapImages` (screenshots from `/maps/...`), optional `geography` (rendered as a "Где остановиться" card), `yandexMapsCollectionUrl` (button linking to a public Yandex Maps bookmarks collection — currently the same collection for all regions).

### Checklist: add a place

1. Add the entry to the right `data/<region>/<section>.yaml`, following the existing tone (see "Content language and tone").
2. Put the photo at `public/images/<region>/<place-id>-1.jpg` (more photos: `-2`, `-3`, …). JPEG, reasonable size (existing ones are ~85-quality JPEGs).
3. Reference it in `photos:` as `/images/<region>/<file>.jpg`.
4. Optionally update `public/images/IMAGES_MANIFEST.md` (a human-maintained inventory of expected images — informational only, nothing reads it programmatically).
5. `npm run build` to verify.

### Checklist: add a new section to an existing region

1. Create `data/<region>/<name>.yaml` with the `section:` + `places:` structure.
2. Add the filename to `REGION_FILE_ORDER` in `src/lib/data.ts` in the desired position — **otherwise the file is silently ignored**.

### Checklist: add a whole new region

A new region must be registered in **six** places (all hardcoded):
1. `data/<new-region>/` directory with section YAMLs.
2. An entry in `data/pages.yaml`.
3. `REGION_FILE_ORDER` in `src/lib/data.ts`.
4. `regionMap` inside `loadPage()` in `src/lib/data.ts`.
5. `getAllPageSlugs()` in `src/lib/data.ts` (drives `generateStaticParams`, i.e. which pages get built).
6. `navItems` in `src/components/layout/Navigation.tsx` **and** the `regions` card array in `src/app/page.tsx`.

Plus `public/images/<new-region>/` for photos and map screenshots in `public/maps/`.

## Images and the basePath trap

This is the most common source of bugs in this repo (see git history: several "fix image paths" commits).

- The site is hosted at `https://vadimyan.github.io/sochi-guide/`, so `next.config.js` sets `basePath: '/sochi-guide'`.
- Next.js `<Link>` handles the basePath automatically. **`next/image` `src` does NOT.**
- Therefore every image `src` must go through `getImagePath()` from `src/lib/basePath.ts` (or through `ImageWithFallback`, which calls it internally). If you render an image with a raw `/images/...` path, it will work in some contexts and 404 on GitHub Pages.
- Paths **in YAML files** are always written without the basePath (`/images/...`, `/maps/...`); the prefix is added at render time.
- If the repo is ever renamed or moved to a custom domain, update the basePath in **both** `next.config.js` and `src/lib/basePath.ts` — they are duplicated by design.
- `public/.nojekyll` is required so GitHub Pages serves `_next/` directories; don't delete it.
- `copy_images.py` is a **one-off historical script** that converted images from a Notion export on the author's machine (hardcoded `~/Downloads` paths). Don't run it and don't extend it for new content — just add JPEGs to `public/images/` directly.

## Deployment

`.github/workflows/deploy.yml`: every push to `main` (or manual `workflow_dispatch`) runs `npm ci && npm run build` on Node 20 and publishes `./out` to GitHub Pages via `actions/upload-pages-artifact` + `actions/deploy-pages`. There is no staging environment — merging to `main` is deploying. A clean local `npm run build` is the pre-push gate.

## Content language and tone

- All site content and UI copy is **Russian**, first-person, informal, and personal ("проверено на собственном опыте", jokes, "отвал башки"). When writing or editing content, match this voice — do not produce neutral encyclopedic descriptions or marketing copy.
- The guide is explicitly non-commercial: no ads, no sponsored placements. Don't add promotional language.
- Recommendations are the author's personal opinions. Never invent new places, ratings, or facts about venues — content changes beyond mechanical edits should come from the author.

## Conventions and small print

- Path alias `@/*` → `src/*` (tsconfig). TypeScript `strict` is on.
- Tailwind only, no CSS modules; shared utility classes (e.g. `container-custom`) live in `src/app/globals.css`. Brand color is the `primary` sky-blue scale defined in `tailwind.config.js`.
- Client components (`'use client'`) are the exception, used only where state/effects are needed (`Navigation`, `ImageCarousel`, `ImageWithFallback`). Everything else is server components reading YAML at build time — keep it that way; `fs` cannot be imported in client components.
- The `featured` flag only drives the ⭐ badge next to the place name; nothing else consumes it.
- Emojis are used as icons throughout (nav, page headers, buttons) — consistent with the design, keep using them.
- **Analytics:** Yandex Metrika (counter ID in `src/lib/metrika.ts`, shared by the client component `src/components/analytics/YandexMetrika.tsx` and the `<noscript>` pixel in `layout.tsx`). The component is disabled outside production builds and manually reports SPA route changes as hits (static export = client-side navigation). Don't import values from `'use client'` modules into server components — they arrive as client references, not values (this exact bug produced an `[object Object]` URL once).
