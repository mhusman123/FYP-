#!/bin/bash

# Test AI Mentor API endpoints

echo "🧪 Testing AI Mentor Chatbot API..."
echo ""

BASE_URL="http://localhost:3000"

echo "1️⃣ Testing Health Check (should get 401 - unauthorized, which is correct)"
curl -s -X GET "$BASE_URL/api/ai/chat" | head -c 100
echo ""
echo ""

echo "2️⃣ Testing POST endpoint (should also get 401)"
curl -s -X POST "$BASE_URL/api/ai/chat" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"test"}' | head -c 100
echo ""
echo ""

echo "✅ If you see 401/Unauthorized errors above, the API is working!"
echo "   (It requires authentication, so 401 is the expected response)"
echo ""
echo "📝 To test fully:"
echo "   1. Sign in at: $BASE_URL/auth/signin"
echo "   2. Click the bot button (bottom-right)"
echo "   3. Send a message in the chat"
echo ""
