#!/usr/bin/env node
/**
 * Migration script to import static content into Sanity CMS
 *
 * Usage:
 * node scripts/migrate-to-sanity.mjs
 */

import { createClient } from '@sanity/client'
import { posts, pages } from '../lib/posts.js'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
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
              text: post.content.replace(/<[^>]*>/g, ''),
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
      console.error(`✗ Failed to migrate post: ${post.title}`, err.message)
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
              text: page.content.replace(/<[^>]*>/g, ''),
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
      console.error(`✗ Failed to migrate page: ${page.title}`, err.message)
    }
  }
}

async function main() {
  if (!projectId) {
    console.error('Error: NEXT_PUBLIC_SANITY_PROJECT_ID not set')
    process.exit(1)
  }

  if (!token) {
    console.error('Error: SANITY_API_TOKEN not set')
    process.exit(1)
  }

  console.log('Starting migration to Sanity...')
  console.log(`Project: ${projectId}`)
  console.log(`Dataset: ${dataset}`)
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
