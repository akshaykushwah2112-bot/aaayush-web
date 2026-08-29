import { Link } from 'react-router-dom'
import { Facebook, Instagram } from 'lucide-react'
import { motion } from 'framer-motion'
import { studio, navigation, mailLink, callLink, whatsappLink } from '../utils/config'

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
}

const socialEntries = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'facebook', label: 'Facebook' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-cream relative overflow-hidden">
      {/* Top architectural divider */}
      <div className="h-px w-full bg-cream/15" />

      <div className="container-architectural pt-20 md:pt-28 pb-10">
        {/* Big wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8 mb-20 md:mb-28"
        >
          <div className="flex items-center gap-5">
            <img
              src="/logo.svg"
              alt={studio.name}
              className="w-28 md:w-36 h-auto"
            />
            <span className="label-dark">Er. Aayush Kushwah</span>
          </div>
          <h2 className="heading-display text-cream text-[14vw] md:text-[10vw] lg:text-[8.5vw] leading-[0.9] tracking-tight">
            Style Structure
            <br />
            <span className="text-cream/55 italic font-serif">Studio</span>
          </h2>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 mb-20">
          {/* Navigation */}
          <div className="col-span-2 md:col-span-4 flex flex-col gap-5">
            <span className="label-dark">Navigation</span>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-y-3 gap-x-6">
              {navigation.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-cream/85 hover:text-cream text-sm link-underline inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/privacy"
                  className="text-cream/85 hover:text-cream text-sm link-underline inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-5">
            <span className="label-dark">Contact</span>
            <div className="flex flex-col gap-3 text-sm">
              <span className="text-cream/85">Er. Aayush Kushwah</span>
              <a href={callLink()} className="text-cream/85 hover:text-cream link-underline w-fit">
                {studio.contact.phone}
              </a>
              <a href={mailLink()} className="text-cream/85 hover:text-cream link-underline w-fit break-all">
                {studio.contact.email}
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-cream/85 hover:text-cream link-underline w-fit">
                WhatsApp Us ↗
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-5">
            <span className="label-dark">Studio</span>
            <p className="text-cream/85 text-sm leading-relaxed">
              {studio.location.address}
              <br />
              {studio.location.city}, {studio.location.state}
              <br />
              {studio.location.country}
            </p>
          </div>

          {/* Social */}
          <div className="col-span-2 md:col-span-2 flex flex-col gap-5">
            <span className="label-dark">Follow</span>
            <div className="flex flex-col gap-3 text-sm">
              {socialEntries.map(({ key, label }) => {
                const url = studio.social[key]
                const Icon = socialIcons[key]
                return (
                  <div key={key} className="flex items-center gap-2">
                    {Icon ? <Icon size={14} className="text-cream/60" /> : null}
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cream/85 hover:text-cream link-underline"
                      >
                        {label}
                      </a>
                    ) : (
                      <span className="text-cream/40 cursor-default" title={`${label} link pending`}>
                        {label}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-cream/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-cream/55 text-xs tracking-wider uppercase">
            © {year} {studio.name}. All rights reserved.
          </p>
          <p className="text-cream/40 text-xs tracking-wider uppercase">
            Architecture · Interior · Structure
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
