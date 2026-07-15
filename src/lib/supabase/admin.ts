import "server-only";
import { createClient } from "@supabase/supabase-js";

// ⚠️ SERVICE ROLE — bypasses RLS. NEVER import in client components.
export function createSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
