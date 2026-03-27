import { PrismaClient } from './generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

// TODO: resolve geolocation by one of the following approaches:
// 1. Get rid of it. (Why do I need it at the first place?)
// 2. $queryRaw/$executeRaw with the help of TypedSQL
// 3. $extends with a custom method that uses $queryRaw/$executeRaw under the hood
const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter,
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma