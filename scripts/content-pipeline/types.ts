/**
 * Content Pipeline Types
 */

export interface ScrapedArticle {
  title: string
  content: string
  source: string
  sourceUrl: string
  date: string
  category: 'seo-scam' | 'phishing' | 'fraud' | 'identity-theft' | 'crypto-scam' | 'other'
}

export interface ProcessedArticle {
  title: string
  slug: string
  excerpt: string
  content: string
  metaDescription: string
  tags: string[]
  source: string
  sourceUrl: string
  date: string
  featuredImage?: {
    url: string
    alt: string
  }
  status: 'draft' | 'review' | 'published'
}

export interface AIProvider {
  name: string
  rewrite(original: ScrapedArticle): Promise<ProcessedArticle>
}

export interface ImageProvider {
  name: string
  findImage(query: string): Promise<{ url: string; alt: string } | null>
}

export interface ScraperSource {
  name: string
  url: string
  scrape(): Promise<ScrapedArticle[]>
}
