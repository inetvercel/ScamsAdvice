import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'We Know Who You Are – A Warning to Online Scammers',
  description:
    "A warning to online scammers: VPNs and fake names won't protect you. ScamsAdvice.com investigates and exposes fraudsters, reporting them to law enforcement.",
  alternates: { canonical: 'https://scamsadvice.com/we-know-who-you-are' },
  openGraph: {
    title: 'We Know Who You Are | ScamsAdvice.com',
    description: "A warning to online scammers: VPNs and fake names won't protect you.",
    url: 'https://scamsadvice.com/we-know-who-you-are',
  },
}

export default function WeKnowWhoYouArePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'We Know Who You Are',
    description: 'A warning to online scammers that they can be found and investigated.',
    url: 'https://scamsadvice.com/we-know-who-you-are',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scamsadvice.com' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'We Know Who You Are',
          item: 'https://scamsadvice.com/we-know-who-you-are',
        },
      ],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-[#8b949e]">
            <li>
              <Link href="/" className="hover:text-red-500 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </li>
            <li className="text-[#e6edf3]">We Know Who You Are</li>
          </ol>
        </nav>

        {/* Warning header */}
        <div className="bg-red-950/40 border border-red-700/50 rounded-xl p-6 mb-8 text-center">
          <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#e6edf3] mb-3">We Know Who You Are</h1>
          <p className="text-red-300 text-lg font-medium">
            Think a VPN and a fake name is your safeguard? Think again. We can find you.
          </p>
        </div>

        <div className="post-content space-y-6">
          <p className="text-[#c9d1d9] leading-relaxed">
            Online scammers often believe they are anonymous and untouchable. The reality is that digital forensics, IP tracking, payment records, and social engineering can expose the real identities behind even the most careful fraudsters.
          </p>

          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5">
            <h2 className="text-base font-bold text-[#e6edf3] mb-3">How We Find You</h2>
            <ul className="space-y-2 text-sm text-[#c9d1d9]">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Digital forensics and IP correlation across platforms</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Payment record analysis (PayPal, bank transfers, crypto trails)</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>OSINT (Open Source Intelligence) investigations</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Coordination with law enforcement and fraud reporting bodies</span>
              </li>
            </ul>
          </div>

          <p className="text-[#c9d1d9] leading-relaxed">
            If you are operating a scam and have been reported to us, we will investigate and publish our findings. Law enforcement agencies are also made aware of credible reports.
          </p>

          <p className="text-[#c9d1d9] leading-relaxed">
            If you believe you know the identity of a scammer, please{' '}
            <Link href="/contact" className="text-red-500 hover:text-red-400 underline underline-offset-2">
              contact us confidentially
            </Link>
            . Your identity will be protected.
          </p>

          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5">
            <h2 className="text-base font-bold text-[#e6edf3] mb-2">To the Scammers</h2>
            <p className="text-sm text-[#c9d1d9] leading-relaxed">
              Every scam leaves a trail. Email headers, account registrations, payment details, device fingerprints — the evidence accumulates. The question is not if you will be found, but when.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#8b949e] hover:text-red-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to all articles
          </Link>
        </div>
      </div>
    </>
  )
}
