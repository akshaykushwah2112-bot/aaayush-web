import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import ArrowButton from '../components/ArrowButton'
import ConsultationCTA from '../components/ConsultationCTA'
import ProjectImage from '../components/ProjectImage'
import { featuredProjects } from '../data/projects'

const interiorServices = [
  { title: 'Interior Design', body: 'Holistic interior design connecting architecture, furniture, materials and lighting.' },
  { title: 'Modular Kitchen Design', body: 'Functional modular kitchens with efficient storage and refined finishes.' },
  { title: 'Bedroom & Living Room Design', body: 'Calm, well-proportioned rooms designed for everyday comfort.' },
  { title: 'Wardrobe Design', body: 'Bespoke wardrobes with considered internal configurations.' },
  { title: 'TV Unit Design', body: 'Custom TV units and media walls with clean detailing.' },
  { title: 'False Ceiling Design', body: 'Layered ceilings with lighting integration and material play.' },
  { title: 'Commercial Interiors', body: 'Workspace interiors balancing brand, function and user experience.' },
  { title: 'Hospitality Design', body: 'Hospitality interiors shaping guest experience and atmosphere.' },
]

export default function Interior() {
  const interiorProjects = featuredProjects.filter((p) =>
    ['Residential Interiors', 'Kitchen', 'Bedroom', 'Living Room', 'Hospitality'].includes(p.category)
  ).slice(0, 4)

  return (
    <>
      <PageHero
        eyebrow="Interior Design"
        title={<>Interiors developed <span className="italic font-serif font-normal">with</span> the architecture.</>}
        description="Interiors are developed as part of the architecture — not as decoration. The result is spaces that read as one continuous design."
        meta={[
          { label: 'Discipline', value: 'Interior Design' },
          { label: 'Studio', value: 'Indore, India' },
          { label: 'Sectors', value: 'Residential · Commercial' },
          { label: 'Focus', value: 'Function · Material · Light' },
        ]}
      />

      {/* Intro */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-architectural">
          <div className="grid grid-cols-12 gap-y-12 md:gap-x-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1 col-span-12 md:col-span-5 flex flex-col gap-6 md:pt-12"
            >
              <span className="label-meta">— Section 01</span>
              <h2 className="heading-display text-charcoal text-3xl md:text-4xl lg:text-5xl type-editorial">
                Considered interiors for everyday life.
              </h2>
              <p className="body-editorial text-muted text-base md:text-lg leading-relaxed">
                Our interior design work covers kitchens, bedrooms, living spaces, wardrobes, TV units and false ceilings — developed around how the space will actually be used, not just how it photographs.
              </p>
              <ArrowButton to="/contact" variant="outline" size="md">
                Discuss a Project
              </ArrowButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="order-1 md:order-2 col-span-12 md:col-span-7 image-editorial aspect-[4/3]"
            >
              <ProjectImage category="interior" ratio="absolute inset-0 w-full h-full" label="INTERIOR" />
              <div className="absolute inset-0 ring-1 ring-inset ring-charcoal/10 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-sand py-24 md:py-32">
        <div className="container-architectural">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="flex flex-col gap-5">
              <span className="label-meta flex items-center gap-3">
                <span className="block w-8 h-px bg-current opacity-60" />
                Interior scope
              </span>
              <h2 className="heading-display text-charcoal text-4xl md:text-5xl lg:text-[56px] type-editorial max-w-[18ch]">
                The interior design range.
              </h2>
            </div>
          </div>

          <div className="border-t border-charcoal/15">
            {interiorServices.map((s, idx) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.04, 0.3) }}
                className="group border-b border-charcoal/15"
              >
                <div className="grid grid-cols-12 gap-4 items-center py-7 transition-all duration-500 group-hover:pl-4">
                  <span className="col-span-2 md:col-span-1 label-meta text-muted">{String(idx + 1).padStart(2, '0')}</span>
                  <h3 className="col-span-10 md:col-span-5 font-display text-charcoal text-xl md:text-2xl tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                    {s.title}
                  </h3>
                  <p className="col-span-12 md:col-span-5 text-muted text-sm md:text-base leading-relaxed">{s.body}</p>
                  <div className="hidden md:flex col-span-1 justify-end">
                    <span className="w-10 h-10 rounded-full border border-charcoal/30 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-charcoal group-hover:text-cream group-hover:border-charcoal transition-all duration-500">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-architectural">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="flex flex-col gap-5">
              <span className="label-meta flex items-center gap-3">
                <span className="block w-8 h-px bg-current opacity-60" />
                Selected Work
              </span>
              <h2 className="heading-display text-charcoal text-4xl md:text-5xl lg:text-[56px] type-editorial max-w-[18ch]">
                Interior projects.
              </h2>
            </div>
            <Link to="/portfolio" className="label-meta link-underline text-charcoal w-fit">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-10">
            {interiorProjects.map((p, idx) => (
              <Link
                key={p.id}
                to={`/portfolio/${p.id}`}
                className={`group col-span-12 ${idx % 3 === 0 ? 'md:col-span-5' : 'md:col-span-7'} ${idx === 1 ? 'md:mt-16' : ''}`}
              >
                <div className="image-editorial aspect-[5/6] relative">
                  <ProjectImage category={p.accent || 'interior'} ratio="absolute inset-0 w-full h-full" label={p.title.toUpperCase()} />
                  <div className="absolute inset-0 ring-1 ring-inset ring-charcoal/10 pointer-events-none" />
                </div>
                <div className="flex items-start justify-between pt-5">
                  <div className="flex flex-col gap-1">
                    <span className="label-meta">{p.category}</span>
                    <h3 className="font-display text-charcoal text-2xl tracking-tight transition-transform duration-500 group-hover:translate-x-1">{p.title}</h3>
                  </div>
                  <ArrowUpRight size={18} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </>
  )
}
