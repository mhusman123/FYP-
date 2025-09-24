// Core User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  STUDENT = 'STUDENT',
  EDUCATOR = 'EDUCATOR',
  ADMIN = 'ADMIN'
}

// Assignment Types
export interface Assignment {
  id: string;
  title: string;
  description: string;
  instructions: string;
  dueDate: Date;
  maxPoints: number;
  educatorId: string;
  courseId: string;
  allowedFileTypes: string[];
  maxFileSize: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  submittedAt: Date;
  isLate: boolean;
  plagiarismScore?: number;
  grade?: number;
  feedback?: string;
  status: SubmissionStatus;
}

export enum SubmissionStatus {
  SUBMITTED = 'SUBMITTED',
  GRADED = 'GRADED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  RETURNED = 'RETURNED'
}

// Gamification Types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  criteria: BadgeCriteria;
  points: number;
}

export interface BadgeCriteria {
  type: 'ASSIGNMENT_COUNT' | 'GRADE_AVERAGE' | 'STREAK' | 'PARTICIPATION';
  threshold: number;
  timeframe?: string;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt: Date;
  badge: Badge;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  userAvatar?: string;
  totalPoints: number;
  badgeCount: number;
  rank: number;
}

// Plagiarism Detection Types
export interface PlagiarismReport {
  id: string;
  submissionId: string;
  overallScore: number;
  sources: PlagiarismSource[];
  generatedAt: Date;
}

export interface PlagiarismSource {
  id: string;
  sourceType: 'WEB' | 'DATABASE' | 'STUDENT_SUBMISSION';
  sourceUrl?: string;
  sourceTitle: string;
  matchPercentage: number;
  matchedText: string[];
}

// Grade Adjustment Types (Your unique feature)
export interface GradeAdjustmentRequest {
  id: string;
  submissionId: string;
  studentId: string;
  reason: AdjustmentReason;
  description: string;
  supportingDocuments?: string[];
  requestedAt: Date;
  status: AdjustmentStatus;
  reviewedBy?: string;
  reviewedAt?: Date;
  decision?: string;
  adjustedGrade?: number;
}

export enum AdjustmentReason {
  MEDICAL = 'MEDICAL',
  FAMILY_EMERGENCY = 'FAMILY_EMERGENCY',
  TECHNICAL_ISSUES = 'TECHNICAL_ISSUES',
  ACCESSIBILITY = 'ACCESSIBILITY',
  OTHER = 'OTHER'
}

export enum AdjustmentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REQUIRES_INFO = 'REQUIRES_INFO'
}

// Course Management Types
export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  educatorId: string;
  semester: string;
  year: number;
  isActive: boolean;
  students: User[];
  assignments: Assignment[];
  createdAt: Date;
  updatedAt: Date;
}

// Dashboard Types
export interface StudentDashboard {
  user: User;
  recentSubmissions: Submission[];
  upcomingDeadlines: Assignment[];
  badges: UserBadge[];
  totalPoints: number;
  rank: number;
  courses: Course[];
}

export interface EducatorDashboard {
  user: User;
  courses: Course[];
  recentSubmissions: Submission[];
  gradingQueue: Submission[];
  adjustmentRequests: GradeAdjustmentRequest[];
  analytics: {
    totalStudents: number;
    averageGrade: number;
    submissionRate: number;
    plagiarismAlerts: number;
  };
}

// Form Types
export interface AssignmentFormData {
  title: string;
  description: string;
  instructions: string;
  dueDate: string;
  maxPoints: number;
  allowedFileTypes: string[];
  maxFileSize: number;
}

export interface SubmissionFormData {
  file: File;
  comments?: string;
}

export interface GradeAdjustmentFormData {
  reason: AdjustmentReason;
  description: string;
  supportingDocuments?: File[];
}