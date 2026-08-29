import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Premium button — arrow shifts to ↗ on hover
export function ArrowButton({
  to,
  href,
  onClick,
  children,
  variant = 'dark',
  size = 'md',
  className = '',
  type = 'button',
  showArrow = true,
  external = false,
  ariaLabel,
}) {
  const base =
    'inline-flex items-center gap-3 font-medium uppercase tracking-wider transition-all duration-500 group select-none'
  const sizes = {
    sm: 'text-[11px] py-2.5',
    md: 'text-xs py-3',
    lg: 'text-sm py-4',
  }
  const variants = {
    dark:
      'bg-charcoal text-cream hover:bg-ink border border-charcoal',
    light:
      'bg-cream text-charcoal hover:bg-sand border border-charcoal',
    outline:
      'bg-transparent text-charcoal hover:bg-charcoal hover:text-cream border border-charcoal',
    outlineLight:
      'bg-transparent text-cream hover:bg-cream hover:text-charcoal border border-cream/40',
    ghost:
      'bg-transparent text-charcoal hover:text-ink border-b border-charcoal px-0 py-2 rounded-none',
  }
  const cls = `${base} ${sizes[size]} ${variants[variant]} px-6 ${className}`

  const content = (
    <motion.span
      whileHover={{ x: 0 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="flex items-center gap-3"
    >
      <span>{children}</span>
      {showArrow && (
        <span className="relative w-5 h-5 inline-flex items-center justify-center overflow-hidden">
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:-translate-x-1 group-hover:opacity-0">
            →
          </span>
          <span className="absolute inset-0 flex items-center justify-center translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
            ↗
          </span>
        </span>
      )}
    </motion.span>
  )

  if (to) {
    return (
      <Link to={to} className={cls} aria-label={ariaLabel}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel}>
      {content}
    </button>
  )
}

export default ArrowButton
