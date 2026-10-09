import { useState } from 'react'
import SmartImage from '../components/SmartImage'
import {
  RoastPosterArt,
  TopperStudyArt,
  CandidLaughArt,
  CanteenDebateArt
} from '../components/BookArtwork'

const ROAST_CARDS = [
  {
    id: 1,
    type: 'Movie Poster · Cinema Release',
    title: 'Chhoti Baat, Bada Gussa',
    subtitle: 'Ek mazaak. Teen explanations.',
    src: '/photos/photo_roast.jpg',
    photoLabel: 'Chhoti Baat Bada Gussa Poster',
    fallback: <RoastPosterArt />,
    body: 'Coming to theatres near you. Rated PG — Pretty Gussa. A tale of one innocent joke and the 45-minute lecture that followed.',
  },
  {
    id: 2,
    type: 'Magazine Cover · Special Feature',
    title: 'TOPPER TIMES',
    subtitle: 'Marks full. Mazaak ki permission pending.',
    src: '/photos/photo_study.jpg',
    photoLabel: 'Mohini Topper Face',
    fallback: <TopperStudyArt />,
    body: 'This month\'s cover star: the one who topped every exam but still can\'t figure out when we\'re joking.',
  },
  {
    id: 3,
    type: 'Breaking News · IRF Live',
    title: 'Friend Says "Just Kidding"',
    subtitle: 'Investigation continues.',
    src: '/photos/photo_candid.jpg',
    photoLabel: 'Mohini Candid Reaction',
    fallback: <CandidLaughArt />,
    body: 'Sources confirm the suspect said "just kidding" approximately 3.7 seconds after the joke. The investigation into whether it was indeed "just kidding" is still underway.',
  },
  {
    id: 4,
    type: 'Award Certificate · Annual Honor',
    title: 'Lifetime Achievement in Overthinking',
    subtitle: 'Presented to Mohini, for services above and beyond the call of necessary thought.',
    src: '/photos/photo_canteen.jpg',
    photoLabel: 'Canteen Strategy Meeting',
    fallback: <CanteenDebateArt />,
    body: 'For consistently thinking about things that haven\'t happened yet, may never happen, and probably won\'t matter — but thinking about them anyway, just to be sure.',
  },
]

export default function RoastColumn({ onNext, onPrev }) {
  const [lightbox, setLightbox] = useState(null)

  return (
    <div className="paper-page roast-page">
      {/* Header */}
      <header className="roast-header animate-fade-in-up">
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
            Page Four · The Friendly Roast Column
          </span>
        </div>
        <hr className="rule-thin" />
        <h2 className="headline-lg mt-2">
          The Friendly
          <br />
          Roast Column
        </h2>
        <p className="body-text mt-1" style={{ fontStyle: 'italic', color: 'var(--ink-medium)' }}>
          All in good humour. Legal disclaimers don't apply to birthdays · Tap photo to zoom
        </p>
      </header>

      <hr className="rule-thin mt-2 mb-2" />

      {/* Pencil note */}
      <div className="animate-fade-in delay-1 mb-2">
        <span className="pencil-note">
          ye sab pyaar se likha hai, gussa mat hona 🔍 tap any photo to view full poster
        </span>
      </div>

      {/* Roast Grid */}
      <div className="roast-grid">
        {ROAST_CARDS.map((card, i) => (
          <div key={card.id} className={`roast-card animate-fade-in-up delay-${i + 2}`} style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Header banner with card-type and title */}
            <div className="card-header" style={{ padding: '12px 14px 8px', borderBottom: '1px solid rgba(120, 100, 80, 0.15)', background: 'var(--paper-warm)' }}>
              <div className="card-type" style={{ color: 'var(--burgundy)', fontWeight: 700, letterSpacing: '0.08em', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                {card.type}
              </div>
              <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.18rem', margin: '4px 0 2px', color: 'var(--ink-black)', lineHeight: 1.2 }}>
                {card.title}
              </h3>
              <p style={{ fontStyle: 'italic', fontSize: '0.84rem', color: 'var(--ink-medium)', margin: '2px 0 0' }}>
                {card.subtitle}
              </p>
            </div>

            {/* Photo area - 100% uncropped contain with click to zoom */}
            <div
              className="card-photo"
              style={{
                height: 'clamp(200px, 28vh, 250px)',
                position: 'relative',
                overflow: 'hidden',
                background: '#f0e6d8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => setLightbox(card)}
              title="Click to view full photo"
            >
              <SmartImage
                src={card.src}
                alt={card.title}
                fallback={card.fallback}
                style={{ width: '100%', height: '100%' }}
                imgStyle={{ objectFit: 'contain', width: '100%', height: '100%' }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: 6,
                  right: 8,
                  background: 'rgba(0,0,0,0.55)',
                  color: '#fff',
                  fontSize: '0.7rem',
                  padding: '2px 6px',
                  borderRadius: 3,
                  fontFamily: 'var(--font-body)',
                }}
              >
                🔍 Tap to zoom
              </span>
            </div>

            {/* Card body */}
            <div className="card-body" style={{ padding: '14px', flex: 1, display: 'flex', alignItems: 'center' }}>
              <p className="body-text" style={{ fontSize: '0.92rem', lineHeight: 1.5, margin: 0 }}>
                {card.body}
              </p>
            </div>

            {/* Tape on first card */}
            {i === 0 && <div className="tape tape-right" style={{ top: 8, zIndex: 5 }} />}
            {i === 3 && (
              <div className="staple" style={{ top: 8, left: 12, zIndex: 5 }} />
            )}
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="animate-fade-in-up delay-6 mt-3 text-center">
        <div
          className="ink-stamp"
          style={{
            display: 'inline-block',
            transform: 'rotate(-2deg)',
            borderColor: 'var(--ink-faded)',
            color: 'var(--ink-faded)',
            fontSize: '0.7rem',
          }}
        >
          Approved for Birthday Use Only
        </div>
      </div>

      <div className="animate-fade-in delay-7 mt-2 text-center">
        <p className="handwritten-note" style={{ fontSize: '1.05rem' }}>
          "Roast karte hain kyunki pyaar karte hain. Simple."
        </p>
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div className="photo-lightbox" onClick={() => setLightbox(null)}>
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
              onClick={() => setLightbox(null)}
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
                src={lightbox.src}
                alt={lightbox.title}
                fallback={lightbox.fallback}
                style={{ width: '100%', height: '100%' }}
                imgStyle={{ maxHeight: '72vh', objectFit: 'contain' }}
              />
            </div>
            <p style={{ fontFamily: 'var(--font-handwritten)', fontSize: '1.25rem', textAlign: 'center', marginTop: 10, color: 'var(--burgundy)', margin: '10px 0 0' }}>
              {lightbox.title} · {lightbox.subtitle}
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="page-nav mt-3">
        <button className="page-nav-btn" onClick={onPrev}>
          ← Photo Scrapbook
        </button>
        <button className="page-nav-btn" onClick={onNext}>
          Birthday Game →
        </button>
      </div>
    </div>
  )
}
