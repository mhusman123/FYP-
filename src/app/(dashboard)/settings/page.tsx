import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { ProfileSettingsForm } from '@/components/profile-settings-form'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  
  let dbUser = null
  if (session?.user?.id) {
    try {
      dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { id: true, name: true, email: true, role: true, image: true, totalPoints: true }
      })
    } catch (e) {
      console.error('Error fetching db user in settings page:', e)
    }
  }

  const initialUser = {
    id: dbUser?.id || session?.user?.id || '1',
    name: dbUser?.name || session?.user?.name || 'User',
    email: dbUser?.email || session?.user?.email || '',
    role: ((dbUser?.role || session?.user?.role || 'STUDENT') as 'STUDENT' | 'EDUCATOR' | 'ADMIN'),
    avatar: dbUser?.image || session?.user?.image || undefined,
    totalPoints: dbUser?.totalPoints ?? 1250
  }

  return (
    <div className="space-y-6">
      <ProfileSettingsForm initialUser={initialUser} />
    </div>
  )
}