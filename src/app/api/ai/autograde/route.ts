/**
 * AI Autograder 2.0 API Endpoint
 * Automates grading & feedback generation for coding or quiz submissions
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { PrismaClient } from '@prisma/client';

// Extend prisma client type to include aiFeedback
type ExtendedPrismaClient = PrismaClient & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  aiFeedback: any;
};

const extendedPrisma = prisma as ExtendedPrismaClient;

interface AutogradeRequest {
  assignmentId: string;
  fileUrl: string;
  submissionId?: string; // Optional if submission already exists
}

// Simulated feedback templates based on score ranges
const generateFeedback = (score: number): string => {
  const feedbackTemplates = {
    excellent: [
      "Excellent work! Your solution demonstrates strong understanding of the concepts. Code is clean and well-structured.",
      "Outstanding submission! Your implementation is efficient and follows best practices.",
      "Great job! Your solution handles edge cases well and shows attention to detail.",
    ],
    good: [
      "Good work! Your solution is correct but could be optimized for better performance.",
      "Well done! Consider adding more comments to explain complex logic.",
      "Nice implementation! You might want to explore alternative approaches for efficiency.",
    ],
    satisfactory: [
      "Satisfactory work. Your solution works but has room for improvement in code organization.",
      "Acceptable submission. Consider edge cases and add error handling for robustness.",
      "Good attempt! Review the solution for potential optimizations and cleaner code structure.",
    ],
    needsImprovement: [
      "Your solution needs improvement. Edge cases are missing and code could be more readable.",
      "Partial credit given. Work on code structure and consider alternative algorithms.",
      "Basic implementation present but lacks optimization. Review course materials for better approaches.",
    ],
  };

  let templates: string[];
  if (score >= 90) {
    templates = feedbackTemplates.excellent;
  } else if (score >= 80) {
    templates = feedbackTemplates.good;
  } else if (score >= 75) {
    templates = feedbackTemplates.satisfactory;
  } else {
    templates = feedbackTemplates.needsImprovement;
  }

  // Pick a random template
  return templates[Math.floor(Math.random() * templates.length)];
};

// Simulate test case checks
const simulateTestCases = async (): Promise<{ score: number; testResults: string }> => {
  // Simulate processing time (0.5-2 seconds)
  const processingTime = 500 + Math.random() * 1500;
  await new Promise(resolve => setTimeout(resolve, processingTime));

  // Generate random score between 70-95
  const score = Math.floor(70 + Math.random() * 26);

  // Simulate test results
  const totalTests = 10;
  const passedTests = Math.floor((score / 100) * totalTests);
  const testResults = `Passed ${passedTests}/${totalTests} test cases`;

  return { score, testResults };
};

/**
 * POST /api/ai/autograde
 * 
 * Request Body:
 * {
 *   assignmentId: string;
 *   fileUrl: string;
 *   submissionId?: string;
 * }
 * 
 * Response:
 * {
 *   score: number;
 *   feedback: string;
 *   submissionId: string;
 *   aiFeedbackId: string;
 * }
 */
export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, role: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Parse request body
    const body: AutogradeRequest = await req.json();
    const { assignmentId, fileUrl, submissionId } = body;

    if (!assignmentId || !fileUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: assignmentId and fileUrl are required' },
        { status: 400 }
      );
    }

    // Verify assignment exists
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      select: { id: true, maxPoints: true, title: true },
    });

    if (!assignment) {
      return NextResponse.json(
        { error: 'Assignment not found' },
        { status: 404 }
      );
    }

    // Get or verify submission
    let submission;
    if (submissionId) {
      submission = await prisma.submission.findUnique({
        where: { id: submissionId },
      });

      if (!submission) {
        return NextResponse.json(
          { error: 'Submission not found' },
          { status: 404 }
        );
      }

      // Check if already graded by AI
      const existingFeedback = await extendedPrisma.aiFeedback.findUnique({
        where: { submissionId: submission.id },
      });

      if (existingFeedback) {
        return NextResponse.json(
          {
            score: existingFeedback.score,
            feedback: existingFeedback.feedback,
            submissionId: submission.id,
            aiFeedbackId: existingFeedback.id,
            message: 'Already graded',
          },
          { status: 200 }
        );
      }
    } else {
      // Find submission by assignment and student
      submission = await prisma.submission.findUnique({
        where: {
          assignmentId_studentId: {
            assignmentId,
            studentId: user.id,
          },
        },
      });

      if (!submission) {
        return NextResponse.json(
          { error: 'Submission not found for this assignment' },
          { status: 404 }
        );
      }

      // Check if already graded by AI
      const existingFeedback = await extendedPrisma.aiFeedback.findUnique({
        where: { submissionId: submission.id },
      });

      if (existingFeedback) {
        return NextResponse.json(
          {
            score: existingFeedback.score,
            feedback: existingFeedback.feedback,
            submissionId: submission.id,
            aiFeedbackId: existingFeedback.id,
            message: 'Already graded',
          },
          { status: 200 }
        );
      }
    }

    // Simulate AI autograding process
    console.log(`[AI Autograder] Processing submission ${submission.id} for assignment ${assignment.title}`);
    
    const { score, testResults } = await simulateTestCases();
    
    // Generate feedback based on score
    const baseFeedback = generateFeedback(score);
    const fullFeedback = `${baseFeedback}\n\n**Test Results:** ${testResults}\n\n**AI Wrapper Autograder Feedback** ✨\nThis feedback was automatically generated by our AI-powered autograding system.`;

    // Save AI feedback to database
    const aiFeedback = await extendedPrisma.aiFeedback.create({
      data: {
        studentId: user.id,
        assignmentId,
        submissionId: submission.id,
        score,
        feedback: fullFeedback,
      },
    });

    // Update submission with grade and feedback
    await prisma.submission.update({
      where: { id: submission.id },
      data: {
        grade: score,
        feedback: fullFeedback,
        status: 'GRADED',
      },
    });

    console.log(`[AI Autograder] Successfully graded submission ${submission.id} with score ${score}`);

    return NextResponse.json({
      score,
      feedback: fullFeedback,
      submissionId: submission.id,
      aiFeedbackId: aiFeedback.id,
    });

  } catch (error) {
    console.error('[AI Autograder] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error during autograding' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ai/autograde?submissionId={id}
 * 
 * Query Parameters:
 * - submissionId: string
 * 
 * Response:
 * {
 *   score: number;
 *   feedback: string;
 *   createdAt: string;
 * }
 */
export async function GET(req: NextRequest) {
  try {
    // Authenticate user
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, role: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get submissionId from query params
    const { searchParams } = new URL(req.url);
    const submissionId = searchParams.get('submissionId');

    if (!submissionId) {
      return NextResponse.json(
        { error: 'Missing required query parameter: submissionId' },
        { status: 400 }
      );
    }

    // Get AI feedback
    const aiFeedback = await extendedPrisma.aiFeedback.findUnique({
      where: { submissionId },
      include: {
        submission: {
          include: {
            assignment: { select: { title: true } },
          },
        },
      },
    });

    if (!aiFeedback) {
      return NextResponse.json(
        { error: 'AI feedback not found for this submission' },
        { status: 404 }
      );
    }

    // Verify user owns this feedback or is an educator
    if (user.role !== 'EDUCATOR' && aiFeedback.studentId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized to view this feedback' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      score: aiFeedback.score,
      feedback: aiFeedback.feedback,
      createdAt: aiFeedback.createdAt.toISOString(),
      assignmentTitle: aiFeedback.submission.assignment.title,
    });

  } catch (error) {
    console.error('[AI Autograder] Error fetching feedback:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
