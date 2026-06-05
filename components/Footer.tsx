import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#161b22] border-t border-[#30363d] mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-red-600 rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <span className="font-bold text-[#e6edf3]">ScamsAdvice<span className="text-red-500">.com</span></span>
            </Link>
            <p className="text-[#8b949e] text-sm leading-relaxed">
              Exposing online scams, fraud, and deceptive practices to protect website owners and businesses.
            </p>
          </div>

          {/* Articles */}
          <div>
            <h3 className="text-[#e6edf3] font-semibold text-sm uppercase tracking-wider mb-3">Articles</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/google-ads-dont-become-a-victim-of-fraud" className="text-[#8b949e] hover:text-red-500 text-sm transition-colors">
                  Google Ads Fraud
                </Link>
              </li>
              <li>
                <Link href="/list-of-different-seo-scammers-email" className="text-[#8b949e] hover:text-red-500 text-sm transition-colors">
                  SEO Scammers Email List
                </Link>
              </li>
              <li>
                <Link href="/usernames-and-emails-relating-to-scams" className="text-[#8b949e] hover:text-red-500 text-sm transition-colors">
                  Middle Man Marketing Scam
                </Link>
              </li>
              <li>
                <Link href="/react-org-the-ugly-side" className="text-[#8b949e] hover:text-red-500 text-sm transition-colors">
                  React.org – The Ugly Side
                </Link>
              </li>
              <li>
                <Link href="/www-zerogpt-com-fraud-links" className="text-[#8b949e] hover:text-red-500 text-sm transition-colors">
                  ZeroGPT Fraud Links
                </Link>
              </li>
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-[#e6edf3] font-semibold text-sm uppercase tracking-wider mb-3">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/scamdex" className="text-[#8b949e] hover:text-red-500 text-sm transition-colors">
                  Scamdex
                </Link>
              </li>
              <li>
                <Link href="/scam-baiters" className="text-[#8b949e] hover:text-red-500 text-sm transition-colors">
                  Scam Baiters
                </Link>
              </li>
              <li>
                <Link href="/we-know-who-you-are" className="text-[#8b949e] hover:text-red-500 text-sm transition-colors">
                  We Know Who You Are
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#8b949e] hover:text-red-500 text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#30363d] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8b949e] text-sm">
            &copy; {currentYear} ScamsAdvice.com – Exposing Online Scams
          </p>
          <p className="text-[#8b949e] text-xs">
            All reported information is for public awareness purposes.
          </p>
        </div>
      </div>
    </footer>
  )
}
