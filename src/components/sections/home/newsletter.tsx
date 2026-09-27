import { Section } from '@/components/common/section';

/**
 * Newsletter — framed around an irregular teaching schedule.
 *
 * We publish when we publish, so "know when we go live" turns the lack of a
 * fixed timetable into the reason to subscribe rather than a weakness.
 */
export function Newsletter() {
  return (
    <Section tone="surface" containerClassName="max-w-3xl py-20 text-center md:py-24">
      <h2 className="font-headline text-3xl font-bold tracking-tight md:text-[2.5rem]">
        Know when we go live.
      </h2>
      <p className="mx-auto mt-4 max-w-xl leading-relaxed text-foreground/55">
        We teach when we teach — no fixed schedule. Leave your email and we will tell you
        before the next live class starts.
      </p>

      <form className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="you@email.com"
          className="flex-1 rounded-full border border-brand-700/15 bg-white px-5 py-3.5 text-sm text-foreground outline-none transition placeholder:text-foreground/35 focus:border-brand-500"
        />
        <button
          type="submit"
          className="rounded-full bg-brand-700 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-800"
        >
          Notify me
        </button>
      </form>

      <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-foreground/40">
        Free forever · No spam · Unsubscribe anytime
      </p>
    </Section>
  );
}
