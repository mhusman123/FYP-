"use client";

import { signIn, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GraduationCap, Github, Mail } from "lucide-react";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import type { BuiltInProviderType } from "next-auth/providers/index";

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to EduPlatform</CardTitle>
          <CardDescription>
            Sign in to access your educational dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Demo Accounts */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Quick Demo Access</Label>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => signIn("credentials", { 
                  email: "student@demo.edu",
                  callbackUrl: "/dashboard"
                })}
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                Demo Student Account
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => signIn("credentials", { 
                  email: "educator@demo.edu",
                  callbackUrl: "/dashboard"
                })}
              >
                <Mail className="mr-2 h-4 w-4" />
                Demo Educator Account
              </Button>
            </div>
          </div>

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

          {/* OAuth Providers */}
          <div className="space-y-2">
            {providers &&
              Object.values(providers)
                .filter((provider) => provider.id !== "credentials")
                .map((provider) => (
                  <Button
                    key={provider.name}
                    variant="outline"
                    className="w-full"
                    onClick={() => signIn(provider.id, { callbackUrl: "/dashboard" })}
                  >
                    {provider.name === "Google" && <Mail className="mr-2 h-4 w-4" />}
                    {provider.name === "GitHub" && <Github className="mr-2 h-4 w-4" />}
                    Continue with {provider.name}
                  </Button>
                ))}
          </div>

          <div className="text-xs text-center text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}