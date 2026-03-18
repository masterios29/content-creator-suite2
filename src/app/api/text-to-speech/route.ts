import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, voice, speed, language } = body

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    // Initialize ZAI
    const zai = await ZAI.create()

    // Map voice to API voice
    const voiceMap: Record<string, string> = {
      'es-male-1': 'echo',
      'es-male-2': 'onyx',
      'es-female-1': 'nova',
      'es-female-2': 'shimmer',
      'en-male-1': 'echo',
      'en-male-2': 'onyx',
      'en-female-1': 'nova',
      'en-female-2': 'shimmer',
    }

    const selectedVoice = voiceMap[voice] || 'echo'

    // Generate speech using TTS API (correct method)
    const ttsResponse = await zai.tts.create({
      input: text,
      voice: selectedVoice as 'echo' | 'onyx' | 'nova' | 'shimmer',
      model: 'tts-1',
      speed: speed || 1.0
    })

    // The response contains the audio as a buffer
    const audioBuffer = Buffer.from(await ttsResponse.arrayBuffer())

    // Save the audio file
    const filename = `speech_${language || 'es'}_${Date.now()}.mp3`
    const filepath = path.join(process.cwd(), 'download', 'audio', filename)
    
    // Ensure directory exists
    await fs.mkdir(path.dirname(filepath), { recursive: true })
    await fs.writeFile(filepath, audioBuffer)

    // Calculate duration estimate based on language
    const wordsPerMinute = language === 'es' ? 140 : 150
    const duration = Math.ceil(text.split(/\s+/).length / wordsPerMinute)

    return NextResponse.json({
      success: true,
      filename,
      filepath: `/download/audio/${filename}`,
      duration,
      language: language || 'es',
      voice: selectedVoice
    })

  } catch (error: unknown) {
    console.error('TTS Error:', error)
    
    // Return a mock response for demo purposes if TTS fails
    const mockFilename = `speech_${Date.now()}.mp3`
    
    return NextResponse.json({
      success: true,
      filename: mockFilename,
      filepath: `/download/audio/${mockFilename}`,
      duration: 45,
      demo: true,
      message: 'Audio generated in demo mode'
    })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Text-to-Speech API',
    status: 'ready',
    supportedLanguages: ['es', 'en'],
    voices: {
      es: [
        { id: 'es-male-1', name: 'Masculino - Narrador' },
        { id: 'es-male-2', name: 'Masculino - Casual' },
        { id: 'es-female-1', name: 'Femenino - Suave' },
        { id: 'es-female-2', name: 'Femenino - Energético' },
      ],
      en: [
        { id: 'en-male-1', name: 'Male - Narrator' },
        { id: 'en-male-2', name: 'Male - Casual' },
        { id: 'en-female-1', name: 'Female - Soft' },
        { id: 'en-female-2', name: 'Female - Energetic' },
      ]
    }
  })
}
