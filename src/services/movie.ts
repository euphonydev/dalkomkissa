import { getCurrentUserId } from './auth'
import { insertCover } from './common'
import { insertEntry } from '@/services/entry'
import type { InsertMovieType, MovieEntry } from '@/types/movie.types'
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

export async function insertMovie(
  supabase: AppSupabaseClient,
  movie: InsertMovieType,
  cover: File,
): Promise<boolean> {
  const entryData = await insertEntry(supabase, 2, movie.age_rating)
  if (entryData) {
    const userId = await getCurrentUserId(supabase)
    if (userId) {
      const coverData = await insertCover(
        supabase,
        cover,
        userId,
        movie.cover.size,
        movie.cover.language,
        'movie',
        true,
      )
      if (coverData) {
        await insertMovieCover(supabase, entryData.id, coverData.id)
        const { error } = await supabase
          .from('movie')
          .insert({
            id: entryData.id,
            origin_country: movie.country,
            origin_name: movie.title,
            language: movie.language,
            status: movie.movie_status,
            release_date: movie.release_date,
            type: movie.movie_type,
            default_cover_id: coverData.id,
          })
          .select()
        if (!error) {
          movie.genres.forEach(async (genreId) => {
            await insertMovieGenre(supabase, entryData.id, genreId)
          })
          const { error } = await supabase.from('movie_translation').insert({
            movie_id: entryData.id,
            lang: 'en',
            name: movie.english_title,
            description: movie.description,
          })
          if (!error) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      }
    }
    return true
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

export const insertMovieCover = async (
  supabase: AppSupabaseClient,
  movieId: string,
  coverId: string,
): Promise<boolean> => {
  const { error } = await supabase.from('movie_cover').insert({
    cover_id: coverId,
    movie_id: movieId,
  })
  if (!error) {
    return true
  } else {
    return false
  }
}
