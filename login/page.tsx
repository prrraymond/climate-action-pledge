"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const error = searchParams.get("error")

  const [email, setEmail] = useState("jane@example.com")
  const [password, setPassword] = useState("password123")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(error)
  const [loginSuccess, setLoginSuccess] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (session) {
      router.push(callbackUrl)
    }
  }, [session, router, callbackUrl])

  // Handle login with NextAuth
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg(null)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setErrorMsg(result.error)
        setIsLoading(false)
        return
      }

      setLoginSuccess(true)

      // Redirect after a short delay
      setTimeout(() => {
        router.push(callbackUrl)
      }, 1500)
    } catch (error) {
      console.error("Login error:", error)
      setErrorMsg("An unexpected error occurred")
      setIsLoading(false)
    }
  }

  // Test API connection
  const testApiConnection = async () => {
    try {
      const response = await fetch("/api/test")
      const data = await response.json()
      alert(`API test result: ${data.message}`)
    } catch (error) {
      console.error("API test error:", error)
      alert(`API test failed: ${error}`)
    }
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
          <CardContent className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-md flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <span>{errorMsg}</span>
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

            <Button type="button" onClick={testApiConnection} className="w-full bg-blue-600 hover:bg-blue-700">
              Test API Connection
            </Button>

            {/* Manual redirect button (shown only after successful login) */}
            {loginSuccess && (
              <Button
                type="button"
                onClick={() => router.push(callbackUrl)}
                className="w-full bg-amber-500 hover:bg-amber-600 mt-4"
              >
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
      </main>
    </div>
  )
}
