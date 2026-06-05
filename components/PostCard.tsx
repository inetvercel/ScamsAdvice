import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/lib/posts'

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden hover:border-[#484f58] transition-colors group">
      {post.featuredImage && (
        <Link href={`/${post.slug}`} className="block overflow-hidden">
          <div className="relative w-full h-48">
            <Image
              src={post.featuredImage.src}
              alt={post.featuredImage.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      )}

      <div className="p-5">
        {post.date && (
          <time
            dateTime={post.dateISO}
            className="text-xs text-[#8b949e] uppercase tracking-wider font-medium"
          >
            {post.date}
          </time>
        )}

        <h2 className="mt-2 mb-3 text-lg font-bold leading-snug">
          <Link
            href={`/${post.slug}`}
            className="text-[#e6edf3] hover:text-red-500 transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        <p className="text-[#8b949e] text-sm leading-relaxed line-clamp-3 mb-4">
          {post.excerpt}
        </p>

        <Link
          href={`/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-red-500 hover:text-red-400 text-sm font-medium transition-colors"
        >
          Read more
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
