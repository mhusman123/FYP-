#!/bin/bash

# API Testing Script for EduPlatform
# This script tests all major API endpoints

BASE_URL="http://localhost:3000"
API_URL="${BASE_URL}/api"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to print test result
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ PASSED${NC}: $2"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAILED${NC}: $2"
        ((FAILED++))
    fi
}

# Function to test endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local expected_status=$4
    local description=$5
    
    echo -e "\n${YELLOW}Testing:${NC} $description"
    
    if [ -z "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" -X "$method" "$API_URL$endpoint" \
            -H "Content-Type: application/json" \
            -b cookies.txt)
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" "$API_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data" \
            -b cookies.txt)
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [ "$http_code" -eq "$expected_status" ]; then
        print_result 0 "$method $endpoint (Status: $http_code)"
        echo "Response: $(echo $body | jq -r '.message // .error // "Success"' 2>/dev/null || echo $body)"
    else
        print_result 1 "$method $endpoint (Expected: $expected_status, Got: $http_code)"
        echo "Response: $body"
    fi
}

echo "=========================================="
echo "   EduPlatform API Testing Suite"
echo "=========================================="
echo ""
echo "Base URL: $BASE_URL"
echo "Testing started at: $(date)"
echo ""

# Check if server is running
echo "Checking if server is running..."
if ! curl -s "$BASE_URL" > /dev/null; then
    echo -e "${RED}Error: Server is not running at $BASE_URL${NC}"
    echo "Please start the development server with: npm run dev"
    exit 1
fi
echo -e "${GREEN}Server is running!${NC}"
echo ""

# Note: These tests assume you're already logged in
# You may need to login first and save cookies
echo "Note: Make sure you're logged in before running these tests"
echo "Run this command to login and save cookies:"
echo "  curl -X POST $API_URL/auth/login -d '{\"email\":\"your@email.com\",\"password\":\"password\"}' -c cookies.txt"
echo ""
read -p "Press Enter to continue with tests..."

echo ""
echo "=========================================="
echo "Testing Courses API"
echo "=========================================="

test_endpoint "GET" "/courses" "" 200 "Get all courses"
test_endpoint "GET" "/courses?enrolled=true" "" 200 "Get enrolled courses"
test_endpoint "GET" "/courses?page=1&limit=10" "" 200 "Get courses with pagination"
test_endpoint "GET" "/courses?difficulty=BEGINNER" "" 200 "Filter courses by difficulty"
test_endpoint "GET" "/courses?search=computer" "" 200 "Search courses"

# Note: Creating courses requires educator role
# test_endpoint "POST" "/courses" '{"name":"Test Course","code":"TEST101","description":"Test course description","semester":"Fall","year":2025,"credits":3}' 200 "Create a new course"

echo ""
echo "=========================================="
echo "Testing Assignments API"
echo "=========================================="

test_endpoint "GET" "/assignments" "" 200 "Get all assignments"
test_endpoint "GET" "/assignments?page=1&limit=10" "" 200 "Get assignments with pagination"
# test_endpoint "GET" "/assignments?courseId=COURSE_ID" "" 200 "Filter assignments by course"

echo ""
echo "=========================================="
echo "Testing Submissions API"
echo "=========================================="

test_endpoint "GET" "/submissions" "" 200 "Get all submissions"
test_endpoint "GET" "/submissions?page=1&limit=10" "" 200 "Get submissions with pagination"

echo ""
echo "=========================================="
echo "Testing Grades API"
echo "=========================================="

test_endpoint "GET" "/grades" "" 200 "Get user grades"
test_endpoint "GET" "/grades/adjustments" "" 200 "Get grade adjustment requests"

echo ""
echo "=========================================="
echo "Testing Error Handling"
echo "=========================================="

test_endpoint "GET" "/courses/invalid-id" "" 404 "Get non-existent course (404)"
test_endpoint "GET" "/assignments/invalid-id" "" 404 "Get non-existent assignment (404)"
test_endpoint "GET" "/submissions/invalid-id" "" 404 "Get non-existent submission (404)"

echo ""
echo "=========================================="
echo "Test Summary"
echo "=========================================="
echo ""
echo -e "Total Tests: $((PASSED + FAILED))"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}All tests passed! ✓${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed. Please review the output above.${NC}"
    exit 1
fi
