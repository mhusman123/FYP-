# Authentication Troubleshooting Guide

## Current Status

✅ Database test passed - Test users exist with correct passwords
✅ Password hashing working correctly
✅ Development server running on port 3002

## Test Your Authentication

### 1. Test Login
Navigate to: http://localhost:3002/auth/signin

Use these credentials:
- **Email:** student@eduplatform.edu
- **Password:** password

OR

- **Email:** educator@eduplatform.edu
- **Password:** password

### 2. Test Registration
Navigate to: http://localhost:3002/auth/signup

Create a new account with:
- Name: Your Name
- Email: your@email.com
- Password: yourpassword (min 8 characters)
- Role: Student or Educator

### 3. Check for Errors

**In Browser Console (F12):**
Look for any JavaScript errors or network errors

**In Server Logs:**
Check the terminal where `npm run dev` is running for any error messages

## Common Issues & Solutions

### Issue 1: "CredentialsSignin" Error
**Solution:** This usually means the email/password combination is incorrect.
- Verify you're using the correct test account credentials
- Make sure caps lock is off
- Try copying and pasting the credentials

### Issue 2: "Configuration" Error
**Solution:** Check environment variables
```bash
# Verify these are set in .env:
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3002"
DATABASE_URL="file:./dev.db"
```

### Issue 3: "Database" Error
**Solution:** Regenerate Prisma client
```bash
npx prisma generate
npx prisma db push
```

### Issue 4: Session Not Persisting
**Solution:** Clear browser cookies and try again
- Open DevTools (F12)
- Go to Application > Cookies
- Delete all cookies for localhost
- Try logging in again

### Issue 5: Redirect Loop
**Solution:** Check middleware configuration
- Ensure `/auth/*` routes are not protected
- Verify `NEXTAUTH_URL` matches your server URL

## Debug Steps

### Step 1: Check if API route is working
```bash
curl -X POST http://localhost:3002/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "testpassword123",
    "role": "STUDENT"
  }'
```

Expected response: User created successfully

### Step 2: Check NextAuth session endpoint
```bash
curl http://localhost:3002/api/auth/session
```

Expected response: 
- If not logged in: `{}`
- If logged in: `{"user": {...}}`

### Step 3: Check if signin endpoint works
Open in browser: http://localhost:3002/api/auth/signin

Should show NextAuth signin page or redirect

### Step 4: Enable debug mode
Already enabled! Check server console for detailed logs.

## What to Report

If you're still experiencing issues, please provide:

1. **Exact error message** (from browser console or server logs)
2. **URL you're trying to access**
3. **Steps to reproduce** the error
4. **Screenshots** if helpful

## Quick Fixes Applied

✅ Removed Prisma adapter (conflicted with JWT strategy)
✅ Added debug logging to authorization function
✅ Fixed JWT token handling
✅ Added better error handling
✅ Verified test users exist and passwords work

## Next Steps

1. Open http://localhost:3002/auth/signin in your browser
2. Try logging in with test credentials
3. If you see an error, check:
   - Browser console (F12)
   - Server terminal output
   - Network tab in DevTools

## Server URLs

- Development Server: http://localhost:3002
- Sign In: http://localhost:3002/auth/signin
- Sign Up: http://localhost:3002/auth/signup
- Dashboard: http://localhost:3002/dashboard
- API: http://localhost:3002/api/auth/*

## Test Commands

```bash
# Test database
npx tsx scripts/test-auth-db.ts

# Seed test users
npx tsx scripts/seed-test-users.ts

# Check auth setup
./test-auth.sh

# View database
npx prisma studio
```

---

**Note:** Port 3000 was in use, so the server is running on **port 3002** instead.
