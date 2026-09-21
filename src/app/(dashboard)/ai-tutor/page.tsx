'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Bot,
  User,
  Send,
  Sparkles,
  Brain,
  Zap,
  HelpCircle,
  Lightbulb,
  Award,
  ArrowRight,
  BookOpen,
  Code,
  Calculator,
  Atom,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  modelUsed?: string
  suggestedFollowUps?: string[]
  timestamp: string
}

const starterPrompts = [
  {
    title: 'Calculus Derivations',
    icon: Calculator,
    subject: 'Mathematics',
    prompt: "I'm struggling with applying the Chain Rule on composite functions. Can you guide me through how it works?",
    badge: 'STEM'
  },
  {
    title: 'Python & Data Structures',
    icon: Code,
    subject: 'Computer Science',
    prompt: 'How do Hash Maps achieve O(1) time complexity, and how do they resolve hash collisions?',
    badge: 'Coding'
  },
  {
    title: "Newton's Laws & Mechanics",
    icon: Atom,
    subject: 'Physics',
    prompt: 'If a car is turning in a circular track at a constant speed of 60 km/h, why is it still accelerating?',
    badge: 'Physics'
  },
  {
    title: 'Indus Valley & Sindh History',
    icon: BookOpen,
    subject: 'Sindh Studies',
    prompt: 'What were the urban planning and sanitation breakthroughs of ancient Mohenjo-daro?',
    badge: 'Heritage'
  }
]

export default function SocraticTutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: `Hello! I am your **SST Socratic AI Mentor** at Sindh School of Technology. 🎓

Rather than just handing you the answers, I help you develop true understanding by breaking problems down into intuitive first principles.

**How can I assist your studies today?** You can ask about *Calculus*, *Python Programming*, *Physics*, *Biology*, or your *upcoming assignments*!`,
      modelUsed: 'SST Socratic Core',
      suggestedFollowUps: [
        'Guide me through a Calculus problem',
        'Help me debug a Python algorithm',
        'Explain Newton\'s Second Law'
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])

  const [input, setInput] = useState('')
  const [subject, setSubject] = useState('Computer Science & Mathematics')
  const [modelId, setModelId] = useState<'gpt-4o-mini' | 'deepseek-r1' | 'gemini-1.5-flash'>('gpt-4o-mini')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionPoints, setSessionPoints] = useState(30)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input
    if (!textToSend.trim() || isLoading) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    if (!customPrompt) setInput('')
    setIsLoading(true)

    try {
      const historyPayload = updatedMessages.slice(-6).map(m => ({
        role: m.role,
        content: m.content
      }))

      const res = await fetch('/api/ai/socratic-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg.content,
          history: historyPayload,
          modelId,
          subject,
        })
      })

      const data = await res.json()

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || "Let's examine this concept step-by-step. What is your starting assumption?",
        modelUsed: data.modelUsed || 'SST Socratic Engine',
        suggestedFollowUps: data.suggestedFollowUps || ['Give me a step-by-step hint', 'Quiz me on this topic'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setMessages(prev => [...prev, assistantMsg])
      setSessionPoints(prev => prev + (data.pointsAwarded || 10))

      // Claim points asynchronously
      fetch('/api/ai/award-points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ points: 10, reason: 'Socratic Inquiry Session' })
      }).catch(() => {})

    } catch (err) {
      console.error('Chat error:', err)
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: "Let's explore this problem! Can you tell me what specific equation or rule you want to start with?",
          modelUsed: 'SST Socratic Core',
          suggestedFollowUps: ['Give me a hint', 'Show an example'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 p-6 rounded-2xl border border-indigo-500/30 shadow-xl text-white">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-indigo-600/80 hover:bg-indigo-600 text-white border-0 text-xs px-2.5 py-0.5">
              <Sparkles className="h-3 w-3 mr-1" />
              SST AI Pedagogical Core
            </Badge>
            <Badge variant="outline" className="text-cyan-300 border-cyan-500/40 text-xs">
              Socratic Dialogue Mode
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <Brain className="h-7 w-7 text-cyan-400" />
            Socratic AI Mentor
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Ask complex questions, get step-by-step guidance, and build deep conceptual understanding for exams & coursework.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-center backdrop-blur-sm">
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Session Points</p>
            <p className="text-xl font-bold text-amber-300 flex items-center justify-center gap-1">
              <Award className="h-4 w-4 text-amber-400" />
              +{sessionPoints} pts
            </p>
          </div>

          <Button asChild className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-xs h-10 rounded-xl shadow-md">
            <Link href="/quiz-generator">
              <Zap className="h-4 w-4 mr-1.5 text-amber-300" />
              Launch Quiz Arena
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Model & Subject Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-4 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI Reasoning Engine</p>
              <p className="text-sm font-bold text-foreground">
                {modelId === 'gpt-4o-mini' ? 'GPT-4o-mini (Socratic Fast)' : modelId === 'deepseek-r1' ? 'DeepSeek-R1 (Deep Math/Logic)' : 'Gemini 1.5 Flash'}
              </p>
            </div>
            <Select value={modelId} onValueChange={(val: any) => setModelId(val)}>
              <SelectTrigger className="w-48 text-xs font-medium h-9">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o-mini">GPT-4o-mini (Fast Socratic)</SelectItem>
                <SelectItem value="deepseek-r1">DeepSeek-R1 (Deep Reasoning)</SelectItem>
                <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-4 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Subject</p>
              <p className="text-sm font-bold text-foreground">{subject}</p>
            </div>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="w-52 text-xs font-medium h-9">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Computer Science & Mathematics">CS & Mathematics</SelectItem>
                <SelectItem value="Physics & Engineering">Physics & Engineering</SelectItem>
                <SelectItem value="Chemistry & Materials">Chemistry & Materials</SelectItem>
                <SelectItem value="Biology & Health Sciences">Biology & Pre-Med</SelectItem>
                <SelectItem value="Sindh History & Cultural Studies">Sindh Studies & History</SelectItem>
                <SelectItem value="General Academic Prep">General Academic Prep</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Main Chat Stream Container */}
      <Card className="bg-card border-border shadow-lg overflow-hidden flex flex-col h-[580px]">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user'
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm relative group ${
                      isUser
                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                        : 'bg-muted/60 border border-border text-foreground rounded-tl-none'
                    }`}
                  >
                    {!isUser && (
                      <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-border/50 text-[11px] font-semibold text-muted-foreground">
                        <span className="flex items-center gap-1 text-primary">
                          <Sparkles className="h-3 w-3" />
                          {msg.modelUsed || 'SST Socratic AI'}
                        </span>
                        <div className="flex items-center gap-2">
                          <span>{msg.timestamp}</span>
                          <button
                            onClick={() => handleCopy(msg.content, msg.id)}
                            className="text-muted-foreground hover:text-foreground transition-colors p-1 cursor-pointer"
                            title="Copy text"
                          >
                            {copiedId === msg.id ? (
                              <Check className="h-3.5 w-3.5 text-green-500" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="whitespace-pre-wrap font-sans">{msg.content}</div>
                  </div>

                  {/* Socratic Follow-up Chips */}
                  {!isUser && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestedFollowUps.map((chip, chipIdx) => (
                        <button
                          key={chipIdx}
                          onClick={() => handleSend(chip)}
                          className="text-[11px] font-medium bg-background hover:bg-primary/10 border border-border hover:border-primary/40 text-foreground px-2.5 py-1 rounded-full transition-all flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          <HelpCircle className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                          <span>{chip}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            )
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white flex-shrink-0 animate-pulse shadow-md">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-muted/60 border border-border p-3.5 rounded-2xl rounded-tl-none flex items-center gap-2 text-xs font-medium text-muted-foreground shadow-sm">
                <RefreshCw className="h-3.5 w-3.5 animate-spin text-primary" />
                <span>Generating Socratic pedagogical reasoning...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-muted/20 border-t border-border">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex gap-2 items-end"
          >
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question, paste code, or request a step-by-step derivation... (Press Enter to send)"
              className="min-h-[44px] max-h-32 text-xs sm:text-sm bg-background border-border resize-none rounded-xl"
              rows={1}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="h-11 px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-semibold text-xs sm:text-sm shadow-md transition-all flex-shrink-0 cursor-pointer"
            >
              <Send className="h-4 w-4 mr-1.5" />
              <span>Ask</span>
            </Button>
          </form>
          <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-2 px-1">
            <span>💡 <strong>Tip:</strong> Ask <em>"Give me a hint"</em> rather than asking for full answers to earn bonus study points.</span>
            <span className="hidden sm:inline">Shift + Enter for new line</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
