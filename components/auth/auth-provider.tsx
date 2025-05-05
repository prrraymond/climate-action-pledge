"use client"

import { createContext, useEffect, useState, type ReactNode } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { User } from "@supabase/supabase-js"

// Define the type for the auth context
type AuthContextType = {
  user: User | null
  loading: boolean
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | null>(null)

// Define the props type for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode
}

// Update your auth provider to configure redirects
export function AuthProvider({ children }: AuthProviderProps) {
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Configure auth redirects
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

