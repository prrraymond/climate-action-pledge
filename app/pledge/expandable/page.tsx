"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Leaf,
  Droplet,
  Car,
  ShoppingBag,
  Home,
  Utensils,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  LogOut,
} from "lucide-react"
import Link from "next/link"

// These would come from your database in a real app
const pledgeCategories = [
  {
    id: "energy",
    name: "Energy",
    icon: Home,
    description: "Reduce your home energy consumption",
    actions: [
      { id: "energy-1", label: "Switch to renewable energy provider" },
      { id: "energy-2", label: "Install LED light bulbs throughout home" },
      { id: "energy-3", label: "Unplug electronics when not in use" },
      { id: "energy-4", label: "Reduce heating by 2 degrees in winter" },
    ],
  },
  {
    id: "transport",
    name: "Transportation",
    icon: Car,
    description: "Lower your transportation carbon footprint",
    actions: [
      { id: "transport-1", label: "Use public transportation once a week" },
      { id: "transport-2", label: "Carpool to work/school" },
      { id: "transport-3", label: "Maintain proper tire pressure for fuel efficiency" },
      { id: "transport-4", label: "Walk or bike for trips under 2 miles" },
    ],
  },
  {
    id: "food",
    name: "Food",
    icon: Utensils,
    description: "Make climate-friendly food choices",
    actions: [
      { id: "food-1", label: "Eat plant-based meals 2 days per week" },
      { id: "food-2", label: "Reduce food waste by meal planning" },
      { id: "food-3", label: "Buy local, seasonal produce when possible" },
      { id: "food-4", label: "Compost food scraps" },
    ],
  },
  {
    id: "water",
    name: "Water",
    icon: Droplet,
    description: "Conserve water in your daily routine",
    actions: [
      { id: "water-1", label: "Take shorter showers (under 5 minutes)" },
      { id: "water-2", label: "Fix leaky faucets and pipes" },
      { id: "water-3", label: "Install water-efficient fixtures" },
      { id: "water-4", label: "Collect rainwater for plants" },
    ],
  },
  {
    id: "consumption",
    name: "Consumption",
    icon: ShoppingBag,
    description: "Shop and consume more sustainably",
    actions: [
      { id: "consumption-1", label: "Bring reusable bags for shopping" },
      { id: "consumption-2", label: "Buy second-hand items when possible" },
      { id: "consumption-3", label: "Repair instead of replace" },
      { id: "consumption-4", label: "Choose products with minimal packaging" },
    ],
  },
  {
    id: "advocacy",
    name: "Advocacy",
    icon: Leaf,
    description: "Spread awareness and advocate for change",
    actions: [
      { id: "advocacy-1", label: "Talk to friends and family about climate action" },
      { id: "advocacy-2", label: "Support climate-friendly businesses" },
      { id: "advocacy-3", label: "Contact elected officials about climate policies" },
      { id: "advocacy-4", label: "Share your climate journey on social media" },
    ],
  },
]

export default function ExpandablePledgePage() {
  // State to track selected pledges
  const [selectedPledges, setSelectedPledges] = useState<string[]>([])
  const [saveSuccess, setSaveSuccess] = useState(false)
  // State to track expanded categories
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["advocacy"]) // Default open advocacy
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null)

  // Get user initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "?"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Load saved pledges on initial render
  useEffect(() => {
    const loadSavedPledges = () => {
      try {
        if (typeof window !== "undefined") {
          const savedPledges = localStorage.getItem("selectedPledges")
          if (savedPledges) {
            const parsedPledges = JSON.parse(savedPledges)
            console.log("Loaded pledges from localStorage:", parsedPledges)
            setSelectedPledges(parsedPledges)
          }
        }
      } catch (error) {
        console.error("Error loading saved pledges:", error)
      }
    }

    // Load user data
    const loadUserData = () => {
      try {
        if (typeof window !== "undefined") {
          const userData = localStorage.getItem("user")
          if (userData) {
            setUser(JSON.parse(userData))
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error)
      }
    }

    loadSavedPledges()
    loadUserData()
  }, [])

  // Toggle a pledge selection
  const togglePledge = (pledgeId: string) => {
    setSelectedPledges((prev) => {
      const newPledges = prev.includes(pledgeId) ? prev.filter((id) => id !== pledgeId) : [...prev, pledgeId]

      // Save to localStorage immediately on each change
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("selectedPledges", JSON.stringify(newPledges))
          console.log("Saved pledges to localStorage:", newPledges)
        }
      } catch (error) {
        console.error("Error saving pledges:", error)
      }

      return newPledges
    })
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

  // Save pledges to localStorage
  const savePledges = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedPledges", JSON.stringify(selectedPledges))
        console.log("Saved pledges to localStorage on button click:", selectedPledges)

        // Show success message
        setSaveSuccess(true)

        // Hide success message after 3 seconds
        setTimeout(() => {
          setSaveSuccess(false)
        }, 3000)
      }
    } catch (error) {
      console.error("Error saving pledges:", error)
    }
  }

  // Handle sign out
  const handleSignOut = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user")
        window.location.href = "/"
      }
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  // Count selected pledges for each category
  const getCategorySelectedCount = (categoryId: string) => {
    const category = pledgeCategories.find((cat) => cat.id === categoryId)
    if (!category) return 0

    return category.actions.filter((action) => selectedPledges.includes(action.id)).length
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900">
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-medium">
          Climate Pledge
        </Link>
        <div className="flex gap-4">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            <Link href="/dashboard">Dashboard</Link>
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Make Your Climate Pledge</h1>
          <p className="text-white/80 mb-12">
            Select the actions you commit to taking. Start with just a few that feel manageable - you can always add
            more later. Your choices will be saved to your personal dashboard.
          </p>

          {saveSuccess && (
            <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-md flex items-center gap-3 text-emerald-400">
              <CheckCircle className="h-5 w-5" />
              <span>Your pledges have been saved successfully!</span>
            </div>
          )}

          <div className="space-y-6 mb-12">
            {pledgeCategories.map((category) => {
              const isExpanded = expandedCategories.includes(category.id)
              const selectedCount = getCategorySelectedCount(category.id)

              return (
                <Card key={category.id} className="bg-white/5 border-white/10 text-white">
                  <CardHeader
                    className="cursor-pointer flex flex-row items-center justify-between"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-400">
                        <category.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle>{category.name}</CardTitle>
                        <CardDescription className="text-white/60">{category.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {selectedCount > 0 && (
                        <span className="text-sm text-emerald-400">
                          {selectedCount}/{category.actions.length} selected
                        </span>
                      )}
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-white/60" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-white/60" />
                      )}
                    </div>
                  </CardHeader>

                  {isExpanded && (
                    <CardContent>
                      <ul className="space-y-3">
                        {category.actions.map((action) => (
                          <li key={action.id} className="flex items-start space-x-3">
                            <Checkbox
                              id={action.id}
                              className="mt-1 border-white/30"
                              checked={selectedPledges.includes(action.id)}
                              onCheckedChange={() => togglePledge(action.id)}
                            />
                            <label htmlFor={action.id} className="text-sm leading-tight cursor-pointer">
                              {action.label}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  )}
                </Card>
              )
            })}
          </div>

          <div className="flex justify-center">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8" onClick={savePledges}>
              Submit My Pledges
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

