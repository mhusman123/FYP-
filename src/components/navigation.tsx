'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
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
  Bot
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
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/courses', label: 'My Courses', icon: BookOpen },
  { href: '/assignments', label: 'Assignments', icon: FileText },
  { href: '/submissions', label: 'Submissions', icon: Upload },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/badges', label: 'My Badges', icon: Award },
  { href: '/submission-feedback', label: 'AI Feedback', icon: Bot },
  { href: '/grade-requests', label: 'Grade Requests', icon: ClipboardCheck },
]

const educatorNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/courses', label: 'My Courses', icon: BookOpen },
  { href: '/assignments', label: 'Assignments', icon: FileText },
  { href: '/grading', label: 'Grading', icon: FileCheck },
  { href: '/autograding', label: 'Autograding', icon: Bot },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/students', label: 'Students', icon: Users },
  { href: '/plagiarism', label: 'Plagiarism Reports', icon: AlertTriangle },
  { href: '/grade-requests', label: 'Grade Requests', icon: ClipboardCheck },
]

export function Navigation({ user }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  
  const navItems = user.role === 'STUDENT' ? studentNavItems : educatorNavItems

  const NavItem = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }) => (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors',
        pathname === href
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      )}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-background lg:border-r">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 px-6 py-4 border-b">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">EduPlatform</span>
          </div>

          {/* User Info */}
          <div className="px-6 py-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                {user.role === 'STUDENT' && user.totalPoints !== undefined && (
                  <Badge variant="secondary" className="mt-1">
                    {user.totalPoints} pts
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </nav>

          {/* Settings & Logout */}
          <div className="px-4 py-4 border-t space-y-1">
            <NavItem href="/" label="Landing Page" icon={Home} />
            <NavItem href="/settings" label="Settings" icon={Settings} />
            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-muted w-full"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden bg-background border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">EduPlatform</span>
          </div>
          
          <div className="flex items-center gap-2">
            {user.role === 'STUDENT' && user.totalPoints !== undefined && (
              <Badge variant="secondary">{user.totalPoints} pts</Badge>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    Landing Page
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="mt-4 space-y-1">
            {navItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </nav>
        )}
      </header>
    </>
  )
}