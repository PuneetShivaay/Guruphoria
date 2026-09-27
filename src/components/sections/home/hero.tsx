import Link from 'next/link';
import { Play, Youtube } from 'lucide-react';
import { StatStrip } from '@/components/common/section';
import { latest } from '@/content/archive';
import { site, stats } from '@/content/site';

/**
 * Hero — light editorial.
 *
 * Deliberately NOT dark: the logo is blue-on-white, and a navy block at the
 * top pulls the brand back toward the generic AI-startup look. Navy is kept
 * scarce and used only in Story and Footer so it lands as a deliberate accent.
 *
 * The right column shows the latest class rather than an abstract graphic,
 * because "watch a video" is the primary conversion on a free platform.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-brand-wash" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden />

      <div className="relative mx-auto max-w-content px-6 pb-20 pt-16 md:pb-24 md:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          {/* ---------------- copy ---------------- */}
          <div className="animate-reveal">
            <p className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700/70 shadow-hairline">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
              </span>
              Est. {site.foundedYear} · Lucknow, India
            </p>

            <h1 className="font-headline text-5xl font-bold leading-[1.02] tracking-[-0.03em] md:text-[4.5rem]">
              Build Your
              <span className="block text-brand-gradient">Essence.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground/60 md:text-xl">
              A learning institute born in a Lucknow classroom. We teach the complete
              professional —{' '}
              <span className="text-foreground/85">
                technology, communication and personality
              </span>{' '}
              — live, by real mentors, in English and Hinglish. Completely free.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/live"
                className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-cta transition hover:bg-brand-500"
              >
                <Play className="h-4 w-4 fill-current" />
                Watch Latest Class
              </Link>
              <Link
                href={site.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-brand-700 transition hover:border-brand-500 hover:bg-brand-100"
              >
                <Youtube className="h-4 w-4" />
                Subscribe — Free
              </Link>
            </div>
          </div>

          {/* ------------- latest class ------------- */}
          <div className="relative animate-reveal [animation-delay:120ms]">
            <Link
              href="/live"
              className="block overflow-hidden rounded-2xl border border-border bg-card shadow-lifted transition hover:border-brand-500/50"
            >
              <div className="relative flex aspect-video items-end bg-gradient-to-br from-brand-100 to-brand-200 p-4">
                <span className="absolute left-4 top-4 rounded bg-live px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-live-foreground">
                  Latest
                </span>
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 shadow-elevated">
                    <Play className="h-5 w-5 fill-brand-700 text-brand-700" />
                  </span>
                </span>
                <span className="relative rounded bg-brand-900/85 px-2 py-1 text-[10px] font-semibold text-white">
                  {latest.duration}
                </span>
              </div>
              <div className="p-5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-500">
                  {latest.programLabel} · {latest.isLive ? 'Live Class' : 'Lesson'}
                </p>
                <h2 className="mt-2 font-semibold leading-snug text-brand-700">
                  {latest.title}
                </h2>
              </div>
            </Link>

            {/* third-party proof, above the fold */}
            <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-border bg-card px-5 py-3 shadow-elevated sm:block">
              <p className="font-headline text-lg font-bold text-brand-700">
                {site.ratings[0].score} ★
              </p>
              <p className="text-[10px] uppercase tracking-wider text-foreground/45">
                {site.ratings[0].source} · {site.ratings[0].count} reviews
              </p>
            </div>
          </div>
        </div>

        <StatStrip items={stats} className="mt-20" />
      </div>
    </section>
  );
}
