#!/bin/bash

# Quick Authentication Test Script
echo "🔐 Quick Auth Test"
echo "=================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get email from user
echo -e "${BLUE}Enter email to test:${NC}"
read EMAIL

# Check if user exists
echo ""
echo -e "${YELLOW}Checking if user exists...${NC}"
npx tsx scripts/check-user.ts "$EMAIL"

echo ""
echo -e "${GREEN}Test Options:${NC}"
echo "1. Test login in browser: http://localhost:3002/auth/signin"
echo "2. Create new account: http://localhost:3002/auth/signup"
echo "3. Check another email: ./scripts/quick-auth-test.sh"
echo ""
echo "Test Accounts:"
echo "  • student@eduplatform.edu / password"
echo "  • educator@eduplatform.edu / password"
