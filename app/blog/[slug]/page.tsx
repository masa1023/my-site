import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { parseMarkdown } from '@/lib/markdoc'
import { Badge } from '@/components/ui/badge'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const content = parseMarkdown(post.content)

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <header className="not-prose mb-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground mb-4">
          <time>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <p className="text-xl text-muted-foreground">{post.description}</p>
      </header>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  )
}
