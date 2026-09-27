import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ThemeProvider, themeInitScript } from '@/components/providers/theme-provider';
import { site } from '@/content/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Guruphoria | Build Your Essence',
    template: '%s | Guruphoria',
  },
  description: site.description,
  keywords: [
    'Guruphoria',
    'Guruphoria Institute',
    'Lucknow computer institute',
    'free coding classes',
    'web development course',
    'Python Pandas tutorial',
    'English communication class',
    'personality development',
    'AI agents tutorial',
  ],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  authors: [{ name: 'Puneet Shivaay' }],
  publisher: site.legalName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: site.url,
    siteName: site.name,
    title: 'Guruphoria | Build Your Essence',
    description: site.description,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Guruphoria — Build Your Essence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guruphoria | Build Your Essence',
    description: site.description,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0d539b' },
    { media: '(prefers-color-scheme: dark)', color: '#0a131d' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      {/* suppressHydrationWarning: browser extensions (component locators,
          dark-mode add-ons) inject attributes here before React hydrates.
          The flag only applies one level deep, so it is needed on both
          <html> and <head>. */}
      <head suppressHydrationWarning>
        {/* Applies the stored theme before first paint — prevents a flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: site.name,
              alternateName: site.legalName,
              url: site.url,
              logo: `${site.url}/logo.png`,
              slogan: site.tagline,
              description: site.description,
              foundingDate: String(site.foundedYear),
              email: site.contact.email,
              address: {
                '@type': 'PostalAddress',
                streetAddress: site.address.street,
                addressLocality: site.address.city,
                addressRegion: site.address.state,
                postalCode: site.address.postalCode,
                addressCountry: site.address.country,
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5.0',
                reviewCount: 8,
                bestRating: '5',
              },
              founder: {
                '@type': 'Person',
                name: 'Puneet Shivaay',
              },
              sameAs: [
                site.social.youtube,
                site.social.github,
                site.social.medium,
                site.social.linkedin,
              ],
            })
          }}
        />
      </head>
      <body className="overflow-x-hidden font-body antialiased selection:bg-brand-500 selection:text-white">
        <ThemeProvider defaultTheme="light">
          <FirebaseClientProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
