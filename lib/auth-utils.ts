// Simple client-side auth utilities
// In a real app, you would use a more robust solution like NextAuth.js

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

// Set a cookie for middleware authentication
export function setAuthCookie() {
  if (typeof window === "undefined") return

  try {
    document.cookie = `auth=true; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
  } catch (e) {
    console.error("Error setting auth cookie:", e)
  }
}
