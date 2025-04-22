"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // In a real implementation, this would authenticate with your backend
    // For now, we'll simulate a login and redirect to the dashboard
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 flex flex-col">
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-medium">
          Climate Pledge
        </Link>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription className="text-white/60">Sign in to continue your climate journey</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-emerald-400 hover:text-emerald-300">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" className="border-white/30 data-[state=checked]:bg-emerald-500" />
                <Label htmlFor="remember" className="text-white text-sm">
                  Remember me for 30 days
                </Label>
              </div>
              <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </CardContent>
          </form>
          <CardFooter className="flex flex-col space-y-4 border-t border-white/10 pt-6">
            <div className="text-sm text-white/60 text-center">
              Don't have an account yet?{" "}
              <Link href="/register" className="text-emerald-400 hover:text-emerald-300">
                Create an account
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
