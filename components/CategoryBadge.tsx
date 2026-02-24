import Link from 'next/link'
import { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
  size?: 'sm' | 'md'
}

export default function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const sizeClasses = size === 'sm'
    ? 'px-3 py-1 text-xs'
    : 'px-4 py-1.5 text-sm'

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={`inline-block ${sizeClasses} font-medium text-brand-700 bg-brand-50 rounded-full hover:bg-brand-100 transition-colors`}
    >
      {category.metadata.name}
    </Link>
  )
}