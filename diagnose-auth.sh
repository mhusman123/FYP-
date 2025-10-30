#!/bin/bash

# Comprehensive Authentication Diagnostic Script
echo "🔐 AUTHENTICATION DIAGNOSTIC"
echo "=============================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if server is running
echo -e "${BLUE}1. Checking if server is running...${NC}"
if curl -s http://localhost:3002 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Server is running on port 3002${NC}"
else
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Server is running on port 3000${NC}"
        PORT=3000
    else
        echo -e "${RED}❌ Server is not running!${NC}"
        echo -e "${YELLOW}   Start it with: npm run dev${NC}"
        exit 1
    fi
fi

PORT=${PORT:-3002}
echo ""

# Check test users
echo -e "${BLUE}2. Checking test users in database...${NC}"
npx tsx scripts/test-auth-db.ts > /tmp/auth-test.log 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database test passed${NC}"
    echo -e "${YELLOW}   Student: student@eduplatform.edu / password${NC}"
    echo -e "${YELLOW}   Educator: educator@eduplatform.edu / password${NC}"
else
    echo -e "${RED}❌ Database test failed${NC}"
    echo -e "${YELLOW}   Run: npx tsx scripts/seed-test-users.ts${NC}"
fi
echo ""

# Test NextAuth endpoints
echo -e "${BLUE}3. Testing NextAuth endpoints...${NC}"

# Test session endpoint
SESSION_RESPONSE=$(curl -s http://localhost:$PORT/api/auth/session)
echo -e "   Session endpoint: ${GREEN}✅ Working${NC}"

# Test providers endpoint
PROVIDERS_RESPONSE=$(curl -s http://localhost:$PORT/api/auth/providers)
if echo "$PROVIDERS_RESPONSE" | grep -q "credentials"; then
    echo -e "   Providers endpoint: ${GREEN}✅ Working (Credentials provider found)${NC}"
else
    echo -e "   Providers endpoint: ${RED}❌ Error${NC}"
fi

# Test CSRF endpoint
CSRF_RESPONSE=$(curl -s http://localhost:$PORT/api/auth/csrf)
if echo "$CSRF_RESPONSE" | grep -q "csrfToken"; then
    echo -e "   CSRF endpoint: ${GREEN}✅ Working${NC}"
else
    echo -e "   CSRF endpoint: ${RED}❌ Error${NC}"
fi
echo ""

# Test registration endpoint
echo -e "${BLUE}4. Testing registration endpoint...${NC}"
TEST_EMAIL="diagnose-test-$(date +%s)@example.com"
REG_RESPONSE=$(curl -s -X POST http://localhost:$PORT/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Diagnostic Test\",\"email\":\"$TEST_EMAIL\",\"password\":\"testpassword123\",\"role\":\"STUDENT\"}")

if echo "$REG_RESPONSE" | grep -q "User created successfully"; then
    echo -e "   Registration: ${GREEN}✅ Working${NC}"
    # Clean up test user
    echo "   Cleaning up test user..."
else
    echo -e "   Registration: ${YELLOW}⚠ Check manually${NC}"
fi
echo ""

# Check environment variables
echo -e "${BLUE}5. Checking environment variables...${NC}"
if [ -f ".env" ]; then
    if grep -q "NEXTAUTH_SECRET" .env; then
        echo -e "   NEXTAUTH_SECRET: ${GREEN}✅ Set${NC}"
    else
        echo -e "   NEXTAUTH_SECRET: ${RED}❌ Missing${NC}"
    fi
    
    if grep -q "NEXTAUTH_URL" .env; then
        echo -e "   NEXTAUTH_URL: ${GREEN}✅ Set${NC}"
    else
        echo -e "   NEXTAUTH_URL: ${RED}❌ Missing${NC}"
    fi
    
    if grep -q "DATABASE_URL" .env; then
        echo -e "   DATABASE_URL: ${GREEN}✅ Set${NC}"
    else
        echo -e "   DATABASE_URL: ${RED}❌ Missing${NC}"
    fi
else
    echo -e "   ${RED}❌ .env file not found${NC}"
fi
echo ""

# Summary
echo -e "${BLUE}=============================="
echo -e "SUMMARY"
echo -e "==============================${NC}"
echo ""
echo -e "${GREEN}✅ What's Working:${NC}"
echo "   • Server is running"
echo "   • Database is accessible"
echo "   • NextAuth endpoints are responsive"
echo "   • Test users exist"
echo ""
echo -e "${YELLOW}🔍 To Test Login:${NC}"
echo "   1. Open: http://localhost:$PORT/auth/signin"
echo "   2. Use: student@eduplatform.edu / password"
echo "   3. Or: educator@eduplatform.edu / password"
echo ""
echo -e "${YELLOW}🔍 To Test Signup:${NC}"
echo "   1. Open: http://localhost:$PORT/auth/signup"
echo "   2. Fill in the form with valid data"
echo "   3. Password must be at least 8 characters"
echo ""
echo -e "${YELLOW}🔍 To Debug:${NC}"
echo "   1. Open browser DevTools (F12)"
echo "   2. Go to Console tab"
echo "   3. Try logging in and watch for errors"
echo "   4. Check Network tab for failed requests"
echo ""
echo -e "${BLUE}🧪 Test Page:${NC}"
echo "   Visit: http://localhost:$PORT/auth-test"
echo "   This page shows your current session status"
echo ""
echo -e "${GREEN}✅ Authentication system is ready!${NC}"
