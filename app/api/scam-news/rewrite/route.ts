import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'

// Initialize Groq client with web search enabled
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
})

interface RewriteRequest {
  title: string
  content: string
  source: string
  link: string
}

const SYSTEM_PROMPT = `You are a cybersecurity journalist writing for ScamsAdvice.com, a website that exposes online scams and helps protect website owners, publishers, and small businesses.

Your task: Rewrite scam news into an original blog post with these requirements:

1. **Rewrite completely** - Don't copy sentences verbatim
2. **Add unique analysis** - Include "How to protect yourself" section
3. **Tone**: Alert but professional, not alarmist
4. **Structure**:
   - Catchy headline (SEO-optimized)
   - Brief summary (2-3 sentences)
   - What happened (facts)
   - Warning signs/red flags (bullet list)
   - How to protect yourself (actionable steps)
   - What to do if affected (if applicable)
5. **SEO**: Include relevant keywords naturally
6. **Legal**: Use "alleged" for unproven claims, focus on patterns not individuals

Format your response as JSON:
{
  "title": "Rewritten SEO title",
  "excerpt": "150-160 character meta description",
  "content": "Full article in markdown",
  "tags": ["tag1", "tag2", "tag3"],
  "metaDescription": "SEO meta description"
}`

export async function POST(request: Request) {
  try {
    const body: RewriteRequest = await request.json()
    
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'GROQ_API_KEY not configured' },
        { status: 500 }
      )
    }

    const userPrompt = `Rewrite this scam report:

Source: ${body.source}
Original Title: ${body.title}
Original Link: ${body.link}

Content:
${body.content.slice(0, 2000)}...

Create an original blog post with unique analysis and protection advice.`

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',  // Groq's flagship model with web search
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 4096,
      response_format: { type: 'json_object' },
      // @ts-ignore - Web search tool not yet in SDK types but supported by API
      tools: [{ type: 'web_search' }],
      tool_choice: 'auto'
    })

    const rewritten = JSON.parse(completion.choices[0]?.message?.content || '{}')

    return NextResponse.json({
      success: true,
      original: {
        title: body.title,
        source: body.source,
        link: body.link
      },
      rewritten,
      processedAt: new Date().toISOString()
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}
