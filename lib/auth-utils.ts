import { supabaseAdmin } from "@/lib/supabase"

// Check if user is logged in
export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false

  try {
    const user = localStorage.getItem("user")
    return !!user
  } catch (e) {
    return false
  }
}

// Get current user
export function getCurrentUser() {
  if (typeof window === "undefined") return null

  try {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  } catch (e) {
    return null
  }
}

// Log out user
export function logoutUser() {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem("user")
    // In a real app, you would also invalidate the session on the server
  } catch (e) {
    console.error("Error logging out:", e)
  }
}

// Check if user is an admin - fixed to avoid recursion
export async function isAdmin(userId: string): Promise<boolean> {
  if (!userId) return false

  try {
    // Use a direct SQL query with the admin client to bypass RLS policies
    const { data, error } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle()

    if (error) {
      console.error("Error checking admin status:", error)
      return false
    }

    return !!data
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

// Set a user as admin (for initial setup)
export async function setUserAsAdmin(userId: string): Promise<boolean> {
  if (!userId) return false

  try {
    // Use the admin client to bypass RLS policies
    const { error } = await supabaseAdmin.from("user_roles").insert({ user_id: userId, role: "admin" })

    return !error
  } catch (error) {
    console.error("Error setting user as admin:", error)
    return false
  }
}


