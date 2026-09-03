// Centralized studio configuration - single source of truth
export const studio = {
  name: 'Style Structure Studio',
  shortName: 'SSS',
  descriptor: 'ARCHITECTURE | INTERIOR | STRUCTURE',
  tagline: 'Spaces Designed With Purpose.',
  location: {
    address: 'Mahalakshmi Nagar',
    city: 'Indore',
    state: 'Madhya Pradesh',
    country: 'India',
    full: 'Mahalakshmi Nagar, Indore, Madhya Pradesh, India',
  },
  contact: {
    phone: '+91 7987836849',
    phoneRaw: '+917987836849',
    email: 'thestylestructurestudio@gmail.com',
    whatsapp: '917987836849',
    whatsappMessage: 'Hello Style Structure Studio, I would like to discuss a design project.',
  },
  social: {
    // Replace with real URLs when available
    instagram: 'https://instagram.com/stylestructurestudio',
    facebook: 'https://facebook.com/stylestructurestudio',
  },
  hours: {
    weekdays: 'Monday – Saturday',
    weekdayTime: '10:00 – 19:00',
    sunday: 'By appointment',
  },
  yearFounded: null, // not provided
}

export const navigation = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/portfolio' },
  { label: 'Services', path: '/services' },
  { label: 'Packages', path: '/packages' },
  { label: 'Contact', path: '/contact' },
]

export const whatsappLink = (msg) =>
  `https://wa.me/${studio.contact.whatsapp}?text=${encodeURIComponent(msg || studio.contact.whatsappMessage)}`

export const callLink = () => `tel:${studio.contact.phoneRaw}`

export const mailLink = () => `mailto:${studio.contact.email}`
export const apiBaseUrl = (import.meta.env.VITE_API_URL || 'https://aaayush-backend.onrender.com').replace(/\/$/, '') + '/api'
