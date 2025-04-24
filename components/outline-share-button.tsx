"use client"

import { Share2 } from "lucide-react"

export function OutlineShareButton() {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
      style={{
        borderColor: "rgba(255, 255, 255, 0.2)",
        backgroundColor: "transparent",
        color: "white",
      }}
    >
      <Share2 className="h-4 w-4" />
      Share My Impact
    </button>
  )
}
