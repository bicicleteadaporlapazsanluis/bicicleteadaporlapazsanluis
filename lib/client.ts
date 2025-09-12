import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase URL or Anon Key not found. Using mock data.")
    return {
      from: () => ({
        select: () => ({
          data: [],
          error: null,
          count: 0,
          order: () => ({ data: [], error: null, count: 0 }),
        }),
        insert: () => ({
          data: [],
          error: null,
          select: () => ({ data: [], error: null }),
        }),
        update: () => ({ data: [], error: null }),
        delete: () => ({ data: [], error: null }),
      }),
    }
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
