import { useState } from 'react'
import { Facebook, Instagram, Mail, MessageCircle } from 'lucide-react'
import PageHero from '../components/PageHero'
import { studio, whatsappLink, mailLink, apiBaseUrl } from '../utils/config'

const buttonClass = 'inline-flex items-center justify-between gap-5 border border-charcoal/25 px-5 py-4 text-sm text-charcoal hover:bg-charcoal hover:text-cream transition-colors duration-300'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  projectType: 'ARCHITECTURE',
  preferredDate: '',
  preferredTime: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch(`${apiBaseUrl}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result?.error || 'Unable to submit consultation request.')
      }

      setStatus({
        type: 'success',
        message: 'Your consultation request has been sent successfully. Our team will contact you shortly.',
      })
      setForm(initialForm)

      if (result?.whatsappLink) {
        window.open(result.whatsappLink, '_blank', 'noopener,noreferrer')
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Something went wrong while sending your request.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s talk about your space."
        description="Tell us what you are planning and we will get back to you with the next step."
      />

      <section className="bg-cream py-20 md:py-32">
        <div className="container-architectural">
          <div className="grid grid-cols-12 gap-10 md:gap-16">
            <div className="col-span-12 md:col-span-5 flex flex-col gap-5">
              <span className="label-meta flex items-center gap-3">
                <span className="block w-8 h-px bg-current opacity-60" />
                Get in touch
              </span>
              <h2 className="heading-display text-charcoal text-4xl md:text-5xl type-editorial">
                Start a conversation.
              </h2>
              <p className="body-editorial text-base md:text-lg max-w-[38ch]">
                Choose the channel that works best for you. We are based in Indore and work across architecture and interiors.
              </p>
              <p className="text-muted text-sm leading-relaxed">
                {studio.location.full}
              </p>
            </div>

            <div className="col-span-12 md:col-span-7 flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <span className="label-meta">Direct contact</span>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={buttonClass}>
                  <span className="flex items-center gap-3">
                    <MessageCircle size={19} />
                    <span>WhatsApp</span>
                  </span>
                  <span className="text-xs opacity-60">{studio.contact.phone}</span>
                </a>
                <a href={mailLink()} className={buttonClass}>
                  <span className="flex items-center gap-3">
                    <Mail size={19} />
                    <span>Email</span>
                  </span>
                  <span className="text-xs opacity-60 break-all">{studio.contact.email}</span>
                </a>
              </div>

              <div className="flex flex-col gap-4">
                <span className="label-meta">Social media</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a href={studio.social.instagram} target="_blank" rel="noopener noreferrer" className={buttonClass}>
                    <span className="flex items-center gap-3">
                      <Instagram size={19} />
                      <span>Instagram</span>
                    </span>
                    <span className="text-xs opacity-60">@stylestructurestudio</span>
                  </a>
                  <a href={studio.social.facebook} target="_blank" rel="noopener noreferrer" className={buttonClass}>
                    <span className="flex items-center gap-3">
                      <Facebook size={19} />
                      <span>Facebook</span>
                    </span>
                    <span className="text-xs opacity-60">stylestructurestudio</span>
                  </a>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-5 rounded-[2rem] border border-charcoal/15 bg-white/40 p-5 md:p-7">
                <div className="flex items-center justify-between gap-4 pb-2 border-b border-charcoal/10">
                  <span className="label-meta">Book a consultation</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted">Required details</span>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-charcoal">
                    <span>Name</span>
                    <input
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="border border-charcoal/20 bg-transparent px-4 py-3 text-base outline-none transition focus:border-charcoal"
                      required
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm text-charcoal">
                    <span>Phone number</span>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="border border-charcoal/20 bg-transparent px-4 py-3 text-base outline-none transition focus:border-charcoal"
                      required
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm text-charcoal">
                    <span>Email</span>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="border border-charcoal/20 bg-transparent px-4 py-3 text-base outline-none transition focus:border-charcoal"
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm text-charcoal">
                    <span>Project type</span>
                    <select
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                      className="border border-charcoal/20 bg-transparent px-4 py-3 text-base outline-none transition focus:border-charcoal"
                    >
                      <option value="ARCHITECTURE">Architecture</option>
                      <option value="INTERIOR">Interior</option>
                      <option value="COMMERCIAL">Commercial</option>
                      <option value="RESIDENTIAL">Residential</option>
                      <option value="RENOVATION">Renovation</option>
                      <option value="LANDSCAPE">Landscape</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </label>

                  <label className="flex flex-col gap-2 text-sm text-charcoal">
                    <span>Preferred date</span>
                    <input
                      name="preferredDate"
                      type="date"
                      value={form.preferredDate}
                      onChange={handleChange}
                      className="border border-charcoal/20 bg-transparent px-4 py-3 text-base outline-none transition focus:border-charcoal"
                      required
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm text-charcoal">
                    <span>Preferred time</span>
                    <input
                      name="preferredTime"
                      type="time"
                      value={form.preferredTime}
                      onChange={handleChange}
                      className="border border-charcoal/20 bg-transparent px-4 py-3 text-base outline-none transition focus:border-charcoal"
                      required
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-2 text-sm text-charcoal">
                  <span>Tell us about your project</span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your space, timeline, and requirements..."
                    className="border border-charcoal/20 bg-transparent px-4 py-3 text-base outline-none transition focus:border-charcoal resize-none"
                    required
                  />
                </label>

                {status.message && (
                  <p className={`text-sm ${status.type === 'success' ? 'text-emerald-700' : 'text-red-600'}`}>
                    {status.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-fit items-center justify-center border border-charcoal bg-charcoal px-6 py-3 text-xs uppercase tracking-[0.2em] text-cream transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? 'Submitting...' : 'Book Consultation'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
