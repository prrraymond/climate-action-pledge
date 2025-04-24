import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
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
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Find answers to common questions about Climate Pledge and how you can make a difference.
            </p>
          </div>

          <Accordion type="single" collapsible className="mb-16">
            <AccordionItem value="item-1" className="border-white/10">
              <AccordionTrigger className="text-white hover:text-white/90 text-lg">
                What is Climate Pledge?
              </AccordionTrigger>
              <AccordionContent className="text-white/80">
                Climate Pledge is a platform that helps individuals take meaningful climate action through personal
                commitments. We provide science-backed recommendations for reducing your carbon footprint, track your
                progress, and show the collective impact of our community.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-white/10">
              <AccordionTrigger className="text-white hover:text-white/90 text-lg">
                How accurate is the carbon footprint calculator?
              </AccordionTrigger>
              <AccordionContent className="text-white/80">
                Our calculator uses methodology from The Nature Conservancy and provides a reasonable estimate based on
                the information you provide. While no calculator can be 100% precise without detailed measurement of all
                activities, ours gives you a good baseline to understand your impact and track improvements.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-white/10">
              <AccordionTrigger className="text-white hover:text-white/90 text-lg">
                How are the carbon reduction estimates calculated?
              </AccordionTrigger>
              <AccordionContent className="text-white/80">
                Our carbon reduction estimates are based on peer-reviewed research from organizations like Project
                Drawdown. We consider factors like average household size, regional energy mix, and typical consumption
                patterns. These estimates represent average impacts and may vary based on your specific circumstances.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-white/10">
              <AccordionTrigger className="text-white hover:text-white/90 text-lg">
                Is my data private?
              </AccordionTrigger>
              <AccordionContent className="text-white/80">
                Yes, we take your privacy seriously. Your personal information is never sold to third parties. We use
                your data only to provide the service and generate anonymized, aggregate statistics about collective
                impact. You can read our full Privacy Policy for more details.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-white/10">
              <AccordionTrigger className="text-white hover:text-white/90 text-lg">
                Can I delete my account?
              </AccordionTrigger>
              <AccordionContent className="text-white/80">
                Yes, you can delete your account at any time from your profile settings. This will permanently remove
                all your personal information from our systems, though anonymized statistical data may remain in
                aggregate calculations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-white/10">
              <AccordionTrigger className="text-white hover:text-white/90 text-lg">
                How can I track my progress?
              </AccordionTrigger>
              <AccordionContent className="text-white/80">
                Once you've made pledges, you can track your progress on your personal dashboard. You'll see your
                estimated carbon reduction, completion rate for your pledged actions, and how you compare to the
                community average. We also send optional weekly email summaries to help you stay on track.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border-white/10">
              <AccordionTrigger className="text-white hover:text-white/90 text-lg">
                Can organizations or businesses use Climate Pledge?
              </AccordionTrigger>
              <AccordionContent className="text-white/80">
                Currently, Climate Pledge is designed for individuals. However, we're developing a version for
                organizations that want to engage their employees or members in climate action. If you're interested in
                this, please contact us at partnerships@climatepledge.example.com.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border-white/10">
              <AccordionTrigger className="text-white hover:text-white/90 text-lg">
                How can I share my impact with others?
              </AccordionTrigger>
              <AccordionContent className="text-white/80">
                You can share your climate impact on social media directly from your dashboard using our "Share My
                Impact" button. This creates a customized graphic showing your carbon reduction and equivalent impact
                (like trees planted). You can also invite friends via email or by sharing your unique referral link.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border-white/10">
              <AccordionTrigger className="text-white hover:text-white/90 text-lg">
                Are the photos I share in the community gallery used for anything else?
              </AccordionTrigger>
              <AccordionContent className="text-white/80">
                Photos you share in our community gallery may be featured on our social media accounts with proper
                attribution, as outlined in our Terms of Service. We never sell your photos or use them for commercial
                purposes without explicit permission. You retain ownership of your images and can remove them at any
                time.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="border-white/10">
              <AccordionTrigger className="text-white hover:text-white/90 text-lg">
                How can I suggest new features or actions?
              </AccordionTrigger>
              <AccordionContent className="text-white/80">
                We welcome your suggestions! You can send feature requests or suggest new climate actions by emailing
                feedback@climatepledge.example.com. Our team reviews all suggestions and incorporates them into our
                development roadmap based on potential impact and feasibility.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6 mb-16">
            <h3 className="text-xl font-bold text-white mb-4">Still have questions?</h3>
            <p className="text-white/80 mb-4">
              If you couldn't find the answer you were looking for, please reach out to our support team. We're here to
              help!
            </p>
            <p className="text-white/80">Contact us at: support@climatepledge.example.com</p>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Ready to make a difference?</h2>
            <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8">
              <Link href="/register">Take the Pledge Today</Link>
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
