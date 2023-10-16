import { Database } from '@/types/database.types'

export type MovieEntry = Database['public']['Views']['movie_entry']['Row']
export type InsertMovieType = {
  title: string
  movie_type: Database['public']['Enums']['movie_type'] | null
  english_title: string
  description: string
  movie_status: Database['public']['Enums']['publication_status']
  language: string
  country: string
  age_rating: number
  cover: {
    language: string
    name: string
    url: string
    size: string
  }
  genres: number[]
  release_date: string
}
