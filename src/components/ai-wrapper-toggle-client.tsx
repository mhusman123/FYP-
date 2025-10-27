'use client'

import { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

// Import context directly
import { AIWrapperContext } from '@/components/ai-wrapper-provider'

export function AIWrapperToggleClient() {
  const context = useContext(AIWrapperContext)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't render until mounted (avoid hydration mismatch)
  if (!isMounted || !context) {
    return null
  }

  const { isAIWrapperActive, setIsAIWrapperActive } = context

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isAIWrapperActive ? 'default' : 'outline'}
        size="sm"
        onClick={() => setIsAIWrapperActive(!isAIWrapperActive)}
        className={cn(
          'transition-all duration-300',
          isAIWrapperActive && 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/50'
        )}
      >
        <Sparkles className={cn(
          'h-4 w-4 mr-2 transition-all duration-300',
          isAIWrapperActive && 'fill-white animate-pulse'
        )} />
        {isAIWrapperActive ? 'AI Enabled' : 'AI Disabled'}
      </Button>
      {isAIWrapperActive && (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 animate-pulse">
          Active
        </Badge>
      )}
    </div>
  )
}
