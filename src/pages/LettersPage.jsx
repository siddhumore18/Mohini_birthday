import { useState } from 'react'
import { WaxSealArt } from '../components/BookArtwork'
import SmartImage from '../components/SmartImage'

const GROUP_MESSAGES = [
  {
    id: 1,
    sender: 'IRF Gang · Origin Story',
    photo: '/photos/photo_group.jpg',
    photoCaption: 'Internship Day 1 to Lifelong Family',
    initial: 'IRF',
    funnyLine: 'Internship mein mile the, aur socha tha sab professional rahenge... par tumhare topper gusse aur hamare non-stop mazaak ne humein family bana diya!',
    wish: 'Happy Birthday Mohini! Thank you for being the sweetest, most reliable person in our IRF journey. Tumhare bina group ka mazaa aadha ho jaata!',
    note: '🎙️ "From all of us at IRF with 100% love & respect"',
  },
  {
    id: 2,
    sender: 'Canteen & Roadtrip Crew',
    photo: '/photos/photo_canteen.jpg',
    photoCaption: '5-Minute Chai Breaks & Unfiltered Laughs',
    initial: 'KIT',
    funnyLine: '5-minute chai breaks jo 2 ghante chalte hain, exam se pehle tumhara "maine kuch nahi padha" bolna, aur phir 98% topper aana — ye record sirf tumhara hai!',
    wish: 'May your upcoming year be full of thrilling new roadtrips, peaceful thoughts, zero stress, and endless happy moments!',
    note: '🎙️ "Chai treat and birthday party pending from topper!"',
  },
  {
    id: 3,
    sender: 'The Lifelong Bond',
    photo: '/photos/photo_timeline.jpg',
    photoCaption: 'College Ends, IRF Friendship Stays Forever',
    initial: 'M',
    funnyLine: 'Disclaimer: Group ke saare jokes 100% genuine dosti aur pyaar se kiye jaate hain. Aaj birthday hai toh thoda kam tease karenge, kal se wapas normal!',
    wish: 'College khatam ho sakta hai par hamari dosti hamesha aise hi rahegi. Aise hi khush reh, explore karti reh, and never stop being our favourite person! Happy Birthday Mohini! ❤️',
    note: '🎙️ "Lifelong borrower of friendship — due date: never!"',
  },
]

export default function LettersPage({ onNext, onPrev }) {
  const [openLetter, setOpenLetter] = useState(null)

  return (
    <div className="paper-page letters-page">
      {/* Header */}
      <header className="letters-header animate-fade-in-up">
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
            Page Six · Messages From the Group
          </span>
        </div>
        <hr className="rule-thin" />
        <h2 className="headline-lg mt-2">
          Letters From
          <br />
          the IRF Group
        </h2>
        <p className="body-text mt-1" style={{ fontStyle: 'italic', color: 'var(--ink-medium)' }}>
          3 special envelopes from the whole gang with our favourite group memories. Tap to open.
        </p>
      </header>

      <hr className="rule-thin mt-2 mb-3" />

      {/* Pencil note */}
      <div className="animate-fade-in delay-1 mb-2 text-center">
        <span className="pencil-note">
          sabne milkar dil se likha hai ✉️ tap any envelope
        </span>
      </div>

      {/* 3 Envelopes Grid */}
      <div className="envelope-grid" style={{ maxWidth: 750, margin: '0 auto', gap: 28, justifyContent: 'center' }}>
        {GROUP_MESSAGES.map((msg, i) => (
          <div
            key={msg.id}
            className={`envelope animate-fade-in-up delay-${i + 1}`}
            onClick={() => setOpenLetter(msg)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setOpenLetter(msg) }}
            aria-label={`Open message from ${msg.sender}`}
            style={{ width: 210, height: 145, cursor: 'pointer' }}
          >
            {/* Wax seal */}
            <div
              style={{
                position: 'absolute',
                bottom: 38,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2,
              }}
            >
              <WaxSealArt size={42} text={msg.initial} />
            </div>
            <span className="envelope-name" style={{ fontWeight: 700, fontSize: '0.92rem', bottom: 10 }}>
              {msg.sender}
            </span>
          </div>
        ))}
      </div>

      {/* Handwritten note */}
      <div className="animate-fade-in-up delay-4 mt-4 text-center">
        <p className="handwritten-note" style={{ fontSize: '1.25rem' }}>
          "Har envelope mein group ki yaadein, thoda mazaak aur dher saara pyaar."
        </p>
      </div>

      {/* Letter Modal */}
      {openLetter && (
        <div className="letter-modal" onClick={() => setOpenLetter(null)}>
          <div
            className="letter-paper folded-corner"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 500, padding: '24px 28px' }}
          >
            <button
              className="letter-close"
              onClick={() => setOpenLetter(null)}
              aria-label="Close letter"
            >
              ×
            </button>

            {/* Tape decoration */}
            <div className="tape tape-center" style={{ top: -12 }} />

            <div className="letter-from" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid var(--ink-faded)' }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-light)', display: 'block' }}>
                  From the IRF Gang
                </span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--burgundy)', fontFamily: 'var(--font-headline)' }}>
                  {openLetter.sender}
                </span>
              </div>
              <WaxSealArt size={42} text={openLetter.initial} />
            </div>

            {/* Group Photo in Letter */}
            {openLetter.photo && (
              <div style={{ margin: '12px 0 10px' }}>
                <div style={{ height: 195, width: '100%', borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(138,110,80,0.3)', boxShadow: '0 4px 14px rgba(0,0,0,0.18)', backgroundColor: '#f0e6d8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SmartImage
                    src={openLetter.photo}
                    alt={openLetter.sender}
                    imgStyle={{ objectFit: 'contain', width: '100%', height: '100%' }}
                  />
                </div>
                <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-body)', color: 'var(--ink-medium)', fontStyle: 'italic', textAlign: 'center', marginTop: 4 }}>
                  📸 {openLetter.photoCaption}
                </div>
              </div>
            )}

            <div className="letter-body" style={{ marginTop: 10 }}>
              <div className="letter-funny" style={{ background: 'rgba(255,255,255,0.6)', padding: '8px 12px', borderRadius: 4, marginBottom: 10 }}>
                <p style={{ margin: '0 0 4px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--burgundy)', fontWeight: 700, fontFamily: 'var(--font-headline)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    The Friendly Tease:
                  </span>
                </p>
                <p style={{ fontStyle: 'italic', color: 'var(--ink-dark)', margin: 0, fontSize: '1.05rem', lineHeight: 1.45 }}>
                  "{openLetter.funnyLine}"
                </p>
              </div>

              <div className="letter-wish" style={{ background: 'rgba(107, 45, 62, 0.05)', borderLeft: '3px solid var(--burgundy)', padding: '8px 12px', borderRadius: '0 4px 4px 0' }}>
                <p style={{ margin: '0 0 4px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--burgundy)', fontWeight: 700, fontFamily: 'var(--font-headline)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    What We Actually Mean:
                  </span>
                </p>
                <p style={{ color: 'var(--ink-black)', margin: 0, fontSize: '1.05rem', lineHeight: 1.45, fontWeight: 500 }}>
                  "{openLetter.wish}"
                </p>
              </div>
            </div>

            <div style={{ marginTop: 14, textAlign: 'center' }}>
              <span className="pencil-note" style={{ fontSize: '0.86rem' }}>
                {openLetter.note}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="page-nav mt-3">
        <button className="page-nav-btn" onClick={onPrev}>
          ← Birthday Game
        </button>
        <button className="page-nav-btn" onClick={onNext}>
          Final Page →
        </button>
      </div>
    </div>
  )
}
