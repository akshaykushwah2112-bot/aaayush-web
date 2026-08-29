import { z } from 'zod'

export const enquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(20),
  email: z.string().trim().email().max(255).optional().or(z.literal('')),
  projectType: z.enum(['ARCHITECTURE', 'INTERIOR', 'COMMERCIAL', 'RESIDENTIAL', 'RENOVATION', 'LANDSCAPE', 'OTHER']).optional().default('OTHER'),
  message: z.string().trim().min(10).max(2000),
  preferredContactMethod: z.enum(['WHATSAPP', 'PHONE', 'EMAIL']).optional().default('WHATSAPP'),
})

export const appointmentSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(20),
  email: z.string().trim().email().max(255).optional().or(z.literal('')),
  preferredDate: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
    message: 'Invalid date format',
  }),
  preferredTime: z.string().trim().min(3).max(20),
  projectType: z.enum(['ARCHITECTURE', 'INTERIOR', 'COMMERCIAL', 'RESIDENTIAL', 'RENOVATION', 'LANDSCAPE', 'OTHER']).optional().default('OTHER'),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
})

export const adminLoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(128),
})

export const statusUpdateSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']),
})
