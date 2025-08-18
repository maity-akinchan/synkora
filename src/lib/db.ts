import { PrismaClient } from '@/generated/prisma/client';

declare global {
  // Avoid creating multiple PrismaClient instances in dev (Hot Reload issue in Next.js)
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // helpful during dev
  });

// In development, keep a single instance across hot reloads
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export async function connectToDatabase() {
  console.log('🔌 Trying to connect to database...');
  try {
    await prisma.$connect();
    console.log('✅ Connected to the database successfully');
  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
    throw error;
  }
}

export const dbConnection = connectToDatabase(); 