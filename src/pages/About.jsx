import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import ArrowButton from '../components/ArrowButton'
import ConsultationCTA from '../components/ConsultationCTA'
import { processSteps } from '../data/services'

const philosophy = [
  {
    title: 'Architecture',
    body: 'Architecture is the foundation of every project. We develop plans, sections and elevations that respond to site, brief and use.',
  },
  {
    title: 'Interior Design',
    body: 'Interiors are developed alongside the architecture so that the result reads as one continuous design language.',
  },
  {
    title: 'Planning',
    body: 'Planning decisions are made early — to organise circulation, light, services and structure cleanly.',
  },
  {
    title: 'Visualisation',
    body: '3D visualisation helps clients and the studio test ideas, materials and lighting before construction begins.',
  },
  {
    title: 'Structural Design',
    body: 'Structural thinking informs the architecture from day one, not as an afterthought — so that form and structure align.',
  },
  {
    title: 'Functional + Aesthetic Spaces',
    body: 'The studio is committed to spaces that are both highly functional and quietly beautiful.',
  },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>About <span className="italic font-serif font-normal">Style Structure</span> Studio.</>}
        description="At Style Structure — An Architectural Studio, we turn your vision into reality through complete architecture and interior design expertise under one roof."
        meta={[
          { label: 'Practice', value: 'Architecture · Interior' },
          { label: 'Studio', value: 'Indore, India' },
          { label: 'Disciplines', value: 'Plan · Elevation · 3D' },
          { label: 'Engagement', value: 'Residential · Commercial' },
        ]}
      />

      {/* Introduction */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-architectural">
          <div className="grid grid-cols-12 gap-y-12 md:gap-x-10">
            <div className="col-span-12 md:col-span-5 flex flex-col gap-6">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="label-meta flex items-center gap-3"
              >
                <span className="block w-8 h-px bg-current opacity-60" />
                The Studio
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="heading-display text-charcoal text-4xl md:text-5xl lg:text-[56px] type-editorial"
              >
                Complete design. One studio.
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="col-span-12 md:col-span-7 flex flex-col gap-6"
            >
              <p className="text-charcoal text-lg md:text-xl leading-relaxed">
                At Style Structure — An Architectural Studio, we turn your vision into reality. We bring architecture and interior design expertise together under one roof, so you do not have to deal with multiple vendors.
              </p>
              <p className="body-editorial text-muted text-base md:text-lg leading-relaxed">
                Whether you need structural design for a new home or want to transform an existing space through interior design, our team handles every project end-to-end with detailed planning, precise drawings and on-site coordination.
              </p>
              <p className="body-editorial text-muted text-base md:text-lg leading-relaxed">
                From the first conversation to the final drawing, we keep the process connected, practical and focused on creating a space that works beautifully for you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-architectural">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="flex flex-col gap-5">
              <span className="label-meta flex items-center gap-3">
                <span className="block w-8 h-px bg-current opacity-60" />
                Design Philosophy
              </span>
              <h2 className="heading-display text-charcoal text-4xl md:text-5xl lg:text-[56px] type-editorial max-w-[18ch]">
                Our approach to every project.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-charcoal/15">
            {philosophy.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="border-b lg:border-b-0 lg:border-r border-charcoal/15 last:border-r-0 p-8 lg:p-10 min-h-[260px] flex flex-col justify-between group hover:bg-sand transition-colors duration-500"
              >
                <span className="label-meta text-muted">{String(idx + 1).padStart(2, '0')}</span>
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-charcoal text-2xl tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Belief and process */}
      <section className="bg-charcoal text-cream py-24 md:py-36">
        <div className="container-architectural">
          <div className="grid grid-cols-12 gap-y-10 md:gap-x-10 mb-16">
            <div className="col-span-12 md:col-span-5 flex flex-col gap-5">
              <span className="label-dark flex items-center gap-3">
                <span className="block w-8 h-px bg-current opacity-60" />
                Approach
              </span>
              <h2 className="heading-display text-cream text-4xl md:text-5xl lg:text-[56px] type-editorial max-w-[20ch]">
                Designed around your vision.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col gap-4 text-cream/75 text-base md:text-lg leading-relaxed">
              <p>
                We begin by understanding your needs and budget. From there, we balance functionality with aesthetics, maintain a transparent process with no hidden costs and use site visits to ensure accuracy at every stage.
              </p>
              <p>
                “Every space has its own story — we bring it to life through design.”
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 border-t border-cream/15">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="border-b md:border-b-0 md:border-r border-cream/15 last:border-r-0 p-8 flex flex-col gap-3"
              >
                <span className="label-dark">{step.number}</span>
                <h3 className="font-display text-cream text-xl tracking-tight uppercase">{step.title}</h3>
                <p className="text-cream/65 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <ArrowButton to="/services" variant="outlineLight" size="md">
              Explore Our Services
            </ArrowButton>
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </>
  )
}
