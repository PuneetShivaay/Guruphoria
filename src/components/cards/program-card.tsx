import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Chip } from '@/components/common/section';
import type { Program } from '@/content/programs';
import { cn } from '@/lib/utils';

/**
 * ProgramCard — shared by the homepage and the /programs index so the two can
 * never drift apart.
 *
 * The numbered module list is what makes a playlist read as a syllabus. The
 * `growing` status renders a distinct chip so a thin catalogue is never
 * presented as a mature one.
 */
export function ProgramCard({
  program,
  className,
}: {
  program: Program;
  className?: string;
}) {
  return (
    <article className={cn('card-hairline flex flex-col p-6 sm:p-8', className)}>
      <div className="flex flex-wrap items-center gap-2">
        {program.status === 'growing' ? (
          <Chip tone="live">New · Growing</Chip>
        ) : (
          <Chip>{program.category}</Chip>
        )}
        {program.languages.map((l) => (
          <Chip key={l}>{l}</Chip>
        ))}
      </div>

      <h3 className="mt-5 font-headline text-xl font-bold tracking-tight text-brand-700 sm:text-2xl">
        {program.title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-foreground/60 sm:text-base">
        {program.blurb}
      </p>

      <ol className="mt-6 flex-1 space-y-2.5 border-t border-brand-700/10 pt-6">
        {program.modules.map((m, i) => (
          <li key={m.title} className="flex items-baseline gap-3 text-sm text-foreground/70">
            <span className="w-5 shrink-0 font-mono text-xs text-brand-500">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>
              {m.title}
              {m.lessons ? <span className="ml-1.5 text-foreground/35">· {m.lessons}</span> : null}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-7 flex items-center justify-between pt-1">
        <span className="text-xs font-medium uppercase tracking-wider text-foreground/40">
          {program.countLabel}
        </span>
        <Link
          href={`/programs/${program.slug}`}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500"
        >
          View program
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
