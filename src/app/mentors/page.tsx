import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Linkedin, Plus } from 'lucide-react';
import { PageHero } from '@/components/common/page-hero';
import { Chip, Section, SectionHeading } from '@/components/common/section';
import { initialsOf, mentors } from '@/content/mentors';
import { programs } from '@/content/programs';

export const metadata: Metadata = {
  title: 'Mentors',
  description:
    'Guruphoria is taught by a team of mentors, live, in English and Hinglish. Meet the people who teach our programs.',
};

export default function MentorsPage() {
  const faculty = mentors.filter((m) => !m.placeholder);
  const bySlug = new Map(programs.map((p) => [p.slug, p]));

  return (
    <>
      <PageHero
        label="Mentors"
        title={
          <>
            Taught by people,
            <span className="text-brand-gradient"> not a platform.</span>
          </>
        }
        intro="Guruphoria has always been a team. Our mentors teach live, answer questions in the chat, and stay after the session ends."
      />

      {/* ---------------- faculty ---------------- */}
      <Section tone="surface">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {faculty.map((m) => (
            <article key={m.slug} className="card-hairline flex min-w-0 flex-col p-6 sm:p-7">
              <div className="flex min-w-0 items-center gap-4">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={m.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-brand-100 font-headline text-lg font-bold text-brand-700">
                    {initialsOf(m.name)}
                  </span>
                )}

                <div className="min-w-0">
                  <h2 className="truncate font-headline text-lg font-bold text-brand-700">
                    {m.name}
                  </h2>
                  <p className="truncate text-sm text-foreground/55">{m.role}</p>
                  {m.upcoming && (
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-label text-brand-500">
                      Sessions coming soon
                    </p>
                  )}
                </div>
              </div>

              <p className="mt-5 flex-1 text-sm leading-relaxed text-foreground/60">{m.bio}</p>

              {m.languages.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {m.languages.map((l) => (
                    <Chip key={l}>{l}</Chip>
                  ))}
                </div>
              )}

              {m.teaches.length > 0 && (
                <div className="mt-5 border-t border-brand-700/10 pt-5">
                  <p className="text-[10px] font-semibold uppercase tracking-label text-foreground/35">
                    Teaches
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {m.teaches.map((slug) => (
                      <li key={slug}>
                        <Link
                          href={`/programs/${slug}`}
                          className="group inline-flex items-center gap-1.5 text-sm text-foreground/70 transition hover:text-brand-700"
                        >
                          <span className="h-1 w-1 rounded-full bg-brand-500" />
                          {bySlug.get(slug)?.title ?? slug}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {m.linkedin && (
                <Link
                  href={m.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${m.name} on LinkedIn`}
                  className="mt-5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-700/15 text-brand-700/60 transition hover:border-brand-500 hover:text-brand-700"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </Link>
              )}
            </article>
          ))}
        </div>
      </Section>

      {/* ---------------- teach with us ---------------- */}
      <Section tone="white">
        <div className="card-hairline flex flex-col items-start gap-8 p-10 md:flex-row md:items-center md:justify-between md:p-12">
          <div className="max-w-xl">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-100 text-brand-700">
              <Plus className="h-5 w-5" />
            </span>
            <h2 className="mt-5 font-headline text-2xl font-bold tracking-tight text-brand-700 md:text-3xl">
              Teach with us.
            </h2>
            <p className="mt-3 leading-relaxed text-foreground/60">
              We are growing the faculty. If you teach technology, communication or
              personality development — in English or Hinglish — we would like to hear
              from you.
            </p>
          </div>

          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-700 px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-cta transition hover:bg-brand-500"
          >
            Get in touch
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Section>
    </>
  );
}
