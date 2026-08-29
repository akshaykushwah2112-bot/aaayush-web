export const sanitizeText = (value) => String(value ?? '').trim()

export const normalizePhone = (value) => sanitizeText(value).replace(/\s+/g, '')

export const isValidEmail = (value) => {
  if (!value) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export const toProjectType = (value) => {
  const normalized = String(value ?? '').trim().toUpperCase()
  const allowed = new Set(['ARCHITECTURE', 'INTERIOR', 'COMMERCIAL', 'RESIDENTIAL', 'RENOVATION', 'LANDSCAPE', 'OTHER'])
  return allowed.has(normalized) ? normalized : 'OTHER'
}

export const toContactMethod = (value) => {
  const normalized = String(value ?? '').trim().toUpperCase()
  const allowed = new Set(['WHATSAPP', 'PHONE', 'EMAIL'])
  return allowed.has(normalized) ? normalized : 'WHATSAPP'
}

export const toStatus = (value) => {
  const normalized = String(value ?? '').trim().toUpperCase()
  const allowed = new Set(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'])
  return allowed.has(normalized) ? normalized : 'PENDING'
}

export const safeJson = (value) => {
  try {
    return JSON.parse(JSON.stringify(value))
  } catch {
    return value
  }
}
