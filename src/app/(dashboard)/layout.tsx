import { Navigation } from '@/components/navigation'

// Mock user data - replace with actual auth
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@university.edu',
  role: 'STUDENT' as const,
  avatar: '/placeholder-avatar.jpg',
  totalPoints: 1250
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation user={mockUser} />
      
      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="py-6 px-4 lg:px-6">
          {children}
        </main>
      </div>
    </div>
  )
}