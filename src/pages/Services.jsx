import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import ProjectImage from '../components/ProjectImage'
import ConsultationCTA from '../components/ConsultationCTA'

const serviceOptions = [
  {
    title: 'Architecture',
    description: 'Plans, elevations and structural thinking shaped around how your building should work and feel.',
    path: '/architecture',
    category: 'architectural',
    photos: [1, 2, 3, 4, 5].map((number) => `/projects/architecture/architecture-${number}.jpeg`),
  },
  {
    title: 'Interior',
    description: 'Material, lighting and furniture decisions brought together into interiors made for everyday life.',
    path: '/interior',
    category: 'interior',
    photos: [1, 2, 3, 4, 5].map((number) => `/projects/interoir/interior- (${number}).jpeg`),
  },
]

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Two disciplines. One considered approach."
        description="Choose a design direction to explore our architecture and interior services."
      />

      <section className="bg-cream py-20 md:py-32">
        <div className="container-architectural">
          <div className="grid grid-cols-12 gap-8 md:gap-12">
            {serviceOptions.map((service, serviceIndex) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: serviceIndex * 0.1 }}
                className="col-span-12 md:col-span-6"
              >
                <Link to={service.path} className="group block">
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {service.photos.map((photo, photoIndex) => (
                      <div key={photo} className="relative aspect-[4/5] overflow-hidden image-editorial">
                        <img
                          src={photo}
                          alt={`${service.title} project photo ${photoIndex + 1}`}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-start justify-between gap-5 border-t border-charcoal/15 pt-5">
                    <div className="flex flex-col gap-3">
                      <span className="label-meta">0{serviceIndex + 1} / Service</span>
                      <h2 className="heading-display text-charcoal text-3xl md:text-4xl tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                        {service.title}
                      </h2>
                      <p className="body-editorial max-w-[38ch]">{service.description}</p>
                    </div>
                    <ArrowUpRight size={22} className="mt-1 text-muted opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA dark />
    </>
  )
}
