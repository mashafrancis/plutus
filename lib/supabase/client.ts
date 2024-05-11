import { env } from '@/env.mjs'
import { Database } from '@/lib/database.types'
import { createBrowserClient } from '@supabase/ssr'

// Define a function to create a Supabase client for client-side operations
export const createClient = () =>
  createBrowserClient<Database>(
    // Pass Supabase URL and anonymous key from the environment to the client
    env.NEXT_PUBLIC_SUPABASE_URL!,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
