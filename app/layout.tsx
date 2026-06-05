import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://scamsadvice.com'),
  title: {
    default: 'ScamsAdvice.com – Exposing Online Scams',
    template: '%s | ScamsAdvice.com',
  },
  description:
    'ScamsAdvice.com exposes online scams, SEO fraud, Google Ads fraud, and deceptive marketing tactics. Protecting website owners and businesses from internet scammers.',
  keywords: [
    'online scams',
    'SEO scammers',
    'Google Ads fraud',
    'internet fraud',
    'scam advice',
    'scam warning',
    'link building scam',
    'marketing fraud',
  ],
  authors: [{ name: 'ScamsAdvice.com' }],
  creator: 'ScamsAdvice.com',
  publisher: 'ScamsAdvice.com',
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
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://scamsadvice.com',
    siteName: 'ScamsAdvice.com',
    title: 'ScamsAdvice.com – Exposing Online Scams',
    description:
      'ScamsAdvice.com exposes online scams, SEO fraud, Google Ads fraud, and deceptive marketing tactics.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScamsAdvice.com – Exposing Online Scams',
    description:
      'ScamsAdvice.com exposes online scams, SEO fraud, Google Ads fraud, and deceptive marketing tactics.',
  },
  alternates: {
    canonical: 'https://scamsadvice.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'ScamsAdvice.com',
              url: 'https://scamsadvice.com',
              description: 'Exposing online scams and protecting people from internet fraud.',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://scamsadvice.com/?s={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0d1117] text-[#e6edf3]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
