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
  Info,
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
      { id: "energy-1", label: "Switch to renewable energy provider", impact: "1,500 kg CO₂e/year" },
      { id: "energy-2", label: "Install LED light bulbs throughout home", impact: "100 kg CO₂e/year" },
      { id: "energy-3", label: "Unplug electronics when not in use", impact: "100 kg CO₂e/year" },
      { id: "energy-4", label: "Reduce heating by 2 degrees in winter", impact: "300 kg CO₂e/year" },
    ],
  },
  {
    id: "transport",
    name: "Transportation",
    icon: Car,
    description: "Lower your transportation carbon footprint",
    actions: [
      { id: "transport-1", label: "Use public transportation once a week", impact: "300 kg CO₂e/year" },
      { id: "transport-2", label: "Carpool to work/school", impact: "500 kg CO₂e/year" },
      { id: "transport-3", label: "Maintain proper tire pressure for fuel efficiency", impact: "100 kg CO₂e/year" },
      { id: "transport-4", label: "Walk or bike for trips under 2 miles", impact: "200 kg CO₂e/year" },
    ],
  },
  {
    id: "food",
    name: "Food",
    icon: Utensils,
    description: "Make climate-friendly food choices",
    actions: [
      { id: "food-1", label: "Eat plant-based meals 2 days per week", impact: "300 kg CO₂e/year" },
      { id: "food-2", label: "Reduce food waste by meal planning", impact: "150 kg CO₂e/year" },
      { id: "food-3", label: "Buy local, seasonal produce when possible", impact: "100 kg CO₂e/year" },
      { id: "food-4", label: "Compost food scraps", impact: "100 kg CO₂e/year" },
    ],
  },
  {
    id: "water",
    name: "Water",
    icon: Droplet,
    description: "Conserve water in your daily routine",
    actions: [
      { id: "water-1", label: "Take shorter showers (under 5 minutes)", impact: "100 kg CO₂e/year" },
      { id: "water-2", label: "Fix leaky faucets and pipes", impact: "50 kg CO₂e/year" },
      { id: "water-3", label: "Install water-efficient fixtures", impact: "100 kg CO₂e/year" },
      { id: "water-4", label: "Collect rainwater for plants", impact: "50 kg CO₂e/year" },
    ],
  },
  {
    id: "consumption",
    name: "Consumption",
    icon: ShoppingBag,
    description: "Shop and consume more sustainably",
    actions: [
      { id: "consumption-1", label: "Bring reusable bags for shopping", impact: "10 kg CO₂e/year" },
      { id: "consumption-2", label: "Buy second-hand items when possible", impact: "100 kg CO₂e/year" },
      { id: "consumption-3", label: "Repair instead of replace", impact: "100 kg CO₂e/year" },
      { id: "consumption-4", label: "Choose products with minimal packaging", impact: "50 kg CO₂e/year" },
    ],
  },
  {
    id: "advocacy",
    name: "Advocacy",
    icon: Leaf,
    description: "Spread awareness and advocate for change",
    actions: [
      { id: "advocacy-1", label: "Talk to friends and family about climate action", impact: "Indirect impact" },
      { id: "advocacy-2", label: "Support climate-friendly businesses", impact: "Indirect impact" },
      { id: "advocacy-3", label: "Contact elected officials about climate policies", impact: "Systemic impact" },
      { id: "advocacy-4", label: "Share your climate journey on social media", impact: "Indirect impact" },
    ],
  },
]

export default function PledgePage() {
  // State to track selected pledges
  const [selectedPledges, setSelectedPledges] = useState<string[]>([])
  const [saveSuccess, setSaveSuccess] = useState(false)
  // State to track expanded categories
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["advocacy"]) // Default open the first category
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
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Climate Actions</h1>
            <p className="text-white/80">
              Select actions you commit to taking from the categories below. Each action includes an estimated carbon
              impact based on research from Project Drawdown.
            </p>
          </div>

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
                      <ul className="space-y-4">
                        {category.actions.map((action) => (
                          <li key={action.id} className="flex items-start">
                            <div className="flex flex-1 items-start space-x-3">
                              <Checkbox
                                id={action.id}
                                className="mt-1 border-white/30"
                                checked={selectedPledges.includes(action.id)}
                                onCheckedChange={() => togglePledge(action.id)}
                              />
                              <div className="space-y-1">
                                <label htmlFor={action.id} className="text-sm font-medium leading-tight cursor-pointer">
                                  {action.label}
                                </label>
                                <div className="text-xs text-emerald-400">{action.impact}</div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-white/60 hover:text-white hover:bg-white/10"
                            >
                              <Info className="h-4 w-4" />
                              <span className="sr-only">More information</span>
                            </Button>
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
              Save My Pledges
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
