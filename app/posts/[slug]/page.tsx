// app/posts/[slug]/page.tsx
import { getPostBySlug, getPosts } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

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

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-10"
      >
        <span>←</span> Back to all posts
      </Link>

      {/* Post header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          {category && <CategoryBadge category={category} size="md" />}
          {createdAt && (
            <span className="text-sm text-gray-400">{createdAt}</span>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          {post.title}
        </h1>
        {author && (
          <Link
            href={`/authors/${author.slug}`}
            className="inline-flex items-center gap-3 group"
          >
            {author.metadata?.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                alt={author.metadata.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <p className="text-base font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
                {author.metadata?.name || author.title}
              </p>
              {author.metadata?.bio && (
                <p className="text-sm text-gray-500 line-clamp-1">
                  {author.metadata.bio}
                </p>
              )}
            </div>
          </Link>
        )}
      </header>

      {/* Featured image */}
      {featuredImage && (
        <div className="mb-10 rounded-2xl overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=1400&h=700&fit=crop&auto=format,compress`}
            alt={post.title}
            width={700}
            height={350}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Content */}
      {post.metadata?.content && (
        <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.metadata.content}
          </ReactMarkdown>
        </div>
      )}
    </article>
  )
}