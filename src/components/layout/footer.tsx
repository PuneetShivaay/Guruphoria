import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Mail, MapPin, Newspaper, Youtube } from 'lucide-react';
import { site } from '@/content/site';

/**
 * Footer — a light, quiet surface that closes the page.
 *
 * Built entirely on semantic tokens, so it reads as near-white in the light
 * theme and as deep navy in the dark theme without any per-theme overrides.
 *
 * The Lucknow address is the point: a physical address is a trust signal a
 * portfolio site cannot fake, and it backs up the Google listing.
 */

const columns = [
  {
    title: 'Programs',
    links: [
      { label: 'Web Development', href: '/programs/web-development' },
      { label: 'Data & Python', href: '/programs/data-and-python' },
      { label: 'Communication & Personality', href: '/programs/communication-and-personality' },
      { label: 'AI & Emerging Tech', href: '/programs/ai-and-emerging-tech' },
    ],
  },
  {
    title: 'Guruphoria',
    links: [
      { label: 'Mentors', href: '/mentors' },
      { label: 'Our Story', href: '/story' },
      { label: 'Moments', href: '/moments' },
      { label: 'Archive', href: '/live' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

const socials = [
  { label: 'YouTube', href: site.social.youtube, Icon: Youtube },
  { label: 'GitHub', href: site.social.github, Icon: Github },
  { label: 'LinkedIn', href: site.social.linkedin, Icon: Linkedin },
  { label: 'Medium', href: site.social.medium, Icon: Newspaper },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface text-foreground">
      <div className="mx-auto max-w-content px-5 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* ---- brand + address ---- */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 rounded-lg object-contain"
              />
              <span className="font-headline text-xl font-bold text-brand-700">
                {site.name}
              </span>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/65">
              {site.tagline}. Technology, communication and personality — taught live,
              free, since {site.foundedYear}.
            </p>

            <address className="mt-6 space-y-2.5 not-italic">
              <span className="flex items-start gap-2.5 text-xs leading-relaxed text-foreground/60">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.postalCode}
                </span>
              </span>
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-2.5 text-xs text-foreground/60 transition hover:text-brand-700"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                {site.contact.email}
              </a>
            </address>

            <div className="mt-6 flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground/60 transition hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* ---- link columns ---- */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/45">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-foreground/70 transition hover:text-brand-700"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-border pt-7 text-center text-[11px] uppercase tracking-[0.14em] text-foreground/50 sm:mt-14 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-x-6 sm:text-left">
          <span>
            © {new Date().getFullYear()} {site.name} · {site.address.city}, India
          </span>

          <span className="text-foreground/40">
            Designed &amp; developed by{' '}
            <a
              href="https://otical.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground/60 underline-offset-4 transition hover:text-brand-500 hover:underline"
            >
              Otical
            </a>
          </span>

          <span>Free for everyone, always</span>
        </div>
      </div>
    </footer>
  );
}
