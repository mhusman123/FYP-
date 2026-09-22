'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Menu,
  X,
  Sparkles,
  Bot,
  CheckCircle2,
  HelpCircle,
  User,
  Layers,
  FileCode
} from 'lucide-react'

interface LandingHeaderProps {
  session?: unknown | null
}

export function LandingHeader({ session }: LandingHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 25)
          ticking = false
        })
        ticking = true
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeDrawer = () => {
    setIsMobileDrawerOpen(false)
  }

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border-none outline-none ring-0",
          isScrolled 
            ? "shadow-xl bg-[#1A163B]/95 backdrop-blur-md border-b border-indigo-500/20" 
            : "bg-transparent shadow-none"
        )}
      >
        {/* Main Upper Bar */}
        <div 
          className={cn(
            "w-full overflow-hidden transition-[max-height,opacity,padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[max-height,opacity,padding] border-none",
            isScrolled 
              ? "max-h-0 opacity-0 pointer-events-none py-0" 
              : "max-h-24 opacity-100 py-2.5 bg-transparent"
          )}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between">
              {/* Left: Brand Logo */}
              <Link href="/" className="flex items-center gap-2 group ml-1 sm:ml-4 md:ml-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png?v=9"
                  alt="Logo"
                  className="h-8 sm:h-9 md:h-10 w-auto max-w-[190px] sm:max-w-[220px] object-contain hover:opacity-90 transition-opacity drop-shadow-md"
                />
              </Link>

              {/* Desktop Center-Right: Upper Action Buttons in Unified Crimson Red & CAPITALIZED */}
              <div className="hidden md:flex items-center gap-2 mr-1 sm:mr-4 md:mr-6 lg:mr-8">
                {/* 1. Core Workflows */}
                <Button 
                  size="sm" 
                  className="bg-[#8D1B2D] hover:bg-[#741322] text-white text-[11px] font-semibold uppercase tracking-wider rounded-none px-2.5 h-7 shadow-sm transition-all hover:scale-[1.02] border-none" 
                  asChild
                >
                  <Link href="#features">CORE WORKFLOWS</Link>
                </Button>

                {/* 2. How It Works */}
                <Button 
                  size="sm" 
                  className="bg-[#8D1B2D] hover:bg-[#741322] text-white text-[11px] font-semibold uppercase tracking-wider rounded-none px-2.5 h-7 shadow-sm transition-all hover:scale-[1.02] border-none" 
                  asChild
                >
                  <Link href="#how-it-works">HOW IT WORKS</Link>
                </Button>

                {/* 3. Creator */}
                <Button 
                  size="sm" 
                  className="bg-[#8D1B2D] hover:bg-[#741322] text-white text-[11px] font-semibold uppercase tracking-wider rounded-none px-2.5 h-7 shadow-sm transition-all hover:scale-[1.02] border-none" 
                  asChild
                >
                  <Link href="#about">CREATOR</Link>
                </Button>

                {/* 4. Request Pilot */}
                <Button 
                  size="sm" 
                  className="bg-[#8D1B2D] hover:bg-[#741322] text-white text-[11px] font-semibold uppercase tracking-wider rounded-none px-2.5 h-7 shadow-sm transition-all hover:scale-[1.02] border-none" 
                  asChild
                >
                  <Link href="#pilot-request">REQUEST PILOT</Link>
                </Button>

                {/* 5. Live Demo */}
                <Button 
                  size="sm" 
                  className="bg-[#8D1B2D] hover:bg-[#741322] text-white text-[11px] font-semibold uppercase tracking-wider rounded-none px-2.5 h-7 shadow-sm transition-all hover:scale-[1.02] border-none" 
                  asChild
                >
                  <Link href={session ? "/dashboard" : "/auth/signin"}>
                    {session ? "PORTAL DASHBOARD" : "LIVE DEMO"}
                  </Link>
                </Button>
              </div>

              {/* Mobile Right: Hamburger Menu Button */}
              <div className="flex md:hidden items-center">
                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(true)}
                  className="flex items-center justify-center h-8 w-8 rounded-lg border border-indigo-500/30 bg-[#1E1B4B] text-white hover:bg-[#2B2664] transition-colors cursor-pointer shadow-sm"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Plate - All Buttons CAPITALIZED */}
        <div 
          className={cn(
            "hidden md:flex w-full transition-all duration-300 min-h-[36px] px-4 sm:px-6 items-center justify-center border-none outline-none",
            isScrolled
              ? "py-1.5 bg-transparent shadow-none"
              : "py-0.5 bg-[#1E1B4B]/80 backdrop-blur-md shadow-md border-b border-indigo-500/20"
          )}
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-center gap-1.5 sm:gap-2.5 md:gap-5 lg:gap-7 overflow-x-auto py-0.5 scrollbar-none text-[11px]">
            <Link 
              href="#overview" 
              className="px-2 py-0.5 font-bold uppercase tracking-wider text-slate-200 hover:text-white transition-colors whitespace-nowrap"
            >
              OVERVIEW
            </Link>

            {/* Changed from '6 AI Workflows' to 'AI WORKFLOWS' */}
            <Link 
              href="#features" 
              className="px-2 py-0.5 font-bold uppercase tracking-wider text-slate-200 hover:text-white transition-colors whitespace-nowrap flex items-center gap-1"
            >
              <Bot className="h-3 w-3 text-cyan-300" />
              AI WORKFLOWS
            </Link>

            <Link 
              href="#product-tour" 
              className="px-2 py-0.5 font-bold uppercase tracking-wider text-slate-200 hover:text-white transition-colors whitespace-nowrap flex items-center gap-1"
            >
              <Layers className="h-3 w-3 text-indigo-300" />
              PRODUCT TOUR
            </Link>

            <Link 
              href="#how-it-works" 
              className="px-2 py-0.5 font-bold uppercase tracking-wider text-slate-200 hover:text-white transition-colors whitespace-nowrap flex items-center gap-1"
            >
              <CheckCircle2 className="h-3 w-3 text-emerald-300" />
              PILOT PROCESS
            </Link>

            <Link 
              href="#about" 
              className="px-2 py-0.5 font-bold uppercase tracking-wider text-slate-200 hover:text-white transition-colors whitespace-nowrap flex items-center gap-1"
            >
              <User className="h-3 w-3 text-amber-300" />
              DEVELOPER
            </Link>

            <Link 
              href="#changelog" 
              className="px-2 py-0.5 font-bold uppercase tracking-wider text-slate-200 hover:text-white transition-colors whitespace-nowrap flex items-center gap-1"
            >
              <FileCode className="h-3 w-3 text-purple-300" />
              CHANGELOG
            </Link>

            <Link 
              href="#faq" 
              className="px-2 py-0.5 font-bold uppercase tracking-wider text-slate-200 hover:text-white transition-colors whitespace-nowrap flex items-center gap-1"
            >
              <HelpCircle className="h-3 w-3 text-sky-300" />
              FAQ
            </Link>
          </div>
        </div>

        {/* Mobile Scrolled Bar */}
        {isScrolled && (
          <div className="flex md:hidden items-center justify-between px-4 py-2 bg-[#1A163B]/95 border-b border-indigo-500/25">
            <Link href="/" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png?v=9"
                alt="Logo"
                className="h-7 w-auto object-contain"
              />
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="flex items-center justify-center h-7 w-7 rounded-md border border-indigo-500/30 bg-[#1E1B4B] text-white hover:bg-[#2B2664] transition-colors"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="h-3.5 w-3.5 text-white" />
            </button>
          </div>
        )}
      </header>

      {/* Mobile Slide-over Sidebar Drawer */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* Sidebar Drawer Panel */}
          <aside className="relative z-10 w-80 max-w-[85vw] h-full bg-[#001724] text-slate-100 border-l border-cyan-500/20 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="p-3.5 border-b border-cyan-500/20 bg-[#00121d] flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png?v=9"
                  alt="Logo"
                  className="h-7 w-auto max-w-[160px] object-contain drop-shadow-md"
                />
              </div>

              <button
                type="button"
                onClick={closeDrawer}
                className="h-7 w-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-4">
              {/* Quick Actions in Red */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-2 px-1">
                  QUICK ACTIONS
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  <Link
                    href="#features"
                    onClick={closeDrawer}
                    className="flex items-center justify-center py-2 px-1 text-center text-[11px] font-bold uppercase tracking-wider bg-[#8D1B2D] text-white hover:bg-[#741322] transition-colors rounded-none shadow-xs"
                  >
                    FEATURES
                  </Link>
                  <Link
                    href="#pilot-request"
                    onClick={closeDrawer}
                    className="flex items-center justify-center py-2 px-1 text-center text-[11px] font-bold uppercase tracking-wider bg-[#8D1B2D] text-white hover:bg-[#741322] transition-colors rounded-none shadow-xs"
                  >
                    PILOT
                  </Link>
                  <Link
                    href={session ? "/dashboard" : "/auth/signin"}
                    onClick={closeDrawer}
                    className="flex items-center justify-center py-2 px-1 text-center text-[11px] font-bold uppercase tracking-wider bg-[#8D1B2D] text-white hover:bg-[#741322] transition-colors rounded-none shadow-xs"
                  >
                    DEMO
                  </Link>
                </div>
              </div>

              {/* Navigation Links */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-2 px-1">
                  PLATFORM NAVIGATION
                </p>
                <div className="space-y-1">
                  <Link
                    href="#features"
                    onClick={closeDrawer}
                    className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-200 hover:bg-[#002E40] rounded-lg transition-colors"
                  >
                    <Bot className="h-3.5 w-3.5 text-cyan-400" />
                    <span>AI WORKFLOWS</span>
                  </Link>

                  <Link
                    href="#product-tour"
                    onClick={closeDrawer}
                    className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-200 hover:bg-[#002E40] rounded-lg transition-colors"
                  >
                    <Layers className="h-3.5 w-3.5 text-indigo-400" />
                    <span>PRODUCT TOUR</span>
                  </Link>

                  <Link
                    href="#how-it-works"
                    onClick={closeDrawer}
                    className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-200 hover:bg-[#002E40] rounded-lg transition-colors"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>PILOT PROCESS</span>
                  </Link>

                  <Link
                    href="#about"
                    onClick={closeDrawer}
                    className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-200 hover:bg-[#002E40] rounded-lg transition-colors"
                  >
                    <User className="h-3.5 w-3.5 text-amber-400" />
                    <span>DEVELOPER</span>
                  </Link>

                  <Link
                    href="#changelog"
                    onClick={closeDrawer}
                    className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-200 hover:bg-[#002E40] rounded-lg transition-colors"
                  >
                    <FileCode className="h-3.5 w-3.5 text-purple-400" />
                    <span>CHANGELOG</span>
                  </Link>

                  <Link
                    href="#faq"
                    onClick={closeDrawer}
                    className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-bold uppercase tracking-wider text-slate-200 hover:bg-[#002E40] rounded-lg transition-colors"
                  >
                    <HelpCircle className="h-3.5 w-3.5 text-sky-400" />
                    <span>FAQ</span>
                  </Link>

                  <Link
                    href="/ai-hub"
                    onClick={closeDrawer}
                    className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-bold uppercase tracking-wider text-cyan-300 hover:bg-cyan-950/60 rounded-lg transition-colors border border-cyan-500/20"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                    <span>AI INNOVATION HUB</span>
                  </Link>
                </div>
              </div>

              {/* Pilot Request Button */}
              <div className="p-2.5 bg-gradient-to-br from-cyan-950/40 to-indigo-950/40 rounded-xl border border-cyan-500/20 text-center">
                <p className="text-xs font-bold text-white mb-0.5">DEPLOY FOR YOUR INSTITUTION</p>
                <p className="text-[10px] text-slate-400 mb-2">Free 30-day pilot tailored to your curriculum.</p>
                <Button className="w-full bg-[#8D1B2D] hover:bg-[#741322] text-white text-[11px] font-bold uppercase tracking-wider h-7 rounded-none" asChild>
                  <Link href="#pilot-request" onClick={closeDrawer}>
                    REQUEST FREE PILOT
                  </Link>
                </Button>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-3 border-t border-cyan-500/20 bg-[#00121d] space-y-2">
              {session ? (
                <Button className="w-full bg-[#8D1B2D] hover:bg-[#741322] text-white font-bold uppercase tracking-wider text-xs h-8 rounded-none" asChild>
                  <Link href="/dashboard" onClick={closeDrawer}>
                    PORTAL DASHBOARD
                  </Link>
                </Button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="w-full font-bold uppercase tracking-wider text-[11px] h-7 border-cyan-500/30 text-white bg-white/5 hover:bg-white/10" asChild>
                    <Link href="/auth/signin" onClick={closeDrawer}>
                      SIGN IN
                    </Link>
                  </Button>
                  <Button className="w-full bg-[#8D1B2D] hover:bg-[#741322] text-white font-bold uppercase tracking-wider text-[11px] h-7 rounded-none" asChild>
                    <Link href="/auth/signup" onClick={closeDrawer}>
                      REGISTER
                    </Link>
                  </Button>
                </div>
              )}
            </div>

          </aside>
        </div>
      )}
    </>
  )
}
