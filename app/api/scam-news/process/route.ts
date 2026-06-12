import { NextResponse } from 'next/server'

interface ProcessRequest {
  articles: Array<{
    title: string
    content: string
    source: string
    link: string
    guid: string
  }>
  autoPublish?: boolean
}

export async function POST(request: Request) {
  try {
    const body: ProcessRequest = await request.json()
    const results = []
    const errors = []

    for (const article of body.articles.slice(0, 3)) { // Process max 3 at a time
      try {
        // Step 1: Rewrite with AI
        const rewriteRes = await fetch('http://localhost:3000/api/scam-news/rewrite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(article),
        })

        if (!rewriteRes.ok) {
          throw new Error(`Rewrite failed: ${rewriteRes.status}`)
        }

        const { rewritten } = await rewriteRes.json()

        // Step 2: Publish to Sanity (as draft unless autoPublish)
        const publishRes = await fetch('http://localhost:3000/api/scam-news/publish', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: rewritten.title,
            excerpt: rewritten.excerpt,
            content: rewritten.content,
            metaDescription: rewritten.metaDescription,
            tags: rewritten.tags,
            originalSource: article.source,
            originalLink: article.link,
            status: body.autoPublish ? 'published' : 'draft',
          }),
        })

        if (!publishRes.ok) {
          const error = await publishRes.json()
          throw new Error(error.error || `Publish failed: ${publishRes.status}`)
        }

        const { post, sanityUrl } = await publishRes.json()

        results.push({
          originalTitle: article.title,
          newTitle: rewritten.title,
          slug: post.slug,
          status: post.status,
          sanityUrl,
        })
      } catch (err: any) {
        errors.push({
          title: article.title,
          error: err.message,
        })
      }
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      failed: errors.length,
      results,
      errors,
      timestamp: new Date().toISOString(),
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}
