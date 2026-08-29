import { motion } from 'framer-motion'
import { whyChooseUs } from '../data/services'

export function WhyChooseUs() {
  return (
    <section className="bg-charcoal text-cream py-24 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" style={{ filter: 'invert(1)' }} />

      <div className="container-architectural relative">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-10 mb-16 md:mb-20">
          <div className="col-span-12 md:col-span-5 flex flex-col gap-5">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="label-dark flex items-center gap-3"
            >
              <span className="block w-8 h-px bg-current opacity-60" />
              Why Style Structure?
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="heading-display text-cream text-4xl md:text-5xl lg:text-[56px] type-editorial max-w-[20ch]"
            >
              Design as a way of thinking.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col gap-5"
          >
            <p className="text-cream/75 text-base md:text-lg leading-relaxed">
              We approach every project with the same intent: to understand the brief, the site and the people who will use the space — and to translate that into architecture and interiors that feel resolved, calm and considered.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-cream/15">
          {whyChooseUs.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="border-b lg:border-b-0 lg:border-r border-cream/15 last:border-r-0 p-8 lg:p-10 min-h-[220px] flex flex-col justify-between group hover:bg-cream/5 transition-colors duration-500"
            >
              <span className="label-dark">{String(idx + 1).padStart(2, '0')}</span>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-cream text-xl md:text-[22px] tracking-tight">
                  {item.title}
                </h3>
                <p className="text-cream/65 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
