import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeading, SectionLabel } from '@/components/common/section';
import { audiences, programs } from '@/content/programs';

/**
 * Chapter Two — the relaunch, stated once, plainly.
 * A single large sentence between two denser sections. Whitespace is the
 * cheapest luxury signal we have.
 */
export function ChapterTwo() {
  return (
    <Section tone="surface" containerClassName="py-16 md:py-20">
      <div className="grid gap-10 md:grid-cols-[180px_1fr]">
        <SectionLabel>Chapter Two</SectionLabel>
        <p className="font-headline text-2xl leading-snug tracking-tight text-brand-700 md:text-[2rem] md:leading-[1.35]">
          Guruphoria taught 200+ students from a classroom in Lucknow. Then it paused.
          In 2026 it is back — online, open to anyone, and free for good.
        </p>
      </div>
    </Section>
  );
}

/**
 * Two Doors — students and working professionals want different things.
 * Splitting them beats blending both into vague copy.
 */
export function TwoDoors() {
  const bySlug = new Map(programs.map((program) => [program.slug, program]));

  return (
    <Section tone="white">
      <SectionHeading label="Start here" title="Where are you right now?" />

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {audiences.map((audience) => (
          <Link
            key={audience.id}
            href={`/programs?for=${audience.id}`}
            className="card-hairline group p-8"
          >
            <h3 className="font-headline text-2xl font-bold tracking-tight text-brand-700">
              {audience.title}
            </h3>
            <p className="mt-3 leading-relaxed text-foreground/60">{audience.blurb}</p>

            <ul className="mt-6 space-y-2">
              {audience.programs.map((slug) => (
                <li key={slug} className="flex items-center gap-2.5 text-sm text-foreground/75">
                  <span className="h-1 w-1 rounded-full bg-brand-500" />
                  {bySlug.get(slug)?.title ?? slug}
                </li>
              ))}
            </ul>

            <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500">
              Explore this path
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
