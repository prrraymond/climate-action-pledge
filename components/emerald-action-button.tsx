"use client"

import type React from "react"

import Link from "next/link"

interface EmeraldActionButtonProps {
  href: string
  children: React.ReactNode
}

export function EmeraldActionButton({ href, children }: EmeraldActionButtonProps) {
  return (
    <Link href={href}>
      <div
        style={{
          backgroundColor: "#10b981",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "0.375rem",
          fontWeight: "500",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#059669"
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#10b981"
        }}
      >
        {children}
      </div>
    </Link>
  )
}
