import { Link } from 'react-router-dom'
import { studio } from '../utils/config'

// Architectural geometric mark used beside the studio wordmark.
export function LogoMark({ className = 'w-8 h-8' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <rect x="0.5" y="0.5" width="31" height="31" stroke="currentColor" strokeWidth="1" />
      <path d="M7 25 L16 7 L25 25" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
      <path d="M11 21 L21 21" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
    </svg>
  )
}

export function Logo({ variant = 'dark', className = '' }) {
  return (
    <Link to="/" aria-label={`${studio.name} — Home`} className={`block group ${className}`}>
      <img
        src="/logo.svg"
        alt={studio.name}
        className="w-24 md:w-32 h-16 md:h-20 object-contain object-left transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </Link>
  )
}

export default Logo
