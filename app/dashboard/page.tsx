"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Share2, LogOut, Leaf, BarChart, Trophy } from "lucide-react"
import { ShareModal } from "@/components/share-modal"
import { Progress } from "@/components/ui/progress"

type User = {
  id: string
  name: string
  email: string
}

// Define pledge category type
type PledgeCategory = {
  id: string
  name: string
  actions: {
    id: string
    label: string
    completed: boolean
  }[]
  selectedCount: number
  totalCount: number
}

// Define impact values for each action
const actionImpactValues: Record<string, number> = {
  // Energy actions
  "energy-1": 1500, // Switch to renewable energy provider
  "energy-2": 100, // Install LED light bulbs
  "energy-3": 100, // Unplug electronics
  "energy-4": 300, // Reduce heating

  // Transportation actions
  "transport-1": 300, // Use public transportation
  "transport-2": 500, // Carpool
  "transport-3": 100, // Maintain tire pressure
  "transport-4": 200, // Walk or bike for short trips

  // Food actions
  "food-1": 300, // Plant-based meals
  "food-2": 150, // Reduce food waste
  "food-3": 100, // Buy local produce
  "food-4": 100, // Compost food scraps

  // Water actions
  "water-1": 100, // Shorter showers
  "water-2": 50, // Fix leaks
  "water-3": 100, // Water-efficient fixtures
  "water-4": 50, // Collect rainwater

  // Consumption actions
  "consumption-1": 10, // Reusable bags
  "consumption-2": 100, // Buy second-hand
  "consumption-3": 100, // Repair instead of replace
  "consumption-4": 50, // Minimal packaging

  // Advocacy actions
  "advocacy-1": 50, // Talk to friends/family
  "advocacy-2": 50, // Support climate-friendly businesses
  "advocacy-3": 100, // Contact elected officials
  "advocacy-4": 50, // Share on social media
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [pledgeCategories, setPledgeCategories] = useState<PledgeCategory[]>([])
  const [totalSelected, setTotalSelected] = useState(0)
  const [totalActions, setTotalActions] = useState(0)
  const [carbonReduction, setCarbonReduction] = useState(0)
  const [treesEquivalent, setTreesEquivalent] = useState(0)
  const [averageImpact, setAverageImpact] = useState(0)
  const [userRank, setUserRank] = useState(0)
  const [communityUsers, setCommunityUsers] = useState(0)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  // New state for share modal
  const [shareModalOpen, setShareModalOpen] = useState(false)

  // Calculate trees equivalent (roughly 20kg CO2 per tree per year)
  const calculateTreesEquivalent = (kgCO2: number) => Math.round(kgCO2 / 20)

  // Calculate user's rank based on their carbon reduction
  const calculateUserRank = (reduction: number) => {
    // Simulate a distribution of users and their reductions
    if (reduction > 500) return 5 // Top 5%
    if (reduction > 300) return 15 // Top 15%
    if (reduction > 200) return 25 // Top 25%
    if (reduction > 100) return 40 // Top 40%
    return 60 // Top 60%
  }

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  useEffect(() => {
    // Get user data from localStorage
    const getUserData = () => {
      try {
        const userData = localStorage.getItem("user")
        if (userData) {
          const parsedUser = JSON.parse(userData)
          console.log("Retrieved user data:", parsedUser) // Add this for debugging
          setUser(parsedUser)
        } else {
          // Redirect to login if no user data found
          window.location.href = "/login"
        }
      } catch (error) {
        console.error("Error getting user data:", error)
      }
    }

    // Get pledge data from localStorage
    const getPledgeData = () => {
      try {
        const selectedPledges = localStorage.getItem("selectedPledges")
        console.log("Retrieved pledges from localStorage:", selectedPledges)

        const selectedPledgeIds: string[] = selectedPledges ? JSON.parse(selectedPledges) : []

        // Define categories with detailed action information
        const categories = [
          {
            id: "energy",
            name: "Energy",
            actions: [
              {
                id: "energy-1",
                label: "Switch to renewable energy provider",
                completed: selectedPledgeIds.includes("energy-1"),
              },
              {
                id: "energy-2",
                label: "Install LED light bulbs throughout home",
                completed: selectedPledgeIds.includes("energy-2"),
              },
              {
                id: "energy-3",
                label: "Unplug electronics when not in use",
                completed: selectedPledgeIds.includes("energy-3"),
              },
              {
                id: "energy-4",
                label: "Reduce heating by 2 degrees in winter",
                completed: selectedPledgeIds.includes("energy-4"),
              },
            ],
          },
          {
            id: "transport",
            name: "Transportation",
            actions: [
              {
                id: "transport-1",
                label: "Use public transportation once a week",
                completed: selectedPledgeIds.includes("transport-1"),
              },
              {
                id: "transport-2",
                label: "Carpool to work/school",
                completed: selectedPledgeIds.includes("transport-2"),
              },
              {
                id: "transport-3",
                label: "Maintain proper tire pressure",
                completed: selectedPledgeIds.includes("transport-3"),
              },
              {
                id: "transport-4",
                label: "Walk or bike for trips under 2 miles",
                completed: selectedPledgeIds.includes("transport-4"),
              },
            ],
          },
          {
            id: "food",
            name: "Food",
            actions: [
              {
                id: "food-1",
                label: "Eat plant-based meals 2 days per week",
                completed: selectedPledgeIds.includes("food-1"),
              },
              {
                id: "food-2",
                label: "Reduce food waste by meal planning",
                completed: selectedPledgeIds.includes("food-2"),
              },
              { id: "food-3", label: "Buy local, seasonal produce", completed: selectedPledgeIds.includes("food-3") },
              { id: "food-4", label: "Compost food scraps", completed: selectedPledgeIds.includes("food-4") },
            ],
          },
          {
            id: "water",
            name: "Water",
            actions: [
              {
                id: "water-1",
                label: "Take shorter showers (under 5 minutes)",
                completed: selectedPledgeIds.includes("water-1"),
              },
              { id: "water-2", label: "Fix leaky faucets and pipes", completed: selectedPledgeIds.includes("water-2") },
              {
                id: "water-3",
                label: "Install water-efficient fixtures",
                completed: selectedPledgeIds.includes("water-3"),
              },
              {
                id: "water-4",
                label: "Collect rainwater for plants",
                completed: selectedPledgeIds.includes("water-4"),
              },
            ],
          },
          {
            id: "consumption",
            name: "Consumption",
            actions: [
              {
                id: "consumption-1",
                label: "Bring reusable bags for shopping",
                completed: selectedPledgeIds.includes("consumption-1"),
              },
              {
                id: "consumption-2",
                label: "Buy second-hand items when possible",
                completed: selectedPledgeIds.includes("consumption-2"),
              },
              {
                id: "consumption-3",
                label: "Repair instead of replace",
                completed: selectedPledgeIds.includes("consumption-3"),
              },
              {
                id: "consumption-4",
                label: "Choose products with minimal packaging",
                completed: selectedPledgeIds.includes("consumption-4"),
              },
            ],
          },
          {
            id: "advocacy",
            name: "Advocacy",
            actions: [
              {
                id: "advocacy-1",
                label: "Talk to friends and family about climate action",
                completed: selectedPledgeIds.includes("advocacy-1"),
              },
              {
                id: "advocacy-2",
                label: "Support climate-friendly businesses",
                completed: selectedPledgeIds.includes("advocacy-2"),
              },
              {
                id: "advocacy-3",
                label: "Contact elected officials about climate policies",
                completed: selectedPledgeIds.includes("advocacy-3"),
              },
              {
                id: "advocacy-4",
                label: "Share your climate journey on social media",
                completed: selectedPledgeIds.includes("advocacy-4"),
              },
            ],
          },
        ]

        // Calculate selected counts for each category
        const categoriesWithCounts = categories.map((category) => {
          const selectedCount = category.actions.filter((action) => action.completed).length
          return {
            ...category,
            selectedCount,
            totalCount: category.actions.length,
          }
        })

        setPledgeCategories(categoriesWithCounts)

        // Calculate totals
        const totalSelectedCount = categoriesWithCounts.reduce((sum, cat) => sum + cat.selectedCount, 0)
        const totalActionsCount = categoriesWithCounts.reduce((sum, cat) => sum + cat.totalCount, 0)

        console.log("Total selected pledges:", totalSelectedCount)
        setTotalSelected(totalSelectedCount)
        setTotalActions(totalActionsCount)

        // Calculate carbon reduction based on selected pledges
        let totalReduction = 0
        selectedPledgeIds.forEach((pledgeId: string) => {
          if (actionImpactValues[pledgeId]) {
            totalReduction += actionImpactValues[pledgeId]
          }
        })

        setCarbonReduction(totalReduction)
        setTreesEquivalent(calculateTreesEquivalent(totalReduction))

        // Set average impact (simulated data)
        setAverageImpact(185) // Average user impact in kg CO2e

        // Calculate user rank
        setUserRank(calculateUserRank(totalReduction))

        // Simulate community data
        setCommunityUsers(12453) // Fixed value for now
      } catch (error) {
        console.error("Error getting pledge data:", error)
      } finally {
        setLoading(false)
      }
    }

    getUserData()
    getPledgeData()
  }, [])

  const handleSignOut = () => {
    try {
      localStorage.removeItem("user")
      window.location.href = "/"
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 flex items-center justify-center">
        <div className="text-white">Loading your dashboard...</div>
      </div>
    )
  }

  // Get user initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "?"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900">
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-medium">
          Climate Pledge
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            <Link href="/pledge">My Pledges</Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-medium">
              {user ? getInitials(user.name) : "?"}
            </div>
            <span className="text-white">{user ? user.name : "Guest"}</span>
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Your Climate Impact</h1>
              <p className="text-white/80 mt-2">Track your progress and see your positive impact</p>
            </div>
            <div className="flex gap-2">
              {/* Share My Impact button with proper styling */}
              <Button
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10"
                onClick={() => setShareModalOpen(true)}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share My Impact
              </Button>

              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                <Link href="/actions">Update Pledges</Link>
              </Button>
            </div>
          </div>

          {/* Share Modal */}
          <ShareModal
            open={shareModalOpen}
            onOpenChange={setShareModalOpen}
            impactData={{
              carbonReduction,
              treesEquivalent,
              rank: `Top ${userRank}%`,
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader className="pb-2">
                <CardDescription className="text-white/60">Your Carbon Reduction</CardDescription>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-emerald-400" />
                  <span>{carbonReduction} kg CO₂e</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-white/60">Equivalent to planting {treesEquivalent} trees</div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader className="pb-2">
                <CardDescription className="text-white/60">Average User Impact</CardDescription>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-emerald-400" />
                  <span>{averageImpact} kg CO₂e</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-white/60">
                  {carbonReduction > averageImpact
                    ? `You're ${Math.round((carbonReduction / averageImpact - 1) * 100)}% above average!`
                    : `${Math.round((1 - carbonReduction / averageImpact) * 100)}% below community average`}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader className="pb-2">
                <CardDescription className="text-white/60">Community Rank</CardDescription>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-emerald-400" />
                  <span>Top {userRank}%</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-white/60">Among {communityUsers.toLocaleString()} active pledgers</div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Your Pledged Actions</h2>
            <div className="space-y-6">
              {pledgeCategories.map((category) => {
                const isExpanded = expandedCategories.includes(category.id)
                const progressPercentage = (category.selectedCount / category.totalCount) * 100

                return (
                  <Card key={category.id} className="bg-white/5 border-white/10 text-white [&>div]:py-3">
                    <CardHeader className="cursor-pointer py-4" onClick={() => toggleCategory(category.id)}>
                      <div className="flex justify-between items-center mb-2">
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <div className="text-sm text-white/60">
                          {category.selectedCount}/{category.totalCount} actions
                        </div>
                      </div>
                      <Progress
                        value={progressPercentage}
                        className="h-2 bg-white/10"
                        indicatorClassName="bg-emerald-500"
                      />
                    </CardHeader>
                    {isExpanded && (
                      <CardContent>
                        <ul className="space-y-2">
                          {category.actions.map((action) => (
                            <li key={action.id} className="flex items-center gap-2">
                              <div
                                className={`w-4 h-4 rounded-full ${
                                  action.completed ? "bg-emerald-500" : "bg-white/20"
                                }`}
                              ></div>
                              <span className={action.completed ? "text-white" : "text-white/60"}>{action.label}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    )}
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Impact Over Time</h2>
            <Card className="bg-white/5 border-white/10 text-white">
              <CardContent className="p-6">
                <div className="h-[300px] flex items-center justify-center">
                  <BarChart className="h-16 w-16 text-white/40" />
                  <div className="ml-4 text-white/60">Impact visualization would appear here</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Suggested Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10 text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">Reduce Food Waste</h3>
                  <p className="text-white/80 mb-4">
                    Plan your meals and store food properly to reduce waste. Food waste in landfills produces methane, a
                    potent greenhouse gas.
                  </p>
                  <div className="text-sm text-emerald-400">Potential impact: 150 kg CO₂e/year</div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10 text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-2">Install a Smart Thermostat</h3>
                  <p className="text-white/80 mb-4">
                    Smart thermostats can reduce your heating and cooling energy use by automatically adjusting
                    temperatures when you're away or asleep.
                  </p>
                  <div className="text-sm text-emerald-400">Potential impact: 250 kg CO₂e/year</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white">
              <Link href="/actions">Discover More Actions</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}







