import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { pages } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Scamdex – Index of Known Online Scammers',
  description:
    'Scamdex: The definitive index of known and suspected online scammers. Find emails, usernames, and websites linked to fraud, phishing, and marketing scams.',
  alternates: { canonical: 'https://scamsadvice.com/scamdex' },
  openGraph: {
    title: 'Scamdex – Index of Known Online Scammers | ScamsAdvice.com',
    description: 'The definitive index of known and suspected online scammers.',
    url: 'https://scamsadvice.com/scamdex',
  },
}

export default function ScamdexPage() {
  const page = pages.find((p) => p.slug === 'scamdex')!

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.metaDescription,
    url: 'https://scamsadvice.com/scamdex',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scamsadvice.com' },
        { '@type': 'ListItem', position: 2, name: 'Scamdex', item: 'https://scamsadvice.com/scamdex' },
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
            <li><Link href="/" className="hover:text-red-500 transition-colors">Home</Link></li>
            <li aria-hidden="true">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </li>
            <li className="text-[#e6edf3]">Scamdex</li>
          </ol>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#e6edf3]">Scamdex</h1>
          </div>
          <p className="text-[#8b949e] text-lg leading-relaxed">
            The index of known and suspected online scammers. If you find an email, username, or website listed here — avoid that person.
          </p>
        </header>

        {/* Warning */}
        <div className="bg-red-950/30 border border-red-800/40 rounded-lg p-4 mb-8 flex gap-3">
          <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <p className="text-sm text-red-300 leading-relaxed">
            All entries have been reported or investigated. Those involved with scams will continue to be added. If you know of a scammer not listed, please{' '}
            <Link href="/contact" className="underline underline-offset-2 hover:text-red-200">contact us</Link>.
          </p>
        </div>

        {/* Scammer entries */}
        <div className="space-y-5">
          <div className="bg-[#161b22] border border-[#30363d] border-l-4 border-l-red-600 rounded-r-lg p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <span className="text-xs bg-red-900/40 text-red-400 px-2 py-0.5 rounded-full font-medium">Marketing Fraud</span>
              </div>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm mb-4">
              <div>
                <dt className="text-[#8b949e] text-xs uppercase tracking-wider font-medium mb-0.5">Email</dt>
                <dd className="text-[#e6edf3] font-mono text-xs">mail.grunbaum@gmail.com</dd>
              </div>
              <div>
                <dt className="text-[#8b949e] text-xs uppercase tracking-wider font-medium mb-0.5">LinkedIn</dt>
                <dd className="text-[#e6edf3] text-xs">Pablo Grunbaum (Presumed Fake)</dd>
              </div>
              <div>
                <dt className="text-[#8b949e] text-xs uppercase tracking-wider font-medium mb-0.5">Platform</dt>
                <dd className="text-[#e6edf3] text-xs">Email, LinkedIn</dd>
              </div>
              <div>
                <dt className="text-[#8b949e] text-xs uppercase tracking-wider font-medium mb-0.5">Scam Type</dt>
                <dd className="text-[#e6edf3] text-xs">Middle Man Marketing Scam</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[#8b949e] text-xs uppercase tracking-wider font-medium mb-0.5">Involvement</dt>
                <dd className="text-[#e6edf3] text-xs">
                  <a href="http://cryptofairplay.com" rel="nofollow noopener" target="_blank" className="text-red-500 hover:text-red-400 underline underline-offset-2">cryptofairplay.com</a>
                </dd>
              </div>
            </dl>
            <Link href="/usernames-and-emails-relating-to-scams" className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:text-red-400 font-medium transition-colors">
              Read full report
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] border-l-4 border-l-red-600 rounded-r-lg p-5">
            <div className="mb-3">
              <span className="text-xs bg-orange-900/40 text-orange-400 px-2 py-0.5 rounded-full font-medium">Google Ads Fraud</span>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm mb-4">
              <div>
                <dt className="text-[#8b949e] text-xs uppercase tracking-wider font-medium mb-0.5">Username</dt>
                <dd className="text-[#e6edf3] font-mono text-xs">seosea01</dd>
              </div>
              <div>
                <dt className="text-[#8b949e] text-xs uppercase tracking-wider font-medium mb-0.5">Platform</dt>
                <dd className="text-[#e6edf3] text-xs">Freelancer.com</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-[#8b949e] text-xs uppercase tracking-wider font-medium mb-0.5">Scam Type</dt>
                <dd className="text-[#e6edf3] text-xs">Hijacking Google Ads accounts, spending victim&apos;s payment card</dd>
              </div>
            </dl>
            <Link href="/google-ads-dont-become-a-victim-of-fraud" className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:text-red-400 font-medium transition-colors">
              Read full report
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] border-l-4 border-l-yellow-600 rounded-r-lg p-5">
            <div className="mb-3">
              <span className="text-xs bg-yellow-900/40 text-yellow-400 px-2 py-0.5 rounded-full font-medium">Under Investigation</span>
            </div>
            <dl className="grid grid-cols-1 gap-y-2 text-sm mb-3">
              <div>
                <dt className="text-[#8b949e] text-xs uppercase tracking-wider font-medium mb-0.5">LinkedIn</dt>
                <dd className="text-xs">
                  <a href="https://www.linkedin.com/in/rock-099992158/" rel="nofollow noopener" target="_blank" className="text-red-500 hover:text-red-400 underline underline-offset-2 break-all">
                    https://www.linkedin.com/in/rock-099992158/
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Evidence screenshot */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-[#e6edf3] mb-4">Evidence</h2>
          <figure className="rounded-lg overflow-hidden border border-[#30363d]">
            <Image
              src="/images/scamdex-evidence.png"
              alt="Scamdex evidence screenshot showing scammer investigation"
              width={1010}
              height={488}
              className="w-full h-auto"
            />
          </figure>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#8b949e] hover:text-red-500 transition-colors">
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
