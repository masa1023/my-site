import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          background: 'white',
          border: '16px solid #ffde59',
          padding: 32,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            margin: 'auto',
          }}
        >
          <img src="https://masa373.work/assets/brand-logo.png" />
          <p
            style={{
              fontSize: 16,
              marginTop: 8,
              textAlign: 'center',
            }}
          >
            Thoughts, tutorials, and insights about web development, AI, and
            emerging technologies.
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
