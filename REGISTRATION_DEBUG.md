# 🛠️ Registration Error - Troubleshooting Guide

## Current Status

I've improved the error handling to give you more specific error messages. The registration system is working (as proven by previous successful registrations), but you're seeing a generic error message.

## What I Fixed

### 1. Enhanced Error Messages ✅
- Added detailed console logging to track each step
- Shows specific error messages from the server
- Displays JSON parsing errors separately
- Better feedback when registration succeeds but login fails

### 2. Created Test Pages ✅

#### Registration Test Tool
**URL:** http://localhost:3003/registration-test

This page allows you to:
- Test registration without using the main signup form
- See the exact API response
- View detailed error messages
- Quick-fill test data with one click

#### Auth Test Page  
**URL:** http://localhost:3003/auth-test

This page shows:
- Current login status
- Session information
- Quick links to signin/signup

## How to Debug Your Registration Issue

### Step 1: Use the Registration Test Tool

1. Open: http://localhost:3003/registration-test
2. Click "Fill with Test Data" (generates unique email)
3. Click "Test Registration"
4. Check the result on the page

**This will show you:**
- Exact HTTP status code
- Full API response
- Specific error message
- Whether it's a network, validation, or database error

### Step 2: Check Browser Console

1. Open the signup page: http://localhost:3003/auth/signup
2. Open DevTools (F12)
3. Go to Console tab
4. Try to register
5. Look for these messages:
   - "Starting registration..." - Form submitted
   - "Registration response status: XXX" - Got response
   - "Registration successful" - Account created
   - Any error messages in red

### Step 3: Check Server Logs

Look at your terminal where `npm run dev` is running for:
```
Registration attempt: { email: '...', ... }
Hashing password...
User created successfully: ...
```

Or errors like:
```
Registration error: ...
```

## Common Registration Errors

### Error: "Email already exists"
**Cause:** You're trying to register with an email that's already in the database
**Fix:** 
- Use a different email
- Or check existing users: `npx tsx scripts/check-user.ts YOUR_EMAIL`

### Error: "Password must be at least 8 characters"
**Cause:** Password is too short
**Fix:** Use a password with 8+ characters

### Error: "Invalid email format"
**Cause:** Email doesn't match email pattern
**Fix:** Use a valid email format (example@domain.com)

### Error: "An unexpected error occurred"
**Cause:** Could be many things
**Fix:** Check browser console for details

### Error: "Server error"
**Cause:** API returned invalid JSON
**Fix:** Check if server is running, restart if needed

## Testing Commands

```bash
# Check if a user exists
npx tsx scripts/check-user.ts email@example.com

# Test database authentication
npx tsx scripts/test-auth-db.ts

# Reset a password
npx tsx scripts/reset-password.ts email@example.com newpassword

# Full diagnostic
./diagnose-auth.sh
```

## Quick Test

Try this to verify registration is working:

```bash
# Test registration via command line
curl -X POST http://localhost:3003/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "CLI Test User",
    "email": "clitest'$(date +%s)'@example.com",
    "password": "testpassword123",
    "role": "STUDENT"
  }'
```

**Expected output:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "...",
    "name": "CLI Test User",
    "email": "clitest...@example.com",
    "role": "STUDENT"
  }
}
```

## Server URLs

Your server is currently on port **3003**:
- Main: http://localhost:3003
- Sign Up: http://localhost:3003/auth/signup
- Registration Test: http://localhost:3003/registration-test
- Auth Test: http://localhost:3003/auth-test

## Next Steps

1. **Open the Registration Test page** and try registering there first
2. **Check the browser console** for detailed error messages
3. **Check the server logs** in your terminal
4. **Report back with**:
   - The exact error message you see
   - What shows in browser console
   - What shows in server logs

## If Registration Works on Test Page But Not Signup Page

This would indicate an issue with the signup form itself, not the API. In that case:
1. Clear browser cache
2. Try in incognito/private mode
3. Check if JavaScript is enabled
4. Check for any browser extensions blocking requests

---

**The registration API is working.** We just need to see the specific error message to understand what's happening in your case.
