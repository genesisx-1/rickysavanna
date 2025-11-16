import Link from 'next/link'
import Image from 'next/image'
import { getPosts } from '@/lib/posts'
import WormGame from '@/components/WormGame'

export default async function Home() {
  const posts = await getPosts()

  return (
    <div>
      <div className="max-w-content mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="mb-6">
            <Image
              src="/images/profile.jpg"
              alt="Ricky Savanna"
              width={192}
              height={192}
              className="rounded-full mb-6"
              priority
            />
          </div>
          
          <div className="mb-8">
            <p className="mb-4">
              You can see my work <Link href="/work" className="text-blue-600 hover:underline">here</Link>, and read more about me <Link href="/about" className="text-blue-600 hover:underline">here</Link>.
            </p>
          </div>
        </div>
        
        <div className="mt-8">
          {posts.map(post => (
            <div key={post.slug} className="mb-4">
              <span className="text-gray-600">
                {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
              {': '}
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                {post.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-12">
        <WormGame />
      </div>
    </div>
  )
}

