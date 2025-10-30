# API Quick Reference Guide

## 🚀 Quick Start

### Start Development Server
```bash
npm run dev
```

### Run API Tests
```bash
./test-api.sh
```

---

## 📁 File Structure

```
src/
├── app/api/
│   ├── courses/
│   │   ├── route.ts              # GET, POST courses
│   │   └── [id]/
│   │       ├── route.ts          # GET, PUT, DELETE course
│   │       └── enroll/
│   │           └── route.ts      # POST, DELETE enrollment
│   ├── assignments/
│   │   ├── route.ts              # GET, POST assignments
│   │   └── [id]/
│   │       └── route.ts          # GET, PUT, DELETE assignment
│   ├── submissions/
│   │   ├── route.ts              # GET, POST submissions
│   │   └── [id]/
│   │       ├── route.ts          # GET, PUT, DELETE submission
│   │       └── grade/
│   │           └── route.ts      # POST grade submission
│   └── grades/
│       ├── route.ts              # GET grades
│       └── adjustments/
│           ├── route.ts          # GET, POST adjustments
│           └── [id]/review/
│               └── route.ts      # POST review adjustment
│
├── lib/
│   ├── validations/
│   │   └── api.ts                # Zod validation schemas
│   └── api/
│       └── errors.ts             # Error handling utilities
```

---

## 🔑 Common Use Cases

### 1. Get Student's Enrolled Courses
```bash
curl http://localhost:3000/api/courses?enrolled=true \
  -b cookies.txt
```

### 2. Create a New Course (Educator)
```bash
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Web Development",
    "code": "WEB101",
    "description": "Learn web development basics",
    "semester": "Fall",
    "year": 2025,
    "credits": 3,
    "difficulty": "BEGINNER"
  }' \
  -b cookies.txt
```

### 3. Enroll in a Course (Student)
```bash
curl -X POST http://localhost:3000/api/courses/COURSE_ID/enroll \
  -b cookies.txt
```

### 4. Create an Assignment (Educator)
```bash
curl -X POST http://localhost:3000/api/assignments \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Assignment 1",
    "description": "First assignment",
    "instructions": "Complete the exercises",
    "dueDate": "2025-12-01T23:59:59Z",
    "maxPoints": 100,
    "courseId": "COURSE_ID",
    "allowedFileTypes": [".pdf", ".docx"],
    "maxFileSize": 10485760,
    "isPublished": true
  }' \
  -b cookies.txt
```

### 5. Submit an Assignment (Student)
```bash
curl -X POST http://localhost:3000/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "assignmentId": "ASSIGNMENT_ID",
    "fileUrl": "https://storage.example.com/file.pdf",
    "fileName": "assignment1.pdf",
    "fileSize": 2048576
  }' \
  -b cookies.txt
```

### 6. Grade a Submission (Educator)
```bash
curl -X POST http://localhost:3000/api/submissions/SUBMISSION_ID/grade \
  -H "Content-Type: application/json" \
  -d '{
    "grade": 95,
    "feedback": "Excellent work!",
    "status": "GRADED"
  }' \
  -b cookies.txt
```

### 7. Get Student Grades
```bash
curl http://localhost:3000/api/grades \
  -b cookies.txt

# Filter by course
curl http://localhost:3000/api/grades?courseId=COURSE_ID \
  -b cookies.txt
```

### 8. Request Grade Adjustment (Student)
```bash
curl -X POST http://localhost:3000/api/grades/adjustments \
  -H "Content-Type: application/json" \
  -d '{
    "submissionId": "SUBMISSION_ID",
    "reason": "TECHNICAL_ISSUES",
    "description": "Detailed explanation...",
    "supportingDocuments": [
      {
        "url": "https://...",
        "name": "evidence.pdf",
        "type": "application/pdf"
      }
    ]
  }' \
  -b cookies.txt
```

### 9. Review Grade Adjustment (Educator)
```bash
curl -X POST http://localhost:3000/api/grades/adjustments/REQUEST_ID/review \
  -H "Content-Type: application/json" \
  -d '{
    "status": "APPROVED",
    "decision": "Request approved",
    "adjustedGrade": 92
  }' \
  -b cookies.txt
```

---

## 🔍 Query Parameters

### Pagination (All List Endpoints)
- `page=1` - Page number (default: 1)
- `limit=20` - Items per page (default: 20, max: 100)
- `sortBy=createdAt` - Field to sort by
- `sortOrder=desc` - Sort order (asc/desc)

### Courses
- `enrolled=true` - Filter enrolled courses (students)
- `semester=Fall` - Filter by semester
- `year=2025` - Filter by year
- `difficulty=BEGINNER` - Filter by difficulty
- `search=computer` - Search courses

### Assignments
- `courseId=xxx` - Filter by course
- `isPublished=true` - Filter published
- `status=active` - Filter by status

### Submissions
- `assignmentId=xxx` - Filter by assignment
- `courseId=xxx` - Filter by course
- `status=GRADED` - Filter by status
- `isLate=true` - Filter late submissions

### Grades
- `courseId=xxx` - Filter by course (required for educators)
- `assignmentId=xxx` - Filter by assignment

### Grade Adjustments
- `status=PENDING` - Filter by status

---

## 🎭 User Roles & Permissions

### Students
- ✅ View published courses
- ✅ Enroll/unenroll in courses
- ✅ View assignments in enrolled courses
- ✅ Submit assignments
- ✅ View own submissions and grades
- ✅ Request grade adjustments
- ❌ Create/edit courses
- ❌ Create/edit assignments
- ❌ Grade submissions

### Educators
- ✅ View all courses
- ✅ Create/edit/delete own courses
- ✅ Create/edit/delete assignments in own courses
- ✅ View all submissions in own courses
- ✅ Grade submissions
- ✅ Review grade adjustments
- ❌ Enroll in courses
- ❌ Submit assignments
- ❌ Edit other educators' courses

### Admins
- ✅ Full access to all endpoints
- ✅ Override ownership checks
- ✅ Manage all courses and assignments

---

## ⚠️ Common Error Codes

| Code | Error | Description |
|------|-------|-------------|
| 400 | ValidationError | Invalid input data |
| 401 | UnauthorizedError | Not authenticated |
| 403 | ForbiddenError | Insufficient permissions |
| 404 | NotFoundError | Resource not found |
| 409 | ConflictError | Duplicate resource |
| 500 | InternalServerError | Server error |

---

## 🔧 Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Node Environment
NODE_ENV="development"
```

---

## 📊 Database Models

### Course
- `id`, `name`, `code`, `description`
- `semester`, `year`, `credits`
- `difficulty`, `prerequisites`, `isActive`
- `educatorId`, `createdAt`, `updatedAt`

### Assignment
- `id`, `title`, `description`, `instructions`
- `dueDate`, `maxPoints`
- `allowedFileTypes`, `maxFileSize`
- `isPublished`, `courseId`

### Submission
- `id`, `assignmentId`, `studentId`
- `fileUrl`, `fileName`, `fileSize`
- `submittedAt`, `isLate`
- `grade`, `feedback`, `status`
- `plagiarismScore`

### GradeAdjustmentRequest
- `id`, `submissionId`, `studentId`
- `reason`, `description`
- `supportingDocuments`
- `status`, `decision`, `adjustedGrade`
- `reviewedBy`, `reviewedAt`

---

## 🧪 Testing Tips

1. **Login First**: Save session cookies
   ```bash
   curl -X POST http://localhost:3000/api/auth/login \
     -d '{"email":"test@example.com","password":"password"}' \
     -c cookies.txt
   ```

2. **Use jq for Pretty Output**:
   ```bash
   curl http://localhost:3000/api/courses -b cookies.txt | jq
   ```

3. **Check Error Details**:
   ```bash
   curl -v http://localhost:3000/api/courses/invalid-id -b cookies.txt
   ```

---

## 📚 Additional Resources

- **Full API Documentation**: `docs/API_DOCUMENTATION.md`
- **Implementation Summary**: `API_IMPLEMENTATION_SUMMARY.md`
- **Test Script**: `test-api.sh`
- **Prisma Schema**: `prisma/schema.prisma`

---

## 🆘 Troubleshooting

### Issue: 401 Unauthorized
**Solution**: Login and save cookies first

### Issue: 403 Forbidden
**Solution**: Check user role and permissions

### Issue: 404 Not Found
**Solution**: Verify the resource ID exists

### Issue: 400 Validation Error
**Solution**: Check request body matches schema requirements

### Issue: 500 Internal Server Error
**Solution**: Check server logs and database connection

---

## 📞 Support

For issues or questions:
1. Check the full API documentation
2. Review error messages in response
3. Check TypeScript types for request/response format
4. Verify database connection and migrations

---

**Last Updated**: October 31, 2025
