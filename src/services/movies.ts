import type { MovieEntry } from '@/types/movies.types'
import { AppSupabaseClient } from '@/lib/supabase/types'

export async function getMoviesByLang(
  supabase: AppSupabaseClient,
  lang: string,
): Promise<MovieEntry[]> {
  const { data } = await supabase
    .from('movie_entry')
    .select('*')
    .eq('lang', lang)
  if (data) {
    return data
  }
  return []
}
