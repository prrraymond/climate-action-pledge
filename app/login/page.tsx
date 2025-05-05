"use client"

import type React from "react"

import { useState, Suspense, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, ArrowRight } from "lucide-react"

// Temporary login form without auth context
function LoginForm() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("jane@example.com")
  const [password, setPassword] = useState("password123")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loginSuccess, setLoginSuccess] = useState(false)

  // Get the callback URL from the query parameters
  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard"

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Use the actual API endpoint instead of simulating
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Login failed")
      }

      const data = await response.json()
      console.log("Login successful:", data)

      // Store user data in localStorage with proper structure
      if (typeof window !== "undefined") {
        // Make sure we're storing the user object with the correct structure
        const userData = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
        }
        console.log("Storing user data:", userData)
        localStorage.setItem("user", JSON.stringify(userData))
      }

      setLoginSuccess(true)

      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = callbackUrl.startsWith("/") ? callbackUrl : "/dashboard"
      }, 1500)
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message || "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    const checkUser = () => {
      if (typeof window !== "undefined") {
        const user = localStorage.getItem("user")
        if (user) {
          window.location.href = "/dashboard"
        }
      }
    }

    checkUser()
  }, [])

  const handleManualRedirect = () => {
    // Use direct window.location for more reliable redirection
    window.location.href = callbackUrl.startsWith("/") ? callbackUrl : "/dashboard"
  }

  return (
    <Card className="w-full max-w-md bg-white/5 border-white/10 text-white">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription className="text-white/60">Sign in to continue your climate journey</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-md flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {loginSuccess && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-md flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <span>Login successful! Redirecting to dashboard...</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/10 border-white/20"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600"
            disabled={isLoading || loginSuccess}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {loginSuccess && (
          <Button type="button" onClick={handleManualRedirect} className="w-full bg-amber-500 hover:bg-amber-600 mt-4">
            Go to Dashboard Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 border-t border-white/10 pt-6">
        <div className="text-sm text-white/60 text-center">
          Don't have an account yet?{" "}
          <Link href="/register" className="text-emerald-400 hover:text-emerald-300">
            Create an account
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

// Loading fallback component
function LoginFormSkeleton() {
  return (
    <Card className="w-full max-w-md bg-white/5 border-white/10 text-white">
      <CardHeader>
        <div className="h-7 w-40 bg-white/10 rounded animate-pulse"></div>
        <div className="h-5 w-60 bg-white/10 rounded animate-pulse mt-2"></div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="h-5 w-20 bg-white/10 rounded animate-pulse"></div>
          <div className="h-10 w-full bg-white/10 rounded animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-5 w-20 bg-white/10 rounded animate-pulse"></div>
          <div className="h-10 w-full bg-white/10 rounded animate-pulse"></div>
        </div>
        <div className="h-10 w-full bg-white/10 rounded animate-pulse"></div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 border-t border-white/10 pt-6">
        <div className="h-5 w-48 bg-white/10 rounded animate-pulse mx-auto"></div>
      </CardFooter>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 flex flex-col">
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-medium">
          Climate Pledge
        </Link>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <Suspense fallback={<LoginFormSkeleton />}>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  )
}

