"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function LogoutButton() {
  const { logout, loading } = useAuth()

  return (
    <Button variant="ghost" size="sm" onClick={logout} disabled={loading} className="text-white hover:bg-white/10">
      <LogOut className="h-4 w-4 mr-2" />
      Sign Out
    </Button>
  )
}
