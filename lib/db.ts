// Prisma Client singleton
import { PrismaClient } from '@prisma/client'

// Singleton Prisma instance
const globalForPrisma = global as unknown as { prisma: PrismaClient }

let prismaInstance: PrismaClient | undefined

if (!prismaInstance) {
  prismaInstance = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}

export const prisma = globalForPrisma.prisma || prismaInstance

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Legacy DB helper for backward compatibility (no longer needed)
type DB = {
  isAvailable: boolean
}

const db: DB = { isAvailable: false }

export function isDbAvailable() {
  // Always use Prisma, not SQLite
  return false
}

export default db
