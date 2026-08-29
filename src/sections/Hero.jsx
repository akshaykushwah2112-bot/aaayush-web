import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import ArrowButton from '../components/ArrowButton'
import { whatsappLink } from '../utils/config'
import { studio } from '../utils/config'

export function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative bg-cream pt-24 md:pt-28 overflow-hidden">
      {/* Meta top bar */}
      <div className="container-architectural">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="hidden md:flex items-center justify-between py-4 border-b border-charcoal/15 text-[10px] uppercase tracking-architectural text-muted"
        >
          <div className="flex items-center gap-6">
            <span>{studio.location.city}, {studio.location.state}</span>
            <span className="opacity-50">/</span>
            <span>{studio.descriptor}</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Er. Aayush Kushwah</span>
            <span className="opacity-50">/</span>
            <span>EST. {studio.name.split(' ').join(' ')}</span>
          </div>
        </motion.div>
      </div>

      {/* Headline + Image */}
      <div className="container-architectural pt-10 md:pt-16">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="col-span-12 lg:col-span-10 flex flex-col gap-4 md:gap-5"
          >
            <span className="label-meta flex items-center gap-3">
              <span className="block w-8 h-px bg-current opacity-60" />
              Architecture · Interior · Structure
            </span>
            <div className="w-fit border-b border-charcoal/25 pb-3 mb-3">
              <p className="font-display text-charcoal text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight tracking-[0.12em] uppercase">
                Style Structure Studio
              </p>
              <p className="text-muted text-[10px] uppercase tracking-architectural mt-2">
                Er. Aayush Kushwah
              </p>
            </div>
            <h1 className="heading-display text-charcoal text-[44px] sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[104px] leading-[0.95] tracking-tight type-editorial">
              Spaces
              <br />
              <span className="italic font-serif font-normal text-charcoal/85">Designed</span>
              <br />
              With Purpose.
            </h1>
            <p className="body-editorial max-w-[48ch] text-base md:text-lg pt-4">
              Architecture and interiors thoughtfully planned around how people live, work and experience space.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <ArrowButton to="/portfolio" variant="dark" size="md">
                View My Work
              </ArrowButton>
              <ArrowButton to="/book-appointment" variant="outline" size="md">
                Book a Consultation
              </ArrowButton>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll hint + side meta */}
      <div className="container-architectural mt-12 md:mt-20 mb-6 md:mb-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-end justify-between gap-6"
        >
          <div className="flex flex-col gap-2 max-w-md">
            <span className="label-meta">An architecture and interior studio</span>
            <p className="text-muted text-sm md:text-base leading-relaxed">
              Based in Indore, working across residential, commercial and hospitality projects — from architectural planning to detailed interior design.
            </p>
          </div>

          <Link
            to="/about"
            className="hidden md:flex flex-col items-center gap-3 text-muted hover:text-charcoal transition-colors"
            aria-label="Scroll to introduction"
          >
            <span className="label-meta">Scroll</span>
            <span className="animate-scroll-hint">
              <ArrowDown size={18} />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
