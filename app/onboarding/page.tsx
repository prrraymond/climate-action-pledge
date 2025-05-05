"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Leaf, Info, Check } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Define types for our selections
type Motivation = "future" | "nature" | "justice" | "wellbeing"
type KnowledgeLevel = "beginner" | "intermediate" | "informed" | "expert"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  // State for user selections
  const [selectedMotivations, setSelectedMotivations] = useState<Motivation[]>([])
  const [knowledgeLevel, setKnowledgeLevel] = useState<KnowledgeLevel | null>(null)
  const [startOption, setStartOption] = useState<"calculator" | "actions">("calculator")

  // Toggle a motivation selection (multiple allowed)
  const toggleMotivation = (motivation: Motivation) => {
    setSelectedMotivations((prev) => {
      if (prev.includes(motivation)) {
        return prev.filter((m) => m !== motivation)
      } else {
        return [...prev, motivation]
      }
    })
  }

  // Set knowledge level (single selection)
  const selectKnowledgeLevel = (level: KnowledgeLevel) => {
    setKnowledgeLevel(level)
  }

  // Function to handle completion of onboarding
  const handleCompleteOnboarding = () => {
    // Save user preferences to localStorage
    const preferences = {
      motivations: selectedMotivations,
      knowledgeLevel,
      startOption,
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("userPreferences", JSON.stringify(preferences))
    }

    // In a real app, you would save these to the user's profile in the database
    router.push("/dashboard")
  }

  // Check if we can proceed to the next step
  const canProceedFromStep1 = selectedMotivations.length > 0
  const canProceedFromStep2 = knowledgeLevel !== null

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900">
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-medium">
          Climate Pledge
        </Link>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Welcome to Climate Pledge</h1>
            <p className="text-white/80">Let's get you set up to make a positive impact on our planet.</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-sm text-white/60 mb-2">
              <span>
                Step {step} of {totalSteps}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/10" indicatorClassName="bg-emerald-500" />
          </div>

          {step === 1 && (
            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader>
                <CardTitle>What motivates you to take climate action?</CardTitle>
                <CardDescription className="text-white/60">
                  This helps us personalize your experience (select all that apply)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <Button
                    variant="outline"
                    className={`h-auto p-4 flex flex-col items-start text-left border-white/20 text-white hover:bg-white/10 bg-transparent relative ${
                      selectedMotivations.includes("future") ? "border-emerald-500 bg-emerald-500/10" : ""
                    }`}
                    onClick={() => toggleMotivation("future")}
                  >
                    {selectedMotivations.includes("future") && (
                      <Check className="absolute top-2 right-2 h-4 w-4 text-emerald-500" />
                    )}
                    <div className="font-medium mb-2">Future Generations</div>
                    <p className="text-sm text-white/60 min-h-[40px]">
                      I want to preserve the planet for my children and grandchildren
                    </p>
                  </Button>

                  <Button
                    variant="outline"
                    className={`h-auto p-4 flex flex-col items-start text-left border-white/20 text-white hover:bg-white/10 bg-transparent relative ${
                      selectedMotivations.includes("nature") ? "border-emerald-500 bg-emerald-500/10" : ""
                    }`}
                    onClick={() => toggleMotivation("nature")}
                  >
                    {selectedMotivations.includes("nature") && (
                      <Check className="absolute top-2 right-2 h-4 w-4 text-emerald-500" />
                    )}
                    <div className="font-medium mb-2">Nature & Wildlife</div>
                    <p className="text-sm text-white/60 min-h-[40px]">
                      I'm concerned about biodiversity loss and ecosystem damage
                    </p>
                  </Button>

                  <Button
                    variant="outline"
                    className={`h-auto p-4 flex flex-col items-start text-left border-white/20 text-white hover:bg-white/10 bg-transparent relative ${
                      selectedMotivations.includes("justice") ? "border-emerald-500 bg-emerald-500/10" : ""
                    }`}
                    onClick={() => toggleMotivation("justice")}
                  >
                    {selectedMotivations.includes("justice") && (
                      <Check className="absolute top-2 right-2 h-4 w-4 text-emerald-500" />
                    )}
                    <div className="font-medium mb-2">Climate Justice</div>
                    <p className="text-sm text-white/60 min-h-[40px]">
                      I want to reduce impacts on vulnerable communities
                    </p>
                  </Button>

                  <Button
                    variant="outline"
                    className={`h-auto p-4 flex flex-col items-start text-left border-white/20 text-white hover:bg-white/10 bg-transparent relative ${
                      selectedMotivations.includes("wellbeing") ? "border-emerald-500 bg-emerald-500/10" : ""
                    }`}
                    onClick={() => toggleMotivation("wellbeing")}
                  >
                    {selectedMotivations.includes("wellbeing") && (
                      <Check className="absolute top-2 right-2 h-4 w-4 text-emerald-500" />
                    )}
                    <div className="font-medium mb-2">Personal Wellbeing</div>
                    <p className="text-sm text-white/60 min-h-[40px]">
                      Climate-friendly choices often lead to healthier living
                    </p>
                  </Button>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setStep(2)}
                    className={`bg-emerald-500 hover:bg-emerald-600 text-white ${
                      !canProceedFromStep1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!canProceedFromStep1}
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader>
                <CardTitle>What's your current climate knowledge?</CardTitle>
                <CardDescription className="text-white/60">
                  This helps us provide relevant information (select one)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-8">
                  <Button
                    variant="outline"
                    className={`w-full justify-start h-auto py-3 border-white/20 text-white hover:bg-white/10 bg-transparent ${
                      knowledgeLevel === "beginner" ? "border-emerald-500 bg-emerald-500/10" : ""
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
                      knowledgeLevel === "intermediate" ? "border-emerald-500 bg-emerald-500/10" : ""
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
                      knowledgeLevel === "informed" ? "border-emerald-500 bg-emerald-500/10" : ""
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
                      knowledgeLevel === "expert" ? "border-emerald-500 bg-emerald-500/10" : ""
                    }`}
                    onClick={() => selectKnowledgeLevel("expert")}
                  >
                    <div className="text-left">
                      <div className="font-medium">Expert</div>
                      <p className="text-sm text-white/60">I have extensive knowledge and want to track my actions</p>
                    </div>
                  </Button>
                </div>

                <div className="flex justify-between">
                  <Button
                    onClick={() => setStep(1)}
                    variant="ghost"
                    className="text-white hover:bg-white/10 bg-transparent"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className={`bg-emerald-500 hover:bg-emerald-600 text-white ${
                      !canProceedFromStep2 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!canProceedFromStep2}
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader>
                <CardTitle>Ready to make your first pledge?</CardTitle>
                <CardDescription className="text-white/60">Choose how you'd like to proceed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 mb-8">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 flex gap-4">
                    <div className="rounded-full bg-emerald-500/20 p-2 h-fit">
                      <Leaf className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-emerald-400">Recommended</h3>
                      <p className="text-sm text-white/80 mt-1">
                        Take our carbon calculator first to understand your current footprint, then choose actions that
                        will have the most impact.
                      </p>
                    </div>
                  </div>

                  <Tabs
                    defaultValue="calculator"
                    value={startOption}
                    onValueChange={(value) => setStartOption(value as "calculator" | "actions")}
                    className="w-full"
                  >
                    <TabsList className="grid grid-cols-2 bg-white/10 text-white">
                      <TabsTrigger value="calculator" className="data-[state=active]:bg-white/20">
                        Start with Calculator
                      </TabsTrigger>
                      <TabsTrigger value="actions" className="data-[state=active]:bg-white/20">
                        Browse Actions
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="calculator" className="pt-4">
                      <p className="text-sm text-white/80 mb-4">
                        Our calculator helps you understand your current carbon footprint and identifies the most
                        impactful areas for change.
                      </p>
                      <Button asChild className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                        <Link href="/calculator">Go to Carbon Calculator</Link>
                      </Button>
                    </TabsContent>
                    <TabsContent value="actions" className="pt-4">
                      <p className="text-sm text-white/80 mb-4">
                        Browse our library of climate-positive actions and select the ones that fit your lifestyle.
                      </p>
                      <Button asChild className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                        <Link href="/actions">Browse Climate Actions</Link>
                      </Button>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="flex justify-between">
                  <Button
                    onClick={() => setStep(2)}
                    variant="ghost"
                    className="text-white hover:bg-white/10 bg-transparent"
                  >
                    Back
                  </Button>
                  <Button onClick={handleCompleteOnboarding} className="bg-emerald-500 hover:bg-emerald-600 text-white">
                    Go to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-white/60 text-sm">
              <Info className="h-4 w-4" />
              <span>You can always update your preferences later in your profile settings</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}




