import { DashboardNavigation } from '@/components/dashboard-navigation'
import { AIMentorModal } from '@/components/features/ai-mentor/ai-mentor-modal'
import { AIWrapperProvider } from '@/components/ai-wrapper-provider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  // Transform session user to navigation user format
  const user = {
    id: session.user?.id || '1',
    name: session.user?.name || 'User',
    email: session.user?.email || '',
    role: (session.user?.role as 'STUDENT' | 'EDUCATOR' | 'ADMIN') || 'STUDENT',
    avatar: session.user?.image || undefined,
    totalPoints: 1250 // This would come from database in real app
  }

  return (
    <AIWrapperProvider>
      <div className="min-h-screen bg-background">
        <DashboardNavigation user={user} />
        
        {/* Main Content */}
        <div className="lg:pl-64">
          <main className="py-6 px-4 lg:px-6">
            {children}
          </main>
        </div>

        {/* AI Mentor Floating Button */}
        <AIMentorModal />
      </div>
    </AIWrapperProvider>
  )
}