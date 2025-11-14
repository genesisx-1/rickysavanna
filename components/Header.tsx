import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 py-6">
      <div className="max-w-content mx-auto px-6">
        <nav className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}>
          <Link href="/" className="text-2xl font-bold hover:no-underline">
            Ricky Savanna
          </Link>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <Link href="/about" className="hover:underline">
              About 👤
            </Link>
            <Link href="/work" className="hover:underline">
              Work 💻
            </Link>
            <Link href="/blog" className="hover:underline">
              Blog 📝
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact 📧
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

