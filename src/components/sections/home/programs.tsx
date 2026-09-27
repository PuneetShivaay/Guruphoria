import { Section, SectionHeading } from '@/components/common/section';
import { ProgramCard } from '@/components/cards/program-card';
import { programs } from '@/content/programs';

/**
 * Programs — playlists restructured into numbered curricula.
 *
 * Card markup lives in ProgramCard so this section and the /programs index
 * can never drift apart.
 */
export function Programs() {
  return (
    <Section tone="surface">
      <SectionHeading
        label="Programs"
        title="Four programs. Every lesson free."
        intro="Structured, sequenced curricula — not playlists. Start at lesson one and work through to something you can put on a résumé."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {programs.map((program) => (
          <ProgramCard key={program.slug} program={program} />
        ))}
      </div>
    </Section>
  );
}
