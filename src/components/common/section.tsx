import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ *
 * Section — consistent vertical rhythm and background banding.
 * Every homepage section should use this rather than ad-hoc padding.
 * ------------------------------------------------------------------ */

type Tone = 'white' | 'surface' | 'deep' | 'brand' | 'brandLight';

const toneClass: Record<Tone, string> = {
  white: 'bg-background text-foreground',
  surface: 'bg-surface text-foreground border-y border-border',
  deep: 'bg-brand-900 text-white',
  // In dark mode brand-600/700 are light blues (they read as ink, not as a
  // surface), so the saturated brand bands fall back to the deep navies.
  brand: 'bg-brand-700 text-white dark:bg-brand-900',
  /** One step lighter than brand, so adjacent brand surfaces stay distinct. */
  brandLight: 'bg-brand-600 text-white dark:bg-brand-800',
};

export function Section({
  tone = 'white',
  className,
  containerClassName,
  children,
}: {
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn('relative', toneClass[tone], className)}>
      <div className={cn('mx-auto max-w-content px-6 py-20 md:py-24', containerClassName)}>
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * SectionLabel — the small uppercase kicker above every heading.
 * ------------------------------------------------------------------ */

export function SectionLabel({
  children,
  onDeep,
  className,
}: {
  children: React.ReactNode;
  onDeep?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'text-[11px] font-semibold uppercase tracking-label',
        onDeep ? 'text-brand-300' : 'text-brand-500',
        className,
      )}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ *
 * SectionHeading — label + title + optional intro, consistently spaced.
 * ------------------------------------------------------------------ */

export function SectionHeading({
  label,
  title,
  intro,
  onDeep,
  className,
}: {
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  onDeep?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <SectionLabel onDeep={onDeep}>{label}</SectionLabel>
      <h2
        className={cn(
          'mt-4 text-3xl font-bold tracking-tight md:text-4xl',
          onDeep ? 'text-white' : 'text-foreground',
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed md:text-lg',
            onDeep ? 'text-white/65' : 'text-foreground/55',
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Chip — small metadata pill. `live` tone is reserved for FREE/LIVE/NEW.
 * ------------------------------------------------------------------ */

export function Chip({
  children,
  tone = 'muted',
  className,
}: {
  children: React.ReactNode;
  tone?: 'muted' | 'live' | 'onDeep';
  className?: string;
}) {
  const tones = {
    muted: 'bg-brand-100 text-brand-700 border-transparent',
    live: 'bg-live/10 text-live border-live/25',
    onDeep: 'bg-white/10 text-white/80 border-white/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * StatStrip — honest numbers, hairline dividers.
 * ------------------------------------------------------------------ */

export function StatStrip({
  items,
  onDeep,
  className,
}: {
  items: ReadonlyArray<{ value: string; label: string }>;
  onDeep?: boolean;
  className?: string;
}) {
  return (
    <dl
      className={cn(
        'grid grid-cols-2 gap-px overflow-hidden rounded-2xl border md:grid-cols-4',
        onDeep ? 'border-white/15 bg-white/15' : 'border-border bg-brand-700/12',
        className,
      )}
    >
      {items.map((s) => (
        <div key={s.label} className={cn('px-6 py-7', onDeep ? 'bg-brand-900' : 'bg-card')}>
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span
              className={cn(
                'block font-headline text-3xl font-bold',
                onDeep ? 'text-white' : 'text-brand-700',
              )}
            >
              {s.value}
            </span>
            <span
              className={cn(
                'mt-1.5 block text-[11px] font-medium uppercase tracking-[0.14em]',
                onDeep ? 'text-white/55' : 'text-foreground/45',
              )}
            >
              {s.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ *
 * RatingBadge — third-party verified proof (Google, JustDial).
 * ------------------------------------------------------------------ */

export function RatingBadge({
  score,
  source,
  count,
  href,
}: {
  score: string;
  source: string;
  count: number;
  href?: string;
}) {
  const inner = (
    <>
      <div className="font-headline text-xl font-bold text-brand-700">{score} ★</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-foreground/45">
        {source} · {count} reviews
      </div>
    </>
  );

  const classes =
    'block rounded-xl border border-border bg-card px-5 py-3 transition hover:border-brand-500/50';

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {inner}
    </a>
  ) : (
    <div className={classes}>{inner}</div>
  );
}
