# Project Structure

> **Note:** this file predates the 2026 relaunch and described routes
> (`(auth)/`, `courses/`, `explore/`, `projects/`) that no longer exist. See
> `docs/ARCHITECTURE.md` §2 for the authoritative, current directory layout
> and layer rules. This file is kept only as a lighter-weight orientation
> doc and should be updated alongside `ARCHITECTURE.md`, not independently.

The project follows a modular and scalable directory structure optimized for Next.js 15.

## Directory Breakdown

### `src/app/`
Routes (App Router) — one folder per route: `contact/`, `live/`, `mentors/`,
`moments/`, `programs/` (with `[slug]/`), `story/`. Plus `layout.tsx`
(root shell), `page.tsx` (homepage), `error.tsx` / `global-error.tsx` (error
boundaries), `sitemap.ts`, `robots.ts`.

### `src/components/`
Reusable UI components.
- `layout/`: Global elements — Header, Footer, Logo, ThemeToggle.
- `sections/<page>/`: Page-specific composed sections (e.g. `sections/home/`).
- `common/`: Design-system primitives shared across pages (Section, PageHero).
- `cards/`: Reusable card components (ProgramCard, VideoCard).
- `providers/`: Context providers (ThemeProvider).
- `ui/`: Atomic shadcn/ui components — generated, rarely hand-edited.

### `src/content/`
Typed, editorial content — the single source of truth for copy and data.
`site.ts`, `programs.ts`, `mentors.ts`, `testimonials.ts`, `story.ts`,
`archive.ts`, `moments.ts`.

### `src/lib/`
Framework-agnostic helpers.
- `utils.ts`: `cn()` class-merging helper.
- `placeholder-images.ts` / `.json`: centralized placeholder asset data.

### `src/hooks/`
Shared React hooks (`use-mobile`, `use-toast`).
