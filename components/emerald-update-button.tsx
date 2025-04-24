"use client"

export function EmeraldUpdateButton() {
  return (
    <a
      href="/actions"
      className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 active:scale-95"
      style={{
        backgroundColor: "#10b981 !important",
        color: "white !important",
        borderRadius: "0.375rem !important",
        padding: "0.5rem 1rem !important",
        fontWeight: "500 !important",
        fontSize: "0.875rem !important",
        lineHeight: "1.25rem !important",
      }}
    >
      Update Pledges
    </a>
  )
}
