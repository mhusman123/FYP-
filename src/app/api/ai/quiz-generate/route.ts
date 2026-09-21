import { NextRequest, NextResponse } from 'next/server';
import { generateEducationalQuiz } from '@/lib/ai-engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, subject, difficulty, numQuestions } = body;

    const quiz = await generateEducationalQuiz({
      topic: topic || 'Calculus & Data Structures',
      subject: subject || 'Computer Science & Mathematics',
      difficulty: difficulty || 'intermediate',
      numQuestions: typeof numQuestions === 'number' ? numQuestions : 5,
    });

    return NextResponse.json({ quiz });
  } catch (error) {
    console.error('[QuizGenerate API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate quiz', details: String(error) },
      { status: 500 }
    );
  }
}
