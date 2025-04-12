import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { parseMarkdown } from '@/lib/markdoc'
import { Badge } from '@/components/ui/badge'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return {
    metadataBase:
      process.env.NODE_ENV === 'production'
        ? new URL('https://masa373.work')
        : undefined,
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const content = parseMarkdown(post.content)

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <header className="not-prose mb-8">
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
      </header>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  )
}
