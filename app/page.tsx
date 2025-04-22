import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { StatsDisplay } from "@/components/stats-display"

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
            <Image src="/nature-image.jpg" alt="Beautiful natural landscape" fill className="object-cover" priority />
            <div className="absolute bottom-2 right-2 text-xs text-white/70">Photo by community member Sarah K.</div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">Our Collective Impact</h3>
          <StatsDisplay />
        </div>

        <div className="mt-24">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Community Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={`/gallery-${i}.jpg`}
                  alt={`Community nature photo ${i}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Make a Difference?</h3>
          <p className="text-white/80 mb-8">
            Join thousands of others who are taking meaningful steps to combat climate change. Your actions matter.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8">
              <Link href="/register">Take the Pledge</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Link href="/login">Resume Your Journey</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-blue-950 border-t border-white/10 py-12 mt-24">
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
