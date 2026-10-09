import { useState, useEffect } from 'react'
import PhotoFrame from '../components/PhotoFrame'
import SmartImage from '../components/SmartImage'
import Confetti from '../components/Confetti'
import { GroupMemoryArt } from '../components/BookArtwork'

export default function FinalPage({ onReplay, onPrev, onOpenBooklet }) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [lightbox, setLightbox] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="paper-page final-page">
      <Confetti active={showConfetti} />

      {/* Header */}
      <header style={{ width: '100%', textAlign: 'center' }} className="animate-fade-in-up">
        <hr className="rule-thick" />
        <div style={{ padding: '12px 0' }}>
          <span
            className="small-caps"
            style={{
              fontFamily: 'var(--font-headline)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              color: 'var(--ink-light)',
            }}
          >
            Page Seven · The Part We Actually Mean
          </span>
        </div>
        <hr className="rule-thin" />
        <h2 className="headline-lg mt-2">
          The Part We
          <br />
          Actually Mean
        </h2>
      </header>

      <hr className="rule-thin mt-2 mb-3" />

      {/* Single Full Group Photo - Centered, Wide & 100% Uncropped Contain */}
      <div className="animate-fade-in-up delay-1 text-center" style={{ width: '100%', maxWidth: 540, margin: '0 auto' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <div className="tape tape-center" style={{ top: -8, zIndex: 3 }} />
          <PhotoFrame
            src="/photos/photo_group.jpg"
            label="The Entire IRF Gang"
            alt="The Entire IRF Gang"
            fallback={<GroupMemoryArt />}
            style={{
              width: '100%',
              height: 'clamp(210px, 32vh, 320px)',
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
            <p className="handwritten-note" style={{ fontSize: '1.05rem', color: 'var(--burgundy)', margin: 0 }}>
              "Internship mein mile the. Ab zindagi bhar ka parivaar ban gaye." ❤️
            </p>
            <span className="pencil-note" style={{ fontSize: '0.75rem', cursor: 'pointer' }} onClick={() => setLightbox(true)}>
              🔍 tap to zoom
            </span>
          </div>
        </div>
      </div>

      {/* The Message */}
      <div className="final-message animate-fade-in-up delay-3">
        <p>
          Mazaak apni jagah, par tere bina group ka mazaa aadha ho jaata hai.
        </p>
        <p className="mt-2">
          IRF mein mile the, aur tu hamari life ka ek bahut pyaara hissa ban gayi.
        </p>
        <p className="mt-3" style={{ fontWeight: 600, fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)' }}>
          Happy Birthday, Mohini. ✨
        </p>
        <p className="mt-2">
          Aise hi khush reh, naye experiences explore kar,
          <br />
          aur kabhi-kabhi hamare jokes bhi tolerate kar liya kar.
        </p>
      </div>

      {/* Sign-off */}
      <div className="animate-fade-in-up delay-5 text-center">
        <hr className="rule-thin" style={{ maxWidth: 200, margin: '0 auto' }} />
        <p className="final-signoff mt-2">
          With love, your IRF people.
        </p>
      </div>

      {/* Decorative stamps */}
      <div className="animate-fade-in delay-6 mt-3 text-center">
        <div style={{ display: 'inline-flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span className="ink-stamp" style={{ transform: 'rotate(-3deg)' }}>
            Happy Birthday
          </span>
          <span
            className="ink-stamp"
            style={{
              transform: 'rotate(5deg)',
              borderColor: 'var(--lavender)',
              color: 'var(--lavender)',
            }}
          >
            With Love
          </span>
        </div>
      </div>

      {/* Pencil note */}
      <div className="animate-fade-in delay-7 mt-3 text-center">
        <span className="pencil-note" style={{ fontSize: '0.95rem' }}>
          ye wala page bilkul seriously padhna tha ↑
        </span>
      </div>

      {/* Replay & 3D Booklet Actions */}
      <div className="replay-section text-center animate-fade-in-up delay-8" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="paper-button paper-button-burgundy" onClick={onOpenBooklet}>
          📖 Open 3D Desk Booklet →
        </button>
        <button className="paper-button" onClick={onReplay}>
          ↩ Read it all again
        </button>
      </div>

      {/* Lightbox Modal */}
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
                src="/photos/photo_group.jpg"
                alt="The Entire IRF Gang"
                fallback={<GroupMemoryArt />}
                style={{ width: '100%', height: '100%' }}
                imgStyle={{ maxHeight: '72vh', objectFit: 'contain' }}
              />
            </div>
            <p style={{ fontFamily: 'var(--font-handwritten)', fontSize: '1.25rem', textAlign: 'center', marginTop: 10, color: 'var(--burgundy)', margin: '10px 0 0' }}>
              The Entire IRF Gang ❤️ · Internship se Lifelong Bond
            </p>
          </div>
        </div>
      )}

      {/* Bottom */}
      <hr className="rule-thick mt-3" />
      <div className="text-center mt-1 mb-2">
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--ink-faded)' }}>
          The Mohini Gazette · Birthday Edition · Printed with love at KIT's IRF
        </span>
      </div>

      {/* Navigation */}
      <div className="page-nav">
        <button className="page-nav-btn" onClick={onPrev}>
          ← Letters
        </button>
        <span />
      </div>
    </div>
  )
}
