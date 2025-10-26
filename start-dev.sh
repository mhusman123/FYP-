#!/bin/bash

# AI Mentor Chatbot - Development Server Startup Script

echo "🚀 Starting EduPlatform Development Server..."
echo ""

# Navigate to project directory
cd "$(dirname "$0")"

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  Warning: .env.local not found!"
    echo "📝 Creating .env.local from .env.example..."
    
    if [ -f .env.example ]; then
        cp .env.example .env.local
        echo "✅ Created .env.local"
        echo ""
        echo "⚠️  IMPORTANT: Add your OPENAI_API_KEY to .env.local"
        echo "   Get your key from: https://platform.openai.com/api-keys"
        echo ""
    else
        echo "❌ Error: .env.example not found!"
        exit 1
    fi
fi

# Check if Prisma client is generated
if [ ! -d "node_modules/@prisma/client" ]; then
    echo "📦 Generating Prisma client..."
    npx prisma generate
    echo ""
fi

# Check if database is up to date
echo "🗄️  Checking database..."
npx prisma db push --accept-data-loss 2>/dev/null

echo ""
echo "✨ Starting Next.js development server..."
echo "📍 URL: http://localhost:3000"
echo "🤖 AI Mentor: Click the bot button (bottom-right) after signing in"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start development server
npm run dev
