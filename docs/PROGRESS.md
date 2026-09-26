# Progress

> Branch `guruphoria2026` · relaunch of the Guruphoria website
> Last updated: 27 Sep 2026

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

## Open decisions

| # | Question | Recommendation | Status |
|---|---|---|---|
| 1 | Keep the 63 old videos? | Yes — present as a dated Archive | Agreed |
| 2 | Kid Zone Activity | Archive or drop; off-audience | Open |
| 3 | Logo redraw | Keep concept, refine geometry | Open |
| 4 | Paid cohorts later | Free now; structure allows it later | Deferred |
| 5 | English/Hinglish filter | Build it — genuine differentiator | Planned |
