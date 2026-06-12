#!/usr/bin/env node
/**
 * Update posts to use external image URLs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kvgwr96i',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Update posts with external image URLs
const postImages = [
  {
    slug: 'google-ads-dont-become-a-victim-of-fraud',
    imageUrl: 'https://scamsadvice.com/wp-content/uploads/2019/06/google-ads-freelancer-1.png',
    alt: 'Google Ads fraud scam evidence on Freelancer.com'
  },
  {
    slug: 'usernames-and-emails-relating-to-scams',
    imageUrl: 'https://scamsadvice.com/wp-content/uploads/2020/03/middleman-scam.png',
    alt: 'Middle man marketing scam evidence'
  },
  {
    slug: 'list-of-different-seo-scammers-email',
    imageUrl: 'https://scamsadvice.com/wp-content/uploads/2023/07/seo-scammers.jpg',
    alt: 'SEO scammers targeting website owners'
  },
  {
    slug: 'www-zerogpt-com-fraud-links',
    imageUrl: 'https://scamsadvice.com/wp-content/uploads/2021/01/zerogpt-fraud.jpg',
    alt: 'ZeroGPT fraud evidence'
  },
  {
    slug: 'react-org-the-ugly-side',
    imageUrl: 'https://scamsadvice.com/wp-content/uploads/2021/01/react-org-scam.jpg',
    alt: 'React.org scam evidence'
  }
]

async function updatePosts() {
  for (const post of postImages) {
    try {
      // Store external image URL in a custom field
      await client
        .patch(`post-${post.slug}`)
        .set({
          externalImageUrl: post.imageUrl,
          externalImageAlt: post.alt
        })
        .commit()
      console.log(`✓ Updated: ${post.slug}`)
    } catch (err) {
      console.error(`✗ Failed: ${post.slug} - ${err.message}`)
    }
  }
}

updatePosts().then(() => console.log('\nDone!'))
