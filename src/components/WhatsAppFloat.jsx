import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { studio, whatsappLink } from '../utils/config'

function WhatsAppIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path fill="currentColor" d="M12 2a9.8 9.8 0 0 0-8.48 14.72L2.1 21.9l5.3-1.39A9.8 9.8 0 1 0 12 2Z" />
      <path fill="#25D366" d="M12 4.2a7.8 7.8 0 0 0-6.67 11.85l.28.45-.78 2.87 2.94-.77.43.25A7.8 7.8 0 1 0 12 4.2Z" />
      <path fill="currentColor" d="M9.05 7.3c.2-.04.4.08.5.33l.7 1.7c.1.23.05.43-.1.6l-.5.6c.5 1 1.3 1.8 2.3 2.3l.6-.5c.17-.15.38-.2.6-.1l1.7.7c.25.1.37.3.33.5-.13.68-.66 1.43-1.43 1.52-1.2.14-2.95-.67-4.3-2.02-1.35-1.35-2.16-3.1-2.02-4.3.1-.77.84-1.3 1.52-1.43Z" />
    </svg>
  )
}

export function WhatsAppFloat() {
  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 800)
    return () => clearTimeout(t)
  }, [])

  if (!show) return null

  return (
    <div className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-30 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="bg-charcoal text-cream rounded-sm p-5 w-72 shadow-2xl border border-cream/10"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-[10px] tracking-architectural uppercase text-cream/60 mb-1">
                  Style Structure Studio
                </p>
                <p className="font-display text-lg leading-tight">Have a project in mind?</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-cream/60 hover:text-cream"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-cream/75 text-sm leading-relaxed mb-4">
              Chat with us on WhatsApp for a quick consultation about your space.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-cream text-charcoal text-xs uppercase tracking-wider hover:bg-sand transition-colors"
            >
              <WhatsAppIcon size={16} />
              Start Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <WhatsAppIcon size={25} />
      </motion.button>
    </div>
  )
}

export default WhatsAppFloat
