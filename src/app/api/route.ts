import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    name: 'Content Creator Suite API',
    version: '1.0.0',
    endpoints: {
      videoClipper: '/api/video-clipper',
      textToSpeech: '/api/text-to-speech',
      download: '/api/download'
    },
    status: 'running'
  })
}
