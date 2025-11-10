# Database Connector Guide - Failsafe & Singleton

## Overview

The database connector has been completely rewritten with enterprise-grade reliability features:

- ✅ **Singleton Pattern** - Prevents duplicate Prisma Client instances
- ✅ **Automatic Reconnection** - Recovers from connection losses
- ✅ **Retry Logic** - Retries failed operations automatically
- ✅ **Health Checks** - Monitor database connection health
- ✅ **Graceful Shutdown** - Clean disconnection on process exit
- ✅ **Connection Pooling** - Optimized for Azure SQL
- ✅ **Error Handling** - Comprehensive error recovery

## Key Features

### 🔒 Singleton Pattern

The connector ensures **only ONE** Prisma Client instance exists across your entire application:

```typescript
import { prisma } from '@/lib/db';

// This will ALWAYS return the same instance
// Safe to import in multiple files
```

**Benefits:**

- Prevents "Too many connections" errors
- Optimizes memory usage
- Ensures consistent connection pool
- Works correctly with Next.js hot reload

### 🔄 Auto-Reconnection

If the database connection drops, it automatically reconnects:

```typescript
import { ensureConnection } from '@/lib/db';

// Before critical operations
await ensureConnection();
// Connection is now guaranteed to be healthy
```

### 🔁 Retry Logic

Failed operations are automatically retried with exponential backoff:

```typescript
import { withRetry } from '@/lib/db-utils';

// Automatically retries on transient errors
const user = await withRetry(
  () => prisma.user.findUnique({ where: { id: 1 } }),
  'Get user by ID'
);
```

### ❤️ Health Checks

Monitor database health in real-time:

```typescript
import { isDatabaseHealthy, getConnectionStatus } from '@/lib/db';

// Check if database is healthy
const healthy = await isDatabaseHealthy();

// Get detailed status
const status = getConnectionStatus();
console.log(status);
// { connected: true, hasClient: true, environment: 'development' }
```

## Usage Examples

### Basic Usage

```typescript
import { prisma } from '@/lib/db';

// Simple query
const users = await prisma.user.findMany();

// Create record
const newUser = await prisma.user.create({
  data: {
    email: 'user@example.com',
    username: 'user',
    fullName: 'John Doe',
    hashedPassword: 'hashed_password',
    avatarUrl: '',
  },
});
```

### Safe Queries with Retry

```typescript
import { db } from '@/lib/db-utils';

// Automatically retries on connection errors
const user = await db.query(
  () => prisma.user.findUnique({ where: { id: userId } }),
  'Get user by ID'
);
```

### Transactions with Retry

```typescript
import { withTransaction } from '@/lib/db-utils';

const result = await withTransaction(async (tx) => {
  // All operations in this block are part of the same transaction
  const user = await tx.user.create({
    data: { /* ... */ },
  });
  
  const team = await tx.team.create({
    data: { /* ... */ },
  });
  
  return { user, team };
}, 'Create user and team');
```

### Batch Operations

```typescript
import { batchOperation } from '@/lib/db-utils';

const userIds = [1, 2, 3, 4, 5, /* ... 1000 ids */];

// Processes in batches of 50 (configurable)
const users = await batchOperation(
  userIds,
  (id) => prisma.user.findUnique({ where: { id } }),
  { batchSize: 50, operationName: 'Load users' }
);
```

### CRUD Helper Functions

```typescript
import { db } from '@/lib/db-utils';

// Check if record exists
const exists = await db.exists('user', { email: 'test@example.com' });

// Get by ID
const user = await db.getById('user', 1);

// Create record
const newUser = await db.create('user', {
  email: 'new@example.com',
  username: 'newuser',
  fullName: 'New User',
  hashedPassword: 'hashed',
  avatarUrl: '',
});

// Update record
const updated = await db.update('user', 1, {
  fullName: 'Updated Name',
});

// Delete record
await db.delete('user', 1);

// Count records
const count = await db.count('user', { email: { contains: '@example.com' } });
```

## API Routes Example

### Protected Route with Health Check

```typescript
import { NextResponse } from 'next/server';
import { getAuthUserId } from '@/lib/utils/auth';
import { ensureConnection } from '@/lib/db';
import { withRetry } from '@/lib/db-utils';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  // 1. Check authentication
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 2. Ensure database connection is healthy
    await ensureConnection();

    // 3. Execute query with automatic retry
    const user = await withRetry(
      () => prisma.user.findUnique({
        where: { id: userId },
        include: { teams: true },
      }),
      'Get user with teams'
    );

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## Health Check Endpoint

### Check Database Health

```bash
# GET - Check if database is healthy
curl http://localhost:3000/api/health/database

# Response:
{
  "success": true,
  "status": "healthy",
  "connected": true,
  "environment": "development",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Force Reconnection

```bash
# POST - Force reconnection attempt
curl -X POST http://localhost:3000/api/health/database

# Response:
{
  "success": true,
  "message": "Database connection restored",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Configuration

### Connection Settings

Edit `src/lib/db.ts` to adjust connection parameters:

```typescript
const CONNECTION_CONFIG = {
  maxRetries: 3,           // Number of connection retries
  retryDelay: 2000,        // Delay between retries (ms)
  connectionTimeout: 10000, // Connection timeout (ms)
  queryTimeout: 30000,     // Query timeout (ms)
};
```

### Retry Settings

Edit `src/lib/db-utils.ts` to adjust retry behavior:

```typescript
const RETRY_CONFIG = {
  maxRetries: 2,     // Number of operation retries
  retryDelay: 1000,  // Delay between retries (ms)
  retryableErrors: [
    'P2024', // Timed out fetching a new connection
    'P2025', // Connection pool timeout
    'P1001', // Can't reach database server
    // ... more error codes
  ],
};
```

## Monitoring

### Console Logs

The connector provides detailed console logs:

```
🔧 Creating new Prisma Client instance...
✅ Prisma Client singleton created
🔌 Initiating database connection...
📡 Connection attempt 1/3...
✅ Successfully connected to Azure SQL database
📊 Environment: development
```

### Error Logs

Failed operations are logged with context:

```
❌ Connection attempt 1 failed: Connection timeout
⏳ Retrying in 2 seconds...
📡 Connection attempt 2/3...
✅ Successfully connected to Azure SQL database
```

## Best Practices

### 1. Always Use the Singleton

```typescript
// ✅ GOOD - Use the exported singleton
import { prisma } from '@/lib/db';

// ❌ BAD - Don't create new instances
import { PrismaClient } from '@/generated/prisma/client';
const prisma = new PrismaClient(); // DON'T DO THIS
```

### 2. Use Retry Logic for Critical Operations

```typescript
// ✅ GOOD - Automatic retry on transient errors
import { withRetry } from '@/lib/db-utils';
const result = await withRetry(() => prisma.user.findMany());

// ⚠️ ACCEPTABLE - Direct query (no retry)
const result = await prisma.user.findMany();
```

### 3. Check Connection Health

```typescript
// ✅ GOOD - Ensure connection before critical operations
import { ensureConnection } from '@/lib/db';

await ensureConnection();
// Now safe to perform critical operations
```

### 4. Use Transactions for Related Operations

```typescript
// ✅ GOOD - Use transactions for multiple related operations
import { withTransaction } from '@/lib/db-utils';

await withTransaction(async (tx) => {
  await tx.user.update({ /* ... */ });
  await tx.team.update({ /* ... */ });
});

// ❌ BAD - Separate operations (not atomic)
await prisma.user.update({ /* ... */ });
await prisma.team.update({ /* ... */ });
```

### 5. Use Batch Operations for Multiple Items

```typescript
// ✅ GOOD - Process in batches
import { batchOperation } from '@/lib/db-utils';

await batchOperation(
  items,
  (item) => processItem(item),
  { batchSize: 50 }
);

// ❌ BAD - Process all at once (can overwhelm database)
await Promise.all(items.map(processItem));
```

## Troubleshooting

### Connection Issues

**Problem:** "Can't reach database server"

**Solutions:**

1. Check Azure SQL firewall rules
2. Verify connection string in `.env`
3. Check if database server is running
4. Verify network connectivity

```bash
# Test connection manually
npx prisma db push
```

### Too Many Connections

**Problem:** "Too many connections"

**Solution:** This should NOT happen with the singleton pattern. If it does:

1. Check for multiple Prisma Client instances:
   ```bash
   # Search for new PrismaClient()
   grep -r "new PrismaClient" src/
   ```

2. Ensure you're using the singleton:
   ```typescript
   import { prisma } from '@/lib/db';
   ```

### Connection Timeouts

**Problem:** Queries timing out

**Solutions:**

1. Increase timeout in `CONNECTION_CONFIG`
2. Optimize slow queries
3. Add indexes to frequently queried fields
4. Use pagination for large result sets

### Memory Leaks

**Problem:** Memory usage growing over time

**Solution:** The connector handles this automatically with:

- Singleton pattern (one instance only)
- Automatic cleanup on process exit
- Connection pooling management

## Testing

### Test Database Connection

```typescript
import { connectToDatabase, isDatabaseHealthy } from '@/lib/db';

// Test connection
await connectToDatabase();

// Check health
const healthy = await isDatabaseHealthy();
console.log('Database healthy:', healthy);
```

### Test Retry Logic

```typescript
import { withRetry } from '@/lib/db-utils';

// This will retry automatically on transient errors
const result = await withRetry(
  () => yourDatabaseOperation(),
  'Test operation'
);
```

## Migration from Old Connector

If you have existing code using the old connector:

### Before (Old Code)

```typescript
import { prisma, connectToDatabase } from '@/lib/db';

// Had to manually call connect
await connectToDatabase();

// Direct queries (no retry)
const users = await prisma.user.findMany();
```

### After (New Code)

```typescript
import { prisma } from '@/lib/db';
import { withRetry, ensureConnection } from '@/lib/db-utils';

// Auto-connects in development, or manually ensure connection
await ensureConnection();

// With automatic retry
const users = await withRetry(
  () => prisma.user.findMany(),
  'Get all users'
);
```

## Summary

The new database connector is:

- ✅ **Singleton** - Only one instance ever exists
- ✅ **Failsafe** - Automatic retry and reconnection
- ✅ **Production-Ready** - Handles errors gracefully
- ✅ **Well-Monitored** - Health checks and logging
- ✅ **Optimized** - Connection pooling and batch operations

**Your database operations are now bulletproof!** 🛡️

## Quick Reference

```typescript
// Import the connector
import { prisma } from '@/lib/db';
import { db, withRetry, ensureConnection } from '@/lib/db-utils';

// Ensure connection
await ensureConnection();

// Basic query with retry
const users = await withRetry(() => prisma.user.findMany());

// Transaction with retry
await db.transaction(async (tx) => {
  // Your transaction code
});

// Health check
const healthy = await isDatabaseHealthy();
```
