"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VerificationSuccessPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push("/dashboard")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="container flex h-screen flex-col items-center justify-center">
      <div className="mx-auto flex max-w-md flex-col items-center space-y-6 text-center">
        <div className="rounded-full bg-emerald-100 p-3">
          <CheckCircle className="h-12 w-12 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold">Email Verified!</h1>
        <p className="text-muted-foreground">
          Your email has been successfully verified. You can now access all features of Climate Pledge.
        </p>
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-muted-foreground">Redirecting to dashboard in {countdown} seconds...</p>
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

