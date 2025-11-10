import { PrismaClient } from '@/generated/prisma/client';

// ============================================
// SINGLETON PATTERN FOR PRISMA CLIENT
// ============================================

declare global {
  // Avoid creating multiple PrismaClient instances in dev (Hot Reload issue in Next.js)
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
  // eslint-disable-next-line no-var
  var __prismaConnected: boolean;
  // eslint-disable-next-line no-var
  var __prismaConnectionPromise: Promise<void> | undefined;
}

// Connection configuration
const CONNECTION_CONFIG = {
  maxRetries: 3,
  retryDelay: 2000, // 2 seconds
  connectionTimeout: 10000, // 10 seconds
  queryTimeout: 30000, // 30 seconds
};

// Log levels based on environment
const LOG_LEVELS = process.env.NODE_ENV === 'production' 
  ? ['error', 'warn'] as const
  : ['query', 'info', 'warn', 'error'] as const;

/**
 * Creates a new Prisma Client instance with proper configuration
 */
function createPrismaClient(): PrismaClient {
  console.log('🔧 Creating new Prisma Client instance...');
  
  return new PrismaClient({
    log: LOG_LEVELS,
    errorFormat: process.env.NODE_ENV === 'production' ? 'minimal' : 'pretty',
    datasources: {
      db: {
        url: process.env.AZURESQL_URL,
      },
    },
  });
}

/**
 * Get or create the singleton Prisma Client instance
 * This ensures only ONE instance exists across the entire application
 */
export function getPrismaClient(): PrismaClient {
  if (!global.__prisma) {
    global.__prisma = createPrismaClient();
    global.__prismaConnected = false;
    
    // Add event listeners for connection management
    global.__prisma.$on('beforeExit' as never, async () => {
      console.log('🔌 Prisma Client disconnecting...');
      global.__prismaConnected = false;
    });

    console.log('✅ Prisma Client singleton created');
  }
  
  return global.__prisma;
}

// Export the singleton instance
export const prisma = getPrismaClient();

// ============================================
// CONNECTION MANAGEMENT
// ============================================

/**
 * Sleep utility for retry delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Test database connection with a simple query
 */
async function testConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1 as result`;
    return true;
  } catch (error) {
    console.error('❌ Connection test failed:', error instanceof Error ? error.message : 'Unknown error');
    return false;
  }
}

/**
 * Connect to the database with retry logic and proper error handling
 * This function is IDEMPOTENT - safe to call multiple times
 */
export async function connectToDatabase(): Promise<void> {
  // If already connected, return immediately
  if (global.__prismaConnected) {
    console.log('✅ Already connected to database');
    return;
  }

  // If a connection attempt is in progress, wait for it
  if (global.__prismaConnectionPromise) {
    console.log('⏳ Connection attempt in progress, waiting...');
    return global.__prismaConnectionPromise;
  }

  // Start new connection attempt
  console.log('🔌 Initiating database connection...');
  
  global.__prismaConnectionPromise = (async () => {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= CONNECTION_CONFIG.maxRetries; attempt++) {
      try {
        console.log(`📡 Connection attempt ${attempt}/${CONNECTION_CONFIG.maxRetries}...`);

        // Set connection timeout
        const connectionPromise = prisma.$connect();
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Connection timeout')), CONNECTION_CONFIG.connectionTimeout)
        );

        await Promise.race([connectionPromise, timeoutPromise]);

        // Test the connection
        const isConnected = await testConnection();
        
        if (isConnected) {
          global.__prismaConnected = true;
          console.log('✅ Successfully connected to Azure SQL database');
          console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
          global.__prismaConnectionPromise = undefined;
          return;
        } else {
          throw new Error('Connection test failed');
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown connection error');
        console.error(`❌ Connection attempt ${attempt} failed:`, lastError.message);

        // If not the last attempt, wait before retrying
        if (attempt < CONNECTION_CONFIG.maxRetries) {
          console.log(`⏳ Retrying in ${CONNECTION_CONFIG.retryDelay / 1000} seconds...`);
          await sleep(CONNECTION_CONFIG.retryDelay);
        }
      }
    }

    // All retries failed
    global.__prismaConnectionPromise = undefined;
    console.error('💥 Failed to connect to database after all retries');
    throw new Error(
      `Database connection failed after ${CONNECTION_CONFIG.maxRetries} attempts: ${lastError?.message || 'Unknown error'}`
    );
  })();

  return global.__prismaConnectionPromise;
}

/**
 * Disconnect from the database gracefully
 * Safe to call multiple times
 */
export async function disconnectFromDatabase(): Promise<void> {
  if (!global.__prisma) {
    console.log('ℹ️ No Prisma Client instance to disconnect');
    return;
  }

  if (!global.__prismaConnected) {
    console.log('ℹ️ Already disconnected from database');
    return;
  }

  try {
    console.log('🔌 Disconnecting from database...');
    await prisma.$disconnect();
    global.__prismaConnected = false;
    console.log('✅ Disconnected from database successfully');
  } catch (error) {
    console.error('❌ Error disconnecting from database:', error);
    throw error;
  }
}

/**
 * Health check for the database connection
 * Returns true if connected and healthy, false otherwise
 */
export async function isDatabaseHealthy(): Promise<boolean> {
  if (!global.__prismaConnected) {
    return false;
  }

  try {
    const isHealthy = await testConnection();
    if (!isHealthy) {
      global.__prismaConnected = false;
    }
    return isHealthy;
  } catch (error) {
    console.error('❌ Database health check failed:', error);
    global.__prismaConnected = false;
    return false;
  }
}

/**
 * Reconnect to the database if connection is lost
 * This is useful for handling connection drops
 */
export async function ensureConnection(): Promise<void> {
  const isHealthy = await isDatabaseHealthy();
  
  if (!isHealthy) {
    console.log('⚠️ Database connection unhealthy, reconnecting...');
    global.__prismaConnected = false;
    await connectToDatabase();
  }
}

/**
 * Get database connection status
 */
export function getConnectionStatus(): {
  connected: boolean;
  hasClient: boolean;
  environment: string;
} {
  return {
    connected: global.__prismaConnected || false,
    hasClient: !!global.__prisma,
    environment: process.env.NODE_ENV || 'development',
  };
}

// ============================================
// GRACEFUL SHUTDOWN HANDLING
// ============================================

/**
 * Handle graceful shutdown
 */
async function handleShutdown(signal: string): Promise<void> {
  console.log(`\n⚠️ Received ${signal}, starting graceful shutdown...`);
  
  try {
    await disconnectFromDatabase();
    console.log('✅ Graceful shutdown completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
}

// Register shutdown handlers (only in Node.js environment)
if (typeof process !== 'undefined') {
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('beforeExit', async () => {
    console.log('🔄 Process exiting, cleaning up...');
    await disconnectFromDatabase();
  });
}

// ============================================
// EXPORTS
// ============================================

export default prisma;

// ============================================
// AUTO-CONNECT IN DEVELOPMENT
// ============================================

// Automatically connect in development (optional)
if (process.env.NODE_ENV !== 'production') {
  connectToDatabase().catch((error) => {
    console.error('❌ Failed to auto-connect to database:', error);
  });
}