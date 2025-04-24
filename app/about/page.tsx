import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Users, BarChart, Globe, BookOpen } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900">
      <header className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-medium">
          Climate Pledge
        </Link>
        <div className="flex gap-2">
          <Button asChild variant="ghost" className="text-white hover:bg-white/10 bg-transparent">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white">
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Climate Pledge</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Empowering individuals to take meaningful action against climate change through personal commitments and
              collective impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-white/80 mb-4">
                Climate Pledge aims to inspire and engage users in personal climate action by making it easy to
                discover, commit to, and track the impact of individual climate-positive actions.
              </p>
              <p className="text-white/80">
                We believe that when millions of people make small changes, the collective impact can be enormous. Our
                platform helps visualize this collective power while providing science-backed guidance on the most
                effective actions individuals can take.
              </p>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?key=w8tj2" alt="Community climate action" fill className="object-cover" />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/5 border-white/10 text-white">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-emerald-500/20 w-12 h-12 flex items-center justify-center mb-4">
                    <Leaf className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">1. Discover Actions</h3>
                  <p className="text-white/70 text-sm">
                    Browse our library of climate-positive actions sourced from Project Drawdown and other leading
                    research organizations.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 text-white">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-emerald-500/20 w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">2. Make Your Pledge</h3>
                  <p className="text-white/70 text-sm">
                    Select the actions you commit to taking in your daily life. Start small and add more as you
                    progress.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 text-white">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-emerald-500/20 w-12 h-12 flex items-center justify-center mb-4">
                    <BarChart className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">3. Track Your Impact</h3>
                  <p className="text-white/70 text-sm">
                    See the estimated carbon reduction from your actions and how they contribute to our collective
                    impact.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Partners</h2>
            <p className="text-white/80 text-center mb-8">
              We collaborate with leading research organizations to ensure our impact calculations are based on the
              latest science.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white/5 p-6 rounded-lg flex flex-col items-center">
                <Globe className="h-10 w-10 text-white/40 mb-3" />
                <div className="text-center">
                  <h3 className="font-medium">Project Drawdown</h3>
                  <p className="text-sm text-white/60">Action research partner</p>
                </div>
              </div>
              <div className="bg-white/5 p-6 rounded-lg flex flex-col items-center">
                <Leaf className="h-10 w-10 text-white/40 mb-3" />
                <div className="text-center">
                  <h3 className="font-medium">The Nature Conservancy</h3>
                  <p className="text-sm text-white/60">Carbon calculator methodology</p>
                </div>
              </div>
              <div className="bg-white/5 p-6 rounded-lg flex flex-col items-center">
                <BookOpen className="h-10 w-10 text-white/40 mb-3" />
                <div className="text-center">
                  <h3 className="font-medium">Climate Science Alliance</h3>
                  <p className="text-sm text-white/60">Educational content</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Join Our Community</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Be part of a growing movement of climate-conscious individuals making a difference through their daily
              choices.
            </p>
            <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8">
              <Link href="/register">Take the Pledge Today</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-blue-950 border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-medium mb-4">Climate Pledge</h4>
              <p className="text-white/60 text-sm">
                Empowering individuals to take meaningful climate action through personal commitments.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-white/60 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/research" className="text-white/60 hover:text-white">
                    Research Partners
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-white/60 hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-white/60 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-white/60 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/60 text-sm">
            © {new Date().getFullYear()} Climate Pledge. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
