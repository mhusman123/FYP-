import { z } from 'zod'

// ============================================
// Course Validation Schemas
// ============================================

export const createCourseSchema = z.object({
  name: z.string().min(3, 'Course name must be at least 3 characters').max(200),
  code: z.string().min(2, 'Course code must be at least 2 characters').max(20).toUpperCase(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  semester: z.enum(['Fall', 'Spring', 'Summer', 'Winter']),
  year: z.number().int().min(2020).max(2100),
  credits: z.number().int().min(1).max(6).default(3),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).default('INTERMEDIATE'),
  prerequisites: z.array(z.string()).default([]),
  isActive: z.boolean().default(true)
})

export const updateCourseSchema = createCourseSchema.partial()

export const enrollCourseSchema = z.object({
  courseId: z.string().cuid()
})

// ============================================
// Assignment Validation Schemas
// ============================================

export const createAssignmentSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  instructions: z.string().min(10, 'Instructions must be at least 10 characters'),
  dueDate: z.string().datetime().or(z.date()),
  maxPoints: z.number().int().min(1).max(1000),
  courseId: z.string().cuid(),
  allowedFileTypes: z.array(z.string()).min(1, 'At least one file type must be allowed'),
  maxFileSize: z.number().int().min(1024).max(104857600).default(10485760), // 1KB to 100MB, default 10MB
  isPublished: z.boolean().default(false)
})

export const updateAssignmentSchema = createAssignmentSchema.partial()

// ============================================
// Submission Validation Schemas
// ============================================

export const createSubmissionSchema = z.object({
  assignmentId: z.string().cuid(),
  fileUrl: z.string().url(),
  fileName: z.string().min(1).max(255),
  fileSize: z.number().int().min(1).max(104857600) // Max 100MB
})

export const gradeSubmissionSchema = z.object({
  grade: z.number().min(0),
  feedback: z.string().optional(),
  status: z.enum(['SUBMITTED', 'GRADED', 'UNDER_REVIEW', 'RETURNED']).default('GRADED')
})

export const updateSubmissionSchema = z.object({
  fileUrl: z.string().url().optional(),
  fileName: z.string().min(1).max(255).optional(),
  fileSize: z.number().int().min(1).max(104857600).optional()
})

// ============================================
// Grade Adjustment Request Schemas
// ============================================

export const createGradeAdjustmentSchema = z.object({
  submissionId: z.string().cuid(),
  reason: z.enum(['MEDICAL', 'FAMILY_EMERGENCY', 'TECHNICAL_ISSUES', 'ACCESSIBILITY', 'OTHER']),
  description: z.string().min(20, 'Please provide a detailed description (at least 20 characters)'),
  supportingDocuments: z.array(z.object({
    url: z.string().url(),
    name: z.string(),
    type: z.string()
  })).default([])
})

export const reviewGradeAdjustmentSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED', 'REQUIRES_INFO']),
  decision: z.string().min(10, 'Please provide a decision explanation'),
  adjustedGrade: z.number().min(0).optional()
})

// ============================================
// Query Parameter Schemas
// ============================================

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
})

export const courseFilterSchema = paginationSchema.extend({
  enrolled: z.coerce.boolean().optional(),
  semester: z.string().optional(),
  year: z.coerce.number().int().optional(),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
  search: z.string().optional()
})

export const assignmentFilterSchema = paginationSchema.extend({
  courseId: z.string().cuid().optional(),
  isPublished: z.coerce.boolean().optional(),
  status: z.enum(['upcoming', 'active', 'past']).optional()
})

export const submissionFilterSchema = paginationSchema.extend({
  assignmentId: z.string().cuid().optional(),
  courseId: z.string().cuid().optional(),
  status: z.enum(['SUBMITTED', 'GRADED', 'UNDER_REVIEW', 'RETURNED']).optional(),
  isLate: z.coerce.boolean().optional()
})

// ============================================
// Type exports
// ============================================

export type CreateCourseInput = z.infer<typeof createCourseSchema>
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>
export type EnrollCourseInput = z.infer<typeof enrollCourseSchema>

export type CreateAssignmentInput = z.infer<typeof createAssignmentSchema>
export type UpdateAssignmentInput = z.infer<typeof updateAssignmentSchema>

export type CreateSubmissionInput = z.infer<typeof createSubmissionSchema>
export type GradeSubmissionInput = z.infer<typeof gradeSubmissionSchema>
export type UpdateSubmissionInput = z.infer<typeof updateSubmissionSchema>

export type CreateGradeAdjustmentInput = z.infer<typeof createGradeAdjustmentSchema>
export type ReviewGradeAdjustmentInput = z.infer<typeof reviewGradeAdjustmentSchema>

export type CourseFilterParams = z.infer<typeof courseFilterSchema>
export type AssignmentFilterParams = z.infer<typeof assignmentFilterSchema>
export type SubmissionFilterParams = z.infer<typeof submissionFilterSchema>
