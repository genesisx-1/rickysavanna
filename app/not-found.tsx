import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-content mx-auto px-6 py-12 text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page not found</p>
      <Link href="/" className="hover:underline">
        Return home →
      </Link>
    </div>
  )
}

