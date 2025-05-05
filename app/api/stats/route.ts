import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// Fallback stats to use when the database can't be reached
const FALLBACK_STATS = {
  activePledges: 1250,
  totalUsers: 5000,
  co2eSaved: 7500,
  actionCategories: 6,
}

export async function GET() {
  console.log("Stats API called")

  try {
    // Check if Supabase connection is working
    try {
      const { data, error: connectionError } = await supabase.from("pledges").select("id").limit(1)

      if (connectionError) {
        console.error("Supabase connection error:", connectionError)
        return NextResponse.json({
          ...FALLBACK_STATS,
          error: "Database connection error, showing fallback data",
        })
      }

      console.log("Supabase connection successful, found data:", !!data)
    } catch (connErr) {
      console.error("Connection test error:", connErr)
      return NextResponse.json({
        ...FALLBACK_STATS,
        error: "Database connection test failed, showing fallback data",
      })
    }

    // Initialize with fallback values
    const stats = { ...FALLBACK_STATS }

    // Get total number of active pledges
    try {
      const { count, error } = await supabase.from("pledges").select("*", { count: "exact" })

      if (!error && count !== null) {
        stats.activePledges = count
      }
    } catch (err) {
      console.error("Error fetching pledges:", err)
    }

    // Get total number of users
    try {
      const { count, error } = await supabase.from("profiles").select("*", { count: "exact" })

      if (!error && count !== null) {
        stats.totalUsers = count
      }
    } catch (err) {
      console.error("Error fetching users:", err)
    }

    // Get count of action categories
    try {
      const { data, error } = await supabase.from("categories").select("id")

      if (!error && data) {
        stats.actionCategories = data.length || stats.actionCategories
      }
    } catch (err) {
      console.error("Error fetching categories:", err)
    }

    // Calculate CO2e saved
    try {
      const { count, error } = await supabase.from("pledges").select("*", { count: "exact" }).eq("completed", true)

      if (!error && count !== null) {
        stats.co2eSaved = Math.round(count * 150)
      }
    } catch (err) {
      console.error("Error calculating CO2e:", err)
    }

    console.log("Returning stats:", stats)
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Unhandled error in stats API:", error)

    return NextResponse.json({
      ...FALLBACK_STATS,
      error: "Error fetching statistics, showing fallback data",
    })
  }
}
