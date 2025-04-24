import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsOfServicePage() {
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
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-white/80">Last Updated: April 23, 2025</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="bg-white/5 p-6 rounded-lg mb-8">
              <p className="text-white/80 text-sm">
                These Terms of Service ("Terms") govern your access to and use of the Climate Pledge website, mobile
                application, and services (collectively, the "Services"). Please read these Terms carefully. By
                accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">1. Using Our Services</h2>
              <div className="space-y-4 text-white/80">
                <h3 className="text-xl font-medium text-white">1.1 Eligibility</h3>
                <p>
                  You must be at least 13 years old to use our Services. If you are under 18, you must have your parent
                  or guardian's permission to use our Services and they must agree to these Terms on your behalf.
                </p>

                <h3 className="text-xl font-medium text-white">1.2 Account Registration</h3>
                <p>
                  To access certain features of our Services, you may need to create an account. You agree to provide
                  accurate, current, and complete information during the registration process and to update such
                  information to keep it accurate, current, and complete.
                </p>

                <h3 className="text-xl font-medium text-white">1.3 Account Security</h3>
                <p>
                  You are responsible for safeguarding your password and for all activities that occur under your
                  account. You agree to notify us immediately of any unauthorized use of your account.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">2. User Content</h2>
              <div className="space-y-4 text-white/80">
                <h3 className="text-xl font-medium text-white">2.1 Content Ownership</h3>
                <p>
                  You retain ownership of any content you submit, post, or display on or through our Services ("User
                  Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license
                  (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit,
                  display, and distribute such content in any and all media or distribution methods now known or later
                  developed.
                </p>

                <h3 className="text-xl font-medium text-white">2.2 Content Restrictions</h3>
                <p>You agree not to post User Content that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violates the rights of others, including intellectual property rights</li>
                  <li>Is unlawful, harmful, threatening, abusive, harassing, defamatory, or invasive of privacy</li>
                  <li>Impersonates any person or entity or misrepresents your affiliation</li>
                  <li>Contains software viruses or any other code designed to harm our Services</li>
                  <li>Constitutes unauthorized commercial communications (such as spam)</li>
                </ul>

                <h3 className="text-xl font-medium text-white">2.3 Community Gallery and Social Media Sharing</h3>
                <p>
                  Our Services allow you to upload photos to our community gallery and share your climate impact on
                  social media platforms. By uploading photos to our community gallery, you agree that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your photos may be visible to other users of our Services</li>
                  <li>
                    We may feature your photos on our social media accounts, including Instagram, with proper
                    attribution to you
                  </li>
                  <li>
                    You have the right to upload and share these photos and that they do not violate any third-party
                    rights
                  </li>
                </ul>

                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 my-4">
                  <h4 className="font-medium text-emerald-400 mb-2">Instagram Sharing Provisions</h4>
                  <p>
                    When you choose to share your climate impact or photos on Instagram, either directly through our
                    Services or by using our sharing tools:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      You authorize us to share this content on Instagram on your behalf if you use our direct sharing
                      feature
                    </li>
                    <li>
                      You acknowledge that shared content becomes subject to Instagram's Terms of Use and Privacy Policy
                    </li>
                    <li>
                      You grant us permission to use, reproduce, and display the shared content for the purpose of
                      promoting Climate Pledge, including in our marketing materials and social media accounts
                    </li>
                    <li>
                      You can revoke this permission at any time by contacting us, though we cannot remove content that
                      has already been shared on Instagram
                    </li>
                    <li>We will always attribute the content to you unless you specifically request otherwise</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
              <div className="space-y-4 text-white/80">
                <h3 className="text-xl font-medium text-white">3.1 Our Intellectual Property</h3>
                <p>
                  The text, graphics, images, logos, icons, software, design, and other content of our Services
                  ("Materials") are owned by or licensed to Climate Pledge and are protected by copyright, trademark,
                  and other intellectual property laws. You may not use, reproduce, distribute, modify, or create
                  derivative works from any Materials without our express written consent.
                </p>

                <h3 className="text-xl font-medium text-white">3.2 Feedback</h3>
                <p>
                  If you provide us with any feedback or suggestions regarding our Services, you grant us the right to
                  use such feedback without restriction and without compensation to you.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. Privacy</h2>
              <div className="space-y-4 text-white/80">
                <p>
                  Our Privacy Policy describes how we handle the information you provide to us when you use our
                  Services. By using our Services, you agree that we can use such information in accordance with our
                  Privacy Policy.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Termination</h2>
              <div className="space-y-4 text-white/80">
                <p>
                  We may terminate or suspend your access to our Services at any time, without prior notice or
                  liability, for any reason, including if you breach these Terms. Upon termination, your right to use
                  the Services will immediately cease.
                </p>
                <p>
                  You may terminate your account at any time by following the instructions in your account settings.
                  Some provisions of these Terms will survive termination.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Disclaimer of Warranties</h2>
              <div className="space-y-4 text-white/80">
                <p>
                  OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                  IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                  PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p>
                  WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE
                  CORRECTED, OR THAT OUR SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER
                  HARMFUL COMPONENTS.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
              <div className="space-y-4 text-white/80">
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL CLIMATE PLEDGE, ITS DIRECTORS, EMPLOYEES,
                  PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                  CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE,
                  GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS
                  OR USE THE SERVICES.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">8. Changes to Terms</h2>
              <div className="space-y-4 text-white/80">
                <p>
                  We may modify these Terms from time to time. We will notify you of any changes by posting the new
                  Terms on this page and updating the "Last Updated" date. Your continued use of the Services after any
                  such changes constitutes your acceptance of the new Terms.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">9. Governing Law</h2>
              <div className="space-y-4 text-white/80">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the State of California,
                  without regard to its conflict of law provisions.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
              <div className="space-y-4 text-white/80">
                <p>
                  If you have any questions about these Terms, please contact us at: terms@climatepledge.example.com
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
