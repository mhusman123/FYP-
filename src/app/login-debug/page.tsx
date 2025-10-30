"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginDebug() {
  const [email, setEmail] = useState("usama@codecross.co");
  const [password, setPassword] = useState("password123");
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
    console.log(message);
  };

  const testLogin = async () => {
    setIsLoading(true);
    setLogs([]);
    
    addLog("🔐 Starting login test...");
    addLog(`📧 Email: ${email}`);
    addLog(`🔑 Password: ${password.substring(0, 3)}***`);
    
    try {
      addLog("📡 Calling signIn...");
      
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      
      addLog(`📦 SignIn result received:`);
      addLog(`   - ok: ${result?.ok}`);
      addLog(`   - status: ${result?.status}`);
      addLog(`   - error: ${result?.error || "none"}`);
      addLog(`   - url: ${result?.url || "none"}`);
      
      if (result?.ok) {
        addLog("✅ LOGIN SUCCESS!");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } else {
        addLog(`❌ LOGIN FAILED: ${result?.error || "Unknown error"}`);
      }
      
    } catch (error) {
      addLog(`💥 Exception: ${error}`);
      console.error("Full error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">🔍 Login Debug Tool</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            
            <Button 
              onClick={testLogin} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Testing..." : "Test Login"}
            </Button>
          </CardContent>
        </Card>

        {logs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Debug Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm space-y-1 max-h-96 overflow-auto">
                {logs.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
