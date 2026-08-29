import { env } from '../config/env.js'

export const buildWhatsAppLink = (message = 'Hello Style Structure Studio, I would like to discuss a design project.') => {
  const text = encodeURIComponent(message)
  return `https://wa.me/${env.whatsappNumber}?text=${text}`
}
