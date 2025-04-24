import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ImageGallery } from "@/components/image-gallery"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GalleryPage() {
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Community Gallery</h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Explore photos shared by our community members that inspire climate action. Each image represents our
              connection to the natural world we're working to protect.
            </p>
          </div>

          <Tabs defaultValue="featured" className="mb-12">
            <TabsList className="bg-white/10 text-white mb-8">
              <TabsTrigger value="featured" className="data-[state=active]:bg-white/20">
                Featured
              </TabsTrigger>
              <TabsTrigger value="recent" className="data-[state=active]:bg-white/20">
                Recent Uploads
              </TabsTrigger>
              <TabsTrigger value="popular" className="data-[state=active]:bg-white/20">
                Most Popular
              </TabsTrigger>
            </TabsList>

            <TabsContent value="featured">
              <ImageGallery limit={8} />
            </TabsContent>

            <TabsContent value="recent">
              <ImageGallery limit={8} />
            </TabsContent>

            <TabsContent value="popular">
              <ImageGallery limit={8} />
            </TabsContent>
          </Tabs>

          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold text-white mb-4">Share Your Inspiration</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Have a photo that inspires you to take climate action? Share it with our community and help inspire
              others.
            </p>
            <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8">
              <Link href="/register">Join to Share Photos</Link>
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
                  <Link href="/gallery" className="text-white/60 hover:text-white">
                    Community Gallery
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
