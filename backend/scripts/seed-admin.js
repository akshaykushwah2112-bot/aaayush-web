import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

const main = async () => {
  const email = (process.env.ADMIN_EMAIL || 'admin@stylestructurestudio.com').toLowerCase()
  const password = process.env.ADMIN_PASSWORD || 'ChangeThisStrongPassword123!'
  const name = process.env.ADMIN_NAME || 'Style Structure Studio Admin'

  const existing = await prisma.admin.findUnique({ where: { email } })

  if (existing) {
    const changed = await bcrypt.compare(password, existing.passwordHash)
    if (!changed) {
      const passwordHash = await bcrypt.hash(password, 12)
      await prisma.admin.update({
        where: { id: existing.id },
        data: { passwordHash, name },
      })
      console.log(`Admin password updated for ${email}`)
    } else {
      console.log(`Admin already exists for ${email}`)
    }
    return
  }

  const passwordHash = await bcrypt.hash(password, 12)

  await prisma.admin.create({
    data: {
      name,
      email,
      passwordHash,
    },
  })

  console.log(`Admin created: ${email}`)
}

main()
  .catch((error) => {
    console.error('Seed admin failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
