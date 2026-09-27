import type { Metadata } from 'next';
import Link from 'next/link';
import { Bell, Play, Youtube } from 'lucide-react';
import { PageHero } from '@/components/common/page-hero';
import { Chip, Section, SectionHeading, StatStrip } from '@/components/common/section';
import { VideoCard } from '@/components/cards/video-card';
import { archive, latest, liveHours } from '@/content/archive';
import { programs } from '@/content/programs';
import { library, site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Live & Archive',
  description:
    'Every Guruphoria live class and lesson — 63 videos across four programs, taught in English and Hinglish. Free to watch, no signup.',
};

const totals = [
  { value: String(library.liveClasses), label: 'Live classes' },
  { value: String(library.videos), label: 'Total lessons' },
  { value: `${liveHours}h+`, label: 'Hours taught live' },
  { value: '₹0', label: 'Cost to watch' },
];

/**
 * Live & Archive.
 *
 * We publish on no fixed schedule, so this page is built around "here is
 * everything, and here is how to know about the next one" rather than a
 * timetable we cannot keep.
 */
export default function LivePage() {
  return (
    <>
      <PageHero
        label="Live & Archive"
        title={
          <>
            Every class we have
            <span className="text-brand-gradient"> ever taught.</span>
          </>
        }
        intro="We teach live, then leave the recording up for good. No signup, no paywall, no expiry."
      >
        <StatStrip items={totals} className="mt-12" />
      </PageHero>

      {/* ---------------- latest ---------------- */}
      <Section tone="surface">
        <SectionHeading
          label="Most recent"
          title="Pick up where we left off."
          intro="The newest session on the channel."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-center">
          <VideoCard video={latest} />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone="live">Live class</Chip>
              <Chip>{latest.language}</Chip>
              <Chip>{latest.duration}</Chip>
            </div>

            <h3 className="mt-5 font-headline text-2xl font-bold tracking-tight text-brand-700">
              {latest.title}
            </h3>
            <p className="mt-4 leading-relaxed text-foreground/60">
              Part of the {latest.programLabel} program — a sequenced live series taught
              lecture by lecture. Start at lesson one if this is your first time.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={site.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-cta transition hover:bg-brand-500"
              >
                <Play className="h-4 w-4 fill-current" />
                Watch now
              </Link>
              <Link
                href={`/programs/${latest.program}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-brand-700 transition hover:border-brand-500 hover:bg-brand-100"
              >
                See the full program
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- archive ---------------- */}
      <Section tone="white">
        <SectionHeading
          label="The archive"
          title="Chapter One — 2020 to 2021."
          intro="Everything we recorded from the Lucknow classroom years, openly dated. Older, but the fundamentals have not changed."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {archive.map((video) => (
            <VideoCard key={video.title} video={video} />
          ))}
        </div>

        {/* by program */}
        <div className="mt-16 border-t border-brand-700/10 pt-12">
          <h3 className="font-headline text-xl font-bold tracking-tight text-brand-700">
            Browse the full library by program
          </h3>
          <div className="mt-6 flex flex-wrap gap-3">
            {programs.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground/75 transition hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700"
              >
                {program.title}
                <span className="text-xs text-foreground/40 group-hover:text-brand-500">
                  {program.lessonCount}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------- notify ---------------- */}
      <Section tone="brand" containerClassName="max-w-3xl py-20 text-center md:py-24">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white/10">
          <Bell className="h-5 w-5" />
        </span>

        <h2 className="mt-6 font-headline text-3xl font-bold tracking-tight md:text-[2.5rem]">
          Know when we go live.
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/65">
          We teach when we teach — there is no fixed timetable. Subscribe on YouTube for
          the notification, or leave your email and we will tell you first.
        </p>

        <form className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="live-email" className="sr-only">
            Email address
          </label>
          <input
            id="live-email"
            type="email"
            required
            placeholder="you@email.com"
            className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/50"
          />
          <button
            type="submit"
            className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-900 transition hover:bg-white/90"
          >
            Notify me
          </button>
        </form>

        <Link
          href={site.social.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
        >
          <Youtube className="h-4 w-4" />
          Or subscribe on YouTube
        </Link>
      </Section>
    </>
  );
}
