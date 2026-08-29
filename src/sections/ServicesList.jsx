import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../data/services'

export function ServicesList() {
  return (
    <section className="bg-sand py-24 md:py-36">
      <div className="container-architectural">
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-10 mb-12 md:mb-20">
          <div className="col-span-12 md:col-span-3 flex flex-col gap-5">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="label-meta flex items-center gap-3"
            >
              <span className="block w-8 h-px bg-current opacity-60" />
              What We Do
            </motion.span>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[10px] uppercase tracking-architectural text-muted hidden md:block"
            >
              — 16 Services
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="col-span-12 md:col-span-9 flex flex-col gap-6"
          >
            <h2 className="heading-display text-charcoal text-4xl md:text-5xl lg:text-[56px] type-editorial max-w-[22ch]">
              A complete studio for architecture, interiors and visualisation.
            </h2>
            <p className="body-editorial text-muted text-base md:text-lg max-w-[60ch]">
              We work across the full design process — from planning layouts and building elevations to detailed interior design and 3D visualisation.
            </p>
          </motion.div>
        </div>

        {/* Service list */}
        <div className="border-t border-charcoal/15">
          {services.map((service, idx) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: Math.min(idx * 0.03, 0.3) }}
              className="group relative border-b border-charcoal/15"
            >
              <div className="grid grid-cols-12 items-center gap-4 py-6 md:py-8 transition-all duration-500 group-hover:pl-4 md:group-hover:pl-6 cursor-default">
                <span className="col-span-2 md:col-span-1 label-meta text-muted">{service.number}</span>
                <h3 className="col-span-10 md:col-span-4 font-display text-charcoal text-xl md:text-2xl lg:text-[28px] tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                  {service.title}
                </h3>
                <p className="col-span-12 md:col-span-5 text-muted text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>
                <div className="col-span-12 md:col-span-2 flex md:justify-end">
                  <span className="w-10 h-10 rounded-full border border-charcoal/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:bg-charcoal group-hover:text-cream group-hover:border-charcoal">
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 px-7 py-3.5 bg-charcoal text-cream text-xs uppercase tracking-wider hover:bg-ink transition-colors group"
          >
            Explore All Services
            <span className="relative w-5 h-5 inline-flex items-center justify-center overflow-hidden">
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:-translate-x-1 group-hover:opacity-0">→</span>
              <span className="absolute inset-0 flex items-center justify-center translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">↗</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ServicesList
