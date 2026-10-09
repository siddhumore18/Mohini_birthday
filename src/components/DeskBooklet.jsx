import { useState, useEffect, useCallback, useRef } from 'react'
import confetti from 'canvas-confetti'
import { playPaperTurnSound } from '../utils/audio'
import SmartImage from './SmartImage'
import {
  MohiniPortraitArt,
  GroupMemoryArt,
  TopperStudyArt,
  RoastPosterArt,
  BirthdayCakeArt,
  CandidLaughArt,
  FilmRollStripArt,
  CanteenDebateArt,
  TimelineJourneyArt,
  WaxSealArt
} from './BookArtwork'
import '../DeskBooklet.css'

const GROUP_MESSAGES = [
  {
    id: 1,
    name: 'IRF Gang · Origin Story',
    photo: '/photos/photo_group.jpg',
    photoCaption: 'Internship Day 1 to Lifelong Family',
    initial: 'IRF',
    funnyLine: 'Internship mein mile the, aur socha tha sab professional rahenge... par tumhare topper gusse aur hamare non-stop mazaak ne humein family bana diya!',
    wish: 'Happy Birthday Mohini! Thank you for being the sweetest, most reliable person in our IRF journey. Tumhare bina group ka mazaa aadha ho jaata!',
    voicePreview: '🎙️ "From all of us at IRF with 100% love & respect"',
  },
  {
    id: 2,
    name: 'Canteen & Roadtrip Crew',
    photo: '/photos/photo_canteen.jpg',
    photoCaption: '5-Minute Chai Breaks & Unfiltered Laughs',
    initial: 'KIT',
    funnyLine: '5-minute chai breaks jo 2 ghante chalte hain, exam se pehle tumhara "maine kuch nahi padha" bolna, aur phir 98% topper aana — ye record sirf tumhara hai!',
    wish: 'May your upcoming year be full of thrilling new roadtrips, peaceful thoughts, zero stress, and endless happy moments!',
    voicePreview: '🎙️ "Chai treat and birthday party pending from topper!"',
  },
  {
    id: 3,
    name: 'The Lifelong Bond',
    photo: '/photos/photo_timeline.jpg',
    photoCaption: 'College Ends, IRF Friendship Stays Forever',
    initial: 'M',
    funnyLine: 'Disclaimer: Group ke saare jokes 100% genuine dosti aur pyaar se kiye jaate hain. Aaj birthday hai toh thoda kam tease karenge, kal se wapas normal!',
    wish: 'College khatam ho sakta hai par hamari dosti hamesha aise hi rahegi. Aise hi khush reh, explore karti reh, and never stop being our favourite person! Happy Birthday Mohini! ❤️',
    voicePreview: '🎙️ "Lifelong borrower of friendship — due date: never!"',
  },
]


export default function DeskBooklet({ onSwitchToNewspaper }) {
  // Desktop spreads: 0 to 5 (Spreads 0..5 = Pages 0..9)
  const [spreadIndex, setSpreadIndex] = useState(0)
  const [flippingState, setFlippingState] = useState(null)
  
  // Mobile single-page tracking: 0 to 9
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false))
  const [mobilePage, setMobilePage] = useState(0)
  const [mobileFlipping, setMobileFlipping] = useState(null)

  const [viewAllPages, setViewAllPages] = useState(false)
  const [activeLetter, setActiveLetter] = useState(null)
  const [lightboxImg, setLightboxImg] = useState(null)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const touchStartXRef = useRef(null)
  const totalSpreads = 6 // 0 to 5
  const totalMobilePages = 10 // 0 to 9

  // Detect mobile screen on resize
  useEffect(() => {
    const handleResize = () => {
      const mob = window.innerWidth <= 768
      setIsMobile(mob)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Desktop 3D Page Turn (950ms)
  const executeFlip = useCallback((targetSpread, dir) => {
    if (flippingState || targetSpread === spreadIndex || targetSpread < 0 || targetSpread >= totalSpreads) return

    if (soundEnabled) {
      playPaperTurnSound()
    }

    setFlippingState({ dir, from: spreadIndex, to: targetSpread })

    setTimeout(() => {
      setSpreadIndex(targetSpread)
      // sync mobile page
      const mobP = targetSpread === 0 ? 0 : targetSpread === 5 ? 9 : (targetSpread * 2 - 1)
      setMobilePage(mobP)
      setFlippingState(null)
    }, 950)
  }, [flippingState, spreadIndex, totalSpreads, soundEnabled])

  const flipNext = useCallback(() => {
    if (spreadIndex < totalSpreads - 1) {
      executeFlip(spreadIndex + 1, 'next')
    }
  }, [spreadIndex, totalSpreads, executeFlip])

  const flipPrev = useCallback(() => {
    if (spreadIndex > 0) {
      executeFlip(spreadIndex - 1, 'prev')
    }
  }, [spreadIndex, executeFlip])

  // Mobile Single-Page Flip (420ms)
  const flipMobile = useCallback((targetPage, dir) => {
    if (mobileFlipping || targetPage === mobilePage || targetPage < 0 || targetPage >= totalMobilePages) return

    if (soundEnabled) {
      playPaperTurnSound()
    }

    setMobileFlipping({ dir, from: mobilePage, to: targetPage })

    setTimeout(() => {
      setMobilePage(targetPage)
      // sync desktop spread
      const sp = targetPage === 0 ? 0 : targetPage === 9 ? 5 : Math.ceil(targetPage / 2)
      setSpreadIndex(sp)
      setMobileFlipping(null)
    }, 420)
  }, [mobileFlipping, mobilePage, totalMobilePages, soundEnabled])

  const flipMobileNext = useCallback(() => {
    if (mobilePage < totalMobilePages - 1) {
      flipMobile(mobilePage + 1, 'next')
    }
  }, [mobilePage, totalMobilePages, flipMobile])

  const flipMobilePrev = useCallback(() => {
    if (mobilePage > 0) {
      flipMobile(mobilePage - 1, 'prev')
    }
  }, [mobilePage, flipMobile])

  const jumpToSpread = useCallback((target) => {
    if (isMobile) {
      const mobP = target === 0 ? 0 : target === 5 ? 9 : (target * 2 - 1)
      flipMobile(mobP, mobP > mobilePage ? 'next' : 'prev')
    } else {
      if (target === spreadIndex || flippingState) return
      const dir = target > spreadIndex ? 'next' : 'prev'
      executeFlip(target, dir)
    }
  }, [isMobile, mobilePage, spreadIndex, flippingState, executeFlip, flipMobile])

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartXRef.current - touchEndX
    if (Math.abs(diff) > 35) {
      if (isMobile) {
        if (diff > 0) flipMobileNext()
        else flipMobilePrev()
      } else {
        if (diff > 0) flipNext()
        else flipPrev()
      }
    }
    touchStartXRef.current = null
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (viewAllPages || flippingState || mobileFlipping) return
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        if (isMobile) flipMobileNext()
        else flipNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        if (isMobile) flipMobilePrev()
        else flipPrev()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [flipNext, flipPrev, flipMobileNext, flipMobilePrev, isMobile, viewAllPages, flippingState, mobileFlipping])

  const triggerConfetti = useCallback((e) => {
    if (e) e.stopPropagation()
    confetti({
      particleCount: 120,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#6b2d3e', '#9b8aa8', '#d8cdb8', '#a45a6a', '#b8a8c8', '#d4af37'],
    })
  }, [])

  // ─── 10 PAGES RENDERING ───

  // Page 0: Front Cover
  const renderCoverFront = () => (
    <div className="book-page cover-front" onClick={isMobile ? flipMobileNext : flipNext}>
      <div className="book-page-content cover-border-emboss">
        <div className="cover-emboss-corner cover-emboss-tl" />
        <div className="cover-emboss-corner cover-emboss-tr" />
        <div className="cover-emboss-corner cover-emboss-bl" />
        <div className="cover-emboss-corner cover-emboss-br" />

        <div style={{ marginTop: 6 }}>
          <span className="cover-badge">KIT's IRF Archives · Confidential Album</span>
        </div>

        {/* Cameo Portrait - Enlarged & Gold Filigree */}
        <div style={{ margin: 'auto 0', textAlign: 'center' }}>
          <div
            style={{
              width: 130,
              height: 155,
              margin: '0 auto 10px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #d4af37',
              boxShadow: '0 8px 24px rgba(0,0,0,0.55), inset 0 0 10px rgba(0,0,0,0.3)',
              background: '#f7f0e6',
              position: 'relative',
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.stopPropagation()
              setLightboxImg({ src: '/photos/photo_cover.jpg', label: "Mohini — Cover Portrait", fallback: <MohiniPortraitArt /> })
            }}
            title="Click to view full portrait"
          >
            <SmartImage
              src="/photos/photo_cover.jpg"
              alt="Mohini Cover Cameo"
              fallback={<MohiniPortraitArt style={{ width: '100%', height: '100%' }} />}
              imgStyle={{ objectPosition: 'center 20%', objectFit: 'cover' }}
            />
          </div>

          <h1 className="cover-title">
            Mohini
            <br />
            <span style={{ fontSize: '0.58em', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'none', color: '#ffdda6' }}>
              A Little Book of Memories
            </span>
          </h1>
          <p className="cover-sub" style={{ fontSize: '0.9rem', marginTop: 4 }}>
            IRF Special Birthday Edition · Vol. 1
          </p>

          <div style={{ margin: '8px 0 4px' }}>
            <WaxSealArt size={48} text="M" />
          </div>

          <p style={{ fontFamily: 'var(--font-handwritten)', color: '#ffdda6', fontSize: '1.15rem', margin: '2px 0 0' }}>
            "One birthday. Several complaints. Endless love."
          </p>
        </div>

        <div style={{ marginBottom: 8 }}>
          <div className="cover-open-prompt">
            <span>Click cover to open book ➔</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#c5b09d', marginTop: 2 }}>
            Handle with cake · Topper confirmed
          </div>
        </div>
      </div>
    </div>
  )

  // Page 1: Opening Note & Birthday Portrait
  const renderPage1 = () => (
    <div className="book-page page-left">
      <div className="book-page-content">
        <div className="text-center" style={{ borderBottom: '2px solid var(--ink-dark)', paddingBottom: 4 }}>
          <span className="small-caps" style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: 'var(--ink-light)' }}>
            The Mohini Gazette · Special Birthday Edition
          </span>
        </div>

        <div className="front-headline mt-1 mb-1">
          <h2 className="booklet-headline" style={{ fontSize: '1.15rem', margin: 0 }}>
            MOHINI TURNS A YEAR OLDER.
            <br />
            <span style={{ fontSize: '0.85em', fontWeight: 600, color: 'var(--burgundy)' }}>
              IRF Still Afraid to Make a Joke.
            </span>
          </h2>
        </div>

        {/* Portrait Photo - Prominent & Generously Sized */}
        <div style={{ width: '100%', maxWidth: '280px', margin: '4px auto 0', position: 'relative' }}>
          <div className="tape tape-center" style={{ top: -7, zIndex: 5 }} />
          <div
            className="booklet-polaroid"
            style={{ transform: 'rotate(-0.8deg)', cursor: 'pointer', padding: '7px 7px 12px' }}
            onClick={(e) => { e.stopPropagation(); setLightboxImg({ src: '/photos/photo_portrait.jpg', label: "Mohini's Birthday Portrait", fallback: <MohiniPortraitArt /> }) }}
          >
            <div className="img-area" style={{ height: 230, overflow: 'hidden', backgroundColor: '#f0e6d8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SmartImage
                src="/photos/photo_portrait.jpg"
                alt="Mohini Portrait"
                fallback={<MohiniPortraitArt />}
                imgStyle={{ objectFit: 'contain', width: '100%', height: '100%' }}
              />
            </div>
            <p className="booklet-polaroid-caption" style={{ fontSize: '0.92rem', marginTop: 4 }}>
              Birthday girl. Handle with cake 🎂
            </p>
          </div>
        </div>

        <div className="mt-2 text-center" style={{ padding: '0 8px' }}>
          <p className="body-text" style={{ fontStyle: 'italic', fontSize: '0.88rem', lineHeight: 1.4, margin: 0, color: 'var(--ink-medium)' }}>
            "Topper by profession, overthinker by habit, and our favourite person to annoy."
          </p>
        </div>

        <div className="mt-auto text-center">
          <span className="pencil-note" style={{ fontSize: '0.8rem' }}>
            ↑ Verified by KIT's IRF Investigation Bureau ↑
          </span>
        </div>

        <span className="page-num">Page 1</span>
        {isMobile && <span className="corner-turn-hint" onClick={flipMobileNext}>turn ➔</span>}
      </div>
    </div>
  )

  // Page 2: Photo Archive & Evidence
  const renderPage2 = () => (
    <div className="book-page page-right">
      <div className="book-page-content">
        <div className="text-center" style={{ borderBottom: '1px solid var(--ink-faded)', paddingBottom: 4 }}>
          <span className="small-caps" style={{ fontSize: '0.72rem', color: 'var(--ink-light)' }}>
            Scrapbook Evidence · Photo Archives
          </span>
        </div>

        <h3 className="booklet-headline mt-1" style={{ fontSize: '1.12rem', margin: '2px 0 2px' }}>
          The Photo Archive
        </h3>

        {/* Side by side Polaroids */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '4px 0' }}>
          {/* Photo 1: Study Face */}
          <div
            className="booklet-polaroid"
            style={{ transform: 'rotate(-1.5deg)', cursor: 'pointer', padding: '6px 6px 10px' }}
            onClick={(e) => { e.stopPropagation(); setLightboxImg({ src: '/photos/photo_study.jpg', label: 'The Serious Academic Face', fallback: <TopperStudyArt /> }) }}
          >
            <div className="tape tape-left" style={{ top: -6 }} />
            <div className="img-area" style={{ height: 140, overflow: 'hidden', backgroundColor: '#f0e6d8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SmartImage
                src="/photos/photo_study.jpg"
                alt="Mohini Study Face"
                fallback={<TopperStudyArt />}
                imgStyle={{ objectFit: 'contain', width: '100%', height: '100%' }}
              />
            </div>
            <p className="booklet-polaroid-caption" style={{ fontSize: '0.82rem', marginTop: 3 }}>
              "Ek photo normal."
            </p>
          </div>

          {/* Photo 2: Candid Laugh */}
          <div
            className="booklet-polaroid"
            style={{ transform: 'rotate(1.5deg)', cursor: 'pointer', padding: '6px 6px 10px' }}
            onClick={(e) => { e.stopPropagation(); setLightboxImg({ src: '/photos/photo_candid.jpg', label: 'The Candid Laugh', fallback: <CandidLaughArt /> }) }}
          >
            <div className="tape tape-right" style={{ top: -6 }} />
            <div className="img-area" style={{ height: 140, overflow: 'hidden', backgroundColor: '#f0e6d8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SmartImage
                src="/photos/photo_candid.jpg"
                alt="Mohini Candid"
                fallback={<CandidLaughArt />}
                imgStyle={{ objectFit: 'contain', width: '100%', height: '100%' }}
              />
            </div>
            <p className="booklet-polaroid-caption" style={{ fontSize: '0.82rem', marginTop: 3 }}>
              "Rare smile caught!"
            </p>
          </div>
        </div>

        {/* Film Strip - Full uncropped view */}
        <div
          style={{ height: 135, margin: '4px 0', cursor: 'pointer', borderRadius: 4, overflow: 'hidden', backgroundColor: '#f0e6d8', border: '1px solid rgba(120, 100, 80, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={(e) => { e.stopPropagation(); setLightboxImg({ src: '/photos/photo_lab.jpg', label: 'Film Roll Memories', fallback: <FilmRollStripArt /> }) }}
        >
          <SmartImage
            src="/photos/photo_lab.jpg"
            alt="IRF Film Roll"
            fallback={<FilmRollStripArt />}
            imgStyle={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        </div>

        <div className="pencil-note text-center mt-auto" style={{ fontSize: '0.82rem' }}>
          "Har photo mein ek kahaani hai... aur har kahaani mein Mohini!"
        </div>

        <span className="page-num">Page 2</span>
        <span className="corner-turn-hint" onClick={isMobile ? flipMobileNext : flipNext}>click to turn ➔</span>
      </div>
    </div>
  )

  // Page 3: IRF Group Memories & Official Report
  const renderPage3 = () => (
    <div className="book-page page-left">
      <div className="book-page-content">
        <div className="text-center" style={{ borderBottom: '1px solid var(--ink-faded)', paddingBottom: 4 }}>
          <span className="small-caps" style={{ fontSize: '0.72rem', color: 'var(--ink-light)' }}>
            Dossier · Character Report
          </span>
        </div>

        {/* Group Photo - Full Uncropped View */}
        <div
          className="booklet-polaroid mt-1 mb-1"
          style={{ transform: 'rotate(-0.6deg)', cursor: 'pointer', padding: '6px 6px 10px', width: '100%', boxSizing: 'border-box' }}
          onClick={(e) => { e.stopPropagation(); setLightboxImg({ src: '/photos/photo_group.jpg', label: 'IRF Group Memory', fallback: <GroupMemoryArt /> }) }}
        >
          <div className="staple" style={{ top: 4, left: 12 }} />
          <div className="img-area" style={{ height: 195, overflow: 'hidden', backgroundColor: '#f0e6d8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SmartImage
              src="/photos/photo_group.jpg"
              alt="IRF Group"
              fallback={<GroupMemoryArt />}
              imgStyle={{ objectFit: 'contain', width: '100%', height: '100%' }}
            />
          </div>
          <p className="booklet-polaroid-caption" style={{ color: 'var(--ink-dark)', fontSize: '0.86rem', marginTop: 3 }}>
            "Internship mein mile. Apna group ban gaya."
          </p>
        </div>

        {/* Official Report Card */}
        <div className="report-card" style={{ padding: '5px 8px', fontSize: '0.76rem', margin: '2px 0' }}>
          <div className="report-row" style={{ padding: '2px 0' }}>
            <span className="report-label">Academic performance</span>
            <span className="report-value outstanding">Outstanding ★ (Topper)</span>
          </div>
          <div className="report-row" style={{ padding: '2px 0' }}>
            <span className="report-label">Exploring new things</span>
            <span className="report-value">Always ready</span>
          </div>
          <div className="report-row" style={{ padding: '2px 0' }}>
            <span className="report-label">Overthinking department</span>
            <span className="report-value">Working overtime (24/7)</span>
          </div>
          <div className="report-row" style={{ padding: '2px 0' }}>
            <span className="report-label">Tolerance for our jokes</span>
            <span className="report-value">Under review (Alert)</span>
          </div>
        </div>

        <div className="margin-note mt-1" style={{ padding: '2px 8px' }}>
          <p className="handwritten-note" style={{ fontSize: '0.94rem', lineHeight: 1.25, margin: 0 }}>
            "Chhoti-chhoti baaton pe gussa,<br />phir bhi hum sabki favourite."
          </p>
        </div>

        <div className="text-center mt-auto">
          <span className="ink-stamp" style={{ fontSize: '0.66rem' }}>
            IRF VERIFIED ✓
          </span>
        </div>

        <span className="page-num">Page 3</span>
        {isMobile && <span className="corner-turn-hint" onClick={flipMobileNext}>turn ➔</span>}
      </div>
    </div>
  )

  // Page 4: Affectionate Roast Docket
  const renderPage4 = () => (
    <div className="book-page page-right">
      <div className="book-page-content">
        <div className="text-center" style={{ borderBottom: '1px solid var(--ink-faded)', paddingBottom: 4 }}>
          <span className="small-caps" style={{ fontSize: '0.72rem', color: 'var(--ink-light)' }}>
            Humour Column · Friendly Roast
          </span>
        </div>

        <h3 className="booklet-headline mt-1" style={{ fontSize: '1.12rem', margin: '2px 0 2px' }}>
          The Friendly Roast Docket
        </h3>

        {/* Movie Poster - Full Uncropped View */}
        <div
          style={{ height: 175, margin: '3px 0 5px', cursor: 'pointer', borderRadius: 4, overflow: 'hidden', backgroundColor: '#f0e6d8', border: '1px solid rgba(120, 100, 80, 0.25)', boxShadow: '0 3px 8px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={(e) => { e.stopPropagation(); setLightboxImg({ src: '/photos/photo_roast.jpg', label: 'Chhoti Baat Bada Gussa Poster', fallback: <RoastPosterArt /> }) }}
        >
          <SmartImage
            src="/photos/photo_roast.jpg"
            alt="Roast Poster"
            fallback={<RoastPosterArt />}
            imgStyle={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, margin: '2px 0' }}>
          <div className="roast-card" style={{ padding: '5px 6px', background: '#fff' }}>
            <span className="small-caps" style={{ fontSize: '0.62rem', color: 'var(--burgundy)' }}>
              📰 Magazine Cover
            </span>
            <p style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '0.76rem', margin: '2px 0' }}>
              TOPPER TIMES
            </p>
            <p className="pencil-note" style={{ fontSize: '0.7rem', margin: 0 }}>
              "Marks 100/100. Mazaak pending."
            </p>
          </div>

          <div className="roast-card" style={{ padding: '5px 6px', background: '#fff' }}>
            <span className="small-caps" style={{ fontSize: '0.62rem', color: 'var(--burgundy)' }}>
              📺 Breaking News
            </span>
            <p style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '0.76rem', margin: '2px 0' }}>
              "Just Kidding"
            </p>
            <p className="pencil-note" style={{ fontSize: '0.7rem', margin: 0 }}>
              Investigation continues.
            </p>
          </div>
        </div>

        <div className="roast-card mt-1" style={{ padding: '4px 8px', background: '#fff', textAlign: 'center' }}>
          <span className="small-caps" style={{ fontSize: '0.62rem', color: 'var(--burgundy)' }}>
            🏆 Lifetime Overthinker Award
          </span>
          <p className="pencil-note" style={{ fontSize: '0.72rem', margin: '2px 0' }}>
            Awarded for analyzing every parallel universe before choosing what to order!
          </p>
        </div>

        <div className="text-center mt-auto">
          <span className="ink-stamp" style={{ borderColor: 'var(--ink-light)', color: 'var(--ink-light)', fontSize: '0.64rem' }}>
            Approved for Birthday Use Only
          </span>
        </div>

        <span className="page-num">Page 4</span>
        <span className="corner-turn-hint" onClick={isMobile ? flipMobileNext : flipNext}>click to turn ➔</span>
      </div>
    </div>
  )

  // Page 5: Inside Jokes & Famous Excuses
  const renderPage5 = () => (
    <div className="book-page page-left">
      <div className="book-page-content">
        <div className="text-center" style={{ borderBottom: '1px solid var(--ink-faded)', paddingBottom: 4 }}>
          <span className="small-caps" style={{ fontSize: '0.72rem', color: 'var(--ink-light)' }}>
            Chapter 5 · Archives of Inside Jokes
          </span>
        </div>

        <h3 className="booklet-headline mt-1" style={{ fontSize: '1.12rem', margin: '2px 0 2px' }}>
          Famous IRF Incidents & Excuses
        </h3>

        {/* Canteen Photo - Full uncropped view */}
        <div
          className="booklet-polaroid mt-1 mb-1"
          style={{ transform: 'rotate(-0.5deg)', cursor: 'pointer', padding: '6px 6px 10px', width: '100%', boxSizing: 'border-box' }}
          onClick={(e) => { e.stopPropagation(); setLightboxImg({ src: '/photos/photo_canteen.jpg', label: 'Canteen 5-Min Chai Debate', fallback: <CanteenDebateArt /> }) }}
        >
          <div className="tape tape-right" style={{ top: -6 }} />
          <div className="img-area" style={{ height: 180, overflow: 'hidden', backgroundColor: '#f0e6d8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SmartImage
              src="/photos/photo_canteen.jpg"
              alt="Canteen Debate"
              fallback={<CanteenDebateArt />}
              imgStyle={{ objectFit: 'contain', width: '100%', height: '100%' }}
            />
          </div>
          <p className="booklet-polaroid-caption" style={{ color: 'var(--ink-dark)', fontSize: '0.84rem', marginTop: 3 }}>
            "Chai Break & Gossip Headquarters ☕"
          </p>
        </div>

        {/* Incident Dockets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, margin: '2px 0' }}>
          <div className="report-card" style={{ padding: '5px 8px', fontSize: '0.76rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--burgundy)', display: 'block' }}>
              📌 The "Maine Toh Kuch Nahi Padha" Incident:
            </span>
            <span style={{ fontStyle: 'italic', color: 'var(--ink-medium)' }}>
              Night before exam: 'Bas fail na ho jaun!' Next morning: 98% topper marks!
            </span>
          </div>

          <div className="report-card" style={{ padding: '5px 8px', fontSize: '0.76rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--burgundy)', display: 'block' }}>
              📌 The "5-Minute Chai Break" Mystery:
            </span>
            <span style={{ fontStyle: 'italic', color: 'var(--ink-medium)' }}>
              Said: 'Sirf 5 min mein lab wapas chalte hain.' Actual return: 2 hours later!
            </span>
          </div>
        </div>

        <div className="pencil-note text-center mt-auto" style={{ fontSize: '0.8rem' }}>
          ↑ Sab evidence record ho chuka hai, deny mat karna! ↑
        </div>

        <span className="page-num">Page 5</span>
        {isMobile && <span className="corner-turn-hint" onClick={flipMobileNext}>turn ➔</span>}
      </div>
    </div>
  )

  // Page 6: The Friendship Timeline & Bucket List
  const renderPage6 = () => (
    <div className="book-page page-right">
      <div className="book-page-content">
        <div className="text-center" style={{ borderBottom: '1px solid var(--ink-faded)', paddingBottom: 4 }}>
          <span className="small-caps" style={{ fontSize: '0.72rem', color: 'var(--ink-light)' }}>
            Chapter 6 · Journey & The Bucket List
          </span>
        </div>

        <h3 className="booklet-headline mt-1" style={{ fontSize: '1.12rem', margin: '2px 0 2px' }}>
          Friendship Timeline & Future Plans
        </h3>

        {/* Timeline Journey Photo - Full uncropped view */}
        <div
          className="booklet-polaroid mt-1 mb-1"
          style={{ transform: 'rotate(0.5deg)', cursor: 'pointer', padding: '6px 6px 10px', width: '100%', boxSizing: 'border-box' }}
          onClick={(e) => { e.stopPropagation(); setLightboxImg({ src: '/photos/photo_timeline.jpg', label: 'The IRF Friendship Journey', fallback: <TimelineJourneyArt /> }) }}
        >
          <div className="tape tape-left" style={{ top: -6 }} />
          <div className="img-area" style={{ height: 180, overflow: 'hidden', backgroundColor: '#f0e6d8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SmartImage
              src="/photos/photo_timeline.jpg"
              alt="Timeline Journey"
              fallback={<TimelineJourneyArt />}
              imgStyle={{ objectFit: 'contain', width: '100%', height: '100%' }}
            />
          </div>
          <p className="booklet-polaroid-caption" style={{ color: 'var(--ink-dark)', fontSize: '0.84rem', marginTop: 3 }}>
            "From College Days to Forever Bond ❤️"
          </p>
        </div>

        {/* Future Bucket List */}
        <div className="report-card" style={{ padding: '6px 8px', fontSize: '0.76rem', background: '#fff' }}>
          <span style={{ fontWeight: 700, color: 'var(--burgundy)', display: 'block', marginBottom: 3, fontSize: '0.8rem' }}>
            🎯 Group Bucket List for the Year:
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, fontStyle: 'italic', color: 'var(--ink-dark)' }}>
            <span>✅ Survive all exams with Mohini's notes</span>
            <span>⬜ Annual IRF roadtrip (Mohini plans the itinerary)</span>
            <span>⬜ 24 hours without overthinking anything!</span>
            <span>⬜ Grand birthday treat party from the topper!</span>
          </div>
        </div>

        <div className="pencil-note text-center mt-auto" style={{ fontSize: '0.82rem' }}>
          "Dosti shuru IRF mein hui thi, chalegi zindagi bhar!"
        </div>

        <span className="page-num">Page 6</span>
        <span className="corner-turn-hint" onClick={isMobile ? flipMobileNext : flipNext}>click to turn ➔</span>
      </div>
    </div>
  )

  // Page 7: Letters from the Group
  const renderPage7 = () => (
    <div className="book-page page-left">
      <div className="book-page-content">
        <div className="text-center" style={{ borderBottom: '1px solid var(--ink-faded)', paddingBottom: 4 }}>
          <span className="small-caps" style={{ fontSize: '0.72rem', color: 'var(--ink-light)' }}>
            Chapter 7 · Letters from the IRF Gang
          </span>
        </div>

        <h3 className="booklet-headline mt-1" style={{ fontSize: '1.12rem', margin: '2px 0 2px' }}>
          Envelopes for Mohini
        </h3>
        <p className="pencil-note text-center" style={{ fontSize: '0.76rem', margin: '0 0 6px' }}>
          tap any envelope to open handwritten note ✉️
        </p>

        {/* 3 Envelopes with real group photo postage stamp previews */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '4px 0' }}>
          {GROUP_MESSAGES.map((msg) => (
            <div
              key={msg.id}
              className="envelope"
              style={{
                width: '100%',
                height: 74,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 12px',
                background: '#fdfbf7',
                border: '1px solid rgba(130, 100, 70, 0.3)',
                boxShadow: '0 3px 8px rgba(0,0,0,0.08)',
                borderRadius: 4,
                position: 'relative',
              }}
              onClick={(e) => {
                e.stopPropagation()
                setActiveLetter(msg)
              }}
              role="button"
              tabIndex={0}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {/* Vintage Postage Stamp with Photo Preview */}
                <div
                  style={{
                    width: 44,
                    height: 52,
                    borderRadius: 2,
                    border: '1px dashed #a45a6a',
                    padding: 2,
                    background: '#fff',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                    flexShrink: 0,
                    overflow: 'hidden',
                  }}
                >
                  <SmartImage
                    src={msg.photo}
                    alt={msg.name}
                    imgStyle={{ objectFit: 'contain', width: '100%', height: '100%' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <WaxSealArt size={22} text={msg.initial} />
                    <span className="envelope-name" style={{ position: 'static', transform: 'none', fontSize: '0.84rem', fontWeight: 700, color: 'var(--ink-dark)' }}>
                      {msg.name}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--ink-light)', fontStyle: 'italic', marginTop: 2 }}>
                    {msg.photoCaption}
                  </span>
                </div>
              </div>

              <span style={{ fontSize: '0.72rem', color: 'var(--burgundy)', fontStyle: 'italic', fontWeight: 600, whiteSpace: 'nowrap' }}>
                Open Letter ➔
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto text-center">
          <p className="handwritten-note" style={{ fontSize: '0.98rem', color: 'var(--burgundy)', margin: 0 }}>
            "Har envelope mein thoda mazaak, thoda pyaar."
          </p>
          <span className="pencil-note" style={{ fontSize: '0.74rem' }}>
            (sabne dil se likha hai, padh zaroor lena!)
          </span>
        </div>

        <span className="page-num">Page 7</span>
        {isMobile && <span className="corner-turn-hint" onClick={flipMobileNext}>turn ➔</span>}
      </div>
    </div>
  )

  // Page 8: The Part We Actually Mean
  const renderPage8 = () => (
    <div className="book-page page-right">
      <div className="book-page-content">
        <div className="text-center" style={{ borderBottom: '1px solid var(--ink-faded)', paddingBottom: 4 }}>
          <span className="small-caps" style={{ fontSize: '0.72rem', color: 'var(--ink-light)' }}>
            Final Chapter · The Part We Actually Mean
          </span>
        </div>

        {/* Cake Photo - Full Uncropped View */}
        <div
          className="booklet-polaroid mt-1 mb-1"
          style={{ transform: 'rotate(-0.5deg)', cursor: 'pointer', padding: '6px 6px 10px', width: '100%', boxSizing: 'border-box' }}
          onClick={(e) => { e.stopPropagation(); setLightboxImg({ src: '/photos/photo_cake.jpg', label: 'Birthday Celebration Cake', fallback: <BirthdayCakeArt /> }) }}
        >
          <div className="tape tape-center" style={{ top: -6 }} />
          <div className="img-area" style={{ height: 185, overflow: 'hidden', backgroundColor: '#f0e6d8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SmartImage
              src="/photos/photo_cake.jpg"
              alt="Birthday Cake"
              fallback={<BirthdayCakeArt />}
              imgStyle={{ objectFit: 'contain', width: '100%', height: '100%' }}
            />
          </div>
          <p className="booklet-polaroid-caption" style={{ color: 'var(--burgundy)', fontSize: '0.86rem', marginTop: 3 }}>
            "Make a wish, Mohini 🎂"
          </p>
        </div>

        <div className="final-message text-center" style={{ padding: '2px 0', fontSize: '0.82rem' }}>
          <p style={{ margin: 0, fontStyle: 'italic' }}>
            "Mazaak apni jagah, par tere bina group ka mazaa aadha ho jaata hai."
          </p>
          <p className="mt-1" style={{ margin: 0 }}>
            IRF mein mile the, aur tu hamari life ka ek bahut pyaara hissa ban gayi.
          </p>
          <p className="mt-1" style={{ fontWeight: 700, color: 'var(--burgundy)', fontSize: '1.02rem', margin: 0 }}>
            Happy Birthday, Mohini. ✨
          </p>
          <p className="mt-1" style={{ fontSize: '0.78rem', margin: 0 }}>
            Aise hi khush reh, naye experiences explore kar, aur hamare jokes tolerate kar liya kar!
          </p>
        </div>

        <div className="text-center mt-1">
          <p className="final-signoff" style={{ fontSize: '1.08rem', margin: 0 }}>
            With love, your IRF people ❤️
          </p>
        </div>

        <div className="text-center mt-auto" style={{ paddingTop: 2 }}>
          <button
            className="paper-button paper-button-burgundy"
            style={{ padding: '5px 14px', fontSize: '0.82rem' }}
            onClick={(e) => {
              e.stopPropagation()
              triggerConfetti(e)
            }}
          >
            🎉 Burst Paper Confetti!
          </button>
        </div>

        <span className="page-num">Page 8</span>
        <span className="corner-turn-hint" onClick={isMobile ? flipMobileNext : flipNext}>click to turn ➔</span>
      </div>
    </div>
  )

  // Page 9: Back Cover
  const renderCoverBack = () => (
    <div className="book-page cover-back">
      <div className="book-page-content cover-border-emboss">
        <div className="cover-emboss-corner cover-emboss-tl" />
        <div className="cover-emboss-corner cover-emboss-tr" />
        <div className="cover-emboss-corner cover-emboss-bl" />
        <div className="cover-emboss-corner cover-emboss-br" />

        <div style={{ marginTop: 8 }}>
          <span className="cover-badge">KIT's IRF Archives · Complete Edition</span>
        </div>

        <div style={{ margin: 'auto 0', textAlign: 'center' }}>
          <h2 className="cover-title" style={{ fontSize: '1.6rem' }}>
            More Memories
            <br />
            To Be Continued...
          </h2>

          <div style={{ margin: '8px 0 4px' }}>
            <WaxSealArt size={48} text="KIT" />
          </div>

          <p className="cover-sub" style={{ marginTop: 4, fontSize: '0.92rem' }}>
            "College khatam ho sakta hai, par IRF ki dosti nahi."
          </p>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px dashed #d4af37',
              borderRadius: 4,
              padding: '8px 14px',
              maxWidth: 240,
              margin: '12px auto 0',
            }}
          >
            <div style={{ fontSize: '0.7rem', color: '#e5d2b8', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Library Archive Slip
            </div>
            <div style={{ fontFamily: 'var(--font-handwritten)', color: '#ffdda6', fontSize: '1.05rem', marginTop: 4 }}>
              Borrower: Mohini
              <br />
              Due Date: Never · Lifelong Friends
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 10, display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 240 }}>
          <button
            className="paper-button"
            style={{ color: '#fff', borderColor: '#d4af37', padding: '7px 12px', fontSize: '0.84rem' }}
            onClick={(e) => {
              e.stopPropagation()
              jumpToSpread(0)
            }}
          >
            ↩ Read from Start
          </button>
          <button
            className="paper-button"
            style={{ color: '#fff', borderColor: '#e5d2b8', padding: '7px 12px', fontSize: '0.84rem' }}
            onClick={(e) => {
              e.stopPropagation()
              onSwitchToNewspaper()
            }}
          >
            📰 Play Operation: Birthday Cake
          </button>
        </div>
      </div>
    </div>
  )

  // 10 Individual Pages List
  const PAGES_LIST = [
    { id: 0, title: 'Front Cover', render: renderCoverFront },
    { id: 1, title: 'Page 1 · Birthday Note', render: renderPage1 },
    { id: 2, title: 'Page 2 · Photo Archive', render: renderPage2 },
    { id: 3, title: 'Page 3 · IRF Report', render: renderPage3 },
    { id: 4, title: 'Page 4 · Roast Docket', render: renderPage4 },
    { id: 5, title: 'Page 5 · Inside Jokes', render: renderPage5 },
    { id: 6, title: 'Page 6 · Timeline Journey', render: renderPage6 },
    { id: 7, title: 'Page 7 · Group Letters', render: renderPage7 },
    { id: 8, title: 'Page 8 · Final Wish', render: renderPage8 },
    { id: 9, title: 'Back Cover', render: renderCoverBack },
  ]

  // 6 Desktop Spreads Mapper
  const getSpreadContent = (idx) => {
    switch (idx) {
      case 0:
        return { isSingle: true, content: renderCoverFront() }
      case 1:
        return { isSingle: false, left: renderPage1(), right: renderPage2() }
      case 2:
        return { isSingle: false, left: renderPage3(), right: renderPage4() }
      case 3:
        return { isSingle: false, left: renderPage5(), right: renderPage6() }
      case 4:
        return { isSingle: false, left: renderPage7(), right: renderPage8() }
      case 5:
        return { isSingle: true, content: renderCoverBack() }
      default:
        return null
    }
  }

  const getSpreadLabel = () => {
    if (isMobile) {
      if (mobilePage === 0) return 'Front Cover (Closed)'
      if (mobilePage === 9) return 'Back Cover (Closed)'
      return `Page ${mobilePage} of 9 · ${PAGES_LIST[mobilePage].title}`
    }
    switch (spreadIndex) {
      case 0: return 'Front Cover (Closed)'
      case 1: return 'Pages 1 & 2 · Birthday Girl & Photo Archive'
      case 2: return 'Pages 3 & 4 · IRF Report & Roast Docket'
      case 3: return 'Pages 5 & 6 · Inside Jokes & Friendship Timeline'
      case 4: return 'Pages 7 & 8 · Letters & Final Heartfelt Wish'
      case 5: return 'Back Cover (Closed)'
      default: return ''
    }
  }

  const currentSpread = getSpreadContent(spreadIndex)

  // Desktop 3D Flipping Stage Renderer
  const renderDesktopFlippingBook = () => {
    if (!flippingState) {
      return (
        <div
          className="physical-book-stage"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {currentSpread.isSingle ? (
            <div className="single-cover-spread" onClick={spreadIndex === 0 ? flipNext : undefined}>
              {currentSpread.content}
            </div>
          ) : (
            <div className="two-page-spread">
              <div className="spread-spine-crease" />
              <div className="book-leaf-side leaf-left" onClick={flipPrev} title="Click to turn previous page">
                {currentSpread.left}
              </div>
              <div className="book-leaf-side leaf-right" onClick={flipNext} title="Click to turn next page">
                {currentSpread.right}
              </div>
            </div>
          )}
        </div>
      )
    }

    const { dir, from, to } = flippingState
    const fromSpread = getSpreadContent(from)
    const toSpread = getSpreadContent(to)

    if (dir === 'next') {
      return (
        <div className="physical-book-stage">
          <div className="two-page-spread is-animating-spread">
            <div className="spread-spine-crease" />

            <div className="book-leaf-side leaf-left">
              {fromSpread.isSingle ? <div className="book-page blank-stack-page" /> : fromSpread.left}
              <div className="page-cast-shadow shadow-sweep-left" />
            </div>

            <div className="book-leaf-side leaf-right">
              {toSpread.isSingle ? toSpread.content : toSpread.right}
            </div>

            <div className="turning-3d-leaf leaf-turn-forward">
              <div className="leaf-face leaf-face-front">
                {fromSpread.isSingle ? fromSpread.content : fromSpread.right}
                <div className="leaf-shine-effect" />
              </div>
              <div className="leaf-face leaf-face-back">
                {toSpread.isSingle ? toSpread.content : toSpread.left}
                <div className="leaf-shine-effect" />
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="physical-book-stage">
          <div className="two-page-spread is-animating-spread">
            <div className="spread-spine-crease" />

            <div className="book-leaf-side leaf-left">
              {toSpread.isSingle ? toSpread.content : toSpread.left}
            </div>

            <div className="book-leaf-side leaf-right">
              {fromSpread.isSingle ? fromSpread.content : fromSpread.right}
              <div className="page-cast-shadow shadow-sweep-right" />
            </div>

            <div className="turning-3d-leaf leaf-turn-backward">
              <div className="leaf-face leaf-face-front">
                {fromSpread.isSingle ? fromSpread.content : fromSpread.left}
                <div className="leaf-shine-effect" />
              </div>
              <div className="leaf-face leaf-face-back">
                {toSpread.isSingle ? toSpread.content : toSpread.right}
                <div className="leaf-shine-effect" />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  // Mobile Single-Page Flipping Renderer
  const renderMobileBook = () => {
    return (
      <div
        className="mobile-book-stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`mobile-book-container ${mobileFlipping ? `mobile-flip-${mobileFlipping.dir}` : ''}`}
          onClick={flipMobileNext}
          style={{ cursor: 'pointer' }}
          title="Tap page to turn to next page"
        >
          {PAGES_LIST[mobilePage].render()}
        </div>
      </div>
    )
  }

  return (
    <div className="desk-viewport">
      {/* Top Desk Navigation & Tools */}
      <header className="desk-topbar">
        <div className="mode-pills">
          <button
            className={`mode-pill-btn ${!viewAllPages ? 'active' : ''}`}
            onClick={() => setViewAllPages(false)}
            aria-pressed={!viewAllPages}
          >
            📖 3D Desk Flipbook
          </button>
          <button
            className={`mode-pill-btn ${viewAllPages ? 'active' : ''}`}
            onClick={() => setViewAllPages(true)}
            aria-pressed={viewAllPages}
          >
            📑 View All 10 Pages
          </button>
          <button
            className="mode-pill-btn"
            onClick={onSwitchToNewspaper}
            aria-label="Switch to Newspaper Edition"
          >
            📰 The Mohini Gazette
          </button>
        </div>

        <div className="desk-actions">
          <button
            className="desk-btn-tool"
            onClick={() => setSoundEnabled((prev) => !prev)}
            title="Toggle paper turn sound"
          >
            {soundEnabled ? '🔊 Paper Sound: ON' : '🔈 Sound: OFF'}
          </button>
          <button
            className="desk-btn-tool"
            onClick={triggerConfetti}
            title="Celebrate Mohini"
          >
            🎉 Confetti
          </button>
        </div>
      </header>

      {/* ════ VIEW MODE 1: INTERACTIVE DESK BOOK ════ */}
      {!viewAllPages ? (
        <main className="book-stage">
          <div className="desk-prop-pen" aria-hidden="true" />
          <div className="desk-prop-bookmark" aria-hidden="true" />

          {/* Book Container: Single Page for Mobile, 2-Page Spread for Desktop */}
          <div className="physical-book-wrap">
            {isMobile ? renderMobileBook() : renderDesktopFlippingBook()}
          </div>
        </main>
      ) : (
        /* ════ VIEW MODE 2: ALL 10 PAGES GALLERY ════ */
        <main className="all-pages-gallery animate-fade-in">
          <div className="gallery-header text-center mb-3">
            <h2 className="headline-lg" style={{ color: 'var(--ink-black)' }}>
              Mohini — Complete Scrapbook Album (10 Pages)
            </h2>
            <p className="body-text" style={{ fontStyle: 'italic', color: 'var(--ink-medium)' }}>
              All 10 handmade pages laid out side by side on the desk.
            </p>
          </div>

          <div className="gallery-grid">
            {PAGES_LIST.map((p, idx) => (
              <div
                key={p.id}
                className="gallery-item"
                onClick={() => {
                  if (isMobile) setMobilePage(idx)
                  else {
                    const sp = idx === 0 ? 0 : idx === 9 ? 5 : Math.ceil(idx / 2)
                    setSpreadIndex(sp)
                  }
                  setViewAllPages(false)
                }}
              >
                <span className="gallery-badge">{p.title}</span>
                <div className="gallery-card">{p.render()}</div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Controls Bar */}
      {!viewAllPages && (
        <>
          <footer className="desk-controls-bar">
            <button
              className="desk-nav-btn"
              onClick={isMobile ? flipMobilePrev : flipPrev}
              disabled={isMobile ? mobilePage === 0 || !!mobileFlipping : spreadIndex === 0 || !!flippingState}
              aria-label="Previous Page"
            >
              ‹ Prev
            </button>

            <span className="desk-page-indicator" aria-live="polite">
              {getSpreadLabel()}
            </span>

            <button
              className="desk-nav-btn"
              onClick={isMobile ? flipMobileNext : flipNext}
              disabled={isMobile ? mobilePage >= totalMobilePages - 1 || !!mobileFlipping : spreadIndex >= totalSpreads - 1 || !!flippingState}
              aria-label="Next Page"
            >
              Next ›
            </button>
          </footer>

          {/* Quick Page Jumper Ribbon */}
          <div className="desk-page-ribbon">
            {isMobile ? (
              PAGES_LIST.map((p, idx) => (
                <button
                  key={p.id}
                  className={`ribbon-tab ${mobilePage === idx ? 'active' : ''}`}
                  onClick={() => flipMobile(idx, idx > mobilePage ? 'next' : 'prev')}
                  disabled={!!mobileFlipping}
                >
                  {idx === 0 ? 'Cover' : idx === 9 ? 'Back' : `P.${idx}`}
                </button>
              ))
            ) : (
              <>
                <button
                  className={`ribbon-tab ${spreadIndex === 0 ? 'active' : ''}`}
                  onClick={() => jumpToSpread(0)}
                  disabled={!!flippingState}
                >
                  Cover
                </button>
                <button
                  className={`ribbon-tab ${spreadIndex === 1 ? 'active' : ''}`}
                  onClick={() => jumpToSpread(1)}
                  disabled={!!flippingState}
                >
                  Pages 1–2
                </button>
                <button
                  className={`ribbon-tab ${spreadIndex === 2 ? 'active' : ''}`}
                  onClick={() => jumpToSpread(2)}
                  disabled={!!flippingState}
                >
                  Pages 3–4
                </button>
                <button
                  className={`ribbon-tab ${spreadIndex === 3 ? 'active' : ''}`}
                  onClick={() => jumpToSpread(3)}
                  disabled={!!flippingState}
                >
                  Pages 5–6
                </button>
                <button
                  className={`ribbon-tab ${spreadIndex === 4 ? 'active' : ''}`}
                  onClick={() => jumpToSpread(4)}
                  disabled={!!flippingState}
                >
                  Pages 7–8
                </button>
                <button
                  className={`ribbon-tab ${spreadIndex === 5 ? 'active' : ''}`}
                  onClick={() => jumpToSpread(5)}
                  disabled={!!flippingState}
                >
                  Back
                </button>
              </>
            )}
          </div>

          <div className="desk-bottom-hint">
            💡 {isMobile ? 'Swipe left / right or tap buttons to turn pages smoothly' : 'Click on any page, corner, or use ← → keys / swipe to flip like a real book'}
          </div>
        </>
      )}

      {/* Interactive Letter Modal */}
      {activeLetter && (
        <div
          className="letter-modal"
          onClick={() => setActiveLetter(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="letter-paper folded-corner" onClick={(e) => e.stopPropagation()}>
            <button
              className="letter-close"
              onClick={() => setActiveLetter(null)}
              aria-label="Close letter"
            >
              ×
            </button>
            <div className="tape tape-center" style={{ top: -12 }} />
            <div className="letter-from" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 6, borderBottom: '1px solid var(--ink-faded)' }}>
              <div>
                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-light)', display: 'block' }}>
                  From the IRF Gang
                </span>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--burgundy)', fontFamily: 'var(--font-headline)' }}>
                  {activeLetter.name}
                </span>
              </div>
              <WaxSealArt size={38} text={activeLetter.initial} />
            </div>

            {/* Group Photo in Letter */}
            {activeLetter.photo && (
              <div style={{ margin: '10px 0 8px' }}>
                <div style={{ height: 165, width: '100%', borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(138,110,80,0.3)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', backgroundColor: '#f0e6d8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <SmartImage
                    src={activeLetter.photo}
                    alt={activeLetter.name}
                    imgStyle={{ objectFit: 'contain', width: '100%', height: '100%' }}
                  />
                </div>
                {activeLetter.photoCaption && (
                  <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-body)', color: 'var(--ink-medium)', fontStyle: 'italic', textAlign: 'center', marginTop: 3 }}>
                    📸 {activeLetter.photoCaption}
                  </div>
                )}
              </div>
            )}

            <div className="letter-body" style={{ marginTop: 8 }}>
              <div style={{ background: 'rgba(255,255,255,0.6)', padding: '6px 10px', borderRadius: 4, marginBottom: 8 }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--burgundy)', fontWeight: 700, fontFamily: 'var(--font-headline)', textTransform: 'uppercase', display: 'block' }}>
                  The Friendly Tease:
                </span>
                <p style={{ margin: '2px 0 0', fontStyle: 'italic', fontSize: '0.98rem' }}>"{activeLetter.funnyLine}"</p>
              </div>

              <div style={{ background: 'rgba(107, 45, 62, 0.05)', borderLeft: '3px solid var(--burgundy)', padding: '6px 10px', borderRadius: '0 4px 4px 0' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--burgundy)', fontWeight: 700, fontFamily: 'var(--font-headline)', textTransform: 'uppercase', display: 'block' }}>
                  What We Actually Mean:
                </span>
                <p style={{ margin: '2px 0 0', fontWeight: 500, fontSize: '0.98rem' }}>"{activeLetter.wish}"</p>
              </div>
            </div>

            <div style={{ marginTop: 10, textAlign: 'center' }}>
              <span className="pencil-note" style={{ fontSize: '0.8rem' }}>
                {activeLetter.voicePreview}
              </span>
            </div>

          </div>
        </div>
      )}

      {/* Lightbox for Photos */}
      {lightboxImg && (
        <div className="photo-lightbox" onClick={() => setLightboxImg(null)}>
          <div
            style={{
              position: 'relative',
              maxWidth: '92vw',
              maxHeight: '88vh',
              background: 'var(--paper-cream)',
              padding: 12,
              borderRadius: 6,
              boxShadow: '0 12px 48px rgba(0,0,0,0.6)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImg(null)}
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
            >
              ✕
            </button>
            <div style={{ maxWidth: '85vw', maxHeight: '72vh', overflow: 'hidden', borderRadius: 4 }}>
              <SmartImage
                src={lightboxImg.src}
                alt={lightboxImg.label}
                fallback={lightboxImg.fallback}
                style={{ width: '100%', height: '100%' }}
                imgStyle={{ maxHeight: '72vh', objectFit: 'contain' }}
              />
            </div>
            <p style={{ fontFamily: 'var(--font-handwritten)', fontSize: '1.25rem', marginTop: 10, color: 'var(--burgundy)', margin: '10px 0 0' }}>
              {lightboxImg.label}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
