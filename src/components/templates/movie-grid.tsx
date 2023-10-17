import { getMoviesByLang } from '@/services/movie'
import { MovieCard } from '@/components/fragments/movie-card'
import { supabase } from '@/lib/supabase/clients/server-component-client'

export async function MovieGrid() {
  const data = await getMoviesByLang(supabase, 'en')
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
