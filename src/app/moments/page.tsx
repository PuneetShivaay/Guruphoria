import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Camera } from 'lucide-react';
import { PageHero } from '@/components/common/page-hero';
import { Chip, Section, SectionHeading } from '@/components/common/section';
import { momentsByCategory, availableMoments } from '@/content/moments';

export const metadata: Metadata = {
  title: 'Moments',
  description:
    'Photographs from the Guruphoria institute in Gomti Nagar, Lucknow — classrooms, whiteboard sessions and Teachers’ Day celebrations from 2020 to 2021.',
};

/**
 * Moments — the photographic record of Chapter One.
 *
 * Deliberately separate from `/live`, which holds the *video* archive. This
 * page is about the room and the people in it, not the teaching.
 *
 * Photographs are grouped by occasion rather than shown as one long contact
 * sheet, so the page reads as a set of memories with context.
 */
export default function MomentsPage() {
  const groups = momentsByCategory();
  const hasPhotos = availableMoments.length > 0;

  return (
    <>
      <PageHero
        label="Moments"
        title={
          <>
            The room where
            <span className="text-brand-gradient"> it started.</span>
          </>
        }
        intro="Photographs from the institute in Vikas Khand, Gomti Nagar — Teachers' Day, whiteboard sessions, and the batches who passed through between 2020 and 2021."
      >
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Chip>2020 — 2021</Chip>
          <Chip>Lucknow, India</Chip>
          <Chip>Chapter One</Chip>
        </div>
      </PageHero>

      {/* ---------------- the photographs ---------------- */}
      {groups.map((group, i) => (
        <Section key={group.category} tone={i % 2 === 0 ? 'surface' : 'white'}>
          <SectionHeading
            label={group.category}
            title={captionFor(group.category)}
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((moment) => (
              <figure
                key={moment.caption}
                className={
                  moment.featured
                    ? 'card-hairline group relative overflow-hidden sm:col-span-2'
                    : 'card-hairline group relative overflow-hidden'
                }
              >
                <div className="relative flex aspect-[4/3] items-end overflow-hidden bg-gradient-to-br from-brand-100 to-brand-200">
                  {moment.src ? (
                    <Image
                      src={moment.src}
                      alt={moment.caption}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    /* No invented imagery — a typographic placeholder instead. */
                    <span className="grid h-full w-full place-items-center text-center">
                      <Camera className="h-6 w-6 text-brand-700/35" aria-hidden />
                    </span>
                  )}

                  <span className="absolute right-3 top-3 rounded bg-brand-900/85 px-2 py-1 text-[10px] font-semibold text-white">
                    {moment.year}
                  </span>
                </div>

                <figcaption className="p-5">
                  <p className="text-sm leading-relaxed text-foreground/75">{moment.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      ))}

      {/* ---------------- honesty note ---------------- */}
      {!hasPhotos && (
        <Section tone="white" containerClassName="max-w-2xl py-16 text-center md:py-20">
          <p className="text-sm leading-relaxed text-foreground/55">
            We are still digitising the photographs from the Gomti Nagar years.
            The captions above describe what is coming — the images will replace
            these placeholders as we scan them.
          </p>
        </Section>
      )}

      {/* ---------------- onward ---------------- */}
      <Section tone="deep" containerClassName="max-w-3xl py-20 text-center md:py-24">
        <SectionHeading
          onDeep
          label="Chapter One"
          title="The classes themselves are still online."
          intro="Sixty-three videos and twenty-one live streams from the same years, free and openly dated."
          className="mx-auto text-center"
        />

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
          <Link
            href="/live"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-900 transition hover:bg-white/90"
          >
            Watch the archive
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/story"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/60"
          >
            Read our story
          </Link>
        </div>
      </Section>
    </>
  );
}

/** A short, specific heading per occasion. */
function captionFor(category: string): string {
  switch (category) {
    case "Teachers' Day":
      return 'The day the students taught.';
    case 'The classroom':
      return 'One room, a whiteboard, and a projector.';
    case 'Students':
      return 'Over 200 passed through.';
    case 'The institute':
      return 'Vikas Khand, Gomti Nagar.';
    default:
      return category;
  }
}
