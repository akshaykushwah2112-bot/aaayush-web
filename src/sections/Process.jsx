import { motion } from 'framer-motion'
import { processSteps } from '../data/services'

export function Process() {
  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="container-architectural">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="flex flex-col gap-5">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="label-meta flex items-center gap-3"
            >
              <span className="block w-8 h-px bg-current opacity-60" />
              Our Process
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="heading-display text-charcoal text-4xl md:text-5xl lg:text-[56px] type-editorial max-w-[18ch]"
            >
              From brief to built form.
            </motion.h2>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop horizontal line */}
          <div className="hidden lg:block absolute top-9 left-0 right-0 h-px bg-charcoal/15" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-12 lg:gap-x-6">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="relative"
              >
                {/* Vertical line on mobile / dot on desktop */}
                <div className="flex lg:block items-start gap-5">
                  <div className="relative shrink-0 lg:mb-8">
                    {/* Mobile line */}
                    <div className="lg:hidden absolute left-4 top-12 bottom-0 w-px bg-charcoal/15" />
                    <div className="w-9 h-9 rounded-full border border-charcoal/30 bg-cream flex items-center justify-center text-charcoal text-xs font-medium">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 pt-1 lg:pt-0">
                    <h3 className="font-display text-charcoal text-2xl md:text-[26px] tracking-tight uppercase">
                      {step.title}
                    </h3>
                    <p className="body-editorial text-muted text-sm md:text-base leading-relaxed max-w-[26ch]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process
