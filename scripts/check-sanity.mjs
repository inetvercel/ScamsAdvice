#!/usr/bin/env node
/**
 * Check Sanity content
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kvgwr96i',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function checkContent() {
  try {
    const posts = await client.fetch(`*[_type == "post"] | order(date desc) { _id, title, slug, date, published }`)
    const pages = await client.fetch(`*[_type == "page"] | order(title asc) { _id, title, slug, published }`)

    console.log('=== POSTS ===')
    if (posts.length === 0) {
      console.log('No posts found')
    } else {
      posts.forEach(p => console.log(`✓ ${p.title} (${p.slug?.current || 'no slug'})`))
    }

    console.log('\n=== PAGES ===')
    if (pages.length === 0) {
      console.log('No pages found')
    } else {
      pages.forEach(p => console.log(`✓ ${p.title} (${p.slug?.current || 'no slug'})`))
    }

    console.log(`\nTotal: ${posts.length} posts, ${pages.length} pages`)
  } catch (err) {
    console.error('Error:', err.message)
  }
}

checkContent()
