import { cn } from '@/lib/utils';
import { SectionLabel } from './section';

/**
 * PageHero — the opening band for every inner page.
 *
 * Deliberately lighter than the homepage hero: inner pages should feel like
 * chapters of the same document, not a series of competing landing pages.
 * The faint grid and brand wash tie them back to the homepage without
 * repeating its weight.
 */
export function PageHero({
  label,
  title,
  intro,
  children,
  className,
}: {
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('relative overflow-hidden bg-background', className)}>
      <div className="pointer-events-none absolute inset-0 bg-brand-wash" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden />

      <div className="relative mx-auto max-w-content px-5 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 md:pb-20 md:pt-20">
        <div className="animate-reveal">
          <SectionLabel>{label}</SectionLabel>

          <h1 className="mt-4 max-w-3xl font-headline text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl sm:leading-[1.05] sm:tracking-[-0.025em] md:text-6xl">
            {title}
          </h1>

          {intro && (
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-foreground/60 sm:mt-6 sm:text-lg">
              {intro}
            </p>
          )}

          {children}
        </div>
      </div>
    </section>
  );
}
