import { Entry } from '@/types/entry.types'
import { AppSupabaseClient } from '@/lib/supabase/types'

export const insertEntry = async (
  supabase: AppSupabaseClient,
  type_id: number,
  is_adult: boolean,
): Promise<Entry | null> => {
  const { data, error } = await supabase
    .from('entries')
    .insert({
      type_id: type_id,
      is_adult: is_adult,
    })
    .select()
    .single()
  if (!error) {
    return data
  } else {
    return null
  }
}
