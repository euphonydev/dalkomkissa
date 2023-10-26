import { ImageInput, LockedField, TranslatedField } from './common.types'
import { age_rating } from './enums/age-rating'
import { countries } from './enums/countries'
import { movie_type } from './enums/movie-type'
import { publication_status } from './enums/publication-status'
import { Database } from '@/types/database.types'
import { Overwrite } from '@/lib/utils/type'

export type MovieEntry =
  Database['public']['Functions']['get_movie_entries']['Returns']
export type InsertMovieType = {
  original_title: Overwrite<LockedField, { value: string }>
  original_country: Overwrite<
    LockedField,
    { value: (typeof countries)[number] }
  >
  original_language: Overwrite<LockedField, { value: string }>
  original_airdate: Overwrite<LockedField, { value: string }>
  english_title: Overwrite<LockedField, { value: string }>
  english_description: Overwrite<LockedField, { value: string }>
  format: Overwrite<LockedField, { value: (typeof movie_type)[number] }>
  status: Overwrite<LockedField, { value: (typeof publication_status)[number] }>
  runtime?: Overwrite<LockedField, { value: number }>
  tagline?: Array<
    Overwrite<LockedField, Overwrite<TranslatedField, { value: string }>>
  >
  age_rating: Overwrite<LockedField, { value: (typeof age_rating)[number] }>
  default_cover: Overwrite<
    LockedField,
    { value: Overwrite<ImageInput, TranslatedField> }
  >
  genres: number[]
}
