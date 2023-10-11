import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database.types'
import type { MovieEntry } from '@/types/movies.types'

export async function getMoviesByLang(lang: string): Promise<MovieEntry[]> {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })
  const { data } = await supabase
    .from('movie_entry')
    .select('*')
    .eq('lang', lang)
  if (data) {
    return data
  }
  return []
}
