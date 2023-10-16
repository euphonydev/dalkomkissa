import { getMoviesByLang } from '@/services/movie'
import { DataTable } from '@/components/fragments/table/dashboard/data-table'
import { columns } from '@/components/fragments/table/dashboard/movies/columns'
import { supabase } from '@/lib/supabase/clients/server-component-client'

export async function MovieTable() {
  const data = await getMoviesByLang(supabase, 'en')
  return (
    <div className="py-10">
      <DataTable
        columns={columns}
        data={data}
        searchColumn="title"
        searchPlaceholder="movie"
        newEntryLink="/movie/new"
      />
    </div>
  )
}

MovieTable.displayName = 'MovieTable'

export default MovieTable
