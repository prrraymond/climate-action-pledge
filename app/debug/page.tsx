"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugPage() {
  const [userData, setUserData] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user")
      setUserData(user)
    }
  }, [])

  const clearStorage = () => {
    if (typeof window !== "undefined") {
      localStorage.clear()
      setUserData(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 flex flex-col">
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-medium">
          Climate Pledge
        </Link>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <Card className="bg-white/5 border-white/10 text-white max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h2 className="text-lg font-medium mb-2">User Data in localStorage:</h2>
              <pre className="bg-white/10 p-4 rounded overflow-auto max-h-60">
                {userData ? JSON.stringify(JSON.parse(userData), null, 2) : "No user data found"}
              </pre>
            </div>

            <div className="flex gap-4 pt-4">
              <Button onClick={clearStorage} variant="destructive">
                Clear localStorage
              </Button>
              <Button asChild>
                <Link href="/login">Go to Login</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard-new">Go to New Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
