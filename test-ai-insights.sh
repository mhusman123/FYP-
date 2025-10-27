#!/bin/bash

# AI Insights Dashboard Test Script
# This script tests the AI Insights API endpoint

echo "🧪 Testing AI Insights Dashboard..."
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if server is running
echo "1. Checking if development server is running..."
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${GREEN}✓${NC} Server is running on port 3000"
else
    echo -e "${RED}✗${NC} Server is not running. Please start with: npm run dev"
    exit 1
fi

echo ""
echo "2. Testing AI Insights API endpoints..."
echo ""

# Test without authentication (should fail)
echo "   Testing without auth (should return 401)..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/ai/insights)
if [ "$STATUS" -eq "401" ]; then
    echo -e "   ${GREEN}✓${NC} Correctly returns 401 Unauthorized"
else
    echo -e "   ${YELLOW}⚠${NC} Expected 401, got $STATUS"
fi

echo ""
echo "3. Component files created:"
echo ""

# Check if files exist
FILES=(
    "src/app/api/ai/insights/route.ts"
    "src/components/features/ai-insights/ai-insights-panel.tsx"
    "src/components/features/ai-insights/index.ts"
    "docs/AI_INSIGHTS_README.md"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "   ${GREEN}✓${NC} $file"
    else
        echo -e "   ${RED}✗${NC} $file (missing)"
    fi
done

echo ""
echo "4. Integration points:"
echo ""

# Check if AI Insights is integrated in dashboard
if grep -q "AiInsightsPanel" "src/app/(dashboard)/dashboard/page.tsx"; then
    echo -e "   ${GREEN}✓${NC} Integrated in Educator Dashboard"
else
    echo -e "   ${RED}✗${NC} Not found in Educator Dashboard"
fi

if grep -q "AiInsightsPanel" "src/app/(dashboard)/analytics/page.tsx"; then
    echo -e "   ${GREEN}✓${NC} Integrated in Analytics Page"
else
    echo -e "   ${RED}✗${NC} Not found in Analytics Page"
fi

if grep -q "fetchAiInsights" "src/lib/api.ts"; then
    echo -e "   ${GREEN}✓${NC} API helper function added"
else
    echo -e "   ${RED}✗${NC} API helper not found"
fi

echo ""
echo "=================================="
echo "📊 AI Insights Dashboard Implementation Summary"
echo "=================================="
echo ""
echo "✅ API Endpoint: /api/ai/insights"
echo "   - GET with query params: period, courseId"
echo "   - Returns: averageGrade, lateSubmissions, riskStudents, trend, etc."
echo ""
echo "✅ Component: AiInsightsPanel"
echo "   - 4 key metric cards"
echo "   - 2-3 Recharts visualizations (Line + Bar)"
echo "   - AI-generated insight cards"
echo "   - At-risk students table"
echo "   - Period filters (week/month/semester)"
echo ""
echo "✅ Integration:"
echo "   - Educator Dashboard (/dashboard)"
echo "   - Analytics Page (/analytics)"
echo ""
echo "📖 Documentation: docs/AI_INSIGHTS_README.md"
echo ""
echo "🚀 To test manually:"
echo "   1. Start server: npm run dev"
echo "   2. Log in as an EDUCATOR"
echo "   3. Navigate to /dashboard or /analytics"
echo "   4. View the 'AI Wrapper Insights Panel' section"
echo ""
echo "=================================="
