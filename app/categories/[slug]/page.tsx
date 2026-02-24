// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({ slug: category.slug }))
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-10"
      >
        <span>←</span> Back to home
      </Link>

      {/* Category header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">🏷️</span>
          <h1 className="text-4xl font-extrabold text-gray-900">
            {category.metadata.name}
          </h1>
        </div>
        {category.metadata?.description && (
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            {category.metadata.description}
          </p>
        )}
        <p className="text-sm text-gray-400 mt-3">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
      </header>

      {/* Posts grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-400">
            No posts in this category yet.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 text-brand-600 hover:text-brand-700 font-medium transition-colors"
          >
            Browse all posts →
          </Link>
        </div>
      )}
    </div>
  )
}