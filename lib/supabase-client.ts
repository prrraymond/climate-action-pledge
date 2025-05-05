// Add this function to your supabase client file

/**
 * Configure Supabase Auth redirects for your application
 * Call this function when initializing your application
 */
export function configureSupabaseAuthRedirects() {
  // Get the base URL of your application
  const baseUrl =
    typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

  // Set the redirect URLs
  const redirectUrls = {
    emailVerificationRedirectTo: `${baseUrl}/auth/verification-success`,
    passwordResetRedirectTo: `${baseUrl}/auth/reset-password`,
    // Add other redirect URLs as needed
  }

  return redirectUrls
}

// Create a helper function to get the base URL
export function getBaseUrl() {
  return typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
}

