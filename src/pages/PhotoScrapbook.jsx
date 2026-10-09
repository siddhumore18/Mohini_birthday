import { useState } from 'react'
import SmartImage from '../components/SmartImage'
import {
  TopperStudyArt,
  GroupMemoryArt,
  CandidLaughArt,
  FilmRollStripArt,
  MohiniPortraitArt,
  CanteenDebateArt,
  TimelineJourneyArt
} from '../components/BookArtwork'

const SCRAPBOOK_ITEMS = [
  {
    id: 1,
    src: '/photos/photo_study.jpg',
    label: "Mohini's Study Face",
    caption: 'The one and only birthday topper ✨',
    tilt: 'tilted-left',
    fallback: <TopperStudyArt />,
  },
  {
    id: 2,
    src: '/photos/photo_group.jpg',
    label: 'IRF Group Photo',
    caption: 'Internship mein mile. Apna group ban gaya.',
    tilt: 'tilted-right',
    fallback: <GroupMemoryArt />,
  },
  {
    id: 3,
    src: '/photos/photo_candid.jpg',
    label: 'Candid Laugh',
    caption: 'Ek photo normal. Baaki sab evidence.',
    tilt: '',
    fallback: <CandidLaughArt />,
  },
  {
    id: 4,
    src: '/photos/photo_memory.jpg',
    label: 'Personal Memory',
    caption: 'Is photo ke baad kya hua, woh confidential hai.',
    tilt: 'tilted-left',
    fallback: <FilmRollStripArt />,
  },
]

const CONTACT_STRIP_ITEMS = [
  { id: 'c1', src: '/photos/photo_portrait.jpg', label: 'Birthday Portrait' },
  { id: 'c2', src: '/photos/photo_canteen.jpg', label: 'Canteen Gang' },
  { id: 'c3', src: '/photos/photo_lab.jpg', label: 'IRF Lab Days' },
  { id: 'c4', src: '/photos/photo_excuses.jpg', label: 'Funny Excuses' },
  { id: 'c5', src: '/photos/photo_timeline.jpg', label: 'Timeline Selfie' },
  { id: 'c6', src: '/photos/photo_adventure.jpg', label: 'Group Trip' },
  { id: 'c7', src: '/photos/photo_group.jpg', label: 'Kurta Group' },
  { id: 'c8', src: '/photos/photo_study.jpg', label: 'Topper Mode' },
  { id: 'c9', src: '/photos/photo_candid.jpg', label: 'Candid Laugh' },
  { id: 'c10', src: '/photos/photo_together.jpg', label: 'Together' },
  { id: 'c11', src: '/photos/photo_cake.jpg', label: 'Cake Time' },
  { id: 'c12', src: '/photos/photo_roast.jpg', label: 'Movie Poster' },
]

export default function PhotoScrapbook({ onNext, onPrev }) {
  const [lightbox, setLightbox] = useState(null)

  // Duplicate items for continuous infinite seamless scroll loop
  const marqueeItems = [...CONTACT_STRIP_ITEMS, ...CONTACT_STRIP_ITEMS]

  return (
    <div className="paper-page scrapbook-page">
      {/* Header */}
      <header className="scrapbook-header animate-fade-in-up">
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
            Page Three · Our Photo Scrapbook
          </span>
        </div>
        <hr className="rule-thin" />
        <h2 className="headline-lg mt-2">
          The Photo
          <br />
          Scrapbook
        </h2>
        <p className="body-text mt-1" style={{ fontStyle: 'italic', color: 'var(--ink-medium)' }}>
          Collected evidence from the IRF archives · Tap any photo for full view
        </p>
      </header>

      <hr className="rule-thin mt-2 mb-2" />

      {/* Pencil annotation */}
      <div className="animate-fade-in delay-2" style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="pencil-note">
          tap any photo to zoom in 🔍
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--ink-light)', fontStyle: 'italic' }}>
          100% Uncropped Memories
        </span>
      </div>

      {/* Polaroid Grid - Full uncropped photo display */}
      <div className="scrapbook-grid">
        {SCRAPBOOK_ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`scrapbook-item ${item.tilt} animate-fade-in-up delay-${i + 1}`}
          >
            <div className="polaroid" onClick={() => setLightbox(item)} style={{ cursor: 'pointer' }}>
              {/* Tape decoration on some */}
              {i === 0 && <div className="tape tape-left" style={{ top: -6 }} />}
              {i === 1 && <div className="tape tape-right" style={{ top: -6 }} />}
              {i === 3 && <div className="tape tape-center" style={{ top: -6 }} />}

              <div className="photo-area" style={{ height: 'clamp(180px, 26vh, 230px)', backgroundColor: '#f0e6d8', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SmartImage
                  src={item.src}
                  alt={item.label}
                  fallback={item.fallback}
                  imgStyle={{ objectFit: 'contain', width: '100%', height: '100%' }}
                />
              </div>
              <p className="polaroid-caption" style={{ marginTop: 8 }}>{item.caption}</p>
            </div>

            {/* Staple on alternating items */}
            {i % 2 === 0 && (
              <div className="staple" style={{ top: 4, right: 16, transform: 'rotate(45deg)' }} />
            )}
          </div>
        ))}
      </div>

      {/* Continuous Animated Film Roll Strip */}
      <div className="animate-fade-in-up delay-5 mt-3">
        <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="pencil-note">🎞️ 35mm film roll — rolling (tap any frame to view)</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--ink-faded)', fontFamily: 'var(--font-body)' }}>
            KIT's IRF Archive
          </span>
        </div>

        <div className="film-roll-marquee-wrap">
          {/* Film perforations top */}
          <div className="film-sprockets-row" />

          {/* Scrolling track */}
          <div className="film-roll-track">
            {marqueeItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="mini-photo film-frame"
                onClick={() => setLightbox(item)}
                title={`Click to view: ${item.label}`}
                style={{ backgroundColor: '#f0e6d8' }}
              >
                <SmartImage
                  src={item.src}
                  alt={item.label}
                  imgStyle={{ objectFit: 'contain', width: '100%', height: '100%' }}
                />
                <span className="film-frame-number">#{String((idx % CONTACT_STRIP_ITEMS.length) + 1).padStart(2, '0')}</span>
              </div>
            ))}
          </div>

          {/* Film perforations bottom */}
          <div className="film-sprockets-row" />
        </div>
      </div>

      {/* Handwritten note */}
      <div className="animate-fade-in-up delay-6 mt-3 text-center">
        <p className="handwritten-note" style={{ fontSize: '1.2rem' }}>
          "Har photo mein ek kahaani hai...
          <br />
          aur har kahaani mein Mohini hai."
        </p>
      </div>

      {/* Lightbox */}
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
                alt={lightbox.label}
                fallback={lightbox.fallback}
                style={{ width: '100%', height: '100%' }}
                imgStyle={{ maxHeight: '72vh', objectFit: 'contain' }}
              />
            </div>
            <p style={{ fontFamily: 'var(--font-handwritten)', fontSize: '1.25rem', textAlign: 'center', marginTop: 10, color: 'var(--burgundy)', margin: '10px 0 0' }}>
              {lightbox.caption || lightbox.label}
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="page-nav mt-3">
        <button className="page-nav-btn" onClick={onPrev}>
          ← Character Report
        </button>
        <button className="page-nav-btn" onClick={onNext}>
          Roast Column →
        </button>
      </div>
    </div>
  )
}
