// Dynamic API Base URL resolution for local and Vercel cloud deployment
function getApiBase(): string {
  if (typeof window !== 'undefined') {
    return '/api'
  }
  if (process.env.NEXTAUTH_URL) {
    return `${process.env.NEXTAUTH_URL.replace(/\/$/, '')}/api`
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api`
  }
  return 'http://localhost:3000/api'
}

const API_BASE = getApiBase()

// Type definitions
export interface Course {
  id: string
  title: string
  code: string
  instructor: string
  progress?: number
  totalLessons?: number
  completedLessons?: number
  nextDeadline?: string
  status: 'active' | 'completed' | 'draft'
  credits: number
  description: string
  color: string
  studentsCount?: number
  assignmentsCount?: number
}

export interface Assignment {
  id: string
  title: string
  course: string
  courseCode: string
  description: string
  dueDate: string
  assignedDate: string
  points: number
  status: 'published' | 'draft'
  priority: 'high' | 'medium' | 'low'
  submissionType: string[]
  instructions: string
  estimatedTime: number
  hasAutograding: boolean
  submissions: {
    total: number
    graded: number
    pending: number
  }
  studentProgress?: {
    submitted: boolean
    score?: number
    submissionDate?: string
    feedback?: string
    isLate?: boolean
  }
}

export interface Submission {
  id: string
  assignmentTitle: string
  course: string
  courseCode: string
  studentName?: string
  studentId?: string
  fileName: string
  fileUrl: string
  fileSize: number
  submittedAt: string
  isLate: boolean
  grade?: number
  maxGrade: number
  feedback?: string
  status: string
  plagiarismScore?: number
  dueDate: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  points: number
  isEarned: boolean
  earnedAt?: string
  criteria: Record<string, string | number | boolean>
  progress: number
}

export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  totalPoints: number
  enrolledCourses?: Course[]
  educatedCourses?: Course[]
  recentSubmissions?: Submission[]
  badges?: Badge[]
  stats?: {
    coursesEnrolled: number
    coursesTeaching: number
    totalSubmissions: number
    badgesEarned: number
    averageGrade: number
  }
}

// API call functions - Server-side safe
export async function fetchCourses(): Promise<Course[]> {
  try {
    // For server-side calls, we'll use the prisma client directly
    // This is a temporary solution - ideally we'd have a proper server-side API client
    const { prisma } = await import('@/lib/db/prisma')
    
    const courses = await prisma.course.findMany({
      include: {
        educator: {
          select: { name: true, email: true }
        },
        _count: {
          select: { 
            enrollments: true,
            assignments: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return courses.map(course => ({
      id: course.id,
      title: course.name,
      code: course.code,
      instructor: course.educator.name || 'Unknown',
      progress: Math.floor(Math.random() * 40) + 60, // Mock progress for now
      totalLessons: 20 + Math.floor(Math.random() * 10),
      completedLessons: Math.floor(Math.random() * 20),
      nextDeadline: '2025-10-15',
      status: course.isActive ? 'active' : 'completed',
      credits: course.credits,
      description: course.description || '',
      color: `bg-${['blue', 'green', 'purple', 'orange', 'red'][Math.floor(Math.random() * 5)]}-500`,
      studentsCount: course._count.enrollments,
      assignmentsCount: course._count.assignments
    }))
  } catch (error) {
    console.error('Error fetching courses:', error)
    return []
  }
}

export async function fetchAssignments(courseId?: string): Promise<Assignment[]> {
  try {
    const base = getApiBase()
    const url = courseId 
      ? `${base}/assignments?courseId=${courseId}`
      : `${base}/assignments`
      
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch assignments: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching assignments:', error)
    return []
  }
}

export async function fetchSubmissions(assignmentId?: string): Promise<Submission[]> {
  try {
    const base = getApiBase()
    const url = assignmentId 
      ? `${base}/submissions?assignmentId=${assignmentId}`
      : `${base}/submissions`
      
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch submissions: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return []
  }
}

export async function fetchBadges(earned = false): Promise<Badge[]> {
  try {
    const base = getApiBase()
    const response = await fetch(`${base}/badges${earned ? '?earned=true' : ''}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch badges: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching badges:', error)
    return []
  }
}

export async function fetchCurrentUser(): Promise<User | null> {
  try {
    const base = getApiBase()
    const response = await fetch(`${base}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })
    
    if (!response.ok) {
      if (response.status === 401) {
        return null // User not authenticated
      }
      throw new Error(`Failed to fetch user data: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching user data:', error)
    return null
  }
}

export async function fetchUsers(role = 'STUDENT', courseId?: string): Promise<User[]> {
  try {
    let url = `${API_BASE}/users?role=${role}`
    if (courseId) {
      url += `&courseId=${courseId}`
    }
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

// Client-side API functions (for use in components)
export async function createCourse(courseData: Partial<Course>): Promise<Course | null> {
  try {
    const response = await fetch('/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData)
    })
    
    if (!response.ok) {
      throw new Error(`Failed to create course: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error creating course:', error)
    return null
  }
}

export async function createAssignment(assignmentData: Partial<Assignment>): Promise<Assignment | null> {
  try {
    const response = await fetch('/api/assignments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assignmentData)
    })
    
    if (!response.ok) {
      throw new Error(`Failed to create assignment: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error creating assignment:', error)
    return null
  }
}

export async function submitAssignment(submissionData: {
  assignmentId: string
  fileUrl: string
  fileName: string
  fileSize: number
}): Promise<Submission | null> {
  try {
    const response = await fetch('/api/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData)
    })
    
    if (!response.ok) {
      throw new Error(`Failed to submit assignment: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error submitting assignment:', error)
    return null
  }
}

export async function gradeSubmission(submissionId: string, grade: number, feedback?: string): Promise<Submission | null> {
  try {
    const response = await fetch('/api/submissions', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: submissionId,
        grade,
        feedback,
        status: 'GRADED'
      })
    })
    
    if (!response.ok) {
      throw new Error(`Failed to grade submission: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error grading submission:', error)
    return null
  }
}

export async function awardBadge(badgeId: string, userId: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/badges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ badgeId, userId })
    })
    
    if (!response.ok) {
      throw new Error(`Failed to award badge: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error awarding badge:', error)
    return { success: false, message: 'Failed to award badge' }
  }
}

// AI Insights
export interface AiInsightsData {
  averageGrade: number
  lateSubmissions: number
  riskStudents: number
  atRiskStudents: Array<{
    id: string
    name: string
    averageGrade: number
    lateSubmissions: number
  }>
  trend: number[]
  completionRate: number
  gradeDistribution: {
    'A (90-100)': number
    'B (80-89)': number
    'C (70-79)': number
    'D (60-69)': number
    'F (<60)': number
  }
  insights: Array<{
    type: string
    message: string
    severity: string
  }>
  period: string
  totalSubmissions: number
  totalStudents: number
  totalCourses: number
  trendChange: number
}

export async function fetchAiInsights(
  period: 'week' | 'month' | 'semester' = 'week',
  courseId?: string
): Promise<AiInsightsData | null> {
  try {
    const params = new URLSearchParams({ period })
    if (courseId) {
      params.append('courseId', courseId)
    }

    const response = await fetch(`/api/ai/insights?${params.toString()}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch AI insights: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching AI insights:', error)
    return null
  }
}