'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AIWrapperContextType {
  isAIWrapperActive: boolean
  setIsAIWrapperActive: (active: boolean) => void
}

export const AIWrapperContext = createContext<AIWrapperContextType | undefined>(undefined)

export function AIWrapperProvider({ children }: { children: React.ReactNode }) {
  const [isAIWrapperActive, setIsAIWrapperActive] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Load preference from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('aiWrapperActive')
    if (stored !== null) {
      setIsAIWrapperActive(JSON.parse(stored))
    }
    setMounted(true)
  }, [])

  // Save preference to localStorage whenever it changes
  const handleSetIsAIWrapperActive = (active: boolean) => {
    setIsAIWrapperActive(active)
    localStorage.setItem('aiWrapperActive', JSON.stringify(active))
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <AIWrapperContext.Provider value={{ isAIWrapperActive, setIsAIWrapperActive: handleSetIsAIWrapperActive }}>
      {children}
    </AIWrapperContext.Provider>
  )
}

export function useAIWrapper() {
  const context = useContext(AIWrapperContext)
  if (context === undefined) {
    throw new Error('useAIWrapper must be used within AIWrapperProvider')
  }
  return context
}
