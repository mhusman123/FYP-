import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

// GET /api/badges - Get badges
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const earned = searchParams.get('earned') === 'true'

    if (earned) {
      // Get user's earned badges
      const userBadges = await prisma.userBadge.findMany({
        where: { userId: session.user.id },
        include: {
          badge: true
        },
        orderBy: { earnedAt: 'desc' }
      })

      const earnedBadges = userBadges.map(ub => ({
        id: ub.badge.id,
        name: ub.badge.name,
        description: ub.badge.description,
        icon: ub.badge.icon,
        color: ub.badge.color,
        points: ub.badge.points,
        isEarned: true,
        earnedAt: ub.earnedAt.toISOString(),
        criteria: typeof ub.badge.criteria === 'string' 
          ? JSON.parse(ub.badge.criteria) 
          : ub.badge.criteria,
        progress: 100 // Already earned
      }))

      return NextResponse.json(earnedBadges)
    }

    // Get all badges with user's progress
    const allBadges = await prisma.badge.findMany({
      orderBy: { points: 'asc' }
    })

    const userBadges = await prisma.userBadge.findMany({
      where: { userId: session.user.id },
      select: { badgeId: true, earnedAt: true }
    })

    const earnedBadgeIds = new Set(userBadges.map(ub => ub.badgeId))
    const earnedBadgesMap = new Map(userBadges.map(ub => [ub.badgeId, ub.earnedAt]))

    const badgesWithProgress = allBadges.map(badge => {
      const isEarned = earnedBadgeIds.has(badge.id)
      
      // Mock progress calculation - in real app, this would be based on actual criteria
      let progress = 0
      if (isEarned) {
        progress = 100
      } else {
        // Mock progress based on user's current stats
        progress = Math.floor(Math.random() * 80) + 10 // 10-90% progress for unearned badges
      }

      return {
        id: badge.id,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        color: badge.color,
        points: badge.points,
        isEarned,
        earnedAt: isEarned ? earnedBadgesMap.get(badge.id)?.toISOString() : undefined,
        criteria: typeof badge.criteria === 'string' 
          ? JSON.parse(badge.criteria) 
          : badge.criteria,
        progress
      }
    })

    return NextResponse.json(badgesWithProgress)
  } catch (error) {
    console.error('Error fetching badges:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/badges/award - Award a badge to a user (System/Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { badgeId, userId } = body

    if (!badgeId || !userId) {
      return NextResponse.json({ error: 'Badge ID and User ID required' }, { status: 400 })
    }

    // Check if badge exists
    const badge = await prisma.badge.findUnique({
      where: { id: badgeId }
    })

    if (!badge) {
      return NextResponse.json({ error: 'Badge not found' }, { status: 404 })
    }

    // Check if user already has this badge
    const existingUserBadge = await prisma.userBadge.findUnique({
      where: {
        userId_badgeId: {
          userId,
          badgeId
        }
      }
    })

    if (existingUserBadge) {
      return NextResponse.json({ error: 'User already has this badge' }, { status: 400 })
    }

    // Award the badge
    const userBadge = await prisma.userBadge.create({
      data: {
        userId,
        badgeId
      },
      include: {
        badge: true,
        user: { select: { name: true, totalPoints: true } }
      }
    })

    // Update user's total points
    await prisma.user.update({
      where: { id: userId },
      data: {
        totalPoints: {
          increment: badge.points
        }
      }
    })

    return NextResponse.json({
      id: userBadge.id,
      badge: {
        id: userBadge.badge.id,
        name: userBadge.badge.name,
        description: userBadge.badge.description,
        icon: userBadge.badge.icon,
        color: userBadge.badge.color,
        points: userBadge.badge.points
      },
      user: {
        name: userBadge.user.name,
        newTotalPoints: userBadge.user.totalPoints + badge.points
      },
      earnedAt: userBadge.earnedAt.toISOString()
    }, { status: 201 })
  } catch (error) {
    console.error('Error awarding badge:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}