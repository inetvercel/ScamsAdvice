#!/usr/bin/env node
/**
 * Download images from WordPress and upload to Sanity
 */

import { createClient } from '@sanity/client'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kvgwr96i',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Image mappings from WordPress to local
const imagesToDownload = [
  {
    url: 'https://scamsadvice.com/wp-content/uploads/2019/06/google-ads-freelancer-1.png',
    filename: 'google-ads-freelancer-1.png',
    postSlug: 'google-ads-dont-become-a-victim-of-fraud',
    alt: 'Google Ads fraud scam evidence on Freelancer.com'
  },
  {
    url: 'https://scamsadvice.com/wp-content/uploads/2020/03/middleman-scam.png',
    filename: 'middleman-scam.png',
    postSlug: 'usernames-and-emails-relating-to-scams',
    alt: 'Middle man marketing scam evidence'
  },
  {
    url: 'https://scamsadvice.com/wp-content/uploads/2023/07/seo-scammers.jpg',
    filename: 'seo-scammers.jpg',
    postSlug: 'list-of-different-seo-scammers-email',
    alt: 'SEO scammers targeting website owners'
  },
  {
    url: 'https://scamsadvice.com/wp-content/uploads/2021/01/zerogpt-fraud.jpg',
    filename: 'zerogpt-fraud.jpg',
    postSlug: 'www-zerogpt-com-fraud-links',
    alt: 'ZeroGPT fraud evidence'
  },
  {
    url: 'https://scamsadvice.com/wp-content/uploads/2021/01/react-org-scam.jpg',
    filename: 'react-org-scam.jpg',
    postSlug: 'react-org-the-ugly-side',
    alt: 'React.org scam evidence'
  }
]

async function downloadImage(url, filepath) {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const buffer = await response.arrayBuffer()
    await fs.mkdir(path.dirname(filepath), { recursive: true })
    await fs.writeFile(filepath, Buffer.from(buffer))
    console.log(`✓ Downloaded: ${path.basename(filepath)}`)
    return filepath
  } catch (err) {
    console.error(`✗ Failed to download ${url}: ${err.message}`)
    return null
  }
}

async function uploadToSanity(filepath, alt) {
  try {
    const buffer = await fs.readFile(filepath)
    const asset = await client.assets.upload('image', buffer, {
      filename: path.basename(filepath),
    })
    console.log(`✓ Uploaded to Sanity: ${asset._id}`)
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt }
  } catch (err) {
    console.error(`✗ Failed to upload ${filepath}: ${err.message}`)
    return null
  }
}

async function updatePostWithImage(postSlug, imageDoc) {
  try {
    const postId = `post-${postSlug}`
    await client
      .patch(postId)
      .set({ featuredImage: imageDoc })
      .commit()
    console.log(`✓ Updated post: ${postSlug}`)
  } catch (err) {
    console.error(`✗ Failed to update post ${postSlug}: ${err.message}`)
  }
}

async function main() {
  const publicImagesDir = path.join(__dirname, '..', 'public', 'images')
  
  console.log('Downloading and uploading images...\n')
  
  for (const img of imagesToDownload) {
    const filepath = path.join(publicImagesDir, img.filename)
    
    // Download
    const downloaded = await downloadImage(img.url, filepath)
    if (!downloaded) continue
    
    // Upload to Sanity
    const imageDoc = await uploadToSanity(filepath, img.alt)
    if (!imageDoc) continue
    
    // Update post
    await updatePostWithImage(img.postSlug, imageDoc)
  }
  
  console.log('\nDone!')
}

main().catch(console.error)
