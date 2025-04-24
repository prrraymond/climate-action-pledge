"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Car, Home, Leaf, ShoppingBag, Utensils, Droplet, Info, LogOut } from "lucide-react"

// This data would come from Project Drawdown in a real implementation
const actionCategories = [
  {
    id: "energy",
    name: "Energy",
    icon: Home,
    description: "Reduce your home energy consumption",
    actions: [
      {
        id: "energy-1",
        label: "Switch to renewable energy provider",
        impact: "1,500 kg CO₂e/year",
        description:
          "Switching to a renewable energy provider can significantly reduce your carbon footprint by eliminating emissions from fossil fuel-based electricity generation.",
      },
      {
        id: "energy-2",
        label: "Install LED light bulbs throughout home",
        impact: "100 kg CO₂e/year",
        description:
          "LED bulbs use up to 90% less energy than incandescent bulbs and last much longer, reducing both energy consumption and waste.",
      },
      {
        id: "energy-3",
        label: "Unplug electronics when not in use",
        impact: "100 kg CO₂e/year",
        description:
          "Many electronics continue to draw power even when turned off. This 'phantom energy' can account for up to 10% of home energy use.",
      },
      {
        id: "energy-4",
        label: "Reduce heating by 2 degrees in winter",
        impact: "300 kg CO₂e/year",
        description:
          "Lowering your thermostat by just 2 degrees can reduce your heating energy consumption by approximately 5-10%.",
      },
    ],
  },
  {
    id: "transport",
    name: "Transportation",
    icon: Car,
    description: "Lower your transportation carbon footprint",
    actions: [
      {
        id: "transport-1",
        label: "Use public transportation once a week",
        impact: "300 kg CO₂e/year",
        description:
          "Replacing a 20-mile round trip commute by car with public transit once a week can significantly reduce your carbon emissions.",
      },
      {
        id: "transport-2",
        label: "Carpool to work/school",
        impact: "500 kg CO₂e/year",
        description:
          "Sharing rides cuts emissions per person by dividing the same journey's carbon footprint among multiple passengers.",
      },
      {
        id: "transport-3",
        label: "Maintain proper tire pressure for fuel efficiency",
        impact: "100 kg CO₂e/year",
        description:
          "Properly inflated tires can improve gas mileage by up to 3%, reducing fuel consumption and emissions.",
      },
      {
        id: "transport-4",
        label: "Walk or bike for trips under 2 miles",
        impact: "200 kg CO₂e/year",
        description:
          "Short car trips are particularly inefficient as engines don't reach optimal operating temperature. Walking or biking eliminates these emissions entirely.",
      },
    ],
  },
  {
    id: "food",
    name: "Food",
    icon: Utensils,
    description: "Make climate-friendly food choices",
    actions: [
      {
        id: "food-1",
        label: "Eat plant-based meals 2 days per week",
        impact: "300 kg CO₂e/year",
        description:
          "Plant-based foods typically have a much lower carbon footprint than animal products, especially red meat and dairy.",
      },
      {
        id: "food-2",
        label: "Reduce food waste by meal planning",
        impact: "150 kg CO₂e/year",
        description:
          "About 8% of global emissions come from food waste. Planning meals helps reduce the amount of food that ends up in landfills.",
      },
      {
        id: "food-3",
        label: "Buy local, seasonal produce when possible",
        impact: "100 kg CO₂e/year",
        description:
          "Local, seasonal food requires less transportation and often less energy for production (like heated greenhouses).",
      },
      {
        id: "food-4",
        label: "Compost food scraps",
        impact: "100 kg CO₂e/year",
        description:
          "Composting food waste prevents methane emissions that would occur in landfills and creates nutrient-rich soil.",
      },
    ],
  },
  {
    id: "water",
    name: "Water",
    icon: Droplet,
    description: "Conserve water in your daily routine",
    actions: [
      {
        id: "water-1",
        label: "Take shorter showers (under 5 minutes)",
        impact: "100 kg CO₂e/year",
        description:
          "Heating water requires significant energy. Shorter showers reduce both water usage and the energy needed to heat it.",
      },
      {
        id: "water-2",
        label: "Fix leaky faucets and pipes",
        impact: "50 kg CO₂e/year",
        description:
          "A single dripping faucet can waste thousands of gallons of water per year, along with the energy used to treat and deliver it.",
      },
      {
        id: "water-3",
        label: "Install water-efficient fixtures",
        impact: "100 kg CO₂e/year",
        description:
          "Low-flow showerheads and faucet aerators can reduce water consumption by 30-50% without sacrificing performance.",
      },
      {
        id: "water-4",
        label: "Collect rainwater for plants",
        impact: "50 kg CO₂e/year",
        description:
          "Using rainwater for gardens and plants reduces the need for treated municipal water and the energy required to process and pump it.",
      },
    ],
  },
  {
    id: "consumption",
    name: "Consumption",
    icon: ShoppingBag,
    description: "Shop and consume more sustainably",
    actions: [
      {
        id: "consumption-1",
        label: "Bring reusable bags for shopping",
        impact: "10 kg CO₂e/year",
        description:
          "Single-use plastic bags have a high carbon footprint when their full lifecycle is considered. Reusable bags significantly reduce this impact.",
      },
      {
        id: "consumption-2",
        label: "Buy second-hand items when possible",
        impact: "100 kg CO₂e/year",
        description:
          "Second-hand purchases avoid the emissions associated with manufacturing new products, from resource extraction to production and shipping.",
      },
      {
        id: "consumption-3",
        label: "Repair instead of replace",
        impact: "100 kg CO₂e/year",
        description:
          "Extending the life of products through repair reduces the need for new manufacturing and prevents items from entering the waste stream.",
      },
      {
        id: "consumption-4",
        label: "Choose products with minimal packaging",
        impact: "50 kg CO₂e/year",
        description:
          "Excessive packaging contributes to waste and emissions. Selecting products with minimal or recyclable packaging reduces this impact.",
      },
    ],
  },
  {
    id: "advocacy",
    name: "Advocacy",
    icon: Leaf,
    description: "Spread awareness and advocate for change",
    actions: [
      {
        id: "advocacy-1",
        label: "Talk to friends and family about climate action",
        impact: "Indirect impact",
        description:
          "Conversations about climate action can inspire others to make changes, creating a multiplier effect for your personal impact.",
      },
      {
        id: "advocacy-2",
        label: "Support climate-friendly businesses",
        impact: "Indirect impact",
        description:
          "Your purchasing decisions send market signals. Supporting sustainable businesses encourages more companies to adopt climate-friendly practices.",
      },
      {
        id: "advocacy-3",
        label: "Contact elected officials about climate policies",
        impact: "Systemic impact",
        description:
          "Policy changes can have far-reaching effects. Contacting representatives shows public support for climate action.",
      },
      {
        id: "advocacy-4",
        label: "Share your climate journey on social media",
        impact: "Indirect impact",
        description:
          "Social media sharing normalizes climate action and can inspire your network to make similar commitments.",
      },
    ],
  },
]

export default function ActionsPage() {
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null)
  const [selectedPledges, setSelectedPledges] = useState<string[]>([])

  // Get user initials for avatar
  const getInitials = (name: string) => {
    if (!name) return "?"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Load user data and pledges on initial render
  useEffect(() => {
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

    // Load saved pledges
    const loadSavedPledges = () => {
      try {
        if (typeof window !== "undefined") {
          const savedPledges = localStorage.getItem("selectedPledges")
          if (savedPledges) {
            setSelectedPledges(JSON.parse(savedPledges))
          }
        }
      } catch (error) {
        console.error("Error loading saved pledges:", error)
      }
    }

    loadUserData()
    loadSavedPledges()
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

  // Save pledges to localStorage
  const savePledges = () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedPledges", JSON.stringify(selectedPledges))
        console.log("Saved pledges to localStorage on button click:", selectedPledges)

        // Redirect to dashboard after saving
        window.location.href = "/dashboard"
      }
    } catch (error) {
      console.error("Error saving pledges:", error)
    }
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

          <Tabs defaultValue="energy" className="mb-12">
            <TabsList className="bg-white/10 text-white mb-6 flex flex-wrap h-auto p-1">
              {actionCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-white/20 flex items-center gap-2 py-2"
                >
                  <category.icon className="h-4 w-4" />
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {actionCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-4">
                <div className="bg-white/5 p-4 rounded-lg mb-6">
                  <h2 className="text-xl font-medium text-white mb-2 flex items-center gap-2">
                    <category.icon className="h-5 w-5 text-emerald-400" />
                    {category.name}
                  </h2>
                  <p className="text-white/80">{category.description}</p>
                </div>

                {category.actions.map((action) => (
                  <Card key={action.id} className="bg-white/5 border-white/10 text-white overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4 flex items-start gap-4">
                        <Checkbox
                          id={action.id}
                          className="mt-1 border-white/30"
                          checked={selectedPledges.includes(action.id)}
                          onCheckedChange={() => togglePledge(action.id)}
                        />
                        <div className="space-y-1 flex-1">
                          <label htmlFor={action.id} className="text-base font-medium cursor-pointer">
                            {action.label}
                          </label>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-emerald-400 border-emerald-400/30">
                              {action.impact}
                            </Badge>
                          </div>
                          <p className="text-sm text-white/70">{action.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white/60 hover:text-white hover:bg-white/10"
                        >
                          <Info className="h-4 w-4" />
                          <span className="sr-only">More information</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mb-12">
            <h3 className="text-emerald-400 font-medium mb-2 flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              Your Potential Impact
            </h3>
            <p className="text-white/80 text-sm">
              Select actions above to see your estimated carbon reduction. The more actions you commit to, the greater
              your positive impact on the climate.
            </p>
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
