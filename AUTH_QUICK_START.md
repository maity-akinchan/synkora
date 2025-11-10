# Authentication Quick Start Guide

## For Developers: How to Use Authentication

### 🔐 Client-Side (React Components)

#### Check if User is Logged In

```typescript
import { isAuthenticated, getCurrentUser } from "@/lib/commons/auth";

function MyComponent() {
  if (!isAuthenticated()) {
    return <LoginPrompt />;
  }
  
  const user = getCurrentUser();
  return <div>Welcome, {user?.fullName}!</div>;
}
```

#### Login Form

```typescript
import { onLogin } from "@/lib/commons/auth";
import { useState } from "react";

function LoginForm() {
  const [errorState, setErrorState] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await onLogin(e, setErrorState, setErrorMessage);
    // Redirects to /dashboard on success automatically
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorState === 1 && <div className="error">{errorMessage}</div>}
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Login</button>
    </form>
  );
}
```

#### Signup Form

```typescript
import { onSignup } from "@/lib/commons/auth";
import { useState } from "react";

function SignupForm() {
  const [errorState, setErrorState] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await onSignup(e, setErrorState, setErrorMessage);
    // Redirects to /signin on success automatically
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorState === 1 && <div className="error">{errorMessage}</div>}
      <input name="firstName" required />
      <input name="lastName" required />
      <input name="email" type="email" required />
      <input name="password" type="password" minLength={8} required />
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

#### Logout Button

```typescript
import { onLogout } from "@/lib/commons/auth";

function LogoutButton() {
  return (
    <button onClick={() => onLogout()}>
      Logout
    </button>
  );
}
```

### 🔒 Server-Side (API Routes)

#### Protected API Route

```typescript
import { getAuthUserId } from "@/lib/utils/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Check authentication
  const userId = await getAuthUserId();
  
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  
  // User is authenticated, proceed with logic
  const data = await req.json();
  // ... your code here
  
  return NextResponse.json({ success: true });
}
```

#### Get Current User in Server Component

```typescript
import { getAuthUserId } from "@/lib/utils/auth";
import { getUserById } from "@/lib/models/user";

export default async function ServerComponent() {
  const userId = await getAuthUserId();
  
  if (!userId) {
    return <div>Please login</div>;
  }
  
  const user = await getUserById(userId);
  return <div>Welcome, {user.fullName}!</div>;
}
```

## 📝 API Endpoints

### Authentication

- `POST /api/auth/signup` - Create account
  ```json
  {
    "email": "user@example.com",
    "username": "user@example.com",
    "name": "John Doe",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login
  ```json
  {
    "username": "user@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/logout` - Logout (no body required)

### Response Format

Success:

```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": { "id": 1, "email": "...", "fullName": "..." }
}
```

Error:

```json
{
  "success": false,
  "message": "Error description"
}
```

## 🚀 Common Patterns

### Protected Page

```typescript
"use client"
import { isAuthenticated } from "@/lib/commons/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage() {
  const router = useRouter();
  
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/signin');
    }
  }, [router]);
  
  if (!isAuthenticated()) {
    return <div>Redirecting...</div>;
  }
  
  return <div>Protected content</div>;
}
```

### Conditional Navigation

```typescript
import { isAuthenticated } from "@/lib/commons/auth";
import Link from "next/link";

function Navigation() {
  const loggedIn = isAuthenticated();
  
  return (
    <nav>
      <Link href="/">Home</Link>
      {loggedIn ? (
        <>
          <Link href="/dashboard">Dashboard</Link>
          <LogoutButton />
        </>
      ) : (
        <>
          <Link href="/signin">Sign In</Link>
          <Link href="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}
```

## ⚙️ Configuration

### Environment Variables (.env)

```env
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
AZURESQL_URL="your-database-connection-string"
NODE_ENV="development"  # or "production"
```

### Cookie Settings

Cookies are automatically configured:

- **Development**: `secure: false` (works with HTTP)
- **Production**: `secure: true` (requires HTTPS)
- **Expiration**: 24 hours
- **HttpOnly**: Token cookie only (user cookie is readable client-side)

## 🔧 Troubleshooting

### "Unauthorized" errors

- User needs to login again
- Token may have expired (24h)
- Check that cookies are being sent: `credentials: 'include'`

### Redirects not working

- Check that target route exists (e.g., `/dashboard`)
- Verify no middleware is intercepting

### Cookies not setting

- In production, ensure HTTPS is enabled
- Check browser console for cookie warnings
- Verify domain settings

## 📚 More Information

See `AUTH_FIXES.md` for detailed documentation of all authentication fixes and features.
