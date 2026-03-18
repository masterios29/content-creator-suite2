import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const video = formData.get('video') as File | null
    const url = formData.get('url') as string | null
    const clipDuration = parseInt(formData.get('clipDuration') as string) || 60
    const numberOfClips = parseInt(formData.get('numberOfClips') as string) || 5
    const addSubtitles = formData.get('addSubtitles') === 'true'

    // Create output directory
    const outputDir = path.join(process.cwd(), 'download', 'videos')
    await fs.mkdir(outputDir, { recursive: true })

    // Generate mock clips for demonstration
    // In production, this would use FFmpeg to actually split the video
    const clips = []
    
    for (let i = 1; i <= numberOfClips; i++) {
      const clipId = `clip_${Date.now()}_${i}`
      const filename = `video_parte_${i}.mp4`
      
      clips.push({
        id: clipId,
        filename,
        duration: clipDuration,
        downloadUrl: `/api/download/${clipId}`,
        order: i
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Video processed successfully',
      clips,
      totalDuration: clipDuration * numberOfClips,
      processedAt: new Date().toISOString()
    })

  } catch (error: any) {
    console.error('Video processing error:', error)
    
    return NextResponse.json(
      { error: 'Failed to process video', message: error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Video Clipper API',
    status: 'ready',
    supportedFormats: ['mp4', 'mov', 'avi', 'mkv', 'webm'],
    maxFileSize: '500MB'
  })
}
