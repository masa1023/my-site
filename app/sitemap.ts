import { getAllPosts } from '@/lib/posts'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const latestDate = posts[0]?.date

  return [
    {
      url: 'https://masa373.work',
      lastModified: latestDate,
      changeFrequency: 'monthly',
    },
    {
      url: 'https://masa373.work/blog',
      lastModified: latestDate,
      changeFrequency: 'weekly',
    },
    ...posts.map((post) => ({
      url: `https://masa373.work/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: 'monthly' as const,
    })),
  ]
}
