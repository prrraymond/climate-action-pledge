"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LogOut, User } from 'lucide-react'

export function SignInButton() {
  const { data: session } = useSession()

  if (session?.user) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-medium">
          {session.user.name?.charAt(0) || "U"}
        </div>
        <span className="text-white hidden md:inline">{session.user.name}</span>
      </div>
    )
  }

  return (
    <Button asChild variant="outline" className="bg-white/10 text-white hover:bg-white/20">
      <Link href="/login">Sign In</Link>
    </Button>
  )
}

export function SignOutButton() {
  return (
    <Button 
      variant="ghost" 
      className="text-white hover:bg-white/10"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <LogOut className="h-4 w-4 mr-2" />
      Sign Out
    </Button>
  )
}

export function UserButton() {
  const { data: session } = useSession()

  if (!session?.user) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-medium">
        {session.user.name?.charAt(0) || "U"}
      </div>
    </div>
  )
}
