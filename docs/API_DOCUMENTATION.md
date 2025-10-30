# API Documentation

## Table of Contents
1. [Authentication](#authentication)
2. [Courses API](#courses-api)
3. [Assignments API](#assignments-api)
4. [Submissions API](#submissions-api)
5. [Grades API](#grades-api)
6. [Error Handling](#error-handling)

---

## Authentication

All API endpoints require authentication unless specified otherwise. Include the session cookie in your requests.

### Session Requirements
- User must be logged in via NextAuth
- Role-based access control (STUDENT, EDUCATOR, ADMIN)

---

## Courses API

### GET /api/courses
Get all courses with pagination and filtering.

**Query Parameters:**
- `page` (number, default: 1) - Page number
- `limit` (number, default: 20, max: 100) - Items per page
- `enrolled` (boolean) - Filter for enrolled courses (students only)
- `semester` (string) - Filter by semester (Fall, Spring, Summer, Winter)
- `year` (number) - Filter by year
- `difficulty` (string) - Filter by difficulty (BEGINNER, INTERMEDIATE, ADVANCED)
- `search` (string) - Search in name, code, description
- `sortBy` (string) - Field to sort by
- `sortOrder` (string) - Sort order (asc, desc)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clxxx...",
      "name": "Introduction to Computer Science",
      "code": "CS101",
      "description": "Foundational CS course",
      "semester": "Fall",
      "year": 2025,
      "credits": 3,
      "difficulty": "BEGINNER",
      "prerequisites": [],
      "isActive": true,
      "instructor": {
        "id": "clxxx...",
        "name": "Dr. Smith",
        "email": "smith@example.com"
      },
      "stats": {
        "studentsCount": 45,
        "assignmentsCount": 10
      },
      "isEnrolled": true,
      "createdAt": "2025-10-31T...",
      "updatedAt": "2025-10-31T..."
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### POST /api/courses
Create a new course (Educators/Admins only).

**Request Body:**
```json
{
  "name": "Introduction to Computer Science",
  "code": "CS101",
  "description": "Foundational CS course covering programming basics",
  "semester": "Fall",
  "year": 2025,
  "credits": 3,
  "difficulty": "BEGINNER",
  "prerequisites": [],
  "isActive": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": { /* Course object */ }
}
```

### GET /api/courses/[id]
Get a single course by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clxxx...",
    "name": "Introduction to Computer Science",
    "code": "CS101",
    /* ... other course fields ... */
    "assignments": [
      {
        "id": "clxxx...",
        "title": "Assignment 1",
        "dueDate": "2025-11-15T...",
        "maxPoints": 100,
        "isPublished": true
      }
    ],
    "students": [ /* Only for educators/admins */ ],
    "stats": {
      "studentsCount": 45,
      "assignmentsCount": 10
    },
    "isEnrolled": true,
    "isOwner": false
  }
}
```

### PUT /api/courses/[id]
Update a course (Educators/Admins only, owner or admin).

**Request Body:** (All fields optional)
```json
{
  "name": "Updated Course Name",
  "description": "Updated description",
  "isActive": false
}
```

### DELETE /api/courses/[id]
Delete a course (Educators/Admins only, owner or admin).

### POST /api/courses/[id]/enroll
Enroll in a course (Students only).

**Response:**
```json
{
  "success": true,
  "message": "Successfully enrolled in course",
  "data": {
    "id": "clxxx...",
    "courseId": "clxxx...",
    "studentId": "clxxx...",
    "enrolledAt": "2025-10-31T...",
    "course": {
      "id": "clxxx...",
      "name": "Introduction to Computer Science",
      "code": "CS101"
    }
  }
}
```

### DELETE /api/courses/[id]/enroll
Unenroll from a course (Students only).

---

## Assignments API

### GET /api/assignments
Get assignments with filtering.

**Query Parameters:**
- `page`, `limit`, `sortBy`, `sortOrder` - Pagination options
- `courseId` (string) - Filter by course
- `isPublished` (boolean) - Filter by publication status
- `status` (string) - Filter by status (upcoming, active, past)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clxxx...",
      "title": "Assignment 1: Variables and Data Types",
      "course": "Introduction to Computer Science",
      "courseCode": "CS101",
      "description": "Learn about variables",
      "instructions": "Complete the following exercises...",
      "dueDate": "2025-11-15T...",
      "assignedDate": "2025-10-31T...",
      "points": 100,
      "status": "published",
      "priority": "medium",
      "submissionType": [".pdf", ".docx"],
      "submissions": {
        "total": 45,
        "graded": 30,
        "pending": 15
      },
      "studentProgress": { /* For students */ }
    }
  ],
  "meta": { /* Pagination metadata */ }
}
```

### POST /api/assignments
Create a new assignment (Educators only).

**Request Body:**
```json
{
  "title": "Assignment 1: Variables and Data Types",
  "description": "Learn about variables and data types",
  "instructions": "Complete the following exercises:\n1. ...",
  "dueDate": "2025-11-15T23:59:59Z",
  "maxPoints": 100,
  "courseId": "clxxx...",
  "allowedFileTypes": [".pdf", ".docx", ".zip"],
  "maxFileSize": 10485760,
  "isPublished": true
}
```

### GET /api/assignments/[id]
Get a single assignment with submissions.

**Response (Student):**
```json
{
  "success": true,
  "data": {
    "id": "clxxx...",
    "title": "Assignment 1",
    /* ... other assignment fields ... */
    "submission": {
      "id": "clxxx...",
      "fileName": "assignment1.pdf",
      "fileUrl": "https://...",
      "submittedAt": "2025-11-14T...",
      "isLate": false,
      "grade": 95,
      "feedback": "Great work!",
      "status": "GRADED"
    }
  }
}
```

**Response (Educator):**
```json
{
  "success": true,
  "data": {
    "id": "clxxx...",
    "title": "Assignment 1",
    /* ... other assignment fields ... */
    "submissions": [
      {
        "id": "clxxx...",
        "student": {
          "id": "clxxx...",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "fileName": "assignment1.pdf",
        "submittedAt": "2025-11-14T...",
        "isLate": false,
        "grade": 95,
        "status": "GRADED"
      }
    ],
    "stats": {
      "totalSubmissions": 45,
      "graded": 30,
      "pending": 15
    }
  }
}
```

### PUT /api/assignments/[id]
Update an assignment (Educators only, owner or admin).

### DELETE /api/assignments/[id]
Delete an assignment (Educators only, owner or admin).

---

## Submissions API

### GET /api/submissions
Get submissions with filtering.

**Query Parameters:**
- `assignmentId` (string) - Filter by assignment
- `courseId` (string) - Filter by course
- `status` (string) - Filter by status
- `isLate` (boolean) - Filter by late status
- Pagination: `page`, `limit`, `sortBy`, `sortOrder`

### POST /api/submissions
Create a new submission (Students only).

**Request Body:**
```json
{
  "assignmentId": "clxxx...",
  "fileUrl": "https://storage.../file.pdf",
  "fileName": "assignment1.pdf",
  "fileSize": 2048576
}
```

**Response:**
```json
{
  "success": true,
  "message": "Submission created successfully",
  "data": {
    "id": "clxxx...",
    "assignmentId": "clxxx...",
    "studentId": "clxxx...",
    "fileName": "assignment1.pdf",
    "fileUrl": "https://...",
    "fileSize": 2048576,
    "submittedAt": "2025-11-14T...",
    "isLate": false,
    "status": "SUBMITTED"
  }
}
```

### GET /api/submissions/[id]
Get a single submission with full details.

### PUT /api/submissions/[id]
Update a submission (Students only, before grading).

**Request Body:**
```json
{
  "fileUrl": "https://storage.../new-file.pdf",
  "fileName": "assignment1-revised.pdf",
  "fileSize": 2148576
}
```

### DELETE /api/submissions/[id]
Delete a submission (Students only, before grading).

### POST /api/submissions/[id]/grade
Grade a submission (Educators only).

**Request Body:**
```json
{
  "grade": 95,
  "feedback": "Excellent work! Your understanding of the concepts is clear.",
  "status": "GRADED"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Submission graded successfully",
  "data": {
    "id": "clxxx...",
    "grade": 95,
    "feedback": "Excellent work!",
    "status": "GRADED",
    "assignment": {
      "id": "clxxx...",
      "title": "Assignment 1",
      "maxPoints": 100
    },
    "student": {
      "id": "clxxx...",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

---

## Grades API

### GET /api/grades
Get grades for the authenticated user.

**Query Parameters (Students):**
- `courseId` (string) - Filter by course
- `assignmentId` (string) - Filter by assignment

**Query Parameters (Educators):**
- `courseId` (string, required) - Course to get grades for

**Response (Student):**
```json
{
  "success": true,
  "data": {
    "grades": [
      {
        "submissionId": "clxxx...",
        "assignmentId": "clxxx...",
        "assignmentTitle": "Assignment 1",
        "courseId": "clxxx...",
        "courseName": "Introduction to Computer Science",
        "courseCode": "CS101",
        "grade": 95,
        "maxPoints": 100,
        "percentage": 95.0,
        "feedback": "Great work!",
        "submittedAt": "2025-11-14T...",
        "isLate": false,
        "status": "GRADED"
      }
    ],
    "stats": {
      "totalAssignments": 5,
      "averageGrade": 92.5,
      "overallPercentage": 92.5,
      "totalPoints": 462.5,
      "maxPossiblePoints": 500
    }
  }
}
```

**Response (Educator):**
```json
{
  "success": true,
  "data": {
    "grades": [ /* All student grades */ ],
    "classStats": [
      {
        "studentId": "clxxx...",
        "studentName": "John Doe",
        "totalPoints": 475,
        "maxPossiblePoints": 500,
        "assignmentCount": 5,
        "averageGrade": 95,
        "overallPercentage": 95.0
      }
    ]
  }
}
```

### GET /api/grades/adjustments
Get grade adjustment requests.

**Query Parameters:**
- `status` (string) - Filter by status (PENDING, APPROVED, REJECTED, REQUIRES_INFO)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clxxx...",
      "student": {
        "id": "clxxx...",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "submission": {
        "id": "clxxx...",
        "grade": 85,
        "maxPoints": 100
      },
      "assignment": {
        "id": "clxxx...",
        "title": "Assignment 1"
      },
      "course": {
        "id": "clxxx...",
        "name": "Introduction to Computer Science",
        "code": "CS101"
      },
      "reason": "TECHNICAL_ISSUES",
      "description": "I experienced technical difficulties during submission...",
      "supportingDocuments": [
        {
          "url": "https://...",
          "name": "evidence.pdf",
          "type": "application/pdf"
        }
      ],
      "status": "PENDING",
      "decision": null,
      "adjustedGrade": null,
      "reviewer": null,
      "requestedAt": "2025-11-15T...",
      "reviewedAt": null
    }
  ]
}
```

### POST /api/grades/adjustments
Create a grade adjustment request (Students only).

**Request Body:**
```json
{
  "submissionId": "clxxx...",
  "reason": "TECHNICAL_ISSUES",
  "description": "I experienced technical difficulties during submission. The system crashed before I could submit my complete work. I have screenshots showing the error.",
  "supportingDocuments": [
    {
      "url": "https://storage.../evidence.pdf",
      "name": "error-screenshot.pdf",
      "type": "application/pdf"
    }
  ]
}
```

**Valid Reasons:**
- `MEDICAL` - Medical emergency or illness
- `FAMILY_EMERGENCY` - Family emergency
- `TECHNICAL_ISSUES` - Technical problems
- `ACCESSIBILITY` - Accessibility accommodations needed
- `OTHER` - Other reasons

### POST /api/grades/adjustments/[id]/review
Review a grade adjustment request (Educators only).

**Request Body:**
```json
{
  "status": "APPROVED",
  "decision": "Request approved due to verified technical issues. Adjusted grade based on partial submission.",
  "adjustedGrade": 92
}
```

**Valid Statuses:**
- `APPROVED` - Request approved
- `REJECTED` - Request rejected
- `REQUIRES_INFO` - More information needed

---

## Error Handling

All errors follow a consistent format:

```json
{
  "error": "ValidationError",
  "message": "Validation failed",
  "details": [
    {
      "path": "email",
      "message": "Invalid email format"
    }
  ],
  "statusCode": 400,
  "timestamp": "2025-10-31T12:00:00.000Z"
}
```

### Common Error Codes

- `400` - Bad Request (Validation error)
- `401` - Unauthorized (Not authenticated)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found (Resource doesn't exist)
- `409` - Conflict (Duplicate resource)
- `500` - Internal Server Error

### Error Types

- `ValidationError` - Invalid input data
- `UnauthorizedError` - Authentication required
- `ForbiddenError` - Insufficient permissions
- `NotFoundError` - Resource not found
- `ConflictError` - Resource already exists
- `DatabaseError` - Database operation failed

---

## Best Practices

1. **Authentication**: Always check authentication status before making requests
2. **Validation**: Validate input on client-side before submitting
3. **Error Handling**: Handle all error types appropriately
4. **Pagination**: Use pagination for large datasets
5. **Caching**: Cache frequently accessed data
6. **Rate Limiting**: Implement rate limiting to prevent abuse

## Rate Limits

- General API calls: 100 requests per minute
- File uploads: 10 requests per minute
- Authentication endpoints: 5 requests per minute

---

## Support

For API support, please contact: support@eduplatform.com

Last updated: October 31, 2025
