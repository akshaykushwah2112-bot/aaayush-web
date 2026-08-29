import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import ProjectImage from './ProjectImage'

export function Lightbox({ images, open, index, onClose, onPrev, onNext }) {
  // Disable body scroll while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, onPrev, onNext])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute top-5 right-5 text-cream/80 hover:text-cream p-2"
          >
            <X size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            aria-label="Previous image"
            className="absolute left-3 md:left-8 text-cream/80 hover:text-cream p-2"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext() }}
            aria-label="Next image"
            className="absolute right-3 md:right-8 text-cream/80 hover:text-cream p-2"
          >
            <ChevronRight size={32} />
          </button>

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="relative max-w-[90vw] max-h-[85vh] aspect-[4/5] md:aspect-[16/10] w-full md:w-[80vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {images[index]?.src ? (
              <img
                src={images[index].src}
                alt={images[index].alt || 'Project image'}
                className="w-full h-full object-contain"
              />
            ) : (
              <ProjectImage category={images[index]?.category || 'architectural'} ratio="aspect-auto w-full h-full" />
            )}
          </motion.div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/70 text-xs tracking-wider uppercase">
            {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Lightbox
