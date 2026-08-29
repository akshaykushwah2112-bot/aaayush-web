import { motion } from 'framer-motion'
import { studio } from '../utils/config'

export function Introduction() {
  return (
    <section className="relative bg-cream py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-50 pointer-events-none" />

      <div className="container-architectural relative">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-10">
          <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="label-meta flex items-center gap-3"
            >
              <span className="block w-8 h-px bg-current opacity-60" />
              {studio.name}
            </motion.span>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden md:flex flex-col gap-1 text-[10px] uppercase tracking-architectural text-muted"
            >
              <span>— Introduction</span>
              <span className="opacity-60">001 / 008</span>
            </motion.div>
          </div>

          <div className="col-span-12 md:col-span-9 flex flex-col gap-10">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="heading-display text-charcoal text-3xl sm:text-4xl md:text-5xl lg:text-[56px] type-editorial max-w-[24ch]"
            >
              Architecture that balances <span className="italic font-serif font-normal">function,</span> <span className="italic font-serif font-normal">form</span> and everyday life.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="md:col-span-7 text-muted text-base md:text-lg leading-relaxed"
              >
                Style Structure Studio is an architecture and interior design studio focused on creating functional, aesthetic and thoughtfully planned spaces — from architectural planning and elevations to detailed interior design and visualisation.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="md:col-span-5 flex flex-col gap-3 text-sm text-muted"
              >
                <div className="flex justify-between border-b border-charcoal/15 pb-3">
                  <span className="label-meta">Practice</span>
                  <span>Architecture · Interior</span>
                </div>
                <div className="flex justify-between border-b border-charcoal/15 pb-3">
                  <span className="label-meta">Location</span>
                  <span>Indore, India</span>
                </div>
                <div className="flex justify-between border-b border-charcoal/15 pb-3">
                  <span className="label-meta">Scope</span>
                  <span>Residential · Commercial</span>
                </div>
                <div className="flex justify-between border-b border-charcoal/15 pb-3">
                  <span className="label-meta">Deliverables</span>
                  <span>Design · Drawings · 3D</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Introduction
