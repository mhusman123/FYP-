import { DashboardNavigation } from '@/components/dashboard-navigation'
import { AIMentorModal } from '@/components/features/ai-mentor/ai-mentor-modal'
import { AIWrapperProvider } from '@/components/ai-wrapper-provider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
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

  // Query latest user record from database
  let dbUser = null
  if (session.user?.id) {
    try {
      dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { id: true, name: true, email: true, role: true, image: true, totalPoints: true }
      })
    } catch (e) {
      console.error('Error fetching db user in layout:', e)
    }
  }

  // Transform user to navigation user format
  const user = {
    id: dbUser?.id || session.user?.id || '1',
    name: dbUser?.name || session.user?.name || 'User',
    email: dbUser?.email || session.user?.email || '',
    role: ((dbUser?.role || session.user?.role || 'STUDENT') as 'STUDENT' | 'EDUCATOR' | 'ADMIN'),
    avatar: dbUser?.image || session.user?.image || undefined,
    totalPoints: dbUser?.totalPoints ?? 1250
  }

  return (
    <AIWrapperProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <DashboardNavigation user={user} />
        
        {/* Main Content */}
        <div className="flex-1 w-full">
          <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>

        {/* AI Mentor Floating Button */}
        <AIMentorModal />
      </div>
    </AIWrapperProvider>
  )
}