#!/usr/bin/env node
/**
 * Find actual image URLs from WordPress site
 */

const pages = [
  { url: 'https://scamsadvice.com/google-ads-dont-become-a-victim-of-fraud/', slug: 'google-ads' },
  { url: 'https://scamsadvice.com/usernames-and-emails-relating-to-scams/', slug: 'middleman' },
  { url: 'https://scamsadvice.com/list-of-different-seo-scammers-email/', slug: 'seo-scammers' },
  { url: 'https://scamsadvice.com/www-zerogpt-com-fraud-links/', slug: 'zerogpt' },
  { url: 'https://scamsadvice.com/react-org-the-ugly-side/', slug: 'react-org' },
]

async function findImages() {
  for (const page of pages) {
    console.log(`\n=== ${page.slug} ===`)
    console.log(`URL: ${page.url}`)
    
    try {
      const response = await fetch(page.url)
      const html = await response.text()
      
      // Find all wp-content/uploads images
      const regex = /wp-content\/uploads\/[^"'\s)]+\.(png|jpg|jpeg|gif|webp)/gi
      const matches = [...new Set(html.match(regex) || [])]
      
      // Filter to get main images (not thumbnails with -NNNxNNN suffix)
      const mainImages = matches.filter(m => !/-\d+x\d+\.(png|jpg|jpeg|gif|webp)$/i.test(m))
      const thumbImages = matches.filter(m => /-\d+x\d+\.(png|jpg|jpeg|gif|webp)$/i.test(m))
      
      console.log('Main images:')
      mainImages.slice(0, 5).forEach(img => console.log(`  https://scamsadvice.com/${img}`))
      
      if (mainImages.length === 0 && thumbImages.length > 0) {
        console.log('Thumbnail images (no main found):')
        thumbImages.slice(0, 3).forEach(img => console.log(`  https://scamsadvice.com/${img}`))
      }
    } catch (err) {
      console.error(`Error: ${err.message}`)
    }
  }
}

findImages()
