'use client'

import { Navigation } from '@/components/navigation'

interface DashboardNavigationProps {
  user: {
    id: string
    name: string
    email: string
    role: 'STUDENT' | 'EDUCATOR' | 'ADMIN'
    avatar?: string
    totalPoints?: number
  }
}

export function DashboardNavigation({ user }: DashboardNavigationProps) {
  return <Navigation user={user} />
}
