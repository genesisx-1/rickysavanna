import Link from 'next/link'
import { getPosts } from '@/lib/posts'

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold mb-6">Blog 📝</h1>
      
      <div className="space-y-8">
        {posts.map(post => (
          <article key={post.slug} className="mb-8 pb-8 border-b border-gray-200 last:border-0">
            <h2 className="text-2xl font-bold mb-2">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-3">
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            {post.excerpt && (
              <p className="text-lg mb-2">{post.excerpt}</p>
            )}
            <Link href={`/blog/${post.slug}`} className="hover:underline">
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

