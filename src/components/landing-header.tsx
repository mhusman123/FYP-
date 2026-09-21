'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home as HomeIcon,
  Sparkles,
  BookOpen,
  School,
  CreditCard,
  GraduationCap
} from 'lucide-react'

interface LandingHeaderProps {
  session?: unknown | null
}

export function LandingHeader({ session }: LandingHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name)
  }

  const closeDrawer = () => {
    setIsMobileDrawerOpen(false)
  }

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-none outline-none ring-0",
          isScrolled 
            ? "shadow-xl bg-[#1A163B]/95 backdrop-blur-md" 
            : "bg-transparent shadow-none"
        )}
      >
        {/* Main Upper Bar - Floating transparent over Hero when at top, smoothly collapses on scroll */}
        <div 
          className={cn(
            "w-full overflow-hidden transition-all duration-300 ease-in-out border-none",
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
                  src="/logo.png"
                  alt="Sindh School of Technology"
                  className="h-8 sm:h-9 md:h-10 w-auto max-w-[190px] sm:max-w-[220px] object-contain hover:opacity-90 transition-opacity drop-shadow-md"
                />
              </Link>

              {/* Desktop Center-Right: Three Crimson Buttons (About, Features, Users) */}
              <div className="hidden md:flex items-center gap-2 mr-2 sm:mr-6 md:mr-10 lg:mr-14">
                <Button 
                  size="sm" 
                  className="bg-[#8D1B2D] hover:bg-[#741322] text-white text-[11px] font-normal rounded-none px-2.5 h-7 shadow-sm transition-all hover:scale-[1.02] border-none" 
                  asChild
                >
                  <Link href="/our-school">About</Link>
                </Button>

                <Button 
                  size="sm" 
                  className="bg-[#8D1B2D] hover:bg-[#741322] text-white text-[11px] font-normal rounded-none px-2.5 h-7 shadow-sm transition-all hover:scale-[1.02] border-none" 
                  asChild
                >
                  <Link href="/our-school/facilities">Features</Link>
                </Button>

                <Button 
                  size="sm" 
                  className="bg-[#8D1B2D] hover:bg-[#741322] text-white text-[11px] font-normal rounded-none px-2.5 h-7 shadow-sm transition-all hover:scale-[1.02] border-none" 
                  asChild
                >
                  <Link href={session ? "/dashboard" : "/auth/signin"}>Users</Link>
                </Button>
              </div>

              {/* Mobile Right: Hamburger Menu Button */}
              <div className="flex md:hidden items-center">
                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(true)}
                  className="flex items-center justify-center h-9 w-9 rounded-lg border border-indigo-500/30 bg-[#1E1B4B] text-white hover:bg-[#2B2664] hover:text-indigo-200 transition-colors cursor-pointer shadow-sm"
                  aria-label="Open mobile navigation menu"
                >
                  <Menu className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Plate (Single complete line of buttons when scrolled, or Twilight Indigo secondary bar when at top) */}
        <div 
          className={cn(
            "hidden md:flex w-full transition-all duration-300 min-h-[38px] px-4 sm:px-6 items-center justify-center border-none outline-none",
            isScrolled
              ? "py-2 bg-transparent shadow-none"
              : "py-0.5 bg-[#1E1B4B]/75 backdrop-blur-md shadow-md border-b border-indigo-500/20"
          )}
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-center gap-1.5 sm:gap-3 md:gap-5 lg:gap-6 overflow-x-auto py-0.5 scrollbar-none">
            {/* 1. Home */}
            <Link 
              href="/home" 
              className="px-2 py-1 text-[11px] sm:text-xs font-bold text-white hover:text-indigo-200 hover:bg-white/10 transition-colors whitespace-nowrap rounded-xs"
            >
              Home
            </Link>

            {/* 2. Why Choose Us (with arrow) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-2 py-1 text-[11px] sm:text-xs font-bold text-white hover:text-indigo-200 hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer rounded-xs">
                  <span>Why Choose Us</span>
                  <ChevronDown className="h-3 w-3 opacity-90" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                sideOffset={6}
                className="w-72 p-1.5 bg-[#1E1B4B] text-white shadow-2xl rounded-xl border border-indigo-500/25 backdrop-blur-xl animate-in fade-in-0 zoom-in-95 duration-150"
              >
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/why-choose-us/mission-and-values">Mission, Vision & Values</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/why-choose-us/community">SST & BSV Community</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/why-choose-us/wellbeing-programme">Wellbeing Programme</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/why-choose-us/digital-learning-programme">Digital Learning Programme</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/why-choose-us/university-career-guidance-programme">University & Career Guidance</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/why-choose-us/music-programme">Music & Arts Programme</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/why-choose-us/extra-curricular-activities">Extra-Curricular Activities</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/why-choose-us/summer-school">Summer School & Enrichment</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/why-choose-us/cognita-family">Our Global Cognita Family</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 3. Academic Excellence */}
            <Link 
              href="/academic-excellence" 
              className="px-2 py-1 text-[11px] sm:text-xs font-bold text-white hover:text-indigo-200 hover:bg-white/10 transition-colors whitespace-nowrap rounded-xs"
            >
              Academic Excellence
            </Link>

            {/* 4. Sindh Education */}
            <Link 
              href="/sindh-education" 
              className="px-2 py-1 text-[11px] sm:text-xs font-bold text-white hover:text-indigo-200 hover:bg-white/10 transition-colors whitespace-nowrap rounded-xs"
            >
              Sindh Education
            </Link>

            {/* 5. Our School (with arrow) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-2 py-1 text-[11px] sm:text-xs font-bold text-white hover:text-indigo-200 hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer rounded-xs">
                  <span>Our School</span>
                  <ChevronDown className="h-3 w-3 opacity-90" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                sideOffset={6}
                className="w-72 p-1.5 bg-[#1E1B4B] text-white shadow-2xl rounded-xl border border-indigo-500/25 backdrop-blur-xl animate-in fade-in-0 zoom-in-95 duration-150"
              >
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/our-school/your-childs-journey">Your Child’s Journey</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/our-school/early-years-foundation-stage">Early Years (Ages 2–5)</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/our-school/primary-education">Primary Education (Ages 5–11)</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/our-school/secondary-education">Secondary Education (Ages 11–16)</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/our-school/sixth-form">SST Nexus – Sixth Form (Ages 16–18)</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/our-school/school-information">School Information</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/our-school/facilities">Campus Facilities</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/our-school/school-news">School News</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/our-school/blog">School Blog</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 6. Admissions & Fees (with arrow) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-2 py-1 text-[11px] sm:text-xs font-bold text-white hover:text-indigo-200 hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer rounded-xs">
                  <span>Admissions & Fees</span>
                  <ChevronDown className="h-3 w-3 opacity-90" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                sideOffset={6}
                className="w-64 p-1.5 bg-[#1E1B4B] text-white shadow-2xl rounded-xl border border-indigo-500/25 backdrop-blur-xl animate-in fade-in-0 zoom-in-95 duration-150"
              >
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/admissions-and-fees/admissions-process">Admissions Process</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/admissions-and-fees/school-fees">School Fees</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer font-semibold text-xs py-2 px-3 rounded-lg text-slate-100 hover:text-white hover:bg-[#8D1B2D] focus:bg-[#8D1B2D] focus:text-white data-[highlighted]:bg-[#8D1B2D] data-[highlighted]:text-white transition-colors duration-150">
                  <Link href="/admissions-and-fees/open-days-and-visits">Open Days & Visits</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Scrolled Bar */}
        {isScrolled && (
          <div className="flex md:hidden items-center justify-between px-4 py-2 bg-[#1A163B]/95 border-b border-indigo-500/25">
            <Link href="/" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Sindh School of Technology"
                className="h-7 w-auto object-contain"
              />
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="flex items-center justify-center h-8 w-8 rounded-lg border border-cyan-500/30 bg-[#002E40] text-white hover:bg-[#003850] transition-colors"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="h-4 w-4 text-white" />
            </button>
          </div>
        )}
      </header>

      {/* Mobile Right Slide-over Sidebar Drawer */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* Sidebar Drawer Panel - Dark High-Tech Aesthetic */}
          <aside className="relative z-10 w-80 max-w-[85vw] h-full bg-[#001724] text-slate-100 border-l border-cyan-500/20 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-cyan-500/20 bg-[#00121d] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Sindh School of Technology"
                  className="h-8 w-auto max-w-[160px] object-contain drop-shadow-md"
                />
              </div>

              <button
                type="button"
                onClick={closeDrawer}
                className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Body: Scrollable Navigation Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              
              {/* Quick Action Buttons */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-2 px-1">
                  Quick Actions
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <Link
                    href="/our-school"
                    onClick={closeDrawer}
                    className="flex items-center justify-center py-2 px-2 text-center text-xs font-semibold bg-[#8D1B2D] text-white hover:bg-[#741322] transition-colors rounded-sm shadow-xs"
                  >
                    About
                  </Link>
                  <Link
                    href="/our-school/facilities"
                    onClick={closeDrawer}
                    className="flex items-center justify-center py-2 px-2 text-center text-xs font-semibold bg-[#8D1B2D] text-white hover:bg-[#741322] transition-colors rounded-sm shadow-xs"
                  >
                    Features
                  </Link>
                  <Link
                    href={session ? "/dashboard" : "/auth/signin"}
                    onClick={closeDrawer}
                    className="flex items-center justify-center py-2 px-2 text-center text-xs font-semibold bg-[#8D1B2D] text-white hover:bg-[#741322] transition-colors rounded-sm shadow-xs"
                  >
                    Users
                  </Link>
                </div>
              </div>

              {/* Nautilus Plate Navigation Links */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-2 px-1">
                  School Navigation
                </p>
                
                <div className="space-y-1">
                  {/* 1. Home */}
                  <Link
                    href="/home"
                    onClick={closeDrawer}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-100 hover:bg-[#002E40] rounded-lg transition-colors"
                  >
                    <HomeIcon className="h-4 w-4 text-cyan-300" />
                    <span>Home</span>
                  </Link>

                  {/* 2. Why Choose Us (Accordion) */}
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleAccordion('why-choose-us')}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-slate-100 hover:bg-[#002E40] rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-4 w-4 text-cyan-300" />
                        <span>Why Choose Us</span>
                      </div>
                      <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${openAccordion === 'why-choose-us' ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {openAccordion === 'why-choose-us' && (
                      <div className="ml-7 pl-2 border-l-2 border-cyan-500/30 space-y-1 py-1">
                        <Link
                          href="/why-choose-us/mission-and-values"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          Mission, Vision & Values
                        </Link>
                        <Link
                          href="/why-choose-us/community"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          SST & BSV Community
                        </Link>
                        <Link
                          href="/why-choose-us/wellbeing-programme"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          Wellbeing Programme
                        </Link>
                        <Link
                          href="/why-choose-us/digital-learning-programme"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          Digital Learning Programme
                        </Link>
                        <Link
                          href="/why-choose-us/university-career-guidance-programme"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          University & Career Guidance
                        </Link>
                        <Link
                          href="/why-choose-us/music-programme"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          Music & Arts Programme
                        </Link>
                        <Link
                          href="/why-choose-us/extra-curricular-activities"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          Extra-Curricular Activities
                        </Link>
                        <Link
                          href="/why-choose-us/summer-school"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          Summer School & Enrichment
                        </Link>
                        <Link
                          href="/why-choose-us/cognita-family"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          Our Global Cognita Family
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* 3. Academic Excellence */}
                  <Link
                    href="/academic-excellence"
                    onClick={closeDrawer}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-100 hover:bg-[#002E40] rounded-lg transition-colors"
                  >
                    <BookOpen className="h-4 w-4 text-cyan-300" />
                    <span>Academic Excellence</span>
                  </Link>

                  {/* 4. Sindh Education */}
                  <Link
                    href="/sindh-education"
                    onClick={closeDrawer}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-100 hover:bg-[#002E40] rounded-lg transition-colors"
                  >
                    <GraduationCap className="h-4 w-4 text-cyan-300" />
                    <span>Sindh Education</span>
                  </Link>

                  {/* 5. Our School (Accordion) */}
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleAccordion('our-school')}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-slate-100 hover:bg-[#002E40] rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <School className="h-4 w-4 text-cyan-300" />
                        <span>Our School</span>
                      </div>
                      <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${openAccordion === 'our-school' ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {openAccordion === 'our-school' && (
                      <div className="ml-7 pl-2 border-l-2 border-cyan-500/30 space-y-1 py-1">
                        <Link
                          href="/our-school/your-childs-journey"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          Your Child’s Journey
                        </Link>
                        <Link
                          href="/our-school/early-years-foundation-stage"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          Early Years (Ages 2–5)
                        </Link>
                        <Link
                          href="/our-school/primary-education"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          Primary Education (Ages 5–11)
                        </Link>
                        <Link
                          href="/our-school/secondary-education"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          Secondary Education (Ages 11–16)
                        </Link>
                        <Link
                          href="/our-school/sixth-form"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          SST Nexus – Sixth Form (Ages 16–18)
                        </Link>
                        <Link
                          href="/our-school/school-information"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          School Information
                        </Link>
                        <Link
                          href="/our-school/facilities"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          Campus Facilities
                        </Link>
                        <Link
                          href="/our-school/school-news"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          School News
                        </Link>
                        <Link
                          href="/our-school/blog"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          School Blog
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* 6. Admissions & Fees (Accordion) */}
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleAccordion('admissions-fees')}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-slate-100 hover:bg-[#002E40] rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-4 w-4 text-cyan-300" />
                        <span>Admissions & Fees</span>
                      </div>
                      <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${openAccordion === 'admissions-fees' ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {openAccordion === 'admissions-fees' && (
                      <div className="ml-7 pl-2 border-l-2 border-cyan-500/30 space-y-1 py-1">
                        <Link
                          href="/admissions-and-fees/admissions-process"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          Admissions Process
                        </Link>
                        <Link
                          href="/admissions-and-fees/school-fees"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          School Fees
                        </Link>
                        <Link
                          href="/admissions-and-fees/open-days-and-visits"
                          onClick={closeDrawer}
                          className="block px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#8D1B2D] rounded-md transition-colors"
                        >
                          Open Days & Visits
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Drawer Footer: Portal Access CTA */}
            <div className="p-4 border-t border-cyan-500/20 bg-[#00121d] space-y-2">
              {session ? (
                <Button className="w-full bg-[#002E40] hover:bg-[#003850] text-white font-semibold text-xs tracking-normal" asChild>
                  <Link href="/dashboard" onClick={closeDrawer}>
                    Go to Portal Dashboard
                  </Link>
                </Button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="w-full font-semibold text-xs border-cyan-500/30 text-white bg-white/5 hover:bg-white/10" asChild>
                    <Link href="/auth/signin" onClick={closeDrawer}>
                      Sign In
                    </Link>
                  </Button>
                  <Button className="w-full bg-[#002E40] hover:bg-[#003850] text-white font-semibold text-xs" asChild>
                    <Link href="/auth/signup" onClick={closeDrawer}>
                      Register
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
