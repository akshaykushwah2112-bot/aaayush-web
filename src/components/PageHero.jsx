import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { studio } from '../utils/config'

// Page hero - consistent across inner pages
export function PageHero({ eyebrow, title, description, meta }) {
  return (
    <section className="relative bg-cream pt-32 md:pt-44 pb-16 md:pb-24 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-overlay opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-charcoal/15" />

      <div className="container-architectural relative">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="col-span-12 md:col-span-8 flex flex-col gap-6">
            {eyebrow && (
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="label-meta flex items-center gap-3"
              >
                <span className="block w-8 h-px bg-current opacity-60" />
                {eyebrow}
              </motion.span>
            )}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="heading-display text-charcoal text-5xl md:text-6xl lg:text-7xl xl:text-[80px] type-editorial max-w-[20ch]"
            >
              {title}
            </motion.h1>
          </div>

          {description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="col-span-12 md:col-span-4 flex flex-col gap-4"
            >
              <p className="body-editorial text-base md:text-lg">{description}</p>
              <Link
                to="/contact"
                className="text-charcoal label-meta link-underline w-fit"
              >
                Start a project →
              </Link>
            </motion.div>
          )}
        </div>

        {meta && (
          <div className="mt-12 md:mt-20 pt-6 border-t border-charcoal/15 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6 text-xs uppercase tracking-architectural text-muted">
            {meta.map((m, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="opacity-60">{m.label}</span>
                <span className="text-charcoal">{m.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default PageHero
