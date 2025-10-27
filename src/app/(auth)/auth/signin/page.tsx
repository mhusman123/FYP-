"use client";

import { signIn, getProviders } from "next-auth/react";
import { useEffect, useState, Suspense } from "react";
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
  Lock
} from "lucide-react";
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
      await signIn("credentials", {
        email,
        password,
        callbackUrl
      });
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
      case "CredentialsSignin":
        return "Sign in failed. Check your credentials.";
      case "SessionRequired":
        return "Please sign in to access this page.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            EduPlatform
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 pb-12">
        <div className="w-full max-w-md space-y-8">
          {/* Welcome Card */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
              <CardDescription className="text-base">
                Sign in to access your educational dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{getErrorMessage(error)}</AlertDescription>
                </Alert>
              )}

              {/* Quick Access Section */}
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-2 text-sm font-medium text-blue-600 mb-2">
                    🎓 Test Accounts Available
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <Button
                    variant="outline"
                    className="w-full h-12 text-left justify-start"
                    onClick={() => signIn("credentials", { 
                      email: "student@eduplatform.edu",
                      password: "password",
                      callbackUrl
                    })}
                    disabled={isLoading}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <GraduationCap className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Test Student</div>
                        <div className="text-xs text-gray-500">Student account features</div>
                      </div>
                    </div>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full h-12 text-left justify-start"
                    onClick={() => signIn("credentials", { 
                      email: "educator@eduplatform.edu",
                      password: "password",
                      callbackUrl
                    })}
                    disabled={isLoading}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <User className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">Test Educator</div>
                        <div className="text-xs text-gray-500">Educator account features</div>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or sign in with your account
                  </span>
                </div>
              </div>

              {/* Credential Form */}
              <form onSubmit={handleCredentialSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link href="#" className="text-primary hover:text-primary/80">
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              {/* OAuth Providers */}
              {providers && Object.values(providers).filter((provider) => provider.id !== "credentials").length > 0 && (
                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {Object.values(providers)
                      .filter((provider) => provider.id !== "credentials")
                      .map((provider) => (
                        <Button
                          key={provider.name}
                          variant="outline"
                          className="w-full"
                          onClick={() => signIn(provider.id, { callbackUrl })}
                          disabled={isLoading}
                        >
                          {provider.name === "Google" && <Mail className="mr-2 h-4 w-4" />}
                          {provider.name === "GitHub" && <Github className="mr-2 h-4 w-4" />}
                          Continue with {provider.name}
                        </Button>
                      ))}
                  </div>
                </div>
              )}

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/signup" className="text-primary hover:text-primary/80 font-medium">
                    Sign up for free
                  </Link>
                </p>
              </div>

              {/* Terms */}
              <div className="text-xs text-center text-muted-foreground">
                By signing in, you agree to our{" "}
                <Link href="#" className="hover:text-primary">Terms of Service</Link>
                {" "}and{" "}
                <Link href="#" className="hover:text-primary">Privacy Policy</Link>.
              </div>
            </CardContent>
          </Card>

          {/* Features Highlight */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <h3 className="font-semibold text-gray-900">Why Choose EduPlatform?</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-600">AI-powered autograding system</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Comprehensive analytics dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Gamification & achievement system</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Advanced plagiarism detection</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}
