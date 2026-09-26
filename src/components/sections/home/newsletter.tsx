import { Section } from '@/components/common/section';

/**
 * Newsletter — framed around an irregular teaching schedule.
 *
 * We publish when we publish, so "know when we go live" turns the lack of a
 * fixed timetable into the reason to subscribe rather than a weakness.
 */
export function Newsletter() {
  return (
    <Section tone="brand" containerClassName="max-w-3xl py-20 text-center md:py-24">
      <h2 className="font-headline text-3xl font-bold tracking-tight md:text-[2.5rem]">
        Know when we go live.
      </h2>
      <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/65">
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
          className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/50"
        />
        <button
          type="submit"
          className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-700 transition hover:bg-white/90"
        >
          Notify me
        </button>
      </form>

      <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-white/40">
        Free forever · No spam · Unsubscribe anytime
      </p>
    </Section>
  );
}
