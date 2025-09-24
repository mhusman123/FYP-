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
  Lock
} from 'lucide-react'

// Mock data - replace with actual API calls
const mockBadges = [
  // Earned Badges
  {
    id: '1',
    name: 'Early Bird',
    description: 'Submitted 5 assignments before the deadline',
    icon: '🐦',
    category: 'Academic',
    rarity: 'Common',
    pointsWorth: 50,
    earnedAt: '2025-09-15T10:30:00',
    isEarned: true,
    requirements: 'Submit 5 assignments early',
    progress: 5,
    total: 5
  },
  {
    id: '2',
    name: 'Perfect Score',
    description: 'Achieved 100% on an assignment',
    icon: '💯',
    category: 'Academic',
    rarity: 'Rare',
    pointsWorth: 100,
    earnedAt: '2025-09-18T14:20:00',
    isEarned: true,
    requirements: 'Get 100% on any assignment',
    progress: 1,
    total: 1
  },
  {
    id: '3',
    name: 'Study Streak',
    description: 'Maintained a 7-day learning streak',
    icon: '🔥',
    category: 'Engagement',
    rarity: 'Common',
    pointsWorth: 75,
    earnedAt: '2025-09-10T09:15:00',
    isEarned: true,
    requirements: 'Be active for 7 consecutive days',
    progress: 7,
    total: 7
  },
  {
    id: '4',
    name: 'Team Player',
    description: 'Participated in 3 group projects',
    icon: '🤝',
    category: 'Collaboration',
    rarity: 'Uncommon',
    pointsWorth: 125,
    earnedAt: '2025-08-25T16:45:00',
    isEarned: true,
    requirements: 'Complete 3 group assignments',
    progress: 3,
    total: 3
  },
  {
    id: '5',
    name: 'Quick Learner',
    description: 'Completed a course in record time',
    icon: '⚡',
    category: 'Achievement',
    rarity: 'Rare',
    pointsWorth: 200,
    earnedAt: '2025-08-20T11:30:00',
    isEarned: true,
    requirements: 'Complete course 50% faster than average',
    progress: 1,
    total: 1
  },

  // Available Badges (Not Earned)
  {
    id: '6',
    name: 'Night Owl',
    description: 'Submit assignments after 10 PM',
    icon: '🦉',
    category: 'Engagement',
    rarity: 'Common',
    pointsWorth: 50,
    isEarned: false,
    requirements: 'Submit 3 assignments after 10 PM',
    progress: 1,
    total: 3
  },
  {
    id: '7',
    name: 'Overachiever',
    description: 'Score above 95% on 5 assignments',
    icon: '🎯',
    category: 'Academic',
    rarity: 'Epic',
    pointsWorth: 300,
    isEarned: false,
    requirements: 'Get 95%+ on 5 assignments',
    progress: 2,
    total: 5
  },
  {
    id: '8',
    name: 'Course Master',
    description: 'Complete all assignments in a course with A+ grades',
    icon: '👑',
    category: 'Achievement',
    rarity: 'Legendary',
    pointsWorth: 500,
    isEarned: false,
    requirements: 'Get A+ on all assignments in one course',
    progress: 0,
    total: 1
  },
  {
    id: '9',
    name: 'Helpful Helper',
    description: 'Help 10 classmates with their questions',
    icon: '💡',
    category: 'Collaboration',
    rarity: 'Uncommon',
    pointsWorth: 150,
    isEarned: false,
    requirements: 'Answer 10 student questions',
    progress: 4,
    total: 10
  },
  {
    id: '10',
    name: 'Consistency King',
    description: 'Submit assignments on time for 30 days',
    icon: '📅',
    category: 'Engagement',
    rarity: 'Epic',
    pointsWorth: 250,
    isEarned: false,
    requirements: '30 consecutive on-time submissions',
    progress: 15,
    total: 30
  }
]

const earnedBadges = mockBadges.filter(badge => badge.isEarned)
const availableBadges = mockBadges.filter(badge => !badge.isEarned)

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

export default function BadgesPage() {
  const totalEarned = earnedBadges.length
  const totalAvailable = mockBadges.length
  const totalPoints = earnedBadges.reduce((sum, badge) => sum + badge.pointsWorth, 0)

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

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">Badge Points</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{totalPoints}</div>
            <p className="text-xs text-muted-foreground">
              Points from badges
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

      {/* Recently Earned */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recently Earned</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {earnedBadges.slice(0, 3).map((badge) => {
            const CategoryIcon = getCategoryIcon(badge.category)
            return (
              <Card key={badge.id} className="hover:shadow-lg transition-shadow border-green-200 bg-green-50/30">
                <CardHeader className="text-center pb-2">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <CardTitle className="text-lg">{badge.name}</CardTitle>
                  <div className="flex items-center justify-center gap-2">
                    <Badge className={getRarityColor(badge.rarity)}>
                      {badge.rarity}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <CategoryIcon className="w-3 h-3 mr-1" />
                      {badge.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {badge.description}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{badge.pointsWorth} points</span>
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
            const CategoryIcon = getCategoryIcon(badge.category)
            return (
              <Card key={badge.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="text-3xl">{badge.icon}</div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{badge.pointsWorth}</span>
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{badge.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Badge className={getRarityColor(badge.rarity)}>
                        {badge.rarity}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <CategoryIcon className="w-3 h-3 mr-1" />
                        {badge.category}
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
          {availableBadges.map((badge) => {
            const CategoryIcon = getCategoryIcon(badge.category)
            const progressPercentage = (badge.progress / badge.total) * 100
            
            return (
              <Card key={badge.id} className="hover:shadow-lg transition-shadow opacity-75">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="text-3xl grayscale">{badge.icon}</div>
                    <div className="flex items-center gap-1">
                      <Lock className="h-4 w-4 text-gray-400" />
                      <Star className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{badge.pointsWorth}</span>
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-600">{badge.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Badge className={getRarityColor(badge.rarity)}>
                        {badge.rarity}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <CategoryIcon className="w-3 h-3 mr-1" />
                        {badge.category}
                      </Badge>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {badge.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{badge.progress}/{badge.total}</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {badge.requirements}
                    </div>
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