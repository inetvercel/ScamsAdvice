import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { posts, getPostBySlug, getAllPostSlugs } from '@/lib/posts'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Not Found' }

  const ogImage = post.featuredImage?.src
    ? `https://scamsadvice.com${post.featuredImage.src}`
    : undefined

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: {
      canonical: `https://scamsadvice.com/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `https://scamsadvice.com/${post.slug}`,
      type: 'article',
      publishedTime: post.dateISO ? `${post.dateISO}T00:00:00Z` : undefined,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: ogImage ? [ogImage] : [],
    },
  }
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const postIndex = posts.findIndex((p) => p.slug === post.slug)
  const prevPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null
  const nextPost = postIndex > 0 ? posts[postIndex - 1] : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    url: `https://scamsadvice.com/${post.slug}`,
    datePublished: post.dateISO ? `${post.dateISO}T00:00:00Z` : undefined,
    dateModified: post.dateISO ? `${post.dateISO}T00:00:00Z` : undefined,
    author: {
      '@type': 'Organization',
      name: 'ScamsAdvice.com',
      url: 'https://scamsadvice.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ScamsAdvice.com',
      url: 'https://scamsadvice.com',
    },
    image: post.featuredImage
      ? `https://scamsadvice.com${post.featuredImage.src}`
      : undefined,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://scamsadvice.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: post.title,
          item: `https://scamsadvice.com/${post.slug}`,
        },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-[#8b949e]">
            <li>
              <Link href="/" className="hover:text-red-500 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </li>
            <li className="text-[#e6edf3] truncate max-w-xs">{post.title}</li>
          </ol>
        </nav>

        <article>
          {/* Header */}
          <header className="mb-8">
            {post.date && (
              <time dateTime={post.dateISO} className="text-sm text-[#8b949e] font-medium">
                {post.date}
              </time>
            )}
            <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-[#e6edf3] leading-tight">
              {post.title}
            </h1>
            <p className="mt-3 text-[#8b949e] text-base leading-relaxed">{post.excerpt}</p>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-[#21262d] text-[#8b949e] px-2.5 py-1 rounded-full border border-[#30363d]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Featured image */}
          {post.featuredImage && (
            <div className="mb-8 rounded-lg overflow-hidden border border-[#30363d]">
              <Image
                src={post.featuredImage.src}
                alt={post.featuredImage.alt}
                width={post.featuredImage.width}
                height={post.featuredImage.height}
                className="w-full h-auto"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Post navigation */}
        {(prevPost || nextPost) && (
          <nav
            aria-label="Post navigation"
            className="mt-12 pt-8 border-t border-[#30363d] grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {prevPost && (
              <Link
                href={`/${prevPost.slug}`}
                className="group bg-[#161b22] border border-[#30363d] hover:border-[#484f58] rounded-lg p-4 transition-colors"
              >
                <span className="text-xs text-[#8b949e] font-medium uppercase tracking-wider flex items-center gap-1 mb-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Previous
                </span>
                <span className="text-sm text-[#e6edf3] group-hover:text-red-500 font-medium transition-colors line-clamp-2">
                  {prevPost.title}
                </span>
              </Link>
            )}
            {nextPost && (
              <Link
                href={`/${nextPost.slug}`}
                className="group bg-[#161b22] border border-[#30363d] hover:border-[#484f58] rounded-lg p-4 transition-colors sm:text-right sm:ml-auto sm:w-full"
              >
                <span className="text-xs text-[#8b949e] font-medium uppercase tracking-wider flex items-center gap-1 mb-2 sm:justify-end">
                  Next
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
                <span className="text-sm text-[#e6edf3] group-hover:text-red-500 font-medium transition-colors line-clamp-2">
                  {nextPost.title}
                </span>
              </Link>
            )}
          </nav>
        )}

        {/* Back to home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#8b949e] hover:text-red-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to all articles
          </Link>
        </div>
      </div>
    </>
  )
}
