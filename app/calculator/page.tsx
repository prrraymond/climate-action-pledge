"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, Calculator, Car, Home, Leaf, ShoppingBag, Utensils } from 'lucide-react'

export default function CalculatorPage() {
  const [step, setStep] = useState(1)
  const [result, setResult] = useState<number | null>(null)

  const handleCalculate = () => {
    // In a real implementation, this would use The Nature Conservancy's calculation logic
    // For now, we'll just set a sample result
    setResult(4250)
    setStep(3)
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
          <Button variant="ghost" className="text-white hover:bg-white/10">
            <Link href="/actions">My Pledges</Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-medium">
              JS
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
              <Calculator className="h-8 w-8 text-emerald-400" />
              Carbon Impact Calculator
            </h1>
            <p className="text-white/80">
              Estimate your carbon footprint and see how your pledged actions can reduce your impact. This calculator
              uses methodology from The Nature Conservancy.
            </p>
          </div>

          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader>
              <CardTitle>Calculate Your Impact</CardTitle>
              <CardDescription className="text-white/60">
                {step === 1 && "Step 1: Tell us about your household"}
                {step === 2 && "Step 2: Your current habits and consumption"}
                {step === 3 && "Your Results"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="household-size">How many people live in your household?</Label>
                    <Select defaultValue="2">
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select household size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 person</SelectItem>
                        <SelectItem value="2">2 people</SelectItem>
                        <SelectItem value="3">3 people</SelectItem>
                        <SelectItem value="4">4 people</SelectItem>
                        <SelectItem value="5">5+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="home-type">What type of home do you live in?</Label>
                    <RadioGroup defaultValue="apartment" className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="apartment" id="apartment" className="border-white/30" />
                        <Label htmlFor="apartment">Apartment</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="house" id="house" className="border-white/30" />
                        <Label htmlFor="house">House</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="townhouse" id="townhouse" className="border-white/30" />
                        <Label htmlFor="townhouse">Townhouse</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" className="border-white/30" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>What is your approximate home size?</Label>
                    <div className="pt-4 pb-2">
                      <Slider defaultValue={[1500]} max={5000} step={100} className="bg-white/10" />
                    </div>
                    <div className="flex justify-between text-sm text-white/60">
                      <span>Small (&lt;1000 sq ft)</span>
                      <span>Medium</span>
                      <span>Large (&gt;3000 sq ft)</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button onClick={() => setStep(2)} className="w-full bg-emerald-500 hover:bg-emerald-600">
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Car className="h-5 w-5 text-emerald-400 shrink-0" />
                      <Label>How many miles do you drive per week?</Label>
                    </div>
                    <Input
                      type="number"
                      placeholder="Enter miles"
                      className="bg-white/10 border-white/20 text-white"
                      defaultValue="150"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Utensils className="h-5 w-5 text-emerald-400 shrink-0" />
                      <Label>How would you describe your diet?</Label>
                    </div>
                    <RadioGroup defaultValue="mixed" className="grid grid-cols-1 gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="meat-heavy" id="meat-heavy" className="border-white/30" />
                        <Label htmlFor="meat-heavy">Meat with most meals</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="mixed" id="mixed" className="border-white/30" />
                        <Label htmlFor="mixed">Mixed diet (meat a few times per week)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pescatarian" id="pescatarian" className="border-white/30" />
                        <Label htmlFor="pescatarian">Pescatarian (fish, no meat)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vegetarian" id="vegetarian" className="border-white/30" />
                        <Label htmlFor="vegetarian">Vegetarian (no meat or fish)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vegan" id="vegan" className="border-white/30" />
                        <Label htmlFor="vegan">Vegan (no animal products)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Home className="h-5 w-5 text-emerald-400 shrink-0" />
                      <Label>What is your primary home heating source?</Label>
                    </div>
                    <Select defaultValue="natural-gas">
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select heating source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="natural-gas">Natural Gas</SelectItem>
                        <SelectItem value="electricity">Electricity</SelectItem>
                        <SelectItem value="oil">Oil</SelectItem>
                        <SelectItem value="propane">Propane</SelectItem>
                        <SelectItem value="renewable">Renewable Energy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="h-5 w-5 text-emerald-400 shrink-0" />
                      <Label>How would you describe your shopping habits?</Label>
                    </div>
                    <RadioGroup defaultValue="moderate" className="grid grid-cols-1 gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="minimal" id="minimal" className="border-white/30" />
                        <Label htmlFor="minimal">Minimal (mostly essentials)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="moderate" id="moderate" className="border-white/30" />
                        <Label htmlFor="moderate">Moderate (occasional non-essential purchases)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="frequent" id="frequent" className="border-white/30" />
                        <Label htmlFor="frequent">Frequent (regular shopping for new items)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={() => setStep(1)} variant="ghost" className="flex-1">
                      Back
                    </Button>
                    <Button onClick={handleCalculate} className="flex-1 bg-emerald-500 hover:bg-emerald-600">
                      Calculate Impact
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && result && (
                <div className="space-y-8">
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center p-4 bg-emerald-500/20 rounded-full mb-4">
                      <Leaf className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold">Your Estimated Carbon Footprint</h3>
                    <div className="text-4xl font-bold text-emerald-400">{result} kg CO₂e/year</div>
                    <p className="text-white/60 max-w-md mx-auto">
                      This is your estimated annual carbon footprint based on the information you provided.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6">
                    <h4 className="text-lg font-medium mb-4">How Your Pledges Can Help</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="text-sm">Current Footprint</div>
                        <div className="font-medium">{result} kg CO₂e/year</div>
                      </div>
                      <div className="flex justify-between items-center text-emerald-400">
                        <div className="text-sm">Potential Reduction from Pledges</div>
                        <div className="font-medium">-1,250 kg CO₂e/year</div>
                      </div>
                      <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                        <div className="text-sm font-medium">New Footprint</div>
                        <div className="font-medium">{result - 1250} kg CO₂e/year</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button onClick={() => setStep(2)} variant="ghost" className="flex-1">
                      Recalculate
                    </Button>
                    <Button asChild className="flex-1 bg-emerald-500 hover:bg-emerald-600">
                      <Link href="/actions">Update My Pledges</Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
