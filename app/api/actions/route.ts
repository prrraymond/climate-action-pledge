import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// Define proper types for the action and category
interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

interface Action {
  id: number;
  label: string;
  description: string;
  impact: string;
  impact_value: number;
  category_id: number;
  categories: Category;
}

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
    const actionsByCategory: Record<string, Action[]> = {}

    // Use proper typing for the action parameter
    data.forEach((action: Action) => {
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