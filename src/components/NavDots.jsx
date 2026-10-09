export default function NavDots({ pages, current, onNavigate }) {
  return (
    <nav className="nav-dots" aria-label="Page navigation">
      {pages.map((page, i) => (
        <button
          key={page.id}
          className={`nav-dot ${i === current ? 'active' : ''}`}
          onClick={() => onNavigate(i)}
          aria-label={`Go to ${page.label}`}
          title={page.label}
        />
      ))}
    </nav>
  )
}
