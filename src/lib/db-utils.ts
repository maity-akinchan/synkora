import { prisma, ensureConnection } from './db';
import { Prisma } from '@/generated/prisma/client';

/**
 * Configuration for database operation retries
 */
const RETRY_CONFIG = {
  maxRetries: 2,
  retryDelay: 1000, // 1 second
  retryableErrors: [
    'P2024', // Timed out fetching a new connection
    'P2025', // Connection pool timeout
    'P1001', // Can't reach database server
    'P1002', // Database server timeout
    'P1008', // Operations timed out
    'P1017', // Server has closed the connection
  ],
};

/**
 * Sleep utility for retry delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check if an error is retryable
 */
function isRetryableError(error: unknown): boolean {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return RETRY_CONFIG.retryableErrors.includes(error.code);
  }
  
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes('timeout') ||
      message.includes('connection') ||
      message.includes('econnreset') ||
      message.includes('enotfound') ||
      message.includes('epipe')
    );
  }
  
  return false;
}

/**
 * Execute a database operation with automatic retry and reconnection
 * @param operation - The database operation to execute
 * @param operationName - Name of the operation for logging
 * @returns Result of the operation
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  operationName: string = 'Database operation'
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= RETRY_CONFIG.maxRetries + 1; attempt++) {
    try {
      // Ensure connection is healthy before operation
      if (attempt > 1) {
        await ensureConnection();
      }

      // Execute the operation
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      // Log the error
      console.error(
        `❌ ${operationName} failed (attempt ${attempt}/${RETRY_CONFIG.maxRetries + 1}):`,
        lastError.message
      );

      // Check if we should retry
      const shouldRetry = 
        attempt <= RETRY_CONFIG.maxRetries && 
        isRetryableError(error);

      if (shouldRetry) {
        console.log(`⏳ Retrying ${operationName} in ${RETRY_CONFIG.retryDelay / 1000} seconds...`);
        await sleep(RETRY_CONFIG.retryDelay);
      } else {
        // No more retries or non-retryable error
        break;
      }
    }
  }

  // All retries failed
  console.error(`💥 ${operationName} failed after all retries`);
  throw lastError || new Error(`${operationName} failed`);
}

/**
 * Execute a database transaction with retry logic
 * @param callback - Transaction callback
 * @param operationName - Name of the operation for logging
 */
export async function withTransaction<T>(
  callback: (tx: Prisma.TransactionClient) => Promise<T>,
  operationName: string = 'Transaction'
): Promise<T> {
  return withRetry(
    () => prisma.$transaction(callback),
    operationName
  );
}

/**
 * Safe query wrapper that ensures connection and retries on failure
 */
export async function safeQuery<T>(
  queryFn: () => Promise<T>,
  queryName: string = 'Query'
): Promise<T> {
  return withRetry(queryFn, queryName);
}

/**
 * Batch operation helper with automatic chunking
 * Prevents overwhelming the database with too many operations at once
 */
export async function batchOperation<T, R>(
  items: T[],
  operation: (item: T) => Promise<R>,
  options: {
    batchSize?: number;
    operationName?: string;
  } = {}
): Promise<R[]> {
  const { batchSize = 50, operationName = 'Batch operation' } = options;
  const results: R[] = [];

  console.log(`🔄 Starting ${operationName} for ${items.length} items (batch size: ${batchSize})`);

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(items.length / batchSize);

    console.log(`📦 Processing batch ${batchNumber}/${totalBatches}...`);

    try {
      const batchResults = await withRetry(
        () => Promise.all(batch.map(operation)),
        `${operationName} batch ${batchNumber}`
      );
      results.push(...batchResults);
    } catch (error) {
      console.error(`❌ Batch ${batchNumber} failed:`, error);
      throw error;
    }
  }

  console.log(`✅ ${operationName} completed successfully`);
  return results;
}

/**
 * Check if a record exists with retry logic
 */
export async function recordExists(
  model: string,
  where: Record<string, any>
): Promise<boolean> {
  return withRetry(async () => {
    const count = await (prisma as any)[model].count({ where });
    return count > 0;
  }, `Check ${model} existence`);
}

/**
 * Get a record by ID with retry logic
 */
export async function getById<T>(
  model: string,
  id: number | string,
  include?: Record<string, boolean>
): Promise<T | null> {
  return withRetry(async () => {
    return await (prisma as any)[model].findUnique({
      where: { id },
      include,
    });
  }, `Get ${model} by ID`);
}

/**
 * Create a record with retry logic
 */
export async function createRecord<T>(
  model: string,
  data: Record<string, any>
): Promise<T> {
  return withRetry(async () => {
    return await (prisma as any)[model].create({ data });
  }, `Create ${model}`);
}

/**
 * Update a record with retry logic
 */
export async function updateRecord<T>(
  model: string,
  id: number | string,
  data: Record<string, any>
): Promise<T> {
  return withRetry(async () => {
    return await (prisma as any)[model].update({
      where: { id },
      data,
    });
  }, `Update ${model}`);
}

/**
 * Delete a record with retry logic
 */
export async function deleteRecord<T>(
  model: string,
  id: number | string
): Promise<T> {
  return withRetry(async () => {
    return await (prisma as any)[model].delete({
      where: { id },
    });
  }, `Delete ${model}`);
}

/**
 * Count records with retry logic
 */
export async function countRecords(
  model: string,
  where?: Record<string, any>
): Promise<number> {
  return withRetry(async () => {
    return await (prisma as any)[model].count({ where });
  }, `Count ${model}`);
}

/**
 * Example usage wrapper for common patterns
 */
export const db = {
  // Safe operations with automatic retry
  query: safeQuery,
  transaction: withTransaction,
  batch: batchOperation,
  
  // CRUD operations
  exists: recordExists,
  getById,
  create: createRecord,
  update: updateRecord,
  delete: deleteRecord,
  count: countRecords,
  
  // Direct access to prisma (use with caution)
  prisma,
};

export default db;
