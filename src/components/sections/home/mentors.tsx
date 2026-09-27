import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Plus } from 'lucide-react';
import { Chip, Section, SectionHeading } from '@/components/common/section';
import { initialsOf, mentors } from '@/content/mentors';

/**
 * Mentors — the single most important section for killing the "portfolio"
 * perception. A named team with a visible "joining soon" slot reads as an
 * institute that is growing, not one person's showcase.
 */
export function Mentors() {
  return (
    <Section tone="white">
      <SectionHeading
        label="Mentors"
        title="Taught by people, not a platform."
        intro="Guruphoria is a team. Our mentors teach live in English and Hinglish."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mentors.map((mentor) =>
          mentor.placeholder ? (
            <Link
              key={mentor.slug}
              href="/contact"
              className="group flex min-w-0 items-center gap-4 rounded-2xl border border-dashed border-brand-700/20 p-5 transition hover:border-brand-500/60 hover:bg-brand-50"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-dashed border-brand-700/25 text-brand-500">
                <Plus className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-brand-700">{mentor.name}</span>
                <span className="block text-sm text-foreground/55">{mentor.role}</span>
                <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-brand-500">
                  Teach with us
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          ) : (
            <article
              key={mentor.slug}
              className="card-hairline flex min-w-0 items-center gap-4 p-5"
            >
              {mentor.photo ? (
                <Image
                  src={mentor.photo}
                  alt={mentor.name}
                  width={56}
                  height={56}
                  className="h-14 w-14 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-100 font-headline text-base font-bold text-brand-700">
                  {initialsOf(mentor.name)}
                </span>
              )}

              <div className="min-w-0">
                <h3 className="truncate font-semibold text-brand-700">{mentor.name}</h3>
                <p className="truncate text-sm text-foreground/55">{mentor.role}</p>
                {mentor.languages.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {mentor.languages.map((language) => (
                      <Chip key={language}>{language}</Chip>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ),
        )}
      </div>
    </Section>
  );
}
