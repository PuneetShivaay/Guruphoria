# Information Architecture

> Status: v1 · Branch `guruphoria2026` · Last updated 2026-09-27

---

## Principle

Five destinations, no more. A small, confident navigation reads as an
institution; a sprawling one reads as a content dump. Anything that does not
earn a nav slot lives inside a page, not beside it.

---

## Navigation

| Route | Purpose | Primary action |
|---|---|---|
| `/` | Who we are, what we teach, who teaches it | Watch / Subscribe |
| `/programs` | The four curricula | Pick a program |
| `/programs/[slug]` | Full syllabus for one program | Start lesson one |
| `/live` | Latest class + the whole archive | Watch / Notify me |
| `/mentors` | The faculty — kills the "portfolio" read | Meet / Teach with us |
| `/story` | 2020 Lucknow → 2026 relaunch | Build trust |
| `/contact` | Reach us, teach with us, share a story | Email |

### Deliberately not in the nav

| Thing | Where it lives | Why |
|---|---|---|
| **Vragger** | `/story` | Built in 2021, not running. Past tense. |
| **The Foundation** | `/story` | Ran in 2021, not running. Past tense. |
| **Archive (63 videos)** | `/live` | Given a home alongside the newest class, so the library reads as one continuous body of work. |

> A dormant project presented as live is the fastest way to lose the
> credibility these pages exist to build. Both are labelled **Archived**.

---

## Routes retired in this redesign

| Removed | Reason | Replacement |
|---|---|---|
| `/about` | Founder-centric, contained the `10k+ subscribers` claim | `/story` |
| `/courses`, `/courses/[courseId]`, `/courses/view` | Firestore-backed course CRUD for courses that do not exist | `/programs` |
| `/explore` | Topic tiles for 12 technologies we do not teach | `/programs` |
| `/projects` | Founder's GitHub repos — portfolio signal | — |
| `/resources` | Empty promises (cheat sheets, AI prompts) | — |
| `/login` | No authenticated surface in a free, open model | — |

Supporting code removed with them: `components/admin/`, `components/ai/`,
`components/cards/course-card.tsx`, `lib/courses.ts`, `lib/youtube.ts`,
`lib/medium.ts`, `lib/github.ts`, `config/homepage.ts`.

> `lib/youtube.ts` shipped a fabricated channel ID and mock videos with
> invented titles such as *"Building an Agentic AI Framework with Next.js 15
> and OpenAI"*. Real content now lives in `src/content/archive.ts`.

**Redirects:** implemented in `netlify.toml` as permanent 301s.

| From | To |
|---|---|
| `/about` | `/story` |
| `/courses`, `/courses/*`, `/courses/view` | `/programs` |
| `/explore` | `/programs` |
| `/resources` | `/programs` |
| `/projects` | `/` |
| `/login` | `/` |

---

## Page anatomy

Every inner page follows the same skeleton so the site reads as one document:

```
PageHero        label · h1 · intro · optional StatStrip or CTAs
Section(s)      tone alternates: surface → white → surface
                each opens with SectionHeading (label · h2 · intro)
```

Tone banding gives rhythm without new colour. Deep blue (`tone="deep"`) is used
**twice on the whole site** — the Story timeline and the Footer — so it lands
as a deliberate accent rather than a default.

---

## Conversion priority

The model is free, so there is nothing to sell. Ranked goals:

1. **YouTube subscribe** — the growth metric
2. **Newsletter** — the only audience we own
3. **Watch a lesson now** — time on site, return visits
4. **Contact** — enquiries, mentor applications, alumni stories

This is why the homepage hero CTA is *Watch Latest Class* + *Subscribe — Free*,
and why the hero's right column is a playable class card rather than an
abstract illustration.

---

## Content → route mapping

15 YouTube playlists collapse into 4 programs. The mapping lives in
`src/content/programs.ts`; `module.source` records the original playlist so the
relationship stays traceable.

| Program | Route | Lessons |
|---|---|---|
| Web Development | `/programs/web-development` | 32 |
| Data & Python | `/programs/data-and-python` | 9 |
| Communication & Personality | `/programs/communication-and-personality` | 25 |
| AI & Emerging Tech Lab | `/programs/ai-and-emerging-tech` | 6 · growing |

---

## Future routes (not yet built)

| Route | Trigger |
|---|---|
| `/programs/[slug]/[lesson]` | If lessons are ever hosted rather than linked to YouTube |
| `/foundation` | Only if the Foundation is revived |
| `/archive` | Only if `/live` outgrows holding both the latest class and the full library |
