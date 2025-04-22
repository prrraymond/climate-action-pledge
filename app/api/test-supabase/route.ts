import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    // We'll just check if we can connect to Supabase
    // This query will likely fail if the table doesn't exist, but the connection should work
    const { data, error } = await supabase.from("profiles").select("*").limit(1).maybeSingle()

    // Even if the query fails due to missing table, we can still check if the connection works
    return NextResponse.json({
      message: "Supabase connection attempt completed",
      connectionSuccessful: !error || error.code !== "PGRST301", // This error would indicate connection works but table doesn't exist
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      error: error
        ? {
            message: error.message,
            code: error.code,
            details: error.details,
          }
        : null,
    })
  } catch (error: any) {
    console.error("Supabase test error:", error)
    return NextResponse.json(
      {
        error: "Failed to connect to Supabase",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
