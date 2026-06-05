import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Scam Baiters – People Fighting Back Against Scammers',
  description:
    'Discover top scam baiters who expose online fraudsters and waste scammers\' time. These content creators help protect millions of people from internet scams.',
  alternates: { canonical: 'https://scamsadvice.com/scam-baiters' },
  openGraph: {
    title: 'Scam Baiters | ScamsAdvice.com',
    description: 'Top scam baiters who expose online fraudsters and fight back against internet scammers.',
    url: 'https://scamsadvice.com/scam-baiters',
  },
}

export default function ScamBaitersPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Scam Baiters',
    description: 'Discover top scam baiters who expose online fraudsters.',
    url: 'https://scamsadvice.com/scam-baiters',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scamsadvice.com' },
        { '@type': 'ListItem', position: 2, name: 'Scam Baiters', item: 'https://scamsadvice.com/scam-baiters' },
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
            <li className="text-[#e6edf3]">Scam Baiters</li>
          </ol>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#e6edf3]">Scam Baiters</h1>
          <p className="mt-3 text-[#8b949e] text-lg leading-relaxed">
            Scam baiters are individuals who respond to scammers to waste their time, expose their methods, and protect potential victims. Here are some of the best.
          </p>
        </header>

        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 mb-6">
          <p className="text-sm text-[#8b949e] leading-relaxed">
            By wasting a scammer&apos;s time, scam baiters directly reduce the number of real victims those scammers can reach. Each minute a scammer spends on a baiter is a minute they&apos;re not targeting a vulnerable person.
          </p>
        </div>

        {/* KitBoga entry */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-900/20 to-transparent p-5 border-b border-[#30363d]">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-red-500">#1</span>
              <div>
                <h2 className="text-xl font-bold text-[#e6edf3]">KitBoga</h2>
                <p className="text-xs text-[#8b949e]">Twitch Streamer & Scam Baiter</p>
              </div>
            </div>
          </div>

          <div className="p-5">
            <p className="text-[#c9d1d9] text-sm leading-relaxed mb-4">
              KitBoga is one of the most well-known scam baiters, streaming live sessions where he wastes scammers&apos; time and exposes their tactics. His content is both educational and entertaining, helping millions of people understand how tech support scams, IRS scams, and refund scams operate.
            </p>
            <p className="text-[#c9d1d9] text-sm leading-relaxed mb-5">
              Through hours of live streams, KitBoga has exposed countless scam operations — from fake Microsoft tech support to cryptocurrency fraud — documenting their scripts, techniques, and call centres.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.twitch.tv/kitboga"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-purple-700 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-lg transition-colors font-medium"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
                </svg>
                Watch on Twitch
              </a>
              <a
                href="https://www.youtube.com/kitboga"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition-colors font-medium"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                YouTube Channel
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-[#161b22] border border-[#30363d] rounded-lg p-5">
          <h2 className="text-sm font-semibold text-[#e6edf3] mb-2">Know a Great Scam Baiter?</h2>
          <p className="text-sm text-[#8b949e] leading-relaxed">
            If you know of a scam baiter doing great work, we&apos;d love to feature them.{' '}
            <Link href="/contact" className="text-red-500 hover:text-red-400 underline underline-offset-2">
              Contact us
            </Link>{' '}
            with their details.
          </p>
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
