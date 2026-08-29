import rateLimit from 'express-rate-limit'

export const publicFormLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many submissions. Please wait a moment and try again.',
  },
})

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Stricter limit for admin login attempts
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many login attempts. Please try again after 15 minutes.',
  },
  skip: (req) => {
    // Only apply to login attempts, not other endpoints
    return !req.path.includes('/login')
  }
})

export const adminActionLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // Allow reasonable amount of actions per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests. Please wait a moment.',
  },
})
