"use client";

import { useState } from 'react';
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Sparkles
} from 'lucide-react';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.role) {
      setError("Please select a role");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          role: formData.role
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Registration failed");
      }

      const result = await signIn("credentials", {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        redirect: false
      });

      if (result?.ok) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Signup error details:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Ambient Cyber Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-cyan-600/15 via-blue-700/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#0ea5e915_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e915_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between p-4 sm:p-6">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-cyan-500/30 backdrop-blur-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <img
            src="/logo.png?v=9"
            alt="Logo"
            className="h-8 sm:h-9 w-auto object-contain drop-shadow-md"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          {/* Sign Up Card */}
          <Card className="bg-[#001724]/90 border border-cyan-500/30 text-white shadow-2xl backdrop-blur-xl rounded-2xl overflow-hidden">
            <CardHeader className="text-center pb-3 border-b border-cyan-500/20 bg-gradient-to-b from-white/5 to-transparent">
              <div className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/40 mx-auto mb-2">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                <span>Platform Registration</span>
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Join EduPlatform AI</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1">
                Create your account and start your educational journey
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 p-6">
              {error && (
                <Alert variant="destructive" className="bg-red-950/70 border-red-500/50 text-red-200">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-xs font-medium">{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-semibold text-slate-300">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-cyan-400" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10 text-xs sm:text-sm bg-[#00121d] border-cyan-900/60 text-white placeholder:text-slate-500 focus:border-cyan-400 h-10 rounded-xl"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold text-slate-300">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-cyan-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 text-xs sm:text-sm bg-[#00121d] border-cyan-900/60 text-white placeholder:text-slate-500 focus:border-cyan-400 h-10 rounded-xl"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div className="space-y-1.5">
                  <Label htmlFor="role" className="text-xs font-semibold text-slate-300">I am a...</Label>
                  <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                    <SelectTrigger className="text-xs sm:text-sm bg-[#00121d] border-cyan-900/60 text-white h-10 rounded-xl">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#001724] border-cyan-500/30 text-white">
                      <SelectItem value="STUDENT" className="focus:bg-[#8D1B2D] focus:text-white">
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                          <GraduationCap className="h-4 w-4 text-cyan-300" />
                          <span>Student</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="EDUCATOR" className="focus:bg-[#8D1B2D] focus:text-white">
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
                          <User className="h-4 w-4 text-cyan-300" />
                          <span>Educator / Teacher</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-semibold text-slate-300">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-cyan-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 8 characters"
                      className="pl-10 pr-10 text-xs sm:text-sm bg-[#00121d] border-cyan-900/60 text-white placeholder:text-slate-500 focus:border-cyan-400 h-10 rounded-xl"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="text-xs font-semibold text-slate-300">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-cyan-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      className="pl-10 pr-10 text-xs sm:text-sm bg-[#00121d] border-cyan-900/60 text-white placeholder:text-slate-500 focus:border-cyan-400 h-10 rounded-xl"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold text-xs sm:text-sm h-11 rounded-xl shadow-lg transition-all mt-2" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Register Account"}
                </Button>
              </form>

              {/* Sign In Link */}
              <div className="text-center pt-2">
                <p className="text-xs text-slate-400">
                  Already have an account?{" "}
                  <Link href="/auth/signin" className="text-cyan-300 hover:text-cyan-200 font-semibold underline underline-offset-2">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
