import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// Support both old (ANON_KEY) and new (PUBLISHABLE_KEY) Supabase key names
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Public client — used in browser / server components for reads
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client — bypasses RLS, used only in API routes
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
