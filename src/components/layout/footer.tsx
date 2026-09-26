import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Mail, MapPin, Newspaper, Youtube } from 'lucide-react';
import { site } from '@/content/site';

/**
 * Footer — the second and last navy surface on the page.
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
      { label: 'Archive', href: '/archive' },
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
    <footer className="bg-brand-900 text-white">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* ---- brand + address ---- */}
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.jpg"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 rounded-lg object-contain"
              />
              <span className="font-headline text-xl font-bold">{site.name}</span>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              {site.tagline}. Technology, communication and personality — taught live,
              free, since {site.foundedYear}.
            </p>

            <address className="mt-6 space-y-2.5 not-italic">
              <span className="flex items-start gap-2.5 text-xs leading-relaxed text-white/40">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.postalCode}
                </span>
              </span>
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-2.5 text-xs text-white/40 transition hover:text-white"
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
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-white/60 transition hover:border-brand-500 hover:bg-brand-500/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* ---- link columns ---- */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/70 transition hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-7 text-[11px] uppercase tracking-[0.14em] text-white/35">
          <span>
            © {new Date().getFullYear()} {site.name} · {site.address.city}, India
          </span>
          <span>Free for everyone, always</span>
        </div>
      </div>
    </footer>
  );
}
