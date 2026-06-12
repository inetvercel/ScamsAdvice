import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

const rssParser = new Parser()

// Scam news sources - curated for fresh content
const NEWS_SOURCES = [
  {
    name: 'FTC Consumer Alerts',
    url: 'https://www.ftc.gov/media/433161/en/rss-433161.xml',
    category: 'ftc'
  },
  {
    name: 'CISA Alerts',
    url: 'https://www.cisa.gov/news.xml',
    category: 'cisa'
  },
  {
    name: 'KrebsOnSecurity',
    url: 'https://krebsonsecurity.com/feed/',
    category: 'security'
  },
  {
    name: 'ThreatPost',
    url: 'https://threatpost.com/feed/',
    category: 'threat-intel'
  },
  {
    name: 'ZDNet Security',
    url: 'https://www.zdnet.com/news/rss.xml',
    category: 'tech-security'
  },
  {
    name: 'CyberScoop',
    url: 'https://cyberscoop.com/feed/',
    category: 'cyber-news'
  }
]

interface NewsItem {
  title: string
  link: string
  pubDate: string
  content: string
  source: string
  category: string
  guid: string
}

async function fetchRSSFeed(source: typeof NEWS_SOURCES[0]): Promise<NewsItem[]> {
  try {
    const feed = await rssParser.parseURL(source.url)
    
    return feed.items.slice(0, 5).map(item => ({
      title: item.title || 'Untitled',
      link: item.link || '',
      pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
      content: item.contentSnippet || item.content || '',
      source: source.name,
      category: source.category,
      guid: item.guid || item.link || `${item.title}-${Date.now()}`
    }))
  } catch (err) {
    console.error(`Failed to fetch ${source.name}:`, err)
    return []
  }
}

function isScamRelated(item: NewsItem): boolean {
  const scamKeywords = [
    'scam', 'fraud', 'phishing', 'identity theft', 'impersonation',
    'fake', 'deceptive', 'scammer', 'beware', 'warning', 'alert',
    'con', 'hoax', 'swindle', 'extortion', 'ransomware',
    'malware', 'cybercrime', 'hacked', 'breach', 'exploit'
  ]
  
  const text = `${item.title} ${item.content}`.toLowerCase()
  return scamKeywords.some(keyword => text.includes(keyword))
}

function isWithinLastDays(dateString: string, days: number): boolean {
  const articleDate = new Date(dateString)
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)
  return articleDate >= cutoffDate
}

export async function GET() {
  try {
    // Fetch from all sources with logging
    const sourceResults = await Promise.all(
      NEWS_SOURCES.map(async (source) => {
        const articles = await fetchRSSFeed(source)
        console.log(`${source.name}: ${articles.length} articles`)
        return articles
      })
    )
    
    // Flatten all articles
    const allArticles = sourceResults.flat()
    
    // Filter: scam-related AND within last 14 days
    const cutoffDays = 14
    const recentScamArticles = allArticles
      .filter(item => isScamRelated(item) && isWithinLastDays(item.pubDate, cutoffDays))
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 15)

    // Log age of oldest article
    if (recentScamArticles.length > 0) {
      const oldest = recentScamArticles[recentScamArticles.length - 1]
      console.log(`Oldest article: ${oldest.pubDate} from ${oldest.source}`)
    }

    return NextResponse.json({
      success: true,
      count: recentScamArticles.length,
      articles: recentScamArticles,
      fetchedAt: new Date().toISOString(),
      daysFilter: cutoffDays,
      sourcesChecked: NEWS_SOURCES.length
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}

// Manual trigger for testing
export async function POST() {
  return GET()
}
