import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
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

      if (profileError) {
        console.error("Error creating profile:", profileError)
        // We don't return an error here because the auth user was created successfully
      }
    }

    return NextResponse.json({
      message: "User created successfully",
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
