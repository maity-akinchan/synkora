# Quick Commands Reference

## 🚀 Start Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

## 🗄️ Database Commands (Azure SQL)

### Apply Schema Changes (Recommended)

```bash
npx prisma db push
npx prisma generate
```

### View Database in Browser

```bash
npx prisma studio
```

### Check Database Health

```bash
# Via API
curl http://localhost:3000/api/health/database

# Or visit in browser:
# http://localhost:3000/api/health/database
```

### Force Database Reconnection
```bash
curl -X POST http://localhost:3000/api/health/database
```

### Reset Database (⚠️ Deletes all data)

```bash
npx prisma db push --force-reset
```

## 🔐 Authentication Testing

### Test Signup

```bash
# Visit: http://localhost:3000/signup
# Create account with:
# - Email: test@example.com
# - Password: password123
```

### Test Login

```bash
# Visit: http://localhost:3000/signin
# Login with credentials from signup
```

### Test Logout

```bash
# Call logout endpoint
curl -X POST http://localhost:3000/api/auth/logout
```

## 📦 Build Commands

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

## 🧪 Testing

### Type Check

```bash
npx tsc --noEmit
```

### Lint

```bash
npm run lint
```

## 🛠️ Common Issues

### Prisma Migration Error (P3020)

**Solution:** Use `npx prisma db push` instead of `npx prisma migrate dev`

See `PRISMA_AZURE_SQL_GUIDE.md` for details.

### Database Connection Issues

**Solution:** Check database health and reconnect if needed

```bash
# Check health
curl http://localhost:3000/api/health/database

# Force reconnection
curl -X POST http://localhost:3000/api/health/database
```

### Build Permission Error (Windows)
**Solution:** Try running terminal as administrator or close other applications using the files.

### Port Already in Use

```bash
# Kill process on port 3000 (Windows PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Then restart
npm run dev
```

## 📝 Project Structure

```
Synkora/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (server)/api/      # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   └── health/        # Health check endpoints
│   │   ├── (general)/         # Public pages (login, signup)
│   │   └── (main)/            # Protected pages
│   ├── components/            # React components
│   ├── lib/
│   │   ├── commons/          # Client-side utilities (auth, etc.)
│   │   ├── controllers/      # Server-side controllers
│   │   ├── models/           # Database models
│   │   ├── utils/            # Server-side utilities
│   │   ├── db.ts             # Database connector (singleton)
│   │   └── db-utils.ts       # Database utility functions
│   └── generated/prisma/     # Prisma Client
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── migrations/           # Migration files
└── public/                   # Static assets
```

## 🔗 Useful Links

- **Main Docs**: `README.md`
- **Auth Fixes**: `README_AUTH_FIXES.md`
- **Auth Quick Start**: `AUTH_QUICK_START.md`
- **Prisma Guide**: `PRISMA_AZURE_SQL_GUIDE.md`
- **Database Connector**: `DATABASE_CONNECTOR_GUIDE.md`

## 🎯 Next Steps After Setup

1. ✅ Run `npx prisma db push` to sync database
2. ✅ Run `npx prisma generate` to generate Prisma Client
3. ✅ Run `npm run dev` to start development server
4. ✅ Test authentication at `/signup` and `/signin`
5. ✅ Check database health at `/api/health/database`
6. ✅ Check that cookies are being set in browser DevTools

## 🔍 Monitoring

### Check Database Status

```bash
# Get detailed status
curl http://localhost:3000/api/health/database

# Expected response:
{
  "success": true,
  "status": "healthy",
  "connected": true,
  "environment": "development",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### View Server Logs

The database connector provides detailed console logs:

- 🔧 Connection creation
- ✅ Connection success
- ⏳ Retry attempts
- ❌ Error details
- 📊 Health check results
