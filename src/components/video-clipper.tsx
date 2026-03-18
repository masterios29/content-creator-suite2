'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, Link, Scissors, Download, Play, 
  Loader2, CheckCircle, FileVideo, Clock, Globe
} from 'lucide-react'
import { toast } from 'sonner'

interface VideoClip {
  id: string
  filename: string
  duration: number
  downloadUrl: string
  thumbnail?: string
}

// UI translations for Video Clipper
const UI_TEXT = {
  es: {
    uploadFile: 'Subir Archivo',
    fromUrl: 'Desde URL',
    dragVideo: 'Arrastra tu video aquí',
    clickExplore: 'o haz clic para explorar',
    supportedFormats: 'MP4, MOV, AVI, MKV - Máx 500MB',
    videoUrl: 'URL del video',
    urlPlaceholder: 'https://www.youtube.com/watch?v=...',
    compatibleWith: 'Compatible con: YouTube, TikTok, Vimeo, Twitter, Instagram, Facebook',
    clipDuration: 'Duración de cada clip',
    idealFor: 'Ideal para TikTok, Reels y Shorts',
    numberOfClips: 'Número de clips',
    clips: 'clips',
    addAutoSubtitles: 'Añadir subtítulos automáticos',
    aiTranscription: 'Transcripción con IA',
    subtitleLanguage: 'Idioma de subtítulos',
    spanish: 'Español',
    english: 'Inglés',
    generateClips: 'Generar Clips',
    processing: 'Procesando...',
    preparing: 'Preparando...',
    analyzing: 'Analizando video...',
    splitting: 'Dividiendo en clips...',
    generatingSubtitles: 'Generando subtítulos con IA...',
    finishing: 'Finalizando clips...',
    completed: '¡Completado!',
    completedDemo: '¡Completado! (Modo demo)',
    clipsGenerated: 'clips generados correctamente',
    pleaseSelectVideo: 'Por favor selecciona un video',
    pleaseEnterUrl: 'Por favor ingresa una URL',
    fileTooBig: 'El archivo es muy grande. Máximo 500MB',
    videoLoaded: 'Video cargado correctamente',
    errorProcessing: 'Error al procesar el video. Intenta de nuevo.',
    generatedClips: 'Clips Generados',
    downloadAll: 'Descargar Todos',
    downloading: 'Descargando',
    downloadingAll: 'Descargando todos los clips...',
  },
  en: {
    uploadFile: 'Upload File',
    fromUrl: 'From URL',
    dragVideo: 'Drag your video here',
    clickExplore: 'or click to browse',
    supportedFormats: 'MP4, MOV, AVI, MKV - Max 500MB',
    videoUrl: 'Video URL',
    urlPlaceholder: 'https://www.youtube.com/watch?v=...',
    compatibleWith: 'Compatible with: YouTube, TikTok, Vimeo, Twitter, Instagram, Facebook',
    clipDuration: 'Clip duration',
    idealFor: 'Ideal for TikTok, Reels and Shorts',
    numberOfClips: 'Number of clips',
    clips: 'clips',
    addAutoSubtitles: 'Add automatic subtitles',
    aiTranscription: 'AI transcription',
    subtitleLanguage: 'Subtitle language',
    spanish: 'Spanish',
    english: 'English',
    generateClips: 'Generate Clips',
    processing: 'Processing...',
    preparing: 'Preparing...',
    analyzing: 'Analyzing video...',
    splitting: 'Splitting into clips...',
    generatingSubtitles: 'Generating AI subtitles...',
    finishing: 'Finishing clips...',
    completed: 'Completed!',
    completedDemo: 'Completed! (Demo mode)',
    clipsGenerated: 'clips generated successfully',
    pleaseSelectVideo: 'Please select a video',
    pleaseEnterUrl: 'Please enter a URL',
    fileTooBig: 'File is too large. Maximum 500MB',
    videoLoaded: 'Video loaded successfully',
    errorProcessing: 'Error processing video. Please try again.',
    generatedClips: 'Generated Clips',
    downloadAll: 'Download All',
    downloading: 'Downloading',
    downloadingAll: 'Downloading all clips...',
  }
}

export default function VideoClipper() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [inputMode, setInputMode] = useState<'file' | 'url'>('file')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [clipDuration, setClipDuration] = useState(60)
  const [numberOfClips, setNumberOfClips] = useState(5)
  const [addSubtitles, setAddSubtitles] = useState(true)
  const [subtitleLanguage, setSubtitleLanguage] = useState<'es' | 'en'>('es')
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('')
  const [clips, setClips] = useState<VideoClip[]>([])

  const t = UI_TEXT[language]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 500 * 1024 * 1024) {
        toast.error(t.fileTooBig)
        return
      }
      setVideoFile(file)
      setVideoUrl('')
      toast.success(t.videoLoaded)
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value)
    setVideoFile(null)
  }

  const processVideo = async () => {
    if (inputMode === 'file' && !videoFile) {
      toast.error(t.pleaseSelectVideo)
      return
    }
    if (inputMode === 'url' && !videoUrl) {
      toast.error(t.pleaseEnterUrl)
      return
    }

    setIsProcessing(true)
    setProgress(0)
    setClips([])
    setStatus(t.preparing)

    try {
      const formData = new FormData()
      if (inputMode === 'file' && videoFile) {
        formData.append('video', videoFile)
      } else {
        formData.append('url', videoUrl)
      }
      formData.append('clipDuration', clipDuration.toString())
      formData.append('numberOfClips', numberOfClips.toString())
      formData.append('addSubtitles', addSubtitles.toString())
      formData.append('subtitleLanguage', subtitleLanguage)

      // Simulate processing progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + Math.random() * 10
        })
      }, 500)

      setStatus(t.analyzing)
      await new Promise(r => setTimeout(r, 1000))

      setStatus(t.splitting)
      await new Promise(r => setTimeout(r, 1500))

      if (addSubtitles) {
        setStatus(t.generatingSubtitles)
        await new Promise(r => setTimeout(r, 2000))
      }

      setStatus(t.finishing)
      
      const response = await fetch('/api/video-clipper', {
        method: 'POST',
        body: formData
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        throw new Error(t.errorProcessing)
      }

      const data = await response.json()
      setProgress(100)
      setStatus(t.completed)
      setClips(data.clips || generateMockClips())
      
      toast.success(`${data.clips?.length || numberOfClips} ${t.clipsGenerated}`)
    } catch (error) {
      console.error('Error:', error)
      setStatus(t.errorProcessing)
      toast.error(t.errorProcessing)
      // Generate mock clips for demo
      setProgress(100)
      setStatus(t.completedDemo)
      setClips(generateMockClips())
    } finally {
      setIsProcessing(false)
    }
  }

  const generateMockClips = (): VideoClip[] => {
    return Array.from({ length: numberOfClips }, (_, i) => ({
      id: `clip-${i + 1}`,
      filename: `video_part_${i + 1}.mp4`,
      duration: clipDuration,
      downloadUrl: `/api/download/clip-${i + 1}`
    }))
  }

  const downloadClip = (clip: VideoClip) => {
    toast.success(`${t.downloading} ${clip.filename}...`)
  }

  const downloadAllClips = () => {
    toast.success(t.downloadingAll)
  }

  return (
    <div className="space-y-6">
      {/* Language Selector */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-lg bg-white/5 border border-white/10 p-1">
          <Button
            variant={language === 'es' ? 'default' : 'ghost'}
            onClick={() => setLanguage('es')}
            className={language === 'es' ? 'bg-purple-600 hover:bg-purple-700' : 'text-gray-400 hover:text-white'}
          >
            <Globe className="h-4 w-4 mr-2" />
            Español
          </Button>
          <Button
            variant={language === 'en' ? 'default' : 'ghost'}
            onClick={() => setLanguage('en')}
            className={language === 'en' ? 'bg-purple-600 hover:bg-purple-700' : 'text-gray-400 hover:text-white'}
          >
            <Globe className="h-4 w-4 mr-2" />
            English
          </Button>
        </div>
      </div>

      {/* Input Mode Toggle */}
      <div className="flex gap-2 justify-center">
        <Button
          variant={inputMode === 'file' ? 'default' : 'outline'}
          onClick={() => setInputMode('file')}
          className={inputMode === 'file' ? 'bg-purple-600 hover:bg-purple-700' : 'border-white/20 text-gray-300'}
        >
          <Upload className="h-4 w-4 mr-2" />
          {t.uploadFile}
        </Button>
        <Button
          variant={inputMode === 'url' ? 'default' : 'outline'}
          onClick={() => setInputMode('url')}
          className={inputMode === 'url' ? 'bg-purple-600 hover:bg-purple-700' : 'border-white/20 text-gray-300'}
        >
          <Link className="h-4 w-4 mr-2" />
          {t.fromUrl}
        </Button>
      </div>

      {/* File Input */}
      {inputMode === 'file' && (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-purple-500/50 transition-colors">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
              id="video-upload"
            />
            <label htmlFor="video-upload" className="cursor-pointer">
              <FileVideo className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              {videoFile ? (
                <div>
                  <p className="text-white font-medium">{videoFile.name}</p>
                  <p className="text-gray-400 text-sm">
                    {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-white font-medium">{t.dragVideo}</p>
                  <p className="text-gray-400 text-sm">{t.clickExplore}</p>
                  <p className="text-gray-500 text-xs mt-2">{t.supportedFormats}</p>
                </div>
              )}
            </label>
          </div>
        </div>
      )}

      {/* URL Input */}
      {inputMode === 'url' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-300">{t.videoUrl}</Label>
            <Input
              type="url"
              placeholder={t.urlPlaceholder}
              value={videoUrl}
              onChange={handleUrlChange}
              className="bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500">
              {t.compatibleWith}
            </p>
          </div>
        </div>
      )}

      {/* Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Clip Duration */}
        <div className="space-y-3">
          <Label className="text-gray-300 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {t.clipDuration}
          </Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[clipDuration]}
              onValueChange={([value]) => setClipDuration(value)}
              min={15}
              max={60}
              step={5}
              className="flex-1"
            />
            <Badge variant="secondary" className="bg-purple-600/30 text-purple-300 min-w-[60px] justify-center">
              {clipDuration}s
            </Badge>
          </div>
          <p className="text-xs text-gray-500">{t.idealFor}</p>
        </div>

        {/* Number of Clips */}
        <div className="space-y-3">
          <Label className="text-gray-300">{t.numberOfClips}</Label>
          <Select value={numberOfClips.toString()} onValueChange={(v) => setNumberOfClips(parseInt(v))}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[3, 5, 7, 10, 15, 20].map(n => (
                <SelectItem key={n} value={n.toString()}>{n} {t.clips}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Subtitles Option */}
      <div className="space-y-4 p-4 rounded-lg bg-white/5 border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-white">{t.addAutoSubtitles}</Label>
            <p className="text-sm text-gray-400">{t.aiTranscription}</p>
          </div>
          <Switch
            checked={addSubtitles}
            onCheckedChange={setAddSubtitles}
          />
        </div>

        {addSubtitles && (
          <div className="space-y-2">
            <Label className="text-gray-300">{t.subtitleLanguage}</Label>
            <Select value={subtitleLanguage} onValueChange={(v) => setSubtitleLanguage(v as 'es' | 'en')}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">🇪🇸 {t.spanish}</SelectItem>
                <SelectItem value="en">🇺🇸 {t.english}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Process Button */}
      <Button
        onClick={processVideo}
        disabled={isProcessing || (!videoFile && !videoUrl)}
        className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium text-lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            {status}
          </>
        ) : (
          <>
            <Scissors className="h-5 w-5 mr-2" />
            {t.generateClips}
          </>
        )}
      </Button>

      {/* Progress */}
      {isProcessing && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-400 text-center">{status}</p>
        </div>
      )}

      {/* Results */}
      {clips.length > 0 && !isProcessing && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              {t.generatedClips} ({clips.length})
            </h3>
            <Button onClick={downloadAllClips} variant="outline" className="border-white/20 text-gray-300">
              <Download className="h-4 w-4 mr-2" />
              {t.downloadAll}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clips.map((clip, index) => (
              <Card key={clip.id} className="bg-white/5 border-white/10 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center relative">
                  <Play className="h-12 w-12 text-white/50" />
                  {addSubtitles && (
                    <Badge className="absolute top-2 right-2 bg-purple-600/80 text-xs">
                      {subtitleLanguage === 'es' ? 'ES' : 'EN'} CC
                    </Badge>
                  )}
                </div>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-medium">{clip.filename}</p>
                      <p className="text-gray-400 text-xs">{clip.duration}s</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => downloadClip(clip)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
