# AI Mentor Chatbot - Quick Reference

## 🚀 Quick Start

```bash
# 1. Setup environment
cp .env.example .env.local
# Add your OPENAI_API_KEY to .env.local

# 2. Update database
npx prisma generate
npx prisma db push

# 3. Start server
npm run dev

# 4. Open http://localhost:3000/dashboard
# Click the floating bot button (bottom-right)
```

## 📁 File Locations

```
API Endpoint:       src/app/api/ai/chat/route.ts
Chat Component:     src/components/features/ai-mentor/ai-mentor-chat.tsx
Modal Component:    src/components/features/ai-mentor/ai-mentor-modal.tsx
Translation Utils:  src/lib/translation.ts
Database Schema:    prisma/schema.prisma (ChatHistory model)
Documentation:      docs/AI_MENTOR_README.md
```

## 🔑 Environment Variables

```bash
# Required
OPENAI_API_KEY="sk-proj-..."

# Optional
OPENAI_MODEL="gpt-3.5-turbo"        # or gpt-4
INDICTRANS2_API_URL=""              # Leave empty for stub
```

## 📡 API Endpoints

### Send Message
```http
POST /api/ai/chat
Content-Type: application/json

{
  "prompt": "What is calculus?",
  "language": "en",
  "translateResponse": false
}
```

### Get History
```http
GET /api/ai/chat?limit=50&offset=0
```

## 🎨 Component Usage

### Standalone Chat
```tsx
import { AIMentorChat } from '@/components/features/ai-mentor';

<AIMentorChat className="h-screen" />
```

### Floating Button + Modal
```tsx
import { AIMentorModal } from '@/components/features/ai-mentor';

<AIMentorModal />  {/* Already added to dashboard layout */}
```

## 🔧 Translation Functions

```typescript
import { 
  detectLanguage, 
  translateToUrdu, 
  translateToEnglish 
} from '@/lib/translation';

// Auto-detect language
const lang = detectLanguage("Hello");  // 'en'
const lang2 = detectLanguage("سلام");   // 'ur'

// Translate
const urdu = await translateToUrdu("Hello, how are you?");
const english = await translateToEnglish("آپ کیسے ہیں؟");
```

## 💾 Database Access

```typescript
import { prisma } from '@/lib/db/prisma';

// Create chat entry
await prisma.chatHistory.create({
  data: {
    userId: user.id,
    prompt: "Question...",
    reply: "Answer...",
    language: "en",
  }
});

// Get user's history
await prisma.chatHistory.findMany({
  where: { userId: user.id },
  orderBy: { timestamp: 'desc' },
  take: 50,
});
```

## 🎯 User Roles

| Role | System Prompt Focus |
|------|---------------------|
| **STUDENT** | Study help, explanations, learning strategies |
| **EDUCATOR** | Teaching methods, course planning, assessments |
| **ADMIN** | Platform insights, analytics, administration |

## 🌐 Supported Languages

| Language | Code | Direction | Font Support |
|----------|------|-----------|--------------|
| English | `en` | LTR | Default |
| Urdu | `ur` | RTL | Arabic script (U+0600-U+06FF) |

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Send message |
| `Shift+Enter` | New line |
| `Esc` | Close modal |

## 🎨 UI Components

### Colors
- Primary: Blue-Purple gradient (#2563eb to #9333ea)
- User messages: Blue-600 (#2563eb)
- AI messages: Muted background
- Success: Green
- Error: Red

### Icons
- Bot icon: AI messages
- User icon: User messages
- Globe icon: Language toggle
- Send icon: Submit button
- Loader: Processing state

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "AI service not configured" | Add `OPENAI_API_KEY` to `.env.local` |
| TypeScript errors on `chatHistory` | Run `npx prisma generate` |
| Stub translation showing | Configure `INDICTRANS2_API_URL` or ignore (expected) |
| 401 Unauthorized | Sign in first |
| Chat history empty | Send messages first, refresh page |

## 📊 Performance Tips

- Chat history limited to 50 messages (pagination)
- API responses cached by OpenAI (duplicate questions)
- Typing indicator delays response display by 1s
- Auto-scroll throttled for performance

## 🔒 Security Features

✅ Server-side authentication
✅ User-scoped data access
✅ API keys in environment (not exposed)
✅ Input validation
✅ SQL injection protection (Prisma)
✅ XSS protection (React escaping)

## 📈 Cost Estimation

**OpenAI API Costs** (approximate):
- GPT-3.5-turbo: $0.002 per 1K tokens
- GPT-4: $0.03 per 1K tokens
- Average question+answer: ~500 tokens
- 1000 conversations ≈ $1-15 depending on model

## 🎓 Example Prompts

### For Students
- "Explain photosynthesis in simple terms"
- "How do I solve quadratic equations?"
- "What are good study techniques for exams?"

### For Educators
- "How can I make online lectures more engaging?"
- "What's a good rubric for essay grading?"
- "Tips for managing large class sizes"

### For Admins
- "Show me platform usage trends"
- "Best practices for user onboarding"
- "How to improve student retention"

## 📚 Related Documentation

- Full docs: `docs/AI_MENTOR_README.md`
- Testing guide: `AI_MENTOR_TESTING.md`
- Implementation: `AI_MENTOR_IMPLEMENTATION.md`
- OpenAI Docs: https://platform.openai.com/docs
- Prisma Docs: https://www.prisma.io/docs

## 🆘 Support

1. Check docs: `docs/AI_MENTOR_README.md`
2. Review errors: `get_errors` command
3. Check logs: Browser console + Server terminal
4. Verify setup: Environment variables, database migration
5. Test API: Use curl/Postman directly

---

**Label**: AI Wrapper Mentor (Chat Assistant)
**Version**: 1.0.0
**Last Updated**: October 27, 2025
