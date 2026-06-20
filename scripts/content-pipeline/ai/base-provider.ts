/**
 * Base AI Provider - Pluggable interface for different AI models
 * 
 * IMPORTANT: This provider only REWRITES existing content.
 * It does NOT generate new facts or details to avoid hallucinations.
 */

import type { ScrapedArticle, ProcessedArticle, AIProvider } from '../types'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

function extractTags(content: string, category: string): string[] {
  const tags = [category]
  const keywords = ['phishing', 'fraud', 'scam', 'identity theft', 'malware', 'crypto', 'romance scam', 'investment']
  const lowerContent = content.toLowerCase()
  
  for (const keyword of keywords) {
    if (lowerContent.includes(keyword) && !tags.includes(keyword)) {
      tags.push(keyword)
    }
  }
  
  return tags.slice(0, 5)
}

/**
 * Fallback provider - No AI, just formats the scraped content
 * Use this when no AI API key is configured
 */
export const fallbackProvider: AIProvider = {
  name: 'Fallback (No AI)',
  
  async rewrite(original: ScrapedArticle): Promise<ProcessedArticle> {
    // Strip HTML tags for excerpt
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
<p><em>This article has been curated for ScamsAdvice.com to help protect consumers from scams.</em></p>
`.trim(),
      metaDescription: excerpt,
      tags: extractTags(original.content, original.category),
      source: original.source,
      sourceUrl: original.sourceUrl,
      date: original.date,
      status: 'draft',
    }
  }
}

/**
 * Create AI provider based on available API keys
 */
export function createAIProvider(): AIProvider {
  // Check for API keys in order of preference
  if (process.env.ANTHROPIC_API_KEY) {
    // Dynamic import to avoid loading if not needed
    return require('./claude-provider').claudeProvider
  }
  
  if (process.env.OPENAI_API_KEY) {
    return require('./openai-provider').openaiProvider
  }
  
  if (process.env.GOOGLE_API_KEY) {
    return require('./gemini-provider').geminiProvider
  }
  
  console.log('⚠️  No AI API key found. Using fallback provider (no rewriting).')
  return fallbackProvider
}
