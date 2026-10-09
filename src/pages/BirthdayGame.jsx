import { useState, useEffect, useRef, useCallback } from 'react'

const OVERTHINKING_NOTES = [
  'Usne aisa kyun bola?',
  'Ek baar aur soch leti hoon.',
  'Kal ka kya?',
  'Kya matlab tha uska?',
  'Sahi kiya ya galat?',
  'Phir se check kar leti hoon.',
  'Aur agar ye ho gaya toh?',
  'Par unhone reply nahi kiya...',
]

const CAKE_EMOJI = '🎂'
const BASKET_EMOJI = '🧺'
const TARGET_CAKES = 10

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

export default function BirthdayGame({ onNext, onPrev }) {
  const [gameState, setGameState] = useState('idle') // idle | playing | won | lost
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [basketX, setBasketX] = useState(220)
  const [items, setItems] = useState([])
  const containerRef = useRef(null)
  const animFrameRef = useRef(null)
  const lastSpawnRef = useRef(0)
  const itemIdRef = useRef(0)
  const touchStartRef = useRef(null)

  const CONTAINER_W = 500
  const CONTAINER_H = 400
  const BASKET_W = 60
  const BASKET_H = 50
  const ITEM_SIZE = 30

  const getContainerRect = useCallback(() => {
    if (containerRef.current) {
      return containerRef.current.getBoundingClientRect()
    }
    return { left: 0, top: 0, width: CONTAINER_W, height: CONTAINER_H }
  }, [])

  const startGame = useCallback(() => {
    setGameState('playing')
    setScore(0)
    setLives(3)
    setItems([])
    setBasketX(220)
    lastSpawnRef.current = 0
    itemIdRef.current = 0
  }, [])

  const moveIntervalRef = useRef(null)

  const stopMove = useCallback(() => {
    if (moveIntervalRef.current) {
      clearInterval(moveIntervalRef.current)
      moveIntervalRef.current = null
    }
  }, [])

  const startMoveLeft = useCallback((e) => {
    if (e && e.preventDefault) e.preventDefault()
    stopMove()
    setBasketX((prev) => Math.max(0, prev - 24))
    moveIntervalRef.current = setInterval(() => {
      setBasketX((prev) => Math.max(0, prev - 18))
    }, 45)
  }, [stopMove])

  const startMoveRight = useCallback((e) => {
    if (e && e.preventDefault) e.preventDefault()
    stopMove()
    const rect = getContainerRect()
    setBasketX((prev) => Math.min(rect.width - BASKET_W, prev + 24))
    moveIntervalRef.current = setInterval(() => {
      const curRect = getContainerRect()
      setBasketX((prev) => Math.min(curRect.width - BASKET_W, prev + 18))
    }, 45)
  }, [stopMove, getContainerRect])

  // Keyboard controls
  useEffect(() => {
    if (gameState !== 'playing') return
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setBasketX((prev) => Math.max(0, prev - 25))
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        const rect = getContainerRect()
        setBasketX((prev) => Math.min(rect.width - BASKET_W, prev + 25))
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
      stopMove()
    }
  }, [gameState, getContainerRect, stopMove])


  // Touch / mouse controls
  const handlePointerMove = useCallback((e) => {
    if (gameState !== 'playing') return
    const rect = getContainerRect()
    let clientX
    if (e.touches) {
      clientX = e.touches[0].clientX
    } else {
      clientX = e.clientX
    }
    const x = clientX - rect.left - BASKET_W / 2
    setBasketX(Math.max(0, Math.min(rect.width - BASKET_W, x)))
  }, [gameState, getContainerRect])

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return

    let currentScore = score
    let currentLives = lives

    const loop = (timestamp) => {
      if (currentScore >= TARGET_CAKES) {
        setGameState('won')
        return
      }
      if (currentLives <= 0) {
        setGameState('lost')
        return
      }

      // Spawn items
      if (timestamp - lastSpawnRef.current > 800) {
        lastSpawnRef.current = timestamp
        const rect = getContainerRect()
        const isNote = Math.random() < 0.3

        const newItem = {
          id: itemIdRef.current++,
          x: randomBetween(10, rect.width - 40),
          y: -30,
          type: isNote ? 'note' : 'cake',
          text: isNote ? OVERTHINKING_NOTES[Math.floor(Math.random() * OVERTHINKING_NOTES.length)] : '',
          speed: randomBetween(1.5, 3),
        }
        setItems((prev) => [...prev, newItem])
      }

      // Move items & check collisions
      setItems((prev) => {
        const rect = getContainerRect()
        const kept = []
        prev.forEach((item) => {
          const newY = item.y + item.speed
          // Check bottom collision with basket
          if (newY + ITEM_SIZE >= CONTAINER_H - BASKET_H - 10) {
            setBasketX((bx) => {
              if (item.x + ITEM_SIZE > bx && item.x < bx + BASKET_W) {
                // Caught!
                if (item.type === 'cake') {
                  currentScore++
                  setScore(currentScore)
                } else {
                  currentLives--
                  setLives(currentLives)
                }
              }
              return bx
            })
            // Don't keep — item is gone
          } else if (newY > CONTAINER_H + 20) {
            // Missed cake
            if (item.type === 'cake') {
              // Missed a cake — lose nothing, it just falls
            }
          } else {
            kept.push({ ...item, y: newY })
          }
        })
        return kept
      })

      animFrameRef.current = requestAnimationFrame(loop)
    }

    animFrameRef.current = requestAnimationFrame(loop)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [gameState]) // intentionally only depend on gameState to avoid re-creating loop

  return (
    <div className="paper-page game-page">
      {/* Header */}
      <header className="game-header animate-fade-in-up">
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
            Page Five · A Small Paper Game
          </span>
        </div>
        <hr className="rule-thin" />
        <h2 className="headline-lg mt-2">
          Operation:
          <br />
          Birthday Cake
        </h2>
        <p className="body-text mt-1" style={{ fontStyle: 'italic', color: 'var(--ink-medium)' }}>
          Catch {TARGET_CAKES} cakes. Avoid the overthinking notes.
        </p>
      </header>

      <hr className="rule-thin mt-2 mb-2" />

      {/* Game instructions */}
      {gameState === 'idle' && (
        <div className="animate-fade-in-up delay-1 text-center mb-3">
          <p className="body-text mb-2">
            Move the basket with <strong>arrow keys</strong>, <strong>A/D keys</strong>,
            or <strong>drag/touch</strong> on mobile.
          </p>
          <p className="body-text mb-2" style={{ fontSize: '0.85rem', color: 'var(--ink-light)' }}>
            Catch 🎂 cakes to win. Avoid overthinking notes or you lose lives!
          </p>
          <button className="paper-button paper-button-burgundy mt-2" onClick={startGame}>
            Start the game →
          </button>
        </div>
      )}

      {/* Game Container */}
      <div
        ref={containerRef}
        className="game-container"
        style={{ display: gameState === 'idle' ? 'none' : 'block' }}
        onMouseMove={handlePointerMove}
        onTouchMove={handlePointerMove}
      >
        {/* HUD */}
        <div className="game-hud">
          <span>🎂 {score}/{TARGET_CAKES}</span>
          <span>{'❤️'.repeat(Math.max(0, lives))}</span>
        </div>

        {/* Falling items */}
        {items.map((item) =>
          item.type === 'cake' ? (
            <div
              key={item.id}
              className="game-item"
              style={{ left: item.x, top: item.y, fontSize: '1.6rem' }}
            >
              {CAKE_EMOJI}
            </div>
          ) : (
            <div
              key={item.id}
              className="game-note"
              style={{ left: item.x, top: item.y }}
            >
              {item.text}
            </div>
          )
        )}

        {/* Basket */}
        <div
          className="game-basket"
          style={{ left: basketX }}
        >
          {BASKET_EMOJI}
        </div>

        {/* Win screen */}
        {gameState === 'won' && (
          <div className="game-over-screen animate-fade-in">
            <h3 className="headline-md mb-2">🎉 You won!</h3>
            <p className="handwritten-note mb-3" style={{ fontSize: '1.2rem' }}>
              "Overthinking defeated.<br />Birthday wishes unlocked."
            </p>
            <button className="paper-button paper-button-burgundy" onClick={onNext}>
              Open birthday wishes →
            </button>
          </div>
        )}

        {/* Lose screen */}
        {gameState === 'lost' && (
          <div className="game-over-screen animate-fade-in">
            <h3 className="headline-md mb-2">Overthinking won this time 😅</h3>
            <p className="body-text mb-3" style={{ fontSize: '0.9rem' }}>
              But it's okay — it's her birthday!
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button className="paper-button" onClick={startGame}>
                Try again
              </button>
              <button className="paper-button paper-button-burgundy" onClick={onNext}>
                Skip to wishes →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile touch controls bar */}
      {gameState === 'playing' && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: 500,
            margin: '12px auto 0',
            gap: 12,
            padding: '0 8px',
          }}
        >
          <button
            type="button"
            className="paper-button"
            onTouchStart={startMoveLeft}
            onTouchEnd={stopMove}
            onMouseDown={startMoveLeft}
            onMouseUp={stopMove}
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '1rem',
              fontWeight: 'bold',
              userSelect: 'none',
              touchAction: 'manipulation',
              borderColor: 'var(--burgundy)',
              color: 'var(--burgundy)',
            }}
          >
            ◀ Move Left
          </button>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-body)', color: 'var(--ink-light)', textAlign: 'center' }}>
            Touch buttons or drag on game screen
          </span>
          <button
            type="button"
            className="paper-button"
            onTouchStart={startMoveRight}
            onTouchEnd={stopMove}
            onMouseDown={startMoveRight}
            onMouseUp={stopMove}
            style={{
              flex: 1,
              padding: '12px 16px',
              fontSize: '1rem',
              fontWeight: 'bold',
              userSelect: 'none',
              touchAction: 'manipulation',
              borderColor: 'var(--burgundy)',
              color: 'var(--burgundy)',
            }}
          >
            Move Right ▶
          </button>
        </div>
      )}

      {/* Skip option */}
      <div className="game-skip mt-2">
        <button onClick={onNext}>
          Skip and open my wishes →
        </button>
      </div>


      {/* Pencil note */}
      <div className="text-center mt-2">
        <span className="pencil-note">
          overthinking ko harana easy nahi hai... par try toh karo
        </span>
      </div>

      {/* Navigation */}
      <div className="page-nav mt-3">
        <button className="page-nav-btn" onClick={onPrev}>
          ← Roast Column
        </button>
        <button className="page-nav-btn" onClick={onNext}>
          Letters →
        </button>
      </div>
    </div>
  )
}
