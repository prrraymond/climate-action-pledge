import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900">
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <h1 className="text-white text-xl font-medium">Climate Pledge</h1>
        <div className="flex gap-2">
          <Button asChild variant="ghost" className="text-white hover:bg-white/10">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white">
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Take Action for <span className="text-emerald-400">Climate Change</span>
            </h2>
            <p className="text-white/80 text-lg max-w-lg">
              Join a community of climate-conscious individuals making meaningful changes in their daily lives. Track
              your progress, discover new ways to reduce your impact, and be part of the solution.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white">
                <Link href="/register">Take the Pledge</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-blue-800/50 flex items-center justify-center">
              <p className="text-white text-lg">Nature Image Placeholder</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
