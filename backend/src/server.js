import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import { env } from './config/env.js'
import prisma from './lib/prisma.js'
import { buildWhatsAppLink } from './lib/whatsapp.js'
import { appointmentSchema, enquirySchema, adminLoginSchema, statusUpdateSchema } from './lib/validate.js'
import { isValidEmail, normalizePhone, sanitizeText, toContactMethod, toProjectType, toStatus } from './lib/utils.js'
import { publicFormLimiter, authLimiter, adminActionLimiter } from './middleware/rateLimit.js'
import { requireAuth } from './middleware/auth.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const app = express()
const allowedOrigins = [
  env.frontendUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
]

app.use(helmet())
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
      return
    }

    callback(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json({ limit: '1mb' }))
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'))

const buildAdminToken = (admin) => jwt.sign({ sub: admin.id, email: admin.email }, env.jwtSecret, {
  expiresIn: env.jwtExpiresIn,
})

const spamPatterns = [/\b(?:viagra|casino|crypto|loan|click|free money|investment)\b/i, /(.)\1{8,}/]
const isLikelySpam = (value) => {
  const text = sanitizeText(value).toLowerCase()
  return spamPatterns.some((pattern) => pattern.test(text))
}

// Health Check Routes (For UptimeRobot & Render Keep-Alive)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'active', message: 'Backend is running' })
})

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Backend is healthy', timestamp: new Date().toISOString() })
})

app.post('/api/enquiries', publicFormLimiter, async (req, res, next) => {
  try {
    const payload = enquirySchema.parse(req.body)
    const name = sanitizeText(payload.name)
    const phone = normalizePhone(payload.phone)
    const email = sanitizeText(payload.email || '')
    const message = sanitizeText(payload.message)

    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, error: 'Name, phone and message are required' })
    }

    if (name.length < 2 || phone.length < 7) {
      return res.status(400).json({ success: false, error: 'Please provide a valid name and phone number' })
    }

    if (email && !isValidEmail(email)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address' })
    }

    if (isLikelySpam(name) || isLikelySpam(message) || isLikelySpam(phone) || isLikelySpam(email || '')) {
      return res.status(400).json({ success: false, error: 'Submission rejected as suspicious' })
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        phone,
        email: email || null,
        projectType: toProjectType(payload.projectType),
        message,
        preferredContactMethod: toContactMethod(payload.preferredContactMethod),
      },
    })

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: enquiry,
      whatsappLink: buildWhatsAppLink(`Hello Style Structure Studio, I have submitted an enquiry for a ${enquiry.projectType.toLowerCase()} project. My name is ${enquiry.name}.`),
    })
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, error: error.errors[0]?.message || 'Invalid form data' })
    }
    next(error)
  }
})

app.post('/api/appointments', publicFormLimiter, async (req, res, next) => {
  console.log('POST /api/appointments')
  console.log('Request received')

  try {
    console.log('Validating data')
    const payload = appointmentSchema.parse(req.body)
    const name = sanitizeText(payload.name)
    const phone = normalizePhone(payload.phone)
    const email = sanitizeText(payload.email || '')
    const preferredDate = new Date(payload.preferredDate)
    const preferredTime = sanitizeText(payload.preferredTime)
    const message = sanitizeText(payload.message || '')

    console.log('Payload validated:', payload)

    if (!name || !phone || !preferredDate || !preferredTime) {
      return res.status(400).json({ success: false, error: 'Name, phone, date and time are required' })
    }

    if (!Number.isFinite(preferredDate.getTime())) {
      return res.status(400).json({ success: false, error: 'Invalid preferred date' })
    }

    if (email && !isValidEmail(email)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address' })
    }

    if (isLikelySpam(name) || isLikelySpam(message) || isLikelySpam(phone) || isLikelySpam(email || '')) {
      return res.status(400).json({ success: false, error: 'Submission rejected as suspicious' })
    }

    console.log('Checking availability')
    const existing = await prisma.appointment.findFirst({
      where: {
        phone,
        preferredDate,
        preferredTime,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    })

    if (existing) {
      return res.status(409).json({
        success: false,
        error: 'A similar appointment request already exists for this phone number at the same date and time',
      })
    }

    console.log('Connecting to database')
    const appointment = await prisma.appointment.create({
      data: {
        name,
        phone,
        email: email || null,
        preferredDate,
        preferredTime,
        projectType: toProjectType(payload.projectType),
        message: message || null,
      },
    })

    console.log('Appointment created successfully')

    res.status(201).json({
      success: true,
      message: 'Appointment request submitted successfully',
      data: appointment,
      whatsappLink: buildWhatsAppLink(`Hello Style Structure Studio, I would like to book a consultation for ${appointment.preferredDate.toISOString().slice(0, 10)} at ${appointment.preferredTime}.`),
    })
  } catch (error) {
    console.error('Appointment creation error:', error)
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, error: error.errors[0]?.message || 'Invalid appointment data' })
    }
    next(error)
  }
})

app.post('/api/admin/login', authLimiter, async (req, res, next) => {
  try {
    const payload = adminLoginSchema.parse(req.body)
    const admin = await prisma.admin.findUnique({ where: { email: payload.email.toLowerCase() } })

    if (!admin) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' })
    }

    const valid = await bcrypt.compare(payload.password, admin.passwordHash)
    if (!valid) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' })
    }

    const token = buildAdminToken(admin)

    res.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    })
  } catch (error)
 {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, error: error.errors[0]?.message || 'Invalid login data' })
    }
    next(error)
  }
})

app.get('/api/admin/enquiries', adminActionLimiter, requireAuth, async (req, res, next) => {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
    })

    res.json({ success: true, data: enquiries, count: enquiries.length })
  } catch (error) {
    next(error)
  }
})

app.get('/api/admin/appointments', adminActionLimiter, requireAuth, async (req, res, next) => {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: [{ preferredDate: 'asc' }, { preferredTime: 'asc' }],
    })

    res.json({ success: true, data: appointments, count: appointments.length })
  } catch (error) {
    next(error)
  }
})

app.patch('/api/admin/appointments/:id/status', adminActionLimiter, requireAuth, async (req, res, next) => {
  try {
    const { status } = statusUpdateSchema.parse(req.body)

    const appointment = await prisma.appointment.update({
      where: { id: req.params.id },
      data: { status: toStatus(status) },
    })

    res.json({ success: true, message: 'Appointment status updated', data: appointment })
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ success: false, error: error.errors[0]?.message || 'Invalid status' })
    }

    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, error: 'Appointment not found' })
    }

    next(error)
  }
})

app.delete('/api/admin/enquiries/:id', adminActionLimiter, requireAuth, async (req, res, next) => {
  try {
    await prisma.enquiry.delete({ where: { id: req.params.id } })
    res.json({ success: true, message: 'Enquiry deleted' })
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ success: false, error: 'Enquiry not found' })
    }
    next(error)
  }
})

app.use(notFoundHandler)
app.use(errorHandler)

const startServer = async () => {
  try {
    await prisma.$connect()
    app.listen(env.port, () => {
      console.log(`Server running on http://localhost:${env.port}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()