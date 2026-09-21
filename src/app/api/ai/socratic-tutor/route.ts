import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { generateSocraticTutorResponse } from '@/lib/ai-engine';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { prompt, history, modelId, subject, language } = body;

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const userName = session?.user?.name || 'Student';

    const result = await generateSocraticTutorResponse({
      prompt,
      history,
      modelId,
      subject: subject || 'General STEM & Technology',
      language: language || 'en',
      userName,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('[SocraticTutor API] Error:', error);
    return NextResponse.json(
      {
        reply: "I am ready to help you explore this concept! Let's break down your question into fundamental principles. What is the first equation or definition you associate with this topic?",
        modelUsed: 'SST Socratic Safeguard',
        suggestedFollowUps: [
          'Give me a step-by-step hint',
          'Quiz me on this concept with 3 questions',
          'Explain how this connects to my course'
        ],
        pointsAwarded: 5
      },
      { status: 200 }
    );
  }
}
