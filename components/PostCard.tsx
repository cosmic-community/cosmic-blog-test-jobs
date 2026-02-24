import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const author = post.metadata?.author
  const category = post.metadata?.category
  const featuredImage = post.metadata?.featured_image
  const createdAt = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  if (featured && featuredImage) {
    return (
      <article className="group">
        <Link href={`/posts/${post.slug}`} className="block">
          <div className="relative overflow-hidden rounded-2xl aspect-[16/9] mb-6">
            <img
              src={`${featuredImage.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress`}
              alt={post.title}
              width={1200}
              height={675}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
        <div className="flex items-center gap-3 mb-3">
          {category && <CategoryBadge category={category} size="md" />}
          {createdAt && (
            <span className="text-sm text-gray-400">{createdAt}</span>
          )}
        </div>
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-brand-700 transition-colors leading-tight">
            {post.title}
          </h2>
        </Link>
        {post.metadata?.content && (
          <p className="text-gray-500 text-lg leading-relaxed line-clamp-2 mb-4">
            {post.metadata.content.replace(/[#*\[\]()]/g, '').slice(0, 200)}...
          </p>
        )}
        {author && (
          <Link
            href={`/authors/${author.slug}`}
            className="inline-flex items-center gap-3 group/author"
          >
            {author.metadata?.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={author.metadata.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <span className="text-sm font-medium text-gray-700 group-hover/author:text-brand-700 transition-colors">
              {author.metadata?.name || author.title}
            </span>
          </Link>
        )}
      </article>
    )
  }

  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`} className="block">
        {featuredImage && (
          <div className="relative overflow-hidden rounded-xl aspect-[16/10] mb-4">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={post.title}
              width={800}
              height={500}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
      </Link>
      <div className="flex items-center gap-3 mb-2">
        {category && <CategoryBadge category={category} />}
        {createdAt && (
          <span className="text-xs text-gray-400">{createdAt}</span>
        )}
      </div>
      <Link href={`/posts/${post.slug}`}>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-700 transition-colors leading-snug">
          {post.title}
        </h3>
      </Link>
      {post.metadata?.content && (
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">
          {post.metadata.content.replace(/[#*\[\]()]/g, '').slice(0, 150)}...
        </p>
      )}
      {author && (
        <Link
          href={`/authors/${author.slug}`}
          className="inline-flex items-center gap-2 group/author"
        >
          {author.metadata?.profile_photo && (
            <img
              src={`${author.metadata.profile_photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
              alt={author.metadata.name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <span className="text-xs font-medium text-gray-600 group-hover/author:text-brand-700 transition-colors">
            {author.metadata?.name || author.title}
          </span>
        </Link>
      )}
    </article>
  )
}