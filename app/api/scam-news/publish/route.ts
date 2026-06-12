import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

interface PublishRequest {
  title: string
  excerpt: string
  content: string
  metaDescription: string
  tags: string[]
  originalSource: string
  originalLink: string
  status: 'draft' | 'published'
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 96)
}

export async function POST(request: Request) {
  try {
    const body: PublishRequest = await request.json()
    
    // Generate slug from title
    const slug = slugify(body.title)
    const docId = `post-${slug}`
    
    // Check if article already exists
    const existing = await client.fetch(
      `*[_type == "post" && (slug.current == $slug || originalLink == $link)][0]`,
      { slug, link: body.originalLink }
    )
    
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Article already exists', existingId: existing._id },
        { status: 409 }
      )
    }

    // Convert markdown content to Sanity blocks (simplified)
    const contentBlocks = [
      {
        _type: 'block',
        _key: 'intro',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: body.excerpt,
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'content',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'content-span',
            text: body.content.replace(/[#*_`]/g, ''), // Strip markdown markers
            marks: [],
          },
        ],
      },
    ]

    // Create post document
    const doc = {
      _id: docId,
      _type: 'post',
      title: body.title,
      slug: {
        _type: 'slug',
        current: slug,
      },
      excerpt: body.excerpt,
      metaDescription: body.metaDescription,
      content: contentBlocks,
      date: new Date().toISOString().split('T')[0],
      tags: body.tags || ['scam-alert', 'fraud-warning'],
      published: body.status === 'published',
      originalSource: body.originalSource,
      originalLink: body.originalLink,
      aiGenerated: true,
      reviewStatus: body.status === 'published' ? 'approved' : 'pending',
    }

    await client.createOrReplace(doc)

    return NextResponse.json({
      success: true,
      post: {
        id: docId,
        slug,
        title: body.title,
        status: body.status,
      },
      sanityUrl: `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.sanity.studio/desk/post;${docId}`,
      publishedAt: new Date().toISOString(),
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}
