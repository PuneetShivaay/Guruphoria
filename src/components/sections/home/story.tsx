import Image from 'next/image';
import { Section, SectionHeading, RatingBadge } from '@/components/common/section';
import { storyPhotos, timeline } from '@/content/story';
import { site } from '@/content/site';
import { testimonials } from '@/content/testimonials';

/**
 * Our Story — the deep-blue moment.
 *
 * The deepest logo blue appears exactly twice on the page (here and the footer), which is what
 * makes it feel deliberate. Vragger and the Foundation are told here in past
 * tense; neither is live, so neither belongs in the navigation.
 */
export function Story() {
  return (
    <Section tone="deep" containerClassName="py-20 md:py-28">
      <SectionHeading
        onDeep
        label="Our story"
        title="From a Lucknow classroom to the world."
      />

      <div className="mt-14 grid gap-12 md:grid-cols-[1fr_340px]">
        <ol className="relative border-l border-white/12 pl-8">
          {timeline.map((t) => (
            <li key={t.year} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[38px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-300 ring-4 ring-brand-900" />
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">
                {t.year}
              </p>
              <h3 className="mt-2 font-headline text-xl font-bold text-white">{t.title}</h3>
              <p className="mt-2 max-w-xl leading-relaxed text-white/55">{t.body}</p>
            </li>
          ))}
        </ol>

        <div className="grid grid-cols-2 gap-3 self-start">
          {storyPhotos.map((p) =>
            p.src ? (
              <Image
                key={p.caption}
                src={p.src}
                alt={p.caption}
                width={320}
                height={240}
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
            ) : (
              <div
                key={p.caption}
                className="flex aspect-[4/3] items-end rounded-xl border border-white/10 bg-white/[0.04] p-3"
              >
                <span className="text-[10px] uppercase tracking-wider text-white/35">
                  {p.caption}
                </span>
              </div>
            ),
          )}
          <p className="col-span-2 text-xs leading-relaxed text-white/30">
            Archive photographs — classroom, whiteboard, computers, Teachers&apos; Day.
          </p>
        </div>
      </div>
    </Section>
  );
}

/**
 * Proof — third-party ratings sit beside student quotes on purpose.
 * A verified 5.0 from Google carries more weight than any self-hosted quote.
 */
export function Proof() {
  return (
    <Section tone="surface">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          label="Proof"
          title="200+ students. Real names, real outcomes."
          className="max-w-xl"
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

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure key={i} className="card-hairline flex flex-col p-7">
            <blockquote className="flex-1 font-headline text-lg leading-relaxed tracking-tight text-brand-700">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-brand-700/10 pt-5">
              {t.photo ? (
                <Image
                  src={t.photo}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span className="h-10 w-10 shrink-0 rounded-full bg-brand-100" />
              )}
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{t.name}</span>
                <span className="block truncate text-xs text-foreground/50">
                  {t.program} · {t.year} · Now {t.now}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
