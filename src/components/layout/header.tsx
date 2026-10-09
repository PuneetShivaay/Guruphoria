'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, Youtube, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { site } from '@/content/site';

/**
 * Light, institutional header.
 *
 * The logo is blue-on-white, so a white bar lets it sit natively — no mono
 * variant needed. A hairline bottom border appears only after scroll so the
 * hero reads as one uninterrupted surface at the top of the page.
 */

const navLinks = [
  { name: 'Programs', href: '/programs' },
  { name: 'Mentors', href: '/mentors' },
  { name: 'Live', href: '/live' },
  { name: 'Blog', href: '/blog' },
  { name: 'Story', href: '/story' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile sheet whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  // Prevent background scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-background/85 backdrop-blur-md transition-shadow duration-300',
        scrolled ? 'border-b border-brand-700/10 shadow-hairline' : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6 md:h-20">
        {/* ---- brand ---- */}
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Guruphoria home">
          <Image
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            className="h-9 w-9 rounded-lg object-contain md:h-10 md:w-10"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="font-headline text-lg font-bold tracking-tight text-brand-700 md:text-xl">
              Guruphoria
            </span>
            <span className="mt-0.5 hidden text-[9px] font-medium uppercase tracking-[0.16em] text-foreground/40 sm:block">
              {site.tagline}
            </span>
          </span>
        </Link>

        {/* ---- desktop nav ---- */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'relative text-sm font-medium transition-colors',
                  active ? 'text-brand-700' : 'text-foreground/60 hover:text-brand-700',
                )}
              >
                {link.name}
                <span
                  className={cn(
                    'absolute -bottom-1.5 left-0 h-px bg-brand-500 transition-all duration-300',
                    active ? 'w-full' : 'w-0',
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* ---- actions ---- */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link
            href={site.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-cta transition hover:bg-brand-500 sm:inline-flex"
          >
            <Youtube className="h-4 w-4" />
            Subscribe
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-brand-700 transition hover:bg-brand-100 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ---- mobile sheet ---- */}
      {open && (
        <div className="border-t border-brand-700/10 bg-background lg:hidden">
          <nav className="mx-auto flex max-w-content flex-col px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="border-b border-brand-700/8 py-3.5 text-base font-medium text-foreground/75 transition hover:text-brand-700"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href={site.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-brand-700 px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Youtube className="h-4 w-4" />
              Subscribe — Free
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
