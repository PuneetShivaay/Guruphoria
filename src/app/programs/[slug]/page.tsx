import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Play, Youtube } from 'lucide-react';
import { PageHero } from '@/components/common/page-hero';
import { Chip, Section, SectionHeading } from '@/components/common/section';
import { ProgramCard } from '@/components/cards/program-card';
import { programs } from '@/content/programs';
import { initialsOf, mentors } from '@/content/mentors';
import { site } from '@/content/site';

type Params = { params: Promise<{ slug: string }> };

/** Pre-render every program at build time. */
export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const program = programs.find((candidate) => candidate.slug === slug);
  if (!program) return {};

  return {
    title: program.title,
    description: program.blurb,
    openGraph: {
      title: `${program.title} | Guruphoria`,
      description: program.blurb,
    },
  };
}

export default async function ProgramDetailPage({ params }: Params) {
  const { slug } = await params;
  const program = programs.find((candidate) => candidate.slug === slug);
  if (!program) notFound();

  const taughtBy = mentors.filter(
    (mentor) =>
      !mentor.placeholder &&
      mentor.subjects.some((subject) => subject.programSlug === program.slug),
  );
  const others = programs.filter((other) => other.slug !== program.slug).slice(0, 2);

  return (
    <>
      <PageHero
        label={program.status === 'growing' ? 'AI Track · New' : program.category}
        title={program.title}
        intro={program.blurb}
      >
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {program.status === 'growing' && <Chip tone="live">New · Growing</Chip>}
          {program.languages.map((language) => (
            <Chip key={language}>{language}</Chip>
          ))}
          <Chip>{program.countLabel}</Chip>
          <Chip tone="live">Free</Chip>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href={site.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-cta transition hover:bg-brand-500"
          >
            <Play className="h-4 w-4 fill-current" />
            Start lesson one
          </Link>
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-brand-700 transition hover:border-brand-500 hover:bg-brand-100"
          >
            <ArrowLeft className="h-4 w-4" />
            All programs
          </Link>
        </div>
      </PageHero>

      {/* ---------------- curriculum ---------------- */}
      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <SectionHeading
              label="Curriculum"
              title="What you will work through."
              intro="Open syllabus. Nothing is gated, and nothing is hidden behind a signup."
            />

            <ol className="mt-10 space-y-px overflow-hidden rounded-2xl border border-brand-700/12 bg-brand-700/12">
              {program.modules.map((module, index) => (
                <li
                  key={module.title}
                  className="flex items-baseline gap-5 bg-card px-6 py-5 transition hover:bg-brand-50"
                >
                  <span className="w-7 shrink-0 font-mono text-sm text-brand-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium text-foreground/85">{module.title}</span>
                    {module.source && (
                      <span className="mt-1 block text-xs text-foreground/40">
                        Playlist: {module.source}
                      </span>
                    )}
                  </span>
                  {module.lessons && (
                    <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-foreground/40">
                      {module.lessons} lessons
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* ---------------- sidebar ---------------- */}
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            {taughtBy.length > 0 && (
              <div className="card-hairline p-6">
                <h2 className="text-[11px] font-semibold uppercase tracking-label text-brand-500">
                  Taught by
                </h2>
                <ul className="mt-4 space-y-4">
                  {taughtBy.map((mentor) => (
                    <li key={mentor.slug} className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-100 font-headline text-xs font-bold text-brand-700">
                        {initialsOf(mentor.name)}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-brand-700">
                          {mentor.name}
                        </span>
                        <span className="block truncate text-xs text-foreground/50">
                          {mentor.upcoming ? 'Sessions coming soon' : mentor.role}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/mentors"
                  className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500"
                >
                  All mentors
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )}

            <div className="card-hairline p-6">
              <h2 className="text-[11px] font-semibold uppercase tracking-label text-brand-500">
                At a glance
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-foreground/50">Lessons</dt>
                  <dd className="font-medium text-foreground/85">{program.lessonCount}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-foreground/50">Language</dt>
                  <dd className="font-medium text-foreground/85">
                    {program.languages.join(' · ')}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-foreground/50">Format</dt>
                  <dd className="font-medium text-foreground/85">Live &amp; recorded</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-foreground/50">Price</dt>
                  <dd className="font-medium text-live">Free</dd>
                </div>
              </dl>
            </div>

            <Link
              href={site.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-brand-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              <Youtube className="h-4 w-4" />
              Watch on YouTube
            </Link>
          </aside>
        </div>
      </Section>

      {/* ---------------- keep going ---------------- */}
      <Section tone="white">
        <SectionHeading label="Keep going" title="Other programs." />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {others.map((otherProgram) => (
            <ProgramCard key={otherProgram.slug} program={otherProgram} />
          ))}
        </div>
      </Section>
    </>
  );
}
