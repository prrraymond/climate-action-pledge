import { createClient } from "@supabase/supabase-js"

// Check for both versions of environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ""

// Log which variables are being used (for debugging)
console.log(
  "Using Supabase URL from:",
  process.env.NEXT_PUBLIC_SUPABASE_URL
    ? "NEXT_PUBLIC_SUPABASE_URL"
    : process.env.SUPABASE_URL
      ? "SUPABASE_URL"
      : "fallback empty string",
)

console.log(
  "Using Supabase ANON KEY from:",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ? "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    : process.env.SUPABASE_ANON_KEY
      ? "SUPABASE_ANON_KEY"
      : "fallback empty string",
)

// Create the Supabase client
let supabase: any

try {
  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase credentials missing. URL:", !!supabaseUrl, "Key:", !!supabaseKey)
    throw new Error("Supabase credentials missing")
  } else {
    supabase = createClient(supabaseUrl, supabaseKey)
    console.log("Supabase client initialized successfully")
  }
} catch (error) {
  console.error("Error initializing Supabase client:", error)
  // Create a minimal client that logs errors
  supabase = {
    from: () => {
      console.error("Using fallback Supabase client - operations will fail")
      return {
        select: () => Promise.resolve({ data: [], error: new Error("Supabase client not initialized") }),
        insert: () => Promise.resolve({ data: null, error: new Error("Supabase client not initialized") }),
        update: () => Promise.resolve({ data: null, error: new Error("Supabase client not initialized") }),
        delete: () => Promise.resolve({ data: null, error: new Error("Supabase client not initialized") }),
        eq: () => ({
          select: () => Promise.resolve({ data: [], error: new Error("Supabase client not initialized") }),
        }),
        limit: () => ({
          select: () => Promise.resolve({ data: [], error: new Error("Supabase client not initialized") }),
        }),
      }
    },
  }
}

export { supabase }

// Create a Supabase admin client with the service role key
let supabaseAdmin: any
try {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  if (serviceRoleKey) {
    supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)
  } else {
    console.warn("Service role key missing, admin client will use regular client")
    supabaseAdmin = supabase // Fall back to regular client if no service role key
  }
} catch (error) {
  console.error("Error initializing Supabase admin client:", error)
  supabaseAdmin = supabase
}

export { supabaseAdmin }

  