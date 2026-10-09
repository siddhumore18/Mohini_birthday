import { useRef, useState, useEffect, useCallback } from 'react'
import { ambientSynth } from '../utils/audio'

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const userManuallyMutedRef = useRef(false)
  
  // Resolve correct path in local dev, Vercel, Netlify, and subpath deployments (GitHub Pages)
  const baseUrl = import.meta.env.BASE_URL || '/'
  const musicSrc = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}music/birthday-bg.mp3`

  // Direct start method
  const startAudioPlayback = useCallback(() => {
    if (userManuallyMutedRef.current) return

    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.55
      audio.loop = true
      audio
        .play()
        .then(() => {
          setPlaying(true)
          ambientSynth.stop()
        })
        .catch(() => {
          // If HTML5 audio is blocked or fails, fallback to ambient web audio synth
          try {
            ambientSynth.start()
            setPlaying(true)
          } catch {}
        })
    }
  }, [])

  // Expose global starter so any user interaction across the site unlocks sound
  useEffect(() => {
    window.__startMohiniMusic = startAudioPlayback
    return () => {
      delete window.__startMohiniMusic
    }
  }, [startAudioPlayback])

  // Toggle Play / Pause button
  const toggle = useCallback((e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    const audio = audioRef.current
    if (!audio) return

    if (!audio.paused || ambientSynth.isPlaying) {
      // User explicitly muted
      userManuallyMutedRef.current = true
      audio.pause()
      ambientSynth.stop()
      setPlaying(false)
    } else {
      // User explicitly unmuted
      userManuallyMutedRef.current = false
      startAudioPlayback()
    }
  }, [startAudioPlayback])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.55
    audio.loop = true

    // 1. Attempt immediate autoplay when page loads
    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlaying(true)
        })
        .catch(() => {
          // Autoplay policy prevented immediate unmuted sound before first touch
          setPlaying(false)
        })
    }

    // 2. Unlock & play immediately on the VERY FIRST touch / click / scroll anywhere on screen
    const handleFirstGesture = (e) => {
      // If user specifically clicked the mute toggle button, don't interfere
      if (e.target && e.target.closest && e.target.closest('.music-toggle')) {
        return
      }

      if (!userManuallyMutedRef.current) {
        startAudioPlayback()
      }

      // Cleanup listeners once unlocked
      cleanupListeners()
    }

    const eventOptions = { capture: true, passive: true }
    const events = ['touchstart', 'touchend', 'pointerdown', 'mousedown', 'click', 'scroll', 'keydown']

    const cleanupListeners = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleFirstGesture, eventOptions)
        document.removeEventListener(evt, handleFirstGesture, eventOptions)
      })
    }

    events.forEach((evt) => {
      window.addEventListener(evt, handleFirstGesture, eventOptions)
      document.addEventListener(evt, handleFirstGesture, eventOptions)
    })

    return () => {
      cleanupListeners()
    }
  }, [startAudioPlayback])

  return (
    <>
      {/* Native HTML5 Audio element */}
      <audio
        ref={audioRef}
        src={musicSrc}
        preload="auto"
        loop
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => {
          if (!ambientSynth.isPlaying) setPlaying(false)
        }}
        onError={() => {
          // Fallback to ambient soothing music if MP3 file fails to load
          if (!userManuallyMutedRef.current) {
            try {
              ambientSynth.start()
              setPlaying(true)
            } catch {}
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
