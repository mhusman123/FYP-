'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Bot, 
  TestTube, 
  CheckCircle, 
  Settings,
  Play,
  Save,
  Upload,
  Timer,
  Award,
  Plus,
  Trash2,
  Eye,
  BarChart
} from 'lucide-react'

// Mock autograding configurations
const mockAutogradingConfigs = [
  {
    id: '1',
    assignmentName: 'Binary Search Algorithm',
    course: 'Data Structures (CS-380)',
    language: 'python',
    status: 'active',
    totalPoints: 100,
    testCases: 15,
    passingRate: 89.5,
    avgExecutionTime: '1.2s',
    createdDate: '2025-09-15',
    criteria: {
      correctness: 60,
      codeQuality: 20,
      efficiency: 15,
      documentation: 5
    }
  },
  {
    id: '2', 
    assignmentName: 'React Component Library',
    course: 'Web Development (CS-401)',
    language: 'javascript',
    status: 'draft',
    totalPoints: 150,
    testCases: 28,
    passingRate: null,
    avgExecutionTime: null,
    createdDate: '2025-09-20',
    criteria: {
      functionality: 50,
      testCoverage: 25,
      codeStyle: 15,
      documentation: 10
    }
  }
]

const programmingLanguages = [
  { value: 'python', label: 'Python', icon: '🐍' },
  { value: 'javascript', label: 'JavaScript', icon: '🟨' },
  { value: 'java', label: 'Java', icon: '☕' },
  { value: 'cpp', label: 'C++', icon: '⚡' },
  { value: 'csharp', label: 'C#', icon: '🔷' },
  { value: 'go', label: 'Go', icon: '🐹' }
]

const gradingCriteria = [
  {
    name: 'Correctness',
    description: 'Does the code produce the correct output?',
    defaultWeight: 60,
    type: 'automated'
  },
  {
    name: 'Code Quality',
    description: 'Code style, naming conventions, and structure',
    defaultWeight: 20,
    type: 'static_analysis'
  },
  {
    name: 'Efficiency',
    description: 'Time and space complexity analysis',
    defaultWeight: 15,
    type: 'performance'
  },
  {
    name: 'Documentation',
    description: 'Comments, docstrings, and README',
    defaultWeight: 5,
    type: 'manual'
  }
]

export default function AutogradingSetup() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignment Autograding</h1>
          <p className="text-muted-foreground">
            Configure automated grading for programming assignments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Global Settings
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Autograder
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Autograders</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submissions Graded</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Grading Time</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3s</div>
            <p className="text-xs text-muted-foreground">Per submission</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">Successful executions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="configure">Configure</TabsTrigger>
          <TabsTrigger value="test-cases">Test Cases</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Existing Configurations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Autograding Configurations
              </CardTitle>
              <CardDescription>
                Manage your automated grading setups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAutogradingConfigs.map((config) => (
                  <div key={config.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{config.assignmentName}</h3>
                        <p className="text-sm text-muted-foreground">{config.course}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={config.status === 'active' ? 'default' : 'secondary'}>
                          {config.status}
                        </Badge>
                        <Badge variant="outline">
                          {programmingLanguages.find(lang => lang.value === config.language)?.icon} {config.language}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Total Points</p>
                        <p className="font-medium">{config.totalPoints}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Test Cases</p>
                        <p className="font-medium">{config.testCases}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Pass Rate</p>
                        <p className="font-medium">
                          {config.passingRate ? `${config.passingRate}%` : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Time</p>
                        <p className="font-medium">{config.avgExecutionTime || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="text-sm text-muted-foreground">
                        Created on {new Date(config.createdDate).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-1 h-3 w-3" />
                          View Results
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="mr-1 h-3 w-3" />
                          Configure
                        </Button>
                        <Button size="sm">
                          <Play className="mr-1 h-3 w-3" />
                          Run Test
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configure" className="space-y-6">
          <AutogradingConfigForm />
        </TabsContent>

        <TabsContent value="test-cases" className="space-y-6">
          <TestCasesManager />
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <AutogradingResults />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AutogradingConfigForm() {
  const [formData, setFormData] = useState({
    assignmentName: '',
    course: '',
    language: '',
    totalPoints: 100,
    timeLimit: 30,
    memoryLimit: 256,
    allowedAttempts: 3,
    enablePlagiarismCheck: true,
    enableCodeQuality: true
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Autograder Configuration
        </CardTitle>
        <CardDescription>
          Set up automated grading for a programming assignment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Settings */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="assignmentName">Assignment Name</Label>
            <Input 
              id="assignmentName"
              placeholder="e.g., Binary Search Implementation"
              value={formData.assignmentName}
              onChange={(e) => setFormData({...formData, assignmentName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Select value={formData.course} onValueChange={(value) => setFormData({...formData, course: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cs150">Programming Fundamentals (CS-150)</SelectItem>
                <SelectItem value="cs200">Data Structures & Algorithms (CS-200)</SelectItem>
                <SelectItem value="cs210">Computer Systems (CS-210)</SelectItem>
                <SelectItem value="cs300">Advanced Data Structures (CS-300)</SelectItem>
                <SelectItem value="cs310">Operating Systems (CS-310)</SelectItem>
                <SelectItem value="cs320">Database Systems (CS-320)</SelectItem>
                <SelectItem value="cs330">Computer Networks (CS-330)</SelectItem>
                <SelectItem value="cs340">Software Engineering (CS-340)</SelectItem>
                <SelectItem value="cs360">Computer Graphics (CS-360)</SelectItem>
                <SelectItem value="cs401">Advanced Web Development (CS-401)</SelectItem>
                <SelectItem value="cs410">Machine Learning (CS-410)</SelectItem>
                <SelectItem value="cs420">Artificial Intelligence (CS-420)</SelectItem>
                <SelectItem value="cs425">Human-Computer Interaction (CS-425)</SelectItem>
                <SelectItem value="cs430">Cybersecurity (CS-430)</SelectItem>
                <SelectItem value="cs440">Distributed Systems (CS-440)</SelectItem>
                <SelectItem value="cs450">Compiler Design (CS-450)</SelectItem>
                <SelectItem value="cs460">Mobile Development (CS-460)</SelectItem>
                <SelectItem value="cs470">Cloud Computing (CS-470)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="language">Programming Language</Label>
            <Select value={formData.language} onValueChange={(value) => setFormData({...formData, language: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {programmingLanguages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.icon} {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalPoints">Total Points</Label>
            <Input 
              id="totalPoints"
              type="number"
              value={formData.totalPoints}
              onChange={(e) => setFormData({...formData, totalPoints: parseInt(e.target.value)})}
            />
          </div>
        </div>

        {/* Execution Limits */}
        <div className="space-y-4">
          <h4 className="font-medium">Execution Limits</h4>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="timeLimit">Time Limit (seconds)</Label>
              <Input 
                id="timeLimit"
                type="number"
                value={formData.timeLimit}
                onChange={(e) => setFormData({...formData, timeLimit: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="memoryLimit">Memory Limit (MB)</Label>
              <Input 
                id="memoryLimit"
                type="number"
                value={formData.memoryLimit}
                onChange={(e) => setFormData({...formData, memoryLimit: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="allowedAttempts">Allowed Attempts</Label>
              <Input 
                id="allowedAttempts"
                type="number"
                value={formData.allowedAttempts}
                onChange={(e) => setFormData({...formData, allowedAttempts: parseInt(e.target.value)})}
              />
            </div>
          </div>
        </div>

        {/* Grading Criteria */}
        <div className="space-y-4">
          <h4 className="font-medium">Grading Criteria</h4>
          <div className="space-y-3">
            {gradingCriteria.map((criteria) => (
              <div key={criteria.name} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">{criteria.name}</p>
                  <p className="text-sm text-muted-foreground">{criteria.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Input 
                    type="number" 
                    className="w-20" 
                    defaultValue={criteria.defaultWeight}
                    min="0"
                    max="100"
                  />
                  <span className="text-sm">%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="space-y-4">
          <h4 className="font-medium">Advanced Settings</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable Plagiarism Detection</p>
                <p className="text-sm text-muted-foreground">Check for code similarity across submissions</p>
              </div>
              <Switch 
                checked={formData.enablePlagiarismCheck}
                onCheckedChange={(checked: boolean) => setFormData({...formData, enablePlagiarismCheck: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Code Quality Analysis</p>
                <p className="text-sm text-muted-foreground">Analyze code style and best practices</p>
              </div>
              <Switch 
                checked={formData.enableCodeQuality}
                onCheckedChange={(checked: boolean) => setFormData({...formData, enableCodeQuality: checked})}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button className="flex-1">
            <Save className="mr-2 h-4 w-4" />
            Save Configuration
          </Button>
          <Button variant="outline">
            <Play className="mr-2 h-4 w-4" />
            Test Run
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function TestCasesManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-5 w-5" />
          Test Cases Management
        </CardTitle>
        <CardDescription>
          Define input/output test cases for automated grading
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Test Case
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import from File
          </Button>
        </div>

        {/* Sample Test Cases */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Test Case {i}</h4>
                <div className="flex gap-2">
                  <Badge variant="outline">Public</Badge>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Input</Label>
                  <Textarea 
                    placeholder="Test input..." 
                    className="mt-1 font-mono text-sm"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Expected Output</Label>
                  <Textarea 
                    placeholder="Expected output..." 
                    className="mt-1 font-mono text-sm"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function AutogradingResults() {
  return (
    <div className="space-y-6">
      {/* Results Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Gradings</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Award className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.5%</div>
            <p className="text-xs text-muted-foreground">↑ 5.2% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
            <Timer className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.8s</div>
            <p className="text-xs text-muted-foreground">Average per submission</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Recent Autograding Results
          </CardTitle>
          <CardDescription>
            Latest submissions processed by the autograding system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockGradingResults.map((result) => (
              <GradingResultCard key={result.id} result={result} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Dashboard */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
            <CardDescription>Distribution of scores across all submissions</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <BarChart className="h-8 w-8 mx-auto mb-2" />
              <p>Score distribution chart would go here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Issues</CardTitle>
            <CardDescription>Most frequent problems found by the autograder</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Logic errors</span>
                <Badge variant="destructive">34%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Time limit exceeded</span>
                <Badge variant="secondary">22%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Syntax errors</span>
                <Badge variant="secondary">18%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Missing edge cases</span>
                <Badge variant="secondary">16%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Poor documentation</span>
                <Badge variant="secondary">10%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface GradingResultData {
  id: string
  studentName: string
  studentId: string
  assignmentName: string
  submissionTime: string
  totalScore: number
  maxScore: number
  processingTime: number
  status: 'completed' | 'failed' | 'processing'
  breakdown: {
    correctness: { score: number, max: number }
    codeQuality: { score: number, max: number }
    efficiency: { score: number, max: number }
    documentation: { score: number, max: number }
  }
}

const mockGradingResults: GradingResultData[] = [
  {
    id: 'result-1',
    studentName: 'Sarah Chen',
    studentId: 'cs380-001',
    assignmentName: 'Binary Search Algorithm',
    submissionTime: '2025-01-25T14:30:00Z',
    totalScore: 87,
    maxScore: 100,
    processingTime: 1.2,
    status: 'completed',
    breakdown: {
      correctness: { score: 55, max: 60 },
      codeQuality: { score: 18, max: 20 },
      efficiency: { score: 12, max: 15 },
      documentation: { score: 2, max: 5 }
    }
  },
  {
    id: 'result-2',
    studentName: 'Alex Johnson',
    studentId: 'cs380-002',
    assignmentName: 'Binary Search Algorithm',
    submissionTime: '2025-01-25T14:25:00Z',
    totalScore: 92,
    maxScore: 100,
    processingTime: 0.8,
    status: 'completed',
    breakdown: {
      correctness: { score: 58, max: 60 },
      codeQuality: { score: 19, max: 20 },
      efficiency: { score: 13, max: 15 },
      documentation: { score: 2, max: 5 }
    }
  },
  {
    id: 'result-3',
    studentName: 'Emily Davis',
    studentId: 'cs380-003',
    assignmentName: 'Binary Search Algorithm',
    submissionTime: '2025-01-25T14:20:00Z',
    totalScore: 45,
    maxScore: 100,
    processingTime: 2.1,
    status: 'completed',
    breakdown: {
      correctness: { score: 25, max: 60 },
      codeQuality: { score: 12, max: 20 },
      efficiency: { score: 8, max: 15 },
      documentation: { score: 0, max: 5 }
    }
  }
]

function GradingResultCard({ result }: { result: GradingResultData }) {
  const getScoreColor = (score: number, max: number) => {
    const percentage = (score / max) * 100
    if (percentage >= 90) return 'text-green-600'
    if (percentage >= 70) return 'text-blue-600'
    if (percentage >= 50) return 'text-orange-600'
    return 'text-red-600'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>
      case 'processing':
        return <Badge variant="secondary">Processing</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold">{result.studentName}</h4>
          <p className="text-sm text-muted-foreground">{result.assignmentName}</p>
          <p className="text-xs text-muted-foreground">
            Submitted {new Date(result.submissionTime).toLocaleString()}
          </p>
        </div>
        <div className="text-right space-y-1">
          {getStatusBadge(result.status)}
          <div className={`text-2xl font-bold ${getScoreColor(result.totalScore, result.maxScore)}`}>
            {result.totalScore}/{result.maxScore}
          </div>
          <p className="text-xs text-muted-foreground">
            Processed in {result.processingTime}s
          </p>
        </div>
      </div>

      {/* Score breakdown */}
      <div className="grid grid-cols-4 gap-2 text-sm">
        <div className="text-center">
          <p className="text-muted-foreground">Correctness</p>
          <p className={`font-medium ${getScoreColor(result.breakdown.correctness.score, result.breakdown.correctness.max)}`}>
            {result.breakdown.correctness.score}/{result.breakdown.correctness.max}
          </p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground">Quality</p>
          <p className={`font-medium ${getScoreColor(result.breakdown.codeQuality.score, result.breakdown.codeQuality.max)}`}>
            {result.breakdown.codeQuality.score}/{result.breakdown.codeQuality.max}
          </p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground">Efficiency</p>
          <p className={`font-medium ${getScoreColor(result.breakdown.efficiency.score, result.breakdown.efficiency.max)}`}>
            {result.breakdown.efficiency.score}/{result.breakdown.efficiency.max}
          </p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground">Docs</p>
          <p className={`font-medium ${getScoreColor(result.breakdown.documentation.score, result.breakdown.documentation.max)}`}>
            {result.breakdown.documentation.score}/{result.breakdown.documentation.max}
          </p>
        </div>
      </div>

      <div className="flex gap-2 pt-2 border-t">
        <Button size="sm" variant="outline">
          <Eye className="mr-1 h-3 w-3" />
          View Details
        </Button>
        <Button size="sm" variant="outline">
          Export Report
        </Button>
        {result.status === 'failed' && (
          <Button size="sm" variant="outline">
            <Play className="mr-1 h-3 w-3" />
            Retry Grading
          </Button>
        )}
      </div>
    </div>
  )
}