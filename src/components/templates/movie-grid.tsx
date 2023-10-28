import { getMovieEntries } from '@/services/movie'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { useLocale } from 'next-intl'
import { cookies } from 'next/headers'
import { MovieCard } from '@/components/fragments/movie-card'

export async function MovieGrid() {
  const supabase = createServerComponentClient({
    cookies,
  })
  const locale = useLocale()
  const data = await getMovieEntries(supabase, locale, true)
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:gap-5 lg:grid-cols-5 lg:gap-6 xl:grid-cols-6">
      {data.map((movie) => (
        <MovieCard
          key={movie.id}
          {...movie}
        />
      ))}
    </div>
  )
}

MovieGrid.displayName = 'MovieGrid'

export default MovieGrid
