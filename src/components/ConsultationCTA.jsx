import { motion } from 'framer-motion'
import { ArrowUpRight, Phone, MessageCircle } from 'lucide-react'
import { studio, whatsappLink, callLink } from '../utils/config'

export function ConsultationCTA({
  eyebrow = 'Consultation',
  title = 'Have a space in mind?',
  description = "Let's discuss your requirements and explore the right design approach for your project.",
  dark = false,
}) {
  const bg = dark ? 'bg-charcoal text-cream' : 'bg-cream text-charcoal'
  const borderCol = dark ? 'border-cream/15' : 'border-charcoal/15'
  const bodyCol = dark ? 'text-cream/70' : 'text-muted'
  const eyebrowCol = dark ? 'text-cream/60' : 'text-muted'

  return (
    <section className={`${bg} py-24 md:py-36 relative overflow-hidden`}>
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" style={dark ? { filter: 'invert(1)' } : {}} />
      <div className="container-architectural relative">
        <div className="grid grid-cols-12 gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="col-span-12 md:col-span-8 flex flex-col gap-6"
          >
            <span className={`label-meta ${eyebrowCol} flex items-center gap-3`}>
              <span className="block w-8 h-px bg-current opacity-60" />
              {eyebrow}
            </span>
            <h2 className="heading-display text-4xl md:text-5xl lg:text-6xl type-editorial max-w-[18ch]">
              {title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="col-span-12 md:col-span-4 flex flex-col gap-5"
          >
            <p className={`body-editorial ${bodyCol} text-base md:text-lg leading-relaxed`}>
              {description}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/book-appointment"
                className={`inline-flex items-center gap-3 px-6 py-3 text-xs uppercase tracking-wider transition-all duration-500 group ${
                  dark
                    ? 'bg-cream text-charcoal hover:bg-sand'
                    : 'bg-charcoal text-cream hover:bg-ink'
                }`}
              >
                Book a Consultation
                <ArrowUpRight size={14} />
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-3 px-6 py-3 text-xs uppercase tracking-wider border transition-all duration-500 group ${
                  dark
                    ? 'border-cream/30 text-cream hover:bg-cream hover:text-charcoal'
                    : 'border-charcoal text-charcoal hover:bg-charcoal hover:text-cream'
                }`}
              >
                <MessageCircle size={14} />
                WhatsApp Us
              </a>
              <a
                href={callLink()}
                className={`inline-flex items-center gap-3 px-6 py-3 text-xs uppercase tracking-wider border transition-all duration-500 group ${
                  dark
                    ? 'border-cream/30 text-cream hover:bg-cream hover:text-charcoal'
                    : 'border-charcoal text-charcoal hover:bg-charcoal hover:text-cream'
                }`}
              >
                <Phone size={14} />
                Call Now
              </a>
            </div>
            <div className={`mt-2 pt-4 border-t ${borderCol} flex flex-col gap-1 text-xs uppercase tracking-architectural ${eyebrowCol}`}>
              <span className="opacity-70">Direct line</span>
              <a href={callLink()} className="link-underline w-fit text-current">{studio.contact.phone}</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ConsultationCTA
