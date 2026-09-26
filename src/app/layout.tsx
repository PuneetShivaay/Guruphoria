import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
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
    icon: '/logo.jpg',
    apple: '/logo.jpg',
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
  themeColor: '#0d539b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
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
              logo: `${site.url}/logo.jpg`,
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
      <body className="font-body antialiased selection:bg-brand-500 selection:text-white">
        <FirebaseClientProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
