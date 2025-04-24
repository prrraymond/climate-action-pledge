import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// PATCH endpoint to moderate a photo
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { photo_id, status, featured = false, rejection_reason, moderator_id } = body

    if (!photo_id || !status || !moderator_id) {
      return NextResponse.json({ error: "Photo ID, status, and moderator ID are required" }, { status: 400 })
    }

    // Check if the user is an admin - using a direct query instead of a join
    // to avoid the recursion issue
    const { data: roleData, error: roleError } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", moderator_id)
      .single()

    if (roleError || !roleData || roleData.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized: Only admins can moderate photos" }, { status: 403 })
    }

    // Update the photo status
    const { data, error } = await supabase
      .from("photos")
      .update({
        status,
        featured: status === "approved" ? featured : false,
        moderated_at: new Date().toISOString(),
        moderated_by: moderator_id,
        rejection_reason: status === "rejected" ? rejection_reason : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", photo_id)
      .select()

    if (error) {
      console.error("Error moderating photo:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      photo: data[0],
      message: `Photo ${status === "approved" ? "approved" : "rejected"}`,
    })
  } catch (error: any) {
    console.error("Error in PATCH /api/photos/moderate:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
