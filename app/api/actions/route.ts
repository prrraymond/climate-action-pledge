import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    // Get all actions with their categories
    const { data, error } = await supabase
      .from("actions")
      .select(`
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
      `)
      .order("id")

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Group actions by category
    const actionsByCategory: Record<string, any[]> = {}

    data.forEach((action) => {
      const categoryId = action.category_id
      if (!actionsByCategory[categoryId]) {
        actionsByCategory[categoryId] = []
      }
      actionsByCategory[categoryId].push(action)
    })

    return NextResponse.json({
      actions: data,
      actionsByCategory,
    })
  } catch (error: any) {
    console.error("Get actions error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
