import type { Metadata } from 'next'
import Link from 'next/link'
import PostCard from '@/components/PostCard'
import { posts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'ScamsAdvice.com – Exposing Online Scams',
  description:
    'ScamsAdvice.com exposes online scams, SEO fraud, Google Ads fraud, and deceptive marketing tactics targeting website owners and small businesses.',
  alternates: {
    canonical: 'https://scamsadvice.com',
  },
  openGraph: {
    title: 'ScamsAdvice.com – Exposing Online Scams',
    description:
      'ScamsAdvice.com exposes online scams, SEO fraud, Google Ads fraud, and deceptive marketing tactics targeting website owners and small businesses.',
    url: 'https://scamsadvice.com',
    type: 'website',
  },
}

export default function HomePage() {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
  )

  return (
    <>
      {/* Hero */}
      <section className="bg-[#161b22] border-b border-[#30363d]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] leading-tight">
                Exposing Online Scams
              </h1>
              <p className="mt-3 text-[#8b949e] text-lg leading-relaxed max-w-2xl">
                Real reports of internet fraud, SEO scammers, Google Ads fraud, and deceptive marketing
                tactics — protecting website owners, publishers, and businesses.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/scamdex"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
              View Scamdex
            </Link>
            <Link
              href="/list-of-different-seo-scammers-email"
              className="inline-flex items-center gap-2 border border-[#30363d] hover:border-[#484f58] text-[#e6edf3] hover:bg-[#21262d] px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              SEO Scammer List
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-[#30363d] hover:border-[#484f58] text-[#e6edf3] hover:bg-[#21262d] px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Report a Scam
            </Link>
          </div>
        </div>
      </section>

      {/* Warning banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-[#161b22] border border-red-900/50 rounded-lg p-4 flex gap-3">
          <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <p className="text-sm text-[#8b949e]">
            <strong className="text-[#e6edf3]">Warning:</strong> If you receive unsolicited emails offering money for links or guest posts, check our{' '}
            <Link href="/list-of-different-seo-scammers-email" className="text-red-500 hover:text-red-400 underline underline-offset-2">
              SEO scammer list
            </Link>{' '}
            before responding. Most do not pay.
          </p>
        </div>
      </div>

      {/* Posts grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-xl font-bold text-[#e6edf3] mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-red-600 rounded-full"></span>
          Latest Articles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'ScamsAdvice.com',
            url: 'https://scamsadvice.com',
            description: 'Exposing online scams and fraud to protect website owners and businesses.',
            blogPost: sortedPosts.map((post) => ({
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.excerpt,
              url: `https://scamsadvice.com/${post.slug}`,
              datePublished: post.dateISO,
            })),
          }),
        }}
      />
    </>
  )
}
