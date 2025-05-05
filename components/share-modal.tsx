"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Copy, Facebook, Linkedin, Twitter } from "lucide-react"

interface ShareModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  impactData: {
    carbonReduction: number
    treesEquivalent: number
    rank: string
  }
}

export function ShareModal({ open, onOpenChange, impactData }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("social")

  // Get the base URL for the application
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || "https://climate-action-pledge.vercel.app"

  // Generate share text based on impact data - updated to focus on pledges
  const shareText = `I've pledged to reduce my carbon footprint by ${impactData.carbonReduction} kg CO₂e (equivalent to planting ${impactData.treesEquivalent} trees) with Climate Pledge! Join me in taking climate action.`

  // Generate a shareable link with the actual domain
  const shareLink = `${baseUrl}/share/${Date.now()}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Handle social media sharing
  const handleSocialShare = (platform: string) => {
    let shareUrl = ""

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareLink)}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}&quote=${encodeURIComponent(shareText)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}&summary=${encodeURIComponent(shareText)}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-md backdrop-blur-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Share Your Climate Pledge</DialogTitle>
          <DialogDescription className="text-white/80">
            Show others the difference you're pledging to make and inspire them to take action too.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-emerald-900/40 border border-emerald-500/30 rounded-lg p-4 my-4 shadow-inner">
          <p className="text-sm text-white font-medium break-words">{shareText}</p>
        </div>

        <Tabs defaultValue="social" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-slate-800 text-white w-full">
            <TabsTrigger
              value="social"
              className="flex-1 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              Social Media
            </TabsTrigger>
            <TabsTrigger
              value="link"
              className="flex-1 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
            >
              Copy Link
            </TabsTrigger>
          </TabsList>

          <TabsContent value="social" className="mt-4">
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button
                onClick={() => handleSocialShare("twitter")}
                variant="outline"
                size="lg"
                className="flex-1 border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700"
              >
                <Twitter className="h-5 w-5 mr-2 text-[#1DA1F2]" />
                Twitter
              </Button>

              <Button
                onClick={() => handleSocialShare("facebook")}
                variant="outline"
                size="lg"
                className="flex-1 border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700"
              >
                <Facebook className="h-5 w-5 mr-2 text-[#1877F2]" />
                Facebook
              </Button>

              <Button
                onClick={() => handleSocialShare("linkedin")}
                variant="outline"
                size="lg"
                className="flex-1 border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700"
              >
                <Linkedin className="h-5 w-5 mr-2 text-[#0A66C2]" />
                LinkedIn
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="link" className="mt-4">
            <div className="flex items-center space-x-2">
              <Input value={shareLink} readOnly className="bg-slate-800 border-slate-700 text-white text-sm" />
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700 flex-shrink-0"
              >
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


