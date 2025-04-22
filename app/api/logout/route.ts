// app/api/logout/route.ts
import { NextResponse } from "next/server"

export async function POST() {
  // In a real app, you would invalidate the session on the server
  return NextResponse.json({ success: true })
}
