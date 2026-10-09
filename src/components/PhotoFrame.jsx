import { useState } from 'react'

export default function PhotoFrame({
  src,
  alt,
  label,
  fallback,
  className = '',
  style = {},
  imgStyle = {},
  onClick,
}) {
  const [error, setError] = useState(false)
  const hasImage = src && src.trim() !== '' && !error

  return (
    <div
      className={`photo-frame ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0e6d8',
        ...style,
      }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick() } : undefined}
    >
      {hasImage ? (
        <img
          src={src}
          alt={alt || label || 'Photo'}
          loading="lazy"
          onError={() => setError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            ...imgStyle,
          }}
        />
      ) : fallback ? (
        fallback
      ) : (
        <div className="placeholder-label" style={{ textAlign: 'center', padding: '12px' }}>
          <span style={{ fontSize: '2rem', display: 'block', marginBottom: 6 }}>📷</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--ink-medium)' }}>
            {label || 'Photo placeholder'}
          </span>
        </div>
      )}
    </div>
  )
}

