import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import ArrowButton from '../components/ArrowButton'
import ConsultationCTA from '../components/ConsultationCTA'
import ProjectImage from '../components/ProjectImage'
import { featuredProjects } from '../data/projects'
import { processSteps } from '../data/services'

const archServices = [
  { title: 'Architectural Design', body: 'Complete architectural design from concept to construction-ready documentation.' },
  { title: 'Residential Planning', body: 'Layouts that balance function, light, circulation and lifestyle requirements.' },
  { title: 'House Plans', body: 'Detailed house plans with room layouts, dimensions and spatial organisation.' },
  { title: '2D Working Drawings', body: 'Construction-ready plans, sections and details for site execution.' },
  { title: 'Building Elevation', body: 'Elevations that communicate character, proportion and material expression.' },
  { title: 'Structural Design', body: 'Structural design coordinated with the architecture from day one.' },
  { title: '3D Visualization', body: 'Photorealistic renders and walkthroughs to experience the design before build.' },
]

export default function Architecture() {
  const archProjects = featuredProjects.filter((p) =>
    ['Residential Architecture', 'Elevation', 'Commercial', '3D Visualization'].includes(p.category)
  ).slice(0, 4)

  return (
    <>
      <PageHero
        eyebrow="Architecture"
        title={<>Designing buildings, <span className="italic font-serif font-normal">not just</span> drawings.</>}
        description="Architecture is the foundation of our work. We develop plans, sections, elevations and structural decisions that respond to site, brief and use."
        meta={[
          { label: 'Discipline', value: 'Architecture' },
          { label: 'Studio', value: 'Indore, India' },
          { label: 'Sectors', value: 'Residential · Commercial' },
          { label: 'Deliverables', value: 'Plans · Sections · 3D' },
        ]}
      />

      {/* Intro split */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-architectural">
          <div className="grid grid-cols-12 gap-y-12 md:gap-x-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="col-span-12 md:col-span-7 image-editorial aspect-[4/3]"
            >
              <ProjectImage category="architectural" ratio="absolute inset-0 w-full h-full" label="ARCHITECTURE" />
              <div className="absolute inset-0 ring-1 ring-inset ring-charcoal/10 pointer-events-none" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="col-span-12 md:col-span-5 flex flex-col gap-6 md:pt-12"
            >
              <span className="label-meta">— Section 01</span>
              <h2 className="heading-display text-charcoal text-3xl md:text-4xl lg:text-5xl type-editorial">
                From planning layouts to building elevations.
              </h2>
              <p className="body-editorial text-muted text-base md:text-lg leading-relaxed">
                Our architectural work spans the full process: from early planning layouts and house plans to building elevations, working drawings and structural design. Each step is developed as part of a single, coordinated package.
              </p>
              <ArrowButton to="/contact" variant="outline" size="md">
                Discuss a Project
              </ArrowButton>
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
                What we design
              </span>
              <h2 className="heading-display text-charcoal text-4xl md:text-5xl lg:text-[56px] type-editorial max-w-[18ch]">
                The architecture scope.
              </h2>
            </div>
          </div>

          <div className="border-t border-charcoal/15">
            {archServices.map((s, idx) => (
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

      {/* Process */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-architectural">
          <div className="flex flex-col gap-5 mb-12">
            <span className="label-meta flex items-center gap-3">
              <span className="block w-8 h-px bg-current opacity-60" />
              How we work
            </span>
            <h2 className="heading-display text-charcoal text-4xl md:text-5xl lg:text-[56px] type-editorial max-w-[20ch]">
              A process that protects the design.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 border-t border-charcoal/15">
            {processSteps.map((step, idx) => (
              <div key={step.number} className="border-b md:border-b-0 md:border-r border-charcoal/15 last:border-r-0 p-8 flex flex-col gap-3">
                <span className="label-meta text-muted">{step.number}</span>
                <h3 className="font-display text-charcoal text-xl tracking-tight uppercase">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{step.description}</p>
              </div>
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
                Architecture projects.
              </h2>
            </div>
            <Link to="/portfolio" className="label-meta link-underline text-charcoal w-fit">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-10">
            {archProjects.map((p, idx) => (
              <Link
                key={p.id}
                to={`/portfolio/${p.id}`}
                className={`group col-span-12 ${idx % 3 === 0 ? 'md:col-span-7' : 'md:col-span-5'} ${idx === 1 ? 'md:mt-16' : ''}`}
              >
                <div className="image-editorial aspect-[5/6] relative">
                  <ProjectImage category={p.accent || 'architectural'} ratio="absolute inset-0 w-full h-full" label={p.title.toUpperCase()} />
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

      <ConsultationCTA dark />
    </>
  )
}
