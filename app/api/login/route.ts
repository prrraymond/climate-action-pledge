import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // In a real app, you would validate credentials against a database
    // For demo purposes, we'll accept any credentials
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Simulate a delay like a real API call would have
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Return a successful response with user data
    return NextResponse.json({
      user: {
        id: "1",
        name: "Jane Smith",
        email: email,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
