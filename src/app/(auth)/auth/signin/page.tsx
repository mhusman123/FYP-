"use client";

import { signIn, getProviders } from "next-auth/react";
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Github,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  User,
  Lock,
  Sparkles
} from 'lucide-react';
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import type { BuiltInProviderType } from "next-auth/providers/index";

function SignInForm() {
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  const handleCredentialSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl
      });

      if (result?.error) {
        window.location.href = `/auth/signin?error=CredentialsSignin`;
      } else if (result?.ok) {
        window.location.href = callbackUrl;
      }
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "CredentialsSignin":
        return "Invalid email or password. Please try again.";
      case "OAuthSignin":
        return "Error with OAuth provider. Please try again.";
      case "OAuthCallback":
        return "Error in OAuth callback. Please try again.";
      case "OAuthCreateAccount":
        return "Could not create OAuth account. Please try again.";
      case "EmailCreateAccount":
        return "Could not create account. Please try again.";
      case "Callback":
        return "Error in callback. Please try again.";
      case "OAuthAccountNotLinked":
        return "Account already exists with different provider.";
      case "EmailSignin":
        return "Check your email for the sign-in link.";
      case "SessionRequired":
        return "Please sign in to access this page.";
      default:
        return "An unexpected error occurred. Please try again.";
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
          {/* Welcome Card */}
          <Card className="bg-[#001724]/90 border border-cyan-500/30 text-white shadow-2xl backdrop-blur-xl rounded-2xl overflow-hidden">
            <CardHeader className="text-center pb-3 border-b border-cyan-500/20 bg-gradient-to-b from-white/5 to-transparent">
              <div className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/40 mx-auto mb-2">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                <span>EduPlatform AI Portal</span>
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Welcome Back</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1">
                Sign in to access your student or educator dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5 p-6">
              {error && (
                <Alert variant="destructive" className="bg-red-950/70 border-red-500/50 text-red-200">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-xs font-medium">{getErrorMessage(error)}</AlertDescription>
                </Alert>
              )}

              {/* Quick Access Demo Buttons */}
              <div className="space-y-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 text-center">
                  Quick Access Test Accounts
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    className="w-full text-left p-3 rounded-xl bg-[#002235] hover:bg-[#002E40] border border-cyan-500/25 hover:border-cyan-400/50 transition-all group cursor-pointer shadow-sm"
                    onClick={async () => {
                      setIsLoading(true);
                      const result = await signIn("credentials", { 
                        email: "student@eduplatform.edu",
                        password: "password",
                        redirect: false,
                        callbackUrl
                      });
                      if (result?.ok) {
                        window.location.href = callbackUrl;
                      } else {
                        window.location.href = `/auth/signin?error=CredentialsSignin`;
                      }
                      setIsLoading(false);
                    }}
                    disabled={isLoading}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-emerald-500/20 border border-emerald-500/40 rounded-lg text-emerald-400">
                        <GraduationCap className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">Test Student</div>
                        <div className="text-[10px] text-slate-400">Student Portal</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    className="w-full text-left p-3 rounded-xl bg-[#002235] hover:bg-[#002E40] border border-cyan-500/25 hover:border-cyan-400/50 transition-all group cursor-pointer shadow-sm"
                    onClick={async () => {
                      setIsLoading(true);
                      const result = await signIn("credentials", { 
                        email: "educator@eduplatform.edu",
                        password: "password",
                        redirect: false,
                        callbackUrl
                      });
                      if (result?.ok) {
                        window.location.href = callbackUrl;
                      } else {
                        window.location.href = `/auth/signin?error=CredentialsSignin`;
                      }
                      setIsLoading(false);
                    }}
                    disabled={isLoading}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-purple-500/20 border border-purple-500/40 rounded-lg text-purple-400">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">Test Educator</div>
                        <div className="text-[10px] text-slate-400">Faculty Portal</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-700/60" />
                </div>
                <div className="relative flex justify-center text-[11px] uppercase tracking-wider font-semibold">
                  <span className="bg-[#001724] px-3 text-slate-400">
                    Or sign in with email
                  </span>
                </div>
              </div>

              {/* Credential Form */}
              <form onSubmit={handleCredentialSignIn} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold text-slate-300">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-cyan-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@eduplatform.edu"
                      className="pl-10 text-xs sm:text-sm bg-[#00121d] border-cyan-900/60 text-white placeholder:text-slate-500 focus:border-cyan-400 h-10 rounded-xl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-semibold text-slate-300">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-cyan-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 text-xs sm:text-sm bg-[#00121d] border-cyan-900/60 text-white placeholder:text-slate-500 focus:border-cyan-400 h-10 rounded-xl"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold text-xs sm:text-sm h-11 rounded-xl shadow-lg transition-all" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In to Portal"}
                </Button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center pt-2">
                <p className="text-xs text-slate-400">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/signup" className="text-cyan-300 hover:text-cyan-200 font-semibold underline underline-offset-2">
                    Create an account
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Features Highlight Card */}
          <div className="p-4 rounded-xl bg-[#001724]/70 border border-cyan-500/20 text-slate-300 text-xs space-y-2">
            <div className="font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>Sindh School of Technology Portal Features</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-cyan-400" />
                <span>AI Autograding</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-cyan-400" />
                <span>Academic Analytics</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-cyan-400" />
                <span>Gamified Badges</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-cyan-400" />
                <span>Plagiarism Guard</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 text-cyan-400 mx-auto mb-4 animate-pulse" />
          <p className="text-slate-400 text-sm">Loading SST Portal...</p>
        </div>
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}
