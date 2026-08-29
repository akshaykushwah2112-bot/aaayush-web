import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || 'development-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@stylestructurestudio.com',
  adminPassword: process.env.ADMIN_PASSWORD || 'ChangeThisStrongPassword123!',
  adminName: process.env.ADMIN_NAME || 'Style Structure Studio Admin',
  whatsappNumber: process.env.WHATSAPP_NUMBER || '917987836849',
  emailProvider: process.env.EMAIL_PROVIDER || 'none',
  resendApiKey: process.env.RESEND_API_KEY || '',
  mailFrom: process.env.MAIL_FROM || 'no-reply@yourdomain.com',
}
