import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { posts, pages } from '@/lib/posts'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export async function POST() {
  // Verify we have credentials
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    return NextResponse.json(
      { error: 'Missing Sanity credentials. Check .env.local' },
      { status: 500 }
    )
  }

  const results = {
    posts: { success: 0, failed: 0, errors: [] as string[] },
    pages: { success: 0, failed: 0, errors: [] as string[] },
  }

  // Migrate posts
  for (const post of posts) {
    const doc = {
      _id: `post-${post.slug}`,
      _type: 'post',
      title: post.title,
      slug: { current: post.slug, _type: 'slug' as const },
      excerpt: post.excerpt,
      metaDescription: post.metaDescription,
      date: post.dateISO,
      tags: post.tags || [],
      published: true,
      content: [
        {
          _type: 'block' as const,
          _key: 'content',
          style: 'normal' as const,
          children: [
            {
              _type: 'span' as const,
              _key: 'span1',
              text: post.content.replace(/<[^>]*>/g, ''),
              marks: [],
            },
          ],
        },
      ],
    }

    try {
      await client.createOrReplace(doc)
      results.posts.success++
    } catch (err: any) {
      results.posts.failed++
      results.posts.errors.push(`${post.title}: ${err.message}`)
    }
  }

  // Migrate pages
  for (const page of pages) {
    const doc = {
      _id: `page-${page.slug}`,
      _type: 'page',
      title: page.title,
      slug: { current: page.slug, _type: 'slug' as const },
      metaDescription: page.metaDescription,
      published: true,
      content: [
        {
          _type: 'block' as const,
          _key: 'content',
          style: 'normal' as const,
          children: [
            {
              _type: 'span' as const,
              _key: 'span1',
              text: page.content.replace(/<[^>]*>/g, ''),
              marks: [],
            },
          ],
        },
      ],
    }

    try {
      await client.createOrReplace(doc)
      results.pages.success++
    } catch (err: any) {
      results.pages.failed++
      results.pages.errors.push(`${page.title}: ${err.message}`)
    }
  }

  return NextResponse.json({
    message: 'Migration complete',
    results,
  })
}

// Also allow GET for easy browser testing
export async function GET() {
  return NextResponse.json({
    message: 'Use POST to trigger migration',
    credentials: {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? '✓ Set' : '✗ Missing',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      token: process.env.SANITY_API_TOKEN ? '✓ Set' : '✗ Missing',
    },
    contentToMigrate: {
      posts: posts.length,
      pages: pages.length,
    },
  })
}
