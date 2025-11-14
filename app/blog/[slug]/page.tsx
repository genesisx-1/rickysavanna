import { getPosts, getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  const processedContent = await remark()
    .use(remarkHtml, { sanitize: false })
    .process(post.content)
  const contentHtml = processedContent.toString()

  return (
    <div className="max-w-content mx-auto px-6 py-12">
      <article>
        <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-8">
          {new Date(post.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>
    </div>
  )
}

