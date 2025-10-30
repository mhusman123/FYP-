'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AuthTestPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Test Page</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status */}
            <div>
              <h3 className="font-semibold mb-2">Current Status:</h3>
              <div className={`p-4 rounded-lg ${session ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className="font-bold">
                  {session ? '✅ Logged In' : '❌ Not Logged In'}
                </p>
                <p className="text-sm">Status: {status}</p>
              </div>
            </div>

            {/* Session Data */}
            {session && (
              <div>
                <h3 className="font-semibold mb-2">Session Data:</h3>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p><strong>Name:</strong> {session.user?.name || 'N/A'}</p>
                  <p><strong>Email:</strong> {session.user?.email || 'N/A'}</p>
                  <p><strong>Role:</strong> {session.user?.role || 'N/A'}</p>
                  <p><strong>ID:</strong> {session.user?.id || 'N/A'}</p>
                </div>
              </div>
            )}

            {/* Full Session JSON */}
            <div>
              <h3 className="font-semibold mb-2">Full Session JSON:</h3>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-xs">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <h3 className="font-semibold mb-2">Actions:</h3>
              
              {!session ? (
                <div className="space-y-2">
                  <Button 
                    onClick={() => router.push('/auth/signin')}
                    className="w-full"
                  >
                    Go to Sign In
                  </Button>
                  <Button 
                    onClick={() => router.push('/auth/signup')}
                    variant="outline"
                    className="w-full"
                  >
                    Go to Sign Up
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button 
                    onClick={() => router.push('/dashboard')}
                    className="w-full"
                  >
                    Go to Dashboard
                  </Button>
                  <Button 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    variant="destructive"
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Test Instructions:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>If not logged in, go to Sign In or Sign Up</li>
                <li>Use test account: student@eduplatform.edu / password</li>
                <li>Or create a new account</li>
                <li>Come back to this page to verify session</li>
                <li>Try accessing /dashboard to test protected routes</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
