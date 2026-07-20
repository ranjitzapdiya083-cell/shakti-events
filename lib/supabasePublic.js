import { createClient } from '@supabase/supabase-js';

// Public client — safe to use in client components.
// Only has access to what your Row Level Security (RLS) policies allow.
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
