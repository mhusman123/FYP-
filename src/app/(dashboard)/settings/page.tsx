import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Moon,
  Sun,
  Monitor,
  Mail,
  Smartphone,
  Lock,
  Key,
  Database,
  Download,
  Trash2
} from 'lucide-react'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Settings
          </CardTitle>
          <CardDescription>
            Update your personal information and profile details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="p-2 border rounded-md bg-muted">
                {user?.name || 'Not set'}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="p-2 border rounded-md bg-muted">
                {user?.email || 'Not set'}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Account Type</Label>
              <div className="p-2 border rounded-md bg-muted">
                <Badge variant="secondary">
                  {user?.role || 'Student'}
                </Badge>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <Button>Update Profile</Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose how you want to be notified about activity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications" className="text-base">
                  Email Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about assignments and grades via email
                </p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications" className="text-base">
                  Push Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get instant notifications in your browser
                </p>
              </div>
              <Switch id="push-notifications" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notifications" className="text-base">
                  SMS Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive important updates via SMS
                </p>
              </div>
              <Switch id="sms-notifications" />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="grade-notifications" className="text-base">
                  Grade Updates
                </Label>
                <p className="text-sm text-muted-foreground">
                  Notify when grades are posted or updated
                </p>
              </div>
              <Switch id="grade-notifications" defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="deadline-reminders" className="text-base">
                  Deadline Reminders
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get reminders before assignment deadlines
                </p>
              </div>
              <Switch id="deadline-reminders" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize how the application looks and feels.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Theme</Label>
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                Dark
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                System
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="animations" className="text-base">
                Enable Animations
              </Label>
              <p className="text-sm text-muted-foreground">
                Show smooth transitions and animations
              </p>
            </div>
            <Switch id="animations" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="compact-mode" className="text-base">
                Compact Mode
              </Label>
              <p className="text-sm text-muted-foreground">
                Reduce spacing and show more content
              </p>
            </div>
            <Switch id="compact-mode" />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
          <CardDescription>
            Manage your privacy settings and account security.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="profile-visibility" className="text-base">
                Public Profile
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow others to see your profile and achievements
              </p>
            </div>
            <Switch id="profile-visibility" defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="leaderboard-visibility" className="text-base">
                Show on Leaderboard
              </Label>
              <p className="text-sm text-muted-foreground">
                Display your name and score on public leaderboards
              </p>
            </div>
            <Switch id="leaderboard-visibility" defaultChecked />
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-base">Security Actions</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button variant="outline" className="flex items-center gap-2 justify-start">
                <Key className="h-4 w-4" />
                Change Password
              </Button>
              <Button variant="outline" className="flex items-center gap-2 justify-start">
                <Lock className="h-4 w-4" />
                Two-Factor Auth
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Language & Region
          </CardTitle>
          <CardDescription>
            Set your preferred language and regional settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <div className="p-2 border rounded-md bg-muted">
                English (US)
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <div className="p-2 border rounded-md bg-muted">
                UTC-05:00 (Eastern Time)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Management
          </CardTitle>
          <CardDescription>
            Export or delete your data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button variant="outline" className="flex items-center gap-2 justify-start">
              <Download className="h-4 w-4" />
              Export My Data
            </Button>
            <Button variant="destructive" className="flex items-center gap-2 justify-start">
              <Trash2 className="h-4 w-4" />
              Delete Account
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Deleting your account will permanently remove all your data and cannot be undone.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}