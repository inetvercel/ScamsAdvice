'use client'

import { useState } from 'react'

interface Article {
  title: string
  link: string
  pubDate: string
  content: string
  source: string
  category: string
  guid: string
}

interface ProcessedArticle {
  originalTitle: string
  newTitle: string
  slug: string
  status: string
  sanityUrl?: string
}

export default function ScamNewsAdmin() {
  const [articles, setArticles] = useState<Article[]>([])
  const [processing, setProcessing] = useState(false)
  const [results, setResults] = useState<ProcessedArticle[] | null>(null)
  const [error, setError] = useState('')

  async function fetchNews() {
    setError('')
    try {
      const res = await fetch('/api/scam-news/fetch')
      const data = await res.json()
      if (data.success) {
        setArticles(data.articles)
      } else {
        setError(data.error || 'Failed to fetch')
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  async function processArticles(autoPublish = false) {
    if (articles.length === 0) return
    
    setProcessing(true)
    setError('')
    
    try {
      const res = await fetch('/api/scam-news/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articles: articles.slice(0, 3),
          autoPublish,
        }),
      })
      
      const data = await res.json()
      
      if (data.success) {
        setResults(data.results)
      } else {
        setError(data.error || 'Processing failed')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setProcessing(false)
    }
  }

  async function testGrok() {
    setProcessing(true)
    setError('')
    
    try {
      const res = await fetch('/api/scam-news/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Test: New Phishing Scam Targets Small Businesses',
          content: 'Scammers are sending fake invoices to small business owners claiming to be from their suppliers. The emails look legitimate but the payment links go to fraudulent sites.',
          source: 'Test',
          link: 'https://example.com/test'
        }),
      })
      
      const data = await res.json()
      
      if (data.success) {
        alert(`Grok Test Success!\n\nNew Title: ${data.rewritten.title}\n\nExcerpt: ${data.rewritten.excerpt}`)
      } else {
        setError(data.error || 'Test failed')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-[#e6edf3] mb-8">Scam News AI Workflow</h1>

      {/* Step 1: Fetch */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#e6edf3]">1. Fetch Latest Scam News</h2>
          <button
            onClick={fetchNews}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
          >
            Fetch News
          </button>
        </div>
        
        {articles.length > 0 && (
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-[#21262d] border-b border-[#30363d] text-sm text-[#8b949e]">
              Showing articles from last 14 days • {articles.length} found
            </div>
            <table className="w-full text-sm">
              <thead className="bg-[#21262d]">
                <tr>
                  <th className="text-left text-[#8b949e] font-medium px-4 py-3">Title</th>
                  <th className="text-left text-[#8b949e] font-medium px-4 py-3">Source</th>
                  <th className="text-left text-[#8b949e] font-medium px-4 py-3">Published</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article, i) => {
                  const pubDate = new Date(article.pubDate)
                  const daysAgo = Math.floor((Date.now() - pubDate.getTime()) / (1000 * 60 * 60 * 24))
                  return (
                    <tr key={i} className="border-t border-[#30363d]">
                      <td className="px-4 py-3 text-[#e6edf3]">
                        <a href={article.link} target="_blank" rel="noopener" className="hover:text-red-400">
                          {article.title}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-[#8b949e]">{article.source}</td>
                      <td className="px-4 py-3 text-[#8b949e]">
                        {daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`}
                        <span className="text-[#484f58] ml-2">({pubDate.toLocaleDateString()})</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Step 2: Process */}
      {articles.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#e6edf3] mb-4">2. AI Rewrite & Publish</h2>
          <div className="flex gap-4">
            <button
              onClick={() => processArticles(false)}
              disabled={processing}
              className="bg-[#21262d] hover:bg-[#30363d] text-[#e6edf3] px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {processing ? 'Processing...' : 'Create Drafts (Review First)'}
            </button>
            <button
              onClick={() => processArticles(true)}
              disabled={processing}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {processing ? 'Processing...' : 'Auto-Publish (Skip Review)'}
            </button>
          </div>
        </section>
      )}

      {/* Step 3: Results */}
      {results && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#e6edf3] mb-4">3. Results</h2>
          <div className="space-y-4">
            {results.map((result, i) => (
              <div key={i} className="bg-[#161b22] border border-[#30363d] rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-[#8b949e] text-sm line-through">{result.originalTitle}</p>
                    <p className="text-[#e6edf3] font-medium">{result.newTitle}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    result.status === 'published' 
                      ? 'bg-green-900/30 text-green-400' 
                      : 'bg-yellow-900/30 text-yellow-400'
                  }`}>
                    {result.status}
                  </span>
                </div>
                {result.sanityUrl && (
                  <a
                    href={result.sanityUrl}
                    target="_blank"
                    rel="noopener"
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Edit in Sanity Studio →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {error && (
        <div className="bg-red-900/30 border border-red-800/50 rounded-lg p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Test Groq */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-[#e6edf3] mb-4">Test Groq Connection</h2>
        <button
          onClick={testGrok}
          disabled={processing}
          className="bg-[#21262d] border border-[#8b949e] hover:bg-[#30363d] text-[#e6edf3] px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {processing ? 'Testing...' : '🧠 Test Groq API (Web Search Enabled)'}
        </button>
      </section>

      {/* Instructions */}
      <section className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#e6edf3] mb-3">Setup Required</h3>
        <ul className="text-[#8b949e] space-y-2 text-sm">
          <li>1. Add <code className="bg-[#21262d] px-2 py-1 rounded">GROQ_API_KEY</code> to your <code className="bg-[#21262d] px-2 py-1 rounded">.env.local</code> (get from groq.com)</li>
          <li>2. Using model: <code className="bg-[#21262d] px-2 py-1 rounded">llama-3.3-70b-versatile</code> with web search enabled</li>
          <li>3. Restart dev server after adding env variables</li>
          <li>4. This workflow fetches from FTC, BBB, and security blogs</li>
          <li>5. AI rewrites content to be original and SEO-optimized</li>
          <li>6. All articles are flagged as AI-generated for transparency</li>
        </ul>
      </section>
    </div>
  )
}
