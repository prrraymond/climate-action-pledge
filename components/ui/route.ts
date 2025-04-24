import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// GET endpoint to fetch photos based on query parameters
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const status = url.searchParams.get("status") || "approved" // Default to approved photos
    const featured = url.searchParams.get("featured") === "true"
    const userId = url.searchParams.get("userId")
    const limit = Number.parseInt(url.searchParams.get("limit") || "12", 10)

    // Simplify the query to avoid policy recursion
    let query = supabase.from("photos").select("*").order("created_at", { ascending: false }).limit(limit)

    // Apply filters
    if (status !== "all") {
      query = query.eq("status", status)
    }

    if (featured) {
      query = query.eq("featured", true)
    }

    if (userId) {
      query = query.eq("user_id", userId)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching photos:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ photos: data })
  } catch (error: any) {
    console.error("Error in GET /api/photos:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

// POST endpoint to submit a new photo
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { image_url, caption, location, user_id } = body

    if (!image_url || !user_id) {
      return NextResponse.json({ error: "Image URL and user ID are required" }, { status: 400 })
    }

    // Insert the new photo with pending status
    const { data, error } = await supabase
      .from("photos")
      .insert({
        image_url,
        caption,
        location,
        user_id,
        status: "pending",
      })
      .select()

    if (error) {
      console.error("Error submitting photo:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ photo: data[0], message: "Photo submitted for moderation" })
  } catch (error: any) {
    console.error("Error in POST /api/photos:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
