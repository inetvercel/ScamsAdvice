import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#161b22] border-b border-[#30363d]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <span className="font-bold text-[#e6edf3] text-lg group-hover:text-red-500 transition-colors">
              ScamsAdvice<span className="text-red-500">.com</span>
            </span>
          </Link>

          {/* Nav */}
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-1 sm:gap-2">
              <li>
                <Link
                  href="/scamdex"
                  className="text-sm text-[#8b949e] hover:text-[#e6edf3] px-2 sm:px-3 py-2 rounded-md hover:bg-[#21262d] transition-colors"
                >
                  Scamdex
                </Link>
              </li>
              <li>
                <Link
                  href="/scam-baiters"
                  className="text-sm text-[#8b949e] hover:text-[#e6edf3] px-2 sm:px-3 py-2 rounded-md hover:bg-[#21262d] transition-colors"
                >
                  Scam Baiters
                </Link>
              </li>
              <li>
                <Link
                  href="/we-know-who-you-are"
                  className="hidden sm:block text-sm text-[#8b949e] hover:text-[#e6edf3] px-3 py-2 rounded-md hover:bg-[#21262d] transition-colors"
                >
                  We Know Who You Are
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition-colors font-medium"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
