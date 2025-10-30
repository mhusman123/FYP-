# Authentication Implementation

## Overview

This document describes the authentication system implementation for EduPlatform using NextAuth.js v4 with email/password credentials and optional OAuth providers.

## Features Implemented

### ✅ Core Authentication
- **Email/Password Authentication**: Secure credential-based login with bcrypt password hashing
- **OAuth Providers**: Google and GitHub OAuth integration (optional)
- **Database Integration**: Prisma adapter for session and user management
- **Protected Routes**: Middleware-based route protection for dashboard and related pages
- **Session Management**: JWT-based session strategy for better performance

### ✅ User Interface
- **Sign In Page**: `/auth/signin` - Modern, responsive login interface
- **Sign Up Page**: `/auth/signup` - User registration with role selection (Student/Educator)
- **User Navigation**: Login/logout buttons integrated into navigation components

### ✅ Security Features
- Password hashing with bcrypt (10 rounds)
- JWT token-based sessions
- Protected API routes
- CSRF protection (built-in with NextAuth)
- Secure session storage

## Architecture

### File Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/
│   │       │   └── route.ts          # NextAuth API handler
│   │       └── register/
│   │           └── route.ts          # User registration endpoint
│   └── (auth)/
│       └── auth/
│           ├── signin/
│           │   └── page.tsx          # Sign in page
│           └── signup/
│               └── page.tsx          # Sign up page
├── components/
│   ├── auth-provider.tsx             # Session provider wrapper
│   └── navigation.tsx                # Navigation with logout
├── lib/
│   └── auth.ts                       # NextAuth configuration
└── middleware.ts                     # Route protection middleware

prisma/
└── schema.prisma                     # Database schema (User, Account, Session)
```

### Database Schema

The authentication system uses the following Prisma models:

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?   // For email/password auth
  role          UserRole  @default(STUDENT)
  // ... other fields
  
  accounts      Account[]
  sessions      Session[]
}

model Account {
  // OAuth provider accounts
}

model Session {
  // User sessions
}

model VerificationToken {
  // Email verification tokens
}
```

## Configuration

### Environment Variables

Required variables in `.env`:

```bash
# Database
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-generate-with-openssl"

# Optional OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

### Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

## API Endpoints

### POST `/api/auth/register`

Register a new user with email and password.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "STUDENT" // or "EDUCATOR"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "STUDENT"
  }
}
```

### NextAuth Endpoints

- `GET/POST /api/auth/signin` - Sign in
- `GET/POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session
- `GET /api/auth/providers` - Get available providers
- `GET /api/auth/csrf` - Get CSRF token

## Protected Routes

The following routes are protected by middleware and require authentication:

- `/dashboard/*`
- `/courses/*`
- `/assignments/*`
- `/submissions/*`
- `/leaderboard/*`
- `/badges/*`
- `/grade-requests/*`

Unauthenticated users are redirected to `/auth/signin`.

## Usage Examples

### Client-Side Authentication

```tsx
'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export function MyComponent() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    return (
      <button onClick={() => signIn()}>
        Sign In
      </button>
    )
  }

  return (
    <div>
      <p>Welcome, {session.user.name}!</p>
      <button onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  )
}
```

### Server-Side Authentication

```tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function MyServerComponent() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <div>Not authenticated</div>
  }

  return <div>Welcome, {session.user.name}!</div>
}
```

### API Route Protection

```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Your protected logic here
  return Response.json({ user: session.user })
}
```

## Testing

### Test Script

Run the authentication test script:

```bash
./test-auth.sh
```

This verifies:
- ✅ Database existence
- ✅ Required packages installed
- ✅ Auth files present
- ✅ Environment variables configured

### Manual Testing

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test User Registration:**
   - Navigate to `http://localhost:3000/auth/signup`
   - Fill in the registration form
   - Submit and verify redirect to dashboard

3. **Test User Login:**
   - Navigate to `http://localhost:3000/auth/signin`
   - Enter credentials
   - Verify successful login and redirect

4. **Test Protected Routes:**
   - Try accessing `/dashboard` without authentication
   - Verify redirect to `/auth/signin`

5. **Test Logout:**
   - Click logout button in navigation
   - Verify session is cleared and redirect to home page

### Test Accounts

The signin page includes quick-access test accounts:
- **Student:** `student@eduplatform.edu` (password: `password`)
- **Educator:** `educator@eduplatform.edu` (password: `password`)

Note: These are for demonstration purposes only. You'll need to configure the credentials provider to support these accounts or create them in your database.

## Security Best Practices

### Implemented
- ✅ Password hashing with bcrypt
- ✅ JWT-based sessions
- ✅ CSRF protection
- ✅ Secure cookies (httpOnly, sameSite)
- ✅ Environment variable protection

### Recommended for Production
- [ ] Implement rate limiting on auth endpoints
- [ ] Add email verification
- [ ] Implement password reset flow
- [ ] Enable 2FA (Two-Factor Authentication)
- [ ] Add audit logging for authentication events
- [ ] Implement account lockout after failed attempts
- [ ] Use stronger password requirements
- [ ] Add HTTPS in production (required for secure cookies)

## Troubleshooting

### Common Issues

**Issue:** "NEXTAUTH_SECRET is not defined"
- **Solution:** Add `NEXTAUTH_SECRET` to your `.env` file

**Issue:** "Prisma Client not found"
- **Solution:** Run `npx prisma generate`

**Issue:** "Database does not exist"
- **Solution:** Run `npx prisma migrate dev`

**Issue:** "Invalid email or password"
- **Solution:** Ensure password is hashed in database. Use registration endpoint to create users.

**Issue:** "Session not persisting"
- **Solution:** Check that cookies are enabled in browser and NEXTAUTH_URL matches your domain

## Future Enhancements

- [ ] Email verification system
- [ ] Password reset functionality
- [ ] Social OAuth providers (LinkedIn, Microsoft)
- [ ] Magic link authentication
- [ ] Multi-factor authentication (MFA/2FA)
- [ ] Session management dashboard
- [ ] Login history and device tracking
- [ ] Passwordless authentication options

## Migration Notes

If migrating from an existing auth system:

1. Run the password field migration:
   ```bash
   npx prisma migrate dev --name add_password_to_user
   ```

2. Hash existing passwords:
   ```typescript
   import bcrypt from 'bcryptjs'
   const hashedPassword = await bcrypt.hash(plainPassword, 10)
   ```

3. Update user records with hashed passwords

## References

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [bcryptjs Documentation](https://www.npmjs.com/package/bcryptjs)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

## Support

For issues or questions about the authentication system:
1. Check this documentation
2. Review the test script output
3. Check browser console for errors
4. Review server logs for detailed error messages
