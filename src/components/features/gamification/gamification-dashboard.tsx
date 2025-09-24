'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trophy, Medal, Award, Star, Target, Zap } from 'lucide-react'

interface LeaderboardEntry {
  rank: number
  userId: string
  userName: string
  userAvatar?: string
  totalPoints: number
  badgeCount: number
  change: number // Position change from last week
}

interface BadgeData {
  id: string
  name: string
  description: string
  icon: string
  color: string
  earned: boolean
  earnedAt?: string
  progress?: number
  requirement?: string
}

interface GamificationDashboardProps {
  userRank: number
  userPoints: number
  leaderboard: LeaderboardEntry[]
  badges: BadgeData[]
  weeklyProgress: {
    pointsEarned: number
    goal: number
  }
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />
    default:
      return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
  }
}

const getBadgeIcon = (iconName: string) => {
  const icons: Record<string, React.ReactNode> = {
    star: <Star className="h-6 w-6" />,
    target: <Target className="h-6 w-6" />,
    zap: <Zap className="h-6 w-6" />,
    trophy: <Trophy className="h-6 w-6" />,
    award: <Award className="h-6 w-6" />
  }
  return icons[iconName] || <Award className="h-6 w-6" />
}

export function GamificationDashboard({
  userRank,
  userPoints,
  leaderboard,
  badges,
  weeklyProgress
}: GamificationDashboardProps) {
  const earnedBadges = badges.filter(badge => badge.earned)
  const availableBadges = badges.filter(badge => !badge.earned)

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Rank</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{userRank}</div>
            <p className="text-xs text-muted-foreground">
              Out of {leaderboard.length} students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userPoints.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{weeklyProgress.pointsEarned} this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{earnedBadges.length}</div>
            <p className="text-xs text-muted-foreground">
              {availableBadges.length} more available
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Leaderboard
            </CardTitle>
            <CardDescription>
              Top performers this semester
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {leaderboard.slice(0, 10).map((entry) => (
              <div
                key={entry.userId}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  entry.rank <= 3 ? 'bg-muted' : ''
                }`}
              >
                <div className="flex items-center justify-center w-8">
                  {getRankIcon(entry.rank)}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={entry.userAvatar} alt={entry.userName} />
                  <AvatarFallback>{entry.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{entry.userName}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                      {entry.totalPoints.toLocaleString()} pts
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {entry.badgeCount} badges
                    </Badge>
                  </div>
                </div>
                {entry.change !== 0 && (
                  <div
                    className={`text-xs ${
                      entry.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {entry.change > 0 ? '↑' : '↓'}{Math.abs(entry.change)}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Weekly Goal
            </CardTitle>
            <CardDescription>
              Track your progress toward weekly point goals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Points this week</span>
                <span>
                  {weeklyProgress.pointsEarned} / {weeklyProgress.goal}
                </span>
              </div>
              <Progress
                value={(weeklyProgress.pointsEarned / weeklyProgress.goal) * 100}
                className="h-3"
              />
            </div>
            <div className="text-center text-sm text-muted-foreground">
              {weeklyProgress.pointsEarned >= weeklyProgress.goal ? (
                <span className="text-green-600 font-medium">🎉 Goal achieved!</span>
              ) : (
                <span>
                  {weeklyProgress.goal - weeklyProgress.pointsEarned} points to go
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Earned Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Your Badges
            </CardTitle>
            <CardDescription>
              Achievements you&apos;ve unlocked
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50"
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full"
                    style={{ backgroundColor: badge.color + '20', color: badge.color }}
                  >
                    {getBadgeIcon(badge.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {badge.earnedAt &&
                        new Date(badge.earnedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {earnedBadges.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No badges earned yet. Complete assignments to start earning!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Available Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Available Badges
            </CardTitle>
            <CardDescription>
              Badges you can earn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableBadges.slice(0, 4).map((badge) => (
              <div key={badge.id} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full opacity-50"
                    style={{ backgroundColor: badge.color + '20', color: badge.color }}
                  >
                    {getBadgeIcon(badge.icon)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{badge.name}</p>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                    {badge.requirement && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Requirement: {badge.requirement}
                      </p>
                    )}
                  </div>
                </div>
                {badge.progress !== undefined && (
                  <div className="ml-13 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{badge.progress}%</span>
                    </div>
                    <Progress value={badge.progress} className="h-2" />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}