import { Entry } from '@/types/entry.types'
import { AppSupabaseClient } from '@/lib/supabase/types'

export const insertEntry = async (
  supabase: AppSupabaseClient,
  type_id: number,
  age_rating_id: number | null,
): Promise<Entry | null> => {
  const { data, error } = await supabase
    .from('entry')
    .insert({
      type_id: type_id,
      age_rating_id: age_rating_id ? age_rating_id : 1,
    })
    .select()
    .single()
  if (!error) {
    return data
  } else {
    return null
  }
}
