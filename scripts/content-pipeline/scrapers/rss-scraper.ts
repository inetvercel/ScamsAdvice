/**
 * RSS Feed Scraper for scam-related news
 * Sources: FTC, BBB, ScamWatch, etc.
 */

import type { ScrapedArticle, ScraperSource } from '../types'

// Scam-related RSS feeds
const SCAM_FEEDS = [
  {
    name: 'FTC Consumer Alerts',
    url: 'https://www.ftc.gov/feeds/consumer-alerts.xml',
    category: 'fraud' as const,
  },
  {
    name: 'Krebs on Security',
    url: 'https://krebsonsecurity.com/feed/',
    category: 'phishing' as const,
  },
  {
    name: 'Bleeping Computer',
    url: 'https://www.bleepingcomputer.com/feed/',
    category: 'phishing' as const,
  },
]

async function parseRSSFeed(feedUrl: string): Promise<any[]> {
  try {
    const response = await fetch(feedUrl)
    const xml = await response.text()
    
    // Simple XML parsing for RSS items
    const items: any[] = []
    const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g) || []
    
    for (const itemXml of itemMatches) {
      const title = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)?.[1] || 
                    itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)?.[2] || ''
      const link = itemXml.match(/<link>(.*?)<\/link>/)?.[1] || ''
      const descMatch = itemXml.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
                        itemXml.match(/<description>([\s\S]*?)<\/description>/)
      const description = descMatch?.[1] || ''
      const pubDate = itemXml.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || ''
      
      items.push({ title: title.trim(), link: link.trim(), description: description.trim(), pubDate })
    }
    
    return items
  } catch (error) {
    console.error(`Failed to fetch RSS feed ${feedUrl}:`, error)
    return []
  }
}

function isScamRelated(title: string, description: string): boolean {
  const keywords = [
    'scam', 'fraud', 'phishing', 'fake', 'warning', 'alert',
    'identity theft', 'malware', 'ransomware', 'crypto scam',
    'romance scam', 'investment fraud', 'impersonat'
  ]
  const text = `${title} ${description}`.toLowerCase()
  return keywords.some(keyword => text.includes(keyword))
}

export async function scrapeRSSFeeds(): Promise<ScrapedArticle[]> {
  const articles: ScrapedArticle[] = []
  
  for (const feed of SCAM_FEEDS) {
    console.log(`Scraping ${feed.name}...`)
    const items = await parseRSSFeed(feed.url)
    
    for (const item of items) {
      // Filter for scam-related content
      if (!isScamRelated(item.title, item.description)) continue
      
      articles.push({
        title: item.title,
        content: item.description,
        source: feed.name,
        sourceUrl: item.link,
        date: item.pubDate ? new Date(item.pubDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        category: feed.category,
      })
    }
  }
  
  console.log(`Found ${articles.length} scam-related articles`)
  return articles
}

export const rssScraper: ScraperSource = {
  name: 'RSS Feeds',
  url: 'multiple',
  scrape: scrapeRSSFeeds,
}
