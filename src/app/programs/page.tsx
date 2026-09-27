import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/common/page-hero';
import { Section, SectionHeading, StatStrip } from '@/components/common/section';
import { ProgramCard } from '@/components/cards/program-card';
import { audiences, programs } from '@/content/programs';
import { library } from '@/content/site';

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'Four free programs: Web Development, Data & Python, Communication & Personality, and a growing AI & Emerging Tech Lab. Taught live in English and Hinglish.',
};

const totals = [
  { value: String(programs.length), label: 'Programs' },
  { value: String(library.videos), label: 'Lessons' },
  { value: String(library.liveClasses), label: 'Live classes' },
  { value: '₹0', label: 'Cost to you' },
];

export default function ProgramsPage() {
  const careerSkills = programs.filter((program) => program.category === 'Career Skills');
  const aiTrack = programs.filter((program) => program.category === 'AI Track');
  const bySlug = new Map(programs.map((program) => [program.slug, program]));

  return (
    <>
      <PageHero
        label="Programs"
        title={
          <>
            Career skills, and a
            <span className="text-brand-gradient"> growing AI track.</span>
          </>
        }
        intro="Structured, sequenced curricula — not playlists. Every lesson is free, taught live by our mentors in English and Hinglish."
      >
        <StatStrip items={totals} className="mt-12" />
      </PageHero>

      {/* ---------------- career skills ---------------- */}
      <Section tone="surface">
        <SectionHeading
          label="Career Skills"
          title="The foundation."
          intro="What gets you hired: the ability to build, the ability to work with data, and the ability to speak for yourself in a room."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {careerSkills.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </Section>

      {/* ---------------- ai track ---------------- */}
      <Section tone="white">
        <SectionHeading
          label="AI Track"
          title="New, and growing in public."
          intro="Our newest work. We are honest about its size — this is a lab that is filling up, not a finished catalogue."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {aiTrack.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </Section>

      {/* ---------------- two doors ---------------- */}
      <Section tone="surface">
        <SectionHeading
          label="Not sure where to start?"
          title="Pick the path that matches you."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {audiences.map((audience) => (
            <div key={audience.id} className="card-hairline p-8">
              <h3 className="font-headline text-2xl font-bold tracking-tight text-brand-700">
                {audience.title}
              </h3>
              <p className="mt-3 leading-relaxed text-foreground/60">{audience.blurb}</p>

              <ol className="mt-6 space-y-3 border-t border-brand-700/10 pt-6">
                {audience.programs.map((slug, index) => {
                  const program = bySlug.get(slug);
                  if (!program) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/programs/${slug}`}
                        className="group flex items-baseline gap-3 text-sm text-foreground/75 transition hover:text-brand-700"
                      >
                        <span className="w-5 shrink-0 font-mono text-xs text-brand-500">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1">{program.title}</span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-brand-500 opacity-0 transition group-hover:opacity-100" />
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
