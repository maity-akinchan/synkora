import { PrismaClient } from '@/generated/prisma/client';

const prisma = new PrismaClient();

async function connectToDatabase() {
  console.log("Trying to connect to db..")
  try {
    await prisma.$connect();
    console.log('Connected to the database successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}
export { prisma, connectToDatabase };
