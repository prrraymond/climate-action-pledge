// app/api/auth/[...nextauth]/route.ts
import { NextResponse } from "next/server";

// Valid route handlers
export async function GET() {
  return NextResponse.json({ message: "Auth endpoint not in use" }, { status: 404 });
}

export async function POST() {
  return NextResponse.json({ message: "Auth endpoint not in use" }, { status: 404 });
}