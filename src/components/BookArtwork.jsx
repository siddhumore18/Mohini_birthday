// Rich, lightweight SVG illustrations and photo artworks for Mohini's booklet

export function MohiniPortraitArt({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 320 380"
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', borderRadius: 4, ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="warmPortraitBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f7f0e6" />
          <stop offset="100%" stopColor="#ebdcc8" />
        </linearGradient>
      </defs>

      <rect width="320" height="380" fill="url(#warmPortraitBg)" />
      <rect x="12" y="12" width="296" height="356" fill="none" stroke="#d5c1a7" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Decorative floral doodle */}
      <path d="M260,35 Q280,25 290,45 Q275,55 260,35 Z" fill="#9b8aa8" opacity="0.6" />
      <path d="M275,50 Q295,55 290,75 Q270,70 275,50 Z" fill="#b8a8c8" opacity="0.5" />
      <circle cx="275" cy="45" r="4" fill="#6b2d3e" />

      {/* Illustrated character: Mohini */}
      <g transform="translate(160, 195)">
        <circle cx="0" cy="-20" r="82" fill="#fcf6ed" opacity="0.9" />
        <circle cx="0" cy="-20" r="76" fill="#f4ebd9" opacity="0.7" />

        {/* Hair back */}
        <path d="M-60,-40 C-75,40 -50,110 -35,120 C-10,125 10,125 35,120 C50,110 75,40 60,-40 Z" fill="#2c221e" />

        {/* Shoulders / Dress */}
        <path d="M-65,115 C-40,80 -25,75 0,75 C25,75 40,80 65,115 C75,130 85,155 85,170 L-85,170 C-85,155 -75,130 -65,115 Z" fill="#6b2d3e" />
        <path d="M-25,75 Q0,105 25,75 Q0,85 -25,75 Z" fill="#f7f0e6" stroke="#4a3f30" strokeWidth="1" />

        {/* Neck */}
        <path d="M-15,40 L-15,80 L15,80 L15,40 Z" fill="#e8c29e" />

        {/* Face */}
        <ellipse cx="0" cy="15" rx="42" ry="48" fill="#f3d1b3" />

        {/* Soft blush */}
        <circle cx="-25" cy="22" r="12" fill="#e5989b" opacity="0.35" />
        <circle cx="25" cy="22" r="12" fill="#e5989b" opacity="0.35" />

        {/* Hair front */}
        <path d="M-45,-15 C-45,-55 -30,-75 0,-75 C30,-75 45,-55 45,-15 C40,-35 25,-45 0,-45 C-25,-45 -40,-35 -45,-15 Z" fill="#2c221e" />
        <path d="M-44,-10 Q-30,5 -38,35 Q-44,15 -44,-10 Z" fill="#2c221e" />
        <path d="M44,-10 Q30,5 38,35 Q44,15 44,-10 Z" fill="#2c221e" />

        {/* Chic round glasses */}
        <circle cx="-18" cy="10" r="14" fill="none" stroke="#6b2d3e" strokeWidth="2.5" />
        <circle cx="18" cy="10" r="14" fill="none" stroke="#6b2d3e" strokeWidth="2.5" />
        <path d="M-4,10 L4,10" stroke="#6b2d3e" strokeWidth="2.5" />
        <path d="M-32,9 L-42,5" stroke="#6b2d3e" strokeWidth="1.5" />
        <path d="M32,9 L42,5" stroke="#6b2d3e" strokeWidth="1.5" />

        {/* Smiling gentle eyes */}
        <path d="M-24,10 Q-18,6 -12,10" stroke="#2c221e" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M12,10 Q18,6 24,10" stroke="#2c221e" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Gentle smile */}
        <path d="M-10,32 Q0,42 10,32" stroke="#6b2d3e" strokeWidth="2.2" fill="none" strokeLinecap="round" />

        {/* Birthday party cone hat */}
        <g transform="translate(18, -65) rotate(15)">
          <path d="M-18,25 L0,-35 L18,25 Z" fill="#9b8aa8" stroke="#4a3f30" strokeWidth="1.5" />
          <path d="M-12,12 L0,-25 L12,12 Z" fill="#b8a8c8" opacity="0.6" />
          <circle cx="0" cy="-36" r="5" fill="#f7ede2" stroke="#6b2d3e" strokeWidth="1.5" />
        </g>
      </g>

      <rect x="40" y="325" width="240" height="34" rx="4" fill="#faf7f2" stroke="#4a3f30" strokeWidth="1.2" />
      <text x="160" y="347" textAnchor="middle" fontFamily="'Caveat', cursive, sans-serif" fontSize="18" fill="#6b2d3e" fontWeight="bold">
        Mohini · The Birthday Girl ✨
      </text>
    </svg>
  )
}

export function GroupMemoryArt({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 340 220"
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', borderRadius: 4, ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="officeBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f4eee4" />
          <stop offset="100%" stopColor="#e5d9c5" />
        </linearGradient>
      </defs>

      <rect width="340" height="220" fill="url(#officeBg)" />

      {/* Whiteboard */}
      <rect x="40" y="20" width="260" height="85" rx="3" fill="#ffffff" stroke="#c0b09b" strokeWidth="1.5" />
      <text x="170" y="48" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="13" fill="#6b2d3e" fontWeight="bold">
        KIT's IRF INTERNSHIP LAB
      </text>
      <text x="170" y="68" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="14" fill="#7a6e5a">
        "Code compiled on first try? (Impossible)"
      </text>
      <path d="M120,78 L220,78" stroke="#a45a6a" strokeWidth="1.5" strokeDasharray="4 2" />

      {/* 4 Friends */}
      <g transform="translate(70, 155)">
        <ellipse cx="0" cy="-35" rx="16" ry="19" fill="#f0ceaf" />
        <path d="M-16,-45 Q0,-60 16,-45 Q12,-35 -16,-45 Z" fill="#3a2e2b" />
        <circle cx="-5" cy="-35" r="2" fill="#2c221e" />
        <circle cx="5" cy="-35" r="2" fill="#2c221e" />
        <path d="M-4,-27 Q0,-23 4,-27" stroke="#2c221e" strokeWidth="1.5" fill="none" />
        <path d="M-22,-16 C-15,-20 15,-20 22,-16 L25,45 L-25,45 Z" fill="#415a77" />
      </g>

      <g transform="translate(135, 145)">
        <ellipse cx="0" cy="-35" rx="17" ry="20" fill="#f3d1b3" />
        <path d="M-18,-45 Q0,-62 18,-45 Q15,-35 -18,-45 Z" fill="#2c221e" />
        <circle cx="-7" cy="-35" r="6" fill="none" stroke="#6b2d3e" strokeWidth="1.8" />
        <circle cx="7" cy="-35" r="6" fill="none" stroke="#6b2d3e" strokeWidth="1.8" />
        <line x1="-1" y1="-35" x2="1" y2="-35" stroke="#6b2d3e" strokeWidth="1.8" />
        <path d="M-4,-26 Q0,-22 4,-26" stroke="#6b2d3e" strokeWidth="1.8" fill="none" />
        <path d="M-24,-15 C-15,-18 15,-18 24,-15 L26,55 L-26,55 Z" fill="#6b2d3e" />
        <rect x="-14" y="5" width="28" height="22" rx="2" fill="#f7f0e6" stroke="#2c221e" strokeWidth="1" />
        <text x="0" y="19" textAnchor="middle" fontSize="8" fill="#6b2d3e" fontWeight="bold">NOTES</text>
      </g>

      <g transform="translate(205, 150)">
        <ellipse cx="0" cy="-35" rx="16" ry="19" fill="#edd0b7" />
        <path d="M-16,-48 Q0,-58 16,-48 Q10,-35 -16,-48 Z" fill="#5c4d3c" />
        <circle cx="-5" cy="-35" r="2" fill="#2c221e" />
        <circle cx="5" cy="-35" r="2" fill="#2c221e" />
        <path d="M-4,-27 Q0,-23 4,-27" stroke="#2c221e" strokeWidth="1.5" fill="none" />
        <path d="M-22,-16 C-15,-20 15,-20 22,-16 L24,50 L-24,50 Z" fill="#7a6e5a" />
      </g>

      <g transform="translate(270, 152)">
        <ellipse cx="0" cy="-35" rx="16" ry="19" fill="#f0ceaf" />
        <path d="M-15,-45 Q0,-56 15,-45 Q12,-35 -15,-45 Z" fill="#1b263b" />
        <circle cx="-5" cy="-35" r="2" fill="#2c221e" />
        <circle cx="5" cy="-35" r="2" fill="#2c221e" />
        <path d="M-4,-27 Q0,-22 4,-27" stroke="#2c221e" strokeWidth="1.5" fill="none" />
        <path d="M-20,-16 C-15,-20 15,-20 20,-16 L22,48 L-22,48 Z" fill="#9b8aa8" />
        <text x="18" y="-10" fontSize="16">✌️</text>
      </g>
    </svg>
  )
}

export function TopperStudyArt({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 280 190"
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', borderRadius: 4, ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="280" height="190" fill="#f8f4ec" />
      <path d="M0,140 L280,140 L280,190 L0,190 Z" fill="#deb887" opacity="0.3" />

      {/* Book stack */}
      <g transform="translate(45, 135)">
        <rect x="-35" y="-16" width="70" height="16" rx="2" fill="#6b2d3e" />
        <text x="0" y="-4" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">ALGORITHMS</text>
        <rect x="-32" y="-32" width="64" height="16" rx="2" fill="#415a77" />
        <text x="0" y="-20" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">SYSTEMS</text>
        <rect x="-30" y="-46" width="60" height="14" rx="2" fill="#7a6e5a" />
        <text x="0" y="-36" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">IRF RESEARCH</text>
        <rect x="-26" y="-58" width="52" height="12" rx="2" fill="#9b8aa8" />
        <text x="0" y="-49" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">100/100 NOTES</text>
      </g>

      {/* Coffee */}
      <g transform="translate(98, 122)">
        <rect x="-10" y="0" width="20" height="18" rx="3" fill="#fcf6ed" stroke="#6b2d3e" strokeWidth="1.5" />
        <path d="M10,4 Q16,8 10,13" fill="none" stroke="#6b2d3e" strokeWidth="1.5" />
        <text x="-4" y="13" fontSize="10">☕</text>
      </g>

      {/* Mohini */}
      <g transform="translate(190, 130)">
        <ellipse cx="0" cy="-45" rx="18" ry="21" fill="#f3d1b3" />
        <path d="M-19,-55 Q0,-70 19,-55 Q15,-40 -19,-55 Z" fill="#2c221e" />
        <circle cx="-8" cy="-45" r="6" fill="none" stroke="#6b2d3e" strokeWidth="1.8" />
        <circle cx="8" cy="-45" r="6" fill="none" stroke="#6b2d3e" strokeWidth="1.8" />
        <line x1="-2" y1="-45" x2="2" y2="-45" stroke="#6b2d3e" strokeWidth="1.8" />
        <path d="M-4,-36 Q0,-32 4,-36" stroke="#2c221e" strokeWidth="1.5" fill="none" />
        <path d="M-24,-24 C-15,-28 15,-28 24,-24 L26,10 L-26,10 Z" fill="#6b2d3e" />
      </g>

      {/* Thought bubble */}
      <g transform="translate(200, 38)">
        <path d="M-40,0 Q-40,-22 0,-22 Q40,-22 40,0 Q40,22 0,22 Q-20,22 -32,28 L-30,20 Q-40,14 -40,0 Z" fill="#ffffff" stroke="#6b2d3e" strokeWidth="1.5" />
        <text x="0" y="-6" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="11" fill="#6b2d3e" fontWeight="bold">
          "What if question 4
        </text>
        <text x="0" y="7" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="11" fill="#6b2d3e" fontWeight="bold">
          has a secret twist?!"
        </text>
      </g>
    </svg>
  )
}

export function RoastPosterArt({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 280 190"
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', borderRadius: 4, ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="280" height="190" fill="#3e1b24" />
      <rect x="6" y="6" width="268" height="178" fill="none" stroke="#d4af37" strokeWidth="1.5" />

      <rect x="20" y="14" width="240" height="24" fill="#6b2d3e" stroke="#d4af37" strokeWidth="1" />
      <text x="140" y="30" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="12" fill="#ffdda6" fontWeight="900" letterSpacing="2">
        IRF BLOCKBUSTER CINEMA
      </text>

      <text x="140" y="64" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="16" fill="#fdfbf7" fontWeight="bold">
        CHHOTI BAAT, BADA GUSSA
      </text>
      <text x="140" y="80" textAnchor="middle" fontFamily="'Lora', serif" fontSize="9.5" fill="#e5d2b8" fontStyle="italic">
        "Ek Mazaak. Teen Explanations. 45-Min Lecture."
      </text>

      {/* Pouting cute face */}
      <g transform="translate(140, 125)">
        <circle cx="0" cy="0" r="26" fill="#f3d1b3" stroke="#2c221e" strokeWidth="1.5" />
        <path d="M-32,-8 Q-44,-12 -38,-22 Q-28,-18 -30,-8" fill="#fff" opacity="0.8" />
        <path d="M32,-8 Q44,-12 38,-22 Q28,-18 30,-8" fill="#fff" opacity="0.8" />
        <line x1="-15" y1="-10" x2="-5" y2="-5" stroke="#2c221e" strokeWidth="2.5" />
        <line x1="15" y1="-10" x2="5" y2="-5" stroke="#2c221e" strokeWidth="2.5" />
        <circle cx="-10" cy="-3" r="7" fill="none" stroke="#6b2d3e" strokeWidth="1.8" />
        <circle cx="10" cy="-3" r="7" fill="none" stroke="#6b2d3e" strokeWidth="1.8" />
        <path d="M-5,12 Q0,7 5,12" stroke="#6b2d3e" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="-15" cy="5" r="4" fill="#e5989b" opacity="0.5" />
        <circle cx="15" cy="5" r="4" fill="#e5989b" opacity="0.5" />
      </g>

      <rect x="20" y="160" width="240" height="16" fill="#201015" />
      <text x="140" y="172" textAnchor="middle" fontSize="7.5" fill="#d8c3af" letterSpacing="1">
        STARRING: MOHINI · DIRECTED BY: IRF GANG · RATED: CUTE GUSSA
      </text>
    </svg>
  )
}

export function BirthdayCakeArt({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 280 200"
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', borderRadius: 4, ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="280" height="200" fill="#fdfbf7" />

      {/* Confetti */}
      <circle cx="35" cy="35" r="3" fill="#6b2d3e" />
      <circle cx="245" cy="40" r="4" fill="#9b8aa8" />
      <rect x="60" y="25" width="8" height="4" fill="#d4af37" transform="rotate(25 64 27)" />
      <rect x="220" y="65" width="6" height="4" fill="#6b2d3e" transform="rotate(-35 223 67)" />

      {/* Stand */}
      <ellipse cx="140" cy="165" rx="72" ry="12" fill="#e5d9c5" stroke="#8a7968" strokeWidth="1.5" />
      <ellipse cx="140" cy="185" rx="38" ry="7" fill="#d1beaa" />

      {/* Tier 1 */}
      <path d="M80,130 C80,152 200,152 200,130 L200,105 C200,83 80,83 80,105 Z" fill="#6b2d3e" />
      <ellipse cx="140" cy="105" rx="60" ry="13" fill="#8a3e52" />
      <path d="M80,105 Q90,123 100,108 Q110,126 120,110 Q130,124 140,108 Q150,124 160,109 Q170,123 180,110 Q190,122 200,105" fill="#fdfaf3" stroke="#e0d4c0" strokeWidth="1" />

      {/* Tier 2 */}
      <path d="M98,85 C98,103 182,103 182,85 L182,67 C182,49 98,49 98,67 Z" fill="#9b8aa8" />
      <ellipse cx="140" cy="67" rx="42" ry="9" fill="#b8a8c8" />

      {/* Candles */}
      <g transform="translate(140, 40)">
        <rect x="-3" y="0" width="6" height="23" fill="#ffdda6" stroke="#c49b45" strokeWidth="0.8" />
        <ellipse cx="0" cy="-6" rx="3.5" ry="6" fill="#ff9f1c" />
        <ellipse cx="0" cy="-5" rx="2" ry="3.5" fill="#ffe49e" />

        <rect x="-22" y="5" width="5" height="20" fill="#e5989b" />
        <ellipse cx="-19.5" cy="-1" rx="3" ry="5.5" fill="#ff9f1c" />

        <rect x="18" y="5" width="5" height="20" fill="#a45a6a" />
        <ellipse cx="20.5" cy="-1" rx="3" ry="5.5" fill="#ff9f1c" />
      </g>

      <text x="140" y="136" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="16" fill="#fff" fontWeight="bold">
        Happy Birthday Mohini! 🎉
      </text>
    </svg>
  )
}

export function CandidLaughArt({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 280 170"
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', borderRadius: 4, ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="280" height="170" fill="#faf5ee" />
      <rect x="8" y="8" width="264" height="154" fill="none" stroke="#d5c8b5" strokeWidth="1" strokeDasharray="3 3" />

      {/* Cafe setting */}
      <g transform="translate(45, 120)">
        <ellipse cx="0" cy="10" rx="25" ry="8" fill="#e8d8c3" />
        <rect x="-14" y="-12" width="28" height="22" rx="3" fill="#6b2d3e" />
        <path d="M14,-5 Q22,-2 14,5" fill="none" stroke="#6b2d3e" strokeWidth="2" />
        <text x="0" y="5" textAnchor="middle" fontSize="9" fill="#fff">CHAI</text>
      </g>

      <g transform="translate(235, 120)">
        <rect x="-10" y="-15" width="20" height="25" rx="2" fill="#deb887" />
        <path d="M0,-15 Q-15,-35 0,-45 Q15,-35 0,-15" fill="#588157" opacity="0.8" />
      </g>

      {/* Mohini laughing */}
      <g transform="translate(140, 110)">
        <ellipse cx="0" cy="-40" rx="19" ry="22" fill="#f3d1b3" />
        <path d="M-20,-50 Q0,-68 20,-50 Q16,-35 -20,-50 Z" fill="#2c221e" />
        <g transform="rotate(-4)">
          <circle cx="-8" cy="-40" r="7" fill="none" stroke="#6b2d3e" strokeWidth="2" />
          <circle cx="8" cy="-40" r="7" fill="none" stroke="#6b2d3e" strokeWidth="2" />
          <line x1="-1" y1="-40" x2="1" y2="-40" stroke="#6b2d3e" strokeWidth="2" />
        </g>
        <path d="M-13,-40 Q-8,-45 -3,-40" stroke="#2c221e" strokeWidth="2" fill="none" />
        <path d="M3,-40 Q8,-45 13,-40" stroke="#2c221e" strokeWidth="2" fill="none" />
        <path d="M-9,-30 Q0,-18 9,-30 Z" fill="#a45a6a" stroke="#6b2d3e" strokeWidth="1.5" />
        <circle cx="-14" cy="-32" r="6" fill="#e5989b" opacity="0.45" />
        <circle cx="14" cy="-32" r="6" fill="#e5989b" opacity="0.45" />
        <path d="M-26,-15 C-15,-20 15,-20 26,-15 L28,30 L-28,30 Z" fill="#9b8aa8" />
      </g>

      <text x="140" y="152" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="13" fill="#6b2d3e" fontWeight="bold">
        "Rare sight: Topper laughing at our terrible jokes!"
      </text>
    </svg>
  )
}

export function FilmRollStripArt({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 320 110"
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="320" height="110" fill="#201a15" rx="3" />
      <g fill="#f5f0e8">
        <rect x="8" y="6" width="10" height="8" rx="1.5" />
        <rect x="28" y="6" width="10" height="8" rx="1.5" />
        <rect x="48" y="6" width="10" height="8" rx="1.5" />
        <rect x="68" y="6" width="10" height="8" rx="1.5" />
        <rect x="88" y="6" width="10" height="8" rx="1.5" />
        <rect x="108" y="6" width="10" height="8" rx="1.5" />
        <rect x="128" y="6" width="10" height="8" rx="1.5" />
        <rect x="148" y="6" width="10" height="8" rx="1.5" />
        <rect x="168" y="6" width="10" height="8" rx="1.5" />
        <rect x="188" y="6" width="10" height="8" rx="1.5" />
        <rect x="208" y="6" width="10" height="8" rx="1.5" />
        <rect x="228" y="6" width="10" height="8" rx="1.5" />
        <rect x="248" y="6" width="10" height="8" rx="1.5" />
        <rect x="268" y="6" width="10" height="8" rx="1.5" />
        <rect x="288" y="6" width="10" height="8" rx="1.5" />
        <rect x="302" y="6" width="10" height="8" rx="1.5" />

        <rect x="8" y="96" width="10" height="8" rx="1.5" />
        <rect x="28" y="96" width="10" height="8" rx="1.5" />
        <rect x="48" y="96" width="10" height="8" rx="1.5" />
        <rect x="68" y="96" width="10" height="8" rx="1.5" />
        <rect x="88" y="96" width="10" height="8" rx="1.5" />
        <rect x="108" y="96" width="10" height="8" rx="1.5" />
        <rect x="128" y="96" width="10" height="8" rx="1.5" />
        <rect x="148" y="96" width="10" height="8" rx="1.5" />
        <rect x="168" y="96" width="10" height="8" rx="1.5" />
        <rect x="188" y="96" width="10" height="8" rx="1.5" />
        <rect x="208" y="96" width="10" height="8" rx="1.5" />
        <rect x="228" y="96" width="10" height="8" rx="1.5" />
        <rect x="248" y="96" width="10" height="8" rx="1.5" />
        <rect x="268" y="96" width="10" height="8" rx="1.5" />
        <rect x="288" y="96" width="10" height="8" rx="1.5" />
        <rect x="302" y="96" width="10" height="8" rx="1.5" />
      </g>

      <rect x="14" y="20" width="88" height="70" fill="#f7f0e6" rx="2" />
      <text x="58" y="56" textAnchor="middle" fontSize="18">📸</text>
      <text x="58" y="74" textAnchor="middle" fontSize="9" fontFamily="'Caveat', cursive" fill="#6b2d3e">IRF Day 1</text>

      <rect x="116" y="20" width="88" height="70" fill="#f7f0e6" rx="2" />
      <text x="160" y="56" textAnchor="middle" fontSize="18">🎂</text>
      <text x="160" y="74" textAnchor="middle" fontFamily="'Caveat', cursive" fill="#6b2d3e">Cake Alert</text>

      <rect x="218" y="20" width="88" height="70" fill="#f7f0e6" rx="2" />
      <text x="262" y="56" textAnchor="middle" fontSize="18">🎓</text>
      <text x="262" y="74" textAnchor="middle" fontFamily="'Caveat', cursive" fill="#6b2d3e">Best Gang</text>
    </svg>
  )
}

// ─── NEW ARTWORK 1: Canteen Debates & Inside Jokes ───
export function CanteenDebateArt({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 280 180"
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', borderRadius: 4, ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="280" height="180" fill="#fcf8f0" />
      <rect x="8" y="8" width="264" height="164" fill="none" stroke="#e0d0bc" strokeWidth="1.2" strokeDasharray="3 3" />

      {/* Canteen table with samosa and chai */}
      <path d="M20,130 L260,130 L250,170 L30,170 Z" fill="#e8d8c3" />
      
      {/* Samosa plate */}
      <ellipse cx="90" cy="135" rx="30" ry="10" fill="#ffffff" stroke="#c0b09b" strokeWidth="1" />
      <polygon points="80,130 95,120 100,135" fill="#d4a373" stroke="#bc6c25" strokeWidth="1" />
      <polygon points="70,136 85,125 90,138" fill="#c68a4c" stroke="#bc6c25" strokeWidth="1" />

      {/* 2 Chai glasses */}
      <g transform="translate(145, 120)">
        <polygon points="-8,0 -6,18 6,18 8,0" fill="#b08968" opacity="0.8" stroke="#7f5539" strokeWidth="1.2" />
        <ellipse cx="0" cy="0" rx="8" ry="3" fill="#ddb892" />
        <path d="M0,-2 Q-4,-12 0,-18" stroke="#a45a6a" strokeWidth="1" fill="none" />
      </g>
      <g transform="translate(170, 122)">
        <polygon points="-8,0 -6,18 6,18 8,0" fill="#b08968" opacity="0.8" stroke="#7f5539" strokeWidth="1.2" />
        <ellipse cx="0" cy="0" rx="8" ry="3" fill="#ddb892" />
        <path d="M0,-2 Q4,-12 0,-18" stroke="#a45a6a" strokeWidth="1" fill="none" />
      </g>

      {/* Mohini pointing finger while lecturing */}
      <g transform="translate(210, 85)">
        <circle cx="0" cy="0" r="22" fill="#f3d1b3" />
        <circle cx="-6" cy="-2" r="6" fill="none" stroke="#6b2d3e" strokeWidth="1.6" />
        <circle cx="6" cy="-2" r="6" fill="none" stroke="#6b2d3e" strokeWidth="1.6" />
        <line x1="-1" y1="-2" x2="1" y2="-2" stroke="#6b2d3e" strokeWidth="1.6" />
        <path d="M-4,8 Q0,5 4,8" stroke="#6b2d3e" strokeWidth="1.5" fill="none" />
        {/* Cute pointing index finger */}
        <text x="-32" y="10" fontSize="18">☝️</text>
      </g>

      {/* Speech banner */}
      <rect x="25" y="24" width="230" height="36" rx="4" fill="#6b2d3e" />
      <text x="140" y="40" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="11" fill="#fff" fontWeight="bold">
        "CHAI BREAK: STRICTLY 5 MINUTES"
      </text>
      <text x="140" y="53" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="12" fill="#ffdda6">
        (Actual duration: 2 hours and 45 minutes)
      </text>
    </svg>
  )
}

// ─── NEW ARTWORK 2: Friendship Journey & Road Ahead ───
export function TimelineJourneyArt({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 280 180"
      className={className}
      style={{ width: '100%', height: '100%', display: 'block', borderRadius: 4, ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="280" height="180" fill="#f9f5ed" />

      {/* Curving dashed road of friendship */}
      <path d="M20,130 Q90,70 140,110 T260,60" fill="none" stroke="#9b8aa8" strokeWidth="2.5" strokeDasharray="5 4" />

      {/* Milestone 1 */}
      <g transform="translate(35, 130)">
        <circle cx="0" cy="0" r="14" fill="#6b2d3e" />
        <text x="0" y="4" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">1</text>
        <text x="0" y="26" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="11" fill="#4a3f30">IRF Day 1</text>
      </g>

      {/* Milestone 2 */}
      <g transform="translate(135, 110)">
        <circle cx="0" cy="0" r="14" fill="#a45a6a" />
        <text x="0" y="4" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">2</text>
        <text x="0" y="26" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="11" fill="#4a3f30">Inside Jokes</text>
      </g>

      {/* Milestone 3 */}
      <g transform="translate(245, 60)">
        <circle cx="0" cy="0" r="16" fill="#d4af37" />
        <text x="0" y="5" textAnchor="middle" fontSize="14">🌟</text>
        <text x="0" y="28" textAnchor="middle" fontFamily="'Caveat', cursive" fontSize="11" fill="#6b2d3e" fontWeight="bold">Forever</text>
      </g>

      {/* Cute yellow camper van / roadtrip car */}
      <g transform="translate(180, 80)">
        <rect x="-16" y="-10" width="32" height="18" rx="4" fill="#e9c46a" stroke="#2c221e" strokeWidth="1.2" />
        <circle cx="-9" cy="8" r="5" fill="#2c221e" />
        <circle cx="9" cy="8" r="5" fill="#2c221e" />
        <rect x="-12" y="-7" width="10" height="7" fill="#caf0f8" />
        <rect x="2" y="-7" width="10" height="7" fill="#caf0f8" />
        <text x="0" y="-14" textAnchor="middle" fontSize="12">🎒</text>
      </g>

      <text x="140" y="22" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="12" fill="#6b2d3e" fontWeight="bold">
        THE IRF ROADTRIP & ROAD AHEAD
      </text>
    </svg>
  )
}

// Realistic 3D Burgundy & Gold Wax Seal Stamp
export function WaxSealArt({ size = 56, text = 'M', style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ display: 'inline-block', verticalAlign: 'middle', filter: 'drop-shadow(0 3px 6px rgba(40,15,20,0.35))', ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="waxGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#9a3b50" />
          <stop offset="45%" stopColor="#752438" />
          <stop offset="85%" stopColor="#501725" />
          <stop offset="100%" stopColor="#380d17" />
        </radialGradient>
        <radialGradient id="innerRimGrad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#87293e" />
          <stop offset="80%" stopColor="#501725" />
          <stop offset="100%" stopColor="#300a13" />
        </radialGradient>
      </defs>

      {/* Melted organic wax edge */}
      <path
        d="M50,4 C63,3 74,8 84,16 C93,24 97,36 96,49 C95,62 89,75 80,84 C70,93 58,97 46,96 C32,95 21,89 13,80 C5,70 3,57 4,45 C5,31 12,19 22,11 C31,4 40,5 50,4 Z"
        fill="url(#waxGrad)"
      />
      {/* Outer raised lip */}
      <circle cx="50" cy="50" r="38" fill="none" stroke="#a4445b" strokeWidth="2.5" opacity="0.6" />
      <circle cx="50" cy="50" r="37" fill="url(#innerRimGrad)" />

      {/* Beaded rim */}
      <circle cx="50" cy="50" r="32" fill="none" stroke="#d4af37" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.85" />

      {/* Embossed initial / monogram */}
      <text
        x="50"
        y="60"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="34"
        fontWeight="900"
        fill="#f3e2be"
        style={{
          filter: 'drop-shadow(1px 2px 1px rgba(30,5,10,0.8))',
          letterSpacing: '0.02em',
        }}
      >
        {text}
      </text>

      {/* Little crown / star accent above letter */}
      <circle cx="50" cy="27" r="2.5" fill="#d4af37" opacity="0.9" />
      <circle cx="43" cy="29" r="1.8" fill="#d4af37" opacity="0.75" />
      <circle cx="57" cy="29" r="1.8" fill="#d4af37" opacity="0.75" />

      {/* Delicate shine highlight on top curve */}
      <path
        d="M26,30 C32,20 44,16 58,16"
        fill="none"
        stroke="#ffccd5"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  )
}

