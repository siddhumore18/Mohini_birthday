import { useEffect, useState } from 'react'

const COLORS = [
  '#6b2d3e', '#9b8aa8', '#d8cdb8', '#a45a6a', 
  '#b8a8c8', '#e8dece', '#8a3e52', '#d0c4da',
  '#7a6e5a', '#a89a82'
]

const SHAPES = ['square', 'circle', 'strip']

function createPiece(i) {
  return {
    id: i,
    left: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    size: 6 + Math.random() * 8,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 2,
    rotation: Math.random() * 360,
  }
}

export default function Confetti({ active }) {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    if (active) {
      setPieces(Array.from({ length: 60 }, (_, i) => createPiece(i)))
      const timer = setTimeout(() => setPieces([]), 5000)
      return () => clearTimeout(timer)
    } else {
      setPieces([])
    }
  }, [active])

  if (pieces.length === 0) return null

  return (
    <div className="confetti-container" aria-hidden="true">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.shape === 'strip' ? p.size * 0.4 : p.size,
            height: p.shape === 'strip' ? p.size * 2 : p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '1px',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  )
}
