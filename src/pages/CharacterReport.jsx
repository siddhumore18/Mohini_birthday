import { useEffect, useState } from 'react'

export default function CharacterReport({ onNext }) {
  const [stampVisible, setStampVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStampVisible(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const reportData = [
    { label: 'Academic Performance', value: 'Outstanding', highlight: true },
    { label: 'Exploring New Things', value: 'Always Ready', highlight: false },
    { label: 'Overthinking Department', value: 'Working Overtime', highlight: false },
    { label: 'Tolerance for Our Jokes', value: 'Under Review', highlight: false },
    { label: 'Getting Angry on Small Things', value: 'Certified Expert', highlight: false },
    { label: 'Being Everyone\'s Favourite', value: 'Confirmed', highlight: true },
  ]

  return (
    <div className="paper-page report-page">
      {/* Header */}
      <header className="report-header animate-fade-in-up">
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
            Page Two · The Official Character Report
          </span>
        </div>
        <hr className="rule-thin" />
        <h2 className="headline-lg mt-2">
          The Official
          <br />
          Character Report
        </h2>
        <p className="body-text mt-1" style={{ fontStyle: 'italic', color: 'var(--ink-medium)' }}>
          Filed by the IRF Investigation Bureau
        </p>
      </header>

      <hr className="rule-thin mt-2 mb-2" />

      {/* Report Body */}
      <div className="report-body">
        {/* Main Report Card */}
        <div className="report-card animate-fade-in-up delay-1">
          <div className="staple" style={{ top: 8, left: 12 }} />
          <div style={{ marginBottom: 12 }}>
            <span
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--burgundy)',
              }}
            >
              Subject: Mohini · Status: Birthday
            </span>
          </div>

          {reportData.map((item, i) => (
            <div className="report-row" key={i}>
              <span className="report-label">{item.label}</span>
              <span className={`report-value ${item.highlight ? 'outstanding' : ''}`}>
                {item.value}
              </span>
            </div>
          ))}

          {/* Pencil annotation */}
          <div style={{ marginTop: 16 }}>
            <span className="pencil-note">
              ^ sab sach hai, koi exaggeration nahi ^
            </span>
          </div>
        </div>

        {/* Sidebar */}
        <div className="report-sidebar">
          {/* Stamp */}
          <div className="stamp-section animate-fade-in-up delay-3">
            {stampVisible && (
              <div className="ink-stamp animate-stamp" style={{ fontSize: '0.9rem', padding: '10px 20px' }}>
                IRF Verified ✓
              </div>
            )}
          </div>

          {/* Margin note */}
          <div className="margin-note animate-fade-in-up delay-4">
            <p className="handwritten-note">
              "Chhoti-chhoti baaton pe gussa,
              <br />
              phir bhi hum sabki favourite."
            </p>
          </div>

          {/* Additional margin annotations */}
          <div className="margin-note animate-fade-in-up delay-5" style={{ marginTop: 8 }}>
            <p className="handwritten-note" style={{ color: 'var(--lavender)', fontSize: '1rem' }}>
              Note to self: don't read this out loud in front of her
            </p>
          </div>

          {/* Classification stamp */}
          <div className="animate-fade-in-up delay-6" style={{ textAlign: 'center', marginTop: 12 }}>
            <span
              className="ink-stamp"
              style={{
                borderColor: 'var(--lavender)',
                color: 'var(--lavender)',
                fontSize: '0.7rem',
                transform: 'rotate(6deg)',
              }}
            >
              Top Secret
            </span>
          </div>
        </div>
      </div>

      <hr className="rule-thin mt-3" />

      {/* Findings summary */}
      <div className="animate-fade-in-up delay-5 mt-3" style={{ maxWidth: 480 }}>
        <h3 className="headline-md mb-1">Bureau Findings</h3>
        <p className="body-text">
          After extensive observation during the IRF internship period, the investigation
          bureau concludes that the subject is, in fact, irreplaceable. All complaints
          filed against her are hereby noted — and lovingly ignored.
        </p>
      </div>

      {/* Navigation */}
      <div className="page-nav mt-3">
        <span />
        <button className="page-nav-btn" onClick={onNext}>
          Photo Scrapbook →
        </button>
      </div>
    </div>
  )
}
