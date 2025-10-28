# AI Wrapper Documentation

## Overview

The AI Wrapper system provides a unified interface for all AI-powered features in the EduPlatform. It includes:

- **Centralized routing** through `/api/ai/core`
- **Automatic logging** of all AI requests with metrics
- **Performance tracking** (latency, token usage)
- **Error handling** and monitoring

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Application                    │
└───────────────┬─────────────────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────┐
│              /api/ai/core (Router)                       │
│  - Authenticates requests                               │
│  - Routes to appropriate handler                        │
│  - Logs all operations                                  │
└───────┬────────────┬────────────┬───────────────────────┘
        │            │            │
        ▼            ▼            ▼
   ┌────────┐  ┌──────────┐  ┌──────────┐
   │  Chat  │  │Autograde │  │ Insights │
   └────────┘  └──────────┘  └──────────┘
        │            │            │
        └────────────┴────────────┘
                     │
                     ▼
            ┌────────────────┐
            │   AiLogs DB    │
            └────────────────┘
```

## API Endpoints

### 1. AI Core Router

#### POST `/api/ai/core`

Unified endpoint that routes AI requests to appropriate handlers.

**Request Body:**
```json
{
  "type": "chat" | "autograde" | "insights",
  ...type-specific parameters
}
```

**Response Headers:**
- `X-AI-Latency`: Request processing time in milliseconds
- `X-AI-Tokens`: Token count (when available)

**Examples:**

##### Chat Request
```bash
curl -X POST /api/ai/core \
  -H "Content-Type: application/json" \
  -d '{
    "type": "chat",
    "prompt": "Explain recursion",
    "language": "en",
    "translateResponse": false
  }'
```

##### Autograde Request
```bash
curl -X POST /api/ai/core \
  -H "Content-Type: application/json" \
  -d '{
    "type": "autograde",
    "assignmentId": "clm123...",
    "fileUrl": "https://...",
    "submissionId": "clm456..."
  }'
```

##### Insights Request
```bash
curl -X POST /api/ai/core \
  -H "Content-Type: application/json" \
  -d '{
    "type": "insights",
    "courseId": "clm789...",
    "period": "week"
  }'
```

#### GET `/api/ai/core`

Retrieve insights or AI usage statistics.

**Query Parameters:**
- `type`: `insights` | `stats`
- For insights: `courseId`, `period`
- For stats: `startDate`, `endDate`, `aiType`

**Example:**
```bash
# Get AI usage stats
curl "/api/ai/core?type=stats&startDate=2025-10-01&aiType=chat"

# Get course insights
curl "/api/ai/core?type=insights&courseId=clm789&period=month"
```

---

### 2. Individual AI Endpoints

You can also call the individual endpoints directly (they now include logging):

#### `/api/ai/chat`

**POST** - Send a chat message to the AI Mentor
- Request: `{ prompt, language?, translateResponse? }`
- Response: `{ message, language, conversationId }`

**GET** - Retrieve chat history
- Query: `limit`, `offset`
- Response: `{ history[], total }`

#### `/api/ai/autograde`

**POST** - Submit assignment for AI grading
- Request: `{ assignmentId, fileUrl, submissionId? }`
- Response: `{ score, feedback, submissionId, aiFeedbackId }`

**GET** - Retrieve AI feedback
- Query: `submissionId`
- Response: `{ score, feedback, createdAt, assignmentTitle }`

#### `/api/ai/insights`

**GET** - Get AI-generated insights for educators
- Query: `courseId?`, `period?`
- Response: `{ averageGrade, riskStudents, insights[], ... }`

---

## AI Wrapper Middleware

### Usage in Code

```typescript
import { withAiLogging } from '@/lib/ai-wrapper';

const result = await withAiLogging(
  async () => {
    // Your AI operation here
    const response = await callSomeAIService();
    return response;
  },
  {
    type: 'chat', // 'chat' | 'autograde' | 'insights' | 'core'
    userId: user.id,
    metadata: {
      // Any additional context
      promptLength: 100,
      language: 'en',
    },
  }
);

if (result.error) {
  // Handle error
  console.error(result.error);
} else {
  // Use result.data
  console.log(`Success! Latency: ${result.latency}ms`);
}
```

### What Gets Logged

Every AI operation logs the following to the `AiLogs` table:

| Field      | Type     | Description                          |
|------------|----------|--------------------------------------|
| `id`       | String   | Unique identifier                    |
| `type`     | String   | Operation type (chat/autograde/etc.) |
| `latency`  | Int      | Processing time in milliseconds      |
| `tokens`   | Int?     | Token count (when available)         |
| `userId`   | String?  | User who made the request            |
| `metadata` | JSON     | Additional context and parameters    |
| `createdAt`| DateTime | Timestamp of the operation           |

---

## Usage Statistics

### Get AI Usage Stats

```typescript
import { getAiUsageStats } from '@/lib/ai-wrapper';

const stats = await getAiUsageStats({
  type: 'chat',
  userId: 'clm123...',
  startDate: new Date('2025-10-01'),
  endDate: new Date('2025-10-31'),
});

console.log(stats);
// {
//   totalRequests: 150,
//   averageLatency: 1234,
//   totalTokens: 45000,
//   errorCount: 3,
//   successRate: 98,
//   logs: [...] // Latest 100 logs
// }
```

---

## Database Schema

### AiLogs Table

```prisma
model AiLogs {
  id        String   @id @default(cuid())
  type      String   // 'chat', 'autograde', 'insights', 'core'
  latency   Int      // in milliseconds
  tokens    Int?     // token count if available
  userId    String?  // optional user tracking
  metadata  Json?    // additional metadata
  createdAt DateTime @default(now())

  @@map("ai_logs")
}
```

---

## Testing

### Test the Full AI Workflow

```bash
# 1. Test Chat
curl -X POST http://localhost:3000/api/ai/core \
  -H "Content-Type: application/json" \
  -d '{"type":"chat","prompt":"Hello AI!"}'

# 2. Test Autograde
curl -X POST http://localhost:3000/api/ai/core \
  -H "Content-Type: application/json" \
  -d '{"type":"autograde","assignmentId":"...","fileUrl":"..."}'

# 3. Test Insights
curl "http://localhost:3000/api/ai/core?type=insights&period=week"

# 4. Check AI Stats
curl "http://localhost:3000/api/ai/core?type=stats"
```

### View Logs in Database

```bash
# Connect to your database
npx prisma studio

# Navigate to AiLogs table to see all logged operations
```

---

## Performance Considerations

1. **Logging is non-blocking**: Logs are written asynchronously to avoid impacting response times
2. **Automatic cleanup**: Consider implementing a cleanup job for old logs
3. **Token tracking**: Token counts help monitor API usage costs
4. **Latency monitoring**: Track which operations are slow

---

## Error Handling

All AI operations return a consistent error format:

```json
{
  "error": "Error type",
  "message": "Detailed error message",
  "latency": 1234
}
```

Errors are also logged to the `AiLogs` table with `metadata.error` set.

---

## Best Practices

1. **Always use the AI wrapper** for logging consistency
2. **Include relevant metadata** to help with debugging
3. **Monitor the `AiLogs` table** for performance issues
4. **Set up alerts** for high error rates or slow responses
5. **Review token usage** to optimize costs

---

## Migration Guide

If you're migrating existing AI code:

1. Import `withAiLogging` from `@/lib/ai-wrapper`
2. Wrap your AI operation with the function
3. Handle the result object (check for errors)
4. Add appropriate metadata for tracking
5. Test the integration

---

## Future Enhancements

- [ ] Rate limiting per user
- [ ] Cost tracking per operation
- [ ] AI model versioning
- [ ] A/B testing support
- [ ] Advanced analytics dashboard
- [ ] Automated performance reports

---

## Support

For issues or questions about the AI Wrapper system:

1. Check the logs in `AiLogs` table
2. Review error messages in console
3. Test individual endpoints before using core router
4. Verify authentication and permissions

---

**Last Updated:** October 28, 2025  
**Version:** 1.0
