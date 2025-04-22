import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function GET() {
  try {
    const password = "password123"
    const saltRounds = 10
    
    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds)
    
    // Hash the password with the salt
    const hash = await bcrypt.hash(password, salt)
    
    // Test the hash
    const isMatch = await bcrypt.compare(password, hash)
    
    return NextResponse.json({
      password,
      hash,
      isMatch,
      message: "Password hash generated successfully"
    })
  } catch (error) {
    console.error("Hash generation error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
