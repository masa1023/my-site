import { getAllPosts, Post } from '@/lib/posts'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const lastPost = posts[0]
  const firstPost = posts[posts.length - 1]

  return [
    {
      url: 'https://masa373.work',
      lastModified: lastPost.date,
      changeFrequency: 'monthly',
    },
    {
      url: 'https://masa373.work/blog',
      lastModified: firstPost.date,
      changeFrequency: 'weekly',
    },
    ...posts.map((post: Post) => ({
      url: `https://masa373.work/blog/${post.slug}`,
      changeFrequency: 'monthly' as const,
    })),
  ]
}
