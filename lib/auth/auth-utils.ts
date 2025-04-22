// Simple client-side auth utilities

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
export async function logoutUser() {
  if (typeof window === "undefined") return

  try {
    // Call logout API
    await fetch("/api/logout", {
      method: "POST",
    })
    
    // Clear local storage
    localStorage.removeItem("user")
  } catch (e) {
    console.error("Error logging out:", e)
  }
}
