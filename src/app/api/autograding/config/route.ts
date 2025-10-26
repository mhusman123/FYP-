import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

interface AutogradingConfig {
  id: string
  assignmentName: string
  assignmentId: string
  course: string
  language: string
  totalPoints: number
  timeLimit: number
  memoryLimit: number
  allowedAttempts: number
  enablePlagiarismCheck: boolean
  enableCodeQuality: boolean
  criteria: {
    correctness: number
    codeQuality: number
    efficiency: number
    documentation: number
  }
  testCases: TestCase[]
  status: 'draft' | 'active' | 'inactive'
  createdAt: string
  updatedAt: string
  createdBy: string
}

interface TestCase {
  id: string
  input: string
  expectedOutput: string
  hidden: boolean
  points: number
  description?: string
}

// Mock database
const mockConfigs: AutogradingConfig[] = [
  {
    id: '1',
    assignmentName: 'Binary Search Algorithm',
    assignmentId: 'assignment-1',
    course: 'Data Structures (CS-380)',
    language: 'python',
    totalPoints: 100,
    timeLimit: 30,
    memoryLimit: 256,
    allowedAttempts: 3,
    enablePlagiarismCheck: true,
    enableCodeQuality: true,
    criteria: {
      correctness: 60,
      codeQuality: 20,
      efficiency: 15,
      documentation: 5
    },
    testCases: [
      {
        id: 'test-1',
        input: '[1, 2, 3, 4, 5]\n3',
        expectedOutput: '2',
        hidden: false,
        points: 10,
        description: 'Basic search - element found'
      },
      {
        id: 'test-2',
        input: '[1, 2, 3, 4, 5]\n6',
        expectedOutput: '-1',
        hidden: false,
        points: 10,
        description: 'Element not found'
      },
      {
        id: 'test-3',
        input: '[]\n1',
        expectedOutput: '-1',
        hidden: true,
        points: 15,
        description: 'Empty array edge case'
      }
    ],
    status: 'active',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    createdBy: 'educator-1'
  },
  {
    id: '2',
    assignmentName: 'React Component Library',
    assignmentId: 'assignment-2',
    course: 'Web Development (CS-401)',
    language: 'javascript',
    totalPoints: 150,
    timeLimit: 60,
    memoryLimit: 512,
    allowedAttempts: 5,
    enablePlagiarismCheck: true,
    enableCodeQuality: true,
    criteria: {
      correctness: 50,
      codeQuality: 30,
      efficiency: 15,
      documentation: 5
    },
    testCases: [
      {
        id: 'test-1',
        input: 'props: { title: "Hello", variant: "primary" }',
        expectedOutput: '<button class="btn-primary">Hello</button>',
        hidden: false,
        points: 25,
        description: 'Basic button component rendering'
      }
    ],
    status: 'draft',
    createdAt: '2025-01-20T14:30:00Z',
    updatedAt: '2025-01-20T14:30:00Z',
    createdBy: 'educator-1'
  }
]

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'EDUCATOR') {
      return NextResponse.json(
        { error: 'Unauthorized - Educator access required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const configId = searchParams.get('id')
    const assignmentId = searchParams.get('assignmentId')
    
    // Get specific config by ID
    if (configId) {
      const config = mockConfigs.find(c => c.id === configId)
      if (!config) {
        return NextResponse.json(
          { error: 'Configuration not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(config)
    }
    
    // Get config by assignment ID
    if (assignmentId) {
      const config = mockConfigs.find(c => c.assignmentId === assignmentId)
      return NextResponse.json(config || null)
    }
    
    // Get all configs for the educator
    const educatorConfigs = mockConfigs.filter(c => c.createdBy === 'educator-1')
    return NextResponse.json(educatorConfigs)
    
  } catch (error) {
    console.error('Error fetching autograding configs:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'EDUCATOR') {
      return NextResponse.json(
        { error: 'Unauthorized - Educator access required' },
        { status: 401 }
      )
    }

    const configData = await request.json()
    
    // Validate required fields
    if (!configData.assignmentName || !configData.course || !configData.language) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Validate criteria totals 100
    const criteriaTotal = Object.values(configData.criteria || {}).reduce((sum: number, value: unknown) => sum + (Number(value) || 0), 0)
    if (criteriaTotal !== 100) {
      return NextResponse.json(
        { error: 'Grading criteria must total 100%' },
        { status: 400 }
      )
    }

    const newConfig: AutogradingConfig = {
      id: `config-${Date.now()}`,
      assignmentId: configData.assignmentId || `assignment-${Date.now()}`,
      assignmentName: configData.assignmentName,
      course: configData.course,
      language: configData.language,
      totalPoints: configData.totalPoints || 100,
      timeLimit: configData.timeLimit || 30,
      memoryLimit: configData.memoryLimit || 256,
      allowedAttempts: configData.allowedAttempts || 3,
      enablePlagiarismCheck: configData.enablePlagiarismCheck || false,
      enableCodeQuality: configData.enableCodeQuality || false,
      criteria: configData.criteria || {
        correctness: 60,
        codeQuality: 20,
        efficiency: 15,
        documentation: 5
      },
      testCases: configData.testCases || [],
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: session.user.id
    }
    
    // Add to mock database
    mockConfigs.push(newConfig)
    
    return NextResponse.json(newConfig, { status: 201 })
    
  } catch (error) {
    console.error('Error creating autograding config:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'EDUCATOR') {
      return NextResponse.json(
        { error: 'Unauthorized - Educator access required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const configId = searchParams.get('id')
    
    if (!configId) {
      return NextResponse.json(
        { error: 'Configuration ID is required' },
        { status: 400 }
      )
    }

    const configIndex = mockConfigs.findIndex(c => c.id === configId)
    if (configIndex === -1) {
      return NextResponse.json(
        { error: 'Configuration not found' },
        { status: 404 }
      )
    }

    const updates = await request.json()
    
    // Validate criteria if provided
    if (updates.criteria) {
      const criteriaTotal = Object.values(updates.criteria).reduce((sum: number, value: unknown) => sum + (Number(value) || 0), 0)
      if (criteriaTotal !== 100) {
        return NextResponse.json(
          { error: 'Grading criteria must total 100%' },
          { status: 400 }
        )
      }
    }

    const existingConfig = mockConfigs[configIndex]
    const updatedConfig = {
      ...existingConfig,
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    mockConfigs[configIndex] = updatedConfig
    
    return NextResponse.json(updatedConfig)
    
  } catch (error) {
    console.error('Error updating autograding config:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'EDUCATOR') {
      return NextResponse.json(
        { error: 'Unauthorized - Educator access required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const configId = searchParams.get('id')
    
    if (!configId) {
      return NextResponse.json(
        { error: 'Configuration ID is required' },
        { status: 400 }
      )
    }

    const configIndex = mockConfigs.findIndex(c => c.id === configId)
    if (configIndex === -1) {
      return NextResponse.json(
        { error: 'Configuration not found' },
        { status: 404 }
      )
    }

    // Check if config can be deleted (not actively grading)
    const config = mockConfigs[configIndex]
    if (config.status === 'active') {
      return NextResponse.json(
        { error: 'Cannot delete active autograding configuration. Set to inactive first.' },
        { status: 400 }
      )
    }

    mockConfigs.splice(configIndex, 1)
    
    return NextResponse.json({ message: 'Configuration deleted successfully' })
    
  } catch (error) {
    console.error('Error deleting autograding config:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}