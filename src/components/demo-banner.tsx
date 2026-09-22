'use client'

import { useState, useEffect } from 'react'
import { X, Info } from 'lucide-react'

export function DemoBanner() {
  const [isDismissed, setIsDismissed] = useState(true)

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('edu_demo_banner_dismissed')
      if (!dismissed) {
        setIsDismissed(false)
      }
    } catch {
      setIsDismissed(false)
    }
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    try {
      localStorage.setItem('edu_demo_banner_dismissed', 'true')
    } catch {
      // Ignore localStorage errors
    }
  }

  if (isDismissed) return null

  return (
    <aside 
      aria-label="Demo environment notice"
      className="relative z-[60] w-full bg-slate-900/95 text-slate-300 border-b border-slate-700/60 backdrop-blur-sm px-4 py-2 text-xs transition-all animate-in fade-in slide-in-from-top duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-left">
          <Info className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
          <p className="text-[11px] sm:text-xs leading-tight text-slate-300">
            <strong className="text-cyan-300 font-semibold">Demo Environment:</strong> This is a demo environment for the <span className="font-semibold text-white">EduPlatform AI</span> Learning Platform. School names, students, and testimonials shown are sample data for demonstration purposes only.
          </p>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-slate-800 flex-shrink-0 cursor-pointer"
          title="Dismiss notice"
          aria-label="Dismiss notice"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </aside>
  )
}
