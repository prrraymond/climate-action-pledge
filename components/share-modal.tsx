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

  // Generate share text based on impact data
  const shareText = `I've reduced my carbon footprint by ${impactData.carbonReduction} kg CO₂e (equivalent to planting ${impactData.treesEquivalent} trees) with Climate Pledge! Join me in taking climate action.`

  // Generate a shareable link (in a real app, this would be a unique URL)
  const shareLink = `https://climate-pledge.example.com/share/${Date.now()}`

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
      <DialogContent className="bg-white/10 border-white/20 text-white sm:max-w-md backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle>Share Your Climate Impact</DialogTitle>
          <DialogDescription className="text-white/80">
            Show others the difference you're making and inspire them to take action too.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-4 my-4 shadow-inner">
          <p className="text-sm text-white font-medium">{shareText}</p>
        </div>

        <Tabs defaultValue="social" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white/20 text-white">
            <TabsTrigger
              value="social"
              className="data-[state=active]:bg-emerald-500/70 data-[state=active]:text-white"
            >
              Social Media
            </TabsTrigger>
            <TabsTrigger value="link" className="data-[state=active]:bg-emerald-500/70 data-[state=active]:text-white">
              Copy Link
            </TabsTrigger>
          </TabsList>

          <TabsContent value="social" className="mt-4">
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => handleSocialShare("twitter")}
                variant="outline"
                size="lg"
                className="flex-1 border-white/30 bg-white/5 text-white hover:bg-white/20"
              >
                <Twitter className="h-5 w-5 mr-2 text-[#1DA1F2]" />
                Twitter
              </Button>

              <Button
                onClick={() => handleSocialShare("facebook")}
                variant="outline"
                size="lg"
                className="flex-1 border-white/30 bg-white/5 text-white hover:bg-white/20"
              >
                <Facebook className="h-5 w-5 mr-2 text-[#1877F2]" />
                Facebook
              </Button>

              <Button
                onClick={() => handleSocialShare("linkedin")}
                variant="outline"
                size="lg"
                className="flex-1 border-white/30 bg-white/5 text-white hover:bg-white/20"
              >
                <Linkedin className="h-5 w-5 mr-2 text-[#0A66C2]" />
                LinkedIn
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="link" className="mt-4">
            <div className="flex items-center space-x-2">
              <Input value={shareLink} readOnly className="bg-white/20 border-white/30 text-white" />
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

