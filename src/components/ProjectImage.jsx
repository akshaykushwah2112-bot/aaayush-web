// Architectural placeholder visuals until real images are added.
// Renders a subtle SVG-based composition so the layout feels intentional.

export function ProjectImage({
  category = 'architectural',
  className = '',
  label = '',
  ratio = 'aspect-[4/5]',
}) {
  const palettes = {
    architectural: { bg: '#EAE5DC', stroke: '#171717', accent: '#8C8780' },
    interior: { bg: '#D9D2C5', stroke: '#171717', accent: '#A89F8C' },
    '3d': { bg: '#C9C2B5', stroke: '#0D0D0D', accent: '#66645F' },
  }
  const p = palettes[category] || palettes.architectural

  return (
    <div className={`relative ${ratio} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
        <rect width="800" height="1000" fill={p.bg} />
        {/* Architectural lines */}
        <g stroke={p.stroke} strokeWidth="0.6" fill="none" opacity="0.18">
          <line x1="0" y1="250" x2="800" y2="250" />
          <line x1="0" y1="500" x2="800" y2="500" />
          <line x1="0" y1="750" x2="800" y2="750" />
          <line x1="200" y1="0" x2="200" y2="1000" />
          <line x1="400" y1="0" x2="400" y2="1000" />
          <line x1="600" y1="0" x2="600" y2="1000" />
        </g>
        {/* Soft gradient overlay */}
        <defs>
          <linearGradient id={`grad-${category}-${label}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={p.stroke} stopOpacity="0.06" />
            <stop offset="100%" stopColor={p.stroke} stopOpacity="0.18" />
          </linearGradient>
        </defs>
        <rect width="800" height="1000" fill={`url(#grad-${category}-${label})`} />

        {/* Category-specific composition */}
        {category === 'architectural' && (
          <g stroke={p.stroke} strokeWidth="1" fill="none" opacity="0.55">
            <rect x="180" y="320" width="440" height="500" />
            <rect x="240" y="380" width="120" height="160" />
            <rect x="440" y="380" width="120" height="160" />
            <rect x="240" y="580" width="120" height="120" />
            <rect x="440" y="580" width="120" height="120" />
            <line x1="180" y1="820" x2="620" y2="820" />
          </g>
        )}

        {category === 'interior' && (
          <g stroke={p.stroke} strokeWidth="0.9" fill="none" opacity="0.55">
            <rect x="100" y="200" width="600" height="600" />
            <rect x="100" y="200" width="600" height="200" />
            <line x1="400" y1="200" x2="400" y2="800" />
            <rect x="180" y="500" width="180" height="180" />
            <rect x="440" y="500" width="180" height="180" />
            <circle cx="400" cy="700" r="80" opacity="0.4" />
          </g>
        )}

        {category === '3d' && (
          <g stroke={p.stroke} strokeWidth="0.8" fill="none" opacity="0.6">
            <polygon points="400,180 680,340 680,720 400,880 120,720 120,340" />
            <line x1="400" y1="180" x2="400" y2="880" />
            <line x1="120" y1="340" x2="680" y2="720" />
            <line x1="680" y1="340" x2="120" y2="720" />
          </g>
        )}

        {/* Tiny mark */}
        <g fill={p.stroke} opacity="0.45">
          <rect x="40" y="940" width="40" height="1" />
          <text x="40" y="965" fontSize="10" fontFamily="Inter, sans-serif" letterSpacing="2" fill={p.stroke} opacity="0.7">
            {label || category.toUpperCase()}
          </text>
        </g>
      </svg>
    </div>
  )
}

export default ProjectImage
