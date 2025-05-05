// Application constants

// Base URL with fallback to window.location.origin if environment variable is not available
export const BASE_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_BASE_URL || window.location.origin
    : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

// Other application constants can be added here
export const APP_NAME = "Climate Pledge"
export const DEFAULT_META_DESCRIPTION = "Take action for the climate with our pledge platform"