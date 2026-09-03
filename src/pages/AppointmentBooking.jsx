import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react'
import { apiBaseUrl, studio, whatsappLink } from '../utils/config'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  projectType: 'ARCHITECTURE',
  preferredDate: '',
  preferredTime: '',
  message: '',
}

const defaultTimeSlots = [
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '17:00', label: '5:00 PM' },
  { value: '18:00', label: '6:00 PM' },
  { value: '19:00', label: '7:00 PM' },
]

export default function AppointmentBooking() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [responseData, setResponseData] = useState(null)
  const [error, setError] = useState('')

  const minDate = useMemo(() => {
    const today = new Date()
    today.setDate(today.getDate() + 1)
    return today.toISOString().split('T')[0]
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    if (name === 'preferredDate' && new Date(`${value}T00:00:00`).getDay() === 0) {
      setError('Sundays are closed. Please choose another date.')
      return
    }

    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    if (new Date(`${form.preferredDate}T00:00:00`).getDay() === 0) {
      setError('Sundays are closed. Please choose another date.')
      setLoading(false)
      return
    }

    const requestUrl = `${apiBaseUrl}/appointments`
    console.log('Confirm Appointment clicked')
    console.log('Request URL:', requestUrl)
    console.log('Request payload:', form)

    try {
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const rawText = await response.text()
      let result = {}

      try {
        result = rawText ? JSON.parse(rawText) : {}
      } catch {
        result = { raw: rawText }
      }

      console.log('Response status:', response.status)
      console.log('Response body:', result)

      if (!response.ok) {
        throw new Error(result?.error || result?.raw || 'Unable to confirm your appointment request.')
      }

      setResponseData(result)
      setSubmitted(true)
      setForm(initialForm)
    } catch (err) {
      console.error('Appointment request failed:', err)
      setError(err.message || 'Something went wrong while booking the appointment.')
    } finally {
      setLoading(false)
    }
  }

  const whatsappMessage = responseData
    ? `Hello Style Structure Studio, I have requested a consultation for ${responseData.data.preferredDate?.slice(0, 10) || form.preferredDate} at ${responseData.data.preferredTime || form.preferredTime}. My name is ${responseData.data.name || form.name}.`
    : `Hello Style Structure Studio, I would like to book a consultation.`

  if (submitted && responseData) {
    return (
      <section className="bg-cream py-24 md:py-32">
        <div className="container-architectural max-w-3xl">
          <div className="rounded-[2rem] border border-charcoal/15 bg-white/60 p-8 md:p-12">
            <div className="mb-6 flex items-center gap-3 text-emerald-700">
              <CheckCircle2 size={28} />
              <span className="label-meta text-emerald-700">Appointment request received</span>
            </div>

            <h1 className="heading-display text-4xl md:text-5xl text-charcoal type-editorial">Your consultation is booked successfully.</h1>
            <p className="mt-4 max-w-xl text-base text-muted">
              Thanks, {responseData.data.name}. We have received your request for {responseData.data.preferredDate?.slice(0, 10) || form.preferredDate} at {responseData.data.preferredTime || form.preferredTime}. Our team will contact you soon.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 border border-charcoal bg-charcoal px-6 py-3 text-xs uppercase tracking-[0.2em] text-cream transition hover:bg-ink"
              >
                <ArrowLeft size={14} />
                Back to contact
              </Link>

              <a
                href={whatsappLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-charcoal px-6 py-3 text-xs uppercase tracking-[0.2em] text-charcoal transition hover:bg-charcoal hover:text-cream"
              >
                <MessageCircle size={14} />
                Continue on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-architectural max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <span className="label-meta">Appointment booking</span>
            <h1 className="heading-display mt-3 text-4xl md:text-6xl text-charcoal type-editorial">Book a consultation</h1>
          </div>
          <Link to="/contact" className="text-sm uppercase tracking-[0.18em] text-muted hover:text-charcoal">
            Back to contact
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-[2rem] border border-charcoal/15 bg-charcoal p-7 text-cream">
            <p className="label-meta text-cream/70">Studio consultation</p>
            <h2 className="mt-4 text-3xl font-display">Tell us about your project.</h2>
            <p className="mt-4 text-sm leading-relaxed text-cream/75">
              We’ll discuss your architectural or interior requirements and suggest the best next step for your space.
            </p>

            <div className="mt-8 space-y-5 text-sm">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-cream/60">Studio</div>
                <div className="mt-2">{studio.name}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-cream/60">Location</div>
                <div className="mt-2">{studio.location.full}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-cream/60">Direct contact</div>
                <div className="mt-2">{studio.contact.phone}</div>
              </div>
            </div>
          </aside>

          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-charcoal/15 bg-white/60 p-6 md:p-8">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-charcoal">
                <span>Name</span>
                <input
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="border border-charcoal/20 bg-transparent px-4 py-3 text-base outline-none transition focus:border-charcoal"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm text-charcoal">
                <span>Phone</span>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="border border-charcoal/20 bg-transparent px-4 py-3 text-base outline-none transition focus:border-charcoal"
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
                  required
                  min={minDate}
                  onKeyDown={(event) => event.preventDefault()}
                  value={form.preferredDate}
                  onChange={handleChange}
                  className="border border-charcoal/20 bg-transparent px-4 py-3 text-base outline-none transition focus:border-charcoal"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm text-charcoal">
                <span>Preferred time (11:00 AM – 7:00 PM)</span>
                <select
                  name="preferredTime"
                  required
                  value={form.preferredTime}
                  onChange={handleChange}
                  className="border border-charcoal/20 bg-transparent px-4 py-3 text-base outline-none transition focus:border-charcoal"
                >
                  <option value="">Select a slot</option>
                  {defaultTimeSlots.map((slot) => (
                    <option key={slot.value} value={slot.value}>{slot.label}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-5 flex flex-col gap-2 text-sm text-charcoal">
              <span>Project details</span>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your space, timeline, and what you need help with..."
                className="resize-none border border-charcoal/20 bg-transparent px-4 py-3 text-base outline-none transition focus:border-charcoal"
              />
            </label>

            {error && (
              <p className="mt-5 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-8 inline-flex items-center justify-center border border-charcoal bg-charcoal px-6 py-3 text-xs uppercase tracking-[0.2em] text-cream transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Confirming...' : 'Confirm Appointment'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
