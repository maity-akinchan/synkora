# Prisma + Azure SQL Migration Guide

## The Problem

Azure SQL doesn't support automatic shadow database creation, which Prisma needs for the
`prisma migrate dev` command. This causes the error:

```
Error: P3020
The automatic creation of shadow databases is disabled on Azure SQL.
```

## Solutions

### ✅ **Solution 1: Use `prisma db push` (Recommended for Development)**

Instead of `prisma migrate dev`, use `prisma db push`:

```bash
npx prisma db push
```

**Pros:**

- ✅ Works immediately without setup
- ✅ No shadow database needed
- ✅ Great for development and rapid prototyping
- ✅ Synchronizes your schema with the database

**Cons:**

- ❌ Doesn't create migration files
- ❌ Not ideal for production deployments
- ❌ Can't track migration history

**When to use:**

- During development
- When testing schema changes
- When you don't need migration history

### ✅ **Solution 2: Set Up a Shadow Database (Recommended for Production)**

Create a separate database in Azure SQL to use as a shadow database.

#### Step 1: Create a Shadow Database in Azure

Using Azure Portal or Azure CLI:

```bash
# Using Azure CLI
az sql db create \
  --resource-group <your-resource-group> \
  --server akinc \
  --name Synkora_shadow \
  --service-objective S0
```

Or use the Azure Portal:

1. Go to your Azure SQL Server (`akinc.database.windows.net`)
2. Create a new database called `Synkora_shadow`
3. Use the same pricing tier as your main database

#### Step 2: Add Shadow Database URL to `.env`

Add this to your `.env` file:

```env
AZURESQL_SHADOW_URL="sqlserver://akinc.database.windows.net:1433;database=Synkora_shadow;user=pinguins@akinc;password={oaaaq9es.};encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;"
```

#### Step 3: Update `prisma/schema.prisma`

```prisma
datasource db {
  provider          = "sqlserver"
  url               = env("AZURESQL_URL")
  shadowDatabaseUrl = env("AZURESQL_SHADOW_URL")
}
```

#### Step 4: Run Migrations

```bash
npx prisma migrate dev --name your_migration_name
```

**Pros:**

- ✅ Creates migration files
- ✅ Full migration history
- ✅ Safe for production
- ✅ Proper rollback support

**Cons:**

- ❌ Requires additional database (extra cost)
- ❌ More setup required

### ✅ **Solution 3: Use `prisma migrate deploy` for Production**

For production deployments, use `migrate deploy` which doesn't need a shadow database:

```bash
npx prisma migrate deploy
```

This applies all pending migrations without creating a shadow database.

## Recommended Workflow

### For Development (No Shadow Database)

```bash
# 1. Make schema changes in prisma/schema.prisma
# 2. Push changes to database
npx prisma db push

# 3. Generate Prisma Client
npx prisma generate
```

### For Production (With Shadow Database)

```bash
# 1. Make schema changes in prisma/schema.prisma
# 2. Create migration locally (requires shadow database)
npx prisma migrate dev --name add_new_feature

# 3. Commit migration files to git
git add prisma/migrations
git commit -m "Add new feature migration"

# 4. Deploy to production (no shadow database needed)
npx prisma migrate deploy
```

## Current Setup for This Project

Since you're getting the shadow database error, I recommend:

### **Quick Fix (For Now):**

```bash
# Instead of: npx prisma migrate dev
# Use:
npx prisma db push
npx prisma generate
```

This will:

1. Sync your schema with the database
2. Include the `TeamInvite` table we added for authentication
3. Generate the Prisma Client with updated types

### **For Production Setup:**

1. Create a shadow database in Azure SQL (see Solution 2 above)
2. Add `AZURESQL_SHADOW_URL` to `.env`
3. Uncomment `shadowDatabaseUrl` in `prisma/schema.prisma`
4. Then you can use `npx prisma migrate dev`

## Commands Reference

| Command | Shadow DB Needed? | Use Case |
|---------|-------------------|----------|
| `prisma db push` | ❌ No | Development, quick schema changes |
| `prisma migrate dev` | ✅ Yes | Development with migration history |
| `prisma migrate deploy` | ❌ No | Production deployments |
| `prisma migrate reset` | ✅ Yes | Reset database (development only) |
| `prisma generate` | ❌ No | Generate Prisma Client |

## Applying the Authentication Schema Changes

To apply the authentication fixes (including the `TeamInvite` table):

```bash
# Option A: Quick (no shadow database)
npx prisma db push
npx prisma generate

# Option B: With migrations (requires shadow database setup)
# 1. Set up shadow database first (see Solution 2)
# 2. Then run:
npx prisma migrate dev --name add_authentication_tables
```

## Troubleshooting

### Error: "Connection to database failed"

- Check that your Azure SQL credentials are correct in `.env`
- Verify the database server is accessible
- Check firewall rules in Azure

### Error: "Shadow database already exists"

- This is normal if you've run migrations before
- Prisma will handle it automatically

### Error: "Table already exists"

- Some tables may already exist in your database
- Use `npx prisma db push --accept-data-loss` to force sync (⚠️ warning: this can delete data)
- Or manually drop conflicting tables first

## Summary

**For Development RIGHT NOW:**

```bash
npx prisma db push
npx prisma generate
npm run dev
```

**For Production Later:**

1. Set up shadow database in Azure
2. Add `AZURESQL_SHADOW_URL` to `.env`
3. Update `prisma/schema.prisma` with `shadowDatabaseUrl`
4. Use proper migrations: `npx prisma migrate dev`

## Need Help?

- [Prisma Azure SQL Docs](https://www.prisma.io/docs/concepts/database-connectors/sql-server)
- [Shadow Database Documentation](https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database)
- Check `AUTH_FIXES.md` for authentication schema details
