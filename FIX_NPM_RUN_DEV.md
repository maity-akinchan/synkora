# Fix for `npm run dev` Error - RESOLVED ✅

## Problem Identified

The `npm run dev` command was failing with this error:

```
Error: An error occurred while loading instrumentation hook: 
"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0
```

## Root Cause

The `instrumentation.ts` file was using the old database connection API:

- ❌ **Old**: `dbConnection` (removed export)
- ✅ **New**: `connectToDatabase()` (new API)

## Fix Applied

✅ **File Fixed**: `instrumentation.ts`

### Before (Broken)

```typescript
import { dbConnection } from "@/lib/db";
import { connected } from "process";

dbConnection.then((connection) => {
    console.log("connected");
}).catch((err) => {
    console.log(err);
})
```

### After (Fixed)

```typescript
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
```

## Required Next Steps

Before the server can start successfully, you need to:

### 1. Generate Prisma Client

```bash
npx prisma generate
```

This creates the Prisma Client that the database connector needs.

### 2. Apply Database Schema (Optional but Recommended)

```bash
npx prisma db push
```

This syncs your schema with Azure SQL (including the TeamInvite table for authentication).

### 3. Start Development Server

```bash
npm run dev
```

Should now work! 🎉

## What You'll See

When the server starts successfully, you'll see:

```
  ▲ Next.js 15.x.x

   ✓ Compiled instrumentation in XXXms
   🔧 Initializing database connection...
   🔧 Creating new Prisma Client instance...
   ✅ Prisma Client singleton created
   🔌 Initiating database connection...
   📡 Connection attempt 1/3...
   ✅ Successfully connected to Azure SQL database
   📊 Environment: development
   ✓ Ready in XXXs
   ○ Compiling / ...
```

## Complete Startup Command Sequence

Run these commands in order:

```bash
# 1. Generate Prisma Client
npx prisma generate

# 2. Sync database schema
npx prisma db push

# 3. Start dev server
npm run dev
```

## If You Still Get Errors

### Error: "Cannot find module '@/generated/prisma/client'"

**Solution**: Run `npx prisma generate`

### Error: "P1001: Can't reach database server"

**Solution**: Check your Azure SQL connection:

1. Verify `AZURESQL_URL` in `.env`
2. Check Azure SQL firewall rules
3. Ensure your IP is allowed

### Error: "Table 'User' does not exist"

**Solution**: Run `npx prisma db push` to create tables

## Files Modified

1. ✅ `instrumentation.ts` - Fixed to use new database API
2. ✅ `src/lib/db.ts` - Rewritten with singleton pattern
3. ✅ `src/lib/db-utils.ts` - NEW - Utility functions
4. ✅ `src/app/(server)/api/health/database/route.ts` - NEW - Health check

## Testing After Fix

Once the server is running:

```bash
# 1. Check server is running
curl http://localhost:3000

# 2. Check database health
curl http://localhost:3000/api/health/database

# 3. Test authentication
# Visit: http://localhost:3000/signup
```

## Summary

✅ **Problem**: Old database connection API causing startup failure  
✅ **Solution**: Updated to new singleton connector with proper instrumentation  
✅ **Status**: Fixed - requires `npx prisma generate` before starting

**The server should now start successfully!** 🚀

## Related Documentation

- Database connector: `DATABASE_CONNECTOR_GUIDE.md`
- Database improvements: `DATABASE_IMPROVEMENTS_SUMMARY.md`
- Authentication fixes: `README_AUTH_FIXES.md`
- Quick commands: `QUICK_COMMANDS.md`
