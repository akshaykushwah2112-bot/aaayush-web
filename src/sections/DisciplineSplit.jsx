import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import ProjectImage from '../components/ProjectImage'

const disciplines = [
  {
    eyebrow: 'Discipline — 01',
    title: 'Architecture',
    body: 'From residential planning and house plans to elevations, working drawings and structural design.',
    cta: 'Explore Architecture',
    href: '/architecture',
    imageCategory: 'architectural',
  },
  {
    eyebrow: 'Discipline — 02',
    title: 'Interior Design',
    body: 'Thoughtfully designed interiors covering kitchens, bedrooms, living spaces, wardrobes, TV units and false ceilings.',
    cta: 'Explore Interiors',
    href: '/interior',
    imageCategory: 'interior',
  },
]

export function DisciplineSplit() {
  return (
    <section className="bg-cream py-12 md:py-20">
      <div className="container-architectural">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {disciplines.map((d, idx) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="group flex flex-col gap-6"
            >
              <div className="image-editorial aspect-[4/5] md:aspect-[5/6] relative">
                <ProjectImage
                  category={d.imageCategory}
                  ratio="absolute inset-0 w-full h-full"
                  label={d.title.toUpperCase()}
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-charcoal/10 pointer-events-none" />
                {/* Number badge */}
                <div className="absolute top-4 left-4 bg-cream/95 backdrop-blur px-3 py-1.5 label-meta">
                  0{idx + 1}
                </div>
              </div>

              <div className="flex flex-col gap-4 px-1">
                <span className="label-meta">{d.eyebrow}</span>
                <h3 className="heading-display text-charcoal text-3xl md:text-4xl lg:text-5xl tracking-tight transition-transform duration-500 group-hover:translate-x-1">
                  {d.title}
                </h3>
                <p className="body-editorial text-muted text-base md:text-lg max-w-[40ch] leading-relaxed">
                  {d.body}
                </p>
                <Link
                  to={d.href}
                  className="mt-2 inline-flex items-center gap-3 text-charcoal label-meta link-underline w-fit"
                >
                  {d.cta}
                  <span className="relative w-4 h-4 inline-flex items-center justify-center overflow-hidden">
                    <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DisciplineSplit
