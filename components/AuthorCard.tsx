import Link from 'next/link'
import { Author } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const profilePhoto = author.metadata?.profile_photo

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all group"
    >
      {profilePhoto ? (
        <img
          src={`${profilePhoto.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
          alt={author.metadata.name}
          width={60}
          height={60}
          className="w-14 h-14 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
          <span className="text-xl text-brand-600">
            {author.metadata.name.charAt(0)}
          </span>
        </div>
      )}
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-brand-700 transition-colors truncate">
          {author.metadata.name}
        </h3>
        {author.metadata?.bio && (
          <p className="text-sm text-gray-500 line-clamp-2 mt-0.5">
            {author.metadata.bio}
          </p>
        )}
      </div>
    </Link>
  )
}