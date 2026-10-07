# Progress

> Branch `guruphoria2026` · relaunch of the Guruphoria website
> Last updated: 07 Oct 2026

---

## Status at a glance

| Phase | Scope | Status |
|---|---|---|
| 0 | Discovery, audit, positioning | ✅ Done |
| 1 | Design system foundation | ✅ Done |
| 2 | Content model | ✅ Done |
| 3 | Homepage | ✅ Done |
| 4 | Inner pages | ✅ Done |
| 5 | Purge legacy claims | ✅ Done |
| 6 | Real assets | ⏳ Blocked on Puneet |
| 7 | Launch readiness | ⏳ Pending |
| 8 | Dark mode, responsive fixes, mentor data integrity | ✅ Done |
| 9 | Firebase removal, crash resilience, favicon | ✅ Done |
| 10 | Enterprise hardening: dead code, build strictness, lint, tests, CI | ⏳ In progress |

---

## Phase 0 — Discovery ✅

Audited the live site against the actual YouTube library and found the core
problem: **the site promised twelve technologies the channel does not teach**,
and claimed 10k+ subscribers against ~140 followers.

Key findings:

- 58 of 63 videos are WordPress, Personality Development, English, Pandas and
  JavaScript — not AI/Cloud/DevOps
- 25 videos are Communication & Personality: the real differentiator, entirely
  hidden on the old site
- Real, unused credibility: registered institute, physical Lucknow address,
  5.0★ Google (8 reviews), 4.7★ JustDial (9 reviews), 200+ students, founded 2020

**Outcome:** repositioned from "AI/Cloud education" to
**"Build Your Essence" — technology, communication and personality**, with an
honestly-labelled growing AI track.

📄 `docs/design/01-brand-strategy.md`

---

## Phase 1 — Design system ✅

- `globals.css` rebuilt: brand ramp `brand-50…900` from the two logo blues,
  semantic tokens, `.on-deep` inversion
- `tailwind.config.ts`: brand colours, `live` token, four-step shadow system,
  `reveal` animation, `max-w-content`
- Removed the dark theme, neon glows, floating animations and glass effects
- Component classes: `.card-hairline`, `.section-label`, `.bg-grid`,
  `.bg-brand-wash`, `.text-brand-gradient`

**Decision:** light-dominant editorial, deep blue used only twice per page.
Rationale in `ARCHITECTURE.md` §4.

---

## Phase 2 — Content model ✅

Created `src/content/` as the editorial source of truth:

| File | Contents |
|---|---|
| `site.ts` | Brand facts, Lucknow address, socials, verified ratings |
| `programs.ts` | 15 playlists → 4 programs, plus the two audience doors |
| `mentors.ts` | Faculty (placeholders pending real data) |
| `testimonials.ts` | Student proof (placeholders pending real data) |
| `story.ts` | 2020 → 2026 timeline, archive photo slots |

`ProgramStatus = 'established' | 'growing'` makes overstating the AI track a
type-level impossibility.

---

## Phase 3 — Homepage ✅

Shipped at `/`, composed from `src/components/sections/home/`:

1. **Hero** — light editorial, honest stat strip, latest-class card, Google rating
2. **ChapterTwo** — the relaunch in one sentence
3. **TwoDoors** — student vs. working professional
4. **Programs** — four numbered curricula, AI track chipped `New · Growing`
5. **Mentors** — team grid with a "Teach with us" slot
6. **Story** — 2020→2026 timeline; Vragger and Foundation in past tense
7. **Proof** — Google/JustDial badges + testimonials
8. **Newsletter** — "Know when we go live", built around an irregular schedule

Supporting work:

- `Header` — white sticky bar, logo sits natively, new nav, mobile sheet
- `Footer` — navy, **Lucknow address visible**, socials
- `layout.tsx` — metadata driven from `site.ts`; JSON-LD `EducationalOrganization`
  now carries real address, founding date and aggregate rating
- Renamed migration scaffolding (`*-2026`) to production names
- Removed the temporary `/design-preview` route

---

## Phase 4 — Inner pages ✅

Every route in the navigation now exists and builds statically.

| Route | Contents |
|---|---|
| `/programs` | Index split into Career Skills and AI Track, totals strip, two-doors picker |
| `/programs/[slug]` | Open syllabus, sticky sidebar (mentors, at-a-glance, YouTube), related programs. SSG via `generateStaticParams` |
| `/live` | Latest class, archive grid, browse-by-program, notify-me capture |
| `/mentors` | Full faculty grid with bios, languages, programmes taught, "Teach with us" band |
| `/story` | Timeline, archive photo grid, Vragger + Foundation as **Archived**, ratings |
| `/contact` | Three reasons to write, direct email CTA, Lucknow address, channel list |

Supporting work:

- `PageHero` — shared opening band for all inner pages
- `ProgramCard` — extracted so `/` and `/programs` cannot drift apart
- `VideoCard` — shared by the hero and `/live`; always renders the year
- `content/archive.ts` — real videos from the channel, replacing the
  fabricated mock data in the deleted `lib/youtube.ts`
- Homepage hero now reads `latest` and `site.ratings` from content, not hardcoded strings
- `sitemap.ts` — generated from `content/programs.ts`; `robots.ts` reads `site.url`

📄 `docs/design/04-information-architecture.md`

---

## Phase 5 — Purge legacy claims ✅

All dark-theme pages and the claims they carried are gone.

**Routes deleted:** `/about`, `/courses` (+ `[courseId]`, `/view`), `/explore`,
`/projects`, `/resources`, `/login`

**Code deleted:** `components/admin/`, `components/ai/`,
`components/cards/course-card.tsx`, `lib/courses.ts`, `lib/youtube.ts`,
`lib/medium.ts`, `lib/github.ts`, `config/homepage.ts`

**Claims removed:**

- ❌ "10k+ subscribers" / "Join 10,000+ engineers" (channel has ~140)
- ❌ Topic tiles for Kubernetes, Docker, Java, LLM Engineering, Cloud, Firebase
- ❌ "Always Up To Date" against a 2020–21 library
- ❌ Vragger and the Foundation implied as live
- ❌ **Fabricated YouTube mock data** — `lib/youtube.ts` carried a fake channel
  ID and invented titles like *"Building an Agentic AI Framework with Next.js
  15 and OpenAI"*, rendered as real content whenever the API key was absent
  (i.e. always). Replaced by `content/archive.ts`.

**Redirects:** 301s live in `netlify.toml` — `/about → /story`,
`/courses* → /programs`, `/explore → /programs`, `/resources → /programs`,
`/projects → /`, `/login → /`.

**Verified:** `npx tsc --noEmit` clean · `npm run build` 16/16 routes static,
~104–110 kB First Load JS.

---

## Phase 6 — Real assets ⏳ *(blocked)*

Structurally complete, visibly placeholder. This is the highest-value
outstanding work.

- [ ] Transparent logo — PNG + SVG
- [ ] Founder photograph
- [ ] 5–6 mentors: name, photo, subject, one-line bio, language, LinkedIn
- [ ] 10 testimonials: name, photo, programme, year, current role, one
      **specific** sentence
- [ ] 6–10 offline photographs: classroom, whiteboard, computers, Teachers' Day
- [ ] Google Reviews permalink
- [ ] Confirm the first new content of Chapter Two

---

## Phase 7 — Launch readiness ⏳

- [ ] Real YouTube `videoId`s in `content/archive.ts` so cards link to the
      actual videos and use real thumbnails
- [ ] Node 20/22 LTS (Node 25 is unsupported — see `ARCHITECTURE.md` §7)
- [ ] Open Graph image reflecting the new brand
- [ ] Lighthouse: performance, accessibility, SEO
- [ ] Newsletter form wired to a real provider (two forms: `/` and `/live`)
- [ ] `guruphoria.com` reacquired and pointed, with redirects from Netlify
- [ ] Analytics

---

---

## Phase 8 — Dark mode, responsive fixes, mentor data integrity ✅

Not part of the original launch plan, but delivered together as a set of
site-wide corrections.

**Dark mode**

- `ThemeProvider` (`components/providers/theme-provider.tsx`) — light, dark
  and system, persisted to `localStorage`, with an inline script in
  `layout.tsx` that sets the `dark` class before first paint so there is no
  flash on load
- `globals.css` — a full `.dark` token block; the brand ramp is not blindly
  inverted (50–200 become dark tints, 300–600 stay bright accents, 700
  becomes legible ink, 800–900 stay deep navy since they are the deep-surface
  colours in both themes)
- Header toggle (`components/layout/theme-toggle.tsx`), sun/moon icon

**Footer rework**

- Rebuilt on semantic tokens (`bg-surface`, `border-border`) instead of a
  hardcoded navy fill, so it now reads as light in light mode and dark in
  dark mode automatically
- Added a "Designed & developed by Otical" credit to the bottom bar
- Fixed the `Archive` link, which pointed at a route that was never built —
  it now points at `/live`, where the archive actually renders

**New route — `/moments`**

- `content/moments.ts` — photographs from the offline Lucknow institute,
  grouped by occasion (Teachers' Day, classroom, students, institute).
  Follows the same honesty rules as `content/archive.ts`: every entry must be
  a real photograph, `year` is always shown, nothing is invented
- Ships with placeholder entries — photographs and captions still to be
  supplied; empty tiles render a typographic placeholder rather than stock
  imagery
- Linked from the footer and from a teaser on `/story`

**Mentor data integrity**

- `mentors.ts` had a `teaches` field doing two incompatible jobs: it was
  rendered as the visible subject label *and* used to build
  `/programs/<slug>` links. Editorial copy such as `'QA-Testing & Automation'`
  therefore produced a dead link, and the "Taught by" list on every program
  page was silently empty because nothing matched a real slug
- Replaced with `subjects: { label; programSlug? }[]` — the label is free
  text a mentor's page controls; the slug is optional, internal, and typed as
  `ProgramSlug` so an invalid value fails the build instead of shipping a
  broken link
- Mentors without a matching program (QA, Marketing) now render as plain
  text rather than a dead link; Blockchain links to AI & Emerging Tech
- Same fix applied to `content/programs.ts`'s `audiences` array, which had
  the identical problem — untyped, so its `programs` field had silently
  widened to `string[]`

**Mobile responsiveness**

- Root cause of the worst bug: grid items default to `min-width: auto`, so a
  `truncate` caption inside a grid item (testimonials, mentor cards) could
  not actually shrink — the card expanded to fit the un-truncated text and
  pushed the page wider than the viewport. Fixed with `min-w-0` on the grid
  items themselves, not just their children
- Section padding, heading sizes and card padding now step down below `sm`
  rather than only changing at `md`
- Grids step 1 → 2 → 3 columns instead of jumping straight to 3
- Hero and footer CTAs stack full-width on mobile instead of wrapping
- `overflow-x-hidden` added to `<body>` as a safety net

**Code quality**

- Replaced single-letter callback parameters (`m`, `p`, `l`, `t`, `r`, `v`,
  `i`) with descriptive names across `app/` and `components/sections`. Worst
  case was `programs/[slug]/page.tsx`, where `m` meant *mentor* in one block
  and *module* in another

**Also fixed**

- Hydration warning from browser extensions (component locators) injecting
  attributes into `<head>` before React hydrates — added
  `suppressHydrationWarning` there, matching the existing one on `<html>`
- Case-sensitivity bug: `mentors.ts` referenced `puneet.PNG` while the file on
  disk is `puneet.png`. Resolves silently on Windows, 404s on Linux hosts
  such as Netlify

## Phase 9 — Firebase removal, crash resilience, favicon ✅

Triggered by investigating why Google's cached snippet for the live site
showed "Untitled — Application error: a client-side exception has occurred"
instead of the real title/description.

**Root cause**

- `app/layout.tsx` wrapped the entire site in `FirebaseClientProvider`, which
  initialised Firebase App, Auth and Firestore on *every* page load — despite
  no page or component anywhere in `app/` or `components/` actually calling
  `useFirestore`, `useAuth`, `useCollection` or `useDoc`. It was dead
  plumbing from the original scaffold
- That provider rendered `FirebaseErrorListener`, which `throw`s any Firestore
  permission error so it bubbles up as a React error. With no
  `error.tsx` / `global-error.tsx` anywhere in `app/`, an uncaught throw fell
  through to Next.js's own blank, title-less default error page — exactly
  what Google had indexed
- Separately, Node 25's experimental global `localStorage` is broken unless
  started with `--localstorage-file`; Firebase Auth sniffs for it during SSR
  and throws `TypeError: localStorage.getItem is not a function`. An existing
  `instrumentation.ts` patched this at runtime by deleting the broken global

**Fixes**

- Removed `FirebaseClientProvider` from `app/layout.tsx`; deleted the entire
  `src/firebase/` directory, `components/providers/FirebaseErrorListener.tsx`,
  `apphosting.yaml` (Firebase App Hosting config, irrelevant to Netlify), and
  the `firebase` package from `package.json`
- Replaced the runtime `instrumentation.ts` patch with the correct fix: pass
  `NODE_OPTIONS=--no-experimental-webstorage` (via `cross-env`, for
  Windows/Linux parity) in the `dev`, `build` and `start` scripts, so the
  broken Node global is disabled at the source instead of patched around
- Added `app/global-error.tsx` and `app/error.tsx` as safety nets — any
  future unexpected error now renders a branded, `noindex` "Something went
  wrong" screen with a real `<title>`, instead of Next's blank fallback
- Net effect: every route is now static/SSG with no client-side Firebase
  runtime at all (confirmed via `npm run build` — all 16 routes `○`/`●`)

**Favicon**

- `app/favicon.ico` (a leftover scaffold default) was silently taking
  priority over the `icons` metadata in `layout.tsx`. Deleted it and pointed
  `icons.icon` / `icons.shortcut` / `icons.apple` at `public/logoRound.png`
  so the actual brand mark is used everywhere a favicon is requested

---

## Phase 10 — Enterprise hardening ⏳ in progress

Prompted by a full codebase review against `docs/ARCHITECTURE.md`'s own
stated layer rules. The documented architecture was sound; the repo had
drifted from it with leftover scaffold debris. This phase closes that gap.

**10.1 — Remove dead scaffold code ✅**

- `src/lib/types.ts` deleted — `YouTubeVideo`, `MediumArticle`,
  `GitHubRepository`, `Course`, `ContactMessage`, `NewsletterSubscription`,
  `CourseFormData` were all unused anywhere in the codebase; leftovers from
  the original Firebase Studio scaffold's imagined feature set
- `src/ai/` deleted (`genkit.ts`, `dev.ts`, `flows/topic-specific-recommendations.ts`)
  — a Genkit recommendation flow never called from any route or component.
  `docs/AI_FLOWS.md` rewritten to record the removal rather than describe a
  feature that doesn't exist
- Removed `genkit`, `@genkit-ai/google-genai`, `@genkit-ai/next`,
  `genkit-cli`, `zod`, `dotenv` from `package.json` (all were dependencies of
  the deleted AI flow only) and the `genkit:dev` / `genkit:watch` scripts.
  **559 packages removed** from `node_modules`; `npm audit` vulnerabilities
  dropped from 119 to 21
- Deleted orphaned root `firestore.rules` (no Firestore usage remains after
  Phase 9) and the empty `src/config/` directory
- Fixed three docs that had drifted from reality:
  - `docs/STRUCTURE.md` described routes (`(auth)/`, `courses/`, `explore/`,
    `projects/`) that don't exist post-relaunch — rewritten to match the
    actual `src/app/` tree and marked as secondary to `ARCHITECTURE.md`
  - `docs/ARCHITECTURE.md` §2 and §7 still listed `firebase/` and
    `instrumentation.ts`, both removed in Phase 9 — corrected
  - `docs/CONTRIBUTING.md`'s environment note still mentioned
    `src/instrumentation.ts` and Firebase — corrected
- Verified with `tsc --noEmit` (clean) and `npm run build` (16 routes,
  unchanged output) after the dependency removal

**10.2 — Stop silently ignoring build errors ✅**

`next.config.ts` set `typescript.ignoreBuildErrors: true` and
`eslint.ignoreDuringBuilds: true`, meaning type errors and lint errors could
ship to production silently. Removed both flags. `npm run build` now
actually runs "Linting and checking validity of types" as a build step —
confirmed clean with zero errors, so the codebase was already compliant and
these flags were pure unnecessary risk with no code debt behind them.

**10.3 — Explicit ESLint config — not started**

No `.eslintrc`/`eslint.config.*` exists; `next lint` is running on implicit
defaults. Plan: add an explicit config that enforces the layer rules already
documented in `ARCHITECTURE.md` §2 (e.g. `content/` must not import React or
components), plus `no-unused-vars` as an error so dead code like 10.1 cannot
silently reaccumulate.

**10.4 — Test infrastructure — not started**

No test runner exists in the repo. Plan: add Vitest + React Testing Library.
First tests to write:
- A content-integrity test asserting every `mentors.ts` `subjects[].programSlug`
  and every `programs.ts` `audiences[].programs` entry resolves to a real
  program slug — this is the exact class of bug fixed by hand in Phase 8
  (mentor data integrity); a test makes it impossible to regress silently
- Smoke tests for a handful of key components (Header, ProgramCard)

**10.5 — CI pipeline — not started**

No `.github/workflows` exists; `typecheck`/`lint`/`build` only run locally.
Plan: add a GitHub Actions workflow running typecheck, lint, test and build
on every push/PR to `guruphoria2026` and `main`.

---

## Open decisions

| # | Question | Recommendation | Status |
|---|---|---|---|
| 1 | Keep the 63 old videos? | Yes — present as a dated Archive | Agreed |
| 2 | Kid Zone Activity | Archive or drop; off-audience | Open |
| 3 | Logo redraw | Keep concept, refine geometry | Open |
| 4 | Paid cohorts later | Free now; structure allows it later | Deferred |
| 5 | English/Hinglish filter | Build it — genuine differentiator | Planned |

