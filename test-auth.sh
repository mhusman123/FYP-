#!/bin/bash

# Test Authentication Setup Script
echo "🔐 Testing Authentication Setup..."
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if database exists
echo "1. Checking database..."
if [ -f "./prisma/dev.db" ]; then
    echo -e "${GREEN}✓ Database exists${NC}"
else
    echo -e "${RED}✗ Database not found${NC}"
    echo "   Run: npx prisma migrate dev"
    exit 1
fi

# Check if required packages are installed
echo ""
echo "2. Checking required packages..."
if grep -q "next-auth" package.json; then
    echo -e "${GREEN}✓ next-auth installed${NC}"
else
    echo -e "${RED}✗ next-auth not found${NC}"
    exit 1
fi

if grep -q "bcryptjs" package.json; then
    echo -e "${GREEN}✓ bcryptjs installed${NC}"
else
    echo -e "${RED}✗ bcryptjs not found${NC}"
    exit 1
fi

if grep -q "@auth/prisma-adapter" package.json || grep -q "@next-auth/prisma-adapter" package.json; then
    echo -e "${GREEN}✓ Prisma adapter installed${NC}"
else
    echo -e "${RED}✗ Prisma adapter not found${NC}"
    exit 1
fi

# Check if auth files exist
echo ""
echo "3. Checking auth files..."
files=(
    "src/app/api/auth/[...nextauth]/route.ts"
    "src/app/api/auth/register/route.ts"
    "src/lib/auth.ts"
    "src/app/(auth)/auth/signin/page.tsx"
    "src/app/(auth)/auth/signup/page.tsx"
    "middleware.ts"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ $file${NC}"
    else
        echo -e "${RED}✗ $file not found${NC}"
    fi
done

# Check environment variables
echo ""
echo "4. Checking environment variables..."
if [ -f ".env" ]; then
    if grep -q "NEXTAUTH_SECRET" .env; then
        echo -e "${GREEN}✓ NEXTAUTH_SECRET configured${NC}"
    else
        echo -e "${YELLOW}⚠ NEXTAUTH_SECRET not found in .env${NC}"
        echo "   Add: NEXTAUTH_SECRET=\"$(openssl rand -base64 32)\""
    fi
    
    if grep -q "NEXTAUTH_URL" .env; then
        echo -e "${GREEN}✓ NEXTAUTH_URL configured${NC}"
    else
        echo -e "${YELLOW}⚠ NEXTAUTH_URL not found in .env${NC}"
        echo "   Add: NEXTAUTH_URL=\"http://localhost:3000\""
    fi
else
    echo -e "${YELLOW}⚠ .env file not found${NC}"
    echo "   Create .env file based on .env.example"
fi

echo ""
echo "5. Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Authentication Features:"
echo "  • Email/Password authentication"
echo "  • Google OAuth (optional)"
echo "  • GitHub OAuth (optional)"
echo "  • Protected dashboard routes"
echo "  • Login/Signup pages"
echo "  • User session management"
echo ""
echo "To test the authentication:"
echo "  1. npm run dev"
echo "  2. Navigate to http://localhost:3000"
echo "  3. Click 'Sign Up' to create a new account"
echo "  4. Or use the test accounts on the signin page"
echo ""
echo "Available routes:"
echo "  • /auth/signin - Sign in page"
echo "  • /auth/signup - Sign up page"
echo "  • /dashboard - Protected dashboard (requires auth)"
echo ""
echo -e "${GREEN}✓ Authentication setup complete!${NC}"
