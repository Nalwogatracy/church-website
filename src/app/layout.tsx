import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://christformedchurch.org';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Christ Formed Church International | Kibiri, Munyonyo, Kampala',
    template: '%s | Christ Formed Church International',
  },
  description:
    'Christ Formed Church International in Kibiri, near Munyonyo, Kampala, Uganda. Founded by Pastor Duncan Kirya. Spreading the message of Christ, building faith, and supporting older people and single mothers through the Christ Formed Foundation.',
  keywords: [
    'Christ Formed Church International',
    'Christ Formed Church',
    'Pastor Duncan Kirya',
    'Pastor Valence',
    'Kibiri Church',
    'Munyonyo Church',
    'Kampala Church',
    'Uganda Church',
    'Christ Formed Foundation',
    'Single Mothers Support Uganda',
    'Elder Care Uganda',
    'Christian Ministry Kampala',
    'Sunday Worship Service Kibiri',
  ],
  authors: [{ name: 'Christ Formed Church International' }],
  creator: 'Christ Formed Church International',
  publisher: 'Christ Formed Church International',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  verification: {
    google: 'google2ef24150a5a2879c',
  },
  openGraph: {
    type: 'website',
    locale: 'en_UG',
    url: baseUrl,
    siteName: 'Christ Formed Church International',
    title: 'Christ Formed Church International | Kibiri, Munyonyo, Kampala',
    description:
      'Spreading the message of Christ in Kibiri, near Munyonyo, Kampala, Uganda. Founded by Pastor Duncan Kirya. Empowering community members through faith, teaching, and the Christ Formed Foundation.',
    images: [
      {
        url: `${baseUrl}/images/church-worship-1.jpeg`,
        width: 1200,
        height: 630,
        alt: 'Christ Formed Church International Worship Gathering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Christ Formed Church International | Kibiri, Munyonyo, Kampala',
    description:
      'Welcoming Christian ministry in Kibiri, near Munyonyo, Kampala, Uganda. Spreading Christ’s hope and supporting single mothers & older people.',
    images: [`${baseUrl}/images/church-worship-1.jpeg`],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: 'Christ Formed Church International',
    alternateName: 'Christ Formed Church',
    description:
      'Christian ministry based in Kibiri, near Munyonyo, Kampala, Uganda. Founded on 23rd March 2019 by Pastor Duncan Kirya.',
    url: baseUrl,
    telephone: '+256 700 000000',
    email: 'info@christformedchurch.org',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kibiri, near Munyonyo',
      addressLocality: 'Kampala',
      addressCountry: 'UG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '0.2520',
      longitude: '32.6100',
    },
    founder: {
      '@type': 'Person',
      name: 'Pastor Duncan Kirya',
      jobTitle: 'Founder & Senior Pastor',
    },
    member: [
      {
        '@type': 'Person',
        name: 'Pastor Valence',
        jobTitle: 'Assistant Pastor',
      },
      {
        '@type': 'Person',
        name: 'Miss Flavia',
        jobTitle: 'Administrator',
      },
      {
        '@type': 'Person',
        name: 'Mrs. Christine Kirya',
        jobTitle: 'Assistant',
      },
    ],
    department: [
      {
        '@type': 'Organization',
        name: 'Christ Formed Foundation',
        description:
          'Community support initiative providing financial, social, and practical care to older people and single mothers in Kibiri, Kampala.',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '12:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Wednesday',
        opens: '17:00',
        closes: '19:00',
      },
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
