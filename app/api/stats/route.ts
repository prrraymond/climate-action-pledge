import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    // Get total number of active pledges
    const { count: pledgeCount, error: pledgeError } = await supabase
      .from("pledges")
      .select("*", { count: "exact", head: true })

    // Get total number of users
    const { count: userCount, error: userError } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })

    // Get total CO2e saved (based on completed pledges)
    const { data: completedPledges, error: completedError } = await supabase
      .from("pledges")
      .select(`
        actions (
          impact_value
        )
      `)
      .eq("completed", true)

    // Calculate total CO2e saved
    let totalCO2eSaved = 0
    if (completedPledges) {
      completedPledges.forEach((pledge) => {
        if (pledge.actions && Array.isArray(pledge.actions)) {
          pledge.actions.forEach((action: any) => {
            if (action.impact_value) {
              totalCO2eSaved += Number(action.impact_value)
            }
          })
        }
      })
    }

    // Get count of action categories
    const { data: categories, error: categoriesError } = await supabase
      .from("categories")
      .select("*", { count: "exact" })

    // Return the statistics
    return NextResponse.json({
      activePledges: pledgeCount || 0,
      totalUsers: userCount || 0,
      co2eSaved: Math.round(totalCO2eSaved / 1000), // Convert to tons
      actionCategories: categories?.length || 6,
      errors: {
        pledgeError: pledgeError?.message,
        userError: userError?.message,
        completedError: completedError?.message,
        categoriesError: categoriesError?.message,
      },
    })
  } catch (error: any) {
    console.error("Error fetching statistics:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
