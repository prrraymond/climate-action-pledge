"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowLeft, Save } from "lucide-react"

// Define types for our selections
type Motivation = "future" | "nature" | "justice" | "wellbeing"
type KnowledgeLevel = "beginner" | "intermediate" | "informed" | "expert"

type UserPreferences = {
  motivations: Motivation[]
  knowledgeLevel: KnowledgeLevel | null
  startOption: "calculator" | "actions"
}

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    motivations: [],
    knowledgeLevel: null,
    startOption: "calculator",
  })
  const [loading, setLoading] = useState(true)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  useEffect(() => {
    // Load preferences from localStorage
    if (typeof window !== "undefined") {
      const savedPrefs = localStorage.getItem("userPreferences")
      if (savedPrefs) {
        try {
          setPreferences(JSON.parse(savedPrefs))
        } catch (e) {
          console.error("Error parsing preferences:", e)
        }
      }
      setLoading(false)
    }
  }, [])

  // Toggle a motivation selection
  const toggleMotivation = (motivation: Motivation) => {
    setPreferences((prev) => {
      const newMotivations = prev.motivations.includes(motivation)
        ? prev.motivations.filter((m) => m !== motivation)
        : [...prev.motivations, motivation]
      return { ...prev, motivations: newMotivations }
    })
  }

  // Set knowledge level
  const selectKnowledgeLevel = (level: KnowledgeLevel) => {
    setPreferences((prev) => ({ ...prev, knowledgeLevel: level }))
  }

  // Save preferences
  const savePreferences = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userPreferences", JSON.stringify(preferences))

      // Show success message
      setSaveMessage("Your preferences have been updated successfully.")

      // Clear message after 3 seconds
      setTimeout(() => {
        setSaveMessage(null)
      }, 3000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 flex items-center justify-center">
        <div className="text-white">Loading your preferences...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900">
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-medium">
          Climate Pledge
        </Link>
        <div className="flex gap-2">
          <Button asChild variant="ghost" className="text-white hover:bg-white/10 bg-transparent">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Preferences</h1>
            <p className="text-white/80">Update your climate action preferences and personalization settings.</p>
          </div>

          {saveMessage && (
            <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-md text-emerald-400">
              {saveMessage}
            </div>
          )}

          <Card className="bg-white/5 border-white/10 text-white mb-8">
            <CardHeader>
              <CardTitle>What motivates you to take climate action?</CardTitle>
              <CardDescription className="text-white/60">Select all that apply</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Button
                  variant="outline"
                  className={`h-auto p-4 flex flex-col items-start text-left border-white/20 text-white hover:bg-white/10 bg-transparent relative ${
                    preferences.motivations.includes("future") ? "border-emerald-500 bg-emerald-500/10" : ""
                  }`}
                  onClick={() => toggleMotivation("future")}
                >
                  {preferences.motivations.includes("future") && (
                    <Check className="absolute top-2 right-2 h-4 w-4 text-emerald-500" />
                  )}
                  <div className="font-medium mb-2">Future Generations</div>
                  <p className="text-sm text-white/60">
                    I want to preserve the planet for my children and grandchildren
                  </p>
                </Button>

                <Button
                  variant="outline"
                  className={`h-auto p-4 flex flex-col items-start text-left border-white/20 text-white hover:bg-white/10 bg-transparent relative ${
                    preferences.motivations.includes("nature") ? "border-emerald-500 bg-emerald-500/10" : ""
                  }`}
                  onClick={() => toggleMotivation("nature")}
                >
                  {preferences.motivations.includes("nature") && (
                    <Check className="absolute top-2 right-2 h-4 w-4 text-emerald-500" />
                  )}
                  <div className="font-medium mb-2">Nature & Wildlife</div>
                  <p className="text-sm text-white/60">I'm concerned about biodiversity loss and ecosystem damage</p>
                </Button>

                <Button
                  variant="outline"
                  className={`h-auto p-4 flex flex-col items-start text-left border-white/20 text-white hover:bg-white/10 bg-transparent relative ${
                    preferences.motivations.includes("justice") ? "border-emerald-500 bg-emerald-500/10" : ""
                  }`}
                  onClick={() => toggleMotivation("justice")}
                >
                  {preferences.motivations.includes("justice") && (
                    <Check className="absolute top-2 right-2 h-4 w-4 text-emerald-500" />
                  )}
                  <div className="font-medium mb-2">Climate Justice</div>
                  <p className="text-sm text-white/60">I want to reduce impacts on vulnerable communities</p>
                </Button>

                <Button
                  variant="outline"
                  className={`h-auto p-4 flex flex-col items-start text-left border-white/20 text-white hover:bg-white/10 bg-transparent relative ${
                    preferences.motivations.includes("wellbeing") ? "border-emerald-500 bg-emerald-500/10" : ""
                  }`}
                  onClick={() => toggleMotivation("wellbeing")}
                >
                  {preferences.motivations.includes("wellbeing") && (
                    <Check className="absolute top-2 right-2 h-4 w-4 text-emerald-500" />
                  )}
                  <div className="font-medium mb-2">Personal Wellbeing</div>
                  <p className="text-sm text-white/60">Climate-friendly choices often lead to healthier living</p>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 text-white mb-8">
            <CardHeader>
              <CardTitle>Your climate knowledge level</CardTitle>
              <CardDescription className="text-white/60">Select one option</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <Button
                  variant="outline"
                  className={`w-full justify-start h-auto py-3 border-white/20 text-white hover:bg-white/10 bg-transparent ${
                    preferences.knowledgeLevel === "beginner" ? "border-emerald-500 bg-emerald-500/10" : ""
                  }`}
                  onClick={() => selectKnowledgeLevel("beginner")}
                >
                  <div className="text-left">
                    <div className="font-medium">Just getting started</div>
                    <p className="text-sm text-white/60">I'm new to climate action and want to learn the basics</p>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className={`w-full justify-start h-auto py-3 border-white/20 text-white hover:bg-white/10 bg-transparent ${
                    preferences.knowledgeLevel === "intermediate" ? "border-emerald-500 bg-emerald-500/10" : ""
                  }`}
                  onClick={() => selectKnowledgeLevel("intermediate")}
                >
                  <div className="text-left">
                    <div className="font-medium">Some knowledge</div>
                    <p className="text-sm text-white/60">I understand the issues but want practical guidance</p>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className={`w-full justify-start h-auto py-3 border-white/20 text-white hover:bg-white/10 bg-transparent ${
                    preferences.knowledgeLevel === "informed" ? "border-emerald-500 bg-emerald-500/10" : ""
                  }`}
                  onClick={() => selectKnowledgeLevel("informed")}
                >
                  <div className="text-left">
                    <div className="font-medium">Well-informed</div>
                    <p className="text-sm text-white/60">I'm knowledgeable and looking to maximize my impact</p>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className={`w-full justify-start h-auto py-3 border-white/20 text-white hover:bg-white/10 bg-transparent ${
                    preferences.knowledgeLevel === "expert" ? "border-emerald-500 bg-emerald-500/10" : ""
                  }`}
                  onClick={() => selectKnowledgeLevel("expert")}
                >
                  <div className="text-left">
                    <div className="font-medium">Expert</div>
                    <p className="text-sm text-white/60">I have extensive knowledge and want to track my actions</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={savePreferences} className="bg-emerald-500 hover:bg-emerald-600 text-white">
              <Save className="mr-2 h-4 w-4" />
              Save Preferences
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
