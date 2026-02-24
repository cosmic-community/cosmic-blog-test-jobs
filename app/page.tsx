import { getPosts, getCategories, getAuthors } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import AuthorCard from '@/components/AuthorCard'
import CategoryBadge from '@/components/CategoryBadge'
import Link from 'next/link'

export default async function HomePage() {
  const [posts, categories, authors] = await Promise.all([
    getPosts(),
    getCategories(),
    getAuthors(),
  ])

  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)

  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Cosmic Blog
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Discover stories, insights, and ideas from our writers across technology, travel, and more.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <PostCard post={featuredPost} featured />
          </div>
        )}

        {/* Other Posts */}
        {otherPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {otherPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">No posts yet. Add some content in Cosmic!</p>
          </div>
        )}
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section id="categories" className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="p-6 rounded-xl border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🏷️</span>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
                    {category.metadata.name}
                  </h3>
                </div>
                {category.metadata?.description && (
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {category.metadata.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Authors Section */}
      {authors.length > 0 && (
        <section id="authors" className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Writers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {authors.map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}