# AI Mentor Chatbot Feature

## Overview

The AI Mentor Chatbot provides **bilingual (English + Urdu)** study assistance to students, educators, and administrators using OpenAI's GPT models with optional translation support.

## Features

✅ **Bilingual Support**: English and Urdu languages
✅ **Role-Based Assistance**: Customized responses based on user role (Student/Educator/Admin)
✅ **Chat History**: Persistent conversation storage in database
✅ **Typing Animation**: Real-time typing indicator for better UX
✅ **Translation Service**: Optional IndicTrans2 integration for Urdu translation
✅ **Floating Action Button**: Easy access from any dashboard page
✅ **Responsive UI**: Works on desktop and mobile devices

## Architecture

### Database Schema

**ChatHistory Model** (`chat_history` table):
```prisma
model ChatHistory {
  id        String   @id @default(cuid())
  userId    String
  prompt    String
  reply     String
  language  String   @default("en") // 'en' or 'ur'
  timestamp DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### API Endpoints

#### `POST /api/ai/chat`
Send a message to the AI Mentor.

**Request Body:**
```json
{
  "prompt": "How do I solve quadratic equations?",
  "language": "en",
  "translateResponse": false
}
```

**Response:**
```json
{
  "message": "To solve quadratic equations...",
  "language": "en",
  "conversationId": "clx123456789"
}
```

#### `GET /api/ai/chat`
Retrieve chat history.

**Query Parameters:**
- `limit`: Number of messages (default: 50)
- `offset`: Pagination offset (default: 0)

**Response:**
```json
{
  "history": [
    {
      "id": "clx123456789",
      "prompt": "...",
      "reply": "...",
      "language": "en",
      "timestamp": "2025-10-27T10:30:00Z"
    }
  ],
  "total": 42
}
```

### Translation Service

**Translation Utilities** (`src/lib/translation.ts`):
- `detectLanguage(text)`: Auto-detect English vs Urdu
- `translateToUrdu(text)`: Translate English → Urdu
- `translateToEnglish(text)`: Translate Urdu → English
- `translate(text, targetLang)`: Bidirectional translation

**Stub Implementation**: If `INDICTRANS2_API_URL` is not configured, falls back to a stub that prefixes text with a translation marker.

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Required: OpenAI API Key
OPENAI_API_KEY="sk-your-openai-api-key-here"
OPENAI_MODEL="gpt-3.5-turbo"  # or gpt-4

# Optional: Translation Service
INDICTRANS2_API_URL=""  # Leave empty for stub translation
```

**Get OpenAI API Key**: https://platform.openai.com/api-keys

### 2. Database Migration

Run the Prisma migration to create the `chat_history` table:

```bash
npx prisma generate
npx prisma db push
```

### 3. Start Development Server

```bash
npm run dev
```

## Usage

### For End Users

1. **Access AI Mentor**: Click the floating bot button (bottom-right corner) on any dashboard page
2. **Select Language**: Choose English (EN) or Urdu (UR) from the header
3. **Ask Questions**: Type your question and press Enter or click Send
4. **View History**: Scroll up to see previous conversations

### For Developers

#### Using the Chat Component Directly

```tsx
import { AIMentorChat } from '@/components/features/ai-mentor';

export default function MyPage() {
  return (
    <div className="h-screen">
      <AIMentorChat />
    </div>
  );
}
```

#### Using the Modal Component

```tsx
import { AIMentorModal } from '@/components/features/ai-mentor';

export default function Layout({ children }) {
  return (
    <div>
      {children}
      <AIMentorModal />
    </div>
  );
}
```

## Role-Based Assistance

The AI Mentor provides customized guidance based on user role:

### Students
- Clear, supportive explanations
- Encourages critical thinking
- Breaks down complex concepts
- Suggests study strategies

### Educators
- Course planning assistance
- Teaching methodology insights
- Assessment strategies
- Student engagement tips

### Administrators
- Platform usage insights
- Administrative task support
- Policy guidance
- Data-driven decision support

## UI Components

### AIMentorChat
Full-screen chat interface with:
- Message history display
- User/AI message bubbles
- Typing indicator
- Language toggle
- Input textarea with shortcuts

### AIMentorModal
Floating action button + modal dialog:
- Fixed bottom-right position
- Gradient blue-purple button
- Responsive modal (600px height)
- Auto-focus on open

## Translation Flow

1. **User sends message in Urdu**
   - Language auto-detected via Unicode range check
   - Stored as-is in database

2. **If `translateResponse = true`**
   - AI responds in English (default)
   - Response translated to Urdu via IndicTrans2
   - Translated version sent to user

3. **Fallback Behavior**
   - If translation API unavailable → stub translation
   - If API fails → returns English response
   - Error logged but doesn't break chat

## Error Handling

- **401 Unauthorized**: User not signed in → redirect to login
- **404 User Not Found**: Session user doesn't exist in DB
- **503 Service Unavailable**: OpenAI API key not configured
- **500 Internal Server Error**: Unexpected errors with logging

All errors display user-friendly messages in the chat.

## Performance Considerations

- **Rate Limiting**: Consider adding rate limits for API calls
- **Caching**: Cache common responses to reduce API costs
- **Pagination**: Chat history loaded in batches (50 messages)
- **Optimistic Updates**: User messages appear immediately

## Security

- ✅ Server-side authentication required
- ✅ User-scoped chat history (no cross-user access)
- ✅ API keys stored in environment variables
- ✅ Input sanitization on server
- ⚠️ **TODO**: Add rate limiting per user
- ⚠️ **TODO**: Add content filtering for inappropriate prompts

## Future Enhancements

- [ ] Voice input/output
- [ ] File attachments for context
- [ ] Conversation threads
- [ ] Feedback system (thumbs up/down)
- [ ] Export chat history
- [ ] Advanced prompt engineering per subject
- [ ] Integration with course materials
- [ ] Multi-turn context awareness
- [ ] Code syntax highlighting for programming questions

## Troubleshooting

### "AI service not configured" error
- Check that `OPENAI_API_KEY` is set in `.env.local`
- Verify API key is valid at OpenAI dashboard
- Restart development server after adding env vars

### Translation shows "[اردو میں ترجمہ...]" stub
- This is expected if `INDICTRANS2_API_URL` is not configured
- To enable real translation, configure the IndicTrans2 endpoint

### Chat history not loading
- Run `npx prisma db push` to ensure database schema is updated
- Check browser console for API errors
- Verify user is authenticated

## Support

For issues or questions, contact the development team or check:
- OpenAI API Status: https://status.openai.com/
- Prisma Documentation: https://www.prisma.io/docs
- Next.js Documentation: https://nextjs.org/docs

---

**Label**: AI Wrapper Mentor (Chat Assistant)
**Version**: 1.0.0
**Last Updated**: October 27, 2025
