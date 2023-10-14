import { getMoviesByLang } from '@/services/movies'
import { MovieCard } from '@/components/fragments/movie-card'
import { supabase } from '@/lib/supabase/clients/server-component-client'

export async function MovieGrid() {
  const data = await getMoviesByLang(supabase, 'en')
  return (
    <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
