import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
    }

    console.log("Starting signup process with email:", email)

    // Get the base URL from environment variable or default to localhost
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    const redirectTo = `${baseUrl}/auth/verification-success`

    console.log("Using redirect URL:", redirectTo)

    // Create user in Supabase Auth with explicit redirect
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
        emailRedirectTo: redirectTo,
      },
    })

    console.log("Auth signup response:", {
      user: authData.user ? { id: authData.user.id, email: authData.user.email } : null,
      error: authError,
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    // Create profile record
    if (authData.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        name,
      })

      console.log("Profile creation response:", {
        userId: authData.user?.id,
        profileError: profileError ? { message: profileError.message, code: profileError.code } : null,
      })

      if (profileError) {
        console.error("Error creating profile:", profileError)
        // We don't return an error here because the auth user was created successfully
      }
    }

    // Return information about email confirmation status
    return NextResponse.json({
      message: "User created successfully",
      emailConfirmationRequired: true,
      user: {
        id: authData.user?.id,
        email: authData.user?.email,
        name,
      },
    })
  } catch (error: any) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

