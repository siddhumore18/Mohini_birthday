import { useRef, useState, useEffect, useCallback } from 'react'
import { ambientSynth } from '../utils/audio'

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const userManuallyMutedRef = useRef(false)
  const musicSrc = '/music/birthday-bg.mp3'

  // Toggle Play / Pause
  const toggle = useCallback((e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation() // Prevent event bubbling to window
    }

    const audio = audioRef.current
    if (!audio) return

    // Stop synth in case it was playing
    ambientSynth.stop()

    if (!audio.paused) {
      // User explicitly wants to TURN OFF / MUTE
      userManuallyMutedRef.current = true
      audio.pause()
      setPlaying(false)
    } else {
      // User explicitly wants to TURN ON / PLAY
      userManuallyMutedRef.current = false
      audio.volume = 0.55
      audio.loop = true
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {})
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.55
    audio.loop = true

    // 1. Attempt initial autoplay
    const promise = audio.play()
    if (promise !== undefined) {
      promise
        .then(() => {
          setPlaying(true)
        })
        .catch(() => {
          // Blocked by browser security policy until first interaction
          setPlaying(false)
        })
    }

    // 2. Start on first interaction ONLY if user hasn't manually clicked mute
    const handleFirstInteraction = (e) => {
      // Don't auto-start if user specifically clicked the music toggle button!
      if (e.target && e.target.closest && e.target.closest('.music-toggle')) {
        return
      }

      if (userManuallyMutedRef.current) {
        return
      }

      const el = audioRef.current
      if (el && el.paused && !userManuallyMutedRef.current) {
        el.volume = 0.55
        el.loop = true
        el.play()
          .then(() => setPlaying(true))
          .catch(() => {})
      }

      // Remove after first trigger
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
      window.removeEventListener('pointerdown', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }

    window.addEventListener('click', handleFirstInteraction)
    window.addEventListener('touchstart', handleFirstInteraction)
    window.addEventListener('pointerdown', handleFirstInteraction)
    window.addEventListener('keydown', handleFirstInteraction)

    return () => {
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
      window.removeEventListener('pointerdown', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [])

  return (
    <>
      {/* Native HTML5 Audio element */}
      <audio
        ref={audioRef}
        src={musicSrc}
        preload="auto"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          const el = audioRef.current
          if (el && !userManuallyMutedRef.current) {
            el.currentTime = 0
            el.play().catch(() => {})
          }
        }}
      />

      {/* Floating Music Controller */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {playing && (
          <div
            style={{
              background: 'rgba(245, 240, 232, 0.95)',
              border: '1px solid rgba(107, 45, 62, 0.4)',
              borderRadius: '16px',
              padding: '4px 10px',
              fontFamily: 'var(--font-headline)',
              fontSize: '0.75rem',
              color: 'var(--burgundy)',
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              animation: 'fadeIn 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              pointerEvents: 'none',
            }}
          >
            <span>🎶 Song Playing</span>
          </div>
        )}

        <button
          className="music-toggle"
          onClick={toggle}
          aria-label={playing ? 'Turn off background song' : 'Turn on background song'}
          title={playing ? 'Click to MUTE / TURN OFF song' : 'Click to PLAY song'}
          style={{
            borderColor: playing ? 'var(--burgundy)' : 'var(--ink-light)',
            boxShadow: playing ? '0 0 12px rgba(107, 45, 62, 0.35)' : 'var(--paper-shadow)',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              fontSize: '1.3rem',
              display: 'inline-block',
              animation: playing ? 'pulseGentle 1.8s infinite ease-in-out' : 'none',
            }}
          >
            {playing ? '🎵' : '🔇'}
          </span>
        </button>
      </div>
    </>
  )
}
