# Architecture

> Guruphoria web platform · Next.js 15 App Router · TypeScript · Tailwind

---

## 1. Principles

These are the rules we do not break. When in doubt, follow the one that
appears first.

1. **Honesty over polish.** No claim ships unless it is verifiable. A number
   without a source is a bug. See §6.
2. **Content is data, not markup.** Anything an editor might change lives in
   `src/content/` as typed data. Components render; they never hold copy that
   will need updating.
3. **One way to do a thing.** One shadow system, one radius scale, one accent
   colour, one motion vocabulary. Variation is a decision, not a default.
4. **Server by default.** Components are React Server Components unless they
   genuinely need state, effects or browser APIs.
5. **Restraint is the design.** Premium comes from typography, spacing and
   discipline — not effects.

---

## 2. Directory layout

```
src/
├── app/                      # Routes (App Router)
│   ├── layout.tsx            # Root shell: metadata, JSON-LD, header, footer
│   ├── page.tsx              # Homepage — composes sections only
│   └── <route>/page.tsx      # One folder per route
│
├── components/
│   ├── common/               # Design-system primitives (Section, Chip, …)
│   ├── layout/               # Header, Footer, Logo
│   ├── sections/<page>/      # Page-specific composed sections
│   └── ui/                   # shadcn/ui primitives (generated, rarely edited)
│
├── content/                  # ★ Typed content — the editorial source of truth
│   ├── site.ts               # Brand facts, address, socials, ratings
│   ├── programs.ts           # The 4 programs + audience doors
│   ├── mentors.ts            # Faculty
│   ├── testimonials.ts       # Student proof
│   └── story.ts              # Timeline + archive photos
│
├── lib/                      # Framework-agnostic helpers, external APIs
└── hooks/                    # Shared React hooks
```

### Layer rules

| Layer | May import from | Must never import |
|---|---|---|
| `content/` | nothing (pure data + types) | React, components |
| `components/common/` | `lib/`, `content/` types | `sections/`, `app/` |
| `components/sections/` | `common/`, `content/`, `lib/` | `app/` |
| `app/` | anything | — |

A page should read as a table of contents. If `page.tsx` contains layout
detail, that detail belongs in a section component.

---

## 3. Content model

`src/content/` is the boundary between editorial and engineering. Adding a
mentor or a testimonial must never require touching a component.

Each file exports typed data plus the types themselves:

```ts
export interface Program { … }
export const programs: Program[] = [ … ];
```

**Honesty is enforced in the type system where possible.** Example — a program
whose catalogue is still thin must be marked, so the UI can label it rather
than overstate it:

```ts
export type ProgramStatus = 'established' | 'growing';
```

`status: 'growing'` renders a `New · Growing` chip. This is why the AI track
can never accidentally be presented as a mature curriculum.

### Placeholders

Unfilled real-world assets carry an explicit marker:

```ts
// TODO(puneet): replace with real mentor details
```

Placeholders are always visibly placeholder in the UI (initials instead of a
photo, "Mentor Name"). We never ship invented people or fake quotes.

---

## 4. Design system

Defined once in `src/app/globals.css` and surfaced through
`tailwind.config.ts`. Components use Tailwind utilities that reference tokens —
never raw hex values.

### Colour

A single brand ramp derived from the two logo blues:

| Token | Hex | Role |
|---|---|---|
| `brand-100` | `#e6f4fd` | Tints, soft fills |
| `brand-500` | `#0295d8` | **Accent** — links, interactive, labels |
| `brand-700` | `#0d539b` | **Primary** — headings, brand surfaces |
| `brand-900` | `#08325e` | Deepest logo blue — Story and Footer only |
| `live` | green | **Reserved** for `FREE` / `LIVE` / `NEW` badges only |

Semantic aliases (`--background`, `--foreground`, `--primary`, …) map onto the
ramp so shadcn/ui components inherit the theme. `.on-deep` flips those
semantics for inverted sections.

> **Deep blue is scarce on purpose.** It appears twice on the homepage. A dark hero
> pulls the brand toward the generic AI-startup look and fights the
> blue-on-white logo.

### Elevation

Four shadows, no more: `hairline`, `elevated`, `lifted`, `cta`. All are tinted
with `brand-700` rather than black, so shadows stay in the brand family.

### Motion

One vocabulary: `animate-reveal` — a 14px rise with a fade, on a
`cubic-bezier(0.16, 1, 0.3, 1)` curve, staggered by `[animation-delay:*]`.
All motion is disabled under `prefers-reduced-motion`.

---

## 5. Rendering strategy

- **Server Components by default.** Sections are static and render on the
  server, so the homepage ships almost no JavaScript.
- **`'use client'` only where required** — currently just `Header` (scroll
  state, mobile sheet) and Firebase providers.
- **External data** (YouTube, GitHub, Medium) is fetched in `lib/` and should
  be cached/revalidated server-side rather than fetched in `useEffect`.

---

## 6. The honesty rule

The previous site claimed *10k+ subscribers* against a channel with ~140, and
advertised twelve technologies with no content behind them. That mismatch —
not the visual design — was the main reason it did not read as premium.

Therefore:

- Every statistic lives in `src/content/site.ts` with a verifiable source.
- Ratings link to the third party (Google, JustDial) so visitors can check.
- Archive content is openly dated. Transparency reads premium; concealment
  reads evasive.
- Inactive projects (Vragger, the Foundation) are described in **past tense**
  in the Story and never appear in navigation.

If a PR adds a number, the reviewer asks: *where does this come from?*

---

## 7. Runtime notes

### Node version

Next.js 15 targets Node 20/22 LTS. Node 25 exposes an experimental global
`localStorage` that is unusable unless `--localstorage-file` is given a valid
path, which breaks SSR with `TypeError: localStorage.getItem is not a
function`. `package.json`'s `dev` / `build` / `start` scripts set
`NODE_OPTIONS=--no-experimental-webstorage` (via `cross-env`, for
Windows/Linux parity) to disable it at the source — see `docs/PROGRESS.md`
Phase 9. Firebase has since been removed entirely (it was unused dead
plumbing), but the Node flag stays regardless, since the broken global is a
platform issue independent of Firebase.

---

## 8. Conventions

- **Files:** `kebab-case.tsx`. Components: `PascalCase`. Data: `camelCase`.
- **No version suffixes.** `header.tsx`, never `header-2026.tsx`.
- **Comments explain _why_**, not what. Non-obvious design decisions get a
  short rationale block at the top of the file.
- **Accessibility:** semantic elements (`<address>`, `<nav>`, `<dl>`, `<ol>`),
  labelled form controls, `aria-label` on icon-only buttons.
- **No magic values in components.** Reach for a token; if none fits, add one.
