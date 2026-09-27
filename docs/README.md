# Documentation# Guruphoria Technical Documentation



Guruphoria web platform. Start here.Welcome to the technical documentation for Guruphoria. This directory contains detailed information about the project's architecture, design patterns, and implementation details.



---## Documentation Index



## Read in this order1. **[High-Level Design (HLD)](./HLD.md)**: Overview of the system architecture and technology stack.

2. **[Project Structure](./STRUCTURE.md)**: Detailed breakdown of the file system and component organization.

| Doc | Read it when |3. **[AI Implementation & Flows](./AI_FLOWS.md)**: Documentation of Genkit flows and AI-driven features.

|---|---|4. **[Database Schema](./backend.json)**: The IR (Intermediate Representation) of the Firestore data structure.

| [`design/01-brand-strategy.md`](./design/01-brand-strategy.md) | You need the *why* — positioning, audience, honest claims |

| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | You are about to write code |## Core Technology Stack

| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | You are adding content or opening a PR |

| [`PROGRESS.md`](./PROGRESS.md) | You want to know what is done and what is next |- **Framework**: Next.js 15 (App Router)

- **Language**: TypeScript

---- **Styling**: Tailwind CSS + Shadcn UI

- **Backend**: Firebase (Authentication & Firestore)

## The one rule- **Generative AI**: Genkit + Google Gemini 1.5 Flash

- **Integrations**: GitHub API, YouTube API, Medium RSS

> **Every claim on the site must be verifiable.**

The previous site advertised twelve technologies with no content behind them
and claimed 10k+ subscribers against a channel with ~140 followers. That gap
between promise and substance — not the visual design — was the reason it did
not read as premium.

If you are adding a number, a rating or a capability, you must be able to
answer *where does this come from?* All such values live in
[`src/content/site.ts`](../src/content/site.ts).

---

## Quick facts

| | |
|---|---|
| **Brand** | Guruphoria — *Build Your Essence* |
| **Founded** | 2020, Gomti Nagar, Lucknow, Uttar Pradesh |
| **Positioning** | Technology, communication and personality — taught live, free |
| **Audience** | College students and working professionals, India-first |
| **Model** | Free. YouTube-led. No paid product today. |
| **Languages** | English and Hinglish |
| **Stack** | Next.js 15 (App Router), TypeScript, Tailwind, shadcn/ui, Firebase |

---

## Running locally

```bash
npm install
npm run dev          # http://localhost:9002
```

> **Use Node 20 or 22 LTS.** Node 25 exposes a broken experimental
> `localStorage` global that breaks Firebase during SSR. See
> [`ARCHITECTURE.md`](./ARCHITECTURE.md) §7.

```bash
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint
```

---

## Where things live

```
src/content/     ← editorial source of truth (edit here, not in components)
src/components/  ← common/ primitives · layout/ · sections/<page>/
src/app/         ← routes; pages compose sections and little else
docs/design/     ← strategy and design specifications
```

---

## Legacy documents

`LEGACY-README.md`, `blueprint.md`, `HLD.md`, `STRUCTURE.md` and `AI_FLOWS.md`
predate the 2026 relaunch and describe the former "AI & Software Engineering"
positioning. They are retained for history. Where they conflict with the
documents above, **the documents above win.**
