const { createClient } = require("@supabase/supabase-js")
const dotenv = require("dotenv")

// Load environment variables from .env file
dotenv.config()

// Get environment variables with validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate environment variables
if (!supabaseUrl) {
  console.error("Error: NEXT_PUBLIC_SUPABASE_URL is not defined")
  process.exit(1)
}

if (!supabaseServiceKey) {
  console.error("Error: SUPABASE_SERVICE_ROLE_KEY is not defined")
  console.error("Note: You need the service role key to create admin users")
  console.error("This is different from the anon key and has more permissions")
  process.exit(1)
}

// Create Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Replace with the email of the user you want to make an admin
const USER_EMAIL = "praydeals@gmail.com"

// Define types for user objects
interface User {
  id: string
  email: string
  [key: string]: any // For other properties we don't explicitly use
}

async function createAdminUser() {
  try {
    console.log(`Looking up user with email: ${USER_EMAIL}`)

    // First, get the user's ID from their email
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers()

    if (userError) {
      console.error("Error fetching users:", userError.message)
      return
    }

    // Find the user with the matching email
    const user = userData.users.find((u: User) => u.email === USER_EMAIL)

    if (!user) {
      console.error(`No user found with email: ${USER_EMAIL}`)
      console.error("Make sure the user has signed up first")
      return
    }

    console.log(`Found user: ${user.id} (${user.email})`)

    // Check if user is already an admin
    const { data: existingRole, error: roleError } = await supabase
      .from("user_roles")
      .select("*")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle()

    if (existingRole) {
      console.log(`User ${user.email} is already an admin`)
      return
    }

    // Add the user as an admin
    const { data, error } = await supabase.from("user_roles").insert({
      user_id: user.id,
      role: "admin",
    })

    if (error) {
      console.error("Error creating admin role:", error.message)

      // Check if the user_roles table exists
      if (error.message.includes("relation") && error.message.includes("does not exist")) {
        console.error("\nThe user_roles table might not exist. Create it with this SQL:")
        console.error(`
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Add RLS policies
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Allow users to see their own roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Only allow admins to insert/update/delete roles
CREATE POLICY "Only admins can insert roles"
  ON public.user_roles
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can update roles"
  ON public.user_roles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete roles"
  ON public.user_roles
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
        `)
      }
      return
    }

    console.log(`Successfully made ${user.email} an admin!`)
  } catch (error: unknown) {
    // Handle the unknown error type
    if (error instanceof Error) {
      console.error("Unexpected error:", error.message)
    } else {
      console.error("Unexpected error:", error)
    }
  }
}

createAdminUser()

