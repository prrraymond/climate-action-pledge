import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Get user's pledges with action details
    const { data, error } = await supabase
      .from("pledges")
      .select(`
        id,
        completed,
        completed_at,
        created_at,
        actions (
          id,
          label,
          description,
          impact,
          impact_value,
          category_id,
          categories (
            id,
            name,
            description,
            icon
          )
        )
      `)
      .eq("user_id", userId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ pledges: data })
  } catch (error: any) {
    console.error("Get pledges error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, actionId, completed = false } = body

    if (!userId || !actionId) {
      return NextResponse.json({ error: "User ID and action ID are required" }, { status: 400 })
    }

    // Check if pledge already exists
    const { data: existingPledge } = await supabase
      .from("pledges")
      .select("*")
      .eq("user_id", userId)
      .eq("action_id", actionId)
      .maybeSingle()

    if (existingPledge) {
      // Update existing pledge
      const { data, error } = await supabase
        .from("pledges")
        .update({
          completed,
          completed_at: completed ? new Date().toISOString() : null,
        })
        .eq("id", existingPledge.id)
        .select()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ pledge: data[0] })
    } else {
      // Create new pledge
      const { data, error } = await supabase
        .from("pledges")
        .insert({
          user_id: userId,
          action_id: actionId,
          completed,
          completed_at: completed ? new Date().toISOString() : null,
        })
        .select()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ pledge: data[0] })
    }
  } catch (error: any) {
    console.error("Create/update pledge error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
