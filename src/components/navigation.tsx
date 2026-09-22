'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  BookOpen,
  GraduationCap,
  Trophy,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Upload,
  Award,
  BarChart3,
  Users,
  ClipboardCheck,
  AlertTriangle,
  FileCheck,
  Bot,
  ChevronDown,
  Sparkles,
  User as UserIcon,
  Camera,
  Phone,
  Lock,
  Brain,
  Zap
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  role: 'STUDENT' | 'EDUCATOR' | 'ADMIN'
  avatar?: string
  totalPoints?: number
}

interface NavigationProps {
  user: User
}

const studentNavItems = [
  { href: '/dashboard', label: 'DASHBOARD', icon: Home },
  { href: '/courses', label: 'MY COURSES', icon: BookOpen },
  { href: '/assignments', label: 'ASSIGNMENTS', icon: FileText },
  { href: '/submissions', label: 'SUBMISSIONS', icon: Upload },
  { href: '/leaderboard', label: 'LEADERBOARD', icon: Trophy },
  { href: '/badges', label: 'MY BADGES', icon: Award },
  { href: '/ai-hub', label: 'AI HUB', icon: Sparkles },
  { href: '/grade-requests', label: 'GRADE REQUESTS', icon: ClipboardCheck },
]

const educatorNavItems = [
  { href: '/dashboard', label: 'DASHBOARD', icon: Home },
  { href: '/courses', label: 'MY COURSES', icon: BookOpen },
  { href: '/assignments', label: 'ASSIGNMENTS', icon: FileText },
  { href: '/grading', label: 'GRADING', icon: FileCheck },
  { href: '/ai-hub', label: 'AI HUB', icon: Sparkles },
  { href: '/analytics', label: 'ANALYTICS', icon: BarChart3 },
  { href: '/students', label: 'STUDENTS', icon: Users },
  { href: '/plagiarism', label: 'PLAGIARISM REPORTS', icon: AlertTriangle },
  { href: '/grade-requests', label: 'GRADE REQUESTS', icon: ClipboardCheck },
]

export function Navigation({ user }: NavigationProps) {
  const [currentUser, setCurrentUser] = useState(user)
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)
  const [hasLogoImg, setHasLogoImg] = useState(true)
  const [avatarError, setAvatarError] = useState(false)
  const pathname = usePathname()
  
  const navItems = currentUser.role === 'STUDENT' ? studentNavItems : educatorNavItems

  // Sync state if user prop changes
  useEffect(() => {
    setCurrentUser(user)
    setAvatarError(false)
  }, [user])

  // Real-time listener for instantaneous profile picture updates across portal
  useEffect(() => {
    const handleProfileUpdate = (event: Event) => {
      const customEv = event as CustomEvent<{ name?: string; avatar?: string; email?: string }>
      if (customEv.detail) {
        setCurrentUser(prev => ({
          ...prev,
          name: customEv.detail.name ?? prev.name,
          avatar: customEv.detail.avatar !== undefined ? customEv.detail.avatar : prev.avatar,
          email: customEv.detail.email ?? prev.email,
        }))
        setAvatarError(false)
      }
    }
    window.addEventListener('user-profile-updated', handleProfileUpdate)
    return () => {
      window.removeEventListener('user-profile-updated', handleProfileUpdate)
    }
  }, [])

  return (
    <>
      {/* Single Unified Upper Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#1E1B4B]/80 backdrop-blur-md border-b border-indigo-500/20 shadow-md text-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-1 sm:gap-2 lg:gap-4">
            
            {/* Left: Brand Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link href="/dashboard" className="flex items-center gap-2 group">
                <img
                    src="/logo.png?v=9"
                    alt="Logo"
                    className="h-7 sm:h-8 md:h-9 w-auto max-w-[130px] sm:max-w-[160px] md:max-w-[180px] object-contain hover:opacity-90 transition-opacity drop-shadow-md"
                  />
              </Link>
            </div>

            {/* Center: Clean Text Navigation Buttons (No Slider, No Icons/Stickers) */}
            <nav className="hidden md:flex flex-1 items-center justify-center px-1">
              <div className="flex items-center justify-center gap-0.5 md:gap-1 lg:gap-1.5">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'px-1.5 py-1 md:px-2 md:py-1 lg:px-2.5 lg:py-1 text-[10px] md:text-[11px] lg:text-[11.5px] xl:text-xs font-bold tracking-tight md:tracking-normal rounded-sm transition-all whitespace-nowrap cursor-pointer',
                        isActive
                          ? 'bg-indigo-500/20 text-indigo-200 border-b-2 border-indigo-400 font-bold shadow-xs'
                          : 'text-slate-200 hover:text-white hover:bg-white/10'
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </nav>

            {/* Right: Circular User Profile Dropdown Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              
              {/* Circular User Profile Dropdown Button */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#8D1B2D] p-0.5 border-2 border-indigo-400/60 hover:border-indigo-300 hover:scale-105 transition-all cursor-pointer shadow-md focus:outline-hidden focus:ring-2 focus:ring-indigo-400/80 flex items-center justify-center flex-shrink-0 overflow-hidden"
                    title={currentUser.name}
                    aria-label="User profile menu"
                  >
                    {currentUser.avatar && !avatarError ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="h-full w-full rounded-full object-cover"
                        onError={() => setAvatarError(true)}
                      />
                    ) : (
                      <span className="text-white font-extrabold text-sm sm:text-base select-none">
                        {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="w-72 bg-[#1E1B4B] border border-indigo-500/30 text-white shadow-2xl rounded-xl p-2 z-50 animate-in fade-in-80 zoom-in-95"
                >
                  {/* User Profile Header */}
                  <div className="p-3 bg-[#17143A] rounded-lg border border-indigo-500/20 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full border-2 border-[#8D1B2D] shadow-sm flex-shrink-0 overflow-hidden bg-[#8D1B2D] flex items-center justify-center">
                        {currentUser.avatar && !avatarError ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="h-full w-full object-cover"
                            onError={() => setAvatarError(true)}
                          />
                        ) : (
                          <span className="text-sm text-white font-bold">
                            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="text-xs font-bold text-white truncate leading-tight">
                            {currentUser.name}
                          </p>
                          <Badge className="bg-[#8D1B2D] text-white text-[9px] px-1.5 py-0 uppercase font-mono font-semibold border-none">
                            {currentUser.role}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>

                    {currentUser.totalPoints !== undefined && (
                      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-indigo-300" /> Academic Points:
                        </span>
                        <span className="font-bold text-indigo-300">{currentUser.totalPoints} pts</span>
                      </div>
                    )}
                  </div>

                  <DropdownMenuLabel className="text-[10px] uppercase font-bold tracking-wider text-indigo-300 px-2 py-1">
                    AI & Account Tools
                  </DropdownMenuLabel>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/ai-hub"
                      className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold text-cyan-300 hover:text-white hover:bg-cyan-500/20 rounded-lg cursor-pointer transition-colors"
                    >
                      <Sparkles className="h-4 w-4 text-cyan-400" />
                      <span>AI Innovation Hub</span>
                      <Badge className="ml-auto bg-cyan-600/80 text-[10px] text-white py-0 px-1.5 border-0">AI</Badge>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                    >
                      <UserIcon className="h-4 w-4 text-indigo-300" />
                      <span>Edit Profile & Photo</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                    >
                      <Phone className="h-4 w-4 text-indigo-300" />
                      <span>Change Email & Contact</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                    >
                      <Lock className="h-4 w-4 text-indigo-300" />
                      <span>Password & Security</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-white/10 my-1" />

                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                    >
                      <BarChart3 className="h-4 w-4 text-indigo-300" />
                      <span>Portal Dashboard</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/"
                      className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                    >
                      <Home className="h-4 w-4 text-indigo-300" />
                      <span>Public Landing Page</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-white/10 my-1" />

                  {/* Sign Out Action */}
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-semibold text-rose-300 hover:text-rose-100 hover:bg-rose-500/20 rounded-lg cursor-pointer transition-colors"
                  >
                    <LogOut className="h-4 w-4 text-rose-400" />
                    <span>Sign Out from Portal</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Hamburger Drawer Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(true)}
                className="flex md:hidden items-center justify-center h-8 w-8 rounded-lg border border-indigo-500/30 bg-[#1E1B4B] text-white hover:bg-[#2B2664] hover:text-indigo-200 transition-colors"
                aria-label="Open mobile portal navigation"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Slide-over Drawer (for Small Screens) */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sidebar */}
          <aside className="relative z-10 w-80 max-w-[85vw] h-full bg-[#1E1B4B] text-white border-l border-indigo-500/20 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header: Profile */}
            <div className="p-4 border-b border-indigo-500/20 bg-[#17143A] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="h-10 w-10 rounded-full border-2 border-indigo-500/40 shadow-xs flex-shrink-0 overflow-hidden bg-[#8D1B2D] flex items-center justify-center">
                  {currentUser.avatar && !avatarError ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="h-full w-full object-cover"
                      onError={() => setAvatarError(true)}
                    />
                  ) : (
                    <span className="text-sm text-white font-bold">
                      {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="text-sm font-bold tracking-tight truncate text-white leading-tight">
                      {currentUser.name}
                    </p>
                    <Badge className="bg-[#8D1B2D] text-white text-[9px] px-1.5 py-0 uppercase font-mono font-semibold border-none">
                      {currentUser.role}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 truncate leading-tight mt-0.5 font-normal">
                    {currentUser.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Drawer Body: Navigation Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-300 mb-1">
                Portal Navigation
              </p>

              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileDrawerOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 text-xs font-semibold rounded-lg transition-colors',
                      isActive
                        ? 'bg-indigo-500/20 text-indigo-200 border-l-2 border-indigo-400 font-bold shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    )}
                  >
                    <Icon className={cn('h-4 w-4', isActive ? 'text-indigo-200' : 'text-indigo-300/70')} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Drawer Footer: Fast Links & Sign Out */}
            <div className="p-4 border-t border-indigo-500/20 bg-[#17143A] space-y-2">
              <Link
                href="/"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-md text-slate-300 hover:text-white hover:bg-white/10"
              >
                <Home className="h-4 w-4 text-indigo-300" />
                <span>Public Landing Page</span>
              </Link>
              
              <Link
                href="/settings"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-md text-slate-300 hover:text-white hover:bg-white/10"
              >
                <Settings className="h-4 w-4 text-indigo-300" />
                <span>Account Settings</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setIsMobileDrawerOpen(false)
                  signOut({ callbackUrl: '/' })
                }}
                className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-md bg-[#8D1B2D] text-white hover:bg-[#741322] w-full text-left"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>

          </aside>
        </div>
      )}
    </>
  )
}
