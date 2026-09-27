# Guruphoria

**Build Your Essence.**

Guruphoria is a free, live-taught learning institute founded in 2020 in Gomti
Nagar, Lucknow. This repository is the marketing and program site for the
2026 relaunch -- technology, communication and personality, taught by real
mentors in English and Hinglish.

> Documentation lives in `docs/README.md`. Start there for architecture,
> brand strategy and the current progress log. This file is a quick
> orientation for running the project locally.

## Tech stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Backend:** Firebase (client SDK only -- no authenticated surface today)
- **Content:** Plain TypeScript files under `src/content/`, not a CMS

## Features

- **Dark mode** -- light, dark and system, no flash on load, toggled from the header
- **Programs** -- four curricula (`/programs`), each with a full syllabus page
- **Mentors** -- real faculty with subjects that link to the program they teach
- **Live & Archive** -- the current class plus the 2020-21 video library (`/live`)
- **Moments** -- photographs from the offline Lucknow institute (`/moments`)
- **Our Story** -- the 2020 to 2026 timeline (`/story`)

## Project structure

```
src/
├── app/            # Routes -- pages compose sections and content, little else
├── components/
│   ├── common/     # Section, PageHero and other cross-page primitives
│   ├── layout/     # Header, Footer, theme toggle
│   ├── sections/   # Homepage-specific sections
│   ├── providers/  # ThemeProvider, Firebase error listener
│   └── ui/         # shadcn/ui primitives
├── content/        # Editorial source of truth -- programs, mentors, site facts
├── firebase/       # Firebase client configuration
└── lib/            # Utilities and shared types
```

## Getting started

> **Use Node 20 or 22 LTS.** Node 25 is unsupported -- see `docs/ARCHITECTURE.md` section 7.

```bash
git clone https://github.com/PuneetShivaay/Guruphoria.git
cd Guruphoria
npm install
npm run dev          # http://localhost:9002
```

```bash
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint
```

## Contributing

Content edits (mentors, programs, testimonials) live entirely in
`src/content/*.ts` -- no component changes needed for most updates. See
`docs/CONTRIBUTING.md` before opening a PR; the one rule that matters is
**every claim on the site must be verifiable.**

## License

No license file is currently included in this repository. Treat the code as
all-rights-reserved unless a `LICENSE` file is added.
