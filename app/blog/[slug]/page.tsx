import { format } from 'date-fns'
import profile from '@/content/profile.json'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { parseMarkdown } from '@/lib/markdoc'
import { Badge } from '@/components/ui/badge'
import { Metadata } from 'next'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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
      <header className="not-prose grid gap-4 mb-6">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="grid gap-4">
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>MM</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-muted-foreground text-sm leading-tight">
              <span className="font-medium">{profile.name}</span>
              <span className="text-xs">
                <time>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
              </span>
            </div>
          </div>
        </div>
      </header>
      <div>{content}</div>
    </article>
  )
}
