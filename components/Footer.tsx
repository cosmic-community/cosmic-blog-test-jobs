import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-100 bg-gray-50 mt-20">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">📝</span>
            <span className="text-lg font-bold text-gray-900">Cosmic Blog</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#categories"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/#authors"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Authors
            </Link>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Cosmic Blog. Powered by{' '}
            <a
              href="https://www.cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 hover:text-brand-700 transition-colors"
            >
              Cosmic
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}