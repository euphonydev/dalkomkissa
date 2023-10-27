import { getCurrentUserId } from './auth'
import { insertImage } from './common'
import { insertEntry } from '@/services/entry'
import type { InsertMovieType, MovieEntry } from '@/types/movie.types'
import { AppSupabaseClient } from '@/lib/supabase/types'

export async function getMoviesByLang(
  supabase: AppSupabaseClient,
  lang: string,
): Promise<MovieEntry[]> {
  const { data } = await supabase
    .rpc('get_movie_entries', { lang: lang })
    .select('*')
  if (data) {
    return data
  }
  return []
}

export async function insertMovie(
  supabase: AppSupabaseClient,
  movie: InsertMovieType,
  cover: File,
): Promise<boolean> {
  const entryData = await insertEntry(
    supabase,
    2,
    movie.age_rating.value === 'nc-17' ? true : false,
  )
  if (entryData) {
    const userId = await getCurrentUserId(supabase)
    if (userId) {
      const coverData = await insertImage(
        supabase,
        cover,
        'cover',
        'movie',
        movie.default_cover.value.dimension,
        movie.default_cover.value.size,
        userId,
      )
      if (coverData) {
        const cover = {
          default: true,
          lang: movie.default_cover.value.language,
          is_primary: true,
          image_id: coverData.id,
          locked: movie.default_cover.locked,
        }
        const { error } = await supabase.from('movies').insert({
          id: entryData.id,
          original_title: movie.original_title,
          original_country: movie.original_country,
          original_language: movie.original_language,
          original_airdate: movie.original_airdate,
          description: [{ ...movie.english_description, lang: 'en' }],
          alternative_title: [
            { ...movie.english_title, lang: 'en', is_primary: true },
          ],
          format: movie.format,
          status: movie.status,
          age_rating: movie.age_rating,
          covers: [cover],
        })
        if (!error) {
          movie.genres.forEach(async (genreId) => {
            await insertMovieGenre(supabase, entryData.id, genreId)
          })
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    } else {
      return false
    }
  } else {
    return false
  }
}

export const insertMovieGenre = async (
  supabase: AppSupabaseClient,
  movieId: string,
  genreId: number,
): Promise<boolean> => {
  const { error } = await supabase.from('movie_genre').insert({
    movie_id: movieId,
    genre_id: genreId,
  })
  if (!error) {
    return true
  } else {
    return false
  }
}
