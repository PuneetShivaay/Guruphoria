import type { Metadata } from 'next';
import Link from 'next/link';
import { Github, Linkedin, Mail, MapPin, Newspaper, Youtube } from 'lucide-react';
import { PageHero } from '@/components/common/page-hero';
import { Section, SectionHeading } from '@/components/common/section';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Guruphoria — questions about our free programs, teaching with us, or anything else.',
};

const reasons = [
  {
    title: 'I have a question about a program',
    body: 'Ask about the curriculum, where to start, or what order to watch things in.',
  },
  {
    title: 'I want to teach with Guruphoria',
    body: 'We are growing the faculty in technology, communication and personality development.',
  },
  {
    title: 'I studied here before',
    body: 'We are collecting stories from our Gomti Nagar students. We would love to hear yours.',
  },
];

const channels = [
  { label: 'YouTube', value: '@guruphoria', href: site.social.youtube, Icon: Youtube },
  { label: 'GitHub', value: 'PuneetShivaay', href: site.social.github, Icon: Github },
  { label: 'LinkedIn', value: 'Guruphoria', href: site.social.linkedin, Icon: Linkedin },
  { label: 'Medium', value: 'puneetshivaay', href: site.social.medium, Icon: Newspaper },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title={
          <>
            Say hello.
            <span className="text-brand-gradient"> We read everything.</span>
          </>
        }
        intro="Questions about a program, interest in teaching with us, or a story from the classroom years — all of it is welcome."
      />

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* ---------------- reasons + form ---------------- */}
          <div>
            <SectionHeading label="Get in touch" title="What brings you here?" />

            <ul className="mt-10 space-y-px overflow-hidden rounded-2xl border border-brand-700/12 bg-brand-700/12">
              {reasons.map((reason, index) => (
                <li key={reason.title} className="flex items-baseline gap-5 bg-card px-6 py-5">
                  <span className="w-7 shrink-0 font-mono text-sm text-brand-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block font-medium text-foreground/85">{reason.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-foreground/50">
                      {reason.body}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 card-hairline p-8">
              <h3 className="font-headline text-xl font-bold text-brand-700">
                Email us directly
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">
                The fastest way to reach us. We usually reply within a couple of days.
              </p>
              <a
                href={`mailto:${site.contact.email}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-700 px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-cta transition hover:bg-brand-500"
              >
                <Mail className="h-4 w-4" />
                {site.contact.email}
              </a>
            </div>
          </div>

          {/* ---------------- details ---------------- */}
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="card-hairline p-6">
              <h2 className="text-[11px] font-semibold uppercase tracking-label text-brand-500">
                Where we started
              </h2>
              <address className="mt-4 flex items-start gap-3 not-italic">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <span className="text-sm leading-relaxed text-foreground/70">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state}
                  <br />
                  {site.address.postalCode}, India
                </span>
              </address>
              <p className="mt-4 border-t border-brand-700/10 pt-4 text-xs leading-relaxed text-foreground/45">
                Guruphoria now teaches entirely online. This is where the institute began
                in {site.foundedYear}.
              </p>
            </div>

            <div className="card-hairline p-6">
              <h2 className="text-[11px] font-semibold uppercase tracking-label text-brand-500">
                Find us
              </h2>
              <ul className="mt-4 space-y-1">
                {channels.map(({ label, value, href, Icon }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-lg px-2 py-2.5 transition hover:bg-brand-50"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-brand-500" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-foreground/80">
                          {label}
                        </span>
                        <span className="block truncate text-xs text-foreground/45">
                          {value}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
