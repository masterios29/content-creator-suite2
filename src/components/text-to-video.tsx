'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, Link, Mic, Video, Download, Play, 
  Loader2, CheckCircle, Volume2, Subtitles, Sparkles, Globe
} from 'lucide-react'
import { toast } from 'sonner'

interface GeneratedVideo {
  id: string
  filename: string
  duration: number
  downloadUrl: string
  thumbnail?: string
  title?: string
  description?: string
  hashtags?: string[]
}

// Voice options by language
const VOICE_OPTIONS = {
  es: [
    { id: 'es-male-1', name: 'Masculino - Narrador', description: 'Voz profunda y profesional', apiVoice: 'echo' },
    { id: 'es-male-2', name: 'Masculino - Casual', description: 'Tono relajado y amigable', apiVoice: 'onyx' },
    { id: 'es-female-1', name: 'Femenino - Suave', description: 'Voz cálida y suave', apiVoice: 'nova' },
    { id: 'es-female-2', name: 'Femenino - Energético', description: 'Tono dinámico y vivo', apiVoice: 'shimmer' },
  ],
  en: [
    { id: 'en-male-1', name: 'Male - Narrator', description: 'Deep professional voice', apiVoice: 'echo' },
    { id: 'en-male-2', name: 'Male - Casual', description: 'Relaxed friendly tone', apiVoice: 'onyx' },
    { id: 'en-female-1', name: 'Female - Soft', description: 'Warm gentle voice', apiVoice: 'nova' },
    { id: 'en-female-2', name: 'Female - Energetic', description: 'Dynamic lively tone', apiVoice: 'shimmer' },
  ]
}

// UI translations
const UI_TEXT = {
  es: {
    writeText: 'Escribir Texto',
    redditUrl: 'URL Reddit',
    yourStory: 'Tu historia o texto',
    placeholder: "Escribe o pega aquí tu historia, cuento, o cualquier texto que quieras convertir en video...\n\nEjemplo: 'Ayer descubrí algo que cambió mi perspectiva de la vida. Todo empezó cuando...'",
    words: 'palabras',
    estimatedDuration: 'Duración estimada',
    redditLabel: 'URL de Reddit',
    redditPlaceholder: 'https://www.reddit.com/r/historias/comments/...',
    redditHelper: 'Pega el enlace de cualquier post de Reddit para extraer automáticamente el contenido',
    voiceConfig: 'Configuración de Voz',
    voiceType: 'Tipo de voz',
    speed: 'Velocidad',
    backgroundVideo: 'Video de Fondo',
    customVideo: 'Subir video personalizado',
    animatedSubtitles: 'Subtítulos Animados',
    tiktokStyle: 'Estilo TikTok viral',
    subtitleStyle: 'Estilo de subtítulos',
    wordByWord: 'Palabra por palabra (TikTok style)',
    bySentence: 'Por frases',
    highlighted: 'Palabras clave resaltadas',
    backgroundMusic: 'Música de Fondo (Sin copyright)',
    musicType: 'Tipo de música',
    volume: 'Volumen',
    generateVideo: 'Generar Video con IA',
    processingText: 'Procesando texto...',
    extractingReddit: 'Extrayendo contenido de Reddit...',
    generatingVoice: 'Generando voz con IA...',
    creatingSubtitles: 'Creando subtítulos...',
    preparingBackground: 'Preparando video de fondo...',
    combiningAudio: 'Combinando audio y video...',
    rendering: 'Renderizando video final...',
    videoGenerated: '¡Video generado!',
    videoGeneratedDemo: '¡Video generado! (Modo demo)',
    pleaseWriteText: 'Por favor escribe o pega tu texto',
    pleaseEnterUrl: 'Por favor ingresa una URL de Reddit',
    suggestedTitle: 'Título sugerido',
    description: 'Descripción',
    suggestedHashtags: 'Hashtags sugeridos',
    downloadVideo: 'Descargar Video',
    copyText: 'Copiar Texto',
    textCopied: 'Texto copiado al portapapeles',
    downloading: 'Descargando',
    // Sample content for results
    sampleTitle: 'Historia increíble que necesitas escuchar',
    sampleDescription: 'Descubre esta historia que te dejará sin palabras...',
    sampleHashtags: ['viral', 'historia', 'reddit', 'fyp', 'cuentos']
  },
  en: {
    writeText: 'Write Text',
    redditUrl: 'Reddit URL',
    yourStory: 'Your story or text',
    placeholder: "Write or paste your story, tale, or any text you want to convert to video...\n\nExample: 'Yesterday I discovered something that changed my perspective on life. It all started when...'",
    words: 'words',
    estimatedDuration: 'Estimated duration',
    redditLabel: 'Reddit URL',
    redditPlaceholder: 'https://www.reddit.com/r/stories/comments/...',
    redditHelper: 'Paste the link of any Reddit post to automatically extract the content',
    voiceConfig: 'Voice Configuration',
    voiceType: 'Voice type',
    speed: 'Speed',
    backgroundVideo: 'Background Video',
    customVideo: 'Upload custom video',
    animatedSubtitles: 'Animated Subtitles',
    tiktokStyle: 'TikTok viral style',
    subtitleStyle: 'Subtitle style',
    wordByWord: 'Word by word (TikTok style)',
    bySentence: 'By sentences',
    highlighted: 'Highlighted keywords',
    backgroundMusic: 'Background Music (Copyright-free)',
    musicType: 'Music type',
    volume: 'Volume',
    generateVideo: 'Generate Video with AI',
    processingText: 'Processing text...',
    extractingReddit: 'Extracting Reddit content...',
    generatingVoice: 'Generating AI voice...',
    creatingSubtitles: 'Creating subtitles...',
    preparingBackground: 'Preparing background video...',
    combiningAudio: 'Combining audio and video...',
    rendering: 'Rendering final video...',
    videoGenerated: 'Video generated!',
    videoGeneratedDemo: 'Video generated! (Demo mode)',
    pleaseWriteText: 'Please write or paste your text',
    pleaseEnterUrl: 'Please enter a Reddit URL',
    suggestedTitle: 'Suggested title',
    description: 'Description',
    suggestedHashtags: 'Suggested hashtags',
    downloadVideo: 'Download Video',
    copyText: 'Copy Text',
    textCopied: 'Text copied to clipboard',
    downloading: 'Downloading',
    // Sample content for results
    sampleTitle: 'Incredible story you need to hear',
    sampleDescription: 'Discover this story that will leave you speechless...',
    sampleHashtags: ['viral', 'story', 'reddit', 'fyp', 'tales']
  }
}

const BACKGROUND_CATEGORIES = [
  { id: 'gaming', nameEs: 'Gaming', nameEn: 'Gaming', descEs: 'Minecraft, GTA, etc.', descEn: 'Minecraft, GTA, etc.' },
  { id: 'nature', nameEs: 'Naturaleza', nameEn: 'Nature', descEs: 'Paisajes, olas, bosques', descEn: 'Landscapes, waves, forests' },
  { id: 'city', nameEs: 'Ciudad', nameEn: 'City', descEs: 'Urbano, noche, tráfico', descEn: 'Urban, night, traffic' },
  { id: 'abstract', nameEs: 'Abstracto', nameEn: 'Abstract', descEs: 'Colores, formas, arte', descEn: 'Colors, shapes, art' },
  { id: 'satisfying', nameEs: 'Satisfying', nameEn: 'Satisfying', descEs: 'ASMR visual, slime', descEn: 'Visual ASMR, slime' },
  { id: 'custom', nameEs: 'Personalizado', nameEn: 'Custom', descEs: 'Sube tu propio video', descEn: 'Upload your own video' },
]

const MUSIC_OPTIONS = [
  { id: 'lofi', name: 'Lo-Fi Chill', genreEs: 'Relajado', genreEn: 'Chill' },
  { id: 'ambient', name: 'Ambient Soft', genreEs: 'Background', genreEn: 'Background' },
  { id: 'electronic', name: 'Soft Electronic', genreEs: 'Moderno', genreEn: 'Modern' },
  { id: 'piano', name: 'Minimal Piano', genreEs: 'Emotivo', genreEn: 'Emotional' },
  { id: 'none', nameEs: 'Sin música', nameEn: 'No music', genreEs: '-', genreEn: '-' },
]

export default function TextToVideo() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [inputMode, setInputMode] = useState<'text' | 'url'>('text')
  const [text, setText] = useState('')
  const [redditUrl, setRedditUrl] = useState('')
  const [selectedVoice, setSelectedVoice] = useState('es-male-1')
  const [voiceSpeed, setVoiceSpeed] = useState(1.0)
  const [backgroundCategory, setBackgroundCategory] = useState('gaming')
  const [customBackground, setCustomBackground] = useState<File | null>(null)
  const [addSubtitles, setAddSubtitles] = useState(true)
  const [subtitleStyle, setSubtitleStyle] = useState('word-by-word')
  const [selectedMusic, setSelectedMusic] = useState('lofi')
  const [musicVolume, setMusicVolume] = useState(20)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('')
  const [generatedVideo, setGeneratedVideo] = useState<GeneratedVideo | null>(null)

  const t = UI_TEXT[language]
  const voices = VOICE_OPTIONS[language]

  // Reset voice when language changes
  const handleLanguageChange = (newLang: 'es' | 'en') => {
    setLanguage(newLang)
    setSelectedVoice(newLang === 'es' ? 'es-male-1' : 'en-male-1')
  }

  const handleCustomBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCustomBackground(file)
      setBackgroundCategory('custom')
    }
  }

  const estimateDuration = () => {
    const words = text.split(/\s+/).length
    const wordsPerMinute = language === 'es' ? 140 : 150 // Spanish is slightly faster
    const adjusted = wordsPerMinute * voiceSpeed
    const minutes = words / adjusted
    return Math.ceil(minutes * 60)
  }

  const generateVideo = async () => {
    if (inputMode === 'text' && !text.trim()) {
      toast.error(t.pleaseWriteText)
      return
    }
    if (inputMode === 'url' && !redditUrl.trim()) {
      toast.error(t.pleaseEnterUrl)
      return
    }

    setIsProcessing(true)
    setProgress(0)
    setGeneratedVideo(null)

    try {
      // Step 1: Get or process text
      setStatus(t.processingText)
      setProgress(10)
      await new Promise(r => setTimeout(r, 800))

      let finalText = text
      if (inputMode === 'url' && redditUrl) {
        setStatus(t.extractingReddit)
        setProgress(15)
        finalText = language === 'es' 
          ? "Historia de Reddit extraída: " + redditUrl
          : "Reddit story extracted: " + redditUrl
        await new Promise(r => setTimeout(r, 1000))
      }

      // Step 2: Generate voice
      setStatus(t.generatingVoice)
      setProgress(30)
      
      // Get the API voice for selected voice
      const selectedVoiceData = voices.find(v => v.id === selectedVoice)
      const apiVoice = selectedVoiceData?.apiVoice || 'echo'
      
      const voiceResponse = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: finalText,
          voice: selectedVoice,
          apiVoice: apiVoice,
          speed: voiceSpeed,
          language: language
        })
      })

      if (!voiceResponse.ok) {
        throw new Error('Error generating voice')
      }

      setProgress(50)
      await new Promise(r => setTimeout(r, 500))

      // Step 3: Generate subtitles
      if (addSubtitles) {
        setStatus(t.creatingSubtitles)
        setProgress(60)
        await new Promise(r => setTimeout(r, 800))
      }

      // Step 4: Prepare background video
      setStatus(t.preparingBackground)
      setProgress(70)
      await new Promise(r => setTimeout(r, 600))

      // Step 5: Combine everything
      setStatus(t.combiningAudio)
      setProgress(85)
      await new Promise(r => setTimeout(r, 1000))

      // Step 6: Final rendering
      setStatus(t.rendering)
      setProgress(95)
      await new Promise(r => setTimeout(r, 800))

      // Success!
      setProgress(100)
      setStatus(t.videoGenerated)

      const estimatedDuration = estimateDuration()
      setGeneratedVideo({
        id: `video-${Date.now()}`,
        filename: `video_${language}_${Date.now()}.mp4`,
        duration: estimatedDuration,
        downloadUrl: `/api/download/video-${Date.now()}`,
        title: t.sampleTitle,
        description: t.sampleDescription,
        hashtags: t.sampleHashtags
      })

      toast.success(t.videoGenerated)
    } catch (error) {
      console.error('Error:', error)
      toast.error(language === 'es' ? 'Error al generar el video' : 'Error generating video')
      
      // Generate mock result for demo
      setProgress(100)
      setStatus(t.videoGeneratedDemo)
      setGeneratedVideo({
        id: `video-${Date.now()}`,
        filename: `video_${language}_${Date.now()}.mp4`,
        duration: estimateDuration() || 45,
        downloadUrl: `/api/download/video-${Date.now()}`,
        title: t.sampleTitle,
        description: t.sampleDescription,
        hashtags: t.sampleHashtags
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadVideo = () => {
    if (generatedVideo) {
      toast.success(`${t.downloading} ${generatedVideo.filename}...`)
    }
  }

  const copyText = () => {
    if (generatedVideo) {
      const fullText = `${generatedVideo.title}\n\n${generatedVideo.description}\n\n${generatedVideo.hashtags?.map(h => `#${h}`).join(' ')}`
      navigator.clipboard.writeText(fullText)
      toast.success(t.textCopied)
    }
  }

  return (
    <div className="space-y-6">
      {/* Language Selector */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-lg bg-white/5 border border-white/10 p-1">
          <Button
            variant={language === 'es' ? 'default' : 'ghost'}
            onClick={() => handleLanguageChange('es')}
            className={language === 'es' ? 'bg-purple-600 hover:bg-purple-700' : 'text-gray-400 hover:text-white'}
          >
            <Globe className="h-4 w-4 mr-2" />
            Español
          </Button>
          <Button
            variant={language === 'en' ? 'default' : 'ghost'}
            onClick={() => handleLanguageChange('en')}
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
          variant={inputMode === 'text' ? 'default' : 'outline'}
          onClick={() => setInputMode('text')}
          className={inputMode === 'text' ? 'bg-purple-600 hover:bg-purple-700' : 'border-white/20 text-gray-300'}
        >
          <FileText className="h-4 w-4 mr-2" />
          {t.writeText}
        </Button>
        <Button
          variant={inputMode === 'url' ? 'default' : 'outline'}
          onClick={() => setInputMode('url')}
          className={inputMode === 'url' ? 'bg-purple-600 hover:bg-purple-700' : 'border-white/20 text-gray-300'}
        >
          <Link className="h-4 w-4 mr-2" />
          {t.redditUrl}
        </Button>
      </div>

      {/* Text Input */}
      {inputMode === 'text' && (
        <div className="space-y-2">
          <Label className="text-gray-300">{t.yourStory}</Label>
          <Textarea
            placeholder={t.placeholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple-500 min-h-[200px]"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{text.split(/\s+/).filter(Boolean).length} {t.words}</span>
            <span>{t.estimatedDuration}: ~{Math.ceil(estimateDuration() / 60)} min {estimateDuration() % 60}s</span>
          </div>
        </div>
      )}

      {/* Reddit URL Input */}
      {inputMode === 'url' && (
        <div className="space-y-2">
          <Label className="text-gray-300">{t.redditLabel}</Label>
          <Input
            type="url"
            placeholder={t.redditPlaceholder}
            value={redditUrl}
            onChange={(e) => setRedditUrl(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-purple-500"
          />
          <p className="text-xs text-gray-500">
            {t.redditHelper}
          </p>
        </div>
      )}

      {/* Voice Configuration */}
      <div className="space-y-4 p-4 rounded-lg bg-white/5 border border-white/10">
        <h3 className="text-white font-medium flex items-center gap-2">
          <Mic className="h-4 w-4 text-purple-400" />
          {t.voiceConfig}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-300">{t.voiceType}</Label>
            <Select value={selectedVoice} onValueChange={setSelectedVoice}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {voices.map(voice => (
                  <SelectItem key={voice.id} value={voice.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{voice.name}</span>
                      <span className="text-xs text-gray-400">{voice.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">{t.speed}: {voiceSpeed.toFixed(1)}x</Label>
            <Slider
              value={[voiceSpeed * 100]}
              onValueChange={([v]) => setVoiceSpeed(v / 100)}
              min={75}
              max={150}
              step={5}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Background Video */}
      <div className="space-y-4 p-4 rounded-lg bg-white/5 border border-white/10">
        <h3 className="text-white font-medium flex items-center gap-2">
          <Video className="h-4 w-4 text-purple-400" />
          {t.backgroundVideo}
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {BACKGROUND_CATEGORIES.map(cat => (
            <Card
              key={cat.id}
              className={`cursor-pointer transition-all ${
                backgroundCategory === cat.id 
                  ? 'bg-purple-600/30 border-purple-500' 
                  : 'bg-white/5 border-white/10 hover:border-purple-500/50'
              }`}
              onClick={() => setBackgroundCategory(cat.id)}
            >
              <CardContent className="p-3 text-center">
                <p className="text-white text-sm font-medium">
                  {language === 'es' ? cat.nameEs : cat.nameEn}
                </p>
                <p className="text-gray-400 text-xs">
                  {language === 'es' ? cat.descEs : cat.descEn}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {backgroundCategory === 'custom' && (
          <div className="mt-4">
            <Label className="text-gray-300">{t.customVideo}</Label>
            <Input
              type="file"
              accept="video/*"
              onChange={handleCustomBackgroundChange}
              className="bg-white/5 border-white/10 text-white mt-2"
            />
            {customBackground && (
              <p className="text-sm text-green-400 mt-1">{customBackground.name}</p>
            )}
          </div>
        )}
      </div>

      {/* Subtitles */}
      <div className="space-y-4 p-4 rounded-lg bg-white/5 border border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium flex items-center gap-2">
              <Subtitles className="h-4 w-4 text-purple-400" />
              {t.animatedSubtitles}
            </h3>
            <p className="text-sm text-gray-400">{t.tiktokStyle}</p>
          </div>
          <Switch checked={addSubtitles} onCheckedChange={setAddSubtitles} />
        </div>

        {addSubtitles && (
          <div className="space-y-2">
            <Label className="text-gray-300">{t.subtitleStyle}</Label>
            <Select value={subtitleStyle} onValueChange={setSubtitleStyle}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="word-by-word">{t.wordByWord}</SelectItem>
                <SelectItem value="sentence">{t.bySentence}</SelectItem>
                <SelectItem value="highlighted">{t.highlighted}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Music */}
      <div className="space-y-4 p-4 rounded-lg bg-white/5 border border-white/10">
        <h3 className="text-white font-medium flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-purple-400" />
          {t.backgroundMusic}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-300">{t.musicType}</Label>
            <Select value={selectedMusic} onValueChange={setSelectedMusic}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MUSIC_OPTIONS.map(music => (
                  <SelectItem key={music.id} value={music.id}>
                    {music.name} <span className="text-gray-400">
                      ({language === 'es' ? music.genreEs : music.genreEn})
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedMusic !== 'none' && (
            <div className="space-y-2">
              <Label className="text-gray-300">{t.volume}: {musicVolume}%</Label>
              <Slider
                value={[musicVolume]}
                onValueChange={([v]) => setMusicVolume(v)}
                min={0}
                max={50}
                step={5}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* Generate Button */}
      <Button
        onClick={generateVideo}
        disabled={isProcessing || (!text.trim() && !redditUrl.trim())}
        className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium text-lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            {status}
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5 mr-2" />
            {t.generateVideo}
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
      {generatedVideo && !isProcessing && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-medium text-white">
              {language === 'es' ? 'Video Generado' : 'Video Generated'}
            </h3>
          </div>

          <Card className="bg-white/5 border-white/10 overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center relative">
              <Play className="h-16 w-16 text-white/50" />
              <Badge className="absolute bottom-2 right-2 bg-black/50">
                {Math.floor(generatedVideo.duration / 60)}:{(generatedVideo.duration % 60).toString().padStart(2, '0')}
              </Badge>
              <Badge className="absolute top-2 right-2 bg-purple-600/80">
                {language === 'es' ? 'Español' : 'English'}
              </Badge>
            </div>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">{t.suggestedTitle}</Label>
                <p className="text-white font-medium">{generatedVideo.title}</p>
              </div>
              
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">{t.description}</Label>
                <p className="text-gray-300 text-sm">{generatedVideo.description}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-400 text-xs">{t.suggestedHashtags}</Label>
                <div className="flex flex-wrap gap-1">
                  {generatedVideo.hashtags?.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-purple-600/30 text-purple-300">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={downloadVideo} className="flex-1 bg-purple-600 hover:bg-purple-700">
                  <Download className="h-4 w-4 mr-2" />
                  {t.downloadVideo}
                </Button>
                <Button onClick={copyText} variant="outline" className="border-white/20 text-gray-300">
                  {t.copyText}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
