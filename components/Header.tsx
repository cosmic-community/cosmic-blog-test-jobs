import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">📝</span>
          <span className="text-xl font-bold text-gray-900 group-hover:text-brand-700 transition-colors">
            Cosmic Blog
          </span>
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/#categories"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Categories
          </Link>
          <Link
            href="/#authors"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Authors
          </Link>
          {/* Changed: Added About link to navigation */}
          <Link
            href="/about"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}