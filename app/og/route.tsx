import { ImageResponse } from 'next/og'

export function GET(request: Request) {
  const url = new URL(request.url)
  const title = (url.searchParams.get('title') || 'Anand Thakkar').slice(0, 200)

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
        <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
          <h2 tw="flex flex-col text-4xl font-bold tracking-tight text-left">
            {title}
          </h2>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // Output depends only on `title`, so let the CDN keep it.
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400',
      },
    }
  )
}
