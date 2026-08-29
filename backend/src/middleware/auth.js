import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma.js'
import { env } from '../config/env.js'

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

    if (!token) {
      return res.status(401).json({ success: false, error: 'Authentication token missing' })
    }

    const payload = jwt.verify(token, env.jwtSecret)
    const admin = await prisma.admin.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, name: true },
    })

    if (!admin) {
      return res.status(401).json({ success: false, error: 'Invalid or expired token' })
    }

    req.admin = admin
    next()
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' })
  }
}
