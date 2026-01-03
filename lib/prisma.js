import "dotenv/config";
// import { PrismaClient } from "@prisma/client"
import { PrismaClient } from "@/app/generated/client"

import { PrismaPg } from '@prisma/adapter-pg';
import * as Sentry from "@sentry/nextjs"

if (!process.env.DATABASE_URL){
  Sentry.logger.warn("Missing DATABASE_URL environment variable")
}
const globalForPrisma = global;

Sentry.logger.debug(`Connecting to ${process.env.DATABASE_URL.substring(0, 25)}...... database`);
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL 
});
const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

async function connectAndVerify() {
  try {
    await prisma.$connect();
    Sentry.logger.info('Successfully connected to the database');
    await prisma.$queryRaw`SELECT 1`;
    Sentry.logger.info('Database connection verified with a test query');
  } catch (error) {
    Sentry.captureException(error);
    Sentry.logger.error('Failed to connect to the database', error);
    process.exit(1); 
  }
}
connectAndVerify();


export default prisma;

