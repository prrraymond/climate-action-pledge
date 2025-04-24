import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
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
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-white/80">Last Updated: April 23, 2025</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="bg-white/5 p-6 rounded-lg mb-8">
              <p className="text-white/80 text-sm">
                This Privacy Policy explains how Climate Pledge ("we", "us", or "our") collects, uses, and shares your
                information when you use our website, mobile application, and services (collectively, the "Services").
                Please read this Privacy Policy carefully. By using our Services, you agree to the practices described
                in this Privacy Policy.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <div className="space-y-4 text-white/80">
                <p>We collect the following types of information:</p>
                <h3 className="text-xl font-medium text-white">Personal Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Account Information:</strong> When you create an account, we collect your name, email
                    address, and password.
                  </li>
                  <li>
                    <strong>Profile Information:</strong> You may choose to provide additional information such as
                    location, household size, and preferences.
                  </li>
                  <li>
                    <strong>Survey Responses:</strong> Information you provide when completing our carbon footprint
                    calculator or other surveys.
                  </li>
                  <li>
                    <strong>Pledge Data:</strong> Information about the climate actions you pledge to take and your
                    progress.
                  </li>
                </ul>

                <h3 className="text-xl font-medium text-white">User Content</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Photos and Images:</strong> Images you upload to our community gallery or share through our
                    platform.
                  </li>
                  <li>
                    <strong>Comments and Posts:</strong> Content you post in community forums or discussions.
                  </li>
                </ul>

                <h3 className="text-xl font-medium text-white">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Usage Data:</strong> Information about how you use our Services, including pages visited,
                    features used, and actions taken.
                  </li>
                  <li>
                    <strong>Device Information:</strong> Information about your device, including IP address, browser
                    type, operating system, and device identifiers.
                  </li>
                  <li>
                    <strong>Cookies and Similar Technologies:</strong> We use cookies and similar technologies to
                    collect information about your browsing activities.
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <div className="space-y-4 text-white/80">
                <p>We use the information we collect for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To provide, maintain, and improve our Services</li>
                  <li>To calculate your carbon footprint and track your climate action progress</li>
                  <li>To personalize your experience and provide tailored recommendations</li>
                  <li>To communicate with you about your account, updates, and new features</li>
                  <li>To generate anonymized, aggregate statistics about climate action impact</li>
                  <li>To detect, investigate, and prevent fraudulent or unauthorized activities</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Sharing Your Information</h2>
              <div className="space-y-4 text-white/80">
                <p>We may share your information in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>With Your Consent:</strong> We may share information when you direct us to do so, such as
                    when you choose to share your impact on social media.
                  </li>
                  <li>
                    <strong>Service Providers:</strong> We may share information with third-party vendors who provide
                    services on our behalf, such as hosting, analytics, and customer support.
                  </li>
                  <li>
                    <strong>Research Partners:</strong> We may share anonymized, aggregate data with our research
                    partners to advance climate science and improve our impact calculations.
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> We may disclose information if required by law, regulation, or
                    legal process.
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets,
                    your information may be transferred as part of that transaction.
                  </li>
                </ul>
                <p>
                  <strong>We do not sell your personal information to third parties.</strong>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">User Content and Social Sharing</h2>
              <div className="space-y-4 text-white/80">
                <p>
                  Our Services allow you to share content, including photos and impact statistics, with others. Please
                  note:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Photos you upload to our community gallery may be visible to other users and may be featured on our
                    social media accounts with proper attribution.
                  </li>
                  <li>
                    When you share your impact on social media platforms like Instagram, that content is subject to the
                    privacy policies and terms of those platforms.
                  </li>
                  <li>
                    You retain ownership of your content, but grant us a license to use, reproduce, and display it in
                    connection with our Services, as detailed in our Terms of Service.
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights and Choices</h2>
              <div className="space-y-4 text-white/80">
                <p>You have several rights regarding your personal information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Access and Update:</strong> You can access and update your account information through your
                    profile settings.
                  </li>
                  <li>
                    <strong>Deletion:</strong> You can delete your account at any time from your profile settings. This
                    will permanently remove your personal information from our systems, though anonymized statistical
                    data may remain in aggregate calculations.
                  </li>
                  <li>
                    <strong>Communication Preferences:</strong> You can opt out of marketing communications by following
                    the unsubscribe instructions in our emails or adjusting your notification settings.
                  </li>
                  <li>
                    <strong>Cookies:</strong> Most web browsers are set to accept cookies by default. You can usually
                    adjust your browser settings to remove or reject cookies.
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <div className="space-y-4 text-white/80">
                <p>
                  We implement reasonable security measures to protect your information from unauthorized access, use,
                  or disclosure. However, no method of transmission over the internet or electronic storage is 100%
                  secure. Therefore, while we strive to use commercially acceptable means to protect your personal
                  information, we cannot guarantee its absolute security.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
              <div className="space-y-4 text-white/80">
                <p>
                  Our Services are not directed to children under the age of 13. We do not knowingly collect personal
                  information from children under 13. If you are a parent or guardian and believe that your child has
                  provided us with personal information, please contact us so that we can delete such information.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>
              <div className="space-y-4 text-white/80">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this
                  Privacy Policy periodically for any changes.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <div className="space-y-4 text-white/80">
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                  privacy@climatepledge.example.com
                </p>
              </div>
            </section>
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
