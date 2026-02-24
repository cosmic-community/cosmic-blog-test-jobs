import { getPageBySlug, getAuthors } from '@/lib/cosmic'
import { Metadata } from 'next'
import Link from 'next/link'
import type { Author } from '@/types'

export const metadata: Metadata = {
  title: 'About - Cosmic Blog',
  description: 'Learn more about Cosmic Blog and our team of writers.',
}

export default async function AboutPage() {
  const [page, authors] = await Promise.all([
    getPageBySlug('about'),
    getAuthors(),
  ])

  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {page?.metadata?.heading ?? 'About Us'}
          </h1>
          {page?.metadata?.subheading && (
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {page.metadata.subheading}
            </p>
          )}
        </div>

        {/* Featured Image */}
        {page?.metadata?.featured_image?.imgix_url && (
          <div className="mb-12 rounded-2xl overflow-hidden">
            <img
              src={`${page.metadata.featured_image.imgix_url}?w=1200&h=500&fit=crop&auto=format,compress`}
              alt={page.metadata.heading ?? 'About'}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
        )}

        {/* Content */}
        {page?.metadata?.content && (
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg prose-gray max-w-none">
              {page.metadata.content.split('\n\n').map((paragraph: string, index: number) => {
                const trimmed = paragraph.trim()
                if (!trimmed) return null

                // Handle markdown headings
                if (trimmed.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                      {trimmed.replace('## ', '')}
                    </h2>
                  )
                }

                if (trimmed.startsWith('# ')) {
                  return (
                    <h2 key={index} className="text-3xl font-bold text-gray-900 mt-10 mb-4">
                      {trimmed.replace('# ', '')}
                    </h2>
                  )
                }

                // Handle markdown lists
                if (trimmed.startsWith('- ')) {
                  const items = trimmed.split('\n').filter((line: string) => line.startsWith('- '))
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 text-gray-600 leading-relaxed">
                      {items.map((item: string, i: number) => (
                        <li key={i}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  )
                }

                // Regular paragraph — handle **bold** markers
                const parts = trimmed.split(/(\*\*[^*]+\*\*)/g)
                return (
                  <p key={index} className="text-gray-600 leading-relaxed mb-4">
                    {parts.map((part: string, i: number) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return (
                          <strong key={i} className="font-semibold text-gray-900">
                            {part.slice(2, -2)}
                          </strong>
                        )
                      }
                      return <span key={i}>{part}</span>
                    })}
                  </p>
                )
              })}
            </div>
          </div>
        )}

        {/* Fallback when no page content exists */}
        {!page && (
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl text-gray-500 leading-relaxed mb-6">
              Welcome to Cosmic Blog — a modern blog platform powered by Cosmic CMS and Next.js.
              We bring together writers from diverse backgrounds to share stories, insights, and ideas
              across technology, travel, and more.
            </p>
            <p className="text-lg text-gray-400">
              Add an &quot;About&quot; page in your Cosmic dashboard to customize this content.
            </p>
          </div>
        )}
      </section>

      {/* Meet Our Writers */}
      {authors.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Meet Our Writers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {authors.map((author: Author) => (
              <Link
                key={author.id}
                href={`/authors/${author.slug}`}
                className="flex items-start gap-5 p-6 rounded-xl border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all group"
              >
                {author.metadata?.profile_photo?.imgix_url ? (
                  <img
                    src={`${author.metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                    alt={author.metadata.name}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✍️</span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
                    {author.metadata.name}
                  </h3>
                  {author.metadata?.bio && (
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed line-clamp-2">
                      {author.metadata.bio}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}