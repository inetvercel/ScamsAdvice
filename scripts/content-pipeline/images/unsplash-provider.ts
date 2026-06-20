/**
 * Unsplash Image Provider - Free stock images
 * 
 * Get API key at: https://unsplash.com/developers
 */

import type { ImageProvider } from '../types'

const CATEGORY_QUERIES: Record<string, string> = {
  'seo-scam': 'computer hacker security',
  'phishing': 'email security warning',
  'fraud': 'money fraud warning',
  'identity-theft': 'identity security protection',
  'crypto-scam': 'cryptocurrency bitcoin',
  'other': 'cyber security warning',
}

async function searchUnsplash(query: string): Promise<{ url: string; alt: string } | null> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  
  if (!accessKey) {
    console.log('⚠️  No UNSPLASH_ACCESS_KEY found. Skipping image.')
    return null
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.results && data.results.length > 0) {
      const photo = data.results[0]
      return {
        url: photo.urls.regular,
        alt: photo.alt_description || query,
      }
    }

    return null
  } catch (error) {
    console.error('Unsplash search failed:', error)
    return null
  }
}

export const unsplashProvider: ImageProvider = {
  name: 'Unsplash',

  async findImage(query: string): Promise<{ url: string; alt: string } | null> {
    // Try the specific query first
    let result = await searchUnsplash(query)
    
    // If no results, try a category-based fallback
    if (!result) {
      for (const [category, fallbackQuery] of Object.entries(CATEGORY_QUERIES)) {
        if (query.toLowerCase().includes(category)) {
          result = await searchUnsplash(fallbackQuery)
          if (result) break
        }
      }
    }

    // Last resort fallback
    if (!result) {
      result = await searchUnsplash('cyber security')
    }

    return result
  },
}
