import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  TrendingDown,
  Minus,
  Crown,
  Star,
  Target,
  Users
} from 'lucide-react'

// Mock data - replace with actual API calls
const mockLeaderboard = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: '/avatars/sarah.jpg',
    totalPoints: 2850,
    weeklyPoints: 420,
    rank: 1,
    previousRank: 2,
    level: 'Expert',
    badges: 28,
    streak: 15,
    coursesCompleted: 8,
    assignmentsSubmitted: 45
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: '/avatars/michael.jpg',
    totalPoints: 2720,
    weeklyPoints: 380,
    rank: 2,
    previousRank: 1,
    level: 'Expert',
    badges: 25,
    streak: 12,
    coursesCompleted: 7,
    assignmentsSubmitted: 42
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    avatar: '/avatars/emily.jpg',
    totalPoints: 2650,
    weeklyPoints: 360,
    rank: 3,
    previousRank: 3,
    level: 'Advanced',
    badges: 22,
    streak: 8,
    coursesCompleted: 6,
    assignmentsSubmitted: 38
  },
  {
    id: '4',
    name: 'You',
    avatar: '/avatars/current-user.jpg',
    totalPoints: 2480,
    weeklyPoints: 340,
    rank: 4,
    previousRank: 5,
    level: 'Advanced',
    badges: 20,
    streak: 11,
    coursesCompleted: 6,
    assignmentsSubmitted: 35,
    isCurrentUser: true
  },
  {
    id: '5',
    name: 'David Kim',
    avatar: '/avatars/david.jpg',
    totalPoints: 2350,
    weeklyPoints: 295,
    rank: 5,
    previousRank: 4,
    level: 'Advanced',
    badges: 18,
    streak: 6,
    coursesCompleted: 5,
    assignmentsSubmitted: 33
  },
  {
    id: '6',
    name: 'Lisa Wang',
    avatar: '/avatars/lisa.jpg',
    totalPoints: 2180,
    weeklyPoints: 275,
    rank: 6,
    previousRank: 6,
    level: 'Intermediate',
    badges: 16,
    streak: 9,
    coursesCompleted: 5,
    assignmentsSubmitted: 30
  },
  {
    id: '7',
    name: 'Alex Thompson',
    avatar: '/avatars/alex.jpg',
    totalPoints: 2050,
    weeklyPoints: 250,
    rank: 7,
    previousRank: 8,
    level: 'Intermediate',
    badges: 14,
    streak: 4,
    coursesCompleted: 4,
    assignmentsSubmitted: 28
  },
  {
    id: '8',
    name: 'Maria Garcia',
    avatar: '/avatars/maria.jpg',
    totalPoints: 1920,
    weeklyPoints: 230,
    rank: 8,
    previousRank: 7,
    level: 'Intermediate',
    badges: 13,
    streak: 7,
    coursesCompleted: 4,
    assignmentsSubmitted: 25
  }
]

const currentUser = mockLeaderboard.find(user => user.isCurrentUser)!

function getRankIcon(rank: number) {
  switch (rank) {
    case 1: return <Crown className="h-5 w-5 text-yellow-500" />
    case 2: return <Medal className="h-5 w-5 text-gray-400" />
    case 3: return <Award className="h-5 w-5 text-amber-600" />
    default: return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
  }
}

function getTrendIcon(current: number, previous: number) {
  if (current < previous) return <TrendingUp className="h-4 w-4 text-green-600" />
  if (current > previous) return <TrendingDown className="h-4 w-4 text-red-600" />
  return <Minus className="h-4 w-4 text-gray-600" />
}

function getLevelColor(level: string) {
  switch (level) {
    case 'Expert': return 'bg-purple-100 text-purple-800'
    case 'Advanced': return 'bg-blue-100 text-blue-800'
    case 'Intermediate': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function LeaderboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
          <p className="text-muted-foreground">
            See how you stack up against your peers
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Users className="mr-2 h-4 w-4" />
            All Time
          </Button>
          <Button>
            <Target className="mr-2 h-4 w-4" />
            This Week
          </Button>
        </div>
      </div>

      {/* Current User Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Rank</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">#{currentUser.rank}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {getTrendIcon(currentUser.rank, currentUser.previousRank)}
              {currentUser.rank < currentUser.previousRank 
                ? `Up ${currentUser.previousRank - currentUser.rank} spots`
                : currentUser.rank > currentUser.previousRank 
                  ? `Down ${currentUser.rank - currentUser.previousRank} spots`
                  : 'No change'
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.totalPoints.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{currentUser.weeklyPoints} this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{currentUser.streak}</div>
            <p className="text-xs text-muted-foreground">
              Days active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentUser.level}</div>
            <p className="text-xs text-muted-foreground">
              {currentUser.badges} badges earned
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top 3 Podium */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Top Performers</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {mockLeaderboard.slice(0, 3).map((user, index) => (
            <Card key={user.id} className={`relative ${index === 0 ? 'ring-2 ring-yellow-500' : ''}`}>
              {index === 0 && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    🏆 CHAMPION
                  </div>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-2">
                  {getRankIcon(user.rank)}
                </div>
                <Avatar className="w-16 h-16 mx-auto mb-3">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-lg">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{user.name}</CardTitle>
                <CardDescription>
                  <Badge className={getLevelColor(user.level)}>
                    {user.level}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <div>
                  <div className="text-2xl font-bold text-primary">{user.totalPoints.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Total Points</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold">{user.badges}</div>
                    <div className="text-muted-foreground">Badges</div>
                  </div>
                  <div>
                    <div className="font-semibold">{user.streak}</div>
                    <div className="text-muted-foreground">Day Streak</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  +{user.weeklyPoints} points this week
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Full Leaderboard */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Full Rankings</h2>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Leaderboard</CardTitle>
            <CardDescription>
              Rankings based on points earned this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockLeaderboard.map((user) => (
                <div 
                  key={user.id} 
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    user.isCurrentUser ? 'bg-primary/5 border-primary' : 'bg-muted/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getRankIcon(user.rank)}
                    </div>
                    
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-medium ${user.isCurrentUser ? 'text-primary' : ''}`}>
                          {user.name}
                          {user.isCurrentUser && (
                            <Badge variant="secondary" className="ml-2 text-xs">You</Badge>
                          )}
                        </h3>
                        <Badge className={getLevelColor(user.level)}>
                          {user.level}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {user.coursesCompleted} courses • {user.assignmentsSubmitted} assignments
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="text-lg font-bold">{user.totalPoints.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          +{user.weeklyPoints} this week
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(user.rank, user.previousRank)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Points Progress */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Points to Next Level</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Current: {currentUser.level}</span>
                <span>Next: Expert</span>
              </div>
              <Progress value={75} className="h-2" />
              <div className="text-center text-sm text-muted-foreground">
                370 more points needed to reach Expert level
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}