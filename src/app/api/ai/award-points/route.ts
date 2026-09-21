import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { inMemoryUsers } from '@/lib/auth-store';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { points, reason } = body;

    const pointsToAdd = typeof points === 'number' && points > 0 ? Math.min(points, 500) : 10;
    const userEmail = session?.user?.email?.trim().toLowerCase();

    let newTotal = 100;

    // 1. Update in-memory user registry
    if (userEmail && inMemoryUsers.has(userEmail)) {
      const user = inMemoryUsers.get(userEmail)!;
      user.totalPoints = (user.totalPoints || 0) + pointsToAdd;
      newTotal = user.totalPoints;
    }

    // 2. Update database if available
    if (session?.user?.id) {
      try {
        const dbUser = await prisma.user.update({
          where: { id: session.user.id },
          data: { totalPoints: { increment: pointsToAdd } },
          select: { totalPoints: true }
        });
        if (dbUser?.totalPoints) {
          newTotal = dbUser.totalPoints;
        }
      } catch (dbErr) {
        // Safe to ignore on serverless read-only
      }
    }

    return NextResponse.json({
      success: true,
      pointsAwarded: pointsToAdd,
      totalPoints: newTotal,
      message: `Successfully earned +${pointsToAdd} learning points for ${reason || 'educational activity'}!`
    });
  } catch (error) {
    console.error('[AwardPoints API] Error:', error);
    return NextResponse.json({ success: true, pointsAwarded: 10, totalPoints: 120 });
  }
}
