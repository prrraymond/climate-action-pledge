"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Upload } from 'lucide-react'

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCompleteSignUp = () => {
    // In a real implementation, this would submit the form data to your backend
    // For now, we'll just redirect to the onboarding page
    window.location.href = "/onboarding"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 flex flex-col">
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-medium">
          Climate Pledge
        </Link>
        <Button asChild variant="ghost" className="text-white hover:bg-white/10">
          <Link href="/login">Sign In</Link>
        </Button>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle>Join Climate Pledge</CardTitle>
            <CardDescription className="text-white/60">
              Create your account to start making a difference
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your name" className="bg-white/10 border-white/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    className="bg-white/10 border-white/20"
                  />
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
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-medium">Upload a Nature Photo</h3>
                  <p className="text-sm text-white/60">
                    Share a photo of nature that inspires you to take climate action. This will be added to our
                    community gallery.
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  {imagePreview ? (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden">
                      <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-12 w-full flex flex-col items-center justify-center">
                      <Upload className="h-12 w-12 text-white/40 mb-4" />
                      <p className="text-sm text-white/60 text-center">Drag and drop a photo, or click to browse</p>
                    </div>
                  )}

                  <div className="w-full">
                    <Label htmlFor="photo-upload" className="sr-only">
                      Upload Photo
                    </Label>
                    <Input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Button
                      onClick={() => document.getElementById("photo-upload")?.click()}
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      {imagePreview ? "Change Photo" : "Select Photo"}
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={() => setStep(1)} variant="ghost" className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleCompleteSignUp} className="flex-1 bg-emerald-500 hover:bg-emerald-600">
                    Complete Sign Up
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t border-white/10 pt-6">
            <div className="text-sm text-white/60 text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-emerald-400 hover:text-emerald-300">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
