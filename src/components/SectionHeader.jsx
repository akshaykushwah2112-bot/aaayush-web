import { motion } from 'framer-motion'

// Section header used across pages for consistent editorial typography
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  dark = false,
  className = '',
}) {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  const titleColor = dark ? 'text-cream' : 'text-charcoal'
  const eyebrowColor = dark ? 'text-cream/60' : 'text-muted'
  const descColor = dark ? 'text-cream/70' : 'text-muted'

  return (
    <div className={`flex flex-col gap-5 ${alignCls} ${className}`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className={`label-meta ${eyebrowColor} flex items-center gap-3`}
        >
          <span className="block w-8 h-px bg-current opacity-60" />
          {eyebrow}
        </motion.span>
      )}
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className={`heading-display ${titleColor} text-4xl md:text-5xl lg:text-[56px] max-w-[18ch] type-editorial`}
        >
          {title}
        </motion.h2>
      )}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className={`body-editorial ${descColor} text-base md:text-lg max-w-[60ch] leading-relaxed`}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}

export default SectionHeader
