import Link from 'next/link'
import { format } from 'date-fns'
import { getAllPosts } from '@/lib/posts'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <p className="text-muted-foreground">
          Thoughts, tutorials, and insights about web development, AI, and
          emerging technologies.
        </p>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader>
                <div className="space-y-4">
                  <CardTitle className="leading-8">{post.title}</CardTitle>
                  <CardDescription>{post.description}</CardDescription>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <time className="text-sm text-muted-foreground">
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                  </time>
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
