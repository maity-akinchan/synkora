import { connectToDatabase } from "@/lib/db";

// Register instrumentation - this runs on server startup
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      console.log('🔧 Initializing database connection...');
      await connectToDatabase();
      console.log('✅ Database connection initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize database connection:', error);
      // Don't throw - let the app start even if DB connection fails
      // The retry logic will handle reconnection attempts
    }
  }
}