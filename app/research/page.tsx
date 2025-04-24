import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Leaf, BookOpen, BarChart, Users, Shield } from "lucide-react"

export default function ResearchPartnersPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Research Partners</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Climate Pledge collaborates with leading research organizations to ensure our impact calculations and
              action recommendations are based on the latest climate science.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Scientific Methodology</h2>
              <p className="text-white/80 mb-4">
                Our carbon impact calculations are derived from peer-reviewed research and methodologies developed by
                our research partners. We regularly update our models to reflect the latest scientific consensus.
              </p>
              <p className="text-white/80">
                Each action in our platform has been evaluated for its carbon reduction potential across different
                geographic regions and living situations, allowing us to provide personalized impact estimates.
              </p>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/climate-research-team.png"
                alt="Climate scientists analyzing data"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Key Research Partners</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/5 border-white/10 text-white">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-emerald-500/20 w-12 h-12 flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Project Drawdown</h3>
                  <p className="text-white/70 text-sm">
                    Provides research on climate solutions and their potential impact. Our action recommendations are
                    aligned with their comprehensive model of solution effectiveness.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 text-white">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-emerald-500/20 w-12 h-12 flex items-center justify-center mb-4">
                    <Leaf className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">The Nature Conservancy</h3>
                  <p className="text-white/70 text-sm">
                    Provides the methodology for our carbon footprint calculator, helping users understand their
                    baseline impact before making pledges.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 text-white">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-emerald-500/20 w-12 h-12 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Climate Science Alliance</h3>
                  <p className="text-white/70 text-sm">
                    Collaborates on educational content and ensures our communications accurately reflect climate
                    science in accessible language.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Additional Research Collaborators</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/5 border-white/10 text-white">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-emerald-500/20 w-12 h-12 flex items-center justify-center mb-4">
                    <BarChart className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Carbon Trust</h3>
                  <p className="text-white/70 text-sm">
                    Provides methodologies for measuring and certifying carbon footprints of products and services
                    referenced in our consumption recommendations.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 text-white">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-emerald-500/20 w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Climate Justice Alliance</h3>
                  <p className="text-white/70 text-sm">
                    Ensures our approach considers equity and environmental justice, helping us develop inclusive
                    climate action recommendations.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 text-white">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-emerald-500/20 w-12 h-12 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Global Footprint Network</h3>
                  <p className="text-white/70 text-sm">
                    Provides ecological footprint methodologies that complement our carbon calculations for a more
                    holistic view of environmental impact.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6 mb-16">
            <h3 className="text-xl font-bold text-white mb-4">Research Transparency</h3>
            <p className="text-white/80 mb-4">
              We are committed to transparency in our methodology and calculations. All impact estimates include
              references to the underlying research, and we regularly update our models as new research becomes
              available.
            </p>
            <p className="text-white/80">
              If you're a researcher interested in collaborating with Climate Pledge, please contact our research team
              at research@climatepledge.example.com.
            </p>
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
