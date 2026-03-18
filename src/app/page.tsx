'use client'

import { useState } from 'react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('clipper')
  const [text, setText] = useState('')

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #581c87, #111827)',
      color: 'white'
    }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.2)',
        padding: '1rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '2rem' }}>🎬</span>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Content Creator Suite</h1>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Videos virales en segundos</p>
            </div>
          </div>
          <span style={{
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            background: 'rgba(34,197,94,0.2)',
            color: '#4ade80',
            fontSize: '0.875rem'
          }}>
            v1.0
          </span>
        </div>
      </header>

      {/* Tabs */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            borderRadius: '0.5rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '0.25rem'
          }}>
            <button
              onClick={() => setActiveTab('clipper')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                background: activeTab === 'clipper' ? '#9333ea' : 'transparent',
                color: activeTab === 'clipper' ? 'white' : '#9ca3af',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              ✂️ Video Clipper
            </button>
            <button
              onClick={() => setActiveTab('text-to-video')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                background: activeTab === 'text-to-video' ? '#9333ea' : 'transparent',
                color: activeTab === 'text-to-video' ? 'white' : '#9ca3af',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              📝 Texto a Video
            </button>
          </div>
        </div>

        {/* Video Clipper Tab */}
        {activeTab === 'clipper' && (
          <div style={{
            maxWidth: '768px',
            margin: '0 auto',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1rem',
            padding: '1.5rem'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '0.5rem' }}>
              ✂️ Video Clipper
            </h2>
            <p style={{ color: '#9ca3af', textAlign: 'center', marginBottom: '1.5rem' }}>
              Divide videos largos en clips perfectos para TikTok, Reels y YouTube Shorts
            </p>

            {/* File Upload */}
            <div style={{
              border: '2px dashed rgba(255,255,255,0.2)',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
              <p style={{ fontWeight: '500' }}>Arrastra tu video aquí</p>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>o haz clic para explorar</p>
              <p style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.5rem' }}>MP4, MOV, AVI - Máx 500MB</p>
            </div>

            {/* Settings */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', padding: '1rem' }}>
                <label style={{ color: '#d1d5db', fontSize: '0.875rem' }}>Duración de clips</label>
                <select style={{
                  width: '100%',
                  marginTop: '0.5rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.375rem',
                  padding: '0.5rem',
                  color: 'white'
                }}>
                  <option>45 segundos</option>
                  <option>60 segundos</option>
                </select>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', padding: '1rem' }}>
                <label style={{ color: '#d1d5db', fontSize: '0.875rem' }}>Número de clips</label>
                <select style={{
                  width: '100%',
                  marginTop: '0.5rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.375rem',
                  padding: '0.5rem',
                  color: 'white'
                }}>
                  <option>5 clips</option>
                  <option>10 clips</option>
                </select>
              </div>
            </div>

            <button style={{
              width: '100%',
              padding: '0.75rem',
              background: 'linear-gradient(to right, #9333ea, #db2777)',
              borderRadius: '0.5rem',
              color: 'white',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer'
            }}>
              ✂️ Generar Clips
            </button>
          </div>
        )}

        {/* Text to Video Tab */}
        {activeTab === 'text-to-video' && (
          <div style={{
            maxWidth: '768px',
            margin: '0 auto',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1rem',
            padding: '1.5rem'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '0.5rem' }}>
              📝 Texto a Video
            </h2>
            <p style={{ color: '#9ca3af', textAlign: 'center', marginBottom: '1.5rem' }}>
              Convierte historias de Reddit, Wattpad o tus textos en videos con voz IA
            </p>

            {/* Language Selector */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                display: 'inline-flex',
                borderRadius: '0.5rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '0.25rem'
              }}>
                <button style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  background: '#9333ea',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  🇪🇸 Español
                </button>
                <button style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  background: 'transparent',
                  color: '#9ca3af',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  🇺🇸 English
                </button>
              </div>
            </div>

            {/* Text Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '0.5rem', display: 'block' }}>
                Tu historia o texto
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribe o pega aquí tu historia... Ejemplo: 'Ayer descubrí algo que cambió mi vida...'"
                style={{
                  width: '100%',
                  height: '10rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  color: 'white',
                  resize: 'none'
                }}
              />
              <p style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                {text.split(/\s+/).filter(Boolean).length} palabras
              </p>
            </div>

            {/* Voice Selection */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', padding: '1rem' }}>
                <label style={{ color: '#d1d5db', fontSize: '0.875rem' }}>Tipo de voz</label>
                <select style={{
                  width: '100%',
                  marginTop: '0.5rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.375rem',
                  padding: '0.5rem',
                  color: 'white'
                }}>
                  <option>Masculino - Narrador</option>
                  <option>Masculino - Casual</option>
                  <option>Femenino - Suave</option>
                  <option>Femenino - Energético</option>
                </select>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', padding: '1rem' }}>
                <label style={{ color: '#d1d5db', fontSize: '0.875rem' }}>Video de fondo</label>
                <select style={{
                  width: '100%',
                  marginTop: '0.5rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.375rem',
                  padding: '0.5rem',
                  color: 'white'
                }}>
                  <option>🎮 Gaming</option>
                  <option>🌊 Naturaleza</option>
                  <option>🏙️ Ciudad</option>
                  <option>🎨 Abstracto</option>
                </select>
              </div>
            </div>

            <button style={{
              width: '100%',
              padding: '0.75rem',
              background: 'linear-gradient(to right, #9333ea, #db2777)',
              borderRadius: '0.5rem',
              color: 'white',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer'
            }}>
              ✨ Generar Video con IA
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.2)',
        padding: '1rem'
      }}>
        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
          Content Creator Suite - Creado con IA para creadores de contenido
        </p>
      </footer>
    </main>
  )
}
