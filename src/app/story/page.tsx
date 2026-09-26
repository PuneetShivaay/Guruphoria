import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, MessageSquare } from 'lucide-react';
import { PageHero } from '@/components/common/page-hero';
import { RatingBadge, Section, SectionHeading, StatStrip } from '@/components/common/section';
import { storyPhotos, timeline } from '@/content/story';
import { site, stats } from '@/content/site';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Guruphoria began in 2020 as an offline computer institute in Gomti Nagar, Lucknow. Over 200 students later, it teaches the world online — free.',
};

/**
 * Story — the trust anchor of the whole site.
 *
 * Vragger and the Foundation are told here in PAST TENSE. Neither is live, so
 * neither appears in the navigation. Presenting a dormant thing as active is
 * the fastest way to lose the credibility this page exists to build.
 */
export default function StoryPage() {
  return (
    <>
      <PageHero
        label="Our story"
        title={
          <>
            From a Lucknow classroom
            <span className="text-brand-gradient"> to the world.</span>
          </>
        }
        intro="Guruphoria is not a new brand. It started as a room with computers in Vikas Khand, Gomti Nagar, and over 200 students walked through it."
      >
        <StatStrip items={stats} className="mt-12" />
      </PageHero>

      {/* ---------------- timeline ---------------- */}
      <Section tone="deep">
        <div className="grid gap-14 md:grid-cols-[1fr_340px]">
          <div>
            <SectionHeading onDeep label="Timeline" title="Six years, two chapters." />

            <ol className="relative mt-12 border-l border-white/20 pl-8">
              {timeline.map((t) => (
                <li key={t.year} className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[38px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-300 ring-4 ring-brand-900" />
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">
                    {t.year}
                  </p>
                  <h3 className="mt-2 font-headline text-xl font-bold text-white">{t.title}</h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-white/70">{t.body}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* archive photographs */}
          <div className="grid grid-cols-2 gap-3 self-start">
            {storyPhotos.map((p) => (
              <figure
                key={p.caption}
                className="relative flex aspect-[4/3] items-end overflow-hidden rounded-xl border border-white/15 bg-white/[0.07] p-3"
              >
                {p.src && (
                  <Image src={p.src} alt={p.caption} fill className="object-cover" sizes="200px" />
                )}
                <figcaption className="relative text-[10px] uppercase tracking-wider text-white/55">
                  {p.caption}
                </figcaption>
              </figure>
            ))}
            <p className="col-span-2 text-xs leading-relaxed text-white/45">
              Photographs from the Gomti Nagar institute — classroom, whiteboard sessions,
              and Teachers&apos; Day celebrations.
            </p>
          </div>
        </div>
      </Section>

      {/* ---------------- what we built ---------------- */}
      <Section tone="surface">
        <SectionHeading
          label="Chapter one"
          title="Things we built along the way."
          intro="Neither of these is running today. We are keeping them here because they explain how Guruphoria thinks."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <article className="card-hairline p-8">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-100 text-brand-700">
              <MessageSquare className="h-5 w-5" />
            </span>
            <div className="mt-5 flex items-center gap-2.5">
              <h3 className="font-headline text-xl font-bold text-brand-700">Vragger</h3>
              <span className="rounded-full border border-brand-700/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
                Archived
              </span>
            </div>
            <p className="mt-3 leading-relaxed text-foreground/60">
              Our own student Q&amp;A platform. Learners posted questions, answered each
              other, voted on the best explanations and followed topics. We built it because
              a comment thread is a bad place to learn.
            </p>
          </article>

          <article className="card-hairline p-8">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-100 text-brand-700">
              <BookOpen className="h-5 w-5" />
            </span>
            <div className="mt-5 flex items-center gap-2.5">
              <h3 className="font-headline text-xl font-bold text-brand-700">
                The Foundation
              </h3>
              <span className="rounded-full border border-brand-700/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
                Archived
              </span>
            </div>
            <p className="mt-3 leading-relaxed text-foreground/60">
              Free seats for students who could not afford the fees, and a book bank where
              students donated textbooks for others to borrow. It is the reason everything
              we teach today is still free.
            </p>
          </article>
        </div>
      </Section>

      {/* ---------------- proof ---------------- */}
      <Section tone="white">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            label="Still on the record"
            title="Our Lucknow listing is still live."
            intro="The institute is online now, but the reviews from the classroom years have not gone anywhere."
          />
          <div className="flex gap-3">
            {site.ratings.map((r) => (
              <RatingBadge
                key={r.source}
                score={r.score}
                source={r.source}
                count={r.count}
                href={r.href || undefined}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Link
            href="/programs"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-700 px-7 py-3.5 text-sm font-semibold text-white shadow-cta transition hover:bg-brand-500"
          >
            See what we teach
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-brand-700/20 bg-white px-7 py-3.5 text-sm font-semibold text-brand-700 transition hover:border-brand-500 hover:bg-brand-100"
          >
            Get in touch
          </Link>
        </div>
      </Section>
    </>
  );
}
