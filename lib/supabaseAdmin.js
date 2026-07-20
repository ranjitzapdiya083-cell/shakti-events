import { createClient } from '@supabase/supabase-js';

// Admin client — SERVER ONLY. Never import this in a client component.
// Uses the service_role key which bypasses Row Level Security,
// so every write (bookings, contacts, registrations, uploads) goes through
// an API route that uses this client, never the browser directly.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { autoRefreshToken: false, persistSession: false },
  }
);
