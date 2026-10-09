import { useState, useRef, useEffect, useCallback } from 'react'
import './index.css'
import './App.css'
import FrontPage from './pages/FrontPage'
import CharacterReport from './pages/CharacterReport'
import PhotoScrapbook from './pages/PhotoScrapbook'
import RoastColumn from './pages/RoastColumn'
import BirthdayGame from './pages/BirthdayGame'
import LettersPage from './pages/LettersPage'
import FinalPage from './pages/FinalPage'
import DeskBooklet from './components/DeskBooklet'
import MusicPlayer from './components/MusicPlayer'
import NavDots from './components/NavDots'

const PAGES = [
  { id: 'front', label: 'Front Page' },
  { id: 'report', label: 'Character Report' },
  { id: 'scrapbook', label: 'Photo Scrapbook' },
  { id: 'roast', label: 'Roast Column' },
  { id: 'game', label: 'Birthday Game' },
  { id: 'letters', label: 'Letters' },
  { id: 'final', label: 'Final Page' },
]

function App() {
  // On opening, first show 📰 The Mohini Gazette, then user can flip through the 3D book
  const [viewMode, setViewMode] = useState('newspaper')
  const [currentPage, setCurrentPage] = useState(0)
  const [started, setStarted] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [direction, setDirection] = useState('next')

  const touchStartXRef = useRef(null)
  const touchStartYRef = useRef(null)

  const goToPage = useCallback((index) => {
    if (index === currentPage || transitioning || index < 0 || index >= PAGES.length) return
    setDirection(index > currentPage ? 'next' : 'prev')
    setTransitioning(true)
    setTimeout(() => {
      setCurrentPage(index)
      setTransitioning(false)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 380)
  }, [currentPage, transitioning])

  const nextPage = useCallback(() => {
    if (currentPage < PAGES.length - 1) goToPage(currentPage + 1)
  }, [currentPage, goToPage])

  const prevPage = useCallback(() => {
    if (currentPage > 0) goToPage(currentPage - 1)
  }, [currentPage, goToPage])

  const handleStart = useCallback(() => {
    setStarted(true)
    setTransitioning(true)
    setTimeout(() => {
      setCurrentPage(1)
      setTransitioning(false)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 380)
  }, [])

  const handleReplay = useCallback(() => {
    setTransitioning(true)
    setTimeout(() => {
      setCurrentPage(0)
      setStarted(false)
      setTransitioning(false)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 380)
  }, [])

  const handleOpenBooklet = useCallback(() => {
    setViewMode('booklet')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const handleOpenNewspaper = useCallback(() => {
    setViewMode('newspaper')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Mobile swipe navigation for newspaper view
  const handleTouchStart = (e) => {
    // Don't trigger swipe if user is playing the game on page 4 or in a modal
    if (currentPage === 4) return
    if (e.target && e.target.closest && (e.target.closest('.game-container') || e.target.closest('.photo-lightbox') || e.target.closest('.letter-modal') || e.target.closest('.film-roll-marquee-wrap'))) {
      return
    }
    touchStartXRef.current = e.touches[0].clientX
    touchStartYRef.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null || currentPage === 4) return
    const touchEndX = e.changedTouches[0].clientX
    const touchEndY = e.changedTouches[0].clientY
    const diffX = touchStartXRef.current - touchEndX
    const diffY = touchStartYRef.current - touchEndY

    // Only trigger if horizontal swipe is dominant and exceeds 50px
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX > 0) {
        nextPage()
      } else {
        prevPage()
      }
    }
    touchStartXRef.current = null
    touchStartYRef.current = null
  }

  // Keyboard navigation for newspaper view
  useEffect(() => {
    if (viewMode !== 'newspaper') return
    const handleKeyDown = (e) => {
      // Don't interfere if arrow keys are used during birthday game
      if (currentPage === 4 && (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'a' || e.key === 'd')) {
        return
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault()
        nextPage()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        prevPage()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [viewMode, nextPage, prevPage, currentPage])

  const renderNewspaperPage = () => {
    switch (currentPage) {
      case 0:
        return <FrontPage onStart={handleStart} onOpenBooklet={handleOpenBooklet} />
      case 1:
        return <CharacterReport onNext={nextPage} />
      case 2:
        return <PhotoScrapbook onNext={nextPage} onPrev={prevPage} />
      case 3:
        return <RoastColumn onNext={nextPage} onPrev={prevPage} />
      case 4:
        return <BirthdayGame onNext={nextPage} onPrev={prevPage} />
      case 5:
        return <LettersPage onNext={nextPage} onPrev={prevPage} />
      case 6:
        return (
          <FinalPage
            onReplay={handleReplay}
            onPrev={prevPage}
            onOpenBooklet={handleOpenBooklet}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="app-container">
      {viewMode === 'booklet' ? (
        <DeskBooklet onSwitchToNewspaper={handleOpenNewspaper} />
      ) : (
        <div
          style={{ position: 'relative' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top mode switcher in newspaper view */}
          <div
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 80,
              display: 'flex',
              justifyContent: 'center',
              padding: '8px 12px',
              background: 'rgba(237, 230, 216, 0.94)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderBottom: '1px solid rgba(122, 110, 90, 0.3)',
            }}
          >
            <div className="mode-pills">
              <button
                className="mode-pill-btn"
                onClick={handleOpenBooklet}
                aria-label="Switch to 3D Scrapbook Booklet"
              >
                📖 3D Desk Booklet
              </button>
              <button
                className="mode-pill-btn active"
                aria-pressed="true"
                aria-label="The Mohini Gazette Newspaper"
              >
                📰 The Mohini Gazette
              </button>
            </div>
          </div>

          <div
            className={`page-wrapper ${
              transitioning ? `page-exit-${direction}` : 'page-active'
            }`}
          >
            {renderNewspaperPage()}
          </div>

          {started && currentPage > 0 && (
            <NavDots pages={PAGES} current={currentPage} onNavigate={goToPage} />
          )}
        </div>
      )}

      {/* Global music toggle */}
      <MusicPlayer />
    </div>
  )
}

export default App
