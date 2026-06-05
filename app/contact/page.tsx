import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact ScamsAdvice.com to report an online scam, submit evidence of fraud, or ask questions about protecting yourself from internet scammers.',
  alternates: { canonical: 'https://scamsadvice.com/contact' },
  openGraph: {
    title: 'Contact | ScamsAdvice.com',
    description: 'Report a scam or submit evidence to ScamsAdvice.com.',
    url: 'https://scamsadvice.com/contact',
  },
}

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact ScamsAdvice.com',
    url: 'https://scamsadvice.com/contact',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://scamsadvice.com' },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://scamsadvice.com/contact' },
      ],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-[#8b949e]">
            <li><Link href="/" className="hover:text-red-500 transition-colors">Home</Link></li>
            <li aria-hidden="true">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </li>
            <li className="text-[#e6edf3]">Contact</li>
          </ol>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#e6edf3]">Contact</h1>
          <p className="mt-3 text-[#8b949e] text-lg leading-relaxed">
            Report a scam, submit evidence, or ask a question. All submissions are reviewed.
          </p>
        </header>

        {/* Info boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-red-900/40 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <h2 className="text-sm font-semibold text-[#e6edf3]">Report a Scam</h2>
            </div>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              Include the scammer&apos;s email, website, or username along with any evidence you have.
            </p>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-900/40 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <h2 className="text-sm font-semibold text-[#e6edf3]">General Enquiry</h2>
            </div>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              Questions about a specific article, request a correction, or ask for scam advice.
            </p>
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 sm:p-8">
          <form
            action="https://formspree.io/f/contact"
            method="POST"
            className="space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#e6edf3] mb-1.5">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                autoComplete="name"
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3.5 py-2.5 text-[#e6edf3] placeholder-[#484f58] focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/50 transition-colors text-sm"
                placeholder="John Smith"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#e6edf3] mb-1.5">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3.5 py-2.5 text-[#e6edf3] placeholder-[#484f58] focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/50 transition-colors text-sm"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-[#e6edf3] mb-1.5">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3.5 py-2.5 text-[#e6edf3] placeholder-[#484f58] focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/50 transition-colors text-sm"
                placeholder="Reporting a scam / General question"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#e6edf3] mb-1.5">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3.5 py-2.5 text-[#e6edf3] placeholder-[#484f58] focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/50 transition-colors text-sm resize-none"
                placeholder="Describe the scam or your question in detail..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
            >
              Send Message
            </button>
          </form>
        </div>

        <p className="mt-6 text-xs text-[#8b949e] text-center">
          You can also check the{' '}
          <Link href="/scamdex" className="text-red-500 hover:text-red-400 underline underline-offset-2">
            Scamdex
          </Link>{' '}
          for a list of known scammers.
        </p>
      </div>
    </>
  )
}
