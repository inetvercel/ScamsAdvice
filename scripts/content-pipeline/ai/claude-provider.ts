/**
 * Claude AI Provider - Best for factual accuracy
 * 
 * STRICT RULES:
 * - Only rewrite/summarize existing facts
 * - Never invent new information
 * - Always preserve source attribution
 */

import type { ScrapedArticle, ProcessedArticle, AIProvider } from '../types'

const SYSTEM_PROMPT = `You are a professional editor for ScamsAdvice.com, a consumer protection website.

Your job is to REWRITE articles about scams for our audience. 

STRICT RULES:
1. ONLY use information from the provided source article - NEVER add new facts
2. NEVER invent details, statistics, or claims not in the original
3. Keep all specific names, emails, URLs, and identifiers exactly as provided
4. Write in a clear, warning-focused tone
5. Always mention the original source

OUTPUT FORMAT (JSON):
{
  "title": "Engaging title (keep factual)",
  "excerpt": "2-3 sentence summary (max 160 chars)",
  "content": "Full HTML article with <h2>, <p>, <ul> tags",
  "metaDescription": "SEO description (max 160 chars)",
  "tags": ["tag1", "tag2"]
}`

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

async function callClaude(prompt: string): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status}`)
  }

  const data = await response.json()
  return data.content[0].text
}

export const claudeProvider: AIProvider = {
  name: 'Claude (Anthropic)',

  async rewrite(original: ScrapedArticle): Promise<ProcessedArticle> {
    const prompt = `Rewrite this scam alert article for ScamsAdvice.com:

ORIGINAL SOURCE: ${original.source}
SOURCE URL: ${original.sourceUrl}
DATE: ${original.date}
CATEGORY: ${original.category}

ORIGINAL TITLE: ${original.title}

ORIGINAL CONTENT:
${original.content}

Remember: ONLY use facts from the above. Do not add anything new.
Return valid JSON only.`

    try {
      const response = await callClaude(prompt)
      
      // Parse JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/)
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
        status: 'review', // Requires human review before publishing
      }
    } catch (error) {
      console.error('Claude rewrite failed:', error)
      // Fallback to basic formatting
      const { fallbackProvider } = require('./base-provider')
      return fallbackProvider.rewrite(original)
    }
  },
}
