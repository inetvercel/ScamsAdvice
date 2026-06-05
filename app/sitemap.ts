import type { MetadataRoute } from 'next'
import { posts, pages } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://scamsadvice.com'

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: post.dateISO ? new Date(post.dateISO) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const pageEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...postEntries,
    ...pageEntries,
  ]
}
