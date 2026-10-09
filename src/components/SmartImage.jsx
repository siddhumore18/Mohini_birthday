import { useState } from 'react'

export default function SmartImage({
  src,
  alt,
  fallback,
  className = '',
  style = {},
  imgStyle = {},
  onClick,
}) {
  const [error, setError] = useState(false)
  const hasValidSrc = src && src.trim() !== '' && !error

  return (
    <div
      className={`smart-img-wrap ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      onClick={onClick}
    >
      {hasValidSrc ? (
        <img
          src={src}
          alt={alt || 'Memory Photo'}
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
      ) : (
        fallback || (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--paper-dark)',
              color: 'var(--ink-light)',
            }}
          >
            📷
          </div>
        )
      )}
    </div>
  )
}
