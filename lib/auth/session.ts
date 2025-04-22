import { cookies } from "next/headers"

export async function getSession() {
  // Check if the auth token cookie exists
  const authToken = cookies().get("auth-token")
  
  if (!authToken) {
    return null
  }
  
  // In a real app, you would validate the token and fetch user data
  // For demo purposes, return a simple session object
  return {
    user: {
      id: "1",
      name: "Jane Smith",
      email: "jane@example.com"
    }
  }
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}
