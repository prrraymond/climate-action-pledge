const { createClient } = require("@supabase/supabase-js")
const dotenv = require("dotenv")

// Load environment variables from .env file
dotenv.config()

// Define types for Supabase user
interface SupabaseUser {
  id: string
  email: string | null
  [key: string]: any // For other properties we don't explicitly use
}

// Get environment variables with validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
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

async function createAdminUser() {
  try {
    console.log(`Looking up user with email: ${USER_EMAIL}`)

    // First, get the user's ID from their email
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers()

    if (userError) {
      console.error("Error fetching users:", userError.message)
      return
    }

    if (!userData || !userData.users) {
      console.error("No user data returned from Supabase")
      return
    }

    // Find the user with the matching email
    const user = userData.users.find((u: SupabaseUser) => u.email === USER_EMAIL)

    if (!user) {
      console.error(`No user found with email: ${USER_EMAIL}`)
      console.error("Make sure the user has signed up first")
      return
    }

    console.log(`Found user: ${user.id} (${user.email})`)

    // First, check if the user_roles table exists
    console.log("Checking if user_roles table exists...")
    const { error: tableCheckError } = await supabase.from("user_roles").select("id").limit(1)

    if (tableCheckError) {
      console.error("Error checking user_roles table:", tableCheckError)
      console.error("The user_roles table might not exist. Create it with the SQL below.")
      console.log(`
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
      return
    }

    // Check if user is already an admin
    console.log("Checking if user is already an admin...")
    const { data: existingRole, error: roleError } = await supabase
      .from("user_roles")
      .select("*")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle()

    if (roleError) {
      console.error("Error checking existing role:", roleError)
      return
    }

    if (existingRole) {
      console.log(`User ${user.email} is already an admin`)
      return
    }

    // Add the user as an admin
    console.log("Adding user as admin...")
    const { data, error } = await supabase.from("user_roles").insert({
      user_id: user.id,
      role: "admin",
    })

    if (error) {
      console.error("Error creating admin role:", error)
      console.error("Full error object:", JSON.stringify(error, null, 2))

      // Check for RLS policy issues
      if (error.code === "42501" || error.message?.includes("permission denied")) {
        console.error("\nThis might be a Row Level Security (RLS) policy issue.")
        console.error("Make sure you're using the service role key, not the anon key.")
        console.error("Also check that your RLS policies allow this operation.")
      }

      return
    }

    console.log(`Successfully made ${user.email} an admin!`)
  } catch (error) {
    console.error("Unexpected error:", error)
    if (error instanceof Error) {
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }
  }
}

createAdminUser()




