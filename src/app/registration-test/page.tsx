'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RegistrationTestPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [result, setResult] = useState<{
    status?: number;
    ok?: boolean;
    data?: {error?: string; details?: string; user?: unknown};
    error?: string;
  } | null>(null)
  const [loading, setLoading] = useState(false)

  const testRegistration = async () => {
    setLoading(true)
    setResult(null)

    try {
      console.log('Testing registration...')
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: 'STUDENT'
        }),
      })

      console.log('Response status:', response.status)
      
      const data = await response.json()
      console.log('Response data:', data)

      setResult({
        status: response.status,
        ok: response.ok,
        data
      })
    } catch (error) {
      console.error('Error:', error)
      setResult({
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Registration Test Tool</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="test@example.com"
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 8 characters"
              />
            </div>

            <Button
              onClick={testRegistration}
              disabled={loading || !email || !password}
              className="w-full"
            >
              {loading ? 'Testing...' : 'Test Registration'}
            </Button>

            <div className="text-xs text-gray-500">
              <p>• Password must be at least 8 characters</p>
              <p>• Email must be unique</p>
              <p>• Check browser console (F12) for detailed logs</p>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle className={result.ok ? 'text-green-600' : 'text-red-600'}>
                {result.ok ? '✅ Success' : '❌ Failed'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <strong>Status:</strong> {result.status}
                </div>
                
                <div>
                  <strong>Response:</strong>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto text-xs mt-2">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>

                {result.ok && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-semibold text-green-800">Registration Successful!</p>
                    <p className="text-sm text-green-700 mt-2">
                      You can now try logging in with these credentials at:
                    </p>
                    <a 
                      href="/auth/signin" 
                      className="text-blue-600 underline block mt-2"
                    >
                      Go to Sign In Page
                    </a>
                  </div>
                )}

                {!result.ok && result.data?.error && (
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="font-semibold text-red-800">Error Message:</p>
                    <p className="text-sm text-red-700 mt-2">{result.data.error}</p>
                    {result.data.details && (
                      <p className="text-xs text-red-600 mt-2">Details: {result.data.details}</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-blue-50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">Quick Test:</h3>
            <Button
              onClick={() => {
                const timestamp = Date.now()
                setName('Test User')
                setEmail(`test${timestamp}@example.com`)
                setPassword('password123')
              }}
              variant="outline"
              size="sm"
            >
              Fill with Test Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
