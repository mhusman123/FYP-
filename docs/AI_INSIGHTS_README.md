# AI Insights Dashboard

## Overview

The AI Insights Dashboard provides educators with powerful analytics and predictions on student performance. It leverages data from submissions, grades, and student activity to generate actionable insights.

## Features

### 1. Key Metrics Cards
- **Average Grade**: Current class average with trend indicator
- **Late Submissions**: Count of late submissions in the selected period
- **Students at Risk**: Number of students requiring attention (grade < 60% or 2+ late submissions)
- **Completion Rate**: Percentage of assignments completed on time

### 2. AI-Generated Insights
Automatically generated observations including:
- Students at risk warnings
- Grade trend analysis (up/down percentages)
- Completion rate status
- Late submission alerts

### 3. Interactive Charts

#### Grade Trend Chart (Line Chart)
- Shows average grade progression over time
- Displays weekly data points
- Helps identify performance patterns

#### Grade Distribution Chart (Bar Chart)
- Visual breakdown of grade ranges:
  - A (90-100%)
  - B (80-89%)
  - C (70-79%)
  - D (60-69%)
  - F (<60%)

### 4. At-Risk Students Table
Detailed list of students needing support with:
- Student name
- Average grade
- Number of late submissions
- Risk level (High/Medium)

### 5. Overview Statistics
Summary cards showing:
- Total students across all courses
- Total submissions in period
- Number of active courses

### 6. Time Period Filters
View data by:
- **Week**: Last 7 days
- **Month**: Last 30 days
- **Semester**: Last 4 months

## API Endpoint

### GET `/api/ai/insights`

Returns analytics data for educators.

**Query Parameters:**
- `period` (optional): `'week'` | `'month'` | `'semester'` (default: `'week'`)
- `courseId` (optional): Filter by specific course ID

**Response Format:**
```json
{
  "averageGrade": 78,
  "lateSubmissions": 14,
  "riskStudents": 3,
  "atRiskStudents": [
    {
      "id": "student-id",
      "name": "Student Name",
      "averageGrade": 55,
      "lateSubmissions": 3
    }
  ],
  "trend": [70, 72, 75, 78],
  "completionRate": 85,
  "gradeDistribution": {
    "A (90-100)": 12,
    "B (80-89)": 25,
    "C (70-79)": 18,
    "D (60-69)": 8,
    "F (<60)": 5
  },
  "insights": [
    {
      "type": "warning",
      "message": "3 students at risk of failing",
      "severity": "high"
    }
  ],
  "period": "week",
  "totalSubmissions": 145,
  "totalStudents": 68,
  "totalCourses": 4,
  "trendChange": 5
}
```

**Authorization:**
- Requires authenticated session
- Only accessible to users with `EDUCATOR` or `ADMIN` role

## Component Usage

### In React Components

```tsx
import { AiInsightsPanel } from '@/components/features/ai-insights'

function MyDashboard() {
  return (
    <div>
      <AiInsightsPanel />
    </div>
  )
}
```

### Using the API Function

```typescript
import { fetchAiInsights } from '@/lib/api'

// Fetch weekly insights
const insights = await fetchAiInsights('week')

// Fetch insights for specific course
const courseInsights = await fetchAiInsights('month', 'course-id')
```

## Implementation Details

### Files Created

1. **API Route**: `/src/app/api/ai/insights/route.ts`
   - Handles GET requests for insights data
   - Calculates metrics from Prisma database
   - Implements role-based access control

2. **Component**: `/src/components/features/ai-insights/ai-insights-panel.tsx`
   - Client-side React component
   - Uses Recharts for data visualization
   - Responsive design with Tailwind CSS

3. **API Helper**: `/src/lib/api.ts`
   - Added `fetchAiInsights()` function
   - TypeScript interface `AiInsightsData`

### Integrated Into

- **Analytics Dashboard** (`/analytics`): Full-page analytics view
- **Educator Dashboard** (`/dashboard`): Quick overview for educators

## Risk Detection Algorithm

Students are flagged as "at risk" if:
- Average grade < 60%, OR
- 2 or more late submissions

Risk levels:
- **High**: Average grade < 50% OR 3+ late submissions
- **Medium**: Average grade 50-59% OR 2 late submissions

## Data Privacy

- Students can only see their own data
- Educators see aggregated data for their courses only
- Admins have access to all courses

## Future Enhancements

Potential improvements:
1. Machine learning predictions for student success
2. Personalized intervention recommendations
3. Email alerts for at-risk students
4. Historical trend comparison
5. Export functionality for reports
6. Custom threshold configuration
7. Integration with external analytics tools

## Testing

To test the AI Insights Dashboard:

1. Log in as an educator
2. Navigate to `/dashboard` or `/analytics`
3. The AI Insights Panel will appear at the top
4. Use the period filters to change the time range
5. Click refresh to reload data

## Technologies Used

- **Next.js 15**: App Router and Server Components
- **Prisma**: Database ORM
- **Recharts**: Data visualization library
- **Tailwind CSS**: Styling
- **TypeScript**: Type safety
- **NextAuth**: Authentication

## Notes

- The component is client-side (`'use client'`) to enable interactivity
- Data is fetched on mount and when period changes
- Loading states and error handling are built-in
- Charts are responsive and work on mobile devices
