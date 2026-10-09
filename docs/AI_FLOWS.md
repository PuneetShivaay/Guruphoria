# AI Flows

**Status: removed (07 Oct 2026).** See `docs/PROGRESS.md` Phase 10.

This project previously scaffolded a Genkit-based recommendation flow
(`src/ai/flows/topic-specific-recommendations.ts`) from the original Firebase
Studio template. It was never called from any route, page, or component —
the "course viewing pages" it referenced do not exist in this app's
information architecture (see `docs/design/04-information-architecture.md`).

It was removed along with the `genkit`, `@genkit-ai/*` dependencies to cut
dead weight from the dependency tree and attack surface.

If an AI feature is scoped for the platform in future (e.g. a recommendation
engine for `/live` or `/programs`), it should be re-added as a deliberate
feature with a real caller, not reintroduced from the template.
