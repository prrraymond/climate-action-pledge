"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type Stats = {
  activePledges: number
  totalUsers: number
  co2eSaved: number
  actionCategories: number
  error?: string
}

// Default fallback stats
const DEFAULT_STATS: Stats = {
  activePledges: 1250,
  totalUsers: 5000,
  co2eSaved: 7500,
  actionCategories: 6,
}

export function StatsDisplay() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchStats() {
      try {
        console.log("Fetching stats...")
        const response = await fetch("/api/stats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // Add cache: 'no-store' to prevent caching issues
          cache: "no-store",
        })

        // Log the response status
        console.log("Stats API response status:", response.status)

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`)
        }

        const data = await response.json()
        console.log("Stats data received:", data)

        if (isMounted) {
          setStats(data)
          // If there's an error message in the response, show it
          if (data.error) {
            setError(data.error)
          }
        }
      } catch (err) {
        console.error("Error fetching stats:", err)
        if (isMounted) {
          setError("Unable to load statistics")
          // Still set the default stats so UI doesn't break
          setStats(DEFAULT_STATS)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchStats()

    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false
    }
  }, [])

  // Even if there's an error, we'll show the stats (either from API or defaults)
  // Just add a small error indicator at the top if needed
  return (
    <div className="space-y-6">
      {error && <div className="text-amber-400 text-sm bg-amber-950/30 p-2 rounded-md mb-4">Note: {error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6 bg-white/5 rounded-lg">
          {loading ? (
            <Skeleton className="h-16 w-full bg-white/10" />
          ) : (
            <>
              <div className="text-emerald-400 text-4xl font-bold">{stats?.activePledges.toLocaleString()}+</div>
              <div className="text-white/80">Active Pledges</div>
            </>
          )}
        </Card>

        <Card className="p-6 bg-white/5 rounded-lg">
          {loading ? (
            <Skeleton className="h-16 w-full bg-white/10" />
          ) : (
            <>
              <div className="text-emerald-400 text-4xl font-bold">{stats?.co2eSaved.toLocaleString()}</div>
              <div className="text-white/80">Tons CO₂e Saved</div>
            </>
          )}
        </Card>

        <Card className="p-6 bg-white/5 rounded-lg">
          {loading ? (
            <Skeleton className="h-16 w-full bg-white/10" />
          ) : (
            <>
              <div className="text-emerald-400 text-4xl font-bold">{stats?.actionCategories}</div>
              <div className="text-white/80">Action Categories</div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}

