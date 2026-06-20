#!/usr/bin/env npx ts-node
/**
 * Content Pipeline - Main Entry Point
 * 
 * Usage:
 *   npx ts-node scripts/content-pipeline/index.ts
 * 
 * Environment variables:
 *   ANTHROPIC_API_KEY - For Claude AI rewriting (recommended)
 *   OPENAI_API_KEY    - For GPT-4 rewriting (alternative)
 *   GOOGLE_API_KEY    - For Gemini rewriting (alternative)
 *   UNSPLASH_ACCESS_KEY - For stock images
 *   SANITY_API_TOKEN  - For publishing to Sanity CMS
 */

import { scrapeRSSFeeds } from './scrapers/rss-scraper'
import { createAIProvider, fallbackProvider } from './ai/base-provider'
import { unsplashProvider } from './images/unsplash-provider'
import type { ProcessedArticle } from './types'

async function publishToSanity(article: ProcessedArticle): Promise<boolean> {
  const token = process.env.SANITY_API_TOKEN
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kvgwr96i'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

  if (!token) {
    console.log('⚠️  No SANITY_API_TOKEN. Saving to local file instead.')
    return false
  }

  try {
    const { createClient } = await import('@sanity/client')
    const client = createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      token,
      useCdn: false,
    })

    // Upload featured image if available
    let featuredImageDoc = undefined
    if (article.featuredImage) {
      const imageResponse = await fetch(article.featuredImage.url)
      const imageBuffer = await imageResponse.arrayBuffer()
      const asset = await client.assets.upload('image', Buffer.from(imageBuffer), {
        filename: `${article.slug}.jpg`,
      })
      featuredImageDoc = {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
        alt: article.featuredImage.alt,
      }
    }

    // Create post document
    const doc = {
      _id: `post-${article.slug}`,
      _type: 'post',
      title: article.title,
      slug: { current: article.slug, _type: 'slug' },
      excerpt: article.excerpt,
      metaDescription: article.metaDescription,
      date: article.date,
      tags: article.tags,
      published: article.status === 'published',
      featuredImage: featuredImageDoc,
      content: [
        {
          _type: 'block',
          _key: 'content',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: article.content.replace(/<[^>]*>/g, ''),
              marks: [],
            },
          ],
        },
      ],
    }

    await client.createOrReplace(doc)
    console.log(`✓ Published to Sanity: ${article.title}`)
    return true
  } catch (error) {
    console.error(`✗ Failed to publish: ${error}`)
    return false
  }
}

async function saveToLocalDrafts(articles: ProcessedArticle[]): Promise<void> {
  const fs = await import('fs/promises')
  const path = await import('path')
  
  const draftsDir = path.join(__dirname, '../../drafts')
  await fs.mkdir(draftsDir, { recursive: true })
  
  const timestamp = new Date().toISOString().split('T')[0]
  const filename = path.join(draftsDir, `scraped-${timestamp}.json`)
  
  await fs.writeFile(filename, JSON.stringify(articles, null, 2))
  console.log(`\n📁 Saved ${articles.length} articles to ${filename}`)
}

async function main() {
  console.log('🔍 ScamsAdvice Content Pipeline\n')
  console.log('=' .repeat(50))
  
  // 1. Scrape content
  console.log('\n📥 Step 1: Scraping sources...')
  const scraped = await scrapeRSSFeeds()
  
  if (scraped.length === 0) {
    console.log('No new scam articles found.')
    return
  }
  
  // 2. Process with AI
  console.log('\n🤖 Step 2: Processing with AI...')
  const aiProvider = createAIProvider()
  console.log(`Using: ${aiProvider.name}`)
  
  const processed: ProcessedArticle[] = []
  
  for (const article of scraped.slice(0, 5)) { // Limit to 5 for testing
    console.log(`  Processing: ${article.title.slice(0, 50)}...`)
    const result = await aiProvider.rewrite(article)
    
    // 3. Find image
    if (process.env.UNSPLASH_ACCESS_KEY) {
      const image = await unsplashProvider.findImage(article.category)
      if (image) {
        result.featuredImage = image
      }
    }
    
    processed.push(result)
  }
  
  // 4. Save/Publish
  console.log('\n📤 Step 3: Saving articles...')
  
  let publishedCount = 0
  for (const article of processed) {
    const published = await publishToSanity(article)
    if (published) publishedCount++
  }
  
  // Always save local backup
  await saveToLocalDrafts(processed)
  
  // Summary
  console.log('\n' + '='.repeat(50))
  console.log('✅ Pipeline complete!')
  console.log(`   Scraped: ${scraped.length} articles`)
  console.log(`   Processed: ${processed.length} articles`)
  console.log(`   Published: ${publishedCount} articles`)
}

main().catch(console.error)
