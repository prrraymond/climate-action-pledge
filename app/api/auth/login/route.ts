import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    // Get user profile
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

    // Ensure we return a consistent user object structure
    const userData = {
      id: data.user.id,
      email: data.user.email,
      name: profile?.name || data.user.user_metadata.name || email.split("@")[0],
    }

    console.log("Returning user data:", userData)

    return NextResponse.json({
      user: userData,
      session: data.session,
    })
  } catch (error: any) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
