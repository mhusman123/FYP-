import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Award, 
  Trophy, 
  Star, 
  Target, 
  BookOpen,
  Users,
  Zap,
  Calendar,
  CheckCircle,
  Lock,
  TrendingUp,
  BarChart3,
  Clock,
  Flame
} from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'





function getRarityColor(rarity: string) {
  switch (rarity) {
    case 'Common': return 'bg-gray-100 text-gray-800'
    case 'Uncommon': return 'bg-green-100 text-green-800'
    case 'Rare': return 'bg-blue-100 text-blue-800'
    case 'Epic': return 'bg-purple-100 text-purple-800'
    case 'Legendary': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function getCategoryIcon(category: string) {
  switch (category) {
    case 'Academic': return BookOpen
    case 'Engagement': return Zap
    case 'Collaboration': return Users
    case 'Achievement': return Trophy
    default: return Award
  }
}

export default async function BadgesPage() {
  const session = await getServerSession(authOptions)
  
  // Fetch real badges data using Prisma
  interface Badge { id: string; name: string; description: string; icon: string; color: string; points: number }
  let earnedBadges: (Badge & { earnedAt: string; isEarned: boolean })[] = []
  let allBadges: Badge[] = []
  
  if (session?.user?.id) {
    // Get all badges
    allBadges = await prisma.badge.findMany()
    
    // Get earned badges for the user
    const userBadges = await prisma.userBadge.findMany({
      where: { userId: session.user.id },
      include: {
        badge: true
      }
    })
    
    earnedBadges = userBadges.map(ub => ({
      ...ub.badge,
      earnedAt: ub.earnedAt.toISOString(),
      isEarned: true
    }))
  }
  
  // Get available badges (not earned yet)
  const earnedBadgeIds = earnedBadges.map(b => b.id)
  const availableBadges = allBadges.filter(badge => !earnedBadgeIds.includes(badge.id))
  
  const totalEarned = earnedBadges.length
  const totalAvailable = allBadges.length
  const totalPoints = earnedBadges.reduce((sum: number, badge: { points: number }) => sum + badge.points, 0)
  
  // Enhanced badge analytics with mock data
  const badgeAnalytics = {
    weeklyProgress: 240, // Points earned this week
    monthlyProgress: 860, // Points earned this month
    streak: 7, // Days in a row earning points
    nextMilestone: 2000, // Next major milestone
    completionRate: Math.round((totalEarned / totalAvailable) * 100),
    rank: 'Gold Scholar', // Student rank based on points
    leaderboardPosition: 12, // Position in class leaderboard
    achievements: {
      courses: 2, // Courses completed
      assignments: 28, // Assignments submitted
      perfectScores: 5, // Perfect assignment scores
      helpingOthers: 3, // Times helped classmates
      earlySubmissions: 15, // Early assignment submissions
      attendancePerfect: 4 // Weeks with perfect attendance
    },
    recentActivity: [
      { action: 'Earned "Algorithm Master" badge', points: 150, date: '2025-09-22' },
      { action: 'Perfect attendance week', points: 50, date: '2025-09-20' },
      { action: 'Helped 3 classmates', points: 75, date: '2025-09-19' },
      { action: 'Early assignment submission', points: 25, date: '2025-09-18' }
    ]
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Badges</h1>
          <p className="text-muted-foreground">
            Collect badges by completing achievements and milestones
          </p>
        </div>
        <Button>
          <Target className="mr-2 h-4 w-4" />
          View All Available
        </Button>
      </div>

      {/* Enhanced Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Award className="h-4 w-4 text-gold-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalEarned}</div>
            <p className="text-xs text-muted-foreground">
              of {totalAvailable} available
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{totalPoints}</div>
            <p className="text-xs text-muted-foreground">
              Badge points earned
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{badgeAnalytics.weeklyProgress}</div>
            <p className="text-xs text-muted-foreground">
              Points earned
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
            <Target className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-purple-600">{badgeAnalytics.rank}</div>
            <p className="text-xs text-muted-foreground">
              #{badgeAnalytics.leaderboardPosition} in class
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round((totalEarned / totalAvailable) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Badges unlocked
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rarest Badge</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">Rare</div>
            <p className="text-xs text-muted-foreground">
              Highest rarity earned
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress to Next Milestone */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Next Milestone
          </CardTitle>
          <CardDescription>
            You&apos;re {badgeAnalytics.nextMilestone - totalPoints} points away from your next major milestone
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to {badgeAnalytics.nextMilestone} points</span>
              <span>{totalPoints}/{badgeAnalytics.nextMilestone}</span>
            </div>
            <Progress value={(totalPoints / badgeAnalytics.nextMilestone) * 100} className="h-3" />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-blue-600">{badgeAnalytics.streak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">{badgeAnalytics.monthlyProgress}</div>
              <div className="text-xs text-muted-foreground">This Month</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">{Math.round((totalPoints / badgeAnalytics.nextMilestone) * 100)}%</div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievement Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              Achievement Breakdown
            </CardTitle>
            <CardDescription>
              Points earned across different activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Courses Completed</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{badgeAnalytics.achievements.courses}</div>
                  <div className="text-xs text-muted-foreground">200 pts each</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Assignments Submitted</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{badgeAnalytics.achievements.assignments}</div>
                  <div className="text-xs text-muted-foreground">10 pts each</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Perfect Scores</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{badgeAnalytics.achievements.perfectScores}</div>
                  <div className="text-xs text-muted-foreground">50 pts each</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Helped Classmates</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{badgeAnalytics.achievements.helpingOthers}</div>
                  <div className="text-xs text-muted-foreground">25 pts each</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Early Submissions</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{badgeAnalytics.achievements.earlySubmissions}</div>
                  <div className="text-xs text-muted-foreground">15 pts each</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest achievements and point gains
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {badgeAnalytics.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{new Date(activity.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-600">+{activity.points}</div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recently Earned */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recently Earned</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {earnedBadges.slice(0, 3).map((badge) => {
            const CategoryIcon = getCategoryIcon('achievement') // Default category
            return (
              <Card key={badge.id} className="hover:shadow-lg transition-shadow border-green-200 bg-green-50/30">
                <CardHeader className="text-center pb-2">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <CardTitle className="text-lg">{badge.name}</CardTitle>
                  <div className="flex items-center justify-center gap-2">
                    <Badge className={getRarityColor('common')}>
                      common
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <CategoryIcon className="w-3 h-3 mr-1" />
                      achievement
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {badge.description}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{badge.points} points</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Earned on {new Date(badge.earnedAt!).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* All Earned Badges */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">All Earned Badges ({totalEarned})</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {earnedBadges.map((badge) => {
            const CategoryIcon = getCategoryIcon('achievement') // Default category
            return (
              <Card key={badge.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="text-3xl">{badge.icon}</div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{badge.points}</span>
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{badge.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Badge className={getRarityColor('common')}>
                        common
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <CategoryIcon className="w-3 h-3 mr-1" />
                        achievement
                      </Badge>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {badge.description}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <Calendar className="inline h-3 w-3 mr-1" />
                    Earned {new Date(badge.earnedAt!).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Available Badges (In Progress) */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Available Badges</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {availableBadges.slice(0, 6).map((badge) => {
            const CategoryIcon = getCategoryIcon('achievement')
            
            return (
              <Card key={badge.id} className="hover:shadow-lg transition-shadow opacity-75">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="text-3xl opacity-50">{badge.icon}</div>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{badge.points}</span>
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-700">{badge.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Badge className={getRarityColor('common')}>
                        common
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <CategoryIcon className="w-3 h-3 mr-1" />
                        achievement
                      </Badge>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {badge.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">0/1</span>
                    </div>
                    <Progress value={0} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Complete various achievements to earn this badge
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}