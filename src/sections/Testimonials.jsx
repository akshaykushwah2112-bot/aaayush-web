import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { testimonials } from '../data/testimonials'

export function Testimonials() {
  const hasTestimonials = testimonials && testimonials.length > 0

  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="container-architectural">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col gap-5">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="label-meta flex items-center gap-3"
            >
              <span className="block w-8 h-px bg-current opacity-60" />
              Words From Clients
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="heading-display text-charcoal text-4xl md:text-5xl lg:text-[56px] type-editorial max-w-[20ch]"
            >
              Built on relationships.
            </motion.h2>
          </div>
        </div>

        {hasTestimonials ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => (
              <motion.figure
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="bg-sand p-10 flex flex-col gap-6"
              >
                <blockquote className="font-display text-2xl md:text-3xl text-charcoal leading-tight tracking-tight">
                  "{t.quote}"
                </blockquote>
                <figcaption className="flex flex-col gap-1">
                  <span className="text-charcoal text-sm font-medium">{t.name}</span>
                  <span className="text-muted text-xs uppercase tracking-architectural">{t.role} · {t.project}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="border border-charcoal/15 p-10 md:p-16 flex flex-col gap-6"
          >
            <p className="font-display text-2xl md:text-3xl text-charcoal leading-tight tracking-tight max-w-[40ch]">
              We will share client testimonials here as we begin to publish them with permission.
            </p>
            <p className="body-editorial text-muted text-base md:text-lg max-w-[60ch]">
              The studio is currently building a small set of recent residential and commercial projects. Detailed client words will appear here once they are approved for publication.
            </p>
            <Link to="/contact" className="label-meta link-underline w-fit text-charcoal">
              Start your project →
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Testimonials
