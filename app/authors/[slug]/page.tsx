// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor, getAuthors } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((author) => ({ slug: author.slug }))
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const profilePhoto = author.metadata?.profile_photo

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-10"
      >
        <span>←</span> Back to home
      </Link>

      {/* Author header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12">
        {profilePhoto ? (
          <img
            src={`${profilePhoto.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
            alt={author.metadata.name}
            width={100}
            height={100}
            className="w-24 h-24 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
            <span className="text-3xl text-brand-600">
              {author.metadata.name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {author.metadata.name}
          </h1>
          {author.metadata?.bio && (
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              {author.metadata.bio}
            </p>
          )}
          {author.metadata?.social_link && (
            <a
              href={author.metadata.social_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.545 10.239v-.001c.4-.4.4-1.048 0-1.447L8.04 3.285a1.023 1.023 0 00-1.447 0 1.023 1.023 0 000 1.447l4.782 4.782-4.782 4.782a1.023 1.023 0 000 1.447 1.023 1.023 0 001.447 0l5.506-5.504z" />
              </svg>
              Social Profile
            </a>
          )}
          <p className="text-sm text-gray-400 mt-2">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </p>
        </div>
      </header>

      {/* Author's posts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Posts by {author.metadata.name}
        </h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">
              No posts by this author yet.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 text-brand-600 hover:text-brand-700 font-medium transition-colors"
            >
              Browse all posts →
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}