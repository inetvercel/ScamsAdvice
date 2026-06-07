#!/usr/bin/env ts-node
/**
 * Migration script to import static content into Sanity CMS
 *
 * Usage:
 * 1. Set up your Sanity project and get an API token with write permissions
 * 2. Add the token to .env.local: SANITY_API_TOKEN=your_token
 * 3. Run: npx ts-node scripts/migrate-to-sanity.ts
 */

import { createClient } from '@sanity/client'
import { posts, pages } from '../lib/posts'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function migratePosts() {
  console.log(`Migrating ${posts.length} posts...`)

  for (const post of posts) {
    const doc = {
      _id: `post-${post.slug}`,
      _type: 'post',
      title: post.title,
      slug: { current: post.slug, _type: 'slug' },
      excerpt: post.excerpt,
      metaDescription: post.metaDescription,
      date: post.dateISO,
      tags: post.tags || [],
      published: true,
      content: [
        {
          _type: 'block',
          _key: 'content',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: post.content.replace(/<[^>]*>/g, ''), // Strip HTML for basic migration
              marks: [],
            },
          ],
        },
      ],
    }

    try {
      await client.createOrReplace(doc)
      console.log(`✓ Migrated post: ${post.title}`)
    } catch (err) {
      console.error(`✗ Failed to migrate post: ${post.title}`, err)
    }
  }
}

async function migratePages() {
  console.log(`Migrating ${pages.length} pages...`)

  for (const page of pages) {
    const doc = {
      _id: `page-${page.slug}`,
      _type: 'page',
      title: page.title,
      slug: { current: page.slug, _type: 'slug' },
      metaDescription: page.metaDescription,
      published: true,
      content: [
        {
          _type: 'block',
          _key: 'content',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: page.content.replace(/<[^>]*>/g, ''), // Strip HTML for basic migration
              marks: [],
            },
          ],
        },
      ],
    }

    try {
      await client.createOrReplace(doc)
      console.log(`✓ Migrated page: ${page.title}`)
    } catch (err) {
      console.error(`✗ Failed to migrate page: ${page.title}`, err)
    }
  }
}

async function main() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('Error: NEXT_PUBLIC_SANITY_PROJECT_ID not set in environment')
    process.exit(1)
  }

  if (!process.env.SANITY_API_TOKEN) {
    console.error('Error: SANITY_API_TOKEN not set in environment')
    process.exit(1)
  }

  console.log('Starting migration to Sanity...')
  console.log(`Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`)
  console.log('')

  await migratePosts()
  await migratePages()

  console.log('')
  console.log('Migration complete!')
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
