/**
 * Manual Testing Guide for AI Mentor Chatbot
 * 
 * This file contains test scenarios to verify the AI Mentor feature
 */

## Test Setup

### Prerequisites
1. OpenAI API key configured in `.env.local`
2. Database migrated: `npx prisma db push`
3. Development server running: `npm run dev`
4. User authenticated (signed in)

## Test Scenarios

### Test 1: Basic Chat Flow (English)
**Steps**:
1. Navigate to `/dashboard`
2. Click floating bot button (bottom-right)
3. Ensure language is set to "EN"
4. Type: "What is the Pythagorean theorem?"
5. Press Enter or click Send

**Expected**:
- Message appears in chat immediately
- Typing indicator shows (3 bouncing dots)
- AI response appears within 3-5 seconds
- Response explains the theorem clearly
- Timestamp shows current time

### Test 2: Urdu Language Support
**Steps**:
1. Open AI Mentor modal
2. Click "UR" button to switch language
3. Type: "میں ریاضی میں کیسے بہتر ہو سکتا ہوں؟"
4. Enable "Translate Response" (if checkbox exists)
5. Send message

**Expected**:
- Text input switches to RTL direction
- Urdu text displays correctly
- Response in Urdu (or with translation marker if stub)
- Urdu badge appears on message

### Test 3: Chat History Persistence
**Steps**:
1. Send 3-5 messages in chat
2. Close the modal
3. Refresh the page
4. Open AI Mentor modal again

**Expected**:
- Previous messages still visible
- Messages ordered chronologically (oldest first)
- User and AI messages clearly distinguished

### Test 4: Role-Based Responses
**Steps**:
1. Sign in as Student role
2. Ask: "How should I prepare for exams?"
3. Sign out, sign in as Educator role
4. Ask same question

**Expected**:
- Student gets study tips and strategies
- Educator gets course assessment guidance
- Responses tailored to role

### Test 5: Error Handling - No API Key
**Steps**:
1. Remove `OPENAI_API_KEY` from `.env.local`
2. Restart dev server
3. Try sending message

**Expected**:
- Error message displayed in chat
- "AI service not configured" error
- Doesn't crash the application

### Test 6: Error Handling - Invalid Prompt
**Steps**:
1. Try sending empty message
2. Try sending only whitespace
3. Try sending very long message (2000+ chars)

**Expected**:
- Empty/whitespace: Send button disabled
- Long message: Accepted but may be truncated by API

### Test 7: Typing Indicator
**Steps**:
1. Send a message
2. Observe loading states

**Expected**:
- Loader icon on Send button
- Typing indicator appears (3 bouncing dots)
- Indicator disappears when response arrives
- Smooth transition between states

### Test 8: Keyboard Shortcuts
**Steps**:
1. Focus text input
2. Type message
3. Press Enter (without Shift)
4. Type multi-line message
5. Press Shift+Enter between lines

**Expected**:
- Enter: Sends message
- Shift+Enter: Creates new line
- No message sent on Shift+Enter

### Test 9: Mobile Responsiveness
**Steps**:
1. Open DevTools
2. Switch to mobile viewport (iPhone/Android)
3. Open AI Mentor modal
4. Try sending messages

**Expected**:
- Modal fits screen appropriately
- Floating button accessible
- Touch interactions work
- Text readable without zooming

### Test 10: Pagination (50+ Messages)
**Steps**:
1. Send 60+ messages (can use API/database directly)
2. Open AI Mentor modal
3. Scroll to top

**Expected**:
- Only most recent 50 messages load initially
- Smooth scrolling
- Can load more on scroll (if implemented)

## API Testing

### Test API Endpoint Directly

**POST /api/ai/chat**
```bash
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "What is machine learning?",
    "language": "en",
    "translateResponse": false
  }'
```

**Expected Response**:
```json
{
  "message": "Machine learning is...",
  "language": "en",
  "conversationId": "clx123456789"
}
```

**GET /api/ai/chat**
```bash
curl http://localhost:3000/api/ai/chat?limit=10&offset=0
```

**Expected Response**:
```json
{
  "history": [...],
  "total": 42
}
```

## Database Verification

**Check ChatHistory table**:
```bash
npx prisma studio
```

Navigate to `chat_history` model and verify:
- Records created for each conversation
- userId matches authenticated user
- Timestamps are correct
- Language field set appropriately

## Performance Testing

### Load Test
1. Send 10 messages rapidly
2. Check response times
3. Verify no messages lost

### Memory Test
1. Send 100+ messages
2. Check browser memory usage
3. Verify no memory leaks

## Accessibility Testing

1. **Keyboard Navigation**:
   - Tab through all interactive elements
   - Escape to close modal
   - Focus management correct

2. **Screen Reader**:
   - Announce messages properly
   - Button labels clear
   - ARIA attributes present

3. **Color Contrast**:
   - Text readable against backgrounds
   - Meets WCAG AA standards

## Security Testing

1. **Authentication**:
   - Signed out user cannot access API
   - Returns 401 for unauthenticated requests

2. **Authorization**:
   - Users can only see their own chat history
   - Cannot access other users' conversations

3. **Input Validation**:
   - SQL injection attempts fail
   - XSS attempts sanitized
   - API rate limits respected (if implemented)

## Translation Testing

### With IndicTrans2 API
1. Configure `INDICTRANS2_API_URL`
2. Send English message with Urdu translation enabled
3. Verify actual translation received

### Without API (Stub)
1. Leave `INDICTRANS2_API_URL` empty
2. Send message with translation enabled
3. Verify stub marker appears: "[اردو میں ترجمہ: ...]"

## Edge Cases

1. **Very long AI response** (1000+ tokens)
2. **Special characters** in messages (emojis, symbols)
3. **Code blocks** in questions/answers
4. **Simultaneous users** (multiple browser tabs)
5. **Network interruption** during message send
6. **API timeout** (slow OpenAI response)

## Checklist

- [ ] English chat works
- [ ] Urdu chat works
- [ ] Language switching works
- [ ] Translation works (or stub shows)
- [ ] Chat history persists
- [ ] Role-based responses differ
- [ ] Error messages display correctly
- [ ] Typing indicator animates
- [ ] Keyboard shortcuts work
- [ ] Mobile responsive
- [ ] API endpoints return correct data
- [ ] Database records created
- [ ] Authentication required
- [ ] Authorization enforced
- [ ] Performance acceptable (<3s response)
- [ ] Accessibility standards met

## Known Issues to Verify

- [ ] TypeScript errors resolved (restart VS Code if needed)
- [ ] Prisma client includes `chatHistory` model
- [ ] Environment variables loaded correctly
- [ ] No console errors in browser
- [ ] No 500 errors in server logs

## Reporting Issues

When reporting bugs, include:
1. Test scenario name
2. Steps to reproduce
3. Expected vs actual behavior
4. Screenshots/video if applicable
5. Browser console logs
6. Server logs (if relevant)
7. Environment details (OS, browser, Node version)

---

**Last Updated**: October 27, 2025
**Tested By**: [Your Name]
**Test Date**: [Date]
**Status**: [ ] Pass / [ ] Fail
