import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import ProjectImage from '../components/ProjectImage'
import Lightbox from '../components/Lightbox'
import { featuredProjects } from '../data/projects'

const projectPhotoPaths = {
  'p-01': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => `/projects/alok-ji-tiwari/${String(number).padStart(2, '0')}.jpg`),
  'p-02': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => `/projects/aasish-ji-jain/${String(number).padStart(2, '0')}.jpg`),
  'p-03': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => `/projects/dr-dharmendra-ji/${String(number).padStart(2, '0')}${number <= 3 ? '.jpeg' : '.jpg'}`),
  'p-04': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => `/projects/nitesh-ji/${String(number).padStart(2, '0')}.jpg`),
  'p-05': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => `/projects/satyendra-ji/${String(number).padStart(2, '0')}.jpg`),
}

export function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const activeProject = featuredProjects[activeIndex]
  const activePhotos = projectPhotoPaths[activeProject.id] || []
  const lightboxImages = activePhotos.map((src, index) => ({
    src,
    alt: `${activeProject.title} project photo ${index + 1}`,
  }))

  const showPrevious = () => {
    setActiveIndex((index) => (index - 1 + featuredProjects.length) % featuredProjects.length)
  }

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % featuredProjects.length)
  }

  return (
    <section id="projects" className="bg-cream py-24 md:py-36 relative">
      <div className="container-architectural">
        {/* Header */}
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
              Selected Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="heading-display text-charcoal text-4xl md:text-5xl lg:text-[56px] type-editorial max-w-[20ch]"
            >
              A glimpse into our approach to architecture, interiors and visualization.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="label-meta" aria-live="polite">
              Projects slider
            </span>
          </motion.div>
        </div>

        {/* Project slider */}
        <div className="max-w-4xl">
          <div className="flex justify-end mb-4">
            <span className="label-meta" aria-live="polite">
              {String(activeIndex + 1).padStart(2, '0')} / {String(featuredProjects.length).padStart(2, '0')}
            </span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={`/portfolio/${activeProject.id}`} className="group flex flex-col gap-5">
                <div className="image-editorial aspect-[4/5] md:aspect-[5/4] relative">
                    {activePhotos[0] ? (
                      <button
                        type="button"
                        onClick={(event) => { event.preventDefault(); event.stopPropagation(); setLightboxIndex(0) }}
                        aria-label={`Open ${activeProject.title} main photo`}
                        className="absolute inset-0 w-full h-full cursor-zoom-in"
                      >
                        <img src={activePhotos[0]} alt={`${activeProject.title} main project view`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                      </button>
                    ) : (
                      <ProjectImage category={activeProject.accent || 'architectural'} ratio="absolute inset-0 w-full h-full" label={activeProject.title.toUpperCase()} />
                    )}
                    <div className="absolute inset-0 ring-1 ring-inset ring-charcoal/10 pointer-events-none" />
                    <div className="absolute top-4 right-4 bg-cream/95 backdrop-blur px-3 py-1.5 label-meta">
                      {String(activeIndex + 1).padStart(2, '0')}
                    </div>
                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-cream/95 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-0 translate-y-2">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  {activePhotos.length > 0 && (
                    <div className="grid grid-cols-5 gap-2" aria-label="10 project photos">
                      {activePhotos.map((photo, photoIndex) => (
                        <div key={photo} className="relative aspect-square overflow-hidden image-editorial">
                          <button
                            type="button"
                            onClick={(event) => { event.preventDefault(); event.stopPropagation(); setLightboxIndex(photoIndex) }}
                            aria-label={`Open ${activeProject.title} photo ${photoIndex + 1}`}
                            className="absolute inset-0 w-full h-full cursor-zoom-in"
                          >
                            <img src={photo} alt={`${activeProject.title} project photo ${photoIndex + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="label-meta">{activeProject.category}</span>
                      <h3 className="heading-display text-charcoal text-2xl md:text-3xl tracking-tight transition-transform duration-500 group-hover:translate-x-1">
                        {activeProject.title}
                      </h3>
                      <p className="text-muted text-sm">{activeProject.location}</p>
                    </div>
                    <span className="text-muted text-xs tracking-wider mt-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      {String(activeIndex + 1).padStart(3, '0')}
                    </span>
                  </div>
              </Link>
              <div className="flex items-center justify-between gap-4 mt-6 pt-5 border-t border-charcoal/15">
                <span className="label-meta">Browse projects</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="Show previous project"
                    className="w-14 h-14 md:w-16 md:h-16 border-2 border-charcoal/35 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream transition-colors"
                  >
                    <ArrowLeft size={25} />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Show next project"
                    className="w-14 h-14 md:w-16 md:h-16 border-2 border-charcoal/35 flex items-center justify-center text-charcoal hover:bg-charcoal hover:text-cream transition-colors"
                  >
                    <ArrowRight size={25} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <Lightbox
          images={lightboxImages}
          open={lightboxIndex !== null}
          index={lightboxIndex || 0}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((index) => (index - 1 + lightboxImages.length) % lightboxImages.length)}
          onNext={() => setLightboxIndex((index) => (index + 1) % lightboxImages.length)}
        />
      </div>
    </section>
  )
}

export default FeaturedProjects
