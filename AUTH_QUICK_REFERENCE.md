# 🔐 Authentication Quick Reference

## Quick Start

### 1. Start the Server
```bash
npm run dev
```

### 2. Test Accounts
| Email | Password | Role |
|-------|----------|------|
| student@eduplatform.edu | password | STUDENT |
| educator@eduplatform.edu | password | EDUCATOR |

### 3. Key URLs
- **Sign In:** http://localhost:3000/auth/signin
- **Sign Up:** http://localhost:3000/auth/signup
- **Dashboard:** http://localhost:3000/dashboard (protected)

## Common Tasks

### Register a New User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword",
    "role": "STUDENT"
  }'
```

### Check Current Session
```tsx
import { useSession } from 'next-auth/react'

const { data: session } = useSession()
console.log(session?.user)
```

### Sign Out
```tsx
import { signOut } from 'next-auth/react'

signOut({ callbackUrl: '/' })
```

## Code Snippets

### Client Component with Auth
```tsx
'use client'
import { useSession } from 'next-auth/react'

export function MyComponent() {
  const { data: session } = useSession()
  
  return <div>Hello {session?.user?.name}</div>
}
```

### Server Component with Auth
```tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function Page() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return <div>Not authenticated</div>
  }
  
  return <div>Hello {session.user.name}</div>
}
```

### Protected API Route
```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  return Response.json({ data: 'protected' })
}
```

## File Locations

| Purpose | File Path |
|---------|-----------|
| Auth Config | `src/lib/auth.ts` |
| Sign In Page | `src/app/(auth)/auth/signin/page.tsx` |
| Sign Up Page | `src/app/(auth)/auth/signup/page.tsx` |
| Register API | `src/app/api/auth/register/route.ts` |
| NextAuth API | `src/app/api/auth/[...nextauth]/route.ts` |
| Middleware | `middleware.ts` |
| Provider | `src/components/auth-provider.tsx` |

## Environment Variables

```bash
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<generate-with-openssl>"

# Optional OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_ID="..."
GITHUB_SECRET="..."
```

**Generate Secret:**
```bash
openssl rand -base64 32
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't sign in | Run `./test-auth.sh` to verify setup |
| Password incorrect | Passwords must be hashed with bcrypt |
| Session not persisting | Check NEXTAUTH_URL and cookies enabled |
| Redirect loop | Verify middleware config and session strategy |
| Prisma errors | Run `npx prisma generate` |

## Testing Checklist

- [ ] Test script passes: `./test-auth.sh`
- [ ] Can register new user
- [ ] Can sign in with email/password
- [ ] Dashboard requires authentication
- [ ] Can sign out successfully
- [ ] Protected routes redirect to signin
- [ ] Session persists on page reload

## Protected Routes

All routes under these paths require authentication:
- `/dashboard/*`
- `/courses/*`
- `/assignments/*`
- `/submissions/*`
- `/leaderboard/*`
- `/badges/*`
- `/grade-requests/*`

## Useful Commands

```bash
# Test authentication
./test-auth.sh

# Seed test users
npx tsx scripts/seed-test-users.ts

# Generate Prisma client
npx prisma generate

# View database
npx prisma studio

# Create migration
npx prisma migrate dev --name your_migration_name
```

## Support

📖 See `AUTHENTICATION_GUIDE.md` for full documentation
🧪 Run `./test-auth.sh` for system verification
🐛 Check browser console and server logs for errors
