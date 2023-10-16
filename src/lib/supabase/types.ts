import { SupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/database.types'

export type AppSupabaseClient = SupabaseClient<Database>
