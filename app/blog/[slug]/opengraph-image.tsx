import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          letterSpacing: '-.02em',
          background: 'white',
          border: '24px solid #ffde59',
          padding: 32,
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            color: 'black',
          }}
        >
          <p
            style={{
              fontSize: 80,
              margin: 0,
            }}
          >
            {post.title}
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src="https://masa373.work/images/avatar.jpg"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                }}
              />
              <span
                style={{
                  fontSize: 32,
                  marginLeft: 8,
                }}
              >
                masa373
              </span>
            </div>
            <img
              src="https://masa373.work/assets/brand-logo.png"
              style={{
                height: 80,
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
