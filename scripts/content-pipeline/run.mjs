#!/usr/bin/env node
/**
 * Content Pipeline - Main Entry Point
 * 
 * Usage:
 *   node scripts/content-pipeline/run.mjs
 * 
 * Environment variables:
 *   ANTHROPIC_API_KEY - For Claude AI rewriting (recommended)
 *   UNSPLASH_ACCESS_KEY - For stock images
 *   SANITY_API_TOKEN  - For publishing to Sanity CMS
 */

import { createClient } from '@sanity/client'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Load .env.local
config({ path: path.join(__dirname, '..', '..', '.env.local') })

// ============ RSS SCRAPER ============

const SCAM_FEEDS = [
  {
    name: 'FTC Consumer Alerts',
    url: 'https://www.ftc.gov/feeds/consumer-alerts.xml',
    category: 'fraud',
  },
  {
    name: 'Krebs on Security',
    url: 'https://krebsonsecurity.com/feed/',
    category: 'phishing',
  },
]

async function parseRSSFeed(feedUrl) {
  try {
    const response = await fetch(feedUrl)
    const xml = await response.text()
    
    const items = []
    const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g) || []
    
    for (const itemXml of itemMatches) {
      const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
                         itemXml.match(/<title>(.*?)<\/title>/)
      const title = titleMatch?.[1] || ''
      
      const linkMatch = itemXml.match(/<link>(.*?)<\/link>/)
      const link = linkMatch?.[1] || ''
      
      const descMatch = itemXml.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
                        itemXml.match(/<description>([\s\S]*?)<\/description>/)
      const description = descMatch?.[1] || ''
      
      const dateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/)
      const pubDate = dateMatch?.[1] || ''
      
      items.push({ title: title.trim(), link: link.trim(), description: description.trim(), pubDate })
    }
    
    return items
  } catch (error) {
    console.error(`Failed to fetch RSS feed ${feedUrl}:`, error.message)
    return []
  }
}

function isScamRelated(title, description) {
  const keywords = [
    'scam', 'fraud', 'phishing', 'fake', 'warning', 'alert',
    'identity theft', 'malware', 'ransomware', 'crypto scam',
    'romance scam', 'investment fraud', 'impersonat'
  ]
  const text = `${title} ${description}`.toLowerCase()
  return keywords.some(keyword => text.includes(keyword))
}

async function scrapeRSSFeeds() {
  const articles = []
  
  for (const feed of SCAM_FEEDS) {
    console.log(`  Scraping ${feed.name}...`)
    const items = await parseRSSFeed(feed.url)
    
    for (const item of items) {
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
  
  console.log(`  Found ${articles.length} scam-related articles`)
  return articles
}

// ============ AI REWRITER ============

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

function extractTags(content, category) {
  const tags = [category]
  const keywords = ['phishing', 'fraud', 'scam', 'identity theft', 'malware', 'crypto']
  const lowerContent = content.toLowerCase()
  
  for (const keyword of keywords) {
    if (lowerContent.includes(keyword) && !tags.includes(keyword)) {
      tags.push(keyword)
    }
  }
  
  return tags.slice(0, 5)
}

async function rewriteWithClaude(original) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  
  if (!apiKey) {
    // Fallback - no AI, just format
    const plainText = original.content.replace(/<[^>]*>/g, '').trim()
    const excerpt = plainText.slice(0, 160) + (plainText.length > 160 ? '...' : '')
    
    return {
      title: original.title,
      slug: generateSlug(original.title),
      excerpt,
      content: `
<p><em>Originally reported by <a href="${original.sourceUrl}" target="_blank" rel="noopener">${original.source}</a></em></p>

${original.content}

<hr />
<p><strong>Source:</strong> <a href="${original.sourceUrl}" target="_blank" rel="noopener">${original.source}</a></p>
`.trim(),
      metaDescription: excerpt,
      tags: extractTags(original.content, original.category),
      source: original.source,
      sourceUrl: original.sourceUrl,
      date: original.date,
      status: 'draft',
    }
  }

  // Use Claude API
  const systemPrompt = `You are a professional editor for ScamsAdvice.com.
STRICT RULES:
1. ONLY use information from the provided source - NEVER add new facts
2. NEVER invent details or statistics
3. Keep all names, emails, URLs exactly as provided
4. Write in a clear, warning-focused tone

Return JSON: { "title": "...", "excerpt": "...", "content": "<html>...", "metaDescription": "...", "tags": [...] }`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: systemPrompt,
        messages: [{
          role: 'user',
          content: `Rewrite for ScamsAdvice.com:\n\nSOURCE: ${original.source}\nURL: ${original.sourceUrl}\n\nTITLE: ${original.title}\n\nCONTENT:\n${original.content}\n\nReturn valid JSON only.`
        }],
      }),
    })

    if (!response.ok) throw new Error(`Claude API: ${response.status}`)

    const data = await response.json()
    const text = data.content[0].text
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON in response')
    
    const parsed = JSON.parse(jsonMatch[0])
    
    return {
      title: parsed.title || original.title,
      slug: generateSlug(parsed.title || original.title),
      excerpt: parsed.excerpt || '',
      content: `${parsed.content}\n\n<hr />\n<p><strong>Source:</strong> <a href="${original.sourceUrl}" target="_blank" rel="noopener">${original.source}</a></p>`,
      metaDescription: parsed.metaDescription || parsed.excerpt || '',
      tags: parsed.tags || [original.category],
      source: original.source,
      sourceUrl: original.sourceUrl,
      date: original.date,
      status: 'review',
    }
  } catch (error) {
    console.error('  Claude failed, using fallback:', error.message)
    return rewriteWithClaude({ ...original, ANTHROPIC_API_KEY: null }) // Fallback
  }
}

// ============ IMAGE PROVIDER ============

async function findUnsplashImage(query) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  if (!accessKey) return null

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + ' security')}&per_page=1&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${accessKey}` } }
    )

    if (!response.ok) return null

    const data = await response.json()
    if (data.results?.length > 0) {
      return {
        url: data.results[0].urls.regular,
        alt: data.results[0].alt_description || query,
      }
    }
  } catch (error) {
    console.error('  Unsplash failed:', error.message)
  }
  return null
}

// ============ SANITY PUBLISHER ============

async function publishToSanity(article) {
  const token = process.env.SANITY_API_TOKEN
  if (!token) return false

  try {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kvgwr96i',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      token,
      useCdn: false,
    })

    // Upload image if available
    let featuredImageDoc
    if (article.featuredImage) {
      const imgResponse = await fetch(article.featuredImage.url)
      const imgBuffer = await imgResponse.arrayBuffer()
      const asset = await client.assets.upload('image', Buffer.from(imgBuffer), {
        filename: `${article.slug}.jpg`,
      })
      featuredImageDoc = {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
        alt: article.featuredImage.alt,
      }
    }

    await client.createOrReplace({
      _id: `post-${article.slug}`,
      _type: 'post',
      title: article.title,
      slug: { current: article.slug, _type: 'slug' },
      excerpt: article.excerpt,
      metaDescription: article.metaDescription,
      date: article.date,
      tags: article.tags,
      published: false, // Always draft for review
      featuredImage: featuredImageDoc,
      content: [{ _type: 'block', _key: 'c1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: article.content.replace(/<[^>]*>/g, ''), marks: [] }] }],
    })

    return true
  } catch (error) {
    console.error('  Sanity publish failed:', error.message)
    return false
  }
}

// ============ MAIN ============

async function main() {
  console.log('🔍 ScamsAdvice Content Pipeline\n')
  console.log('='.repeat(50))
  
  // Check API keys
  console.log('\n📋 Configuration:')
  console.log(`  AI: ${process.env.ANTHROPIC_API_KEY ? '✓ Claude' : '⚠️ No AI key (using fallback)'}`)
  console.log(`  Images: ${process.env.UNSPLASH_ACCESS_KEY ? '✓ Unsplash' : '⚠️ No Unsplash key'}`)
  console.log(`  CMS: ${process.env.SANITY_API_TOKEN ? '✓ Sanity' : '⚠️ Local only'}`)
  
  // 1. Scrape
  console.log('\n📥 Step 1: Scraping sources...')
  const scraped = await scrapeRSSFeeds()
  
  if (scraped.length === 0) {
    console.log('No new scam articles found.')
    return
  }
  
  // 2. Process
  console.log('\n🤖 Step 2: Processing articles...')
  const processed = []
  
  for (const article of scraped.slice(0, 5)) {
    console.log(`  → ${article.title.slice(0, 50)}...`)
    const result = await rewriteWithClaude(article)
    
    // Add image
    const image = await findUnsplashImage(article.category)
    if (image) result.featuredImage = image
    
    processed.push(result)
  }
  
  // 3. Save
  console.log('\n📤 Step 3: Saving...')
  
  let published = 0
  for (const article of processed) {
    if (await publishToSanity(article)) {
      console.log(`  ✓ Published: ${article.title.slice(0, 40)}...`)
      published++
    }
  }
  
  // Save local backup
  const draftsDir = path.join(__dirname, '..', '..', 'drafts')
  await fs.mkdir(draftsDir, { recursive: true })
  const filename = path.join(draftsDir, `scraped-${new Date().toISOString().split('T')[0]}.json`)
  await fs.writeFile(filename, JSON.stringify(processed, null, 2))
  console.log(`  📁 Saved to ${filename}`)
  
  // Summary
  console.log('\n' + '='.repeat(50))
  console.log('✅ Complete!')
  console.log(`   Scraped: ${scraped.length} | Processed: ${processed.length} | Published: ${published}`)
}

main().catch(console.error)
