# Contributing

Practical rules for working in this repository. Read
[`ARCHITECTURE.md`](./ARCHITECTURE.md) first for the reasoning behind them.

---

## Before you write code

**Ask: is this content or is this code?**

Copy, names, numbers, module lists, testimonials and timeline entries are
**content** — they belong in `src/content/`. If you find yourself typing a
sentence a non-developer might want to change, you are in the wrong file.

---

## Adding content

### A mentor

Edit [`src/content/mentors.ts`](../src/content/mentors.ts):

```ts
{
  slug: 'firstname-lastname',
  name: 'Firstname Lastname',
  role: 'Mentor · Subject',
  photo: '/mentors/firstname.jpg',   // 400×400 min, square, centred face
  bio: 'One sentence. What they teach and one credibility detail.',
  languages: ['Hinglish'],
  teaches: ['program-slug'],
}
```

Keep the `placeholder: true` entry last — the "Teach with us" slot signals a
growing faculty.

### A testimonial

Edit [`src/content/testimonials.ts`](../src/content/testimonials.ts).

A good testimonial is **specific**:

| | |
|---|---|
| ❌ | "Great teacher, learned a lot." |
| ✅ | "I built my first full website in the live class and used it as my project in placement interviews." |

Required: real name, photo, programme, year, and **where they are now**. The
outcome is the part that persuades. Never invent one.

### A program

Edit [`src/content/programs.ts`](../src/content/programs.ts).

Set `status: 'growing'` if the catalogue is thin — the UI will render a
`New · Growing` chip instead of implying a mature curriculum. This is not
optional.

---

## Adding a number

Every statistic goes in [`src/content/site.ts`](../src/content/site.ts) and
must be verifiable by a stranger. Ratings must link to the source.

If you cannot cite it, do not ship it. This is the single most important rule
in the project — see [`README.md`](./README.md).

---

## Writing components

### Structure

```
components/common/          Design-system primitives, page-agnostic
components/layout/          Header, Footer, Logo
components/sections/<page>/ Composed sections for one page
components/ui/              shadcn/ui — generated, avoid hand-editing
```

Pages compose sections. A `page.tsx` containing layout detail is a smell —
move it into a section.

### Server first

Components are Server Components by default. Add `'use client'` only for
state, effects or browser APIs, and push it as far down the tree as possible.

### Styling

- Use tokens: `bg-brand-700`, `text-foreground/60`, `shadow-elevated`
- **Never** raw hex. If no token fits, add one to `globals.css`
- Cards use `.card-hairline`; sections use `<Section tone="…">`
- `live` (green) is reserved for `FREE` / `LIVE` / `NEW` badges only
- Deep blue (`brand-900`) appears at most twice per page

### Motion

One vocabulary: `animate-reveal`, staggered with
`[animation-delay:120ms]`. Nothing bouncy, nothing decorative.

### Accessibility

- Semantic elements — `<nav>`, `<address>`, `<dl>`, `<ol>`, `<figure>`
- `aria-label` on every icon-only control
- Labels on all inputs (`sr-only` is fine)
- Decorative images get `alt=""`
- Keyboard-reachable interactive elements, visible focus

---

## Conventions

| Thing | Convention |
|---|---|
| Files | `kebab-case.tsx` |
| Components | `PascalCase` |
| Data / functions | `camelCase` |
| Version suffixes | **Never.** `header.tsx`, not `header-2026.tsx` |
| Comments | Explain *why*, not *what* |

Non-obvious design decisions get a short rationale block at the top of the
file. Example, from `hero.tsx`:

```
Deliberately NOT dark: the logo is blue-on-white, and a near-black block at the
top pulls the brand toward the generic AI-startup look.
```

That comment stops someone "fixing" it back six months from now.

---

## Before opening a PR

```bash
npm run typecheck
npm run lint
npm run build
```

Then check:

- [ ] No hardcoded copy in components — is it content?
- [ ] No unverifiable claims
- [ ] No raw hex values
- [ ] Responsive at 375 / 768 / 1440
- [ ] Keyboard navigable
- [ ] `docs/PROGRESS.md` updated if the phase status changed

---

## Environment

Use **Node 20 or 22 LTS**. Node 25 exposes a broken experimental
`localStorage` global that breaks SSR. `package.json`'s scripts set
`NODE_OPTIONS=--no-experimental-webstorage` to work around it, but the
supported path is the LTS runtime.
