import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight, Lock } from 'lucide-react'
import Logo from './Logo'
import ArrowButton from './ArrowButton'
import { navigation, studio, whatsappLink } from '../utils/config'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body when mobile menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Hero pages have transparent initial nav. Determine if we're on one.
  const isHeroPage = location.pathname === '/'

  const navBg = scrolled || open || !isHeroPage
    ? 'bg-cream/95 backdrop-blur-md border-b border-charcoal/10'
    : 'bg-transparent border-b border-transparent'

  const textColor = scrolled || open || !isHeroPage ? 'text-charcoal' : 'text-charcoal md:text-charcoal'

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${navBg}`}
        aria-label="Primary navigation"
      >
        <div className="container-architectural flex items-center justify-between h-16 md:h-20">
          <Logo variant="dark" />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10" aria-label="Main menu">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${textColor} text-[13px] uppercase tracking-wider link-underline transition-colors duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-75 hover:opacity-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/admin/login"
              className={({ isActive }) =>
                `${textColor} text-[13px] uppercase tracking-wider flex items-center gap-2 transition-colors duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                }`
              }
              title="Admin Portal"
            >
              <Lock size={14} />
              Admin
            </NavLink>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <ArrowButton to="/book-appointment" size="sm" variant="dark">
              Book a Consultation
            </ArrowButton>
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className={`lg:hidden ${textColor} p-2 -mr-2`}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-30 bg-cream lg:hidden"
          >
            <div className="container-architectural pt-28 pb-12 h-full flex flex-col">
              <nav className="flex flex-col gap-1" aria-label="Mobile menu">
                {navigation.map((item, idx) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 + idx * 0.05 }}
                  >
                    <NavLink
                      to={item.path}
                      end={item.path === '/'}
                      className={({ isActive }) =>
                        `flex items-center justify-between py-4 border-b border-charcoal/10 text-charcoal font-display text-3xl tracking-tight ${
                          isActive ? 'opacity-100' : 'opacity-90'
                        }`
                      }
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight size={20} className="opacity-50" />
                    </NavLink>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + navigation.length * 0.05 }}
                >
                  <NavLink
                    to="/admin/login"
                    className={({ isActive }) =>
                      `flex items-center justify-between py-4 border-b border-charcoal/10 text-charcoal font-display text-3xl tracking-tight opacity-60 ${
                        isActive ? 'opacity-100' : 'opacity-60'
                      }`
                    }
                  >
                    <span className="flex items-center gap-2">
                      <Lock size={24} />
                      Admin
                    </span>
                    <ArrowUpRight size={20} className="opacity-50" />
                  </NavLink>
                </motion.div>
              </nav>

              <div className="mt-auto pt-10 flex flex-col gap-6">
                <ArrowButton to="/book-appointment" variant="dark" size="md">
                  Book a Consultation
                </ArrowButton>
                <div className="flex flex-col gap-3 text-muted text-sm">
                  <a href={`tel:${studio.contact.phoneRaw}`} className="link-underline w-fit">
                    {studio.contact.phone}
                  </a>
                  <a href={`mailto:${studio.contact.email}`} className="link-underline w-fit break-all">
                    {studio.contact.email}
                  </a>
                  <p className="text-xs tracking-wider uppercase mt-2 opacity-70">
                    {studio.location.full}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
