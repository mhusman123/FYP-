'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  User,
  Mail,
  Phone,
  Camera,
  Lock,
  Eye,
  EyeOff,
  Bell,
  Shield,
  Palette,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Save,
  RotateCcw,
  Building,
  GraduationCap,
  KeyRound,
  Smartphone,
  Check
} from 'lucide-react'

interface ProfileSettingsFormProps {
  initialUser: {
    id: string
    name: string
    email: string
    role: 'STUDENT' | 'EDUCATOR' | 'ADMIN'
    avatar?: string
    totalPoints?: number
  }
}

// Preset avatar options for fast selection
const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
]

export function ProfileSettingsForm({ initialUser }: ProfileSettingsFormProps) {
  const router = useRouter()
  const { update: updateSession } = useSession()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Profile fields state
  const [name, setName] = useState(initialUser.name || '')
  const [email, setEmail] = useState(initialUser.email || '')
  const [avatar, setAvatar] = useState(initialUser.avatar || '')
  const [contact, setContact] = useState('+92 300 1234567')
  const [emergencyContact, setEmergencyContact] = useState('+92 321 9876543')
  const [department, setDepartment] = useState(
    initialUser.role === 'EDUCATOR'
      ? 'Computer Science & AI Engineering'
      : 'Robotics & Advanced Computing (Year 2)'
  )
  const [studentOrTeacherId, setStudentOrTeacherId] = useState(
    initialUser.role === 'EDUCATOR' ? 'SST-FACULTY-024' : 'SST-STU-2026-089'
  )
  const [officeOrCampus, setOfficeOrCampus] = useState(
    initialUser.role === 'EDUCATOR' ? 'Academic Block B, Room 304' : 'Campus Main Hall, Desk 12'
  )
  const [bio, setBio] = useState(
    initialUser.role === 'EDUCATOR'
      ? 'Educator specializing in Artificial Intelligence, Machine Learning, and Computer Vision at SST.'
      : 'Passionate computer science scholar exploring AI applications, algorithms, and web technologies.'
  )

  // Password fields state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  // Notification switches state
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [gradeAlerts, setGradeAlerts] = useState(true)
  const [deadlineReminders, setDeadlineReminders] = useState(true)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)

  // Form submission status
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Handle local file upload for profile picture
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setErrorMessage('Profile image must be less than 4MB')
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          const newAvatar = event.target.result as string
          setAvatar(newAvatar)
          setSuccessMessage('Profile photo updated in preview! Click Save to apply.')
          if (typeof window !== 'undefined') {
            window.dispatchEvent(
              new CustomEvent('user-profile-updated', {
                detail: { avatar: newAvatar, name },
              })
            )
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle preset avatar selection
  const handleSelectPreset = (presetUrl: string) => {
    setAvatar(presetUrl)
    setSuccessMessage('Preset avatar selected! Click Save to apply.')
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('user-profile-updated', {
          detail: { avatar: presetUrl, name },
        })
      )
    }
  }

  // Handle reset avatar
  const handleResetAvatar = () => {
    setAvatar('')
    setSuccessMessage('Profile photo reset! Click Save to apply.')
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('user-profile-updated', {
          detail: { avatar: '', name },
        })
      )
    }
  }

  // Handle full profile save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccessMessage(null)
    setErrorMessage(null)

    // Password validation check
    if (newPassword) {
      if (newPassword.length < 6) {
        setErrorMessage('New password must be at least 6 characters long')
        setLoading(false)
        return
      }
      if (newPassword !== confirmPassword) {
        setErrorMessage('New password and confirmation do not match')
        setLoading(false)
        return
      }
      if (!currentPassword) {
        setErrorMessage('Please provide your current password to set a new password')
        setLoading(false)
        return
      }
    }

    try {
      const res = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          image: avatar,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update profile settings')
      }

      setSuccessMessage('Your profile and account settings have been saved successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')

      // Dispatch event for real-time circular button and header synchronization
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('user-profile-updated', {
            detail: {
              name,
              email,
              avatar,
            },
          })
        )
      }

      // Update NextAuth session state
      try {
        if (updateSession) {
          await updateSession({
            name,
            email,
            image: avatar,
          })
        }
      } catch (sessErr) {
        console.warn('Session update error:', sessErr)
      }

      // Refresh server components to propagate updated name and avatar in navigation
      router.refresh()
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred while saving')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Banner: User Quick Overview */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#001f33] via-[#002E40] to-[#001724] border border-cyan-500/30 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          
          {/* Avatar with Camera Overlay */}
          <div className="relative group">
            <Avatar className="h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-cyan-400/80 shadow-2xl overflow-hidden bg-[#8D1B2D]">
              <AvatarImage src={avatar} alt={name} className="object-cover h-full w-full" />
              <AvatarFallback className="bg-[#8D1B2D] text-white text-3xl font-extrabold">
                {name ? name.charAt(0).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-semibold cursor-pointer backdrop-blur-xs"
              title="Upload profile picture"
            >
              <Camera className="h-6 w-6 text-cyan-300 mb-1" />
              <span>Change</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* User Details */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {name || 'Academic User'}
              </h1>
              <Badge className="bg-[#8D1B2D] text-white font-mono px-2.5 py-0.5 text-xs font-bold uppercase shadow-sm border border-rose-400/30">
                {initialUser.role}
              </Badge>
              <Badge className="bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs font-semibold">
                {studentOrTeacherId}
              </Badge>
            </div>
            
            <p className="text-sm text-slate-300 flex items-center justify-center sm:justify-start gap-2">
              <Mail className="h-4 w-4 text-cyan-400" />
              <span>{email}</span>
              <span className="text-slate-500">•</span>
              <Building className="h-4 w-4 text-cyan-400" />
              <span>{department}</span>
            </p>

            {initialUser.totalPoints !== undefined && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs text-cyan-300 mt-2">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span className="font-bold">{initialUser.totalPoints} Academic Points</span>
              </div>
            )}
          </div>

          {/* Fast Save Button in Header */}
          <div className="sm:self-center">
            <Button
              onClick={handleSaveProfile}
              disabled={loading}
              className="bg-cyan-500 hover:bg-cyan-600 text-[#001724] font-bold shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="h-4 w-4" />
              <span>{loading ? 'Saving...' : 'Save All Changes'}</span>
            </Button>
          </div>

        </div>
      </div>

      {/* Alert Banners */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
          <p className="text-sm font-semibold">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-200 flex items-center gap-3 animate-in fade-in">
          <AlertCircle className="h-5 w-5 text-rose-400 flex-shrink-0" />
          <p className="text-sm font-semibold">{errorMessage}</p>
        </div>
      )}

      {/* Settings Navigation Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 bg-[#001724]/70 p-1.5 rounded-xl border border-cyan-500/20 backdrop-blur-md h-auto gap-1">
          <TabsTrigger
            value="profile"
            className="flex items-center gap-2 py-2.5 text-xs font-bold data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 rounded-lg text-slate-300 cursor-pointer"
          >
            <User className="h-4 w-4" />
            <span>Profile & Photo</span>
          </TabsTrigger>
          <TabsTrigger
            value="contact"
            className="flex items-center gap-2 py-2.5 text-xs font-bold data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 rounded-lg text-slate-300 cursor-pointer"
          >
            <Phone className="h-4 w-4" />
            <span>Account & Contact</span>
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="flex items-center gap-2 py-2.5 text-xs font-bold data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 rounded-lg text-slate-300 cursor-pointer"
          >
            <Lock className="h-4 w-4" />
            <span>Security & Password</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2 py-2.5 text-xs font-bold data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 rounded-lg text-slate-300 cursor-pointer"
          >
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
        </TabsList>

        {/* 1. Profile & Avatar Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-[#001724]/60 border-cyan-500/20 backdrop-blur-md text-white shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-white">
                <Camera className="h-5 w-5 text-cyan-400" />
                Profile Picture & Avatar Manager
              </CardTitle>
              <CardDescription className="text-slate-300">
                Upload your own photo or choose from high-definition preset avatars.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Picture Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <Avatar className="h-20 w-20 rounded-full border-2 border-cyan-400 shadow-md">
                  <AvatarImage src={avatar} alt={name} className="object-cover" />
                  <AvatarFallback className="bg-[#8D1B2D] text-white text-xl font-bold">
                    {name ? name.charAt(0).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2 flex-1 text-center sm:text-left">
                  <h4 className="text-sm font-bold text-white">Select Photo Source</h4>
                  <p className="text-xs text-slate-400">
                    Recommended: Square JPG or PNG, minimum 300x300px.
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-[#8D1B2D] hover:bg-[#741322] text-white text-xs font-semibold cursor-pointer"
                    >
                      <Camera className="h-3.5 w-3.5 mr-1.5" />
                      Upload from Device
                    </Button>
                    {avatar && (
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={handleResetAvatar}
                        className="border-white/20 text-slate-300 hover:text-white text-xs hover:bg-white/10 cursor-pointer"
                      >
                        <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                        Reset to Initial
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Preset Avatar Selection */}
              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Or Pick a Preset Avatar:
                </Label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {PRESET_AVATARS.map((presetUrl, idx) => {
                    const isSelected = avatar === presetUrl
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectPreset(presetUrl)}
                        className={`relative rounded-full p-0.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'ring-4 ring-cyan-400 scale-105'
                            : 'hover:scale-105 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <Avatar className="h-14 w-14 rounded-full mx-auto">
                          <AvatarImage src={presetUrl} alt={`Preset ${idx + 1}`} className="object-cover" />
                          <AvatarFallback>AV</AvatarFallback>
                        </Avatar>
                        {isSelected && (
                          <div className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-cyan-400 text-[#001724] flex items-center justify-center shadow-xs">
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              <Separator className="bg-white/10" />

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname" className="text-xs font-bold text-slate-200">
                    Full Name <span className="text-rose-400">*</span>
                  </Label>
                  <Input
                    id="fullname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-white/5 border-cyan-500/30 text-white placeholder:text-slate-500 focus:border-cyan-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="id-code" className="text-xs font-bold text-slate-200">
                    {initialUser.role === 'EDUCATOR' ? 'Faculty ID' : 'Student Enrollment ID'}
                  </Label>
                  <Input
                    id="id-code"
                    value={studentOrTeacherId}
                    onChange={(e) => setStudentOrTeacherId(e.target.value)}
                    className="bg-white/5 border-cyan-500/30 text-white placeholder:text-slate-500 focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dept" className="text-xs font-bold text-slate-200">
                    {initialUser.role === 'EDUCATOR' ? 'Department & Discipline' : 'Grade & Specialization'}
                  </Label>
                  <Input
                    id="dept"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="bg-white/5 border-cyan-500/30 text-white placeholder:text-slate-500 focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role-static" className="text-xs font-bold text-slate-200">
                    System Role
                  </Label>
                  <div className="h-9 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">{initialUser.role}</span>
                    <Badge className="bg-[#8D1B2D] text-white text-[10px]">Verified Portal Account</Badge>
                  </div>
                </div>
              </div>

              {/* Bio Field */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-xs font-bold text-slate-200">
                  Academic Statement / Biography
                </Label>
                <Textarea
                  id="bio"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share a brief introduction, interests, or teaching background..."
                  className="bg-white/5 border-cyan-500/30 text-white placeholder:text-slate-500 focus:border-cyan-400 resize-none"
                />
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* 2. Account & Contact Tab */}
        <TabsContent value="contact" className="space-y-6">
          <Card className="bg-[#001724]/60 border-cyan-500/20 backdrop-blur-md text-white shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-white">
                <Phone className="h-5 w-5 text-cyan-400" />
                Email, Phone & Communication Channels
              </CardTitle>
              <CardDescription className="text-slate-300">
                Keep your official SST communications and contact coordinates up to date.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Email Address */}
                <div className="space-y-2">
                  <Label htmlFor="account-email" className="text-xs font-bold text-slate-200">
                    Official Email Address <span className="text-rose-400">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-cyan-400" />
                    <Input
                      id="account-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@school.edu.pk"
                      className="pl-9 bg-white/5 border-cyan-500/30 text-white placeholder:text-slate-500 focus:border-cyan-400"
                      required
                    />
                  </div>
                </div>

                {/* Primary Contact Number */}
                <div className="space-y-2">
                  <Label htmlFor="primary-phone" className="text-xs font-bold text-slate-200">
                    Primary Phone / WhatsApp Number <span className="text-rose-400">*</span>
                  </Label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-2.5 h-4 w-4 text-cyan-400" />
                    <Input
                      id="primary-phone"
                      type="tel"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="+92 300 0000000"
                      className="pl-9 bg-white/5 border-cyan-500/30 text-white placeholder:text-slate-500 focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-2">
                  <Label htmlFor="emergency-phone" className="text-xs font-bold text-slate-200">
                    {initialUser.role === 'STUDENT' ? 'Parent / Guardian Emergency Contact' : 'Alternate Emergency Contact'}
                  </Label>
                  <Input
                    id="emergency-phone"
                    type="tel"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    placeholder="+92 321 0000000"
                    className="bg-white/5 border-cyan-500/30 text-white placeholder:text-slate-500 focus:border-cyan-400"
                  />
                </div>

                {/* Office / Campus Location */}
                <div className="space-y-2">
                  <Label htmlFor="office-location" className="text-xs font-bold text-slate-200">
                    {initialUser.role === 'EDUCATOR' ? 'Office Room / Consultation Hours' : 'Campus Building & Desk'}
                  </Label>
                  <Input
                    id="office-location"
                    value={officeOrCampus}
                    onChange={(e) => setOfficeOrCampus(e.target.value)}
                    placeholder="e.g. Block A, Room 201"
                    className="bg-white/5 border-cyan-500/30 text-white placeholder:text-slate-500 focus:border-cyan-400"
                  />
                </div>

              </div>

              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-slate-300 space-y-1">
                <p className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <Shield className="h-4 w-4" /> Official Data Verification Policy
                </p>
                <p>
                  Any updates to your primary email address will send an instant confirmation link to both your existing and new inbox for verification security.
                </p>
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. Security & Password Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-[#001724]/60 border-cyan-500/20 backdrop-blur-md text-white shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-white">
                <KeyRound className="h-5 w-5 text-cyan-400" />
                Password & Authentication Controls
              </CardTitle>
              <CardDescription className="text-slate-300">
                Change your login password and manage two-factor authentication.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="space-y-4 max-w-xl">
                
                {/* Current Password */}
                <div className="space-y-2">
                  <Label htmlFor="current-pass" className="text-xs font-bold text-slate-200">
                    Current Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="current-pass"
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter existing password"
                      className="pr-10 bg-white/5 border-cyan-500/30 text-white placeholder:text-slate-500 focus:border-cyan-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white cursor-pointer"
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <Label htmlFor="new-pass" className="text-xs font-bold text-slate-200">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="new-pass"
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="pr-10 bg-white/5 border-cyan-500/30 text-white placeholder:text-slate-500 focus:border-cyan-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white cursor-pointer"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirm-pass" className="text-xs font-bold text-slate-200">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-pass"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="bg-white/5 border-cyan-500/30 text-white placeholder:text-slate-500 focus:border-cyan-400"
                  />
                </div>

              </div>

              <Separator className="bg-white/10" />

              {/* Two-Factor Authentication Switch */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="2fa-toggle" className="text-sm font-bold text-white">
                      Two-Factor Authentication (2FA)
                    </Label>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px]">
                      Recommended
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400">
                    Require an SMS/Email verification code every time you sign in.
                  </p>
                </div>
                <Switch
                  id="2fa-toggle"
                  checked={twoFactorAuth}
                  onCheckedChange={setTwoFactorAuth}
                />
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* 4. Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-[#001724]/60 border-cyan-500/20 backdrop-blur-md text-white shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-white">
                <Bell className="h-5 w-5 text-cyan-400" />
                Notification & Alert Preferences
              </CardTitle>
              <CardDescription className="text-slate-300">
                Customize how and when you receive academic notifications from SST.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifs" className="text-sm font-semibold text-white">
                    Email Notifications
                  </Label>
                  <p className="text-xs text-slate-400">
                    Receive assignment updates, grading feedback, and announcements in your inbox.
                  </p>
                </div>
                <Switch
                  id="email-notifs"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifs" className="text-sm font-semibold text-white">
                    SMS & Urgent Mobile Alerts
                  </Label>
                  <p className="text-xs text-slate-400">
                    Get instant SMS alerts for critical deadline changes and campus alerts.
                  </p>
                </div>
                <Switch
                  id="sms-notifs"
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="space-y-0.5">
                  <Label htmlFor="grade-notifs" className="text-sm font-semibold text-white">
                    Grade & Feedback Postings
                  </Label>
                  <p className="text-xs text-slate-400">
                    Notify immediately when an assignment is scored or review feedback is available.
                  </p>
                </div>
                <Switch
                  id="grade-notifs"
                  checked={gradeAlerts}
                  onCheckedChange={setGradeAlerts}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="space-y-0.5">
                  <Label htmlFor="deadline-notifs" className="text-sm font-semibold text-white">
                    Submission Deadline Reminders
                  </Label>
                  <p className="text-xs text-slate-400">
                    Receive 24-hour and 2-hour warnings before assignment deadlines close.
                  </p>
                </div>
                <Switch
                  id="deadline-notifs"
                  checked={deadlineReminders}
                  onCheckedChange={setDeadlineReminders}
                />
              </div>

            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

      {/* Sticky Bottom Save Action Bar */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-[#001724]/90 border border-cyan-500/30 backdrop-blur-md shadow-2xl sticky bottom-4 z-30">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Shield className="h-4 w-4 text-cyan-400" />
          <span>All updates are synced securely with your SST account.</span>
        </div>
        <Button
          onClick={handleSaveProfile}
          disabled={loading}
          className="bg-[#8D1B2D] hover:bg-[#741322] text-white font-bold px-6 shadow-md transition-all hover:scale-[1.02] cursor-pointer"
        >
          <Save className="h-4 w-4 mr-2" />
          <span>{loading ? 'Saving Profile...' : 'Save Profile Settings'}</span>
        </Button>
      </div>

    </div>
  )
}
