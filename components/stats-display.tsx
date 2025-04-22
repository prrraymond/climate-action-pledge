"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

type Stats = {
  activePledges: number
  totalUsers: number
  co2eSaved: number
  actionCategories: number
}

export function StatsDisplay() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/stats")

        if (!response.ok) {
          throw new Error("Failed to fetch statistics")
        }

        const data = await response.json()
        setStats(data)
      } catch (err) {
        console.error("Error fetching stats:", err)
        setError("Unable to load statistics")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (error) {
    return <div className="text-center text-white/60">{error}</div>
  }

  return (
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
  )
}
