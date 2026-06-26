// Re-export the single Prisma client singleton defined in lib/db.ts
// to avoid instantiating multiple PrismaClient instances.
export { prisma } from "./db";
