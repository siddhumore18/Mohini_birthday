import { useState } from 'react'
import PhotoFrame from '../components/PhotoFrame'
import SmartImage from '../components/SmartImage'
import { MohiniPortraitArt } from '../components/BookArtwork'

export default function FrontPage({ onStart, onOpenBooklet }) {
  const [lightbox, setLightbox] = useState(false)

  return (
    <div className="paper-page front-page">
      {/* Folded corner decoration */}
      <div className="folded-corner" style={{ position: 'absolute', top: 0, right: 0, width: 40, height: 40 }} />

      {/* Masthead */}
      <header className="masthead animate-fade-in-up">
        <h1 className="masthead-title">The Mohini Gazette</h1>
        <p className="masthead-subtitle">IRF Special Birthday Edition</p>
        <hr className="rule-double mt-2 mb-1" />
        <div className="masthead-meta">
          <span className="small-caps">Est. KIT's IRF</span>
          <span style={{ fontWeight: 600 }}>Special Birthday Edition</span>
          <span className="small-caps">Vol. 1 · No. 1</span>
        </div>
        <hr className="rule-thick" />
      </header>

      {/* Issue Label */}
      <div className="text-center mt-2 animate-fade-in-up delay-1">
        <span
          className="small-caps"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            color: 'var(--ink-light)',
            letterSpacing: '0.12em',
          }}
        >
          One birthday. Several complaints.
        </span>
      </div>

      {/* Main Headline */}
      <div className="front-headline mt-3 animate-fade-in-up delay-2">
        <h2 className="headline-xl">
          Mohini Turns a Year Older.
          <br />
          <span style={{ fontSize: '0.85em', color: 'var(--burgundy)' }}>IRF Still Afraid to Make a Joke.</span>
        </h2>
      </div>

      <hr className="rule-thin mt-2 mb-3" />

      {/* Portrait with Uncropped Contain and Tap-to-Zoom */}
      <div className="front-portrait animate-fade-in-up delay-3" style={{ width: '100%', maxWidth: 320, margin: '0 auto' }}>
        <div className="tape tape-center" style={{ top: -10, zIndex: 4 }} />
        <PhotoFrame
          src="/photos/photo_portrait.jpg"
          label="Mohini's Birthday Photo"
          alt="Mohini - Birthday Girl"
          fallback={<MohiniPortraitArt />}
          style={{
            width: '100%',
            height: 'clamp(240px, 38vh, 340px)',
            borderRadius: '6px',
            boxShadow: 'var(--paper-shadow-lifted)',
            backgroundColor: '#f0e6d8',
            cursor: 'pointer',
          }}
          imgStyle={{
            objectFit: 'contain',
            width: '100%',
            height: '100%',
          }}
          onClick={() => setLightbox(true)}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <span className="handwritten-note" style={{ fontSize: '1.05rem', color: 'var(--burgundy)' }}>
            Birthday girl. Handle with cake. 🎂
          </span>
          <span className="pencil-note" style={{ fontSize: '0.75rem', cursor: 'pointer' }} onClick={() => setLightbox(true)}>
            🔍 tap to zoom
          </span>
        </div>
      </div>

      {/* Intro */}
      <div className="front-intro mt-3 mx-auto animate-fade-in-up delay-4">
        <p>
          Topper by profession, overthinker by habit, and our favourite person to annoy.
        </p>
      </div>

      {/* Pencil annotation */}
      <div className="text-center mt-2 animate-fade-in delay-5">
        <span className="pencil-note" style={{ fontSize: '0.9rem' }}>
          ↑ ye wahi hai jinke notes sabko chahiye ↑
        </span>
      </div>

      {/* CTA */}
      <div className="start-button-wrap text-center animate-fade-in-up delay-6">
        <button className="paper-button paper-button-burgundy" onClick={onStart}>
          Open the birthday edition →
        </button>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="photo-lightbox" onClick={() => setLightbox(false)}>
          <div
            style={{
              position: 'relative',
              maxWidth: '92vw',
              maxHeight: '88vh',
              background: 'var(--paper-cream)',
              padding: 14,
              borderRadius: 6,
              boxShadow: '0 12px 48px rgba(0,0,0,0.6)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(false)}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: 'rgba(0,0,0,0.65)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: 32,
                height: 32,
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
              aria-label="Close photo"
            >
              ✕
            </button>
            <div style={{ maxWidth: '85vw', maxHeight: '72vh', overflow: 'hidden', borderRadius: 4 }}>
              <SmartImage
                src="/photos/photo_portrait.jpg"
                alt="Mohini Birthday Portrait"
                fallback={<MohiniPortraitArt />}
                style={{ width: '100%', height: '100%' }}
                imgStyle={{ maxHeight: '72vh', objectFit: 'contain' }}
              />
            </div>
            <p style={{ fontFamily: 'var(--font-handwritten)', fontSize: '1.25rem', marginTop: 10, color: 'var(--burgundy)', margin: '10px 0 0' }}>
              Mohini — Birthday Girl · Handle with cake 🎂
            </p>
          </div>
        </div>
      )}

      {/* Bottom rule */}
      <hr className="rule-thick mt-3" />
      <div className="text-center mt-1">
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--ink-faded)' }}>
          Printed with love · Not for resale · Birthday use only
        </span>
      </div>
    </div>
  )
}
